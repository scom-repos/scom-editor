/// <amd-module name="@scom/scom-editor" />
declare module "@scom/scom-editor" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    type onChangedCallback = (blocks: any[]) => void;
    interface ScomEditorElement extends ControlElement {
        placeholder?: string;
        onChanged?: onChangedCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor']: ScomEditorElement;
            }
        }
    }
    export class ScomEditor extends Module {
        private pnlEditor;
        private _editor;
        onChanged: onChangedCallback;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomEditorElement, parent?: Container): Promise<ScomEditor>;
        private initEditor;
        private addCSS;
        init(): void;
        render(): any;
    }
}
