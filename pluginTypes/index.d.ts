/// <amd-module name="@scom/scom-editor/global/helper.ts" />
declare module "@scom/scom-editor/global/helper.ts" {
    export const isAppleOS: () => boolean;
    export function formatKeyboardShortcut(shortcut: string): string;
}
/// <amd-module name="@scom/scom-editor/global/coreType.ts" />
declare module "@scom/scom-editor/global/coreType.ts" {
    import { Control } from "@ijstech/components";
    export type Styles = {
        bold?: true;
        italic?: true;
        underline?: true;
        strike?: true;
        code?: true;
        textColor?: string;
        backgroundColor?: string;
    };
    export type ToggledStyle = {
        [K in keyof Styles]-?: Required<Styles>[K] extends true ? K : never;
    }[keyof Styles];
    export type ColorStyle = {
        [K in keyof Styles]-?: Required<Styles>[K] extends string ? K : never;
    }[keyof Styles];
    export type StyledText = {
        type: "text";
        text: string;
        styles: Styles;
    };
    export type Link = {
        type: "link";
        href: string;
        content: StyledText[];
    };
    export type PartialLink = Omit<Link, "content"> & {
        content: string | Link["content"];
    };
    export type InlineContent = Link | StyledText;
    export type PartialInlineContent = StyledText | PartialLink;
    export type PartialBlock = {
        id?: string;
        type?: string;
        props?: Partial<Record<string, string>>;
        content?: string | InlineContent[];
        children?: any[];
    };
    export type Block = {
        id: string;
        type: boolean | number | string;
        props: Record<string, string>;
        content: InlineContent[];
        children: Block[];
    };
    export type BlockIdentifier = string | Block;
    export type SlashMenuItem = {
        name: string;
        execute: (editor: any) => void;
        aliases?: string[];
        group: string;
        icon: any;
        hint?: string;
        shortcut?: string;
    };
    export type BlockNoteEditor = any;
    export type BlockNoteDOMElement = "editor" | "blockContainer" | "blockGroup" | "blockContent" | "inlineContent";
    export type BlockNoteDOMAttributes = Partial<{
        [DOMElement in BlockNoteDOMElement]: Record<string, string>;
    }>;
    export type BlockNoteEditorOptions = Partial<{
        parentElement: Control;
        editable: boolean;
        initialContent: PartialBlock[];
        blockSchema: any;
        editorDOMAttributes: Record<string, string>;
        onEditorReady: (editor: BlockNoteEditor) => void;
        onEditorContentChange: (editor: BlockNoteEditor) => void;
        onTextCursorPositionChange: (editor: BlockNoteEditor) => void;
        slashMenuItems: SlashMenuItem[];
        defaultStyles: boolean;
        uploadFile: (file: File) => Promise<string>;
        domAttributes: Partial<BlockNoteDOMAttributes>;
    }>;
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
    export type CustomSlashMenuState = {
        referencePos: any;
        show: boolean;
        filteredItems: any[];
        itemCallback: any;
        keyboardHoveredItemIndex: number;
    };
    export * from "@scom/scom-editor/global/helper.ts";
    export * from "@scom/scom-editor/global/coreType.ts";
}
/// <amd-module name="@scom/scom-editor/components/index.css.ts" />
declare module "@scom/scom-editor/components/index.css.ts" {
    export const buttonHoverStyle: string;
}
/// <amd-module name="@scom/scom-editor/components/utils.ts" />
declare module "@scom/scom-editor/components/utils.ts" {
    import { Button, Control, HStack, IconName, Modal } from "@ijstech/components";
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
    export function getExtraFields(): {
        Heading: {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Heading 2": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Heading 3": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Numbered List": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Bullet List": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        Paragraph: {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        Image: {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
        };
        'Image Widget': {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
        };
        Video: {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
        };
    };
    interface IButtonProps {
        caption?: string;
        icon?: any;
        enabled?: boolean;
        border?: any;
        isSelected?: boolean | (() => boolean);
        tooltip?: any;
        onClick?: (target: Control, event: MouseEvent) => void;
    }
    export const createButton: (props: IButtonProps, parent: Control) => Button;
    export const createParent: (props?: {}) => Promise<HStack>;
    export const createModal: (props?: {}) => Promise<Modal>;
    export const getModalContainer: () => HTMLElement;
    export const getPlacement: (block: any) => string;
    export const CustomBlockTypes: string[];
    export const MediaBlockTypes: string[];
    export const TypeMapping: {
        '@scom/scom-video': string;
        '@scom/scom-image': string;
    };
    export const WidgetMapping: {
        [key: string]: any;
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
        onClosed?: () => void;
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
        onClosed: () => void;
        get textColor(): string;
        set textColor(value: string);
        get backgroundColor(): string;
        set backgroundColor(value: string);
        setData(value: IColorPicker): Promise<void>;
        getData(): IColorPicker;
        showModal(popupPlacement?: string): void;
        closeModal(): void;
        private renderSelection;
        private getColor;
        private onColorClicked;
        private handleClose;
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
        private handleClosed;
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
        private handleClosed;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/linkButton.tsx" />
declare module "@scom/scom-editor/components/linkButton.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    export type setLinkCallback = (text: string, url: string) => void;
    interface ScomEditorLinkElement extends ControlElement {
        editor?: BlockNoteEditor;
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
        editor?: BlockNoteEditor;
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
        get editor(): BlockNoteEditor;
        set editor(value: BlockNoteEditor);
        setData(value: ILink): void;
        getData(): ILink;
        private renderUI;
        private handleInput;
        private showModal;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/dragHandle.tsx" />
declare module "@scom/scom-editor/components/dragHandle.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { ColorType } from "@scom/scom-editor/components/colorPicker.tsx";
    import { Block } from "@scom/scom-editor/global/index.ts";
    type deletedCallback = () => void;
    type setColorCallback = (type: ColorType, color: string) => void;
    interface ScomEditorDragHandleElement extends ControlElement {
        block?: Block;
        onDeleted?: deletedCallback;
        onSetColor?: setColorCallback;
        unfreezeMenu?: any;
        freezeMenu?: any;
    }
    interface ISideMenu {
        block: Block;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-drag-handle']: ScomEditorDragHandleElement;
            }
        }
    }
    export class ScomEditorDragHandle extends Module {
        private mdMenu;
        private menuElm;
        private mdPicker;
        private _data;
        private _menuData;
        onDeleted: deletedCallback;
        onSetColor: setColorCallback;
        unfreezeMenu: any;
        freezeMenu: any;
        static create(options?: ScomEditorDragHandleElement, parent?: Container): Promise<ScomEditorDragHandle>;
        constructor(parent?: Container, options?: any);
        get block(): Block;
        set block(value: Block);
        setData(value: ISideMenu): void;
        private renderUI;
        private handleMenu;
        onShowMenu(): void;
        onHideMenu(): void;
        private onModalClose;
        private onModalOpen;
        private onColorClicked;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/settingsForm.tsx" />
declare module "@scom/scom-editor/components/settingsForm.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { Block } from "@scom/scom-editor/global/index.ts";
    interface ScomEditorSettingsFormElement extends ControlElement {
        data?: ISettingsForm;
    }
    export interface ISettingsForm {
        action: any;
        block: Block;
        onConfirm: (block: Block, props: any) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-settings-form']: ScomEditorSettingsFormElement;
            }
        }
    }
    export class ScomEditorSettingsForm extends Module {
        private pnlForm;
        private actionForm;
        private _data;
        static create(options?: ScomEditorSettingsFormElement, parent?: Container): Promise<ScomEditorSettingsForm>;
        constructor(parent?: Container, options?: any);
        get data(): ISettingsForm;
        set data(value: ISettingsForm);
        setData(value: ISettingsForm): void;
        private renderForm;
        private onSave;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/sideMenu.tsx" />
declare module "@scom/scom-editor/components/sideMenu.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { Block, BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    interface ScomEditorSideMenuElement extends ControlElement {
        block?: Block;
        editor?: BlockNoteEditor;
        isDefaultConfigShown?: boolean;
    }
    interface ISideMenu {
        block: Block;
        editor: BlockNoteEditor;
        isDefaultConfigShown?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-side-menu']: ScomEditorSideMenuElement;
            }
        }
    }
    export class ScomEditorSideMenu extends Module {
        private btnDrag;
        private btnAdd;
        private btnEdit;
        private dragHandle;
        private actionForm;
        private _data;
        private _isShowing;
        private initedMap;
        private configurator;
        static create(options?: ScomEditorSideMenuElement, parent?: Container): Promise<ScomEditorSideMenu>;
        constructor(parent?: Container, options?: any);
        get block(): Block;
        set block(value: Block);
        get editor(): BlockNoteEditor;
        set editor(value: BlockNoteEditor);
        get isDefaultConfigShown(): boolean;
        get isEditShown(): boolean;
        get isShowing(): boolean;
        setData(value: ISideMenu): void;
        private updateButtons;
        private handleSetColor;
        private handleDelete;
        private handleAddBlock;
        private showDragMenu;
        private hideDragMenu;
        private handleEditBlock;
        private getActions;
        private renderForm;
        private updateBlock;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/slashMenu.tsx" />
declare module "@scom/scom-editor/components/slashMenu.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    interface ScomEditorSlashMenuElement extends ControlElement {
        items?: any;
        selectedIndex?: number;
        onItemClicked?: (item: any) => void;
    }
    interface ISlashMenuItem {
        name: string;
        execute: any;
        aliases: string[];
    }
    interface ISlashMenu {
        items?: ISlashMenuItem[];
        selectedIndex?: number;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-splash-menu']: ScomEditorSlashMenuElement;
            }
        }
    }
    export class ScomEditorSlashMenu extends Module {
        private pnlSlash;
        private pnlWrap;
        private itemsMap;
        private _data;
        onItemClicked: (item: any) => void;
        static create(options?: ScomEditorSlashMenuElement, parent?: Container): Promise<ScomEditorSlashMenu>;
        constructor(parent?: Container, options?: any);
        get items(): ISlashMenuItem[];
        set items(value: ISlashMenuItem[]);
        get selectedIndex(): number;
        set selectedIndex(value: number);
        get groupData(): {
            [key: string]: any[];
        };
        setData(value: ISlashMenu): void;
        private renderUI;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/imageToolbar.tsx" />
declare module "@scom/scom-editor/components/imageToolbar.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { Block, BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    interface ScomEditorImageToolbarElement extends ControlElement {
        editor?: BlockNoteEditor;
        block?: Block;
        onUpdated?: () => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-image-toolbar']: ScomEditorImageToolbarElement;
            }
        }
    }
    interface IImageToolbar {
        editor: BlockNoteEditor;
        block: Block;
    }
    export class ScomEditorImageToolbar extends Module {
        private imageTabs;
        private inputUrl;
        private btnUpload;
        private btnEmbed;
        private lblFailed;
        private pnlLoading;
        private _data;
        onUpdated: () => void;
        static create(options?: ScomEditorImageToolbarElement, parent?: Container): Promise<ScomEditorImageToolbar>;
        constructor(parent?: Container, options?: any);
        get editor(): BlockNoteEditor;
        set editor(value: BlockNoteEditor);
        get block(): Block;
        set block(value: Block);
        setData(value: IImageToolbar): Promise<void>;
        getData(): IImageToolbar;
        private onFileChanged;
        private handleURLEnter;
        private updateBlock;
        private handleURLChanged;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/formattingToolbar.tsx" />
declare module "@scom/scom-editor/components/formattingToolbar.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    interface ScomEditorFormattingToolbarElement extends ControlElement {
        editor?: BlockNoteEditor;
    }
    interface IFormattingToolbar {
        editor: BlockNoteEditor;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-formatting-toolbar']: ScomEditorFormattingToolbarElement;
            }
        }
    }
    export class ScomEditorFormattingToolbar extends Module {
        private pnlFormatting;
        private imgToolbar;
        private mdReplace;
        private _data;
        private _oldBlock;
        private _block;
        static create(options?: ScomEditorFormattingToolbarElement, parent?: Container): Promise<ScomEditorFormattingToolbar>;
        constructor(parent?: Container, options?: any);
        get editor(): BlockNoteEditor;
        set editor(value: BlockNoteEditor);
        private setBlockType;
        private setAlignment;
        private setColor;
        private setLink;
        private getToolbarButtons;
        private get isMediaBlock();
        private get isImageBlock();
        setData(value: IFormattingToolbar): void;
        onRefresh(): void;
        private renderUI;
        private updateBlock;
        private renderList;
        private handleClose;
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
    export { ScomEditorSlashMenu } from "@scom/scom-editor/components/slashMenu.tsx";
    export { ColorType, ScomEditorColorPicker } from "@scom/scom-editor/components/colorPicker.tsx";
    export { ScomEditorFormattingToolbar } from "@scom/scom-editor/components/formattingToolbar.tsx";
    export { ScomEditorImageToolbar } from "@scom/scom-editor/components/imageToolbar.tsx";
    export * from "@scom/scom-editor/components/utils.ts";
    export { buttonHoverStyle } from "@scom/scom-editor/components/index.css.ts";
}
/// <amd-module name="@scom/scom-editor/blocks/addFormattingToolbar.ts" />
declare module "@scom/scom-editor/blocks/addFormattingToolbar.ts" {
    import { BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    export const addFormattingToolbar: (editor: BlockNoteEditor) => Promise<void>;
}
/// <amd-module name="@scom/scom-editor/blocks/addSideMenu.ts" />
declare module "@scom/scom-editor/blocks/addSideMenu.ts" {
    import { BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    export const addSideMenu: (editor: BlockNoteEditor) => void;
}
/// <amd-module name="@scom/scom-editor/blocks/addSlashMenu.ts" />
declare module "@scom/scom-editor/blocks/addSlashMenu.ts" {
    import { BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    export const addSlashMenu: (editor: BlockNoteEditor) => void;
}
/// <amd-module name="@scom/scom-editor/blocks/addHyperlinkToolbar.ts" />
declare module "@scom/scom-editor/blocks/addHyperlinkToolbar.ts" {
    import { BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    export const addHyperlinkToolbar: (editor: BlockNoteEditor) => Promise<void>;
}
/// <amd-module name="@scom/scom-editor/blocks/addImageToolbar.tsx" />
declare module "@scom/scom-editor/blocks/addImageToolbar.tsx" {
    import { BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    export const addImageToolbar: (editor: BlockNoteEditor) => void;
}
/// <amd-module name="@scom/scom-editor/blocks/addVideoBlock.ts" />
declare module "@scom/scom-editor/blocks/addVideoBlock.ts" {
    import { BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    export const addVideoBlock: (blocknote: any) => {
        VideoBlock: any;
        VideoSlashItem: {
            name: string;
            execute: (editor: BlockNoteEditor) => void;
            aliases: string[];
        };
    };
}
/// <amd-module name="@scom/scom-editor/blocks/addImageBlock.ts" />
declare module "@scom/scom-editor/blocks/addImageBlock.ts" {
    import { BlockNoteEditor } from "@scom/scom-editor/global/index.ts";
    export function addImageBlock(blocknote: any): {
        ImageBlock: any;
        ImageSlashItem: {
            name: string;
            execute: (editor: BlockNoteEditor) => void;
            aliases: string[];
        };
    };
}
/// <amd-module name="@scom/scom-editor/blocks/index.ts" />
declare module "@scom/scom-editor/blocks/index.ts" {
    export { addFormattingToolbar } from "@scom/scom-editor/blocks/addFormattingToolbar.ts";
    export { addSideMenu } from "@scom/scom-editor/blocks/addSideMenu.ts";
    export { addSlashMenu } from "@scom/scom-editor/blocks/addSlashMenu.ts";
    export { addHyperlinkToolbar } from "@scom/scom-editor/blocks/addHyperlinkToolbar.ts";
    export { addImageToolbar } from "@scom/scom-editor/blocks/addImageToolbar.tsx";
    export { addVideoBlock } from "@scom/scom-editor/blocks/addVideoBlock.ts";
    export { addImageBlock } from "@scom/scom-editor/blocks/addImageBlock.ts";
}
/// <amd-module name="@scom/scom-editor" />
declare module "@scom/scom-editor" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    type onChangedCallback = (value: string) => void;
    interface ScomEditorElement extends ControlElement {
        value?: string;
        lazyLoad?: boolean;
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
        private _data;
        tag: any;
        onChanged: onChangedCallback;
        constructor(parent?: Container, options?: any);
        get value(): string;
        set value(data: string);
        getEditor(): any;
        static create(options?: ScomEditorElement, parent?: Container): Promise<ScomEditor>;
        private initEditor;
        private renderEditor;
        private isEmptyBlock;
        private getEmbedUrl;
        private addCSS;
        private loadPlugin;
        private getData;
        private setData;
        private markdownToBlocks;
        private parseData;
        private updateTag;
        private setTag;
        private updateStyle;
        private updateTheme;
        private getTag;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
        private _getActions;
        private getWidgetSchemas;
        init(): Promise<void>;
        render(): any;
    }
}
