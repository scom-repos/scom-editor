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
const Theme = Styles.Theme.ThemeVars;

interface ScomEditorSideMenuElement extends ControlElement {
  block?: any;
  editor?: any;
}

interface ISideMenu {
  block: any;
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
  private dragHandle: ScomEditorDragHandle;

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
  set block(value: any) {
    this._data.block = value;
    this.dragHandle.block = value;
  }

  get editor() {
    return this._data.editor;
  }
  set editor(value: any) {
    this._data.editor = value;
    this.dragHandle.editor = value;
  }

  get isShowing() {
    return this._isShowing ?? false;
  }

  setData(value: ISideMenu) {
    this._data = value;
    this.dragHandle.setData({ block: this.block, editor: this.editor });
    this.btnDrag.addEventListener("dragstart", this.editor.sideMenu.blockDragStart);
    this.btnDrag.addEventListener("dragend", this.editor.sideMenu.blockDragEnd);
    this.btnDrag.draggable = true;
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

  private addBlock() {
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

  init() {
    super.init();
    const block = this.getAttribute('block', true);
    const editor = this.getAttribute('editor', true);
    if (editor && block) this.setData({block, editor});
  }

  render() {
    return (
      <i-panel>
        <i-hstack>
          <i-button
            padding={{top: 0, bottom: 0, left: '0.25rem', right: '0.25rem'}}
            icon={{name: 'plus', width: '0.75rem', height: '0.75rem', fill: Theme.text.primary}}
            background={{color: 'transparent'}}
            boxShadow='none'
            onClick={() => this.addBlock()}
          ></i-button>
          <i-button
            id="btnDrag"
            border={{ radius: '0px'}}
            padding={{top: 0, bottom: 0, left: '0.25rem', right: '0.25rem'}}
            icon={{name: "ellipsis-v", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary}}
            background={{color: 'transparent'}}
            boxShadow='none'
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
