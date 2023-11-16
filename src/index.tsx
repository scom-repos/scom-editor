import {
  Module,
  customElements,
  ControlElement,
  Container,
  Panel,
  RequireJS,
  application,
  IDataSchema,
  IUISchema
} from '@ijstech/components';
import { addSlashMenu, addFormattingToolbar, addSideMenu, addHyperlinkToolbar, addImageToolbar } from './blocks/index';

type onChangedCallback = (blocks: any[]) => void;

interface ScomEditorElement extends ControlElement {
  placeholder?: string;
  value?: string;
  lazyLoad?: boolean;
  onChanged?: onChangedCallback;
}

interface IEditor {
  placeholder?: string;
  value?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor']: ScomEditorElement;
    }
  }
}

const path = application.currentModuleDir;
RequireJS.config({
  paths: {
    'blocknote': `${path}/lib/@blocknote/blocknote.bundled.umd.js`
  }
})
const libPlugins = [
  'blocknote'
];
const cssPath = `${path}/lib/@blocknote/style.css`;

@customElements('i-scom-editor')
export class ScomEditor extends Module {
  private pnlEditor: Panel;

  private _blocknoteObj: any;
  private _editor: any;
  private _data: IEditor;
  tag: any = {};

  public onChanged: onChangedCallback;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get value() {
    return this._data.value;
  }
  set value(data: string) {
    this._data.value = data;
  }
  
  get placeholder() {
    return this._data.placeholder;
  }
  set placeholder(data: string) {
    this._data.placeholder = data;
  }

  getEditor() {
    return this._editor;
  }

  static async create(options?: ScomEditorElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  private async initEditor() {
    if (this._editor) return;
    try {
      this.addCSS(cssPath, 'blocknote');
      this._blocknoteObj = await this.loadPlugin();
      this.renderEditor();
    } catch {}
  }

  private renderEditor() {
    if (!this._blocknoteObj) return;
    const self = this;
    this._editor = new this._blocknoteObj.BlockNoteEditor({
      parentElement: self.pnlEditor,
      onEditorContentChange: async (editor: any) => {
        const markdownContent = await editor.blocksToMarkdown(editor.topLevelBlocks);
        this._data.value = markdownContent;
        if (this.onChanged) this.onChanged(markdownContent);
      },
      domAttributes: {
        editor: {
          class: 'scom-editor',
        },
      },
    });
    if (this.value) this.setBlocks(this.value);
    addSideMenu(this._editor, this.pnlEditor);
    addFormattingToolbar(this._editor);
    addSlashMenu(this._editor);
    addHyperlinkToolbar(this._editor);
    addImageToolbar(this._editor);
  }

  private addCSS(href: string, name: string) {
    const css = document.head.querySelector(`[name="${name}"]`);
    if (css) return;
    let link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('charset', 'utf-8');
    link.setAttribute('name', name);
    link.href = href;
    document.head.append(link);
  }

  private loadPlugin() {
    return new Promise((resolve, reject) => {
      RequireJS.require(libPlugins, (blocknote: any) => {
        resolve(blocknote);
      });
    });
  }

  private getData() {
    return this._data;
  }

  private async setData(data: IEditor) {
    this._data = data;
    await this.setBlocks(data.value || '');
  }

  private async setBlocks(markdown: string) {
    if (!this._editor) return;
    const blocks: any[] = await this._editor.markdownToBlocks(markdown);
    this._editor.replaceBlocks(this._editor.topLevelBlocks, blocks); // TODO: check updating
  };

  private updateTag(type: 'light' | 'dark', value: any) {
    this.tag[type] = this.tag[type] ?? {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop))
        this.tag[type][prop] = value[prop];
    }
  }

  private async setTag(value: any) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark')
          this.updateTag(prop, newValue[prop]);
        else
          this.tag[prop] = newValue[prop];
      }
    }
    this.updateTheme();
  }

  private updateStyle(name: string, value: any) {
    value ?
      this.style.setProperty(name, value) :
      this.style.removeProperty(name);
  }

  private updateTheme() {
    const themeVar = document.body.style.getPropertyValue('--theme') ?? 'dark';
    this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
    this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
  }

  private getTag() {
    return this.tag;
  }

  getConfigurators() {
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
          return this._getActions();
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this),
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this),
      },
    ];
  }

  private _getActions() {
    const { dataSchema, jsonUISchema } = this.getThemeSchema();
    const actions = [
      {
        name: 'Edit',
        icon: 'edit',
        command: (builder: any, userInputData: any) => {
          let _oldData = {};
          return {
            execute: async () => {
              _oldData = {...this._data};
              this.setData(userInputData);
              if (builder?.setData) builder.setData(userInputData);
            },
            undo: async () => {
              this._data = {..._oldData};
              this.setData(this._data);
              if (builder?.setData) builder.setData(this._data);
            },
            redo: () => {},
          };
        },
        userInputDataSchema: dataSchema,
        userInputUISchema: jsonUISchema
      },
      {
        name: 'Edit',
        icon: 'edit',
        command: (builder: any, userInputData: any) => {
          let oldData: IEditor = {};
          return {
            execute: () => {
              oldData = JSON.parse(JSON.stringify(this._data));
              if (builder?.setData) builder.setData(userInputData);
              this.setData(userInputData);
            },
            undo: () => {
              if (builder?.setData) builder.setData(oldData);
              this.setData(oldData);
            },
            redo: () => { }
          }
        }
      },
      {
        name: 'Widget Settings',
        icon: 'edit',
        ...this.getWidgetSchemas()
      }
    ];
    return actions;
  }

  private getWidgetSchemas(): any {
    const propertiesSchema: IDataSchema = {
      type: 'object',
      properties: {
        pt: {
          title: 'Top',
          type: 'number'
        },
        pb: {
          title: 'Bottom',
          type: 'number'
        },
        pl: {
          title: 'Left',
          type: 'number'
        },
        pr: {
          title: 'Right',
          type: 'number'
        },
        align: {
          type: 'string',
          title: 'Alignment',
          enum: [
            'left',
            'center',
            'right'
          ]
        },
        maxWidth: {
          type: 'number'
        },
        link: {
          title: 'URL',
          type: 'string'
        }
      }
    };
    const themesSchema: IUISchema = {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Group',
              label: 'Padding (px)',
              elements: [
                {
                  type: 'VerticalLayout',
                  elements: [
                    {
                      type: 'HorizontalLayout',
                      elements: [
                        {
                          type: 'Control',
                          scope: '#/properties/pt',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/pb',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/pl',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/pr',
                        },
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    return {
      userInputDataSchema: propertiesSchema,
      userInputUISchema: themesSchema
    }
  }

  private getThemeSchema() {
    const dataSchema: IDataSchema = {
      type: 'object',
      properties: {
        backgroundColor: {
          title: 'Background color',
          type: 'string',
          format: 'color',
        },
        textColor: {
          title: 'Text color',
          type: 'string',
          format: 'color',
        }
      }
    };

    const jsonUISchema: IUISchema = {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/backgroundColor',
            },
            {
              type: 'Control',
              scope: '#/properties/textColor',
            },
          ]
        }
      ]
    };

    return { dataSchema, jsonUISchema };
  }

  async init() {
    super.init();
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    this.initEditor();
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const value = this.getAttribute('value', true);
      const placeholder = this.getAttribute('placeholder', true);
      await this.setData({ value, placeholder });
    }
  }

  render() {
    return (
      <i-panel
        id="pnlEditor"
        background={{ color: 'inherit' }}
        font={{ color: 'inherit' }}
        border={{ radius: 'inherit' }}
      ></i-panel>
    );
  }
}
