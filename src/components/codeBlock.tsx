import {
  customElements,
  ControlElement,
  Module,
  Container,
  VStack,
  Button,
  Styles,
  HStack,
  application,
  Panel,
  Modal
} from '@ijstech/components';
import { DEFAULT_LANGUAGE, escapeHTML, revertHtmlTags } from './utils';
import { customPaddingStyle, customPreStyle } from './index.css';
import { getWidgetData } from '../global/index';
import { ScomEditorWidget } from './widget';

const Theme = Styles.Theme.ThemeVars;

interface ICodeBlock {
  code: string;
  language?: string;
}

interface ScomEditorCodeBlockElement extends ControlElement {
  code?: string;
  language?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor--code-block']: ScomEditorCodeBlockElement;
    }
  }
}

@customElements('i-scom-editor--code-block')
export class ScomEditorCodeBlock extends Module {
  private blockWrapper: Panel;

  private _data: ICodeBlock = {
    code: '',
    language: ''
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
    return revertHtmlTags(this._data.code || '');
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

  get fullCode() {
    let code = this.code;
    if (!code.startsWith('`') && !code.endsWith('`') && !code.startsWith('@scom/')) {
      code = `\`\`\`${this.language}\n${code}\n\`\`\``;
    }
    return code;
  }

  getData() {
    return this._data;
  }

  async setData(data: ICodeBlock) {
    this._data = data;
    await this.renderUI();
  }

  private async renderUI() {
    this.blockWrapper.clearInnerHTML();
    const isScom = this.fullCode.startsWith('@scom/');
    if (isScom) {
      const values = getWidgetData(this.fullCode);
      if (!values) return;
      this.blockWrapper.append(
        <i-scom-editor--widget
          moduleName={values.module}
          data={values.data}
          content={values.value}
          elements={values.elements}
        ></i-scom-editor--widget>
      )
    } else {
      const codeBlock = this.createElement('i-scom-code-viewer', this.blockWrapper) as any;
      if (!codeBlock) return;
      codeBlock.parent = this.blockWrapper;
      const rootDir = application.rootDir;
      await codeBlock.ready();
      await codeBlock.setData({
        code: this.fullCode,
        entryPoint: rootDir.endsWith('/') ? rootDir.slice(0, -1) : rootDir,
        isButtonsShown: false
      });
      this.blockWrapper.border = {radius: '0.375rem', width: !!this.code ? '0px' : '1px', style: 'solid', color: Theme.divider};
    }
  }

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
          const vstack = new VStack(null, {gap: '1rem', height: 300, width: '100%', overflow: 'hidden'});
          new Button(vstack, {
            icon: {name: 'expand', width: '0.75rem', height: '0.75rem', fill: Theme.colors.primary.main},
            background: {color: 'transparent'},
            boxShadow: 'none',
            padding: {left: '0px', right: '0px', top: '0px', bottom: '0px'},
            stack: {shrink: '0'},
            position: 'absolute',
            right: 30,
            top: -16,
            cursor: 'pointer',
            onClick: (target: Button, event: MouseEvent) => {
              event.stopPropagation();
              if (target.icon.name === 'expand') target.icon.name = 'compress';
              else target.icon.name = 'expand';
              const isExpand = target.icon.name === 'compress';

              const modal = config.closest('i-modal') as Modal;
              if (modal) {
                const wrapper = modal.querySelector('.modal-wrapper') as Panel;
                if (wrapper) {
                  if (isExpand)
                    wrapper.classList.add(customPaddingStyle);
                  else
                    wrapper.classList.remove(customPaddingStyle);
                }
                modal.width = isExpand ? '100dvw' : '40rem';
                modal.height = isExpand ? '100dvh' : 'auto';
                modal.border = isExpand ? {radius: 0 } : {radius: '0.375rem' };
                modal.popupPlacement = 'center';
                vstack.height = isExpand ? 'calc(100vh - 70px)' : '300px';
                modal.refresh();
              }
            }
          });
          const config = this.createElement('i-scom-code-editor', vstack) as any;
          config.parent = vstack;
          config.display = 'block';
          config.width = '100%';
          config.maxHeight = 'calc(100% - 60px)';
          config.stack = {grow: '1'};
          const hstack = new HStack(vstack, {
            verticalAlignment: 'center',
            horizontalAlignment: 'end',
            height: 50,
            stack: {shrink: '0'}
          });
          const button = new Button(hstack, {
            caption: '$confirm',
            width: '100%',
            height: 40,
            font: {color: Theme.colors.primary.contrastText}
          });
          await config.ready();
          await config.loadContent(this.fullCode || '');

          button.onClick = async () => {
            let fullCode = config.value || '';
            if (fullCode.includes('@scom/')) {
              fullCode = fullCode.replace(/^\s*```\s*/g, '').replace(/\s*```\s*$/g, '');
              if (onConfirm) onConfirm(true, {...this._data, code: fullCode, language: '' });
            } else {
              fullCode = escapeHTML(config.value || '');
              const regex = /```(\w+)?(\((.+?)\))?[\s\n]([\s\S]+)[\s\n]```/g;
              const matches = regex.exec(fullCode);
              const path = matches?.[3] || '';
              let language = matches?.[1] || DEFAULT_LANGUAGE;
              if (language) {
                language = `${language}${path ? `(${path})` : ''}`
              }
              const code = matches?.[4] || '';
              if (onConfirm) onConfirm(true, {...this._data, code, language });
            }
          }
          return vstack;
        }
      }
    };
    return editAction;
  }

  async init() {
    super.init();
    const code = this.getAttribute('code', true);
    const language = this.getAttribute('language', true);
    if (code) await this.setData({ code, language });
  }

  render(): void {
    return (
      <i-panel
        id="blockWrapper"
        width={'100%'}
        class={customPreStyle}
        minHeight={30}
        border={{radius: '0.375rem', width: '1px', style: 'solid', color: Theme.divider}}
      />
    )
  }
}
