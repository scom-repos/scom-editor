import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Button
} from '@ijstech/components';
import { ScomEditorDragHandle } from './dragHandle';
import { ColorType } from './colorPicker';
import { Block, BlockNoteEditor } from '../global/index';
import { ScomEditorSettingsForm, ISettingsForm } from './settingsForm';
import { CustomBlockTypes } from './utils';
import { buttonHoverStyle } from './index.css';
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

  private _data: ISideMenu;
  private _isShowing: boolean = false;
  private initedMap: Map<string, boolean> = new Map();
  private configurator: any;

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
  }

  get block() {
    return this._data.block;
  }
  set block(value: Block) {
    if (value.id === this._data.block.id) return;
    this._data.block = value;
    this.dragHandle.block = value;
    this.id = `side-${this.block.id}`;
    this.updateButtons();
  }

  get editor() {
    return this._data.editor;
  }
  set editor(value: BlockNoteEditor) {
    this._data.editor = value;
  }

  get isEditShown() {
    return this.block?.type && CustomBlockTypes.includes(this.block.type as string)
  }

  get isShowing() {
    return this._isShowing ?? false;
  }

  setData(value: ISideMenu) {
    this._data = value;
    this.dragHandle.freezeMenu = this.editor.sideMenu.freezeMenu;
    this.dragHandle.unfreezeMenu = this.editor.sideMenu.unfreezeMenu;
    this.dragHandle.setData({ block: this.block });
    this.btnDrag.addEventListener("dragstart", this.editor.sideMenu.blockDragStart);
    this.btnDrag.addEventListener("dragend", this.editor.sideMenu.blockDragEnd);
    this.btnDrag.draggable = true;
    this.updateButtons();
    this.id = `side-${this.block.id}`;
  }

  private updateButtons() {
    this.btnEdit.visible = this.isEditShown;
    this.btnAdd.visible = !this.isEditShown;
  }

  openConfig(block: Block, module: any) {
    const isCustomBlock = block?.type && CustomBlockTypes.includes(block.type as string)
    if (isCustomBlock && !this.initedMap.has(block.id)) {
      const editAction = this.getActions(module)[0];
      this.showConfigModal(block, editAction);
      this.initedMap.set(block.id, true);
    }
  }

  private handleSetColor(type: ColorType, color: string) {
    const prop = type === 'text' ? 'textColor' : 'backgroundColor';
    this.editor.updateBlock(this.block, {
      props: { [prop]: color }
    });
    this.hideDragMenu();
  }

  private handleDelete() {
    this.editor.removeBlocks([this.block]);
    this.hideDragMenu();
  }

  private handleAddBlock() {
    this.editor.sideMenu.addBlock();
  }

  private showDragMenu() {
    this.dragHandle.onShowMenu();
    this._isShowing = true;
  }

  private hideDragMenu() {
    this.dragHandle.onHideMenu();
    this._isShowing = false;
  }

  private handleEditBlock() {
    const blockEl = this.editor.domElement.querySelector(`[data-id="${this.block.id}"]`) as HTMLElement;
    if (!blockEl) return;
    let module: any;
    let editAction: any;
    switch(this.block.type) {
      case 'video':
        module = blockEl.querySelector('i-scom-video');
        editAction = this.getActions(module)[0];
        break;
      case 'imageWidget':
        module = blockEl.querySelector('i-scom-image');
        editAction = this.getActions(module)[0];
        break;
      case 'swap':
        module = blockEl.querySelector('i-scom-swap');
        editAction = this.getActions(module)[0];
        break;
    }
    this.showConfigModal(this.block, editAction);
  }

  private showConfigModal(block: Block, editAction: any) {
    const formConfig: ISettingsForm = {
      action: {...editAction},
      block: JSON.parse(JSON.stringify(block)),
      onConfirm: (block: Block, data: any) => {
        const newProps = {...data};
        if (block.type === 'video') {
          if (data.url !== block.props.url) {
            this.updateBlock(block, { url: data.url });
          }
        } else if (block.type === 'imageWidget') {
          const { url, cid, link, altText, keyword, photoId, backgroundColor } = newProps;
          this.updateBlock(block, { url, cid, link, altText, keyword, photoId, backgroundColor });
        } else if (block.type === 'swap') {
          const { tokens, networks, title, logo, category, providers } = newProps;
          this.updateBlock(block, { tokens, networks, title, logo, category, providers });
        }
        this.actionForm.closeModal();
      }
    }
    if (formConfig) this.renderForm(formConfig);
  }

  private getActions(component: any) {
    if (component?.getConfigurators) {
      const configs = component.getConfigurators() || [];
      this.configurator = configs.find((conf: any) => conf.target === 'Editor');
      if (this.configurator?.getActions) return this.configurator.getActions();
    }
    return [];
  }

  private renderForm(data: ISettingsForm) {
    if (this.actionForm) {
      this.actionForm.setData(data);
    } else {
      this.actionForm = new ScomEditorSettingsForm(undefined, { data });
    }
    this.actionForm.openModal({
      title: 'Edit',
      width: '40rem'
    });
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
            icon={{name: "ellipsis-v", width: '0.75rem', height: '0.75rem', fill: Theme.text.secondary}}
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
