import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Control,
  VStack,
  Container,
  Modal
} from '@ijstech/components';
import { getModalContainer, getToolbar } from './utils';
const Theme = Styles.Theme.ThemeVars;

export type onSelectedCallback = (type: ColorType, color: string) => void;
export type ColorType = 'text' | 'background';

interface ScomEditorColorPickerElement extends ControlElement {
  textColor?: string;
  backgroundColor?: string;
  onSelected?: onSelectedCallback;
  onClosed?: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-color-picker']: ScomEditorColorPickerElement;
    }
  }
}

interface IColorPicker {
  textColor?: string;
  backgroundColor?: string;
}

@customElements('i-scom-editor-color-picker')
export class ScomEditorColorPicker extends Module {
  private pnlColors: VStack;
  private pnlText: VStack;
  private pnlBackground: VStack;
  private mdColorPicker: Modal;

  private _colors: string[] = [
    "default",
    "gray",
    "brown",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
  ];
  private _data: IColorPicker;

  static async create(options?: ScomEditorColorPickerElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  onSelected: onSelectedCallback;
  onClosed: () => void;

  get textColor() {
    return this._data.textColor ?? 'default';
  }
  set textColor(value: string) {
    this._data.textColor = value ?? 'default';
  }

  get backgroundColor() {
    return this._data.backgroundColor ?? 'default';
  }
  set backgroundColor(value: string) {
    this._data.backgroundColor = value ?? 'default';
  }

  async setData(value: IColorPicker) {
    this._data = value;
    if (!this.pnlColors) return;
    this.pnlColors.clearInnerHTML();
    this.renderSelection('text');
    this.renderSelection('background');
  }

  getData() {
    return this._data;
  }

  showModal(parent?: Control, popupPlacement?: string) {
    getModalContainer().appendChild(this.mdColorPicker);
    if (parent) this.mdColorPicker.linkTo = parent;
    this.mdColorPicker.position = 'fixed';
    const { top, height } = this.getBoundingClientRect();
    const maxHeight = window.innerHeight - (top + height);
    this.pnlColors.maxHeight = maxHeight <= 200 ? 200 : maxHeight;
    if (maxHeight <= 200) {
      this.mdColorPicker.popupPlacement = 'right'
    } else {
      this.mdColorPicker.popupPlacement = popupPlacement as any || 'bottom';
    }
    this.mdColorPicker.visible = true;
  }

  closeModal(): void {
    this.mdColorPicker.visible = false;
  }

  private renderSelection(type: ColorType) {
    const itemsWrap = <i-vstack id={`pnl${type.charAt(0).toUpperCase() + type.slice(1)}`} width={'100%'}></i-vstack>;
    const groupElm = (
      <i-panel width={'100%'}>
        <i-label
          caption={type}
          font={{size: '0.75rem', transform: 'capitalize', weight: 500}}
          lineHeight={1.55}
          padding={{top: '0.313rem', bottom: '0.313rem', left: '0.75rem', right: '0.75rem'}}
        ></i-label>
        {itemsWrap}
      </i-panel>
    )
    this.pnlColors.append(groupElm);
    for (let color of this._colors) {
      const isActived = type === 'text' ? this._data.textColor === color : this._data.backgroundColor === color;
      const colorEl = (
        <i-hstack
          id={`${type}${color.charAt(0).toUpperCase() + color.slice(1)}`}
          verticalAlignment='center' gap="0.75rem"
          horizontalAlignment='space-between'
          cursor='pointer'
          padding={{top: '0.675rem', bottom: '0.675rem', left: '0.75rem', right: '0.75rem'}}
          border={{radius: '0.25rem'}}
          height={'1.875rem'}
          hover={{
            backgroundColor: Theme.action.hoverBackground
          }}
          onClick={(target: Control) => this.onColorClicked(target, type, color)}
        >
          <i-hstack verticalAlignment='center'  gap="0.75rem">
            <i-button
              height={'1rem'} width={'1rem'}
              border={{radius: '0.25rem'}}
              background={{color: type === 'text' ? 'transparent' : this.getColor(color, 'background')}}
              caption='A'
              font={{color: type === 'text' ? this.getColor(color, 'text') : Theme.text.primary, size: '0.75rem'}}
            ></i-button>
            <i-label
              caption={color}
              font={{size: '0.75rem', transform: 'capitalize', weight: 400}}
            ></i-label>
          </i-hstack>
          <i-icon
            name="check"
            width={'0.75rem'} height={'0.75rem'}
            fill={Theme.text.primary}
            visible={isActived}
          ></i-icon>
        </i-hstack>
      )
      itemsWrap.append(colorEl);
    }
  }

  private getColor(color: string, type: ColorType) {
    if (color === 'default') {
      return type === 'text' ? Theme.text.primary : 'transparent';
    }
    return color;
  }

  private onColorClicked(target: Control, type: ColorType, color: string) {
    this.mdColorPicker.visible = false;
    const parent = type === 'text' ? this.pnlText : this.pnlBackground;
    const prop = type === 'text' ? 'textColor' : 'backgroundColor';
    this[prop] = color;
    for (let child of parent.children) {
      const icon = child.querySelector('i-icon') as Control;
      if (icon) icon.visible = child.id === `${type}${color.charAt(0).toUpperCase() + color.slice(1)}`;
    }
    if (this.onSelected) this.onSelected(type, color);
  }

  private handleClose() {
    if (this.mdColorPicker) this.mdColorPicker.remove();
  }

  init() {
    super.init();
    this.onSelected = this.getAttribute('onSelected', true) || this.onSelected;
    this.onClosed = this.getAttribute('onClosed', true) || this.onClosed;
    const textColor = this.getAttribute('textColor', true, 'default');
    const backgroundColor = this.getAttribute('backgroundColor', true, 'default');
    this.setData({textColor, backgroundColor});
  }

  render() {
    return (
      <i-modal
        id="mdColorPicker"
        popupPlacement="bottom"
        minWidth={200}
        maxWidth={200}
        isChildFixed={true}
        // closeOnScrollChildFixed={true}
        border={{radius: '0.375rem'}}
        padding={{top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem'}}
        boxShadow={Theme.shadows[1]}
        showBackdrop={false}
        zIndex={30001}
        visible={false}
        onClose={this.handleClose}
      >
        <i-vstack
          id="pnlColors"
          overflow={{y: 'auto'}}
        ></i-vstack>
      </i-modal>
    )
  }
}
