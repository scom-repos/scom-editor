import {
  Module,
  customElements,
  ControlElement,
  Container,
  Panel,
  RequireJS,
  application,
  Styles
} from '@ijstech/components';
import { addSlashMenu, addFormattingToolbar, addSideMenu, addHyperlinkToolbar } from './blocks/index';

const Theme = Styles.Theme.ThemeVars;

type onChangedCallback = (blocks: any[]) => void;

interface ScomEditorElement extends ControlElement {
  placeholder?: string;
  onChanged?: onChangedCallback;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor']: ScomEditorElement;
    }
  }
}

const path = application.currentModuleDir;
RequireJS.config({
  paths: {
    'blocknote': `${path}/lib/@blocknote/blocknote.bundled.umd.js`
  }
})
const libPlugins = [
  'blocknote'
];
const cssPath = `${path}/lib/@blocknote/style.css`;

@customElements('i-scom-editor')
export class ScomEditor extends Module {
  private pnlEditor: Panel;

  private _blocknoteObj: any;
  private _editor: any;

  public onChanged: onChangedCallback;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  static async create(options?: ScomEditorElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  private async initEditor() {
    if (this._editor) return;
    try {
      this.addCSS(cssPath, 'blocknote');
      this._blocknoteObj = await this.loadPlugin();
      this.renderEditor();
    } catch {}
  }

  private renderEditor() {
    if (!this._blocknoteObj) return;
    const self = this;
    this._editor = new this._blocknoteObj.BlockNoteEditor({
      parentElement: self.pnlEditor,
      onEditorContentChange: (editor: any) => {
        if (this.onChanged) this.onChanged(editor.topLevelBlocks);
      },
      domAttributes: {
        editor: {
          class: "scom-editor"
        }
      }
    });
    addSideMenu(this._editor, this.pnlEditor);
    addFormattingToolbar(this._editor, this.pnlEditor);
    addSlashMenu(this._editor, this.pnlEditor);
    addHyperlinkToolbar(this._editor, this.pnlEditor);
  }

  private addCSS(href: string, name: string) {
    const css = document.head.querySelector(`[name="${name}"]`);
    if (css) return;
    let link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('charset', 'utf-8');
    link.setAttribute('name', name);
    link.href = href;
    document.head.append(link);
  }

  private loadPlugin() {
    return new Promise((resolve, reject) => {
      RequireJS.require(libPlugins, (blocknote: any) => {
        resolve(blocknote);
      })
    })
  }

  init() {
    super.init();
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    this.initEditor();
  }

  render() {
    return (
      <i-panel
        id="pnlEditor"
        background={{color: 'inherit'}}
        font={{color: 'inherit'}}
        border={{radius: 'inherit'}}
      ></i-panel>
    );
  }
}
