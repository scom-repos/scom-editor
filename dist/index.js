var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-editor", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditor = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    const path = components_1.application.currentModuleDir;
    components_1.RequireJS.config({
        paths: {
            'blocknote': `${path}/lib/@blocknote/blocknote.bundled.umd.js`
        }
    });
    const libPlugins = [
        'blocknote'
    ];
    const cssPath = `${path}/lib/@blocknote/style.css`;
    let ScomEditor = class ScomEditor extends components_1.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        initEditor() {
            if (this._editor)
                return;
            this.addCSS(cssPath, 'blocknote');
            const self = this;
            components_1.RequireJS.require(libPlugins, (blocknote) => {
                self._editor = new blocknote.BlockNoteEditor({
                    parentElement: self.pnlEditor,
                    onEditorContentChange: (editor) => {
                        console.log(editor.topLevelBlocks);
                        if (this.onChanged)
                            this.onChanged(editor.topLevelBlocks);
                    },
                    domAttributes: {
                        editor: {
                            class: "scom-editor",
                        }
                    }
                });
            });
        }
        addCSS(href, name) {
            const css = document.head.querySelector(`[name="${name}"]`);
            if (css)
                return;
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
            return (this.$render("i-panel", { id: "pnlEditor", background: { color: Theme.background.main }, font: { color: Theme.text.primary } }));
        }
    };
    ScomEditor = __decorate([
        (0, components_1.customElements)('i-scom-editor')
    ], ScomEditor);
    exports.ScomEditor = ScomEditor;
});
