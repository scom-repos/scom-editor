import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Menu,
  IMenuItem
} from '@ijstech/components';
import { BlockNoteEditor } from '../global/index';
const Theme = Styles.Theme.ThemeVars;


interface ScomEditorTableMenuElement extends ControlElement {
  orientation: "row" | "column";
  editor: BlockNoteEditor;
  block: any;
  index: number;
}

interface ITableMenu {
  orientation: "row" | "column";
  editor: BlockNoteEditor;
  block: any;
  index: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor--table-menu']: ScomEditorTableMenuElement;
    }
  }
}

@customElements('i-scom-editor--table-menu')
export class ScomEditorTableMenu extends Module {
  private menuElm: Menu; 

  private _data: ITableMenu = {
    orientation: 'column',
    editor: undefined,
    block: undefined,
    index: 0
  };
  private _menuData: IMenuItem[] = [
    {
      title: `Delete ${this.orientation}`,
      id: 'delete'
    }
  ];

  static async create(options?: ScomEditorTableMenuElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.handleMenu = this.handleMenu.bind(this);
    this.deferReadyCallback = true;
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

  async setData(value: ITableMenu) {
    this._data = value;
    this.renderUI();
  }

  private renderUI() {
    this.updateMenuData();
  }

  private updateMenuData() {
    if (this.menuElm) {
      this._menuData = [
        {
          title: `Delete ${this.orientation}`,
          id: 'delete'
        },
        {
          title: `Add ${this.orientation} left`,
          id: 'addLeft'
        },
        {
          title: `Add ${this.orientation} right`,
          id: 'addRight'
        },
      ]
      this.menuElm.data = this._menuData;
    }
  }

  private handleMenu(target: Menu, item: any) {
    if (item.id === 'delete') {
    } else if (item.id === 'addLeft') {

    } else if (item.id === 'addRight') {

    }
  }

  async init() {
    super.init();
    const block = this.getAttribute('block', true);
    const editor = this.getAttribute('editor', true);
    const index = this.getAttribute('index', true);
    const orientation = this.getAttribute('orientation', true);
    await this.setData({ block, editor, index, orientation});
    super.executeReadyCallback();
  }

  render() {
    return (
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
    )
  }
}
