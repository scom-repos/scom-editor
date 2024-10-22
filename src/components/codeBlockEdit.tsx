import {
  customElements,
  ControlElement,
  Module,
  Container,
  CodeEditor
} from '@ijstech/components';

interface ICodeBlockEdit {
  code: string;
  language?: string;
  path?: string;
}

const DEFAULT_LANGUAGE = 'javascript';

interface ScomEditorCodeBlockEditElement extends ControlElement {
  code?: string;
  language?: string;
  path?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-code-block-edit']: ScomEditorCodeBlockEditElement;
    }
  }
}

const languages = [
  {
    value: 'javascript',
    label: 'javascript',
  },
  {
    value: 'json',
    label: 'json',
  },
  {
    value: 'typescript',
    label: 'typescript',
  }
]

@customElements('i-scom-editor-code-block-edit')
export class ScomEditorCodeBlockEdit extends Module {
  private codeEditor: CodeEditor;

  private _data: ICodeBlockEdit = {
    code: '',
    language: '',
    path: ''
  };

  static async create(options?: ScomEditorCodeBlockEditElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get code() {
    return this._data.code || '';
  }
  set code(value: string) {
    this._data.code = value || '';
  }

  get language() {
    return this._data.language || DEFAULT_LANGUAGE;
  }
  set language(value: string) {
    this._data.language = value || DEFAULT_LANGUAGE;
  }

  get path() {
    return this._data.path || '';
  }
  set path(value: string) {
    this._data.path = value || '';
  }

  getData() {
    return this._data;
  }

  async setData(data: ICodeBlockEdit) {
    this._data = data;
    await this.renderUI();
  }

  private async renderUI() {
    
  }

  async init() {
    super.init();
    const code = this.getAttribute('code', true);
    const language = this.getAttribute('language', true, DEFAULT_LANGUAGE);
    const path = this.getAttribute('path', true);
    if (code) await this.setData({ code, language, path });
  }

  render(): void {
    return (
      <i-vstack gap="1rem" width={'100%'}>
        <i-vstack gap="0.5rem" stack={{grow: '1'}}>
          <i-label caption='Code'></i-label>
          <i-code-editor
            id="codeEditor"
            width='100%'
            height='100%'
            display='block'
            stack={{grow: '1'}}
          ></i-code-editor>
        </i-vstack>
        <i-vstack gap="0.5rem" stack={{grow: '1'}}>
          <i-label caption='Language'></i-label>
          <i-combo-box
            id="cbLanguage"
            width='100%'
            height='2rem'
            display='block'
            stack={{grow: '1'}}
            items={languages}
            selectedItem={languages[0]}
          ></i-combo-box>
        </i-vstack>
        <i-vstack gap="0.5rem" stack={{grow: '1'}}>
          <i-label caption='Path'></i-label>
          <i-input
            id="inputPath"
            width='100%'
            height='2rem'
            display='block'
            stack={{grow: '1'}}
          ></i-input>
        </i-vstack>
      </i-vstack>
    )
  }
}
