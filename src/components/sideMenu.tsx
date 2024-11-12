import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Button,
  Control
} from '@ijstech/components';
import { ScomEditorDragHandle } from './dragHandle';
import { ColorType } from './colorPicker';
import { ScomEditorSettingsForm, ISettingsForm } from './settingsForm';
import { buttonHoverStyle } from './index.css';
import { BasicBlockTypes, Block, BlockNoteEditor } from '@scom/scom-blocknote-sdk';
import { getConfigs } from '../global/index';
const Theme = Styles.Theme.ThemeVars;

interface ScomEditorSideMenuElement extends ControlElement {
  block?: Block;
  editor?: BlockNoteEditor;
}

interface ISideMenu {
  block: Block;
  editor: BlockNoteEditor;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-side-menu']: ScomEditorSideMenuElement;
    }
  }
}

@customElements('i-scom-editor-side-menu')
export class ScomEditorSideMenu extends Module {
  private btnDrag: Button;
  private btnAdd: Button;
  private btnEdit: Button;
  private dragHandle: ScomEditorDragHandle;
  private actionForm: ScomEditorSettingsForm;
  private currentModule: any;

  private _data: ISideMenu = {
    block: {
      id: '',
      type: '',
      props: undefined,
      content: [],
      children: []
    },
    editor: undefined
  };
  private initedMap: Map<string, boolean> = new Map();

  static async create(options?: ScomEditorSideMenuElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.handleAddBlock = this.handleAddBlock.bind(this);
    this.handleEditBlock = this.handleEditBlock.bind(this);
    this.showDragMenu = this.showDragMenu.bind(this);
    this.handleSetColor = this.handleSetColor.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onTypeChanged = this.onTypeChanged.bind(this);
  }

  get block() {
    return this._data.block;
  }
  set block(value: Block) {
    if (
      value.id && value.id === this._data?.block?.id &&
      value.type == this._data?.block?.type
    ) {
      this._data.block = value;
      return;
    }
    this._data.block = value;
    this.dragHandle.block = value;
    // this.id = `side-${this.block.id}`;
    this.updateButtons();
  }

  get editor() {
    return this._data.editor;
  }
  set editor(value: BlockNoteEditor) {
    this._data.editor = value;
  }

  get isEditShown() {
    return this.block?.type && !BasicBlockTypes.includes(this.block.type as string)
  }

  setData(value: ISideMenu) {
    this._data = value;
    this.dragHandle.freezeMenu = this.editor.sideMenu.freezeMenu;
    this.dragHandle.unfreezeMenu = this.editor.sideMenu.unfreezeMenu;
    this.dragHandle.setData({ block: this.block, editor: this.editor });
    this.btnDrag.addEventListener("dragstart", this.editor.sideMenu.blockDragStart);
    this.btnDrag.addEventListener("dragend", this.editor.sideMenu.blockDragEnd);
    this.btnDrag.draggable = true;
    this.updateButtons();
    // this.id = `side-${this.block.id}`;
  }

  private updateButtons() {
    this.btnEdit.visible = this.isEditShown;
    this.btnAdd.visible = !this.isEditShown;
  }

  openConfig(block: Block, module: any) {
    const isCustomBlock = block?.type && !BasicBlockTypes.includes(block.type as string)
    if (isCustomBlock && !this.initedMap.has(block.id)) {
      const editAction = this.getActions(module)[0];
      this.currentModule = module;
      this.showConfigModal(block, editAction);
      this.initedMap.set(block.id, true);
    }
  }

  private handleSetColor(type: ColorType, color: string) {
    this.editor.focus();
    const prop = type === 'text' ? 'textColor' : 'backgroundColor';
    this.editor.updateBlock(this.block, {
      props: { [prop]: color }
    });
    this.hideDragMenu();
  }

  private handleDelete() {
    this.editor.focus();
    this.editor.removeBlocks([this.block]);
    this.hideDragMenu();
  }

  private handleAddBlock() {
    this.editor.focus();
    this.editor.sideMenu.addBlock();
  }

  private showDragMenu(target: Control, event: MouseEvent) {
    event.preventDefault();
    this.editor.focus();
    this.dragHandle.onShowMenu(this);
  }

  private hideDragMenu() {
    this.dragHandle.onHideMenu();
  }

  private handleEditBlock() {
    this.editor.focus();
    const blockEl = this.editor.domElement.querySelector(`[data-id="${this.block.id}"]`) as HTMLElement;
    if (!blockEl) return;
    let module: any;
    let editAction: any;
    const blockType = this.block.type;
    if (blockType === 'codeBlock') {
      module = blockEl.querySelector('i-scom-editor--code-block');
      editAction = module.getActions();
    } else if (blockType === 'chart') {
      module = blockEl.querySelector('i-scom-charts--block')
      editAction = this.getActions(module)[0];
    } else if (blockType) {
      const configs = getConfigs();
      const moduleName = configs[blockType as string]?.localPath;
      if (moduleName) {
        module = blockEl.querySelector(`i-${moduleName}`);
        editAction = this.getActions(module)[0];
      }
    }

    this.currentModule = module;
    this.showConfigModal(this.block, editAction);
  }

