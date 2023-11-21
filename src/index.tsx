import {
  Module,
  customElements,
  ControlElement,
  Container,
  Panel,
  RequireJS,
  application,
  IDataSchema,
  IUISchema,
  Styles
} from '@ijstech/components';
import {
  addSlashMenu,
  addFormattingToolbar,
  addSideMenu,
  addHyperlinkToolbar,
  addImageToolbar,
  addVideoBlock,
  addImageBlock
} from './blocks/index';
import { Block } from './global';
import { CustomBlockTypes } from './components';
const Theme = Styles.Theme.ThemeVars;

type onChangedCallback = (value: string) => void;

interface ScomEditorElement extends ControlElement {
  // placeholder?: string;
  value?: string;
  lazyLoad?: boolean;
  onChanged?: onChangedCallback;
}

interface IEditor {
  // placeholder?: string;
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
  
  // get placeholder() {
  //   return this._data.placeholder;
  // }
  // set placeholder(data: string) {
  //   this._data.placeholder = data;
  // }

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
    const { VideoSlashItem, VideoBlock } = addVideoBlock(this._blocknoteObj);
    const { ImageSlashItem, ImageBlock } = addImageBlock(this._blocknoteObj);
    const customSchema = {
      ...this._blocknoteObj.defaultBlockSchema,
      video: VideoBlock,
      imageWidget: ImageBlock
    };
    this._editor = new this._blocknoteObj.BlockNoteEditor({
      parentElement: this.pnlEditor,
      blockSchema: customSchema,
      slashMenuItems: [
        ...this._blocknoteObj.getDefaultSlashMenuItems().filter((item) => item.name !== "Image"),
        VideoSlashItem,
        ImageSlashItem
      ],
      onEditorContentChange: async (editor: any) => {
        let value = '';
        for (let block of editor.topLevelBlocks) {
          if (CustomBlockTypes.includes(block.type) && block?.props.embedUrl) {
            const embedUrl = block.props.embedUrl;
            value += `[${embedUrl}](${embedUrl})`;
          } else {
            value += await editor.blocksToMarkdown([block]);
          }
        }
        this.value = value;
        if (this.onChanged) this.onChanged(this.value);
      },
      domAttributes: {
        editor: {
          class: 'scom-editor'
        }
      }
    });
    console.log('_blocknoteObj', this._blocknoteObj)
    if (this.value) this.markdownToBlocks(this.value);
    addSideMenu(this._editor);
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
    await this.markdownToBlocks(data.value || '');
  }

  private async markdownToBlocks(markdown: string) {
    if (!this._editor) return;
    const blocks: Block[] = await this._editor.markdownToBlocks(markdown);
    this._editor.replaceBlocks(JSON.parse(JSON.stringify(this._editor.topLevelBlocks)), JSON.parse(JSON.stringify(blocks)));
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
    const actions = [
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

  async init() {
    super.init();
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    this.initEditor();
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const value = this.getAttribute('value', true);
      // const placeholder = this.getAttribute('placeholder', true);
      await this.setData({ value });
    }
  }

  render() {
    return (
      <i-panel
        id="pnlEditor"
        background={{ color: Theme.background.main }}
        font={{ color: Theme.text.primary }}
        border={{ radius: 'inherit' }}
      ></i-panel>
    );
  }
}
