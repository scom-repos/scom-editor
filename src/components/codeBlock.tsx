import {
  customElements,
  ControlElement,
  Module,
  Container,
  CodeEditor,
  VStack,
  Button,
  Styles,
  HStack,
  application,
  Panel
} from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

interface ICodeBlock {
  code: string;
  language?: string;
}

const DEFAULT_LANGUAGE = 'javascript';

interface ScomEditorCodeBlockElement extends ControlElement {
  code?: string;
  language?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-code-block']: ScomEditorCodeBlockElement;
    }
  }
}

@customElements('i-scom-editor-code-block')
export class ScomEditorCodeBlock extends Module {
  private codeEditor: CodeEditor;
  private blockWrapper: Panel;

  private _data: ICodeBlock = {
    code: ''
  };

  static async create(options?: ScomEditorCodeBlockElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get code() {
    return (this._data.code || '').replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
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

  getData() {
    return this._data;
  }

  async setData(data: ICodeBlock) {
    this._data = data;
    await this.renderUI();
  }

  private async renderUI() {
    // this.codeEditor.display = 'block';
    // this.codeEditor.height = 'fit-content';
    // this.codeEditor.width = '100%';
    // this.codeEditor.maxHeight = 200;
    // await this.codeEditor.loadContent(this.code, this.language as any);
    const innerHTML = `<pre><code>${this.escapeHTML(this.code)}</code></pre>`;
    this.blockWrapper.innerHTML = innerHTML;
  }

  private escapeHTML(str: string) {
    return str.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  getActions() {
    const editAction = {
      name: 'Edit',
      icon: 'edit',
      command: (builder: any, userInputData: any) => {
        let oldData: ICodeBlock  = { code: '' };
        return {
          execute: () => {
            oldData = JSON.parse(JSON.stringify(this._data));
            if (builder?.setData) builder.setData(userInputData);
            this.setData(userInputData);
          },
          undo: () => {
            if (builder?.setData) builder.setData(oldData);
            this.setData(oldData);
          },
          redo: () => { }
        }
      },
      customUI: {
        render: async (data?: any, onConfirm?: (result: boolean, data: any) => void) => {
          const vstack = new VStack(null, {gap: '1rem', height: '200px', width: '100%'});
          const config = new CodeEditor(vstack, {
            width: '100%',
            height: '100%',
            display: 'block',
            language: DEFAULT_LANGUAGE,
            stack: { grow: '1'}
          });
          const hstack = new HStack(null, {
            verticalAlignment: 'center',
            horizontalAlignment: 'end'
          });
          const button = new Button(null, {
            caption: 'Confirm',
            width: '100%',
            height: 40,
            font: {color: Theme.colors.primary.contrastText}
          });
          hstack.append(button);
          vstack.append(config);
          await config.ready();
          await config.loadContent(this._data?.code || '')
          vstack.append(hstack);
          button.onClick = async () => {
            if (onConfirm) onConfirm(true, {...this._data, code: config.value});
          }
          return vstack;
        }
      }
    };
    return editAction;
  }

  private async onCopy() {
    await application.copyToClipboard(this.code);
  }

  async init() {
    super.init();
    const code = this.getAttribute('code', true);
    const language = this.getAttribute('language', true, DEFAULT_LANGUAGE);
    const content = await application.getContent(`${application.rootDir}libs/@ijstech/components/index.d.ts`);
    CodeEditor.addLib('@ijstech/components', content);
    if (code) await this.setData({ code, language });
  }

  render(): void {
    return (
      <i-panel
        background={{color: '#3c3c3c'}}
        padding={{left: '1rem', right: '1rem'}}
        border={{color: Theme.divider, width: '1px', style: 'solid', radius: '0.5rem'}}
      >
        <i-hstack horizontalAlignment='end' margin={{bottom: '0.5rem', top: '1rem'}}>
          <i-icon
            name="copy"
            width={'1rem'} height={'1rem'}
            fill={Theme.text.primary}
            cursor='pointer'
            stack={{shrink: '0'}}
            tooltip={{content: 'Copy Code', placement: 'bottom', trigger: 'click'}}
            onClick={this.onCopy}
          ></i-icon>
        </i-hstack>
        <i-panel
          id="blockWrapper"
        >
          {/* <i-code-editor
            id="codeEditor"
            width={'100%'}
            display='block'
            language={DEFAULT_LANGUAGE}
            designMode={true}
          ></i-code-editor> */}
        </i-panel>
      </i-panel>
    )
  }
}