  private showConfigModal(block: Block, editAction: any) {
    if (!editAction) return;
    const formConfig: ISettingsForm = {
      action: {...editAction},
      block: JSON.parse(JSON.stringify(block)),
      onConfirm: (block: Block, data: any) => {
        const newProps = {...data};
        if (block.type === 'video' || block.type === 'tweet') {
          if (data.url !== block.props.url) {
            this.updateBlock(block, { url: data.url });
          }
        } else if (block.type === 'imageWidget') {
          const { url, cid, link, altText, keyword, photoId, backgroundColor } = newProps;
          this.updateBlock(block, { url, cid, link, altText, keyword, photoId, backgroundColor });
        } else if (block.type === 'swap') {
          const { tokens, networks, title, logo, category, providers } = newProps;
          const defaultChainId = networks[0].chainId;
          this.updateBlock(block, { tokens, networks, title, logo, category, providers, defaultChainId });
        } else if (block.type === 'xchain') {
          const { tokens, networks } = newProps;
          const defaultChainId = networks[0].chainId;
          this.updateBlock(block, { tokens, networks, defaultChainId });
        } else if (block.type === 'chart') {
          const { name, apiEndpoint, dataSource, queryId, title, options, mode } = newProps;
          this.updateBlock(block, { name, apiEndpoint, dataSource, queryId, title, options, mode });
        } else if (block.type === 'staking') {
          const { chainId, name, desc, logo, getTokenURL, showContractLink, staking } = newProps;
          this.updateBlock(block, { chainId, name, desc, logo, getTokenURL, showContractLink, staking });
        } else if (block.type === 'voting') {
          const { title, backgroundImage, buttons, fontColor } = newProps;
          this.updateBlock(block, { title, backgroundImage, buttons, fontColor });
        } else if (block.type === 'nftMinter') {
          const { title, description, logoUrl, productId, link, requiredQuantity } = newProps;
          this.updateBlock(block, { title, description, logoUrl, productId, link, requiredQuantity });
        } else if (block.type === 'oswapNft') {
          const { tier, networks, defaultChainId } = newProps;
          const _defaultChainId = defaultChainId || networks[0]?.chainId;
          this.updateBlock(block, { tier, networks, defaultChainId: _defaultChainId });
        } else if (block.type === 'codeBlock') {
          const { code, language } = newProps;
          this.updateBlock(block, { code, language });
        }
        this.actionForm.closeModal();
      }
    }
    if (block.type === 'chart') {
      formConfig.onTypeChanged = this.onTypeChanged;
    }
    this.renderForm(formConfig);
  }

  private getActions(component: any) {
    if (component?.getConfigurators) {
      const configs = component.getConfigurators() || [];
      const configurator = configs.find((conf: any) => conf.target === 'Editor');
      if (configurator?.getActions) return configurator.getActions();
    }
    return [];
  }

  private async onTypeChanged(name: string) {
    if (this.currentModule?.updateType) {
      const actions = await this.currentModule.updateType(name);
      return actions[0];
    }
    return null;
  }

  private async renderForm(data: ISettingsForm) {
    if (!this.actionForm) {
      this.actionForm = new ScomEditorSettingsForm();
    }
    const modal = this.actionForm.openModal({
      title: 'Edit',
      width: '40rem'
    });
    await this.actionForm.setData(data);
    modal.refresh();
  }

  private async updateBlock (block: Block, props: Record<string, string>) {
    this.editor.updateBlock(block, { props });
  }

  init() {
    super.init();
    const block = this.getAttribute('block', true);
    const editor = this.getAttribute('editor', true);
    if (editor && block) this.setData({block, editor});
  }

  render() {
    return (
      <i-panel>
        <i-hstack verticalAlignment="center" minWidth={50}>
          <i-button
            id="btnAdd"
            icon={{name: 'plus', width: '0.75rem', height: '0.75rem', fill: Theme.text.secondary}}
            background={{color: 'transparent'}}
            boxShadow='none'
            padding={{top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem'}}
            border={{radius: '0.125rem'}}
            class={buttonHoverStyle}
            onClick={this.handleAddBlock}
          ></i-button>
          <i-button
            id="btnEdit"
            icon={{name: 'cog', width: '0.75rem', height: '0.75rem', fill: Theme.text.secondary}}
            background={{color: 'transparent'}}
            boxShadow='none'
            visible={false}
            border={{radius: '0.125rem'}}
            class={buttonHoverStyle}
            padding={{top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem'}}
            onClick={this.handleEditBlock}
          ></i-button>
          <i-button
            id="btnDrag"
            icon={{name: "grip-vertical", width: '0.75rem', height: '0.75rem', fill: Theme.text.secondary}}
            background={{color: 'transparent'}}
            boxShadow='none'
            class={buttonHoverStyle}
            border={{radius: '0.125rem'}}
            padding={{top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem'}}
            onClick={this.showDragMenu}
          ></i-button>
        </i-hstack>
        <i-scom-editor-drag-handle
          id="dragHandle"
          onSetColor={this.handleSetColor}
          onDeleted={this.handleDelete}
        />
      </i-panel>
    )
  }
}
