import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Modal,
  Button,
  VStack,
  Control,
  HStack,
  Panel
} from '@ijstech/components';
import { IToolbarDropdownItem, getModalContainer } from './utils';
const Theme = Styles.Theme.ThemeVars;

interface ScomEditorToolbarDropdownElement extends ControlElement {
  items?: IToolbarDropdownItem[];
  caption?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-toolbar-dropdown']: ScomEditorToolbarDropdownElement;
    }
  }
}

interface IToolbarDropdown {
  items?: IToolbarDropdownItem[];
  caption?: string;
}

@customElements('i-scom-editor-toolbar-dropdown')
export class ScomEditorToolbarDropdown extends Module {
  private mdDropdown: Modal;
  private btnSelected: Button;
  private pnlOptions: VStack;

  private _data: IToolbarDropdown;

  static async create(options?: ScomEditorToolbarDropdownElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get items() {
    return this._data.items ?? [];
  }
  set items(value: IToolbarDropdownItem[]) {
    this._data.items = value ?? [];
  }

  get caption() {
    return this._data.caption ?? '';
  }
  set caption(value: string) {
    this._data.caption = value ?? '';
  }

  get selectedItem() {
    return this.items.filter((p) => p.isSelected)[0];
  }

  async setData(value: IToolbarDropdown) {
    this._data = value;
    this.renderUI();
  }

  getData() {
    return this._data;
  }

  private renderUI() {
    this.pnlOptions.clearInnerHTML();
    for (let item of this.items) {
      const isActived = item.isSelected ?? false;
      const elm = (
        <i-hstack
          verticalAlignment='center' gap="0.75rem"
          horizontalAlignment='space-between'
          cursor='pointer'
          padding={{top: '0.675rem', bottom: '0.675rem', left: '0.75rem', right: '0.75rem'}}
          border={{radius: '0.25rem'}}
          height={'1.875rem'}
          enabled={!item.isDisabled}
          hover={{
            backgroundColor: Theme.action.hoverBackground
          }}
          onClick={(target: Control, event: MouseEvent) => {
            if (item.onClick) item.onClick(target, event);
            this.mdDropdown.visible = false;
            for (let child of this.pnlOptions.children) {
              const icon = child.querySelector('.check-icon') as Control;
              if (icon) icon.visible = child.getAttribute('data-item') === item.text;
            }
            for (let data of this.items) {
              data.isSelected = data.text === item.text;
            }
            this.updateSelected();
          }}
        >
          <i-hstack verticalAlignment='center' gap="0.75rem">
            <i-icon name={item.icon.name} width={'0.5rem'} height={'0.5rem'} fill={Theme.text.primary}></i-icon>
            <i-label
              caption={item.text}
              font={{size: '0.75rem', transform: 'capitalize', weight: 400}}
            ></i-label>
          </i-hstack>
          <i-icon
            name="check"
            width={'0.75rem'} height={'0.75rem'}
            fill={Theme.text.primary}
            visible={isActived}
            class="check-icon"
          ></i-icon>
        </i-hstack>
      ) as HStack;
      elm.setAttribute('data-item', item.text);
      this.pnlOptions.append(elm);
    }
    this.updateSelected();
  }

  private updateSelected() {
    this.btnSelected.caption = this.caption || this.selectedItem?.text || '';
    if (this.selectedItem?.icon?.name && !this.caption) {
      this.btnSelected.icon.name = this.selectedItem.icon.name;
    } else {
      this.btnSelected.icon.visible = false;
    }
  }

  private showModal() {
    getModalContainer().appendChild(this.mdDropdown);
    this.mdDropdown.linkTo = this.btnSelected;
    this.mdDropdown.position = 'fixed';
    const { top, height } = this.getBoundingClientRect();
    const maxHeight = window.innerHeight - (top + height);
    this.mdDropdown.popupPlacement = maxHeight <= 200 ? 'top' : 'bottom';
    this.mdDropdown.visible = true;
  }

  private handleClosed() {
    if (this.mdDropdown) this.mdDropdown.remove();
  }

  init() {
    super.init();
    const items = this.getAttribute('items', true);
    const caption = this.getAttribute('caption', true);
    this.setData({ items, caption });
  }

  render() {
    return (
      <i-panel id="pnlDropdown" width={'auto'} height={'100%'} display='inline-block'>
        <i-button
          id="btnSelected"
          height={'100%'} width={'auto'} minWidth={'1rem'}
          border={{ radius: '0px'}}
          background={{color: 'transparent'}}
          font={{size: '0.75rem', color: Theme.text.primary}}
          boxShadow='none'
          icon={{width: '0.75rem', height: '0.75rem', fill: Theme.text.primary}}
          rightIcon={{width: '0.5rem', height: '0.5rem', fill: Theme.text.primary, name: 'angle-down'}}
          onClick={() => this.showModal()}
        ></i-button>
        <i-modal
          id="mdDropdown"
          minWidth={200}
          popupPlacement='bottom'
          maxWidth={250}
          isChildFixed={true}
          closeOnScrollChildFixed={true}
          border={{radius: '0.375rem'}}
          padding={{top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem'}}
          boxShadow={Theme.shadows[1]}
          margin={{top: '1rem'}}
          showBackdrop={false}
          visible={false}
          zIndex={30001}
          onClose={this.handleClosed}
        >
          <i-vstack
            id="pnlOptions"
            maxHeight={'34.788rem'}
            overflow={{y: 'auto'}}
          ></i-vstack>
        </i-modal>
      </i-panel>
    )
  }
}
