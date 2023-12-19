import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container
} from '@ijstech/components';
import { BlockNoteEditor } from '../global/index';
import { buttonHoverStyle } from './index.css';
import { ScomEditorTableMenu } from './tableMenu';

const Theme = Styles.Theme.ThemeVars;

interface ScomEditorTableToolbarElement extends ControlElement {
  editor: BlockNoteEditor;
  block: any;
  orientation: "row" | "column";
  index: number;
  dragStart?: (e: any) => void;
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

  private _data: ITableToolbar;

  showOtherSide: () => void;
  hideOtherSide: () => void;
  dragStart: (e: any) => void;

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

  // private getDropdownItems(editor: BlockNoteEditor) {
  //   const items: IToolbarDropdownItem[] = [
  //     {
  //       icon: {name: 'plus-circle'},
  //       text: `Insert column before`,
  //       isDisabled: !editor._tiptapEditor.can().addColumnBefore(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().addColumnBefore().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'plus-circle'},
  //       text: `Insert column after`,
  //       isDisabled: !editor._tiptapEditor.can().addColumnAfter(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().addColumnAfter().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'minus-circle'},
  //       text: `Delete column`,
  //       isDisabled: !editor._tiptapEditor.can().deleteColumn(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().deleteColumn().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'plus-circle'},
  //       text: `Insert row before`,
  //       isDisabled: !editor._tiptapEditor.can().addRowBefore(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().addRowBefore().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'plus-circle'},
  //       text: `Insert row after`,
  //       isDisabled: !editor._tiptapEditor.can().addRowBefore(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().addRowBefore().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'times'},
  //       text: `Delete row`,
  //       isDisabled: !editor._tiptapEditor.can().deleteRow(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().deleteRow().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'times'},
  //       text: `Delete table`,
  //       isDisabled: !editor._tiptapEditor.can().deleteTable(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().deleteTable().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'object-ungroup'},
  //       text: `Split cell`,
  //       isDisabled: !editor._tiptapEditor.can().splitCell(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().splitCell().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'columns'},
  //       text: `Merge cells`,
  //       isDisabled: !editor._tiptapEditor.can().mergeCells(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().mergeCells().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'toggle-on'},
  //       text: `Toggle header column`,
  //       isDisabled: !editor._tiptapEditor.can().toggleHeaderColumn(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().toggleHeaderColumn().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'toggle-on'},
  //       text: `Toggle header row`,
  //       isDisabled: !editor._tiptapEditor.can().toggleHeaderColumn(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().toggleHeaderColumn().run();
  //       }
  //     },
  //     {
  //       icon: {name: 'toggle-on'},
  //       text: `Toggle header cells`,
  //       isDisabled: !editor._tiptapEditor.can().toggleHeaderCell(),
  //       onClick: () => {
  //         editor._tiptapEditor.chain().focus().toggleHeaderCell().run();
  //       }
  //     }
  //   ]
  //   return items;
  // }

  setData(value: ITableToolbar) {
    this._data = value;
  }

  private onButtonClicked() {
    if (this.tableMenu) {
      this.tableMenu.setData({...this._data});
    } else {
      this.tableMenu = new ScomEditorTableMenu(undefined, {...this._data});
    }
    this.tableMenu.openModal({
      showBackdrop: false,
      popupPlacement: "rightTop",
      position: 'fixed',
      minWidth: '9.375rem',
      maxWidth: '10rem',
      linkTo: this
    })
  }

  init() {
    super.init();
    this.showOtherSide = this.getAttribute('showOtherSide', true) || this.showOtherSide;
    this.hideOtherSide = this.getAttribute('hideOtherSide', true) || this.hideOtherSide;
    this.dragStart = this.getAttribute('dragStart', true) || this.dragStart;
    const block = this.getAttribute('block', true);
    const editor = this.getAttribute('editor', true);
    const index = this.getAttribute('index', true);
    const orientation = this.getAttribute('orientation', true);
    this.setData({ block, editor, index, orientation});
  }

  render() {
    return (
      <i-button
        id="btnTableToolbar"
        icon={{name: "ellipsis-h", width: 14, height: 14}}
        border={{radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider}}
        padding={{top: '0.15rem', bottom: '0.15rem', left: '0.25rem', right: '0.25rem'}}
        font={{size: '0.875rem'}}
        background={{color: Theme.background.modal}}
        boxShadow='none'
        class={buttonHoverStyle}
        onClick={this.onButtonClicked}
      ></i-button>
    )
  }
}
