import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Menu,
  Panel
} from '@ijstech/components';
import { ColorType, ScomEditorColorPicker } from './colorPicker';
const Theme = Styles.Theme.ThemeVars;

type deletedCallback = () => void;
type setColorCallback = (type: ColorType, color: string) => void;

interface ScomEditorDragHandleElement extends ControlElement {
  block?: any;
  editor?: any
  onDeleted?: deletedCallback;
  onSetColor?: setColorCallback;
}

interface ISideMenu {
  block: any;
  editor: any;
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
  private pnlMenu: Panel;
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
  set block(value: any) {
    this._data.block = value;
  }

  get editor() {
    return this._data.editor;
  }
  set editor(value: any) {
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
        this.pnlMenu.visible = false;
      }
    }
  }

  private handleMenu(target: Menu, item: any) {
    if (item.id === 'delete') {
      if (this.onDeleted) this.onDeleted()
    } else {
      this.mdPicker.showModal();
      if (this.editor) this.editor.sideMenu.freezeMenu();
    }
  }

  onShowMenu() {
    this.pnlMenu.visible = true;
    if (this.editor) this.editor.sideMenu.freezeMenu();
  }

  onHideMenu() {
    this.pnlMenu.visible = false;
    if (this.editor) this.editor.sideMenu.unfreezeMenu();
  }

  private onColorClicked(type: ColorType, color: string) {
    if (this.onSetColor) this.onSetColor(type, color);
  }

  init() {
    super.init();
    this.onDeleted = this.getAttribute('onDeleted', true) || this.onDeleted;
    this.onSetColor = this.getAttribute('onSetColor', true) || this.onSetColor;
    const block = this.getAttribute('block', true);
    const editor = this.getAttribute('editor', true);
    if (editor && block) this.setData({block, editor});
  }

  render() {
    return (
      <i-panel id="pnlMenu" visible={false}>
        <i-menu
          id="menuElm"
          padding={{top: '0rem', bottom: '0rem', left: '0.675rem', right: '0.675rem'}}
          font={{color: Theme.text.primary, size: '0.75rem'}}
          boxShadow={Theme.shadows[1]}
          width={'6.25rem'}
          position="absolute"
          left="-4.375rem" top="-3rem"
          mode="vertical"
          data={this._menuData}
          background={{color: Theme.background.modal}}
          onItemClick={this.handleMenu}
        ></i-menu>
        <i-scom-editor-color-picker id="mdPicker" onSelected={this.onColorClicked}/>
      </i-panel>
    )
  }
}
