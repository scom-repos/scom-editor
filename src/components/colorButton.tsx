import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Button
} from '@ijstech/components';
import { ColorType, ScomEditorColorPicker } from './colorPicker';
const Theme = Styles.Theme.ThemeVars;

export type setColorCallback = (type: ColorType, color: string) => void;

interface ScomEditorColorElement extends ControlElement {
  textColor?: string;
  backgroundColor?: string;
  setColor?: setColorCallback;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-color']: ScomEditorColorElement;
    }
  }
}

interface IColorPicker {
  textColor?: string;
  backgroundColor?: string;
  isSelected?: boolean;
}

@customElements('i-scom-editor-color')
export class ScomEditorColor extends Module {
  private mdPicker: ScomEditorColorPicker;
  private btnColor: Button;

  private _data: IColorPicker;

  static async create(options?: ScomEditorColorElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.onColorClicked = this.onColorClicked.bind(this);
  }

  setColor: setColorCallback;

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
    this.mdPicker.setData({
      textColor: this.textColor,
      backgroundColor: this.backgroundColor
    })
  }

  getData() {
    return this._data;
  }

  private showModal() {
    this.mdPicker.showModal();
  }

  private onColorClicked(type: ColorType, color: string) {
    const prop = type === 'text' ? 'textColor' : 'backgroundColor';
    this[prop] = color;
    if (this.setColor) this.setColor(type, color);

    this.btnColor.font = {size: '0.75rem', color: this.textColor === 'default' ? Theme.text.primary : this.textColor};
    this.btnColor.background.color = this.backgroundColor === 'default' ? 'transparent' : this.backgroundColor;
  }

  init() {
    super.init();
    this.setColor = this.getAttribute('setColor', true) || this.setColor;
    const textColor = this.getAttribute('textColor', true, 'default');
    const backgroundColor = this.getAttribute('backgroundColor', true, 'default');
    this.setData({textColor, backgroundColor});
  }

  render() {
    return (
      <i-panel width={'auto'} height={'100%'} display='inline-block'>
        <i-button
          id="btnColor"
          height={'1rem'} width={'1rem'}
          border={{ radius: '0px'}}
          background={{color: 'transparent'}}
          caption='A'
          boxShadow='none'
          font={{size: '0.75rem', color: Theme.text.primary}}
          onClick={() => this.showModal()}
        ></i-button>
        <i-scom-editor-color-picker id="mdPicker" onSelected={this.onColorClicked}/>
      </i-panel>
    )
  }
}
