import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Menu
} from '@ijstech/components';
import { ColorType, ScomEditorColorPicker } from './colorPicker';
const Theme = Styles.Theme.ThemeVars;

type deletedCallback = (block: any) => void;
type setColorCallback = (type: ColorType, color: string) => void;

interface ScomEditorSideMenuElement extends ControlElement {
  block?: any;
  onDeleted?: deletedCallback;
  onSetColor?: setColorCallback;
}

interface ISideMenu {
  block?: any;
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
  private menuElm: Menu;
  private mdPicker: ScomEditorColorPicker;

  private _data: ISideMenu;

  onDeleted: deletedCallback;
  onSetColor: setColorCallback;

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
  }

  setData(value: ISideMenu) {
    this._data = value;
    this.renderUI();
  }

  private renderUI() {
    this.mdPicker.setData({
      textColor: this.block?.props?.textColor,
      backgroundColor: this.block?.props?.backgroundColor
    })
  }

  private onShowMenu() {
    this.menuElm.visible = true;
  }

  clear() {
    this.menuElm.visible = false;
  }

  private onColorClicked(type: ColorType, color: string) {
    this.menuElm.visible = false;
    if (this.onSetColor) this.onSetColor(type, color);
  }

  init() {
    super.init();
    this.onDeleted = this.getAttribute('onDeleted', true) || this.onDeleted;
    this.onSetColor = this.getAttribute('onSetColor', true) || this.onSetColor;
    this.menuElm.data = [
      {
        title: 'Delete'
      },
      {
        title: 'Colors',
        icon: {
          name: 'angle-right',
          width: '0.3rem',
          height: '0.3rem',
          fill: Theme.text.primary
        }
      }
    ]
    this.menuElm.onItemClick = (target: Menu, item: any) => {
      if (item.title === 'Delete') {
        this.menuElm.visible = false;
        if (this.onDeleted && this._data?.block) this.onDeleted(this._data?.block)
      } else {
        this.mdPicker.parent = item;
        this.mdPicker.position = 'fixed';
        this.mdPicker.showModal();
      }
    }
    const block = this.getAttribute('block', true);
    if (block) this.setData({block});
  }

  render() {
    return (
      <i-panel width={'auto'} height={'100%'} display='inline-block'>
        <i-button
          height={'100%'} width={'auto'}
          minWidth={'1rem'}
          border={{ radius: '0px'}}
          icon={{name: "ellipsis-v", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary}}
          background={{color: 'transparent'}}
          boxShadow='none'
          onClick={() => this.onShowMenu()}
        ></i-button>
        <i-menu
          id="menuElm"
          padding={{top: '0rem', bottom: '0rem', left: '0.675rem', right: '0.675rem'}}
          font={{color: Theme.text.primary, size: '0.75rem'}}
          // border={{radius: '0.25rem'}}
          boxShadow={Theme.shadows[1]}
          width={'6.25rem'}
          position="absolute"
          left="-4.375rem" top="0px"
          mode="vertical"
          background={{color: Theme.background.modal}}
          visible={false}
        ></i-menu>
        <i-scom-editor-color-picker id="mdPicker" onSelected={this.onColorClicked}/>
      </i-panel>
    )
  }
}
