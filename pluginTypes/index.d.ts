/// <amd-module name="@scom/scom-editor/components/index.css.ts" />
declare module "@scom/scom-editor/components/index.css.ts" {
    export const buttonHoverStyle: string;
    export const settingStyle: string;
    export const formStyle: string;
    export const customModalStyle: string;
    export const modalStyle: string;
    export const customPreStyle: string;
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
    export const getToolbar: (id: string) => Control;
    export const removeToolbar: (id: string) => void;
    export const setToolbar: (id: string, toolbar: Control) => void;
    export const getToolbars: () => Map<string, Control>;
    export const getModalContainer: () => HTMLElement;
    export const removeContainer: () => void;
    export const getPlacement: (block: any) => string;
    export const ChartTypes: string[];
    export const getChartTypeOptions: () => {
        value: string;
        label: string;
    }[];
    export const escapeHTML: (str: string) => string;
    export const revertHtmlTags: (str: string) => string;
    export const DEFAULT_LANGUAGE = "javascript";
}
/// <amd-module name="@scom/scom-editor/components/colorPicker.tsx" />
declare module "@scom/scom-editor/components/colorPicker.tsx" {
    import { ControlElement, Module, Control, Container } from '@ijstech/components';
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
        showModal(parent?: Control, popupPlacement?: string): void;
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
        caption?: string;
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
        caption?: string;
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
        get caption(): string;
        set caption(value: string);
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
    import { IBlockTypeItem } from '@scom/scom-blocknote-sdk';
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
    import { ControlElement, Module, Container, Input, Control } from '@ijstech/components';
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
        showModal(parent?: Control): void;
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
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
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
    import { ControlElement, Module, Container, Control } from '@ijstech/components';
    import { Block, BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    import { ColorType } from "@scom/scom-editor/components/colorPicker.tsx";
    type deletedCallback = () => void;
    type setColorCallback = (type: ColorType, color: string) => void;
    interface ScomEditorDragHandleElement extends ControlElement {
        block?: Block;
        editor?: BlockNoteEditor;
        onDeleted?: deletedCallback;
        onSetColor?: setColorCallback;
        unfreezeMenu?: () => void;
        freezeMenu?: () => void;
    }
    interface ISideMenu {
        block: Block;
        editor?: BlockNoteEditor;
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
        unfreezeMenu: () => void;
        freezeMenu: () => void;
        static create(options?: ScomEditorDragHandleElement, parent?: Container): Promise<ScomEditorDragHandle>;
        constructor(parent?: Container, options?: any);
        get block(): Block;
        set block(value: Block);
        get editor(): BlockNoteEditor;
        set editor(value: BlockNoteEditor);
        setData(value: ISideMenu): void;
        private renderUI;
        private handleMenu;
        onShowMenu(parent: Control): void;
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
    import { Block } from '@scom/scom-blocknote-sdk';
    interface ScomEditorSettingsFormElement extends ControlElement {
        data?: ISettingsForm;
    }
    export interface ISettingsForm {
        action: any;
        block: Block;
        onConfirm: (block: Block, props: any) => void;
        onTypeChanged?: any;
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
        private inputTitle;
        private cbName;
        private customForm;
        private _data;
        private chartActions;
        static create(options?: ScomEditorSettingsFormElement, parent?: Container): Promise<ScomEditorSettingsForm>;
        constructor(parent?: Container, options?: any);
        get data(): ISettingsForm;
        set data(value: ISettingsForm);
        setData(value: ISettingsForm): Promise<void>;
        private renderForm;
        private onChartNameChanged;
        private onSave;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/global/helper.ts" />
declare module "@scom/scom-editor/global/helper.ts" {
    export const getFileContent: (url: string) => Promise<string>;
    export function getFileType(ext: string): string;
    export function getBlockFromExtension(url: string): Promise<any>;
    interface IConfig {
        name: string;
        localPath: string;
    }
    export const addConfig: (key: string, value: IConfig) => void;
    export const getConfig: (key: string) => IConfig;
    export const getConfigs: () => {
        [key: string]: IConfig;
    };
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
}
/// <amd-module name="@scom/scom-editor/components/sideMenu.tsx" />
declare module "@scom/scom-editor/components/sideMenu.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { Block, BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    interface ScomEditorSideMenuElement extends ControlElement {
        block?: Block;
        editor?: BlockNoteEditor;
    }
    interface ISideMenu {
        block: Block;
        editor: BlockNoteEditor;
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
        private currentModule;
        private _data;
        private initedMap;
        static create(options?: ScomEditorSideMenuElement, parent?: Container): Promise<ScomEditorSideMenu>;
        constructor(parent?: Container, options?: any);
        get block(): Block;
        set block(value: Block);
        get editor(): BlockNoteEditor;
        set editor(value: BlockNoteEditor);
        get isEditShown(): boolean;
        setData(value: ISideMenu): void;
        private updateButtons;
        openConfig(block: Block, module: any): void;
        private handleSetColor;
        private handleDelete;
        private handleAddBlock;
        private showDragMenu;
        private hideDragMenu;
        private handleEditBlock;
        private showConfigModal;
        private getActions;
        private onTypeChanged;
        private renderForm;
        private updateBlock;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/slashMenu.tsx" />
declare module "@scom/scom-editor/components/slashMenu.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { SlashMenuItem } from '@scom/scom-blocknote-sdk';
    interface ScomEditorSlashMenuElement extends ControlElement {
        items?: any;
        selectedIndex?: number;
        onItemClicked?: (item: any) => void;
    }
    interface ISlashMenu {
        items?: SlashMenuItem[];
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
        private itemsMap;
        private _data;
        onItemClicked: (item: any) => void;
        static create(options?: ScomEditorSlashMenuElement, parent?: Container): Promise<ScomEditorSlashMenu>;
        constructor(parent?: Container, options?: any);
        get items(): SlashMenuItem[];
        set items(value: SlashMenuItem[]);
        get selectedIndex(): number;
        set selectedIndex(value: number);
        get groupData(): {
            [key: string]: any[];
        };
        setData(value: ISlashMenu): void;
        updateMaxHeight(maxHeight: number): void;
        private renderUI;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/imageToolbar.tsx" />
declare module "@scom/scom-editor/components/imageToolbar.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { Block, BlockNoteEditor } from '@scom/scom-blocknote-sdk';
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
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
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
/// <amd-module name="@scom/scom-editor/components/tableMenu.tsx" />
declare module "@scom/scom-editor/components/tableMenu.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    interface ScomEditorTableMenuElement extends ControlElement {
        orientation: "row" | "column";
        editor: BlockNoteEditor;
        block: any;
        index: number;
        onClose?: () => void;
    }
    interface ITableMenu {
        orientation: "row" | "column";
        editor: BlockNoteEditor;
        block: any;
        index: number;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor--table-menu']: ScomEditorTableMenuElement;
            }
        }
    }
    export class ScomEditorTableMenu extends Module {
        private menuElm;
        private _data;
        private _menuData;
        onClose: () => void;
        static create(options?: ScomEditorTableMenuElement, parent?: Container): Promise<ScomEditorTableMenu>;
        constructor(parent?: Container, options?: any);
        get block(): any;
        set block(value: any);
        get editor(): BlockNoteEditor;
        set editor(value: BlockNoteEditor);
        get index(): number;
        set index(value: number);
        get orientation(): 'row' | 'column';
        set orientation(value: 'row' | 'column');
        setData(value: ITableMenu): Promise<void>;
        private renderUI;
        private updateMenuData;
        private handleMenu;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/tableToolbar.tsx" />
declare module "@scom/scom-editor/components/tableToolbar.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    interface ScomEditorTableToolbarElement extends ControlElement {
        editor: BlockNoteEditor;
        block: any;
        orientation: "row" | "column";
        index: number;
        dragStart: (e: any) => void;
        dragEnd: (e: any) => void;
        freezeHandles?: () => void;
        unfreezeHandles?: () => void;
        showOtherSide?: () => void;
        hideOtherSide?: () => void;
    }
    interface ITableToolbar {
        editor: BlockNoteEditor;
        block: any;
        orientation: "row" | "column";
        index: number;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-table-toolbar']: ScomEditorTableToolbarElement;
            }
        }
    }
    export class ScomEditorTableToolbar extends Module {
        private tableMenu;
        private btnTableToolbar;
        private _data;
        showOtherSide: () => void;
        hideOtherSide: () => void;
        dragStart: (e: any) => void;
        dragEnd: (e: any) => void;
        freezeHandles: () => void;
        unfreezeHandles: () => void;
        static create(options?: ScomEditorTableToolbarElement, parent?: Container): Promise<ScomEditorTableToolbar>;
        constructor(parent?: Container, options?: any);
        get block(): any;
        set block(value: any);
        get editor(): BlockNoteEditor;
        set editor(value: BlockNoteEditor);
        get index(): number;
        set index(value: number);
        get orientation(): 'row' | 'column';
        set orientation(value: 'row' | 'column');
        setData(value: ITableToolbar): void;
        protected _handleMouseDown(event: MouseEvent, stopPropagation?: boolean): boolean;
        private onButtonClicked;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-editor/components/customBlock.tsx" />
declare module "@scom/scom-editor/components/customBlock.tsx" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { Block } from '@scom/scom-blocknote-sdk';
    interface ICustomBlockConfig {
        module: string;
        properties: any;
        block: Block;
    }
    interface ScomEditorCustomBlockElement extends ControlElement {
        data: ICustomBlockConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor-custom-block']: ScomEditorCustomBlockElement;
            }
        }
    }
    export class ScomEditorCustomBlock extends Module {
        private blockWrapper;
        private blockEl;
        private _data;
        private currentModule;
        static create(options?: ScomEditorCustomBlockElement, parent?: Container): Promise<ScomEditorCustomBlock>;
        constructor(parent?: Container, options?: any);
        getData(): ICustomBlockConfig;
        setData(data: ICustomBlockConfig): Promise<void>;
        private renderUI;
        getActions(): any;
        init(): Promise<void>;
        render(): void;
    }
}
/// <amd-module name="@scom/scom-editor/components/codeBlock.tsx" />
declare module "@scom/scom-editor/components/codeBlock.tsx" {
    import { ControlElement, Module, Container, VStack } from '@ijstech/components';
    interface ICodeBlock {
        code: string;
        language?: string;
    }
    interface ScomEditorCodeBlockElement extends ControlElement {
        code?: string;
        language?: string;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-editor--code-block']: ScomEditorCodeBlockElement;
            }
        }
    }
    export class ScomEditorCodeBlock extends Module {
        private blockWrapper;
        private _data;
        static create(options?: ScomEditorCodeBlockElement, parent?: Container): Promise<ScomEditorCodeBlock>;
        constructor(parent?: Container, options?: any);
        get code(): string;
        set code(value: string);
        get language(): string;
        set language(value: string);
        get fullCode(): string;
        getData(): ICodeBlock;
        setData(data: ICodeBlock): Promise<void>;
        private renderUI;
        getActions(): {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => void;
                undo: () => void;
                redo: () => void;
            };
            customUI: {
                render: (data?: any, onConfirm?: (result: boolean, data: any) => void) => Promise<VStack>;
            };
        };
        init(): Promise<void>;
        render(): void;
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
    export { ScomEditorTableToolbar } from "@scom/scom-editor/components/tableToolbar.tsx";
    export { ScomEditorCustomBlock } from "@scom/scom-editor/components/customBlock.tsx";
    export { ScomEditorCodeBlock } from "@scom/scom-editor/components/codeBlock.tsx";
    export * from "@scom/scom-editor/components/utils.ts";
    export { buttonHoverStyle, customModalStyle, modalStyle } from "@scom/scom-editor/components/index.css.ts";
}
/// <amd-module name="@scom/scom-editor/blocks/addFormattingToolbar.ts" />
declare module "@scom/scom-editor/blocks/addFormattingToolbar.ts" {
    import { BlockNoteEditor } from "@scom/scom-blocknote-sdk";
    export const addFormattingToolbar: (editor: BlockNoteEditor) => Promise<void>;
}
/// <amd-module name="@scom/scom-editor/blocks/addSideMenu.ts" />
declare module "@scom/scom-editor/blocks/addSideMenu.ts" {
    import { BlockNoteEditor } from "@scom/scom-blocknote-sdk";
    export const addSideMenu: (editor: BlockNoteEditor) => void;
}
/// <amd-module name="@scom/scom-editor/blocks/addSlashMenu.ts" />
declare module "@scom/scom-editor/blocks/addSlashMenu.ts" {
    import { BlockNoteEditor } from "@scom/scom-blocknote-sdk";
    export const addSlashMenu: (editor: BlockNoteEditor) => void;
}
/// <amd-module name="@scom/scom-editor/blocks/addHyperlinkToolbar.ts" />
declare module "@scom/scom-editor/blocks/addHyperlinkToolbar.ts" {
    import { BlockNoteEditor } from "@scom/scom-blocknote-sdk";
    export const addHyperlinkToolbar: (editor: BlockNoteEditor) => Promise<void>;
}
/// <amd-module name="@scom/scom-editor/blocks/addTableToolbar.ts" />
declare module "@scom/scom-editor/blocks/addTableToolbar.ts" {
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    export const addTableToolbar: (editor: BlockNoteEditor) => Promise<void>;
}
/// <amd-module name="@scom/scom-editor/blocks/addFileBlock.ts" />
declare module "@scom/scom-editor/blocks/addFileBlock.ts" {
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    export function addFileBlock(): {
        FileSlashItem: {
            name: string;
            execute: (editor: BlockNoteEditor) => Promise<void>;
            aliases: string[];
        };
    };
}
/// <amd-module name="@scom/scom-editor/blocks/addStakingBlock.ts" />
declare module "@scom/scom-editor/blocks/addStakingBlock.ts" {
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    export const addStakingBlock: (blocknote: any) => {
        StakingBlock: any;
        StakingSlashItem: {
            name: string;
            execute: (editor: BlockNoteEditor) => void;
            aliases: string[];
        };
    };
}
/// <amd-module name="@scom/scom-editor/blocks/addXchainBlock.ts" />
declare module "@scom/scom-editor/blocks/addXchainBlock.ts" {
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    export const addXchainBlock: (blocknote: any) => {
        XchainBlock: any;
        XchainSlashItem: {
            name: string;
            execute: (editor: BlockNoteEditor) => void;
            aliases: string[];
        };
    };
}
/// <amd-module name="@scom/scom-editor/blocks/addVotingBlock.ts" />
declare module "@scom/scom-editor/blocks/addVotingBlock.ts" {
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    export const addVotingBlock: (blocknote: any) => {
        VotingBlock: any;
        VotingSlashItem: {
            name: string;
            execute: (editor: BlockNoteEditor) => void;
            aliases: string[];
        };
    };
}
/// <amd-module name="@scom/scom-editor/blocks/addNftMinterBlock.ts" />
declare module "@scom/scom-editor/blocks/addNftMinterBlock.ts" {
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    export const addNftMinterBlock: (blocknote: any) => {
        NftMinterBlock: any;
        NftMinterSlashItem: {
            name: string;
            execute: (editor: BlockNoteEditor) => void;
            aliases: string[];
        };
    };
}
/// <amd-module name="@scom/scom-editor/blocks/addOswapNftBlock.ts" />
declare module "@scom/scom-editor/blocks/addOswapNftBlock.ts" {
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    export const addOswapNftBlock: (blocknote: any) => {
        OswapNftBlock: any;
        OswapNftSlashItem: {
            name: string;
            execute: (editor: BlockNoteEditor) => void;
            aliases: string[];
        };
    };
}
/// <amd-module name="@scom/scom-editor/blocks/addCodeBlock.ts" />
declare module "@scom/scom-editor/blocks/addCodeBlock.ts" {
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    export function addCodeBlock(blocknote: any): {
        CodeBlock: any;
        CodeSlashItem: {
            name: string;
            execute: (editor: BlockNoteEditor) => void;
            aliases: string[];
        };
    };
}
/// <amd-module name="@scom/scom-editor/blocks/addSwapBlock.ts" />
declare module "@scom/scom-editor/blocks/addSwapBlock.ts" {
    import { BlockNoteEditor } from '@scom/scom-blocknote-sdk';
    export const addSwapBlock: (blocknote: any) => {
        SwapBlock: any;
        SwapSlashItem: {
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
    export { addTableToolbar } from "@scom/scom-editor/blocks/addTableToolbar.ts";
    export { addFileBlock } from "@scom/scom-editor/blocks/addFileBlock.ts";
    export { addStakingBlock } from "@scom/scom-editor/blocks/addStakingBlock.ts";
    export { addXchainBlock } from "@scom/scom-editor/blocks/addXchainBlock.ts";
    export { addVotingBlock } from "@scom/scom-editor/blocks/addVotingBlock.ts";
    export { addNftMinterBlock } from "@scom/scom-editor/blocks/addNftMinterBlock.ts";
    export { addOswapNftBlock } from "@scom/scom-editor/blocks/addOswapNftBlock.ts";
    export { addCodeBlock } from "@scom/scom-editor/blocks/addCodeBlock.ts";
    export { addSwapBlock } from "@scom/scom-editor/blocks/addSwapBlock.ts";
}
/// <amd-module name="@scom/scom-editor/index.css.ts" />
declare module "@scom/scom-editor/index.css.ts" {
    export const customEditorStyle: string;
}
/// <amd-module name="@scom/scom-editor" />
declare module "@scom/scom-editor" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { Block } from "@scom/scom-blocknote-sdk";
    type onChangedCallback = (value: string) => void;
    interface ScomEditorElement extends ControlElement {
        value?: string;
        viewer?: boolean;
        lazyLoad?: boolean;
        widgets?: string[];
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
        private _widgets;
        tag: any;
        private timer;
        onChanged: onChangedCallback;
        constructor(parent?: Container, options?: any);
        get value(): string;
        set value(data: string);
        get viewer(): boolean;
        set viewer(data: boolean);
        get widgets(): string[];
        set widgets(data: string[]);
        getEditor(): any;
        static create(options?: ScomEditorElement, parent?: Container): Promise<ScomEditor>;
        private initEditor;
        private renderEditor;
        private addCustomWidgets;
        private createWidget;
        private addBlockCallback;
        private onEditorChanged;
        private addCSS;
        private loadPlugin;
        private getData;
        private setData;
        private renderData;
        setValue(value: string): Promise<void>;
        insertFile(url: string): Promise<void>;
        insertBlock(block: Block): void;
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
        onHide(): void;
        focus(): void;
        init(): Promise<void>;
        render(): any;
    }
}
