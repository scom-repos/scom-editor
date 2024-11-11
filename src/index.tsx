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
  Styles,
  Control
} from '@ijstech/components';
import {
  addSlashMenu,
  addFormattingToolbar,
  addSideMenu,
  addHyperlinkToolbar,
  addTableToolbar,
  addFileBlock,
  addCodeBlock
} from './blocks/index';
import { Block, BlockNoteEditor, BlockNoteEditorOptions, execCustomBLock, PartialBlock } from "@scom/scom-blocknote-sdk";
import { getModalContainer, getToolbar, getToolbars, removeContainer, ScomEditorSideMenu } from './components/index';
import { customEditorStyle } from './index.css';
import { addConfig, getBlockFromExtension } from './global/index';
const Theme = Styles.Theme.ThemeVars;

type onChangedCallback = (value: string) => void;

interface ScomEditorElement extends ControlElement {
  value?: string;
  viewer?: boolean;
  lazyLoad?: boolean;
  widgets?: string[];
  onChanged?: onChangedCallback;
}

interface IEditor {
  value?: string;
  viewer?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor']: ScomEditorElement;
    }
  }
}

const path = application.currentModuleDir;
const libPlugins = [
  'blocknote'
];
const cssPath = `${path}/lib/@blocknote/style.css`;
const DEFAUT_WIDGETS = [
  'scom-video',
  'scom-image',
  'scom-charts',
  'scom-twitter-post',
  'scom-voting',
  'scom-nft-minter',
  'oswap-nft-widget',
  'scom-xchain-widget',
  'scom-staking',
];

@customElements('i-scom-editor')
export class ScomEditor extends Module {
  private pnlEditor: Panel;

  private _blocknoteObj: any;
  private _editor: any;
  private _data: IEditor;
  private _widgets: string[];

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

  get viewer() {
    return this._data.viewer ?? false;
  }
  set viewer(data: boolean) {
    this._data.viewer = data ?? false;
  }

