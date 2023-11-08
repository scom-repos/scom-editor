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

  private initEditor() {
    if (this._editor) return;
    this.addCSS(cssPath, 'blocknote');
    const self = this;
    RequireJS.require(libPlugins, (blocknote: any) => {
      self._editor = new blocknote.BlockNoteEditor({
        parentElement: self.pnlEditor,
        onEditorContentChange: (editor: any) => {
          console.log(editor.topLevelBlocks);
          if (this.onChanged) this.onChanged(editor.topLevelBlocks);
        },
        domAttributes: {
          editor: {
            class: "scom-editor",
          }
        }
      });
    })
  }

  private addCSS(href: string, name: string) {
    const css = document.head.querySelector(`[name="${name}"]`);
    if (css) return;
    let link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('name', name);
    link.href = href;
    document.head.append(link);
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
        background={{color: Theme.background.main}}
        font={{color: Theme.text.primary}}
      ></i-panel>
    );
  }
}
