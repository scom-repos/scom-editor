import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Menu,
  Modal,
  Control
} from '@ijstech/components';
import { ColorType, ScomEditorColorPicker } from './colorPicker';
import { Block, BlockNoteEditor } from '../global/index';
import { getModalContainer } from './utils';
import { customModalStyle } from './index.css';
const Theme = Styles.Theme.ThemeVars;

type deletedCallback = () => void;
type setColorCallback = (type: ColorType, color: string) => void;

interface ScomEditorDragHandleElement extends ControlElement {
  block?: Block;
  editor?: BlockNoteEditor;
  onDeleted?: deletedCallback;
  onSetColor?: setColorCallback;
  unfreezeMenu?: () => void;
  freezeMenu?: () => void;
}

interface ISideMenu {
  block: Block;
  editor?: BlockNoteEditor;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-drag-handle']: ScomEditorDragHandleElement;
    }
  }
}

@customElements('i-scom-editor-drag-handle')
export class ScomEditorDragHandle extends Module {
  private mdMenu: Modal; 
  private menuElm: Menu;
  private mdPicker: ScomEditorColorPicker;

  private _data: ISideMenu;
  private _menuData = [
    {
      title: `<i-label caption="Delete"></i-label>`,
      id: 'delete'
    },
    {
      title: `<i-hstack verticalAlignment="center" horizontalAlignment="space-between" width="100%">
        <i-label caption="Colors"></i-label>
        <i-icon width="16px" height="16px" fill="${Theme.text.primary}" name="angle-right"></i-icon>
      </i-hstack>`,
      id: 'color'
    }
  ]

  onDeleted: deletedCallback;
  onSetColor: setColorCallback;
  unfreezeMenu: () => void;
  freezeMenu: () => void;

  static async create(options?: ScomEditorDragHandleElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.handleMenu = this.handleMenu.bind(this);
    this.onColorClicked = this.onColorClicked.bind(this);
  }

  get block() {
    return this._data.block;
  }
  set block(value: Block) {
    this._data.block = value;
  }

  get editor() {
    return this._data.editor;
  }
  set editor(value: BlockNoteEditor) {
    this._data.editor = value;
  }

  setData(value: ISideMenu) {
    this._data = value;
    this.renderUI();
  }

  private renderUI() {
    if (this.mdPicker) {
      this.mdPicker.setData({
        textColor: this.block?.props?.textColor,
        backgroundColor: this.block?.props?.backgroundColor
      })
      this.mdPicker.onClosed = () => {
        this.mdMenu.visible = false;
      }
    }
  }

  private handleMenu(target: Menu, item: any) {
    if (item.id === 'delete') {
      if (this.onDeleted) this.onDeleted()
    } else {
      if (this.editor) this.editor.focus();
      this.mdPicker.showModal(this.mdMenu, 'right');
      if (this.freezeMenu) this.freezeMenu();
    }
  }

  onShowMenu(parent: Control) {
    getModalContainer().appendChild(this.mdMenu);
    this.mdMenu.showBackdrop = false;
    this.mdMenu.linkTo = parent;
    this.mdMenu.popupPlacement = 'left';
    this.mdMenu.visible = true;
  }

  onHideMenu() {
    if (this.mdMenu) this.mdMenu.remove();
    this.mdMenu.visible = false;
  }

  private onModalClose() {
    if (this.unfreezeMenu) this.unfreezeMenu();
  }

  private onModalOpen() {
    if (this.freezeMenu) this.freezeMenu();
  }

  private onColorClicked(type: ColorType, color: string) {
    if (this.onSetColor) this.onSetColor(type, color);
  }

  init() {
    super.init();
    this.onDeleted = this.getAttribute('onDeleted', true) || this.onDeleted;
    this.onSetColor = this.getAttribute('onSetColor', true) || this.onSetColor;
    this.freezeMenu = this.getAttribute('freezeMenu', true) || this.freezeMenu;
    this.unfreezeMenu = this.getAttribute('unfreezeMenu', true) || this.unfreezeMenu;
    const block = this.getAttribute('block', true);
    const editor = this.getAttribute('editor', true);
    if (block) this.setData({block, editor});
  }

  render() {
    return (
      <i-modal
        id="mdMenu"
        popupPlacement="left"
        showBackdrop={false}
        minWidth={0}
        maxWidth={'6.25rem'}
        visible={false}
        position="absolute"
        zIndex={9999}
        class={customModalStyle}
        onOpen={this.onModalOpen}
        onClose={this.onModalClose}
      >
        <i-panel>
          <i-menu
            id="menuElm"
            padding={{top: '0rem', bottom: '0rem', left: '0.675rem', right: '0.675rem'}}
            font={{color: Theme.text.primary, size: '0.75rem'}}
            boxShadow={Theme.shadows[1]}
            width={'100%'}
            mode="vertical"
            data={this._menuData}
            background={{color: Theme.background.modal}}
            onItemClick={this.handleMenu}
          ></i-menu>
          <i-scom-editor-color-picker id="mdPicker" onSelected={this.onColorClicked}/>
        </i-panel>
      </i-modal>
    )
  }
}