  get widgets() {
    return this._widgets || DEFAUT_WIDGETS;
  }
  set widgets(data: string[]) {
    this._widgets = data || DEFAUT_WIDGETS;
    if (this._editor) this.renderData();
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
      await this.renderEditor();
    } catch { }
  }

  private async renderEditor(initialContent?: PartialBlock[]) {
    if (!this._blocknoteObj) return;
    this.pnlEditor.clearInnerHTML();
    removeContainer();

    const {
      blockSpecs: customBlockSpecs,
      slashMenuItems: customSlashMenuItems
    } = await this.addCustomWidgets(this._blocknoteObj, execCustomBLock, this.addBlockCallback.bind(this));

    const { FileSlashItem } = addFileBlock();
    const { CodeSlashItem, CodeBlock } = addCodeBlock(this._blocknoteObj);

    const blockSpecs = {
      ...this._blocknoteObj.defaultBlockSpecs,
      codeBlock: CodeBlock,
      ...customBlockSpecs,
    };

    const editorConfig: BlockNoteEditorOptions = {
      parentElement: this.pnlEditor,
      blockSpecs,
      editable: !this.viewer,
      slashMenuItems: [
        ...this._blocknoteObj.getDefaultSlashMenuItems().filter((item) => item.name !== 'Image'),
        FileSlashItem,
        CodeSlashItem,
        ...customSlashMenuItems
      ],
      onEditorContentChange: (editor: BlockNoteEditor) => {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.onEditorChanged(editor);
        }, 500);
      },
      domAttributes: {
        editor: {
          class: customEditorStyle,
        },
      },
    };
    if (initialContent) editorConfig.initialContent = initialContent;
    this._editor = new this._blocknoteObj.BlockNoteEditor(editorConfig);
    addSideMenu(this._editor);
    addFormattingToolbar(this._editor);
    addSlashMenu(this._editor);
    addHyperlinkToolbar(this._editor);
    addTableToolbar(this._editor);
    this._editor.domElement.addEventListener('focus', () => {
      const sideMenu = getToolbar('sideMenu');
      if (sideMenu) sideMenu.opacity = 1;
    })

    this._editor.domElement.addEventListener("blur", (event: MouseEvent) => {
      const sideMenus = getModalContainer().querySelectorAll('i-scom-editor-side-menu');
      for (let menu of sideMenus) {
        (menu as Control).opacity = 0;
      }
    })
  }

  private async addCustomWidgets(blocknote: any, executeFn: any, callbackFn?: any) {
    const blockSpecs: { [key: string]: any } = {};
    const slashMenuItems: any[] = [];
    const promises: Promise<any>[] = [];
    for (let widget of this.widgets) {
      promises.push(this.createWidget(widget, blocknote, executeFn, callbackFn));
    }
    const results = await Promise.all(promises);
    for (let result of results) {
      if (!result || !result?.block?.config?.type) continue;
      blockSpecs[result.block.config.type] = result.block;
      slashMenuItems.push(result.slashItem);
    }
    return { blockSpecs, slashMenuItems };
  }

  private async createWidget(name: string, blocknote: any, executeFn: any, callbackFn?: any) {
    try {
      const module = await application.createElement(name) as any;
      if('ready' in module && name === 'scom-twitter-post') {
        await module.ready();
      }
      if (module && 'addBlock' in module) {
        const { block, slashItem, moduleData } = module.addBlock(blocknote, executeFn, callbackFn);
        block?.config?.type && addConfig(block?.config?.type, moduleData);
        return { block, slashItem };
      }
    } catch {}
  }

  private addBlockCallback(module: any, block: Block) {
    if (!block || !block.type || !module) return;
    const sideMenu = getToolbar('sideMenu') as ScomEditorSideMenu;
    const properties = block.props;

    const openConfigIfMissingProp = (condition: boolean) => {
      if (sideMenu && condition) sideMenu.openConfig(block, module);
    };
  
    switch (block.type) {
      case "imageWidget":
      case "video":
      case "tweet":
        openConfigIfMissingProp(!properties?.url);
        break;
      case "swap":
        openConfigIfMissingProp(!properties?.providers?.length);
        break;
      case "xchain":
        openConfigIfMissingProp(!properties?.tokens?.length);
        break;
      case "staking":
        openConfigIfMissingProp(!properties?.chainId);
        break;
      case "nftMinter":
        openConfigIfMissingProp(!properties?.productType);
        break;
      case "voting":
        openConfigIfMissingProp(!properties?.title);
        break;
      case "oswapNft":
        openConfigIfMissingProp(!properties?.networks?.length);
        break;
    }
  }

  private async onEditorChanged(editor: BlockNoteEditor) {
    let value = '';
    const blocks = editor.topLevelBlocks;
    blocks.pop();
    value = await editor.blocksToMarkdownLossy(blocks);
    this.value = value.replace(/\[(swap|xchain|staking|chart|voting|nftMinter|oswapNft)\]\((.*)\)/g, "$2");
    console.log(JSON.stringify({ value: this.value }));
    if (this.onChanged) this.onChanged(this.value);
    const sideMenu = getToolbar('sideMenu');
    if (sideMenu) sideMenu.opacity = 0;
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
      RequireJS.config({
        paths: {
          'blocknote': `${path}/lib/@blocknote/blocknote.bundled.umd.js`
        }
      })
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
      await this.renderData();
    }
  }

  private async renderData() {
    if (!this._editor) return;
    const blocks: Block[] = await this._editor.tryParseMarkdownToBlocks(this.value);
    this.renderEditor(JSON.parse(JSON.stringify(blocks)));
  }

  async setValue(value: string) {
    this.value = value;
    if (!this._editor) return;
    const blocks: Block[] = await this._editor.tryParseMarkdownToBlocks(value);
    this._editor.replaceBlocks(this._editor.topLevelBlocks, blocks);
  }

  async insertFile(url: string) {
    try {
      const block = await getBlockFromExtension(url);
      if (block) execCustomBLock(this._editor, block);
    } catch (error) { }
  }

  insertBlock(block: Block) {
    const currentBlock = this._editor.getTextCursorPosition().block;
    this._editor.insertBlocks([block], currentBlock, "after");
    this._editor.setTextCursorPosition(
      this._editor.getTextCursorPosition().nextBlock!,
      "end"
    );
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
    const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
    this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
    this.updateStyle('--input-background', this.tag[themeVar]?.inputBackgroundColor);
    this.updateStyle('--input-font_color', this.tag[themeVar]?.inputFontColor);
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
    removeContainer();
    getToolbars().clear();
  }

  focus() {
    if (!this._editor) return;
    this._editor.focus();
  }

  async init() {
    super.init();
    removeContainer();
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const value = this.getAttribute('value', true);
      const viewer = this.getAttribute('viewer', true);
      const scconfig = application.store.scconfig;
      let customWidgets = null;
      if (scconfig) {
        try {
          customWidgets = typeof scconfig === 'string' ? JSON.parse(scconfig)?.editorWidgets : scconfig.editorWidgets;
        } catch (error) {
        }
      }
      this._widgets = customWidgets || this.getAttribute('widgets', true);
      await this.setData({ value, viewer });
    }
  }

  render() {
    return (
      <i-panel
        id="pnlEditor"
        height="100%"
        background={{ color: Theme.background.main }}
        font={{ color: Theme.text.primary }}
        border={{ radius: 'inherit' }}
      ></i-panel>
    );
  }
}
