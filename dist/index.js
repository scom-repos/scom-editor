var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-editor/global/helper.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseStringToObject = exports.formatKeyboardShortcut = exports.isAppleOS = void 0;
    ///<amd-module name='@scom/scom-editor/global/helper.ts'/> 
    const isAppleOS = () => typeof navigator !== "undefined" &&
        (/Mac/.test(navigator.platform) ||
            (/AppleWebKit/.test(navigator.userAgent) &&
                /Mobile\/\w+/.test(navigator.userAgent)));
    exports.isAppleOS = isAppleOS;
    function formatKeyboardShortcut(shortcut) {
        if ((0, exports.isAppleOS)()) {
            return shortcut.replace("Mod", "⌘");
        }
        else {
            return shortcut.replace("Mod", "Ctrl");
        }
    }
    exports.formatKeyboardShortcut = formatKeyboardShortcut;
    const parseStringToObject = (value) => {
        try {
            const utf8String = decodeURIComponent(value);
            const decodedString = window.atob(utf8String);
            const newData = JSON.parse(decodedString);
            return { ...newData };
        }
        catch { }
        return null;
    };
    exports.parseStringToObject = parseStringToObject;
});
define("@scom/scom-editor/global/coreType.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-editor/global/index.ts", ["require", "exports", "@scom/scom-editor/global/helper.ts", "@scom/scom-editor/global/coreType.ts"], function (require, exports, helper_1, coreType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(helper_1, exports);
    __exportStar(coreType_1, exports);
});
define("@scom/scom-editor/components/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customModalStyle = exports.settingStyle = exports.buttonHoverStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.buttonHoverStyle = components_1.Styles.style({
        $nest: {
            '&:hover': {
                background: `${Theme.action.hoverBackground}!important`
            }
        }
    });
    exports.settingStyle = components_1.Styles.style({
        $nest: {
            '#pnlForm > * > *:first-child': {
                maxHeight: 'calc(100vh - 114px)',
                overflowY: 'auto',
                justifyContent: 'start',
                $nest: {
                    '&::-webkit-scrollbar': {
                        width: '7px',
                    },
                    '&::-webkit-scrollbar-track': {
                        borderRadius: '10px',
                        border: '1px solid transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: Theme.colors.primary.main,
                        borderRadius: '10px',
                        outline: '1px solid transparent'
                    },
                }
            }
        }
    });
    exports.customModalStyle = components_1.Styles.style({
        '-webkit-transform': 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
        $nest: {
            '.modal, .modal-wrapper': {
                '-webkit-transform': 'translate3d(0, 0, 0)',
                transform: 'translate3d(0, 0, 0)',
            }
        }
    });
});
define("@scom/scom-editor/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const moduleDir = components_2.application.currentModuleDir;
    function fullPath(path) {
        return `${moduleDir}/${path}`;
    }
    ;
    exports.default = {
        fullPath
    };
});
define("@scom/scom-editor/components/utils.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/global/index.ts", "@scom/scom-editor/components/index.css.ts", "@scom/scom-editor/assets.ts"], function (require, exports, components_3, index_1, index_css_1, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getChartTypeOptions = exports.ChartTypes = exports.getWidgetEmbedUrl = exports.WidgetMapping = exports.MediaBlockTypes = exports.CustomBlockTypes = exports.getPlacement = exports.removeContainer = exports.getModalContainer = exports.getToolbars = exports.setToolbar = exports.removeToolbar = exports.getToolbar = exports.createModal = exports.createParent = exports.createButton = exports.getExtraFields = exports.defaultBlockTypeItems = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.defaultBlockTypeItems = [
        {
            name: "Paragraph",
            type: "paragraph",
            icon: { name: 'paragraph' },
            isSelected: (block) => block.type === "paragraph",
        },
        {
            name: "Heading 1",
            type: "heading",
            props: { level: 1 },
            icon: { name: 'heading' },
            isSelected: (block) => block.type === "heading" &&
                "level" in block.props &&
                block.props.level === 1,
        },
        {
            name: "Heading 2",
            type: "heading",
            props: { level: 2 },
            icon: { name: 'heading' },
            isSelected: (block) => block.type === "heading" &&
                "level" in block.props &&
                block.props.level === 2,
        },
        {
            name: "Heading 3",
            type: "heading",
            props: { level: 3 },
            icon: { name: 'heading' },
            isSelected: (block) => block.type === "heading" &&
                "level" in block.props &&
                block.props.level === 3,
        },
        {
            name: "Bullet List",
            type: "bulletListItem",
            icon: { name: 'list-ul' },
            isSelected: (block) => block.type === "bulletListItem",
        },
        {
            name: "Numbered List",
            type: "numberedListItem",
            icon: { name: 'list-ol' },
            isSelected: (block) => block.type === "numberedListItem",
        },
    ];
    function getExtraFields() {
        const extraFields = {
            Heading: {
                group: "Headings",
                icon: { name: 'heading' },
                hint: "Used for a top-level heading",
                shortcut: (0, index_1.formatKeyboardShortcut)("Mod-Alt-1"),
            },
            "Heading 2": {
                group: "Headings",
                icon: { name: 'heading' },
                hint: "Used for key sections",
                shortcut: (0, index_1.formatKeyboardShortcut)("Mod-Alt-2"),
            },
            "Heading 3": {
                group: "Headings",
                icon: { name: 'heading' },
                hint: "Used for subsections and group headings",
                shortcut: (0, index_1.formatKeyboardShortcut)("Mod-Alt-3"),
            },
            "Numbered List": {
                group: "Basic blocks",
                icon: { name: 'list-ol' },
                hint: "Used to display a numbered list",
                shortcut: (0, index_1.formatKeyboardShortcut)("Mod-Alt-7"),
            },
            "Bullet List": {
                group: "Basic blocks",
                icon: { name: 'list-ul' },
                hint: "Used to display an unordered list",
                shortcut: (0, index_1.formatKeyboardShortcut)("Mod-Alt-9"),
            },
            Paragraph: {
                group: "Basic blocks",
                icon: { name: 'paragraph' },
                hint: "Used for the body of your document",
                shortcut: (0, index_1.formatKeyboardShortcut)("Mod-Alt-0"),
            },
            Image: {
                group: "Media",
                icon: { name: 'image' },
                hint: "Insert an image",
            },
            'Image Widget': {
                group: "Media",
                icon: { name: 'image' },
                hint: "Insert an image",
            },
            'Video': {
                group: "Media",
                icon: { name: 'video' },
                hint: "Insert a video",
            },
            Swap: {
                group: "Widget",
                icon: { name: 'exchange-alt' },
                hint: "Insert a swap widget",
            },
            Table: {
                group: "Basic blocks",
                icon: { name: 'table' },
                hint: "Create a table"
            },
            Chart: {
                group: "Widget",
                icon: { name: 'chart-line' },
                hint: "Insert a chart widget",
            },
            Tweet: {
                group: "Widget",
                icon: { image: { url: assets_1.default.fullPath('img/twitter.svg'), width: '100%', height: '100%', display: 'inline-block' } },
                hint: "Insert a twitter post",
            },
        };
        return extraFields;
    }
    exports.getExtraFields = getExtraFields;
    const createButton = (props, parent) => {
        const border = props?.border || {};
        border.radius = '0.25rem';
        const isSelectedVal = !props.isSelected || typeof props.isSelected === 'boolean' ? props.isSelected : props.isSelected();
        const onClick = props.onClick;
        props.onClick = (target, event) => {
            const isSelected = !(isSelectedVal ?? false);
            target.background.color = isSelected ? Theme.action.activeBackground : 'transparent';
            onClick(target, event);
        };
        const button = new components_3.Button(parent, {
            font: { size: '0.875rem' },
            padding: { top: '0px', bottom: '0px', left: '0.5rem', right: '0.5rem' },
            border: { ...border },
            background: { color: isSelectedVal ? Theme.action.activeBackground : 'transparent' },
            boxShadow: 'none',
            enabled: true,
            minWidth: '1.875rem',
            minHeight: '1.875rem',
            class: index_css_1.buttonHoverStyle,
            ...props
        });
        return button;
    };
    exports.createButton = createButton;
    const createParent = async (props = {}) => {
        const elm = await components_3.HStack.create({
            background: { color: Theme.background.main },
            position: 'absolute',
            zIndex: 500,
            boxShadow: Theme.shadows[1],
            lineHeight: 1.2,
            padding: { top: '0.125rem', bottom: '0.125rem', left: '0.125rem', right: '0.125rem' },
            verticalAlignment: 'center',
            border: { radius: '0.375rem', width: '1px', style: 'solid', color: Theme.colors.secondary.light },
            gap: '0.125rem',
            class: 'wrapper',
            ...props
        });
        return elm;
    };
    exports.createParent = createParent;
    const createModal = async (props = {}) => {
        const elm = await components_3.Modal.create({
            background: { color: Theme.background.main },
            boxShadow: Theme.shadows[1],
            lineHeight: 1.2,
            padding: { top: '0.125rem', bottom: '0.125rem', left: '0.125rem', right: '0.125rem' },
            border: { radius: '0.375rem', width: '1px', style: 'solid', color: Theme.colors.secondary.light },
            showBackdrop: false,
            visible: false,
            minWidth: 0,
            isChildFixed: false,
            closeOnScrollChildFixed: false,
            ...props,
            class: index_css_1.customModalStyle
        });
        elm.onClose = () => {
            if ((0, exports.getModalContainer)().contains(elm)) {
                (0, exports.getModalContainer)().removeChild(elm);
            }
        };
        return elm;
    };
    exports.createModal = createModal;
    let toolbarsMap = new Map();
    const getToolbar = (id) => {
        return toolbarsMap.get(id);
    };
    exports.getToolbar = getToolbar;
    const removeToolbar = (id) => {
        if (toolbarsMap.has(id)) {
            toolbarsMap.delete(id);
        }
    };
    exports.removeToolbar = removeToolbar;
    const setToolbar = (id, toolbar) => {
        toolbarsMap.set(id, toolbar);
    };
    exports.setToolbar = setToolbar;
    const getToolbars = () => toolbarsMap;
    exports.getToolbars = getToolbars;
    const getModalContainer = () => {
        let span = document.getElementById("toolbar-container");
        if (!span) {
            span = document.createElement('span');
            span.id = "toolbar-container";
            document.body.appendChild(span);
        }
        return span;
    };
    exports.getModalContainer = getModalContainer;
    const removeContainer = () => {
        const span = document.getElementById("toolbar-container");
        if (span) {
            span.remove();
        }
    };
    exports.removeContainer = removeContainer;
    const textAlignmentToPlacement = (textAlignment) => {
        switch (textAlignment) {
            case "left":
                return "bottomLeft";
            case "center":
                return "bottom";
            case "right":
                return "bottomRight";
            default:
                return "bottom";
        }
    };
    const getPlacement = (block) => {
        const props = block?.props || {};
        let placement = '';
        if (!("textAlignment" in props)) {
            placement = 'bottom';
        }
        else {
            placement = textAlignmentToPlacement(props.textAlignment);
        }
        return placement;
    };
    exports.getPlacement = getPlacement;
    exports.CustomBlockTypes = ['video', 'imageWidget', 'swap', 'chart', 'tweet'];
    exports.MediaBlockTypes = ['image', ...exports.CustomBlockTypes];
    exports.WidgetMapping = {
        video: {
            name: '@scom/scom-video',
            localPath: 'scom-video'
        },
        imageWidget: {
            name: '@scom/scom-image',
            localPath: 'scom-image'
        },
        swap: {
            name: '@scom/scom-swap',
            localPath: 'scom-swap'
        }
    };
    const WIDGET_LOADER_URL = 'https://ipfs.scom.dev/ipfs/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4';
    const getWidgetEmbedUrl = (block) => {
        const type = block.type;
        let module = null;
        if (type === 'chart') {
            module = {
                name: `@scom/${block.props?.name || 'scom-line-chart'}`,
                localPath: `${block.props?.name || 'scom-line-chart'}`
            };
        }
        else {
            module = exports.WidgetMapping[type];
        }
        if (module) {
            const widgetData = {
                module,
                properties: { ...block.props },
            };
            const encodedWidgetDataString = window.btoa(JSON.stringify(widgetData));
            return `${WIDGET_LOADER_URL}?data=${encodedWidgetDataString}`;
        }
        return '';
    };
    exports.getWidgetEmbedUrl = getWidgetEmbedUrl;
    exports.ChartTypes = ['scom-pie-chart', 'scom-line-chart', 'scom-bar-chart', 'scom-area-chart', 'scom-mixed-chart', 'scom-scatter-chart', 'scom-counter'];
    const getChartTypeOptions = () => {
        return [...exports.ChartTypes].map(type => ({ value: type, label: type.split('-')[1] }));
    };
    exports.getChartTypeOptions = getChartTypeOptions;
});
define("@scom/scom-editor/components/colorPicker.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_4, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorColorPicker = void 0;
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomEditorColorPicker = class ScomEditorColorPicker extends components_4.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._colors = [
                "default",
                "gray",
                "brown",
                "red",
                "orange",
                "yellow",
                "green",
                "blue",
                "purple",
                "pink",
            ];
        }
        get textColor() {
            return this._data.textColor ?? 'default';
        }
        set textColor(value) {
            this._data.textColor = value ?? 'default';
        }
        get backgroundColor() {
            return this._data.backgroundColor ?? 'default';
        }
        set backgroundColor(value) {
            this._data.backgroundColor = value ?? 'default';
        }
        async setData(value) {
            this._data = value;
            if (!this.pnlColors)
                return;
            this.pnlColors.clearInnerHTML();
            this.renderSelection('text');
            this.renderSelection('background');
        }
        getData() {
            return this._data;
        }
        showModal(parent, popupPlacement) {
            // const sideMenu = getToolbar('sideMenu');
            // if (sideMenu && !sideMenu.visible) sideMenu.visible = true;
            (0, utils_1.getModalContainer)().appendChild(this.mdColorPicker);
            this.mdColorPicker.position = 'fixed';
            if (parent)
                this.mdColorPicker.linkTo = parent;
            const { top, height } = this.getBoundingClientRect();
            const maxHeight = window.innerHeight - (top + height);
            this.pnlColors.maxHeight = maxHeight <= 200 ? 200 : maxHeight;
            if (maxHeight <= 200) {
                this.mdColorPicker.popupPlacement = 'rightTop';
            }
            else {
                this.mdColorPicker.popupPlacement = popupPlacement || 'bottom';
            }
            this.mdColorPicker.visible = true;
        }
        closeModal() {
            this.mdColorPicker.visible = false;
        }
        renderSelection(type) {
            const itemsWrap = this.$render("i-vstack", { id: `pnl${type.charAt(0).toUpperCase() + type.slice(1)}`, width: '100%' });
            const groupElm = (this.$render("i-panel", { width: '100%' },
                this.$render("i-label", { caption: type, font: { size: '0.75rem', transform: 'capitalize', weight: 500 }, lineHeight: 1.55, padding: { top: '0.313rem', bottom: '0.313rem', left: '0.75rem', right: '0.75rem' } }),
                itemsWrap));
            this.pnlColors.append(groupElm);
            for (let color of this._colors) {
                const isActived = type === 'text' ? this._data.textColor === color : this._data.backgroundColor === color;
                const colorEl = (this.$render("i-hstack", { id: `${type}${color.charAt(0).toUpperCase() + color.slice(1)}`, verticalAlignment: 'center', gap: "0.75rem", horizontalAlignment: 'space-between', cursor: 'pointer', padding: { top: '0.675rem', bottom: '0.675rem', left: '0.75rem', right: '0.75rem' }, border: { radius: '0.25rem' }, height: '1.875rem', hover: {
                        backgroundColor: Theme.action.hoverBackground
                    }, onClick: (target) => this.onColorClicked(target, type, color) },
                    this.$render("i-hstack", { verticalAlignment: 'center', gap: "0.75rem" },
                        this.$render("i-button", { height: '1rem', width: '1rem', border: { radius: '0.25rem' }, background: { color: type === 'text' ? 'transparent' : this.getColor(color, 'background') }, caption: 'A', font: { color: type === 'text' ? this.getColor(color, 'text') : Theme.text.primary, size: '0.75rem' } }),
                        this.$render("i-label", { caption: color, font: { size: '0.75rem', transform: 'capitalize', weight: 400 } })),
                    this.$render("i-icon", { name: "check", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary, visible: isActived })));
                itemsWrap.append(colorEl);
            }
        }
        getColor(color, type) {
            if (color === 'default') {
                return type === 'text' ? Theme.text.primary : 'transparent';
            }
            return color;
        }
        onColorClicked(target, type, color) {
            this.mdColorPicker.visible = false;
            const parent = type === 'text' ? this.pnlText : this.pnlBackground;
            const prop = type === 'text' ? 'textColor' : 'backgroundColor';
            this[prop] = color;
            for (let child of parent.children) {
                const icon = child.querySelector('i-icon');
                if (icon)
                    icon.visible = child.id === `${type}${color.charAt(0).toUpperCase() + color.slice(1)}`;
            }
            if (this.onSelected)
                this.onSelected(type, color);
        }
        handleClose() {
            if (this.mdColorPicker)
                this.mdColorPicker.remove();
        }
        init() {
            super.init();
            this.onSelected = this.getAttribute('onSelected', true) || this.onSelected;
            this.onClosed = this.getAttribute('onClosed', true) || this.onClosed;
            const textColor = this.getAttribute('textColor', true, 'default');
            const backgroundColor = this.getAttribute('backgroundColor', true, 'default');
            this.setData({ textColor, backgroundColor });
        }
        render() {
            return (this.$render("i-modal", { id: "mdColorPicker", popupPlacement: "bottom", minWidth: 200, maxWidth: 200, isChildFixed: true, closeOnScrollChildFixed: true, border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], showBackdrop: false, zIndex: 30001, visible: false, onClose: this.handleClose },
                this.$render("i-vstack", { id: "pnlColors", overflow: { y: 'auto' } })));
        }
    };
    ScomEditorColorPicker = __decorate([
        (0, components_4.customElements)('i-scom-editor-color-picker')
    ], ScomEditorColorPicker);
    exports.ScomEditorColorPicker = ScomEditorColorPicker;
});
define("@scom/scom-editor/components/colorButton.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorColor = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    let ScomEditorColor = class ScomEditorColor extends components_5.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.onColorClicked = this.onColorClicked.bind(this);
        }
        get textColor() {
            return this._data.textColor ?? 'default';
        }
        set textColor(value) {
            this._data.textColor = value ?? 'default';
        }
        get backgroundColor() {
            return this._data.backgroundColor ?? 'default';
        }
        set backgroundColor(value) {
            this._data.backgroundColor = value ?? 'default';
        }
        async setData(value) {
            this._data = value;
            this.mdPicker.setData({
                textColor: this.textColor,
                backgroundColor: this.backgroundColor
            });
        }
        getData() {
            return this._data;
        }
        showModal() {
            this.mdPicker.showModal(this.btnColor);
        }
        onColorClicked(type, color) {
            const prop = type === 'text' ? 'textColor' : 'backgroundColor';
            this[prop] = color;
            if (this.setColor)
                this.setColor(type, color);
            this.btnColor.font = { size: '0.75rem', color: this.textColor === 'default' ? Theme.text.primary : this.textColor };
            this.btnColor.background.color = this.backgroundColor === 'default' ? 'transparent' : this.backgroundColor;
        }
        init() {
            super.init();
            this.setColor = this.getAttribute('setColor', true) || this.setColor;
            const textColor = this.getAttribute('textColor', true, 'default');
            const backgroundColor = this.getAttribute('backgroundColor', true, 'default');
            this.setData({ textColor, backgroundColor });
        }
        render() {
            return (this.$render("i-panel", { width: 'auto', height: '100%', display: 'inline-block' },
                this.$render("i-button", { id: "btnColor", height: '1rem', width: '1rem', border: { radius: '0px' }, background: { color: 'transparent' }, caption: 'A', boxShadow: 'none', font: { size: '0.75rem', color: Theme.text.primary }, onClick: () => this.showModal() }),
                this.$render("i-scom-editor-color-picker", { id: "mdPicker", onSelected: this.onColorClicked })));
        }
    };
    ScomEditorColor = __decorate([
        (0, components_5.customElements)('i-scom-editor-color')
    ], ScomEditorColor);
    exports.ScomEditorColor = ScomEditorColor;
});
define("@scom/scom-editor/components/toolbarDropdown.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_6, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorToolbarDropdown = void 0;
    const Theme = components_6.Styles.Theme.ThemeVars;
    let ScomEditorToolbarDropdown = class ScomEditorToolbarDropdown extends components_6.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        get items() {
            return this._data.items ?? [];
        }
        set items(value) {
            this._data.items = value ?? [];
        }
        get caption() {
            return this._data.caption ?? '';
        }
        set caption(value) {
            this._data.caption = value ?? '';
        }
        get selectedItem() {
            return this.items.filter((p) => p.isSelected)[0];
        }
        async setData(value) {
            this._data = value;
            this.renderUI();
        }
        getData() {
            return this._data;
        }
        renderUI() {
            this.pnlOptions.clearInnerHTML();
            for (let item of this.items) {
                const isActived = item.isSelected ?? false;
                const elm = (this.$render("i-hstack", { verticalAlignment: 'center', gap: "0.75rem", horizontalAlignment: 'space-between', cursor: 'pointer', padding: { top: '0.675rem', bottom: '0.675rem', left: '0.75rem', right: '0.75rem' }, border: { radius: '0.25rem' }, height: '1.875rem', enabled: !item.isDisabled, hover: {
                        backgroundColor: Theme.action.hoverBackground
                    }, onClick: (target, event) => {
                        if (item.onClick)
                            item.onClick(target, event);
                        this.mdDropdown.visible = false;
                        for (let child of this.pnlOptions.children) {
                            const icon = child.querySelector('.check-icon');
                            if (icon)
                                icon.visible = child.getAttribute('data-item') === item.text;
                        }
                        for (let data of this.items) {
                            data.isSelected = data.text === item.text;
                        }
                        this.updateSelected();
                    } },
                    this.$render("i-hstack", { verticalAlignment: 'center', gap: "0.75rem" },
                        this.$render("i-icon", { name: item.icon.name, width: '0.5rem', height: '0.5rem', fill: Theme.text.primary }),
                        this.$render("i-label", { caption: item.text, font: { size: '0.75rem', transform: 'capitalize', weight: 400 } })),
                    this.$render("i-icon", { name: "check", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary, visible: isActived, class: "check-icon" })));
                elm.setAttribute('data-item', item.text);
                this.pnlOptions.append(elm);
            }
            this.updateSelected();
        }
        updateSelected() {
            this.btnSelected.caption = this.caption || this.selectedItem?.text || '';
            if (this.selectedItem?.icon?.name && !this.caption) {
                this.btnSelected.icon.name = this.selectedItem.icon.name;
            }
            else {
                this.btnSelected.icon.visible = false;
            }
        }
        showModal() {
            (0, utils_2.getModalContainer)().appendChild(this.mdDropdown);
            this.mdDropdown.linkTo = this.btnSelected;
            this.mdDropdown.position = 'fixed';
            const { top, height } = this.getBoundingClientRect();
            const maxHeight = window.innerHeight - (top + height);
            this.mdDropdown.popupPlacement = maxHeight <= 200 ? 'top' : 'bottom';
            this.mdDropdown.visible = true;
        }
        handleClosed() {
            if (this.mdDropdown)
                this.mdDropdown.remove();
        }
        init() {
            super.init();
            const items = this.getAttribute('items', true);
            const caption = this.getAttribute('caption', true);
            this.setData({ items, caption });
        }
        render() {
            return (this.$render("i-panel", { id: "pnlDropdown", width: 'auto', height: '100%', display: 'inline-block' },
                this.$render("i-button", { id: "btnSelected", height: '100%', width: 'auto', minWidth: '1rem', border: { radius: '0px' }, background: { color: 'transparent' }, font: { size: '0.75rem', color: Theme.text.primary }, boxShadow: 'none', icon: { width: '0.75rem', height: '0.75rem', fill: Theme.text.primary }, rightIcon: { width: '0.5rem', height: '0.5rem', fill: Theme.text.primary, name: 'angle-down' }, onClick: () => this.showModal() }),
                this.$render("i-modal", { id: "mdDropdown", minWidth: 200, popupPlacement: 'bottom', maxWidth: 250, isChildFixed: true, closeOnScrollChildFixed: true, border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], margin: { top: '1rem' }, showBackdrop: false, visible: false, zIndex: 30001, onClose: this.handleClosed },
                    this.$render("i-vstack", { id: "pnlOptions", maxHeight: '34.788rem', overflow: { y: 'auto' } }))));
        }
    };
    ScomEditorToolbarDropdown = __decorate([
        (0, components_6.customElements)('i-scom-editor-toolbar-dropdown')
    ], ScomEditorToolbarDropdown);
    exports.ScomEditorToolbarDropdown = ScomEditorToolbarDropdown;
});
define("@scom/scom-editor/components/blockTypeButton.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_7, utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorBlockType = void 0;
    let ScomEditorBlockType = class ScomEditorBlockType extends components_7.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        get items() {
            return this._data.items ?? utils_3.defaultBlockTypeItems;
        }
        set items(value) {
            this._data.items = value ?? utils_3.defaultBlockTypeItems;
        }
        get block() {
            return this._data.block;
        }
        set block(value) {
            this._data.block = value;
        }
        setData(value) {
            this._data = value;
            this.blockType.setData({ items: this.getItems() });
        }
        getData() {
            return this._data;
        }
        get filteredItems() {
            return [...this.items].filter((item) => {
                if (!this.onValidate(item)) {
                    return false;
                }
                return true;
            });
        }
        getItems() {
            return [...this.items].map((item) => ({
                text: item.name,
                icon: item.icon,
                onClick: () => {
                    if (this.onItemClicked)
                        this.onItemClicked(item);
                },
                isSelected: item.isSelected(this.block),
            }));
        }
        init() {
            super.init();
            this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
            this.onValidate = this.getAttribute('onValidate', true) || this.onValidate;
            const items = this.getAttribute('items', true);
            const block = this.getAttribute('block', true);
            this.setData({ items, block });
        }
        render() {
            return (this.$render("i-scom-editor-toolbar-dropdown", { id: "blockType", display: "inline-block", height: '100%' }));
        }
    };
    ScomEditorBlockType = __decorate([
        (0, components_7.customElements)('i-scom-editor-block-type')
    ], ScomEditorBlockType);
    exports.ScomEditorBlockType = ScomEditorBlockType;
});
define("@scom/scom-editor/components/linkModal.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_8, utils_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorMdLink = void 0;
    const Theme = components_8.Styles.Theme.ThemeVars;
    let ScomEditorMdLink = class ScomEditorMdLink extends components_8.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.handleInput = this.handleInput.bind(this);
        }
        get text() {
            return this._data.text ?? '';
        }
        set text(value) {
            this._data.text = value ?? '';
        }
        get url() {
            return this._data.url ?? '';
        }
        set url(value) {
            this._data.url = value ?? '';
        }
        setData(value) {
            this._data = value;
            this.inputLink.value = this.url;
            this.inputText.value = this.text;
        }
        getData() {
            return this._data;
        }
        showModal(parent) {
            (0, utils_4.getModalContainer)().appendChild(this.mdLink);
            this.mdLink.position = 'fixed';
            if (parent)
                this.mdLink.linkTo = parent;
            this.mdLink.refresh();
            this.mdLink.visible = true;
        }
        closeModal() {
            this.mdLink.visible = false;
        }
        handleInput(target, event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (this.onInputChanged)
                    this.onInputChanged(target, event);
            }
        }
        handleClosed() {
            if (this.mdLink)
                this.mdLink.remove();
        }
        init() {
            super.init();
            this.onInputChanged = this.getAttribute('onInputChanged', true) || this.onInputChanged;
            const text = this.getAttribute('text', true);
            const url = this.getAttribute('url', true);
            this.setData({ text, url });
        }
        render() {
            return (this.$render("i-modal", { id: "mdLink", popupPlacement: "bottom", minWidth: '18.75rem', maxWidth: 'max-content', border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], margin: { top: '1rem' }, isChildFixed: true, closeOnScrollChildFixed: true, showBackdrop: false, overflow: 'hidden', onClose: this.handleClosed },
                this.$render("i-vstack", { id: "pnlLink", maxHeight: '37.488rem', overflow: { y: 'auto' }, gap: '0.25rem' },
                    this.$render("i-hstack", { verticalAlignment: 'center', gap: "0.5rem", border: { radius: '0.25rem' }, background: { color: Theme.background.modal } },
                        this.$render("i-icon", { name: "paperclip", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary, stack: { basis: '1.875rem', shrink: '0' } }),
                        this.$render("i-input", { id: "inputLink", width: '100%', height: '2rem', border: { style: 'none' }, background: { color: Theme.background.modal }, placeholder: 'Edit URL', font: { size: '0.75rem' }, onKeyUp: this.handleInput })),
                    this.$render("i-hstack", { verticalAlignment: 'center', gap: "0.5rem", border: { radius: '0.25rem' }, background: { color: Theme.background.modal } },
                        this.$render("i-icon", { name: "paragraph", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary, stack: { basis: '1.875rem', shrink: '0' } }),
                        this.$render("i-input", { id: "inputText", width: '100%', height: '2rem', border: { style: 'none' }, background: { color: Theme.background.modal }, placeholder: 'Edit Title', font: { size: '0.75rem' }, onKeyUp: this.handleInput })))));
        }
    };
    ScomEditorMdLink = __decorate([
        (0, components_8.customElements)('i-scom-editor-md-link')
    ], ScomEditorMdLink);
    exports.ScomEditorMdLink = ScomEditorMdLink;
});
define("@scom/scom-editor/components/linkButton.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorLink = void 0;
    const Theme = components_9.Styles.Theme.ThemeVars;
    let ScomEditorLink = class ScomEditorLink extends components_9.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        get text() {
            return this.editor ? this.editor.getSelectedText() || '' : this._data.text;
        }
        set text(value) {
            this._data.text = value ?? '';
        }
        get url() {
            return this.editor ? this.editor.getSelectedLinkUrl() || '' : this._data.url;
        }
        set url(value) {
            this._data.url = value ?? '';
        }
        get caption() {
            return this._data.caption ?? '';
        }
        set caption(value) {
            this._data.caption = value ?? '';
        }
        get editor() {
            return this._data.editor;
        }
        set editor(value) {
            this._data.editor = value;
        }
        setData(value) {
            this._data = value;
            this.renderUI();
        }
        getData() {
            return this._data;
        }
        renderUI() {
            this.btnLink.caption = this.caption;
            this.btnLink.icon.visible = !this.caption;
            this.mdCreateLink.onInputChanged = this.handleInput.bind(this);
        }
        handleInput(target, event) {
            const id = target.id;
            const prop = id === 'inputLink' ? 'url' : 'text';
            this._data[prop] = target.value;
            if (!this._data.url)
                return;
            this.mdCreateLink.closeModal();
            if (this.setLink)
                this.setLink(this._data.text, this._data.url);
        }
        showModal() {
            this.mdCreateLink.setData({ text: this.text, url: this.url });
            this.mdCreateLink.showModal(this.btnLink);
        }
        init() {
            super.init();
            this.setLink = this.getAttribute('setLink', true) || this.setLink;
            const text = this.getAttribute('text', true);
            const url = this.getAttribute('url', true);
            const editor = this.getAttribute('editor', true);
            const caption = this.getAttribute('caption', true);
            this.setData({ text, url, caption, editor });
        }
        render() {
            return (this.$render("i-panel", { width: 'auto', height: '100%', display: 'inline-block' },
                this.$render("i-button", { id: "btnLink", height: '100%', width: 'auto', minWidth: '1rem', border: { radius: '0px' }, padding: { top: 0, bottom: 0, left: '0.5rem', right: '0.5rem' }, icon: { name: 'paperclip', width: '0.75rem', height: '0.75rem', fill: Theme.text.primary }, background: { color: 'transparent' }, boxShadow: 'none', onClick: () => this.showModal() }),
                this.$render("i-scom-editor-md-link", { id: "mdCreateLink" })));
        }
    };
    ScomEditorLink = __decorate([
        (0, components_9.customElements)('i-scom-editor-link')
    ], ScomEditorLink);
    exports.ScomEditorLink = ScomEditorLink;
});
define("@scom/scom-editor/components/dragHandle.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/index.css.ts"], function (require, exports, components_10, utils_5, index_css_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorDragHandle = void 0;
    const Theme = components_10.Styles.Theme.ThemeVars;
    let ScomEditorDragHandle = class ScomEditorDragHandle extends components_10.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._menuData = [
                {
                    title: `<i-label caption="Delete"></i-label>`,
                    id: 'delete'
                },
                {
                    title: `<i-hstack verticalAlignment="center" horizontalAlignment="space-between" width="100%">
        <i-label caption="Colors"></i-label>
        <i-icon width="16px" height="16px" fill="${Theme.text.primary}" name="angle-right"></i-icon>
      </i-hstack>`,
                    id: 'color'
                }
            ];
            this.handleMenu = this.handleMenu.bind(this);
            this.onColorClicked = this.onColorClicked.bind(this);
        }
        get block() {
            return this._data.block;
        }
        set block(value) {
            this._data.block = value;
        }
        get editor() {
            return this._data.editor;
        }
        set editor(value) {
            this._data.editor = value;
        }
        setData(value) {
            this._data = value;
            this.renderUI();
        }
        renderUI() {
            if (this.mdPicker) {
                this.mdPicker.setData({
                    textColor: this.block?.props?.textColor,
                    backgroundColor: this.block?.props?.backgroundColor
                });
                this.mdPicker.onClosed = () => {
                    this.mdMenu.visible = false;
                };
            }
        }
        handleMenu(target, item) {
            if (item.id === 'delete') {
                if (this.onDeleted)
                    this.onDeleted();
            }
            else {
                if (this.editor)
                    this.editor.focus();
                this.mdPicker.showModal(this.mdMenu, 'rightTop');
                if (this.freezeMenu)
                    this.freezeMenu();
            }
        }
        onShowMenu(parent) {
            (0, utils_5.getModalContainer)().appendChild(this.mdMenu);
            this.mdMenu.linkTo = parent;
            this.mdMenu.popupPlacement = 'left';
            // this.mdMenu.position = 'fixed';
            this.mdMenu.visible = true;
        }
        onHideMenu() {
            if (this.mdMenu)
                this.mdMenu.remove();
            this.mdMenu.visible = false;
        }
        onModalClose() {
            if (this.unfreezeMenu)
                this.unfreezeMenu();
        }
        onModalOpen() {
            if (this.freezeMenu)
                this.freezeMenu();
        }
        onColorClicked(type, color) {
            if (this.onSetColor)
                this.onSetColor(type, color);
        }
        init() {
            super.init();
            this.onDeleted = this.getAttribute('onDeleted', true) || this.onDeleted;
            this.onSetColor = this.getAttribute('onSetColor', true) || this.onSetColor;
            this.freezeMenu = this.getAttribute('freezeMenu', true) || this.freezeMenu;
            this.unfreezeMenu = this.getAttribute('unfreezeMenu', true) || this.unfreezeMenu;
            const block = this.getAttribute('block', true);
            const editor = this.getAttribute('editor', true);
            if (block)
                this.setData({ block, editor });
        }
        render() {
            return (this.$render("i-modal", { id: "mdMenu", popupPlacement: "left", showBackdrop: false, minWidth: 0, maxWidth: '6.25rem', visible: false, position: "absolute", zIndex: 9999, 
                // isChildFixed={true}
                // closeOnScrollChildFixed={true}
                class: index_css_2.customModalStyle, onOpen: this.onModalOpen, onClose: this.onModalClose },
                this.$render("i-panel", null,
                    this.$render("i-menu", { id: "menuElm", padding: { top: '0rem', bottom: '0rem', left: '0.675rem', right: '0.675rem' }, font: { color: Theme.text.primary, size: '0.75rem' }, boxShadow: Theme.shadows[1], width: '100%', mode: "vertical", data: this._menuData, background: { color: Theme.background.modal }, onItemClick: this.handleMenu }),
                    this.$render("i-scom-editor-color-picker", { id: "mdPicker", onSelected: this.onColorClicked }))));
        }
    };
    ScomEditorDragHandle = __decorate([
        (0, components_10.customElements)('i-scom-editor-drag-handle')
    ], ScomEditorDragHandle);
    exports.ScomEditorDragHandle = ScomEditorDragHandle;
});
define("@scom/scom-editor/components/settingsForm.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.css.ts", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_11, index_css_3, utils_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorSettingsForm = void 0;
    const Theme = components_11.Styles.Theme.ThemeVars;
    let ScomEditorSettingsForm = class ScomEditorSettingsForm extends components_11.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.chartActions = new Map();
            this.onChartNameChanged = this.onChartNameChanged.bind(this);
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
        }
        setData(value) {
            this._data = value;
            this.renderForm();
        }
        async renderForm() {
            const { action, onConfirm, block } = this.data;
            this.pnlForm.visible = false;
            this.actionForm.visible = false;
            this.pnlForm.clearInnerHTML();
            if (action.customUI) {
                if (block.type === 'chart') {
                    const types = (0, utils_6.getChartTypeOptions)();
                    const selectedValue = types.find(item => block.props.name && item.value === block.props.name) || undefined;
                    this.chartActions.set(block.props.name, action);
                    this.pnlForm.append(this.$render("i-vstack", { gap: '0.625rem', width: '100%' },
                        this.$render("i-label", { caption: 'Chart Type' }),
                        this.$render("i-combo-box", { id: "cbName", items: types, selectedItem: selectedValue, width: '100%', height: '2.625rem', onChanged: this.onChartNameChanged })));
                    this.pnlForm.append(this.$render("i-vstack", { gap: '0.625rem', width: '100%' },
                        this.$render("i-label", { caption: 'Chart Title' }),
                        this.$render("i-input", { id: 'inputTitle', width: '100%', height: '2.625rem', placeholder: 'Enter Title', value: block.props?.title || '' })));
                }
                this.customForm = await action.customUI.render({ ...block.props }, this.onSave.bind(this));
                this.pnlForm.append(this.customForm);
                this.pnlForm.visible = true;
            }
            else {
                this.actionForm.uiSchema = action.userInputUISchema;
                this.actionForm.jsonSchema = action.userInputDataSchema;
                this.actionForm.formOptions = {
                    columnWidth: '100%',
                    columnsPerRow: 1,
                    confirmButtonOptions: {
                        caption: 'Confirm',
                        backgroundColor: Theme.colors.primary.main,
                        fontColor: Theme.colors.primary.contrastText,
                        padding: { top: '0.5rem', bottom: '0.5rem', right: '1rem', left: '1rem' },
                        border: { radius: '0.5rem' },
                        hide: false,
                        onClick: async () => {
                            const data = await this.actionForm.getFormData();
                            if (onConfirm)
                                onConfirm(block, data);
                        }
                    },
                    customControls: action.customControls,
                    dateTimeFormat: {
                        date: 'YYYY-MM-DD',
                        time: 'HH:mm:ss',
                        dateTime: 'MM/DD/YYYY HH:mm'
                    }
                };
                this.actionForm.renderForm();
                this.actionForm.clearFormData();
                this.actionForm.setFormData({ ...block.props });
                this.actionForm.visible = true;
            }
        }
        async onChartNameChanged(target) {
            const { block, onTypeChanged } = this.data;
            const name = target.selectedItem.value;
            if (name === block.props.name)
                return;
            if (this.customForm)
                this.customForm.remove();
            if (this.chartActions.has(name)) {
                this.customForm = await this.chartActions.get(name).customUI.render({ ...block.props }, this.onSave.bind(this));
                this.pnlForm.append(this.customForm);
            }
            else if (onTypeChanged) {
                const newAction = await onTypeChanged(name);
                if (newAction) {
                    this.customForm = await newAction.customUI.render({ ...block.props }, this.onSave.bind(this));
                    this.pnlForm.append(this.customForm);
                }
            }
        }
        onSave(result, data) {
            const { onConfirm, block } = this.data;
            if (block.type === 'chart') {
                data.title = this.inputTitle.value || '';
                data.name = this.cbName.selectedItem.value;
            }
            if (onConfirm && result)
                onConfirm(block, { ...data });
        }
        init() {
            super.init();
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
        }
        render() {
            return (this.$render("i-panel", { padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-form", { id: "actionForm", visible: false }),
                this.$render("i-vstack", { id: "pnlForm", gap: '0.625rem', width: '100%', visible: false, class: index_css_3.settingStyle })));
        }
    };
    ScomEditorSettingsForm = __decorate([
        (0, components_11.customElements)('i-scom-editor-settings-form')
    ], ScomEditorSettingsForm);
    exports.ScomEditorSettingsForm = ScomEditorSettingsForm;
});
define("@scom/scom-editor/components/sideMenu.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/settingsForm.tsx", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/index.css.ts"], function (require, exports, components_12, settingsForm_1, utils_7, index_css_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorSideMenu = void 0;
    const Theme = components_12.Styles.Theme.ThemeVars;
    let ScomEditorSideMenu = class ScomEditorSideMenu extends components_12.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                block: {
                    id: '',
                    type: '',
                    props: undefined,
                    content: [],
                    children: []
                },
                editor: undefined
            };
            this.initedMap = new Map();
            this.handleAddBlock = this.handleAddBlock.bind(this);
            this.handleEditBlock = this.handleEditBlock.bind(this);
            this.showDragMenu = this.showDragMenu.bind(this);
            this.handleSetColor = this.handleSetColor.bind(this);
            this.handleDelete = this.handleDelete.bind(this);
            this.onTypeChanged = this.onTypeChanged.bind(this);
        }
        get block() {
            return this._data.block;
        }
        set block(value) {
            if (value.id && value.id === this._data?.block?.id)
                return;
            this._data.block = value;
            this.dragHandle.block = value;
            this.id = `side-${this.block.id}`;
            this.updateButtons();
        }
        get editor() {
            return this._data.editor;
        }
        set editor(value) {
            this._data.editor = value;
        }
        get isEditShown() {
            return this.block?.type && utils_7.CustomBlockTypes.includes(this.block.type);
        }
        setData(value) {
            this._data = value;
            this.dragHandle.freezeMenu = this.editor.sideMenu.freezeMenu;
            this.dragHandle.unfreezeMenu = this.editor.sideMenu.unfreezeMenu;
            this.dragHandle.setData({ block: this.block, editor: this.editor });
            this.btnDrag.addEventListener("dragstart", this.editor.sideMenu.blockDragStart);
            this.btnDrag.addEventListener("dragend", this.editor.sideMenu.blockDragEnd);
            this.btnDrag.draggable = true;
            this.updateButtons();
            this.id = `side-${this.block.id}`;
        }
        updateButtons() {
            this.btnEdit.visible = this.isEditShown;
            this.btnAdd.visible = !this.isEditShown;
        }
        openConfig(block, module) {
            const isCustomBlock = block?.type && utils_7.CustomBlockTypes.includes(block.type);
            if (isCustomBlock && !this.initedMap.has(block.id)) {
                const editAction = module.getActions()[0];
                this.currentModule = module;
                this.showConfigModal(block, editAction);
                this.initedMap.set(block.id, true);
            }
        }
        handleSetColor(type, color) {
            this.editor.focus();
            const prop = type === 'text' ? 'textColor' : 'backgroundColor';
            this.editor.updateBlock(this.block, {
                props: { [prop]: color }
            });
            this.hideDragMenu();
        }
        handleDelete() {
            this.editor.focus();
            this.editor.removeBlocks([this.block]);
            this.hideDragMenu();
        }
        handleAddBlock() {
            this.editor.focus();
            this.editor.sideMenu.addBlock();
        }
        showDragMenu(target, event) {
            event.preventDefault();
            this.editor.focus();
            this.dragHandle.onShowMenu(this);
        }
        hideDragMenu() {
            this.dragHandle.onHideMenu();
        }
        handleEditBlock() {
            this.editor.focus();
            const blockEl = this.editor.domElement.querySelector(`[data-id="${this.block.id}"]`);
            if (!blockEl)
                return;
            let module;
            let editAction;
            switch (this.block.type) {
                case 'video':
                case 'imageWidget':
                case 'swap':
                case 'tweet':
                    module = blockEl.querySelector('i-scom-editor-custom-block');
                    editAction = module.getActions()[0];
                    break;
                case 'chart':
                    module = blockEl.querySelector('i-scom-editor-chart');
                    editAction = this.getActions(module)[0];
                    break;
            }
            this.currentModule = module;
            this.showConfigModal(this.block, editAction);
        }
        showConfigModal(block, editAction) {
            if (!editAction)
                return;
            const formConfig = {
                action: { ...editAction },
                block: JSON.parse(JSON.stringify(block)),
                onConfirm: (block, data) => {
                    const newProps = { ...data };
                    if (block.type === 'video' || block.type === 'tweet') {
                        if (data.url !== block.props.url) {
                            this.updateBlock(block, { url: data.url });
                        }
                    }
                    else if (block.type === 'imageWidget') {
                        const { url, cid, link, altText, keyword, photoId, backgroundColor } = newProps;
                        this.updateBlock(block, { url, cid, link, altText, keyword, photoId, backgroundColor });
                    }
                    else if (block.type === 'swap') {
                        const { tokens, networks, title, logo, category, providers } = newProps;
                        this.updateBlock(block, { tokens, networks, title, logo, category, providers });
                    }
                    else if (block.type === 'chart') {
                        const { name, apiEndpoint, dataSource, queryId, title, options, mode } = newProps;
                        this.updateBlock(block, { name, apiEndpoint, dataSource, queryId, title, options, mode });
                    }
                    this.actionForm.closeModal();
                }
            };
            if (block.type === 'chart') {
                formConfig.onTypeChanged = this.onTypeChanged;
            }
            this.renderForm(formConfig);
        }
        getActions(component) {
            if (component?.getConfigurators) {
                const configs = component.getConfigurators() || [];
                const configurator = configs.find((conf) => conf.target === 'Editor');
                if (configurator?.getActions)
                    return configurator.getActions();
            }
            return [];
        }
        async onTypeChanged(name) {
            if (this.currentModule?.updateType) {
                const actions = await this.currentModule.updateType(name);
                return actions[0];
            }
            return null;
        }
        renderForm(data) {
            if (this.actionForm) {
                this.actionForm.setData(data);
            }
            else {
                this.actionForm = new settingsForm_1.ScomEditorSettingsForm(undefined, { data });
            }
            this.actionForm.openModal({
                title: 'Edit',
                width: '40rem'
            });
        }
        async updateBlock(block, props) {
            this.editor.updateBlock(block, { props });
        }
        init() {
            super.init();
            const block = this.getAttribute('block', true);
            const editor = this.getAttribute('editor', true);
            if (editor && block)
                this.setData({ block, editor });
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-hstack", { verticalAlignment: "center", minWidth: 50 },
                    this.$render("i-button", { id: "btnAdd", icon: { name: 'plus', width: '0.75rem', height: '0.75rem', fill: Theme.text.secondary }, background: { color: 'transparent' }, boxShadow: 'none', padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, border: { radius: '0.125rem' }, class: index_css_4.buttonHoverStyle, onClick: this.handleAddBlock }),
                    this.$render("i-button", { id: "btnEdit", icon: { name: 'cog', width: '0.75rem', height: '0.75rem', fill: Theme.text.secondary }, background: { color: 'transparent' }, boxShadow: 'none', visible: false, border: { radius: '0.125rem' }, class: index_css_4.buttonHoverStyle, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, onClick: this.handleEditBlock }),
                    this.$render("i-button", { id: "btnDrag", icon: { name: "ellipsis-v", width: '0.75rem', height: '0.75rem', fill: Theme.text.secondary }, background: { color: 'transparent' }, boxShadow: 'none', class: index_css_4.buttonHoverStyle, border: { radius: '0.125rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, onClick: this.showDragMenu })),
                this.$render("i-scom-editor-drag-handle", { id: "dragHandle", onSetColor: this.handleSetColor, onDeleted: this.handleDelete })));
        }
    };
    ScomEditorSideMenu = __decorate([
        (0, components_12.customElements)('i-scom-editor-side-menu')
    ], ScomEditorSideMenu);
    exports.ScomEditorSideMenu = ScomEditorSideMenu;
});
define("@scom/scom-editor/components/slashMenu.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_13, utils_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorSlashMenu = void 0;
    const Theme = components_13.Styles.Theme.ThemeVars;
    let ScomEditorSlashMenu = class ScomEditorSlashMenu extends components_13.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.itemsMap = new Map();
        }
        get items() {
            return this._data.items || [];
        }
        set items(value) {
            this._data.items = value || [];
        }
        get selectedIndex() {
            return this._data.selectedIndex ?? 0;
        }
        set selectedIndex(value) {
            this._data.selectedIndex = value ?? 0;
        }
        get groupData() {
            const result = {};
            const fieldData = (0, utils_8.getExtraFields)();
            for (let item of this.items) {
                const executeFn = item.execute;
                item.execute = (editor) => {
                    const slashMenu = (0, utils_8.getToolbar)('slashMenu');
                    if (slashMenu)
                        slashMenu.visible = false;
                    editor.focus();
                    executeFn(editor);
                };
                const field = fieldData[item.name] || {};
                if (result[field.group]) {
                    result[field.group].push({ ...field, ...item });
                }
                else {
                    result[field.group] = [{ ...field, ...item }];
                }
            }
            return result;
        }
        setData(value) {
            this._data = value;
            this.renderUI();
        }
        updateMaxHeight(maxHeight) {
            this.pnlSlash.maxHeight = maxHeight;
        }
        renderUI() {
            this.pnlSlash.clearInnerHTML();
            const groups = Object.keys(this.groupData);
            for (let group of groups) {
                const itemsWrap = this.$render("i-vstack", null);
                const groupEl = (this.$render("i-vstack", null,
                    this.$render("i-label", { caption: group, padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, width: '100%', background: { color: Theme.action.hoverBackground } }),
                    itemsWrap));
                let selectedItem = null;
                for (let i = 0; i < this.groupData[group].length; i++) {
                    const item = this.groupData[group][i];
                    const isSelected = this.items[this.selectedIndex]?.name === item.name;
                    const icon = new components_13.Icon(undefined, { ...item.icon, width: '1rem', height: '1rem' });
                    const hstack = this.$render("i-hstack", { padding: { top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem' }, cursor: "pointer", gap: '1rem', width: '100%', verticalAlignment: "center", horizontalAlignment: "space-between", background: { color: isSelected ? Theme.action.activeBackground : 'transparent' }, hover: {
                            backgroundColor: Theme.action.activeBackground
                        }, onClick: () => {
                            if (this.onItemClicked)
                                this.onItemClicked(item);
                            const oldSelected = this.items[this.selectedIndex]?.name;
                            const oldItem = oldSelected && this.itemsMap.get(oldSelected);
                            if (oldItem)
                                oldItem.background.color = 'transparent';
                            const currentItem = this.itemsMap.get(item.name);
                            if (currentItem)
                                currentItem.background.color = Theme.action.activeBackground;
                        } },
                        this.$render("i-hstack", { width: '100%', gap: '1rem', verticalAlignment: "center" },
                            icon,
                            this.$render("i-vstack", { gap: '0.25rem' },
                                this.$render("i-label", { caption: item.name, font: { size: '0.875rem', weight: 500 } }),
                                this.$render("i-label", { caption: item.hint, font: { size: '0.625rem', weight: 400 } }))),
                        this.$render("i-label", { caption: item.shortcut || '', font: { size: '0.625rem', weight: 600 }, border: { radius: '0.25rem' }, background: { color: item.shortcut ? Theme.action.activeBackground : 'transparent' }, visible: item.shortcut, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, stack: { shrink: '0' } }));
                    if (isSelected)
                        selectedItem = hstack;
                    itemsWrap.append(hstack);
                    this.itemsMap.set(item.name, hstack);
                }
                this.pnlSlash.appendChild(groupEl);
                if (selectedItem) {
                    this.pnlSlash.scrollTo({ top: selectedItem.offsetTop });
                }
            }
        }
        init() {
            super.init();
            this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
            const items = this.getAttribute('items', true);
            const selectedIndex = this.getAttribute('selectedIndex', true);
            if (items)
                this.setData({ items, selectedIndex });
        }
        render() {
            return (this.$render("i-panel", { id: "pnlWrap", minWidth: 300, maxWidth: '100%', height: "auto" },
                this.$render("i-vstack", { id: "pnlSlash", width: '100%', overflow: { y: 'auto' }, border: { radius: '0.375rem', width: '1px', style: 'solid', color: Theme.colors.secondary.light } })));
        }
    };
    ScomEditorSlashMenu = __decorate([
        (0, components_13.customElements)('i-scom-editor-splash-menu')
    ], ScomEditorSlashMenu);
    exports.ScomEditorSlashMenu = ScomEditorSlashMenu;
});
define("@scom/scom-editor/components/imageToolbar.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorImageToolbar = void 0;
    const Theme = components_14.Styles.Theme.ThemeVars;
    let ScomEditorImageToolbar = class ScomEditorImageToolbar extends components_14.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        get editor() {
            return this._data.editor;
        }
        set editor(value) {
            this._data.editor = value;
        }
        get block() {
            return this._data.block;
        }
        set block(value) {
            this._data.block = value;
        }
        async setData(value) {
            this._data = value;
        }
        getData() {
            return this._data;
        }
        async onFileChanged(target, files) {
            const file = files[0];
            if (!file)
                return;
            this.lblFailed.visible = false;
            try {
                this.pnlLoading.visible = true;
                const file = files[0];
                const imageStr = await this.btnUpload.toBase64(file);
                this.updateBlock(imageStr);
            }
            catch (err) {
                this.btnUpload.clear();
                this.lblFailed.visible = true;
            }
            this.pnlLoading.visible = false;
        }
        handleURLEnter(target, event) {
            if (event.key === "Enter") {
                event.preventDefault();
                this.updateBlock();
            }
        }
        updateBlock(url) {
            this.editor.updateBlock(this.block, {
                type: "image",
                props: {
                    url: url ?? this.inputUrl.value,
                },
            });
            this.btnUpload.clear();
            this.imageTabs.activeTabIndex = 0;
            if (this.onUpdated)
                this.onUpdated();
        }
        handleURLChanged(target) {
            this.btnEmbed.enabled = !!target.value;
        }
        init() {
            super.init();
            this.onUpdated = this.getAttribute('onUpdated', true) || this.onUpdated;
            const editor = this.getAttribute('editor', true);
            const block = this.getAttribute('block', true);
            if (editor && block)
                this.setData({ editor, block });
        }
        render() {
            return (this.$render("i-panel", { width: '100%' },
                this.$render("i-tabs", { id: "imageTabs", width: '100%' },
                    this.$render("i-tab", { caption: "Upload", font: { color: Theme.text.primary, size: '0.875rem' }, minHeight: '0px' },
                        this.$render("i-panel", null,
                            this.$render("i-vstack", { id: "pnlLoading", padding: { top: '0.5rem', bottom: '0.5rem' }, visible: false, height: "100%", width: "100%", minHeight: 200, position: "absolute", top: 0, bottom: 0, zIndex: 999, background: { color: Theme.background.main }, class: "i-loading-overlay" },
                                this.$render("i-vstack", { horizontalAlignment: "center", verticalAlignment: "center", position: "absolute", top: "calc(50% - 0.75rem)", left: "calc(50% - 0.75rem)" },
                                    this.$render("i-icon", { class: "i-loading-spinner_icon", name: "spinner", width: 24, height: 24, fill: Theme.colors.primary.main }))),
                            this.$render("i-vstack", { gap: "0.5rem", padding: { left: '0.5rem', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' } },
                                this.$render("i-upload", { id: "btnUpload", caption: 'Upload Image', width: '100%', minHeight: '6.25rem', border: { width: '1px', style: 'solid', color: Theme.divider }, font: { size: '0.75rem', color: Theme.text.primary, weight: 600 }, onChanged: this.onFileChanged }),
                                this.$render("i-label", { id: "lblFailed", caption: "Error: Upload failed", visible: false, font: { color: Theme.colors.error.main, size: '0.75rem' }, class: "text-center" })))),
                    this.$render("i-tab", { caption: "Embed", font: { color: Theme.text.primary, size: '0.875rem' }, minHeight: '0px' },
                        this.$render("i-vstack", { gap: '0.5rem', padding: { left: '0.5rem', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' } },
                            this.$render("i-input", { id: "inputUrl", placeholder: "Enter Url", border: { width: '1px', style: 'solid', color: Theme.divider }, font: { size: '0.75rem', color: Theme.text.primary }, background: { color: 'transparent' }, width: '100%', height: '1.875rem', onChanged: this.handleURLChanged, onKeyDown: this.handleURLEnter }),
                            this.$render("i-button", { id: "btnEmbed", width: '100%', border: { width: '1px', style: 'solid', color: Theme.divider }, font: { size: '0.75rem', color: Theme.text.primary, weight: 600 }, padding: { left: '0.625rem', right: '0.625rem' }, minHeight: '1.875rem', background: { color: 'transparent' }, enabled: false, caption: 'Embed Image', onClick: () => this.updateBlock() }))))));
        }
    };
    ScomEditorImageToolbar = __decorate([
        (0, components_14.customElements)('i-scom-editor-image-toolbar')
    ], ScomEditorImageToolbar);
    exports.ScomEditorImageToolbar = ScomEditorImageToolbar;
});
define("@scom/scom-editor/components/formattingToolbar.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/global/index.ts", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/colorButton.tsx", "@scom/scom-editor/components/index.css.ts", "@scom/scom-editor/components/blockTypeButton.tsx", "@scom/scom-editor/components/linkButton.tsx"], function (require, exports, components_15, index_2, utils_9, colorButton_1, index_css_5, blockTypeButton_1, linkButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorFormattingToolbar = void 0;
    const Theme = components_15.Styles.Theme.ThemeVars;
    let ScomEditorFormattingToolbar = class ScomEditorFormattingToolbar extends components_15.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._oldBlock = {
                id: '',
                type: '',
                props: undefined,
                content: [],
                children: []
            };
            this._block = {
                id: '',
                type: '',
                props: undefined,
                content: [],
                children: []
            };
        }
        get editor() {
            return this._data.editor;
        }
        set editor(value) {
            this._data.editor = value;
        }
        setBlockType(editor, item) {
            const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
            editor.focus();
            for (const block of selectedBlocks) {
                editor.updateBlock(block, {
                    type: item.type,
                    props: item.props,
                });
            }
        }
        setAlignment(editor, textAlignment) {
            const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
            editor.focus();
            for (const block of selectedBlocks) {
                editor.updateBlock(block, {
                    props: { textAlignment }
                });
            }
        }
        setColor(editor, type, color) {
            editor.focus();
            const prop = type === 'text' ? 'textColor' : 'backgroundColor';
            color === "default"
                ? editor.removeStyles({ [prop]: color })
                : editor.addStyles({ [prop]: color });
        }
        setLink(editor, text, url) {
            editor.createLink(url, text || editor.getSelectedText());
            editor.focus();
        }
        getToolbarButtons(editor) {
            const iconProps = { width: '0.75rem', height: '0.75rem', fill: Theme.text.primary };
            const toolTipProps = { placement: 'bottom' };
            const customProps = {
                display: 'inline-flex',
                grid: { verticalAlignment: 'center' },
                height: '100%',
                minHeight: '1.875rem',
                padding: { top: '0px', bottom: '0px', left: '0.5rem', right: '0.5rem' }
            };
            return [
                {
                    icon: { ...iconProps, name: 'image' },
                    tooltip: { ...toolTipProps, content: `Replace Image` },
                    isSelected: false,
                    visible: this.isImageBlock,
                    onClick: () => {
                        (0, utils_9.getModalContainer)().appendChild(this.mdReplace);
                        this.mdReplace.position = 'fixed';
                        this.mdReplace.linkTo = this;
                        this.mdReplace.visible = true;
                    }
                },
                {
                    customControl: (element) => {
                        const currentBlock = this.editor.getTextCursorPosition().block;
                        let blockType = new blockTypeButton_1.ScomEditorBlockType(undefined, {
                            ...customProps,
                            block: this._block,
                            visible: !this.isMediaBlock && this._block.type !== 'table',
                            stack: { shrink: '0' },
                            onItemClicked: (item) => this.setBlockType(editor, item),
                            onValidate: (item) => {
                                return (item.type in editor.schema);
                            },
                            class: index_css_5.buttonHoverStyle
                        });
                        return blockType;
                    }
                },
                {
                    icon: { ...iconProps, name: 'bold' },
                    tooltip: { ...toolTipProps, content: `Bold <br/> ${(0, index_2.formatKeyboardShortcut)("Mod+B")}` },
                    isSelected: editor.getActiveStyles().bold,
                    visible: !this.isMediaBlock,
                    onClick: () => {
                        editor.toggleStyles({ bold: true });
                    }
                },
                {
                    icon: { ...iconProps, name: 'italic' },
                    visible: !this.isMediaBlock,
                    tooltip: { ...toolTipProps, content: `Italicize <br/> ${(0, index_2.formatKeyboardShortcut)("Mod+I")}` },
                    isSelected: editor.getActiveStyles().italic,
                    onClick: () => {
                        editor.toggleStyles({ italic: true });
                    }
                },
                {
                    icon: { ...iconProps, name: 'underline' },
                    visible: !this.isMediaBlock,
                    tooltip: { ...toolTipProps, content: `Underline <br/> ${(0, index_2.formatKeyboardShortcut)("Mod+U")}` },
                    isSelected: editor.getActiveStyles().underline,
                    onClick: () => {
                        editor.toggleStyles({ underline: true });
                    }
                },
                {
                    icon: { ...iconProps, name: 'strikethrough' },
                    visible: !this.isMediaBlock,
                    tooltip: { ...toolTipProps, content: `Strike-through <br/>  ${(0, index_2.formatKeyboardShortcut)("Mod+Shift+X")} or  ${(0, index_2.formatKeyboardShortcut)("Mod+Shift+Z")}` },
                    isSelected: editor.getActiveStyles().strikethrough,
                    onClick: () => {
                        editor.toggleStyles({ strikethrough: true });
                    }
                },
                {
                    icon: { ...iconProps, name: 'align-left' },
                    tooltip: { ...toolTipProps, content: 'Align Text Left' },
                    isSelected: this._block.props?.textAlignment === 'left',
                    onClick: () => {
                        this.setAlignment(editor, 'left');
                    }
                },
                {
                    icon: { ...iconProps, name: 'align-center' },
                    tooltip: { ...toolTipProps, content: 'Align Text Center' },
                    isSelected: this._block.props?.textAlignment === 'center',
                    onClick: () => {
                        this.setAlignment(editor, 'center');
                    }
                },
                {
                    icon: { ...iconProps, name: 'align-right' },
                    isSelected: this._block.props?.textAlignment === 'right',
                    tooltip: { ...toolTipProps, content: 'Align Text Right' },
                    onClick: () => {
                        this.setAlignment(editor, 'right');
                    }
                },
                {
                    customControl: (element) => {
                        let colorPicker = new colorButton_1.ScomEditorColor(undefined, {
                            ...customProps,
                            visible: !this.isMediaBlock,
                            textColor: editor.getActiveStyles().textColor || "default",
                            backgroundColor: editor.getActiveStyles().backgroundColor || "default",
                            setColor: (type, color) => this.setColor(editor, type, color),
                            class: index_css_5.buttonHoverStyle
                        });
                        return colorPicker;
                    }
                },
                {
                    icon: { ...iconProps, name: 'indent' },
                    tooltip: { ...toolTipProps, content: 'Indent' },
                    onClick: () => {
                    },
                    enabled: false
                },
                {
                    icon: { ...iconProps, name: 'outdent' },
                    tooltip: { ...toolTipProps, content: 'Outdent' },
                    onClick: () => {
                    },
                    enabled: false
                },
                {
                    customControl: (element) => {
                        let link = new linkButton_1.ScomEditorLink(undefined, {
                            ...customProps,
                            tooltip: { content: `Create Link <br />  ${(0, index_2.formatKeyboardShortcut)("Mod+K")}`, placement: 'bottom' },
                            editor: editor,
                            visible: !this.isMediaBlock && this._block.type !== 'table',
                            setLink: (text, url) => {
                                this.setLink(editor, text, url);
                            },
                            class: index_css_5.buttonHoverStyle
                        });
                        return link;
                    }
                }
            ];
        }
        get isMediaBlock() {
            const selectedBlocks = this.editor.getSelection()?.blocks || [this.editor.getTextCursorPosition().block];
            const show = selectedBlocks.length === 1 &&
                utils_9.MediaBlockTypes.includes(selectedBlocks[0].type);
            return show;
        }
        get isImageBlock() {
            const selectedBlocks = this.editor.getSelection()?.blocks || [this.editor.getTextCursorPosition().block];
            const show = selectedBlocks.length === 1 &&
                selectedBlocks[0].type === 'image';
            return show;
        }
        setData(value) {
            this._data = value;
            this.renderUI();
        }
        onRefresh() {
            this.updateBlock();
            if (this._oldBlock?.id !== this._block?.id) {
                this.renderList();
            }
        }
        renderUI() {
            this.updateBlock();
            this.renderList();
        }
        updateBlock() {
            this._oldBlock = { ...this._block };
            const block = this.editor.getTextCursorPosition().block;
            this._block = block;
            this.imgToolbar.setData({
                block: this._block,
                editor: this.editor
            });
        }
        renderList() {
            this.pnlFormatting.clearInnerHTML();
            let buttonList = this.getToolbarButtons(this.editor);
            for (let props of buttonList) {
                if (props.customControl) {
                    const elm = props.customControl(this.pnlFormatting);
                    this.pnlFormatting.appendChild(elm);
                }
                else {
                    const btn = (0, utils_9.createButton)(props, this.pnlFormatting);
                    this.pnlFormatting.appendChild(btn);
                }
            }
        }
        handleClose() {
            const container = (0, utils_9.getModalContainer)();
            if (container.contains(this.mdReplace))
                container.removeChild(this.mdReplace);
        }
        init() {
            super.init();
            const editor = this.getAttribute('editor', true);
            if (editor)
                this.setData({ editor });
            this.imgToolbar.onUpdated = () => {
                this.mdReplace.visible = false;
            };
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-hstack", { id: "pnlFormatting", width: '100%', verticalAlignment: 'center', gap: "0.125rem", overflow: 'hidden' }),
                this.$render("i-modal", { id: "mdReplace", popupPlacement: 'bottom', showBackdrop: false, width: 500, maxWidth: '100%', background: { color: Theme.background.main }, boxShadow: Theme.shadows[1], padding: { top: '0.125rem', bottom: '0.125rem', left: '0.125rem', right: '0.125rem' }, border: { radius: '0.375rem', width: '1px', style: 'solid', color: Theme.colors.secondary.light }, onClose: this.handleClose },
                    this.$render("i-scom-editor-image-toolbar", { id: "imgToolbar", overflow: 'hidden' }))));
        }
    };
    ScomEditorFormattingToolbar = __decorate([
        (0, components_15.customElements)('i-scom-editor-formatting-toolbar')
    ], ScomEditorFormattingToolbar);
    exports.ScomEditorFormattingToolbar = ScomEditorFormattingToolbar;
});
define("@scom/scom-editor/components/tableToolbar.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/toolbarDropdown.tsx", "@scom/scom-editor/components/index.css.ts"], function (require, exports, components_16, utils_10, toolbarDropdown_1, index_css_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorTableToolbar = void 0;
    const Theme = components_16.Styles.Theme.ThemeVars;
    let ScomEditorTableToolbar = class ScomEditorTableToolbar extends components_16.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._oldBlock = {
                id: '',
                type: '',
                props: undefined,
                content: [],
                children: []
            };
            this._block = {
                id: '',
                type: '',
                props: undefined,
                content: [],
                children: []
            };
        }
        get editor() {
            return this._data.editor;
        }
        set editor(value) {
            this._data.editor = value;
        }
        getToolbarButtons(editor) {
            const iconProps = { width: '0.75rem', height: '0.75rem', fill: Theme.text.primary };
            const toolTipProps = { placement: 'bottom' };
            const customProps = {
                display: 'inline-flex',
                grid: { verticalAlignment: 'center' },
                height: '100%',
                minHeight: '1.875rem',
                padding: { top: '0px', bottom: '0px', left: '0.5rem', right: '0.5rem' }
            };
            return [
                // {
                //   icon: {...iconProps, name: 'expand-alt'},
                //   tooltip: {...toolTipProps, content: `Fix table to page width`},
                //   onClick: () => {
                //     editor._tiptapEditor.chain().focus().fixTables().run();
                //   }
                // },
                {
                    customControl: () => {
                        let dropdown = new toolbarDropdown_1.ScomEditorToolbarDropdown(undefined, {
                            ...customProps,
                            caption: 'Options',
                            items: this.getDropdownItems(this.editor),
                            class: index_css_6.buttonHoverStyle
                        });
                        return dropdown;
                    }
                }
            ];
        }
        getDropdownItems(editor) {
            const items = [
                {
                    icon: { name: 'plus-circle' },
                    text: `Insert column before`,
                    isDisabled: !editor._tiptapEditor.can().addColumnBefore(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().addColumnBefore().run();
                    }
                },
                {
                    icon: { name: 'plus-circle' },
                    text: `Insert column after`,
                    isDisabled: !editor._tiptapEditor.can().addColumnAfter(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().addColumnAfter().run();
                    }
                },
                {
                    icon: { name: 'minus-circle' },
                    text: `Delete column`,
                    isDisabled: !editor._tiptapEditor.can().deleteColumn(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().deleteColumn().run();
                    }
                },
                {
                    icon: { name: 'plus-circle' },
                    text: `Insert row before`,
                    isDisabled: !editor._tiptapEditor.can().addRowBefore(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().addRowBefore().run();
                    }
                },
                {
                    icon: { name: 'plus-circle' },
                    text: `Insert row after`,
                    isDisabled: !editor._tiptapEditor.can().addRowBefore(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().addRowBefore().run();
                    }
                },
                {
                    icon: { name: 'times' },
                    text: `Delete row`,
                    isDisabled: !editor._tiptapEditor.can().deleteRow(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().deleteRow().run();
                    }
                },
                {
                    icon: { name: 'times' },
                    text: `Delete table`,
                    isDisabled: !editor._tiptapEditor.can().deleteTable(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().deleteTable().run();
                    }
                },
                {
                    icon: { name: 'object-ungroup' },
                    text: `Split cell`,
                    isDisabled: !editor._tiptapEditor.can().splitCell(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().splitCell().run();
                    }
                },
                {
                    icon: { name: 'columns' },
                    text: `Merge cells`,
                    isDisabled: !editor._tiptapEditor.can().mergeCells(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().mergeCells().run();
                    }
                },
                {
                    icon: { name: 'toggle-on' },
                    text: `Toggle header column`,
                    isDisabled: !editor._tiptapEditor.can().toggleHeaderColumn(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().toggleHeaderColumn().run();
                    }
                },
                {
                    icon: { name: 'toggle-on' },
                    text: `Toggle header row`,
                    isDisabled: !editor._tiptapEditor.can().toggleHeaderColumn(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().toggleHeaderColumn().run();
                    }
                },
                {
                    icon: { name: 'toggle-on' },
                    text: `Toggle header cells`,
                    isDisabled: !editor._tiptapEditor.can().toggleHeaderCell(),
                    onClick: () => {
                        editor._tiptapEditor.chain().focus().toggleHeaderCell().run();
                    }
                }
            ];
            return items;
        }
        setData(value) {
            this._data = value;
            this.renderUI();
        }
        onRefresh() {
            this.updateBlock();
            if (this._oldBlock?.id !== this._block?.id) {
                this.renderList();
            }
        }
        renderUI() {
            this.updateBlock();
            this.renderList();
        }
        updateBlock() {
            this._oldBlock = { ...this._block };
            const block = this.editor.getTextCursorPosition().block;
            this._block = block;
        }
        async renderList() {
            this.pnlTableToolbar.clearInnerHTML();
            let buttonList = this.getToolbarButtons(this.editor);
            for (let props of buttonList) {
                if (props.customControl) {
                    const elm = props.customControl();
                    this.pnlTableToolbar.appendChild(elm);
                }
                else {
                    const btn = (0, utils_10.createButton)(props, this.pnlTableToolbar);
                    this.pnlTableToolbar.appendChild(btn);
                }
            }
        }
        init() {
            super.init();
            const editor = this.getAttribute('editor', true);
            if (editor)
                this.setData({ editor });
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-hstack", { id: "pnlTableToolbar", width: '100%', verticalAlignment: 'center', gap: "0.125rem", overflow: 'hidden' })));
        }
    };
    ScomEditorTableToolbar = __decorate([
        (0, components_16.customElements)('i-scom-editor-table-toolbar')
    ], ScomEditorTableToolbar);
    exports.ScomEditorTableToolbar = ScomEditorTableToolbar;
});
define("@scom/scom-editor/components/chart.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorChart = void 0;
    var ModeType;
    (function (ModeType) {
        ModeType["LIVE"] = "Live";
        ModeType["SNAPSHOT"] = "Snapshot";
    })(ModeType || (ModeType = {}));
    const DefaultData = {
        name: 'scom-line-chart',
        dataSource: 'Dune',
        queryId: '',
        apiEndpoint: '',
        title: '',
        options: undefined,
        mode: ModeType.LIVE
    };
    let ScomEditorChart = class ScomEditorChart extends components_17.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = DefaultData;
            this.currentType = '';
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            await this.renderChart(this._data);
        }
        getChartElm() {
            return this.chartEl;
        }
        async renderChart(data) {
            const { name } = data;
            if (!this.chartEl || (this.chartEl && name !== this.currentType)) {
                this.chartEl = await components_17.application.createElement(name);
                this.currentType = name;
                this.chartWrapper.clearInnerHTML();
                this.chartWrapper.appendChild(this.chartEl);
            }
            await this.chartEl.setData(JSON.parse(JSON.stringify(data)));
        }
        getConfigurators() {
            return [
                {
                    name: 'Editor',
                    target: 'Editor',
                    getActions: () => {
                        return this.getActions(this.chartEl);
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this)
                }
            ];
        }
        async updateType(type) {
            if (this.currentType === type) {
                return this.getActions(this.chartEl);
            }
            else {
                const newData = { ...this._data, name: type };
                this.tempChart = await components_17.application.createElement(newData.name);
                try {
                    await this.tempChart.setData(JSON.parse(JSON.stringify(newData)));
                }
                catch { }
                return this.getActions(this.tempChart);
            }
        }
        getActions(chartEl) {
            if (chartEl?.getConfigurators) {
                const configs = chartEl.getConfigurators() || [];
                // TODO: update target Editor
                const configurator = configs.find((conf) => conf.target === 'Builders');
                const action = configurator?.getActions && configurator.getActions().find((action) => action.name === 'Data');
                return action ? [action] : [];
            }
            return [];
        }
        async init() {
            super.init();
            const data = this.getAttribute('data', true);
            if (data)
                await this.setData(data);
        }
        render() {
            return (this.$render("i-panel", { id: "chartWrapper" }));
        }
    };
    ScomEditorChart = __decorate([
        (0, components_17.customElements)('i-scom-editor-chart')
    ], ScomEditorChart);
    exports.ScomEditorChart = ScomEditorChart;
});
define("@scom/scom-editor/components/customBlock.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_18, utils_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorCustomBlock = void 0;
    let ScomEditorCustomBlock = class ScomEditorCustomBlock extends components_18.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                module: '',
                properties: undefined,
                block: {
                    id: '',
                    type: '',
                    props: undefined,
                    content: undefined,
                    children: []
                }
            };
            this.currentModule = '';
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            await this.renderUI(this._data);
        }
        async renderUI(data) {
            const { module, properties, block } = data;
            if (!this.blockEl || (this.blockEl && module !== this.currentModule)) {
                try {
                    this.blockEl = await components_18.application.createElement(module);
                }
                catch { }
                this.currentModule = module;
                this.blockWrapper.clearInnerHTML();
                this.blockWrapper.appendChild(this.blockEl);
            }
            const sideMenu = (0, utils_11.getToolbar)('sideMenu');
            switch (module) {
                case "scom-image":
                case "scom-video":
                case "scom-twitter-post":
                    if (sideMenu && !properties?.url)
                        sideMenu.openConfig(block, this);
                    break;
                case "scom-swap":
                    if (sideMenu && !properties?.providers?.length)
                        sideMenu.openConfig(block, this);
                    break;
            }
            await this.blockEl.setData(JSON.parse(JSON.stringify(properties)));
        }
        getActions() {
            if (this.blockEl?.getConfigurators) {
                const configs = this.blockEl.getConfigurators() || [];
                const configurator = configs.find((conf) => conf.target === 'Editor');
                if (configurator?.getActions)
                    return configurator.getActions();
            }
            return [];
        }
        async init() {
            super.init();
            const data = this.getAttribute('data', true);
            if (data)
                await this.setData(data);
        }
        render() {
            return (this.$render("i-panel", { id: "blockWrapper" }));
        }
    };
    ScomEditorCustomBlock = __decorate([
        (0, components_18.customElements)('i-scom-editor-custom-block')
    ], ScomEditorCustomBlock);
    exports.ScomEditorCustomBlock = ScomEditorCustomBlock;
});
define("@scom/scom-editor/components/index.ts", ["require", "exports", "@scom/scom-editor/components/colorButton.tsx", "@scom/scom-editor/components/toolbarDropdown.tsx", "@scom/scom-editor/components/blockTypeButton.tsx", "@scom/scom-editor/components/linkButton.tsx", "@scom/scom-editor/components/sideMenu.tsx", "@scom/scom-editor/components/slashMenu.tsx", "@scom/scom-editor/components/colorPicker.tsx", "@scom/scom-editor/components/formattingToolbar.tsx", "@scom/scom-editor/components/imageToolbar.tsx", "@scom/scom-editor/components/tableToolbar.tsx", "@scom/scom-editor/components/chart.tsx", "@scom/scom-editor/components/customBlock.tsx", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/index.css.ts"], function (require, exports, colorButton_2, toolbarDropdown_2, blockTypeButton_2, linkButton_2, sideMenu_1, slashMenu_1, colorPicker_1, formattingToolbar_1, imageToolbar_1, tableToolbar_1, chart_1, customBlock_1, utils_12, index_css_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customModalStyle = exports.buttonHoverStyle = exports.ScomEditorCustomBlock = exports.ScomEditorChart = exports.ScomEditorTableToolbar = exports.ScomEditorImageToolbar = exports.ScomEditorFormattingToolbar = exports.ScomEditorColorPicker = exports.ScomEditorSlashMenu = exports.ScomEditorSideMenu = exports.ScomEditorLink = exports.ScomEditorBlockType = exports.ScomEditorToolbarDropdown = exports.ScomEditorColor = void 0;
    Object.defineProperty(exports, "ScomEditorColor", { enumerable: true, get: function () { return colorButton_2.ScomEditorColor; } });
    Object.defineProperty(exports, "ScomEditorToolbarDropdown", { enumerable: true, get: function () { return toolbarDropdown_2.ScomEditorToolbarDropdown; } });
    Object.defineProperty(exports, "ScomEditorBlockType", { enumerable: true, get: function () { return blockTypeButton_2.ScomEditorBlockType; } });
    Object.defineProperty(exports, "ScomEditorLink", { enumerable: true, get: function () { return linkButton_2.ScomEditorLink; } });
    Object.defineProperty(exports, "ScomEditorSideMenu", { enumerable: true, get: function () { return sideMenu_1.ScomEditorSideMenu; } });
    Object.defineProperty(exports, "ScomEditorSlashMenu", { enumerable: true, get: function () { return slashMenu_1.ScomEditorSlashMenu; } });
    Object.defineProperty(exports, "ScomEditorColorPicker", { enumerable: true, get: function () { return colorPicker_1.ScomEditorColorPicker; } });
    Object.defineProperty(exports, "ScomEditorFormattingToolbar", { enumerable: true, get: function () { return formattingToolbar_1.ScomEditorFormattingToolbar; } });
    Object.defineProperty(exports, "ScomEditorImageToolbar", { enumerable: true, get: function () { return imageToolbar_1.ScomEditorImageToolbar; } });
    Object.defineProperty(exports, "ScomEditorTableToolbar", { enumerable: true, get: function () { return tableToolbar_1.ScomEditorTableToolbar; } });
    Object.defineProperty(exports, "ScomEditorChart", { enumerable: true, get: function () { return chart_1.ScomEditorChart; } });
    Object.defineProperty(exports, "ScomEditorCustomBlock", { enumerable: true, get: function () { return customBlock_1.ScomEditorCustomBlock; } });
    __exportStar(utils_12, exports);
    Object.defineProperty(exports, "buttonHoverStyle", { enumerable: true, get: function () { return index_css_7.buttonHoverStyle; } });
    Object.defineProperty(exports, "customModalStyle", { enumerable: true, get: function () { return index_css_7.customModalStyle; } });
});
define("@scom/scom-editor/blocks/addFormattingToolbar.ts", ["require", "exports", "@scom/scom-editor/components/index.ts"], function (require, exports, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addFormattingToolbar = void 0;
    const addFormattingToolbar = async (editor) => {
        let modal;
        let formattingToolbar;
        editor.formattingToolbar.onUpdate(async (formattingToolbarState) => {
            const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
            const block = selectedBlocks[0];
            const blockID = block?.id;
            if (!modal) {
                modal = await (0, index_3.createModal)({
                    popupPlacement: (0, index_3.getPlacement)(block),
                    overflow: 'hidden',
                    maxHeight: '2rem',
                    minWidth: 'max-content',
                    isChildFixed: true,
                    closeOnScrollChildFixed: false
                });
                modal.id = 'mdFormatting';
            }
            if (!(0, index_3.getModalContainer)().contains(modal))
                (0, index_3.getModalContainer)().appendChild(modal);
            if (formattingToolbar) {
                formattingToolbar.onRefresh();
            }
            else {
                formattingToolbar = await index_3.ScomEditorFormattingToolbar.create({
                    editor: editor
                });
                modal.item = formattingToolbar;
            }
            const isMediaBlock = selectedBlocks.length === 1 &&
                index_3.MediaBlockTypes.includes(selectedBlocks[0].type);
            modal.popupPlacement = isMediaBlock ? 'top' : (0, index_3.getPlacement)(block);
            if (formattingToolbarState.show) {
                if (blockID) {
                    const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                    if (blockEl) {
                        modal.linkTo = blockEl;
                        modal.position = 'fixed';
                        if (modal.visible)
                            modal.refresh();
                        else
                            modal.visible = true;
                    }
                }
                else {
                    modal.visible = false;
                }
            }
        });
    };
    exports.addFormattingToolbar = addFormattingToolbar;
});
define("@scom/scom-editor/blocks/addSideMenu.ts", ["require", "exports", "@scom/scom-editor/components/index.ts"], function (require, exports, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addSideMenu = void 0;
    const addSideMenu = (editor) => {
        let sideMenu;
        editor.sideMenu.onUpdate(async (sideMenuState) => {
            if (!sideMenu) {
                sideMenu = await index_4.ScomEditorSideMenu.create({
                    block: sideMenuState.block,
                    editor: editor,
                    position: 'absolute',
                    zIndex: 9999,
                    class: index_4.customModalStyle
                });
                (0, index_4.setToolbar)('sideMenu', sideMenu);
            }
            if (!(0, index_4.getModalContainer)().contains(sideMenu)) {
                (0, index_4.getModalContainer)().appendChild(sideMenu);
            }
            if (sideMenuState.show) {
                sideMenu.block = sideMenuState.block;
                sideMenu.opacity = editor.isFocused() ? 1 : 0;
                const blockEl = sideMenuState?.block?.id && editor.domElement.querySelector(`[data-id="${sideMenuState.block.id}"]`);
                // if (blockEl) {
                //   const { top, left } = blockEl.getBoundingClientRect();
                //   const menuHeight = sideMenu.offsetHeight || 20;
                //   const menuWidth = sideMenu.offsetWidth || 50;
                //   const extra = window.outerHeight - window.innerHeight
                //   sideMenu.style.top = `${top + blockEl.offsetHeight / 2 - menuHeight / 2}px`;
                //   sideMenu.style.left = `${left - menuWidth}px`;
                // } else {
                //   sideMenu.opacity = 0;
                // }
                if (blockEl) {
                    const menuHeight = sideMenu.offsetHeight || 20;
                    const menuWidth = sideMenu.offsetWidth || 50;
                    const { top: parentTop, left: parentLeft } = editor.domElement.getBoundingClientRect();
                    sideMenu.style.top = `${window.scrollY + parentTop + blockEl.offsetTop + blockEl.offsetHeight / 2 - menuHeight / 2}px`;
                    sideMenu.style.left = `${window.scrollX + parentLeft + blockEl.offsetLeft - menuWidth}px`;
                }
                else {
                    sideMenu.opacity = 0;
                }
            }
        });
    };
    exports.addSideMenu = addSideMenu;
});
define("@scom/scom-editor/blocks/addSlashMenu.ts", ["require", "exports", "@scom/scom-editor/components/index.ts"], function (require, exports, index_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addSlashMenu = void 0;
    const closeSideMenu = () => {
        const sideMenu = (0, index_5.getToolbar)('sideMenu');
        if (sideMenu)
            sideMenu.opacity = 0;
    };
    const openSideMenu = () => {
        const sideMenu = (0, index_5.getToolbar)('sideMenu');
        if (sideMenu)
            sideMenu.opacity = 1;
    };
    const addSlashMenu = (editor) => {
        let modal;
        let menuElm;
        async function updateItems(items, onClick, selected, referencePos) {
            const { bottom = 0 } = referencePos;
            const maxHeight = window.innerHeight - bottom - 32;
            if (menuElm) {
                menuElm.setData({
                    items: [...items],
                    selectedIndex: selected
                });
            }
            else {
                menuElm = await index_5.ScomEditorSlashMenu.create({
                    items: [...items],
                    selectedIndex: selected,
                    border: { radius: 'inherit' },
                    height: 'auto',
                    onItemClicked: (item) => onClick(item)
                });
                modal.item = menuElm;
            }
            menuElm.updateMaxHeight(maxHeight <= 200 ? 200 : maxHeight);
        }
        editor.slashMenu.onUpdate(async (slashMenuState) => {
            const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
            const block = selectedBlocks[0];
            const blockID = block?.id;
            if (!modal) {
                modal = await (0, index_5.createModal)({
                    popupPlacement: "rightTop",
                    padding: { left: 0, top: 0, right: 0, bottom: 0 },
                    border: { radius: 0, style: 'none' },
                    position: 'absolute',
                    // isChildFixed: true,
                    // closeOnScrollChildFixed: true,
                    zIndex: 9999,
                    onClose: closeSideMenu
                });
                (0, index_5.setToolbar)('slashMenu', modal);
            }
            if (!(0, index_5.getModalContainer)().contains(modal)) {
                (0, index_5.getModalContainer)().appendChild(modal);
            }
            if (slashMenuState.show) {
                updateItems(slashMenuState.filteredItems, editor.slashMenu.itemCallback, slashMenuState.keyboardHoveredItemIndex, slashMenuState.referencePos);
                const sideMenu = (0, index_5.getToolbar)('sideMenu');
                const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                const isTable = blockEl.closest('table');
                if (sideMenu) {
                    openSideMenu();
                    editor.sideMenu.freezeMenu();
                    modal.linkTo = sideMenu;
                    modal.popupPlacement = isTable ? 'topLeft' : 'rightTop';
                    // modal.position = 'fixed';
                    let innerMdX = 0;
                    let innerMdY = 0;
                    if (isTable) {
                        const { x: blockX, y: blockY, height: blockHeight } = blockEl.getBoundingClientRect();
                        const { x: sideMenuX, y: sideMenuY } = sideMenu.getBoundingClientRect();
                        innerMdX = blockX - sideMenuX;
                        innerMdY = blockY - sideMenuY - blockHeight;
                    }
                    const innerModal = modal.querySelector('.modal');
                    if (innerModal) {
                        innerModal.style.left = `${innerMdX}px`;
                        innerModal.style.top = `${innerMdY}px`;
                    }
                    if (modal.visible)
                        modal.refresh();
                    else
                        modal.visible = true;
                }
                else {
                    modal.visible = false;
                }
            }
        });
    };
    exports.addSlashMenu = addSlashMenu;
});
define("@scom/scom-editor/blocks/addHyperlinkToolbar.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.ts"], function (require, exports, components_19, index_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addHyperlinkToolbar = void 0;
    const Theme = components_19.Styles.Theme.ThemeVars;
    const getToolbarButtons = (editor, hyperlinkToolbarState, modal) => {
        const iconProps = { width: '0.75rem', height: '0.75rem', fill: Theme.text.primary };
        const toolTipProps = { placement: 'bottom' };
        return [
            {
                customControl: () => {
                    let link = new index_6.ScomEditorLink(undefined, {
                        display: 'inline-flex',
                        grid: { verticalAlignment: 'center' },
                        height: '100%',
                        minHeight: '1.875rem',
                        tooltip: { content: 'Edit', placement: 'bottom' },
                        text: hyperlinkToolbarState.text,
                        url: hyperlinkToolbarState.url,
                        caption: 'Edit Link',
                        setLink: (text, url) => {
                            editor.hyperlinkToolbar.editHyperlink(url, text || editor.getSelectedText());
                            modal.visible = false;
                        },
                        class: index_6.buttonHoverStyle
                    });
                    return link;
                }
            },
            {
                icon: { ...iconProps, name: 'external-link-alt' },
                tooltip: { ...toolTipProps, content: 'Open in new tab' },
                onClick: () => {
                    window.open(`${editor.getSelectedLinkUrl()}`);
                }
            },
            {
                icon: { ...iconProps, name: 'unlink' },
                tooltip: { ...toolTipProps, content: 'Remove link' },
                onClick: () => {
                    editor.hyperlinkToolbar.deleteHyperlink();
                    modal.visible = false;
                }
            }
        ];
    };
    const addHyperlinkToolbar = async (editor) => {
        let modal;
        let element;
        let buttonList = [];
        editor.hyperlinkToolbar.onUpdate(async (hyperlinkToolbarState) => {
            const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
            const block = selectedBlocks[0];
            const blockID = block?.id;
            if (!modal) {
                modal = await (0, index_6.createModal)({
                    popupPlacement: 'top',
                    minWidth: 0,
                    zIndex: 2000
                });
                modal.id = 'mdHyperlink';
            }
            if (!(0, index_6.getModalContainer)().contains(modal))
                (0, index_6.getModalContainer)().appendChild(modal);
            if (!element) {
                element = await components_19.Panel.create({ minWidth: 'max-content' });
                buttonList = getToolbarButtons(editor, hyperlinkToolbarState, modal);
                for (let props of buttonList) {
                    if (props.customControl) {
                        const elm = props.customControl(element);
                        element.appendChild(elm);
                    }
                    else {
                        const btn = (0, index_6.createButton)(props, element);
                        element.appendChild(btn);
                    }
                }
                modal.item = element;
            }
            if (hyperlinkToolbarState.show) {
                if (blockID) {
                    const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                    if (blockEl)
                        modal.linkTo = blockEl;
                    modal.position = 'fixed';
                    if (modal.visible)
                        modal.refresh();
                    else
                        modal.visible = true;
                }
                else {
                    modal.visible = false;
                }
            }
        });
    };
    exports.addHyperlinkToolbar = addHyperlinkToolbar;
});
define("@scom/scom-editor/blocks/utils.ts", ["require", "exports", "@scom/scom-editor/global/index.ts"], function (require, exports, index_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseUrl = exports.execCustomBLock = void 0;
    const execCustomBLock = (editor, block) => {
        const currentBlock = editor.getTextCursorPosition().block;
        if (Array.isArray(currentBlock.content) &&
            ((currentBlock.content.length === 1 &&
                currentBlock.content[0].type === "text" &&
                (currentBlock.content[0].text === "/" || !currentBlock.content[0].text)) ||
                currentBlock.content.length === 0)) {
            editor.updateBlock(currentBlock, block);
        }
        else {
            editor.insertBlocks([block], currentBlock, "after");
        }
        editor.setTextCursorPosition(editor.getTextCursorPosition().nextBlock, "end");
    };
    exports.execCustomBLock = execCustomBLock;
    function parseUrl(href) {
        const WIDGET_LOADER_URL = 'https://ipfs.scom.dev/ipfs/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4';
        if (href.startsWith(WIDGET_LOADER_URL)) {
            const [_, params = ''] = href.split('?');
            const dataStr = params.replace('data=', '');
            return dataStr ? (0, index_7.parseStringToObject)(dataStr) : null;
        }
        return null;
    }
    exports.parseUrl = parseUrl;
});
define("@scom/scom-editor/blocks/addVideoBlock.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.ts", "@scom/scom-editor/blocks/utils.ts"], function (require, exports, components_20, index_8, utils_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addVideoBlock = void 0;
    const addVideoBlock = (blocknote) => {
        const VideoBlock = blocknote.createBlockSpec({
            type: "video",
            propSchema: {
                ...blocknote.defaultProps,
                url: { default: '' },
                width: { default: 512 },
                height: { default: 'auto' }
            },
            containsInlineContent: false,
            render: (block, editor) => {
                const wrapper = new components_20.Panel();
                const { url } = JSON.parse(JSON.stringify(block.props));
                const data = {
                    module: 'scom-video',
                    properties: { url },
                    block: { ...block }
                };
                const customElm = new index_8.ScomEditorCustomBlock(wrapper, { data });
                wrapper.appendChild(customElm);
                return {
                    dom: wrapper
                };
            },
            parse: () => {
                return [
                    {
                        tag: "div[data-content-type=video]",
                        node: 'video'
                    },
                    {
                        tag: "a",
                        getAttrs: (element2) => {
                            if (typeof element2 === "string") {
                                return false;
                            }
                            if (element2.getAttribute('href')) {
                                const href = element2.getAttribute('href');
                                const videoUrlRegex = /https:\/\/\S+\.(mp4|webm)/g;
                                const youtubeUrlRegex = /https:\/\/(?:www\.|m\.)(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/g;
                                if (videoUrlRegex.test(href) || youtubeUrlRegex.test(href)) {
                                    return {
                                        url: href
                                    };
                                }
                            }
                            return false;
                        },
                        priority: 400,
                        node: 'video'
                    },
                    {
                        tag: "p",
                        getAttrs: (element2) => {
                            if (typeof element2 === "string") {
                                return false;
                            }
                            const child = element2.firstChild;
                            if (!child) {
                                return false;
                            }
                            if (child.getAttribute('href')) {
                                const href = child.getAttribute('href');
                                const videoUrlRegex = /https:\/\/\S+\.(mp4|webm)/g;
                                const youtubeUrlRegex = /https:\/\/(?:www\.|m\.)(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/g;
                                if (videoUrlRegex.test(href) || youtubeUrlRegex.test(href)) {
                                    return {
                                        url: href
                                    };
                                }
                            }
                            return false;
                        },
                        priority: 410,
                        node: 'video'
                    },
                ];
            },
            renderInnerHTML: (attrs) => {
                const link = document.createElement("a");
                const url = attrs.url || "";
                link.setAttribute("href", url);
                link.textContent = 'video';
                return link;
            },
            pasteRules: [
                {
                    find: /https:\/\/(?:www\.|m\.)(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/g,
                    handler(props) {
                        const { state, chain, range } = props;
                        const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
                        chain().BNUpdateBlock(state.selection.from, {
                            type: "video",
                            props: {
                                url: textContent
                            },
                        }).setTextSelection(range.from + 1);
                    }
                }
            ]
        });
        const VideoSlashItem = {
            name: "Video",
            execute: (editor) => {
                const block = { type: "video", props: { url: "" } };
                (0, utils_13.execCustomBLock)(editor, block);
            },
            aliases: ["video", "media"]
        };
        return {
            VideoBlock,
            VideoSlashItem
        };
    };
    exports.addVideoBlock = addVideoBlock;
});
define("@scom/scom-editor/blocks/addImageBlock.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.ts", "@scom/scom-editor/blocks/utils.ts"], function (require, exports, components_21, index_9, utils_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addImageBlock = void 0;
    function addImageBlock(blocknote) {
        const ImageBlock = blocknote.createBlockSpec({
            type: "imageWidget",
            propSchema: {
                ...blocknote.defaultProps,
                url: { default: '' },
                cid: { default: '' },
                link: { default: '' },
                altText: { default: '', },
                keyword: { default: '' },
                photoId: { default: '' },
                width: { default: 512 },
                height: { default: 'auto' }
            },
            containsInlineContent: false,
            render: (block, editor) => {
                const wrapper = new components_21.Panel();
                const { url, cid, link, altText, keyword, photoId, backgroundColor } = JSON.parse(JSON.stringify(block.props));
                const data = {
                    module: 'scom-image',
                    properties: { url, cid, link, altText, keyword, photoId, backgroundColor },
                    block: { ...block }
                };
                const customElm = new index_9.ScomEditorCustomBlock(wrapper, { data });
                wrapper.appendChild(customElm);
                return {
                    dom: wrapper
                };
            },
            parse: () => {
                return [
                    {
                        tag: "div[data-content-type=imageWidget]",
                        node: 'imageWidget'
                    },
                    {
                        tag: "p",
                        getAttrs: (element2) => {
                            if (typeof element2 === "string") {
                                return false;
                            }
                            const child = element2.firstChild;
                            if (!child) {
                                return false;
                            }
                            if (child.nodeName === 'IMG') {
                                return {
                                    url: child.getAttribute('src'),
                                    altText: child.getAttribute('alt')
                                };
                            }
                            return false;
                        },
                        priority: 400,
                        node: 'imageWidget'
                    },
                    {
                        tag: "img",
                        getAttrs: (element2) => {
                            if (typeof element2 === "string") {
                                return false;
                            }
                            if (element2.nodeName === 'IMG') {
                                return {
                                    url: element2.getAttribute('src'),
                                    altText: element2.getAttribute('alt')
                                };
                            }
                            return false;
                        },
                        node: 'imageWidget'
                    }
                ];
            },
            // For render node to DOM (serializer.serializeNode(node))
            renderInnerHTML: (attrs) => {
                const imageTag = document.createElement("img");
                const src = attrs.url || "";
                const alt = attrs.altText || "";
                imageTag.setAttribute("src", src);
                imageTag.setAttribute("alt", alt);
                return imageTag;
            },
            pasteRules: [
                {
                    find: /https:\/\/\S+\.(jpg|jpeg|png|gif|webp|svg)/g,
                    handler(props) {
                        const { state, chain, range } = props;
                        const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
                        chain().BNUpdateBlock(state.selection.from, {
                            type: "imageWidget",
                            props: {
                                url: textContent
                            },
                        }).setTextSelection(range.from + 1);
                    }
                },
            ]
        });
        const ImageSlashItem = {
            name: "Image Widget",
            execute: (editor) => {
                const block = { type: "imageWidget", props: { url: "" } };
                (0, utils_14.execCustomBLock)(editor, block);
            },
            aliases: ["image", "media"]
        };
        return {
            ImageBlock,
            ImageSlashItem
        };
    }
    exports.addImageBlock = addImageBlock;
    ;
});
define("@scom/scom-editor/blocks/addTableToolbar.ts", ["require", "exports", "@scom/scom-editor/components/index.ts"], function (require, exports, index_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addTableToolbar = void 0;
    const addTableToolbar = async (editor) => {
        let modal;
        let tableToolbar;
        editor.tableToolbar.onUpdate(async (tableToolbarState) => {
            const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
            const block = selectedBlocks[0];
            const blockID = block?.id;
            if (!modal) {
                modal = await (0, index_10.createModal)({
                    popupPlacement: 'top',
                    overflow: 'hidden',
                    maxHeight: '2rem'
                });
                (0, index_10.setToolbar)('table', modal);
            }
            if (!(0, index_10.getModalContainer)().contains(modal)) {
                (0, index_10.getModalContainer)().appendChild(modal);
            }
            if (tableToolbar) {
                tableToolbar.onRefresh();
            }
            else {
                tableToolbar = await index_10.ScomEditorTableToolbar.create({
                    editor: editor
                });
                modal.item = tableToolbar;
            }
            if (tableToolbarState.show) {
                const blockEl = blockID && editor.domElement.querySelector(`[data-id="${blockID}"]`);
                if (blockEl) {
                    modal.linkTo = blockEl;
                    modal.position = 'fixed';
                    if (!modal.visible)
                        modal.visible = true;
                }
                else {
                    modal.visible = false;
                }
            }
        });
    };
    exports.addTableToolbar = addTableToolbar;
});
define("@scom/scom-editor/blocks/addChartBlock.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.ts", "@scom/scom-editor/blocks/utils.ts"], function (require, exports, components_22, index_11, utils_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addChartBlock = void 0;
    function getData(href) {
        const widgetData = (0, utils_15.parseUrl)(href);
        if (widgetData) {
            const { module, properties } = widgetData;
            if (module.path !== 'scom-swap')
                return { ...properties };
        }
        return false;
    }
    const addChartBlock = (blocknote) => {
        const ChartBlock = blocknote.createBlockSpec({
            type: "chart",
            propSchema: {
                ...blocknote.defaultProps,
                name: { default: 'scom-line-chart', values: [...index_11.ChartTypes] },
                apiEndpoint: { default: '' },
                dataSource: { default: 'Dune', values: ['Dune', 'Custom'] },
                queryId: { default: '' },
                title: { default: '' },
                options: { default: undefined },
                mode: { default: 'Live', values: ['Live', 'Snapshot'] },
                width: { default: '100%' },
                height: { default: 'auto' }
            },
            containsInlineContent: false,
            render: (block, editor) => {
                const wrapper = new components_22.Panel();
                const data = JSON.parse(JSON.stringify(block.props));
                const chart = new index_11.ScomEditorChart(wrapper, { data });
                wrapper.appendChild(chart);
                return {
                    dom: wrapper
                };
            },
            parse: () => {
                return [
                    {
                        tag: "div[data-content-type=chart]",
                        node: 'chart'
                    },
                    {
                        tag: "a",
                        getAttrs: (element2) => {
                            if (typeof element2 === "string") {
                                return false;
                            }
                            if (element2.getAttribute('href')) {
                                const href = element2.getAttribute('href');
                                return getData(href);
                            }
                            return false;
                        },
                        priority: 404,
                        node: 'chart'
                    },
                    {
                        tag: "p",
                        getAttrs: (element2) => {
                            if (typeof element2 === "string") {
                                return false;
                            }
                            const child = element2.firstChild;
                            if (!child) {
                                return false;
                            }
                            if (child.nodeName === 'A' && child.getAttribute('href')) {
                                const href = child.getAttribute('href');
                                return getData(href);
                            }
                            return false;
                        },
                        priority: 405,
                        node: 'chart'
                    },
                ];
            },
            renderInnerHTML: (attrs) => {
                const link = document.createElement("a");
                const url = (0, index_11.getWidgetEmbedUrl)({
                    type: 'chart',
                    props: { ...(attrs || {}) }
                });
                link.setAttribute("href", url);
                link.textContent = 'chart';
                return link;
            }
        });
        const ChartSlashItem = {
            name: "Chart",
            execute: (editor) => {
                const block = {
                    type: "chart",
                    props: {
                        name: 'scom-area-chart',
                        "dataSource": "Dune",
                        "queryId": "2030745",
                        title: 'ETH Staked - Cumulative',
                        options: {
                            xColumn: {
                                key: 'date',
                                type: 'time'
                            },
                            yColumns: [
                                'total_eth',
                            ],
                            stacking: true,
                            groupBy: 'depositor_entity_category',
                            seriesOptions: [
                                {
                                    key: 'CEX',
                                    color: '#d52828'
                                },
                                {
                                    key: 'Liquid Staking',
                                    color: '#d2da25'
                                },
                                {
                                    key: 'Others',
                                    color: '#000000'
                                },
                                {
                                    key: 'Staking Pools',
                                    color: '#49a34f'
                                },
                                {
                                    key: 'Unidentified',
                                    color: '#bcb8b8'
                                }
                            ],
                            xAxis: {
                                title: 'Date',
                                tickFormat: 'MMM YYYY'
                            },
                            yAxis: {
                                title: 'ETH deposited',
                                labelFormat: '0,000.00ma',
                                position: 'left'
                            }
                        }
                    }
                };
                (0, utils_15.execCustomBLock)(editor, block);
            },
            aliases: ["chart", "widget"]
        };
        return {
            ChartBlock,
            ChartSlashItem
        };
    };
    exports.addChartBlock = addChartBlock;
});
define("@scom/scom-editor/blocks/addTweetBlock.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.ts", "@scom/scom-editor/blocks/utils.ts"], function (require, exports, components_23, index_12, utils_16) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addTweetBlock = void 0;
    const addTweetBlock = (blocknote) => {
        const TweetBlock = blocknote.createBlockSpec({
            type: "tweet",
            propSchema: {
                ...blocknote.defaultProps,
                url: { default: '' },
                width: { default: 512 },
                height: { default: 'auto' }
            },
            containsInlineContent: false,
            render: (block, editor) => {
                const wrapper = new components_23.Panel();
                const { url } = JSON.parse(JSON.stringify(block.props));
                const data = {
                    module: 'scom-twitter-post',
                    properties: { url },
                    block: { ...block }
                };
                const customElm = new index_12.ScomEditorCustomBlock(wrapper, { data });
                wrapper.appendChild(customElm);
                return {
                    dom: wrapper
                };
            },
            parse: () => {
                return [
                    {
                        tag: "div[data-content-type=tweet]",
                        node: 'tweet'
                    },
                    {
                        tag: "a",
                        getAttrs: (element2) => {
                            if (typeof element2 === "string") {
                                return false;
                            }
                            if (element2.getAttribute('href')) {
                                const href = element2.getAttribute('href');
                                const regex = /https:\/\/(twitter.com)\/\w*\/status\/(\d{19}$)/gm;
                                if (regex.test(href)) {
                                    return {
                                        url: href
                                    };
                                }
                            }
                            return false;
                        },
                        priority: 406,
                        node: 'tweet'
                    }
                ];
            },
            renderInnerHTML: (attrs) => {
                const link = document.createElement("a");
                const url = attrs.url || "";
                link.setAttribute("href", url);
                link.textContent = 'tweet';
                return link;
            },
            pasteRules: [
                {
                    find: /https:\/\/(twitter.com)\/\w*\/status\/(\d{19}$)/gm,
                    handler(props) {
                        const { state, chain, range } = props;
                        const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
                        chain().BNUpdateBlock(state.selection.from, {
                            type: "tweet",
                            props: {
                                url: textContent
                            },
                        }).setTextSelection(range.from + 1);
                    }
                }
            ]
        });
        const TweetSlashItem = {
            name: "Tweet",
            execute: (editor) => {
                const block = { type: "tweet", props: { url: "" } };
                (0, utils_16.execCustomBLock)(editor, block);
            },
            aliases: ["tweet", "widget"]
        };
        return {
            TweetBlock,
            TweetSlashItem
        };
    };
    exports.addTweetBlock = addTweetBlock;
});
define("@scom/scom-editor/blocks/index.ts", ["require", "exports", "@scom/scom-editor/blocks/addFormattingToolbar.ts", "@scom/scom-editor/blocks/addSideMenu.ts", "@scom/scom-editor/blocks/addSlashMenu.ts", "@scom/scom-editor/blocks/addHyperlinkToolbar.ts", "@scom/scom-editor/blocks/addVideoBlock.ts", "@scom/scom-editor/blocks/addImageBlock.ts", "@scom/scom-editor/blocks/addTableToolbar.ts", "@scom/scom-editor/blocks/addChartBlock.ts", "@scom/scom-editor/blocks/addTweetBlock.ts"], function (require, exports, addFormattingToolbar_1, addSideMenu_1, addSlashMenu_1, addHyperlinkToolbar_1, addVideoBlock_1, addImageBlock_1, addTableToolbar_1, addChartBlock_1, addTweetBlock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addTweetBlock = exports.addChartBlock = exports.addTableToolbar = exports.addImageBlock = exports.addVideoBlock = exports.addHyperlinkToolbar = exports.addSlashMenu = exports.addSideMenu = exports.addFormattingToolbar = void 0;
    Object.defineProperty(exports, "addFormattingToolbar", { enumerable: true, get: function () { return addFormattingToolbar_1.addFormattingToolbar; } });
    Object.defineProperty(exports, "addSideMenu", { enumerable: true, get: function () { return addSideMenu_1.addSideMenu; } });
    Object.defineProperty(exports, "addSlashMenu", { enumerable: true, get: function () { return addSlashMenu_1.addSlashMenu; } });
    Object.defineProperty(exports, "addHyperlinkToolbar", { enumerable: true, get: function () { return addHyperlinkToolbar_1.addHyperlinkToolbar; } });
    Object.defineProperty(exports, "addVideoBlock", { enumerable: true, get: function () { return addVideoBlock_1.addVideoBlock; } });
    Object.defineProperty(exports, "addImageBlock", { enumerable: true, get: function () { return addImageBlock_1.addImageBlock; } });
    Object.defineProperty(exports, "addTableToolbar", { enumerable: true, get: function () { return addTableToolbar_1.addTableToolbar; } });
    Object.defineProperty(exports, "addChartBlock", { enumerable: true, get: function () { return addChartBlock_1.addChartBlock; } });
    Object.defineProperty(exports, "addTweetBlock", { enumerable: true, get: function () { return addTweetBlock_1.addTweetBlock; } });
});
define("@scom/scom-editor/blocks/addSwapBlock.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.ts", "@scom/scom-editor/blocks/utils.ts"], function (require, exports, components_24, index_13, utils_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addSwapBlock = void 0;
    function getData(href) {
        const widgetData = (0, utils_17.parseUrl)(href);
        if (widgetData) {
            const { module, properties } = widgetData;
            if (module.path === 'scom-swap')
                return { ...properties };
        }
        return false;
    }
    const addSwapBlock = (blocknote) => {
        const SwapBlock = blocknote.createBlockSpec({
            type: "swap",
            propSchema: {
                ...blocknote.defaultProps,
                category: { default: 'fixed-pair', values: ['fixed-pair', 'fixed-protocal', 'aggregator', 'cross-chain-swap'] },
                providers: { default: [] },
                tokens: { default: [] },
                defaultChainId: { default: 0 },
                networks: { default: [] },
                logo: { default: '' },
                title: { default: '' },
                campaignId: { default: null },
                wallets: { default: [] },
                commissions: { default: [] },
                defaultInputValue: { default: '' },
                defaultOutputValue: { default: '' },
                defaultInputToken: { default: null },
                defaultOutputToken: { default: null },
                apiEndpoints: { default: null }
            },
            containsInlineContent: false,
            render: (block, editor) => {
                const wrapper = new components_24.Panel();
                const props = JSON.parse(JSON.stringify(block.props));
                const data = {
                    module: 'scom-swap',
                    properties: { ...props },
                    block: { ...block }
                };
                const customElm = new index_13.ScomEditorCustomBlock(wrapper, { data });
                wrapper.appendChild(customElm);
                return {
                    dom: wrapper
                };
            },
            parse: () => {
                return [
                    {
                        tag: "div[data-content-type=swap]",
                        node: 'swap'
                    },
                    {
                        tag: "a",
                        getAttrs: (element2) => {
                            if (typeof element2 === "string") {
                                return false;
                            }
                            if (element2.getAttribute('href')) {
                                const href = element2.getAttribute('href');
                                return getData(href);
                            }
                            return false;
                        },
                        priority: 402,
                        node: 'swap'
                    },
                    {
                        tag: "p",
                        getAttrs: (element2) => {
                            if (typeof element2 === "string") {
                                return false;
                            }
                            const child = element2.firstChild;
                            if (!child) {
                                return false;
                            }
                            if (child.nodeName === 'A' && child.getAttribute('href')) {
                                const href = child.getAttribute('href');
                                return getData(href);
                            }
                            return false;
                        },
                        priority: 403,
                        node: 'swap'
                    },
                ];
            },
            renderInnerHTML: (attrs) => {
                const link = document.createElement("a");
                const url = (0, index_13.getWidgetEmbedUrl)({
                    type: 'swap',
                    props: { ...(attrs || {}) }
                });
                link.setAttribute("href", url);
                link.textContent = 'swap';
                return link;
            },
            pasteRules: [
                {
                    find: /https:\/\/ipfs\.scom\.dev\/ipfs\/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4\?data\=.*/g,
                    handler(props) {
                        const { state, chain, range } = props;
                        const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
                        const widgetData = (0, utils_17.parseUrl)(textContent);
                        if (!widgetData)
                            return null;
                        const { module, properties } = widgetData;
                        const type = module.path === 'scom-swap' ? 'swap' : 'chart';
                        chain().BNUpdateBlock(state.selection.from, {
                            type,
                            props: {
                                ...properties
                            },
                        }).setTextSelection(range.from + 1);
                    }
                }
            ]
        });
        const SwapSlashItem = {
            name: "Swap",
            execute: (editor) => {
                const block = {
                    type: "swap",
                    props: {
                        "providers": [
                            {
                                "key": "OpenSwap",
                                "chainId": 97
                            },
                            {
                                "key": "OpenSwap",
                                "chainId": 43113
                            }
                        ],
                        "category": "fixed-pair",
                        "tokens": [
                            {
                                "address": "0x29386B60e0A9A1a30e1488ADA47256577ca2C385",
                                "chainId": 97
                            },
                            {
                                "address": "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
                                "chainId": 97
                            },
                            {
                                "address": "0xb9C31Ea1D475c25E58a1bE1a46221db55E5A7C6e",
                                "chainId": 43113
                            },
                            {
                                "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
                                "chainId": 43113
                            }
                        ],
                        "defaultChainId": 43113,
                        "networks": [
                            {
                                "chainId": 43113
                            },
                            {
                                "chainId": 97
                            }
                        ],
                        "wallets": [
                            {
                                "name": "metamask"
                            }
                        ],
                        "showHeader": true,
                        "showFooter": true
                    }
                };
                (0, utils_17.execCustomBLock)(editor, block);
            },
            aliases: ["swap", "widget"]
        };
        return {
            SwapBlock,
            SwapSlashItem
        };
    };
    exports.addSwapBlock = addSwapBlock;
});
define("@scom/scom-editor/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_25) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customEditorStyle = void 0;
    const Theme = components_25.Styles.Theme.ThemeVars;
    exports.customEditorStyle = components_25.Styles.style({
        $nest: {
            '.tableWrapper': {
                maxWidth: '100%',
                overflowX: 'auto',
                padding: '1rem 0',
                $nest: {
                    '&::-webkit-scrollbar': {
                        width: 7,
                        height: 7
                    },
                    '&::-webkit-scrollbar-track': {
                        borderRadius: '10px',
                        border: '1px solid transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: Theme.colors.primary.main,
                        borderRadius: '10px',
                        outline: '1px solid transparent'
                    }
                }
            },
            'table': {
                borderCollapse: "collapse",
                overflow: 'hidden',
                tableLayout: 'fixed',
                width: '100%'
            },
            'td, th': {
                border: `1px solid ${Theme.divider}`,
                boxSizing: 'border-box',
                minWidth: '1rem',
                padding: '0.25rem 0.5rem',
                verticalAlign: 'top',
                position: 'relative'
            },
            'th': {
                fontWeight: 600,
                textAlign: 'left',
                background: Theme.background.default
            },
            '.selectedCell:after': {
                zIndex: 2,
                position: 'absolute',
                content: "''",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                background: Theme.action.selectedBackground,
                pointerEvents: 'none'
            },
            '.column-resize-handle': {
                position: 'absolute',
                right: -1,
                top: 0,
                bottom: -1,
                width: 2,
                backgroundColor: Theme.colors.primary.light,
                cursor: 'col-resize'
            },
            '.resize-cursor': {
                cursor: 'col-resize'
            }
        }
    });
});
define("@scom/scom-editor", ["require", "exports", "@ijstech/components", "@scom/scom-editor/blocks/index.ts", "@scom/scom-editor/components/index.ts", "@scom/scom-editor/blocks/addSwapBlock.ts", "@scom/scom-editor/index.css.ts"], function (require, exports, components_26, index_14, index_15, addSwapBlock_1, index_css_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditor = void 0;
    const Theme = components_26.Styles.Theme.ThemeVars;
    const path = components_26.application.currentModuleDir;
    components_26.RequireJS.config({
        paths: {
            'blocknote': `${path}/lib/@blocknote/blocknote.bundled.umd.js`
        }
    });
    const libPlugins = [
        'blocknote'
    ];
    const cssPath = `${path}/lib/@blocknote/style.css`;
    let ScomEditor = class ScomEditor extends components_26.Module {
        constructor(parent, options) {
            super(parent, options);
            this.tag = {};
        }
        get value() {
            return this._data.value ?? '';
        }
        set value(data) {
            this._data.value = data ?? '';
        }
        getEditor() {
            return this._editor;
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        async initEditor() {
            if (this._editor)
                return;
            try {
                this.addCSS(cssPath, 'blocknote');
                this._blocknoteObj = await this.loadPlugin();
                this.renderEditor();
            }
            catch { }
        }
        async renderEditor(initialContent) {
            if (!this._blocknoteObj)
                return;
            this.pnlEditor.clearInnerHTML();
            (0, index_15.removeContainer)();
            const { VideoSlashItem, VideoBlock } = (0, index_14.addVideoBlock)(this._blocknoteObj);
            const { ImageSlashItem, ImageBlock } = (0, index_14.addImageBlock)(this._blocknoteObj);
            const { SwapSlashItem, SwapBlock } = (0, addSwapBlock_1.addSwapBlock)(this._blocknoteObj);
            const { ChartSlashItem, ChartBlock } = (0, index_14.addChartBlock)(this._blocknoteObj);
            const { TweetBlock, TweetSlashItem } = (0, index_14.addTweetBlock)(this._blocknoteObj);
            const customSchema = {
                ...this._blocknoteObj.defaultBlockSchema,
                video: VideoBlock,
                imageWidget: ImageBlock,
                swap: SwapBlock,
                chart: ChartBlock,
                tweet: TweetBlock
            };
            const editorConfig = {
                parentElement: this.pnlEditor,
                blockSchema: customSchema,
                slashMenuItems: [
                    ...this._blocknoteObj.getDefaultSlashMenuItems().filter((item) => item.name !== 'Image'),
                    VideoSlashItem,
                    ImageSlashItem,
                    SwapSlashItem,
                    ChartSlashItem,
                    TweetSlashItem
                ],
                onEditorContentChange: (editor) => {
                    if (this.timer)
                        clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.onEditorChanged(editor);
                    }, 500);
                },
                domAttributes: {
                    editor: {
                        class: index_css_8.customEditorStyle,
                    },
                },
            };
            if (initialContent)
                editorConfig.initialContent = initialContent;
            this._editor = new this._blocknoteObj.BlockNoteEditor(editorConfig);
            (0, index_14.addSideMenu)(this._editor);
            (0, index_14.addFormattingToolbar)(this._editor);
            (0, index_14.addSlashMenu)(this._editor);
            (0, index_14.addHyperlinkToolbar)(this._editor);
            (0, index_14.addTableToolbar)(this._editor);
            this._editor.domElement.addEventListener('focus', () => {
                // this._editor.sideMenu.unfreezeMenu();
                const sideMenu = (0, index_15.getToolbar)('sideMenu');
                if (sideMenu)
                    sideMenu.opacity = 1;
            });
            this._editor.domElement.addEventListener("blur", (event) => {
                // this._editor.sideMenu.freezeMenu();
                const sideMenus = (0, index_15.getModalContainer)().querySelectorAll('i-scom-editor-side-menu');
                for (let menu of sideMenus) {
                    menu.opacity = 0;
                }
            });
        }
        async onEditorChanged(editor) {
            let value = '';
            const blocks = editor.topLevelBlocks;
            blocks.pop();
            value = await editor.blocksToMarkdown(blocks);
            this.value = value;
            console.log(JSON.stringify({ value: this.value }));
            if (this.onChanged)
                this.onChanged(this.value);
            const sideMenu = (0, index_15.getToolbar)('sideMenu');
            if (sideMenu)
                sideMenu.opacity = 0;
        }
        addCSS(href, name) {
            const css = document.head.querySelector(`[name="${name}"]`);
            if (css)
                return;
            let link = document.createElement('link');
            link.setAttribute('type', 'text/css');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('charset', 'utf-8');
            link.setAttribute('name', name);
            link.href = href;
            document.head.append(link);
        }
        loadPlugin() {
            return new Promise((resolve, reject) => {
                components_26.RequireJS.require(libPlugins, (blocknote) => {
                    resolve(blocknote);
                });
            });
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            if (!this._editor)
                await this.initEditor();
            if (data.value) {
                const blocks = await this._editor.markdownToBlocks(data.value);
                this.renderEditor(JSON.parse(JSON.stringify(blocks)));
            }
        }
        async setValue(value) {
            this.value = value;
            if (!this._editor)
                return;
            const blocks = await this._editor.markdownToBlocks(value);
            this._editor.replaceBlocks(this._editor.topLevelBlocks, blocks);
        }
        updateTag(type, value) {
            this.tag[type] = this.tag[type] ?? {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        async setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this.tag[prop] = newValue[prop];
                }
            }
            this.updateTheme();
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        updateTheme() {
            const themeVar = document.body.style.getPropertyValue('--theme') ?? 'dark';
            this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
            this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
        }
        getTag() {
            return this.tag;
        }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        return this._getActions();
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this),
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this),
                },
            ];
        }
        _getActions() {
            const actions = [
                {
                    name: 'Widget Settings',
                    icon: 'edit',
                    ...this.getWidgetSchemas(),
                },
            ];
            return actions;
        }
        getWidgetSchemas() {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    pt: {
                        title: 'Top',
                        type: 'number',
                    },
                    pb: {
                        title: 'Bottom',
                        type: 'number',
                    },
                    pl: {
                        title: 'Left',
                        type: 'number',
                    },
                    pr: {
                        title: 'Right',
                        type: 'number',
                    },
                    align: {
                        type: 'string',
                        title: 'Alignment',
                        enum: ['left', 'center', 'right'],
                    },
                    maxWidth: {
                        type: 'number',
                    },
                    link: {
                        title: 'URL',
                        type: 'string',
                    },
                },
            };
            const themesSchema = {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Group',
                                label: 'Padding (px)',
                                elements: [
                                    {
                                        type: 'VerticalLayout',
                                        elements: [
                                            {
                                                type: 'HorizontalLayout',
                                                elements: [
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/pt',
                                                    },
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/pb',
                                                    },
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/pl',
                                                    },
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/pr',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
            return {
                userInputDataSchema: propertiesSchema,
                userInputUISchema: themesSchema,
            };
        }
        onHide() {
            if (this.timer)
                clearTimeout(this.timer);
            (0, index_15.removeContainer)();
            (0, index_15.getToolbars)().clear();
        }
        async init() {
            super.init();
            (0, index_15.removeContainer)();
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const value = this.getAttribute('value', true);
                await this.setData({ value });
            }
        }
        render() {
            return (this.$render("i-panel", { id: "pnlEditor", background: { color: Theme.background.main }, font: { color: Theme.text.primary }, border: { radius: 'inherit' } }));
        }
    };
    ScomEditor = __decorate([
        (0, components_26.customElements)('i-scom-editor')
    ], ScomEditor);
    exports.ScomEditor = ScomEditor;
});
