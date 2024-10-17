import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Button
} from '@ijstech/components';
import { BlockNoteEditor } from '../global/index';
import { ScomEditorTableMenu } from './tableMenu';
import { buttonHoverStyle } from './index.css';

const Theme = Styles.Theme.ThemeVars;

interface ScomEditorTableToolbarElement extends ControlElement {
  editor: BlockNoteEditor;
  block: any;
  orientation: "row" | "column";
  index: number;
  dragStart: (e: any) => void;
  dragEnd: (e: any) => void;
  freezeHandles?: () => void;
  unfreezeHandles?: () => void;
  showOtherSide?: () => void;
  hideOtherSide?: () => void;
}

interface ITableToolbar {
  editor: BlockNoteEditor;
  block: any;
  orientation: "row" | "column";
  index: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-table-toolbar']: ScomEditorTableToolbarElement;
    }
  }
}

@customElements('i-scom-editor-table-toolbar')
export class ScomEditorTableToolbar extends Module {
  private tableMenu: ScomEditorTableMenu;
  private btnTableToolbar: Button;

  private _data: ITableToolbar;

  showOtherSide: () => void;
  hideOtherSide: () => void;
  dragStart: (e: any) => void;
  dragEnd: (e: any) => void;
  freezeHandles: () => void;
  unfreezeHandles: () => void;

  static async create(options?: ScomEditorTableToolbarElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.onButtonClicked = this.onButtonClicked.bind(this);
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
  set editor(value: BlockNoteEditor) {
    this._data.editor = value;
  }

  get index() {
    return this._data.index;
  }
  set index(value: number) {
    this._data.index = value;
  }

  get orientation() {
    return this._data.orientation;
  }
  set orientation(value: 'row'|'column') {
    this._data.orientation = value;
  }

  setData(value: ITableToolbar) {
    this._data = value;
    // this.addEventListener("dragstart", this.dragStart);
    // this.addEventListener("dragend", this.dragEnd);
    this.btnTableToolbar.icon.name = this.orientation === 'row' ? 'grip-vertical' : 'grip-horizontal';
  }

  protected _handleMouseDown(event: MouseEvent, stopPropagation?: boolean): boolean {
    event.stopPropagation();
    this.onButtonClicked();
    event.preventDefault();
    return true;
  }

  private onButtonClicked() {
    if (this.tableMenu) {
      this.tableMenu.setData({...this._data});
    } else {
      this.tableMenu = new ScomEditorTableMenu(undefined, {...this._data});
      this.tableMenu.onClose = () => {
        this.tableMenu.closeModal();
        if (this.unfreezeHandles) this.unfreezeHandles();
      }
    }
    this.tableMenu.openModal({
      showBackdrop: false,
      popupPlacement: "rightTop",
      position: 'absolute',
      minWidth: '9.375rem',
      maxWidth: '10rem',
      boxShadow: Theme.shadows[1],
      linkTo: this,
      zIndex: 9999,
      onClose: () => {
        if (this.unfreezeHandles) this.unfreezeHandles();
        if (this.showOtherSide) this.showOtherSide();
      }
    })
    if (this.freezeHandles) this.freezeHandles();
    if (this.hideOtherSide) this.hideOtherSide();
  }

  init() {
    super.init();
    this.showOtherSide = this.getAttribute('showOtherSide', true) || this.showOtherSide;
    this.hideOtherSide = this.getAttribute('hideOtherSide', true) || this.hideOtherSide;
    this.dragStart = this.getAttribute('dragStart', true) || this.dragStart;
    this.dragEnd = this.getAttribute('dragEnd', true) || this.dragEnd;
    this.freezeHandles = this.getAttribute('freezeHandles', true) || this.freezeHandles;
    this.unfreezeHandles = this.getAttribute('unfreezeHandles', true) || this.unfreezeHandles;
    const block = this.getAttribute('block', true);
    const editor = this.getAttribute('editor', true);
    const index = this.getAttribute('index', true);
    const orientation = this.getAttribute('orientation', true);
    this.setData({ block, editor, index, orientation});
    this.draggable = true;
  }

  render() {
    return (
      <i-button
        id="btnTableToolbar"
        icon={{name: "grip-vertical", width: 14, height: 14}}
        border={{radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider}}
        padding={{top: '0.15rem', bottom: '0.15rem', left: '0.25rem', right: '0.25rem'}}
        font={{size: '0.875rem'}}
        background={{color: Theme.background.modal}}
        boxShadow='none'
        class={buttonHoverStyle}
      ></i-button>
    )
  }
}
