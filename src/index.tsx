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
import { Block, BlockNoteEditor, BlockNoteEditorOptions, PartialBlock } from './global/index';
import { CustomBlockTypes, WidgetMapping, getModalContainer } from './components/index';
const Theme = Styles.Theme.ThemeVars;

type onChangedCallback = (value: string) => void;

interface ScomEditorElement extends ControlElement {
  value?: string;
  lazyLoad?: boolean;
  onChanged?: onChangedCallback;
}

interface IEditor {
  value?: string;
}

const WIDGET_LOADER_URL = 'https://ipfs.scom.dev/ipfs/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4'

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

  private timer: any;

  public onChanged: onChangedCallback;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get value() {
    return this._data.value ?? '';
  }
  set value(data: string) {
    this._data.value = data ?? '';
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

  private async renderEditor(initialContent?: PartialBlock[]) {
    if (!this._blocknoteObj) return;
    this.pnlEditor.clearInnerHTML();
    getModalContainer().innerHTML = '';
    const { VideoSlashItem, VideoBlock } = addVideoBlock(this._blocknoteObj);
    const { ImageSlashItem, ImageBlock } = addImageBlock(this._blocknoteObj);
    const customSchema = {
      ...this._blocknoteObj.defaultBlockSchema,
      video: VideoBlock,
      imageWidget: ImageBlock,
    };
    const editorConfig: BlockNoteEditorOptions = {
      parentElement: this.pnlEditor,
      blockSchema: customSchema,
      slashMenuItems: [
        ...this._blocknoteObj.getDefaultSlashMenuItems().filter((item) => item.name !== 'Image'),
        VideoSlashItem,
        ImageSlashItem,
      ],
      onEditorContentChange: (editor: any) => {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.onEditorChanged(editor);
        }, 500);
      },
      domAttributes: {
        editor: {
          class: 'scom-editor',
        },
      },
    };
    if (initialContent) editorConfig.initialContent = initialContent;
    this._editor = new this._blocknoteObj.BlockNoteEditor(editorConfig);
    addSideMenu(this._editor);
    addFormattingToolbar(this._editor);
    addSlashMenu(this._editor);
    addHyperlinkToolbar(this._editor);
    addImageToolbar(this._editor);
  }

  private isEmptyBlock(block: Block) {
    let result = false;
    let type = block.type as string;
    if (type === 'paragraph') return !block.content?.length && !block.children?.length;
    return result;
  }

  private async onEditorChanged(editor: BlockNoteEditor) {
    let value = '';
    for (let block of editor.topLevelBlocks) {
      if (!this.isEmptyBlock(block)) {
        value += await this.blockToMarkdown(block, '', true);
      }
    }
    this.value = value;
    console.log(this.value);
    if (this.onChanged) this.onChanged(this.value);
  }

  private async getMarkdown(block: Block, isStart?: boolean) {
    let value = '';
    try {
      const blockType = block.type as string;
      if (CustomBlockTypes.includes(blockType)) {
        const { altText = '', url } = block.props;
        const mdString = blockType === 'video' ? `[video](${url})` : `![${altText || ''}](${url})`;
        value += `\\n\\n${mdString}\\n\\n`;
      } else if (!this.isEmptyBlock(block)) {
        const blockValue = await this._editor.blocksToMarkdown([block]);
        value += `${!isStart ? '\\n\\n' : ''}${blockValue}`;
      }
    } catch {}
    return value
  }

  private async blockToMarkdown(block: Block, result: string, isStart?: boolean) {
    if (this.isEmptyBlock(block)) return result;
    const clonedBlock = JSON.parse(JSON.stringify(block));
    clonedBlock.children = [];
    result += await this.getMarkdown(clonedBlock, isStart);
    if (block.children?.length) {
      for (const child of block.children) {
        result += await this.blockToMarkdown(child, '');
      }
    }
    return result;
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
    if (!this._editor) await this.initEditor();
    if (data.value) {
      const blocks = await this.markdownToBlocks(data.value);
      this.renderEditor(blocks);
    }
  }

  private async markdownToBlocks(markdown: string) {
    if (!this._editor) return [];
    const blocks: Block[] = await this._editor.markdownToBlocks(markdown);
    let formattedBlocks = [];
    for (let block of blocks) {
      let text = '';
      if (block.type === 'paragraph') {
        text =
          block.content[0]?.type === 'text'
            ? block.content[0]?.text
            : block.content[0]?.type === 'link'
            ? block.content[0]?.href
            : '';
      }
      text = (text || '').trim();
      const customType = this.getContentType(text);
      if (customType) {
        const newBlock = {
          type: customType,
          props: {
            url: text
          },
        };
        formattedBlocks.push(newBlock);
      } else {
        formattedBlocks.push(block);
      }
    }
    return JSON.parse(JSON.stringify(formattedBlocks));
  }

  private getContentType(content: string) {
    const imageUrlRegex = /https:\/\/\S+\.(jpg|jpeg|png|gif|webp|svg)/g;
    const videoUrlRegex = /https:\/\/\S+\.(mp4|webm)/g;
    const youtubeUrlRegex = /https:\/\/(?:www\.|m\.)(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/g;
    if (imageUrlRegex.test(content)) return 'imageWidget';
    if (videoUrlRegex.test(content)) return 'video';
    if (youtubeUrlRegex.test(content)) return 'video';
    return '';
  }

  private getEmbedUrl(block: Block) {
    const type = block.type as string;
    let module = WidgetMapping[type];
    if (module) {
      const widgetData = {
        module,
        properties: { ...block.props },
      };
      const encodedWidgetDataString = window.btoa(JSON.stringify(widgetData));
      return `${WIDGET_LOADER_URL}?data=${encodedWidgetDataString}`;
    }
    return '';
  }

  private parseData(value: string) {
    try {
      const utf8String = decodeURIComponent(value);
      const decodedString = window.atob(utf8String);
      const newData = JSON.parse(decodedString);
      return { ...newData };
    } catch {}
    return null;
  }

  private updateTag(type: 'light' | 'dark', value: any) {
    this.tag[type] = this.tag[type] ?? {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) this.tag[type][prop] = value[prop];
    }
  }

  private async setTag(value: any) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark') this.updateTag(prop, newValue[prop]);
        else this.tag[prop] = newValue[prop];
      }
    }
    this.updateTheme();
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
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
        ...this.getWidgetSchemas(),
      },
    ];
    return actions;
  }

  private getWidgetSchemas(): any {
    const propertiesSchema: IDataSchema = {
      type: 'object',
      properties: {
        pt: {
          title: 'Top',
          type: 'number',
        },
        pb: {
          title: 'Bottom',
          type: 'number',
        },
        pl: {
          title: 'Left',
          type: 'number',
        },
        pr: {
          title: 'Right',
          type: 'number',
        },
        align: {
          type: 'string',
          title: 'Alignment',
          enum: ['left', 'center', 'right'],
        },
        maxWidth: {
          type: 'number',
        },
        link: {
          title: 'URL',
          type: 'string',
        },
      },
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
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    return {
      userInputDataSchema: propertiesSchema,
      userInputUISchema: themesSchema,
    };
  }

  onHide(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  async init() {
    super.init();
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const value = this.getAttribute('value', true);
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
