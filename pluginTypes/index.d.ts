/// <amd-module name="@scom/scom-editor/blocks/index.css.ts" />
declare module "@scom/scom-editor/blocks/index.css.ts" {
    export const buttonHoverStyle: string;
}
/// <amd-module name="@scom/scom-editor/blocks/utils.ts" />
declare module "@scom/scom-editor/blocks/utils.ts" {
    import { Button, Control, HStack } from "@ijstech/components";
    interface IButtonProps {
        caption?: string;
        icon?: any;
        enabled?: boolean;
        border?: any;
        isSelected?: boolean;
        onClick?: (target: Control, event: MouseEvent) => void;
    }
    export const createButton: (props: IButtonProps, parent: Control) => Button;
    export const createParent: (props?: {}) => Promise<HStack>;
}
/// <amd-module name="@scom/scom-editor/global/index.ts" />
declare module "@scom/scom-editor/global/index.ts" {
    export type TextAlignmentType = "left" | "center" | "right" | "justify";
    export type CustomFormattingToolbarState = {
        bold: boolean;
        italic: boolean;
        underline: boolean;
        textAlignment: TextAlignmentType;
        textColor: string;
        backgroundColor: string;
        referencePos: any;
        show: boolean;
    };
    export type CustomHyperlinkToolbarState = {
        text: string;
        url: string;
        referencePos: any;
        show: boolean;
    };
    export type CustomSideMenuState = {
        referencePos: any;
        show: boolean;
        block: any;
    };
}
/// <amd-module name="@scom/scom-editor/components/colorPicker.tsx" />
declare module "@scom/scom-editor/components/colorPicker.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    export type onSelectedCallback = (type: ColorType, color: string) => void;
    export type ColorType = 'text' | 'background';
    interface ScomEditorColorPickerElement extends ControlElement {
        textColor?: string;
        backgroundColor?: string;
        onSelected?: onSelectedCallback;
    }
    global {
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
    export class ScomEditorColorPicker extends Module {
        private pnlColors;
        private pnlText;
        private pnlBackground;
        private mdColorPicker;
        private _colors;
        private _data;
        static create(options?: ScomEditorColorPickerElement, parent?: Container): Promise<ScomEditorColorPicker>;
        constructor(parent?: Container, options?: any);
        onSelected: onSelectedCallback;
        get textColor(): string;
        set textColor(value: string);
        get backgroundColor(): string;
        set backgroundColor(value: string);
        setData(value: IColorPicker): Promise<void>;
        getData(): IColorPicker;
        showModal(): void;
        closeModal(): void;
        private renderSelection;
        private getColor;
        private onColorClicked;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/colorButton.tsx" />
declare module "@scom/scom-editor/components/colorButton.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { ColorType } from "@scom/scom-editor/components/colorPicker.tsx";
    export type setColorCallback = (type: ColorType, color: string) => void;
    interface ScomEditorColorElement extends ControlElement {
        textColor?: string;
        backgroundColor?: string;
        setColor?: setColorCallback;
    }
    global {
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
    export class ScomEditorColor extends Module {
        private mdPicker;
        private btnColor;
        private _data;
        static create(options?: ScomEditorColorElement, parent?: Container): Promise<ScomEditorColor>;
        constructor(parent?: Container, options?: any);
        setColor: setColorCallback;
        get textColor(): string;
        set textColor(value: string);
        get backgroundColor(): string;
        set backgroundColor(value: string);
        setData(value: IColorPicker): Promise<void>;
        getData(): IColorPicker;
        private showModal;
        private onColorClicked;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/utils.ts" />
declare module "@scom/scom-editor/components/utils.ts" {
    import { Control, IconName } from "@ijstech/components";
    export type IToolbarDropdownItem = {
        text: string;
        icon?: {
            name: IconName;
        };
        onClick?: (target: Control, event: MouseEvent) => void;
        isSelected?: boolean;
        isDisabled?: boolean;
    };
    export type IBlockTypeItem = {
        name: string;
        type: string;
        props?: Record<string, boolean | number | string>;
        icon?: {
            name: IconName;
        };
        isSelected: (block: any) => boolean;
    };
    export const defaultBlockTypeItems: IBlockTypeItem[];
}
/// <amd-module name="@scom/scom-editor/components/toolbarDropdown.tsx" />
declare module "@scom/scom-editor/components/toolbarDropdown.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { IToolbarDropdownItem } from "@scom/scom-editor/components/utils.ts";
    interface ScomEditorToolbarDropdownElement extends ControlElement {
        items?: IToolbarDropdownItem[];
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-toolbar-dropdown']: ScomEditorToolbarDropdownElement;
            }
        }
    }
    interface IToolbarDropdown {
        items?: IToolbarDropdownItem[];
    }
    export class ScomEditorToolbarDropdown extends Module {
        private mdDropdown;
        private btnSelected;
        private pnlOptions;
        private _data;
        static create(options?: ScomEditorToolbarDropdownElement, parent?: Container): Promise<ScomEditorToolbarDropdown>;
        constructor(parent?: Container, options?: any);
        get items(): IToolbarDropdownItem[];
        set items(value: IToolbarDropdownItem[]);
        get selectedItem(): IToolbarDropdownItem;
        setData(value: IToolbarDropdown): Promise<void>;
        getData(): IToolbarDropdown;
        private renderUI;
        private updateSelected;
        private showModal;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/blockTypeButton.tsx" />
declare module "@scom/scom-editor/components/blockTypeButton.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { IBlockTypeItem } from "@scom/scom-editor/components/utils.ts";
    type callbackType = (item: IBlockTypeItem) => void;
    type validateCallback = (item: IBlockTypeItem) => boolean;
    interface ScomEditorBlockTypeElement extends ControlElement {
        items?: IBlockTypeItem[];
        block?: any;
        onItemClicked?: callbackType;
        onValidate?: validateCallback;
    }
    interface IBlockType {
        items?: IBlockTypeItem[];
        block?: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-block-type']: ScomEditorBlockTypeElement;
            }
        }
    }
    export class ScomEditorBlockType extends Module {
        private blockType;
        private _data;
        onItemClicked: callbackType;
        onValidate: validateCallback;
        static create(options?: ScomEditorBlockTypeElement, parent?: Container): Promise<ScomEditorBlockType>;
        constructor(parent?: Container, options?: any);
        get items(): IBlockTypeItem[];
        set items(value: IBlockTypeItem[]);
        get block(): IBlockTypeItem[];
        set block(value: IBlockTypeItem[]);
        setData(value: IBlockType): void;
        getData(): IBlockType;
        get filteredItems(): IBlockTypeItem[];
        private getItems;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/linkModal.tsx" />
declare module "@scom/scom-editor/components/linkModal.tsx" {
    import { ControlElement, Module, Container, Input } from '@ijstech/components';
    export type inputChangedCallback = (target: Input, event: KeyboardEvent) => void;
    interface ScomEditorMdLinkElement extends ControlElement {
        text?: string;
        url?: string;
        onInputChanged?: inputChangedCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-md-link']: ScomEditorMdLinkElement;
            }
        }
    }
    interface ILink {
        text?: string;
        url?: string;
    }
    export class ScomEditorMdLink extends Module {
        private mdLink;
        private inputLink;
        private inputText;
        private _data;
        static create(options?: ScomEditorMdLinkElement, parent?: Container): Promise<ScomEditorMdLink>;
        constructor(parent?: Container, options?: any);
        onInputChanged: inputChangedCallback;
        get text(): string;
        set text(value: string);
        get url(): string;
        set url(value: string);
        setData(value: ILink): void;
        getData(): ILink;
        showModal(): void;
        closeModal(): void;
        private handleInput;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/linkButton.tsx" />
declare module "@scom/scom-editor/components/linkButton.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    export type setLinkCallback = (text: string, url: string) => void;
    interface ScomEditorLinkElement extends ControlElement {
        editor?: any;
        text?: string;
        url?: string;
        caption?: string;
        setLink: setLinkCallback;
    }
    global {
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
    export class ScomEditorLink extends Module {
        private mdCreateLink;
        private btnLink;
        private _data;
        static create(options?: ScomEditorLinkElement, parent?: Container): Promise<ScomEditorLink>;
        constructor(parent?: Container, options?: any);
        setLink: setLinkCallback;
        get text(): string;
        set text(value: string);
        get url(): string;
        set url(value: string);
        get caption(): string;
        set caption(value: string);
        get editor(): any;
        set editor(value: any);
        setData(value: ILink): void;
        getData(): ILink;
        private renderUI;
        private handleInput;
        private showModal;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/sideMenu.tsx" />
declare module "@scom/scom-editor/components/sideMenu.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { ColorType } from "@scom/scom-editor/components/colorPicker.tsx";
    type deletedCallback = (block: any) => void;
    type setColorCallback = (type: ColorType, color: string) => void;
    interface ScomEditorSideMenuElement extends ControlElement {
        block?: any;
        onDeleted?: deletedCallback;
        onSetColor?: setColorCallback;
    }
    interface ISideMenu {
        block?: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-side-menu']: ScomEditorSideMenuElement;
            }
        }
    }
    export class ScomEditorSideMenu extends Module {
        private menuElm;
        private mdPicker;
        private _data;
        onDeleted: deletedCallback;
        onSetColor: setColorCallback;
        static create(options?: ScomEditorSideMenuElement, parent?: Container): Promise<ScomEditorSideMenu>;
        constructor(parent?: Container, options?: any);
        get block(): any;
        set block(value: any);
        setData(value: ISideMenu): void;
        private renderUI;
        private onShowMenu;
        clear(): void;
        private onColorClicked;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/index.ts" />
declare module "@scom/scom-editor/components/index.ts" {
    export { ScomEditorColor } from "@scom/scom-editor/components/colorButton.tsx";
    export { ScomEditorToolbarDropdown } from "@scom/scom-editor/components/toolbarDropdown.tsx";
    export { ScomEditorBlockType } from "@scom/scom-editor/components/blockTypeButton.tsx";
    export { ScomEditorLink } from "@scom/scom-editor/components/linkButton.tsx";
    export { ScomEditorSideMenu } from "@scom/scom-editor/components/sideMenu.tsx";
    export { ColorType, ScomEditorColorPicker } from "@scom/scom-editor/components/colorPicker.tsx";
    export * from "@scom/scom-editor/components/utils.ts";
}
/// <amd-module name="@scom/scom-editor/blocks/addFormattingToolbar.ts" />
declare module "@scom/scom-editor/blocks/addFormattingToolbar.ts" {
    import { Control } from "@ijstech/components";
    export const addFormattingToolbar: (editor: any, parent: Control) => Promise<void>;
}
/// <amd-module name="@scom/scom-editor/blocks/addSideMenu.ts" />
declare module "@scom/scom-editor/blocks/addSideMenu.ts" {
    export const addSideMenu: (editor: any, parent: HTMLElement) => void;
}
/// <amd-module name="@scom/scom-editor/blocks/addSlashMenu.ts" />
declare module "@scom/scom-editor/blocks/addSlashMenu.ts" {
    export const addSlashMenu: (editor: any, parent: HTMLElement) => void;
}
/// <amd-module name="@scom/scom-editor/blocks/addHyperlinkToolbar.ts" />
declare module "@scom/scom-editor/blocks/addHyperlinkToolbar.ts" {
    import { Control } from "@ijstech/components";
    export const addHyperlinkToolbar: (editor: any, parent: Control) => Promise<void>;
}
/// <amd-module name="@scom/scom-editor/blocks/index.ts" />
declare module "@scom/scom-editor/blocks/index.ts" {
    export { addFormattingToolbar } from "@scom/scom-editor/blocks/addFormattingToolbar.ts";
    export { addSideMenu } from "@scom/scom-editor/blocks/addSideMenu.ts";
    export { addSlashMenu } from "@scom/scom-editor/blocks/addSlashMenu.ts";
    export { addHyperlinkToolbar } from "@scom/scom-editor/blocks/addHyperlinkToolbar.ts";
}
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
        private _blocknoteObj;
        private _editor;
        onChanged: onChangedCallback;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomEditorElement, parent?: Container): Promise<ScomEditor>;
        private initEditor;
        private renderEditor;
        private addCSS;
        private loadPlugin;
        init(): void;
        render(): any;
    }
}
