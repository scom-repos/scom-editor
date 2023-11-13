import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Input,
  Button
} from '@ijstech/components';
import { ScomEditorMdLink } from './linkModal';
const Theme = Styles.Theme.ThemeVars;

export type setLinkCallback = (text: string, url: string) => void;

interface ScomEditorLinkElement extends ControlElement {
  editor?: any;
  text?: string;
  url?: string;
  caption?: string;
  setLink: setLinkCallback;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-link']: ScomEditorLinkElement;
    }
  }
}

interface ILink {
  editor?: any;
  text?: string;
  url?: string;
  caption?: string;
}

@customElements('i-scom-editor-link')
export class ScomEditorLink extends Module {
  private mdCreateLink: ScomEditorMdLink;
  private btnLink: Button;

  private _data: ILink;

  static async create(options?: ScomEditorLinkElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  setLink: setLinkCallback;

  get text() {
    return this.editor ? this.editor.getSelectedText() || '' : this._data.text;
  }
  set text(value: string) {
    this._data.text = value ?? '';
  }

  get url() {
    return this.editor ? this.editor.getSelectedLinkUrl() || '' : this._data.url;
  }
  set url(value: string) {
    this._data.url = value ?? '';
  }

  get caption() {
    return this._data.caption ?? '';
  }
  set caption(value: string) {
    this._data.caption = value ?? '';
  }

  get editor() {
    return this._data.editor;
  }
  set editor(value: any) {
    this._data.editor = value;
  }

  setData(value: ILink) {
    this._data = value;
    this.renderUI();
  }

  getData() {
    return this._data;
  }

  private renderUI() {
    this.btnLink.caption = this.caption;
    this.btnLink.icon.visible = !this.caption;
    this.mdCreateLink.onInputChanged = this.handleInput.bind(this);
  }

  private handleInput(target: Input, event: KeyboardEvent) {
    const id = target.id;
    const prop = id === 'inputLink' ? 'url' : 'text';
    this._data[prop] = target.value;
    if (!this._data.url) return;
    this.mdCreateLink.closeModal();
    if (this.setLink) this.setLink(this._data.text, this._data.url);
  }

  private showModal() {
    this.mdCreateLink.setData({ text: this.text, url: this.url });
    this.mdCreateLink.showModal();
  }

  init() {
    super.init();
    this.setLink = this.getAttribute('setLink', true) || this.setLink;
    const text = this.getAttribute('text', true);
    const url = this.getAttribute('url', true);
    const editor = this.getAttribute('editor', true);
    const caption = this.getAttribute('caption', true);
    this.setData({text, url, caption, editor});
  }

  render() {
    return (
      <i-panel width={'auto'} height={'100%'} display='inline-block'>
        <i-button
          id="btnLink"
          height={'100%'} width={'auto'}
          minWidth={'1rem'}
          border={{ radius: '0px'}}
          padding={{top: 0, bottom: 0, left: '0.5rem', right: '0.5rem'}}
          icon={{name: 'paperclip', width: '0.75rem', height: '0.75rem', fill: Theme.text.primary}}
          background={{color: 'transparent'}}
          boxShadow='none'
          onClick={() => this.showModal()}
        ></i-button>
        <i-scom-editor-md-link id="mdCreateLink" />
      </i-panel>
    )
  }
}
