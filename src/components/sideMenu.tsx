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
  editor: any;
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

  static async create(options?: ScomEditorSideMenuElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get block() {
    return this._data.block;
  }
  set block(value: Block) {
    this._data.block = value;
    this.dragHandle.block = value;
    this.btnEdit.visible = this.block?.type && CustomBlockTypes.includes(this.block.type as string);
  }

  get editor() {
    return this._data.editor;
  }
  set editor(value: BlockNoteEditor) {
    this._data.editor = value;
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
    this.btnEdit.visible = this.block?.type && CustomBlockTypes.includes(this.block.type as string);
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
    let formConfig: ISettingsForm;
    switch(this.block.type) {
      case 'video':
        module = blockEl.querySelector('i-scom-video');
        editAction = this.getEditAction(module);
        if (editAction) {
          formConfig = {
            action: {...editAction},
            props: {...this.block.props},
            onConfirm: (data: any) => {
              if (data.url !== this.block.props.url) {
                this.updateBlock({ url: data.url });
              }
              this.actionForm.closeModal();
            }
          }
        }
        break;
      case 'imageWidget':
        module = blockEl.querySelector('i-scom-image');
        editAction = this.getEditAction(module);
        if (editAction) {
          formConfig = {
            action: {...editAction},
            props: {...this.block.props},
            onConfirm: (data: any) => {
              this.updateBlock({
                url: data.url,
                cid: data?.cid || '',
                link: data?.link || '',
                altText: data?.altText || '',
                keyword: data?.keyword || '',
                photoId: data?.photoId || ''
              });
              this.actionForm.closeModal();
            }
          }
        }
        break;
    }
    if (formConfig) this.renderForm(formConfig);
  }

  private getActions(component: any) {
    if (component?.getConfigurators) {
      const configs = component.getConfigurators() || [];
      const builderTarget = configs.find((conf: any) => conf.target === 'Builders');
      if (builderTarget?.getActions) return builderTarget.getActions();
    }
    return [];
  }

  private getEditAction(component: any) {
    const actions = this.getActions(component);
    return actions.find(action => action.name === 'Edit') || null;
  }

  private renderForm(data: ISettingsForm) {
    if (this.actionForm) {
      this.actionForm.setData(data);
    } else {
      this.actionForm = new ScomEditorSettingsForm(undefined, { data });
    }
    this.actionForm.openModal({
      title: 'Edit',
      width: '30rem'
    });
  }

  private updateBlock (props: Record<string, string>) {
    const newProps = { ...this.block.props, ...props };
    this.editor.updateBlock(this.block, { props: newProps });
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
        <i-hstack verticalAlignment="center" gap={'0.5rem'}>
          <i-button
            id="btnAdd"
            icon={{name: 'plus', width: '0.75rem', height: '0.75rem', fill: Theme.text.primary}}
            background={{color: 'transparent'}}
            boxShadow='none'
            class={buttonHoverStyle}
            onClick={() => this.handleAddBlock()}
          ></i-button>
          <i-button
            id="btnEdit"
            icon={{name: 'cog', width: '0.75rem', height: '0.75rem', fill: Theme.text.primary}}
            background={{color: 'transparent'}}
            boxShadow='none'
            visible={false}
            class={buttonHoverStyle}
            onClick={() => this.handleEditBlock()}
          ></i-button>
          <i-button
            id="btnDrag"
            border={{ radius: '0px'}}
            icon={{name: "ellipsis-v", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary}}
            background={{color: 'transparent'}}
            boxShadow='none'
            class={buttonHoverStyle}
            onClick={() => this.showDragMenu()}
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
