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
    exports.formatKeyboardShortcut = exports.isAppleOS = void 0;
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
    exports.buttonHoverStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.buttonHoverStyle = components_1.Styles.style({
        $nest: {
            '&:hover': {
                background: `${Theme.action.hoverBackground}!important`
            }
        }
    });
});
define("@scom/scom-editor/components/utils.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/global/index.ts", "@scom/scom-editor/components/index.css.ts"], function (require, exports, components_2, index_1, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MediaBlockTypes = exports.CustomBlockTypes = exports.getPlacement = exports.getModalContainer = exports.createModal = exports.createParent = exports.createButton = exports.getExtraFields = exports.defaultBlockTypeItems = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
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
            }
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
        const button = new components_2.Button(parent, {
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
        const elm = await components_2.HStack.create({
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
        const elm = await components_2.Modal.create({
            background: { color: Theme.background.main },
            boxShadow: Theme.shadows[1],
            lineHeight: 1.2,
            padding: { top: '0.125rem', bottom: '0.125rem', left: '0.125rem', right: '0.125rem' },
            border: { radius: '0.375rem', width: '1px', style: 'solid', color: Theme.colors.secondary.light },
            showBackdrop: false,
            visible: false,
            minWidth: 0,
            ...props
        });
        return elm;
    };
    exports.createModal = createModal;
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
        let placement = '';
        if (!("textAlignment" in block.props)) {
            placement = 'bottom';
        }
        else {
            placement = textAlignmentToPlacement(block.props.textAlignment);
        }
        return placement;
    };
    exports.getPlacement = getPlacement;
    exports.CustomBlockTypes = ['video', 'imageWidget'];
    exports.MediaBlockTypes = ['video', 'image', 'imageWidget'];
});
define("@scom/scom-editor/components/colorPicker.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_3, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorColorPicker = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomEditorColorPicker = class ScomEditorColorPicker extends components_3.Module {
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
        showModal(popupPlacement) {
            (0, utils_1.getModalContainer)().appendChild(this.mdColorPicker);
            this.mdColorPicker.position = 'fixed';
            if (this.parent)
                this.mdColorPicker.linkTo = this.parent;
            if (popupPlacement)
                this.mdColorPicker.popupPlacement = popupPlacement;
            this.mdColorPicker.visible = true;
            const { top, height } = this.getBoundingClientRect();
            this.pnlColors.maxHeight = `calc(100vh - ${top + height + 32}px`;
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
            if (this.onClosed)
                this.onClosed();
            (0, utils_1.getModalContainer)().removeChild(this.mdColorPicker);
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
            return (this.$render("i-modal", { id: "mdColorPicker", popupPlacement: "rightTop", minWidth: 200, maxWidth: 300, border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], showBackdrop: false, onClose: this.handleClose },
                this.$render("i-vstack", { id: "pnlColors", overflow: { y: 'auto' } })));
        }
    };
    ScomEditorColorPicker = __decorate([
        (0, components_3.customElements)('i-scom-editor-color-picker')
    ], ScomEditorColorPicker);
    exports.ScomEditorColorPicker = ScomEditorColorPicker;
});
define("@scom/scom-editor/components/colorButton.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorColor = void 0;
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomEditorColor = class ScomEditorColor extends components_4.Module {
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
            this.mdPicker.parent = this.btnColor;
            this.mdPicker.showModal('bottom');
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
        (0, components_4.customElements)('i-scom-editor-color')
    ], ScomEditorColor);
    exports.ScomEditorColor = ScomEditorColor;
});
define("@scom/scom-editor/components/toolbarDropdown.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_5, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorToolbarDropdown = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    let ScomEditorToolbarDropdown = class ScomEditorToolbarDropdown extends components_5.Module {
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
            this.btnSelected.caption = this.selectedItem?.text || '';
            if (this.selectedItem?.icon?.name)
                this.btnSelected.icon.name = this.selectedItem.icon.name;
        }
        showModal() {
            (0, utils_2.getModalContainer)().appendChild(this.mdDropdown);
            this.mdDropdown.parent = this.btnSelected;
            this.mdDropdown.position = 'fixed';
            this.mdDropdown.refresh();
            this.mdDropdown.visible = true;
        }
        handleClosed() {
            (0, utils_2.getModalContainer)().removeChild(this.mdDropdown);
        }
        init() {
            super.init();
            const items = this.getAttribute('items', true);
            this.setData({ items });
        }
        render() {
            return (this.$render("i-panel", { width: 'auto', height: '100%', display: 'inline-block' },
                this.$render("i-button", { id: "btnSelected", height: '100%', width: 'auto', minWidth: '1rem', border: { radius: '0px' }, background: { color: 'transparent' }, font: { size: '0.75rem', color: Theme.text.primary }, boxShadow: 'none', icon: { width: '0.75rem', height: '0.75rem', fill: Theme.text.primary }, rightIcon: { width: '0.5rem', height: '0.5rem', fill: Theme.text.primary, name: 'angle-down' }, onClick: () => this.showModal() }),
                this.$render("i-modal", { id: "mdDropdown", popupPlacement: "bottom", minWidth: 200, maxWidth: 'max-content', border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], margin: { top: '1rem' }, showBackdrop: false, onClose: this.handleClosed },
                    this.$render("i-vstack", { id: "pnlOptions", maxHeight: '34.788rem', overflow: { y: 'auto' } }))));
        }
    };
    ScomEditorToolbarDropdown = __decorate([
        (0, components_5.customElements)('i-scom-editor-toolbar-dropdown')
    ], ScomEditorToolbarDropdown);
    exports.ScomEditorToolbarDropdown = ScomEditorToolbarDropdown;
});
define("@scom/scom-editor/components/blockTypeButton.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_6, utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorBlockType = void 0;
    let ScomEditorBlockType = class ScomEditorBlockType extends components_6.Module {
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
                // Checks if props for the block type are valid
                // for (const [prop, value] of Object.entries(item.props || {})) {
                //   const propSchema = props.editor.schema[item.type].propSchema;
                //   // Checks if the prop exists for the block type
                //   if (!(prop in propSchema)) {
                //     return false;
                //   }
                //   // Checks if the prop's value is valid
                //   if (
                //     propSchema[prop].values !== undefined &&
                //     !propSchema[prop].values!.includes(value)
                //   ) {
                //     return false;
                //   }
                // }
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
        (0, components_6.customElements)('i-scom-editor-block-type')
    ], ScomEditorBlockType);
    exports.ScomEditorBlockType = ScomEditorBlockType;
});
define("@scom/scom-editor/components/linkModal.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_7, utils_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorMdLink = void 0;
    const Theme = components_7.Styles.Theme.ThemeVars;
    let ScomEditorMdLink = class ScomEditorMdLink extends components_7.Module {
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
        showModal() {
            (0, utils_4.getModalContainer)().appendChild(this.mdLink);
            this.mdLink.position = 'fixed';
            if (this.parent)
                this.mdLink.linkTo = this.parent;
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
            (0, utils_4.getModalContainer)().removeChild(this.mdLink);
        }
        init() {
            super.init();
            this.onInputChanged = this.getAttribute('onInputChanged', true) || this.onInputChanged;
            const text = this.getAttribute('text', true);
            const url = this.getAttribute('url', true);
            this.setData({ text, url });
        }
        render() {
            return (this.$render("i-modal", { id: "mdLink", popupPlacement: "bottom", minWidth: '18.75rem', maxWidth: 'max-content', border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], margin: { top: '1rem' }, showBackdrop: false, onClose: this.handleClosed },
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
        (0, components_7.customElements)('i-scom-editor-md-link')
    ], ScomEditorMdLink);
    exports.ScomEditorMdLink = ScomEditorMdLink;
});
define("@scom/scom-editor/components/linkButton.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorLink = void 0;
    const Theme = components_8.Styles.Theme.ThemeVars;
    let ScomEditorLink = class ScomEditorLink extends components_8.Module {
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
            this.mdCreateLink.parent = this.btnLink;
            this.mdCreateLink.showModal();
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
        (0, components_8.customElements)('i-scom-editor-link')
    ], ScomEditorLink);
    exports.ScomEditorLink = ScomEditorLink;
});
define("@scom/scom-editor/components/dragHandle.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorDragHandle = void 0;
    const Theme = components_9.Styles.Theme.ThemeVars;
    let ScomEditorDragHandle = class ScomEditorDragHandle extends components_9.Module {
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
                this.mdPicker.parent = this.mdMenu;
                this.mdPicker.showModal('rightTop');
                if (this.freezeMenu)
                    this.freezeMenu();
            }
        }
        onShowMenu() {
            this.mdMenu.visible = true;
        }
        onHideMenu() {
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
            if (block)
                this.setData({ block });
        }
        render() {
            return (this.$render("i-modal", { id: "mdMenu", popupPlacement: "left", showBackdrop: false, minWidth: '6.25rem', maxWidth: '100%', onOpen: this.onModalOpen, onClose: this.onModalClose },
                this.$render("i-panel", null,
                    this.$render("i-menu", { id: "menuElm", padding: { top: '0rem', bottom: '0rem', left: '0.675rem', right: '0.675rem' }, font: { color: Theme.text.primary, size: '0.75rem' }, boxShadow: Theme.shadows[1], width: '100%', mode: "vertical", data: this._menuData, background: { color: Theme.background.modal }, onItemClick: this.handleMenu }),
                    this.$render("i-scom-editor-color-picker", { id: "mdPicker", onSelected: this.onColorClicked }))));
        }
    };
    ScomEditorDragHandle = __decorate([
        (0, components_9.customElements)('i-scom-editor-drag-handle')
    ], ScomEditorDragHandle);
    exports.ScomEditorDragHandle = ScomEditorDragHandle;
});
define("@scom/scom-editor/components/settingsForm.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorSettingsForm = void 0;
    const Theme = components_10.Styles.Theme.ThemeVars;
    let ScomEditorSettingsForm = class ScomEditorSettingsForm extends components_10.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
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
                let element = await action.customUI.render({ ...block.props }, this.onSave.bind(this));
                this.pnlForm.append(element);
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
        onSave(result, data) {
            const { onConfirm, block } = this.data;
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
                this.$render("i-panel", { id: "pnlForm", visible: false })));
        }
    };
    ScomEditorSettingsForm = __decorate([
        (0, components_10.customElements)('i-scom-editor-settings-form')
    ], ScomEditorSettingsForm);
    exports.ScomEditorSettingsForm = ScomEditorSettingsForm;
});
define("@scom/scom-editor/components/sideMenu.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/settingsForm.tsx", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/index.css.ts"], function (require, exports, components_11, settingsForm_1, utils_5, index_css_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorSideMenu = void 0;
    const Theme = components_11.Styles.Theme.ThemeVars;
    let ScomEditorSideMenu = class ScomEditorSideMenu extends components_11.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._isShowing = false;
        }
        get block() {
            return this._data.block;
        }
        set block(value) {
            this._data.block = value;
            this.dragHandle.block = value;
            this.btnEdit.visible = this.block?.type && utils_5.CustomBlockTypes.includes(this.block.type);
        }
        get editor() {
            return this._data.editor;
        }
        set editor(value) {
            this._data.editor = value;
        }
        get isShowing() {
            return this._isShowing ?? false;
        }
        setData(value) {
            this._data = value;
            this.dragHandle.freezeMenu = this.editor.sideMenu.freezeMenu;
            this.dragHandle.unfreezeMenu = this.editor.sideMenu.unfreezeMenu;
            this.dragHandle.setData({ block: this.block });
            this.btnDrag.addEventListener("dragstart", this.editor.sideMenu.blockDragStart);
            this.btnDrag.addEventListener("dragend", this.editor.sideMenu.blockDragEnd);
            this.btnDrag.draggable = true;
            this.btnEdit.visible = this.block?.type && utils_5.CustomBlockTypes.includes(this.block.type);
        }
        handleSetColor(type, color) {
            const prop = type === 'text' ? 'textColor' : 'backgroundColor';
            this.editor.updateBlock(this.block, {
                props: { [prop]: color }
            });
            this.hideDragMenu();
        }
        handleDelete() {
            this.editor.removeBlocks([this.block]);
            this.hideDragMenu();
        }
        handleAddBlock() {
            this.editor.sideMenu.addBlock();
        }
        showDragMenu() {
            this.dragHandle.onShowMenu();
            this._isShowing = true;
        }
        hideDragMenu() {
            this.dragHandle.onHideMenu();
            this._isShowing = false;
        }
        handleEditBlock() {
            const blockEl = this.editor.domElement.querySelector(`[data-id="${this.block.id}"]`);
            if (!blockEl)
                return;
            let module;
            let editAction;
            let formConfig;
            switch (this.block.type) {
                case 'video':
                    module = blockEl.querySelector('i-scom-video');
                    editAction = this.getEditAction(module);
                    if (editAction) {
                        formConfig = {
                            action: { ...editAction },
                            block: JSON.parse(JSON.stringify(this.block)),
                            onConfirm: (block, data) => {
                                if (data.url !== block.props.url) {
                                    this.updateBlock(block, { url: data.url });
                                }
                                this.actionForm.closeModal();
                            }
                        };
                    }
                    break;
                case 'imageWidget':
                    module = blockEl.querySelector('i-scom-image');
                    editAction = this.getEditAction(module);
                    if (editAction) {
                        formConfig = {
                            action: { ...editAction },
                            block: JSON.parse(JSON.stringify(this.block)),
                            onConfirm: (block, data) => {
                                const newProps = { ...data };
                                const { url, cid, link, altText, keyword, photoId, backgroundColor } = newProps;
                                this.updateBlock(block, { url, cid, link, altText, keyword, photoId, backgroundColor });
                                this.actionForm.closeModal();
                            }
                        };
                    }
                    break;
            }
            if (formConfig)
                this.renderForm(formConfig);
        }
        getActions(component) {
            if (component?.getConfigurators) {
                const configs = component.getConfigurators() || [];
                const builderTarget = configs.find((conf) => conf.target === 'Builders');
                if (builderTarget?.getActions)
                    return builderTarget.getActions();
            }
            return [];
        }
        getEditAction(component) {
            const actions = this.getActions(component);
            return actions.find(action => action.name === 'Edit') || null;
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
                width: '30rem'
            });
        }
        updateBlock(block, props) {
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
                this.$render("i-hstack", { verticalAlignment: "center", gap: '0.5rem' },
                    this.$render("i-button", { id: "btnAdd", icon: { name: 'plus', width: '0.75rem', height: '0.75rem', fill: Theme.text.primary }, background: { color: 'transparent' }, boxShadow: 'none', class: index_css_2.buttonHoverStyle, onClick: () => this.handleAddBlock() }),
                    this.$render("i-button", { id: "btnEdit", icon: { name: 'cog', width: '0.75rem', height: '0.75rem', fill: Theme.text.primary }, background: { color: 'transparent' }, boxShadow: 'none', visible: false, class: index_css_2.buttonHoverStyle, onClick: () => this.handleEditBlock() }),
                    this.$render("i-button", { id: "btnDrag", border: { radius: '0px' }, icon: { name: "ellipsis-v", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary }, background: { color: 'transparent' }, boxShadow: 'none', class: index_css_2.buttonHoverStyle, onClick: () => this.showDragMenu() })),
                this.$render("i-scom-editor-drag-handle", { id: "dragHandle", onSetColor: this.handleSetColor, onDeleted: this.handleDelete })));
        }
    };
    ScomEditorSideMenu = __decorate([
        (0, components_11.customElements)('i-scom-editor-side-menu')
    ], ScomEditorSideMenu);
    exports.ScomEditorSideMenu = ScomEditorSideMenu;
});
define("@scom/scom-editor/components/slashMenu.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_12, utils_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorSlashMenu = void 0;
    const Theme = components_12.Styles.Theme.ThemeVars;
    let ScomEditorSlashMenu = class ScomEditorSlashMenu extends components_12.Module {
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
        get referencePos() {
            return this._data.referencePos;
        }
        set referencePos(value) {
            this._data.referencePos = value;
        }
        get groupData() {
            const result = {};
            const fieldData = (0, utils_6.getExtraFields)();
            for (let item of this.items) {
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
        updatePanel() {
            const { top = 0, height = 0 } = this.referencePos || {};
            this.pnlSlash.maxHeight = `calc(100vh - ${top + height}px)`;
        }
        renderUI() {
            this.pnlSlash.clearInnerHTML();
            const groups = Object.keys(this.groupData);
            for (let group of groups) {
                const itemsWrap = this.$render("i-vstack", null);
                const groupEl = (this.$render("i-vstack", null,
                    this.$render("i-label", { caption: group, padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, width: '100%', background: { color: Theme.action.hoverBackground } }),
                    itemsWrap));
                for (let i = 0; i < this.groupData[group].length; i++) {
                    const item = this.groupData[group][i];
                    const isSelected = this.items[this.selectedIndex]?.name === item.name;
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
                            this.$render("i-icon", { name: item.icon.name, width: '1rem', height: '1rem', fill: Theme.text.primary }),
                            this.$render("i-vstack", { gap: '0.25rem' },
                                this.$render("i-label", { caption: item.name, font: { size: '0.875rem', weight: 500 } }),
                                this.$render("i-label", { caption: item.hint, font: { size: '0.625rem', weight: 400 } }))),
                        this.$render("i-label", { caption: item.shortcut || '', font: { size: '0.625rem', weight: 600 }, border: { radius: '0.25rem' }, background: { color: item.shortcut ? Theme.action.activeBackground : 'transparent' }, visible: item.shortcut, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, stack: { shrink: '0' } }));
                    itemsWrap.append(hstack);
                    this.itemsMap.set(item.name, hstack);
                }
                this.pnlSlash.appendChild(groupEl);
            }
            this.updatePanel();
        }
        init() {
            super.init();
            this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
            const items = this.getAttribute('items', true);
            const selectedIndex = this.getAttribute('selectedIndex', true);
            const referencePos = this.getAttribute('referencePos', true);
            if (items)
                this.setData({ items, selectedIndex, referencePos });
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-vstack", { id: "pnlSlash", minWidth: 300, maxWidth: '100%', overflow: { y: 'auto' } })));
        }
    };
    ScomEditorSlashMenu = __decorate([
        (0, components_12.customElements)('i-scom-editor-splash-menu')
    ], ScomEditorSlashMenu);
    exports.ScomEditorSlashMenu = ScomEditorSlashMenu;
});
define("@scom/scom-editor/components/imageToolbar.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorImageToolbar = void 0;
    const Theme = components_13.Styles.Theme.ThemeVars;
    let ScomEditorImageToolbar = class ScomEditorImageToolbar extends components_13.Module {
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
        (0, components_13.customElements)('i-scom-editor-image-toolbar')
    ], ScomEditorImageToolbar);
    exports.ScomEditorImageToolbar = ScomEditorImageToolbar;
});
define("@scom/scom-editor/components/formattingToolbar.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/global/index.ts", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/colorButton.tsx", "@scom/scom-editor/components/index.css.ts", "@scom/scom-editor/components/blockTypeButton.tsx", "@scom/scom-editor/components/linkButton.tsx"], function (require, exports, components_14, index_2, utils_7, colorButton_1, index_css_3, blockTypeButton_1, linkButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorFormattingToolbar = void 0;
    const Theme = components_14.Styles.Theme.ThemeVars;
    let ScomEditorFormattingToolbar = class ScomEditorFormattingToolbar extends components_14.Module {
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
                    visible: this.isMediaBlock,
                    onClick: () => {
                        (0, utils_7.getModalContainer)().appendChild(this.mdReplace);
                        this.mdReplace.position = 'fixed';
                        this.mdReplace.linkTo = this;
                        this.mdReplace.visible = true;
                    }
                },
                {
                    customControl: (element) => {
                        let blockType = new blockTypeButton_1.ScomEditorBlockType(undefined, {
                            ...customProps,
                            block: this._block,
                            visible: !this.isMediaBlock,
                            stack: { shrink: '0' },
                            onItemClicked: (item) => this.setBlockType(editor, item),
                            onValidate: (item) => {
                                return (item.type in editor.schema);
                            },
                            class: index_css_3.buttonHoverStyle
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
                            class: index_css_3.buttonHoverStyle
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
                            visible: !this.isMediaBlock,
                            setLink: (text, url) => {
                                this.setLink(editor, text, url);
                            },
                            class: index_css_3.buttonHoverStyle
                        });
                        return link;
                    }
                }
            ];
        }
        get isMediaBlock() {
            const selectedBlocks = this.editor.getSelection()?.blocks || [this.editor.getTextCursorPosition().block];
            const show = selectedBlocks.length === 1 &&
                utils_7.MediaBlockTypes.includes(selectedBlocks[0].type);
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
                    const btn = (0, utils_7.createButton)(props, this.pnlFormatting);
                    this.pnlFormatting.appendChild(btn);
                }
            }
        }
        handleClose() {
            const container = (0, utils_7.getModalContainer)();
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
        (0, components_14.customElements)('i-scom-editor-formatting-toolbar')
    ], ScomEditorFormattingToolbar);
    exports.ScomEditorFormattingToolbar = ScomEditorFormattingToolbar;
});
define("@scom/scom-editor/components/index.ts", ["require", "exports", "@scom/scom-editor/components/colorButton.tsx", "@scom/scom-editor/components/toolbarDropdown.tsx", "@scom/scom-editor/components/blockTypeButton.tsx", "@scom/scom-editor/components/linkButton.tsx", "@scom/scom-editor/components/sideMenu.tsx", "@scom/scom-editor/components/slashMenu.tsx", "@scom/scom-editor/components/colorPicker.tsx", "@scom/scom-editor/components/formattingToolbar.tsx", "@scom/scom-editor/components/imageToolbar.tsx", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/index.css.ts"], function (require, exports, colorButton_2, toolbarDropdown_1, blockTypeButton_2, linkButton_2, sideMenu_1, slashMenu_1, colorPicker_1, formattingToolbar_1, imageToolbar_1, utils_8, index_css_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buttonHoverStyle = exports.ScomEditorImageToolbar = exports.ScomEditorFormattingToolbar = exports.ScomEditorColorPicker = exports.ScomEditorSlashMenu = exports.ScomEditorSideMenu = exports.ScomEditorLink = exports.ScomEditorBlockType = exports.ScomEditorToolbarDropdown = exports.ScomEditorColor = void 0;
    Object.defineProperty(exports, "ScomEditorColor", { enumerable: true, get: function () { return colorButton_2.ScomEditorColor; } });
    Object.defineProperty(exports, "ScomEditorToolbarDropdown", { enumerable: true, get: function () { return toolbarDropdown_1.ScomEditorToolbarDropdown; } });
    Object.defineProperty(exports, "ScomEditorBlockType", { enumerable: true, get: function () { return blockTypeButton_2.ScomEditorBlockType; } });
    Object.defineProperty(exports, "ScomEditorLink", { enumerable: true, get: function () { return linkButton_2.ScomEditorLink; } });
    Object.defineProperty(exports, "ScomEditorSideMenu", { enumerable: true, get: function () { return sideMenu_1.ScomEditorSideMenu; } });
    Object.defineProperty(exports, "ScomEditorSlashMenu", { enumerable: true, get: function () { return slashMenu_1.ScomEditorSlashMenu; } });
    Object.defineProperty(exports, "ScomEditorColorPicker", { enumerable: true, get: function () { return colorPicker_1.ScomEditorColorPicker; } });
    Object.defineProperty(exports, "ScomEditorFormattingToolbar", { enumerable: true, get: function () { return formattingToolbar_1.ScomEditorFormattingToolbar; } });
    Object.defineProperty(exports, "ScomEditorImageToolbar", { enumerable: true, get: function () { return imageToolbar_1.ScomEditorImageToolbar; } });
    __exportStar(utils_8, exports);
    Object.defineProperty(exports, "buttonHoverStyle", { enumerable: true, get: function () { return index_css_4.buttonHoverStyle; } });
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
                    id: 'pnlFormattingToolbar',
                    popupPlacement: (0, index_3.getPlacement)(block),
                    zIndex: 3000
                });
                modal.linkTo = editor.domElement;
                modal.position = "fixed";
                (0, index_3.getModalContainer)().appendChild(modal);
            }
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
                const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                if (blockEl)
                    modal.linkTo = blockEl;
                modal.refresh();
                modal.visible = true;
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
        let element;
        let sideMenu;
        editor.sideMenu.onUpdate(async (sideMenuState) => {
            if (!element) {
                element = await (0, index_4.createParent)({
                    id: 'pnlSideMenu',
                    border: { radius: '0px', style: 'none' },
                    padding: { top: 0, left: '0.125rem', right: '0.125rem', bottom: 0 },
                    background: { color: 'transparent' },
                    boxShadow: 'none',
                    visible: false
                });
                sideMenu = await index_4.ScomEditorSideMenu.create({
                    block: sideMenuState.block,
                    editor: editor
                });
                element.appendChild(sideMenu);
                editor.domElement.parentElement.appendChild(element);
            }
            if (sideMenuState.show) {
                if (sideMenu.isShowing)
                    editor.sideMenu.freezeMenu();
                else
                    editor.sideMenu.unfreezeMenu();
                sideMenu.block = sideMenuState.block;
                element.visible = true;
            }
            const { top: parentTop } = editor.domElement.parentElement.getBoundingClientRect();
            const top = sideMenuState.referencePos.top - parentTop;
            element.style.top = `${top + (sideMenuState.referencePos.height / 2) - sideMenu.offsetHeight / 2}px`;
            element.style.left = `${0}px`;
        });
    };
    exports.addSideMenu = addSideMenu;
});
define("@scom/scom-editor/blocks/addSlashMenu.ts", ["require", "exports", "@scom/scom-editor/components/index.ts"], function (require, exports, index_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addSlashMenu = void 0;
    const addSlashMenu = (editor) => {
        let modal;
        let menuElm;
        async function updateItems(items, onClick, selected, referencePos) {
            menuElm = await index_5.ScomEditorSlashMenu.create({
                items: [...items],
                selectedIndex: selected,
                referencePos,
                onItemClicked: (item) => {
                    onClick(item);
                    modal.visible = false;
                }
            });
            modal.item = menuElm;
        }
        editor.slashMenu.onUpdate(async (slashMenuState) => {
            const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
            const block = selectedBlocks[0];
            const blockID = block?.id;
            if (!modal) {
                modal = await (0, index_5.createModal)({
                    id: 'pnlSlashMenu',
                    popupPlacement: 'bottomLeft',
                    padding: { left: 0, top: 0, right: 0, bottom: 0 },
                    zIndex: 3000
                });
                modal.position = "fixed";
                (0, index_5.getModalContainer)().appendChild(modal);
            }
            if (slashMenuState.show) {
                updateItems(slashMenuState.filteredItems, editor.slashMenu.itemCallback, slashMenuState.keyboardHoveredItemIndex, slashMenuState.referencePos);
                if (blockID) {
                    const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                    if (blockEl) {
                        modal.linkTo = blockEl;
                        modal.visible = true;
                    }
                }
                else {
                    modal.visible = false;
                }
            }
        });
    };
    exports.addSlashMenu = addSlashMenu;
});
define("@scom/scom-editor/blocks/addHyperlinkToolbar.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.ts"], function (require, exports, components_15, index_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addHyperlinkToolbar = void 0;
    const Theme = components_15.Styles.Theme.ThemeVars;
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
                    id: 'pnlHyperlinkToolbar',
                    popupPlacement: 'top',
                    minWidth: 0,
                    zIndex: 2000
                });
                modal.linkTo = editor.domElement;
                modal.position = "fixed";
                (0, index_6.getModalContainer)().appendChild(modal);
            }
            if (!element) {
                element = await components_15.Panel.create({ minWidth: 'max-content' });
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
                const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                if (blockEl)
                    modal.linkTo = blockEl;
                modal.visible = true;
            }
        });
    };
    exports.addHyperlinkToolbar = addHyperlinkToolbar;
});
define("@scom/scom-editor/blocks/addImageToolbar.tsx", ["require", "exports", "@scom/scom-editor/components/index.ts"], function (require, exports, index_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addImageToolbar = void 0;
    const addImageToolbar = (editor) => {
        let modal;
        let imageToolbar;
        editor.imageToolbar.onUpdate(async (imageToolbarState) => {
            const block = imageToolbarState.block;
            const blockID = block?.id;
            if (!modal) {
                modal = await (0, index_7.createModal)({
                    id: 'pnlImageToolbar',
                    popupPlacement: 'bottom',
                    zIndex: 2000,
                    width: '31.25rem'
                });
                modal.position = "fixed";
                (0, index_7.getModalContainer)().appendChild(modal);
            }
            if (!imageToolbar) {
                imageToolbar = await index_7.ScomEditorImageToolbar.create({
                    block: block,
                    editor: editor,
                    width: '100%',
                    display: 'block',
                    onUpdated: () => modal.visible = false
                });
                modal.item = imageToolbar;
            }
            if (blockID) {
                const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                if (blockEl) {
                    modal.linkTo = blockEl;
                    modal.visible = true;
                }
            }
            else {
                modal.visible = false;
            }
        });
    };
    exports.addImageToolbar = addImageToolbar;
});
define("@scom/scom-editor/blocks/addVideoBlock.ts", ["require", "exports", "@ijstech/components", "@scom/scom-video"], function (require, exports, components_16, scom_video_1) {
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
                const wrapper = new components_16.Panel();
                const video = new scom_video_1.default(wrapper, {
                    url: block.props.url
                });
                wrapper.appendChild(video);
                return {
                    dom: wrapper
                };
            }
        });
        const VideoSlashItem = {
            name: "Video",
            execute: (editor) => {
                editor.insertBlocks([
                    {
                        type: "video",
                        props: {
                            url: "https://www.youtube.com/embed/Wlf1T5nrO50"
                        }
                    }
                ], editor.getTextCursorPosition().block, "after");
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
define("@scom/scom-editor/blocks/addImageBlock.ts", ["require", "exports", "@ijstech/components", "@scom/scom-image"], function (require, exports, components_17, scom_image_1) {
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
                const wrapper = new components_17.Panel();
                const { url, cid, link, altText, keyword, photoId, backgroundColor } = JSON.parse(JSON.stringify(block.props));
                const image = new scom_image_1.default(wrapper, { url, cid, link, altText, keyword, photoId, backgroundColor });
                wrapper.appendChild(image);
                return {
                    dom: wrapper
                };
            }
        });
        const ImageSlashItem = {
            name: "Image Widget",
            execute: (editor) => {
                editor.insertBlocks([
                    {
                        type: "imageWidget",
                        props: {
                            url: ""
                        }
                    }
                ], editor.getTextCursorPosition().block, "after");
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
define("@scom/scom-editor/blocks/index.ts", ["require", "exports", "@scom/scom-editor/blocks/addFormattingToolbar.ts", "@scom/scom-editor/blocks/addSideMenu.ts", "@scom/scom-editor/blocks/addSlashMenu.ts", "@scom/scom-editor/blocks/addHyperlinkToolbar.ts", "@scom/scom-editor/blocks/addImageToolbar.tsx", "@scom/scom-editor/blocks/addVideoBlock.ts", "@scom/scom-editor/blocks/addImageBlock.ts"], function (require, exports, addFormattingToolbar_1, addSideMenu_1, addSlashMenu_1, addHyperlinkToolbar_1, addImageToolbar_1, addVideoBlock_1, addImageBlock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addImageBlock = exports.addVideoBlock = exports.addImageToolbar = exports.addHyperlinkToolbar = exports.addSlashMenu = exports.addSideMenu = exports.addFormattingToolbar = void 0;
    Object.defineProperty(exports, "addFormattingToolbar", { enumerable: true, get: function () { return addFormattingToolbar_1.addFormattingToolbar; } });
    Object.defineProperty(exports, "addSideMenu", { enumerable: true, get: function () { return addSideMenu_1.addSideMenu; } });
    Object.defineProperty(exports, "addSlashMenu", { enumerable: true, get: function () { return addSlashMenu_1.addSlashMenu; } });
    Object.defineProperty(exports, "addHyperlinkToolbar", { enumerable: true, get: function () { return addHyperlinkToolbar_1.addHyperlinkToolbar; } });
    Object.defineProperty(exports, "addImageToolbar", { enumerable: true, get: function () { return addImageToolbar_1.addImageToolbar; } });
    Object.defineProperty(exports, "addVideoBlock", { enumerable: true, get: function () { return addVideoBlock_1.addVideoBlock; } });
    Object.defineProperty(exports, "addImageBlock", { enumerable: true, get: function () { return addImageBlock_1.addImageBlock; } });
});
define("@scom/scom-editor", ["require", "exports", "@ijstech/components", "@scom/scom-editor/blocks/index.ts"], function (require, exports, components_18, index_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditor = void 0;
    const Theme = components_18.Styles.Theme.ThemeVars;
    const path = components_18.application.currentModuleDir;
    components_18.RequireJS.config({
        paths: {
            'blocknote': `${path}/lib/@blocknote/blocknote.bundled.umd.js`
        }
    });
    const libPlugins = [
        'blocknote'
    ];
    const cssPath = `${path}/lib/@blocknote/style.css`;
    let ScomEditor = class ScomEditor extends components_18.Module {
        constructor(parent, options) {
            super(parent, options);
            this.tag = {};
        }
        get value() {
            return this._data.value;
        }
        set value(data) {
            this._data.value = data;
        }
        get placeholder() {
            return this._data.placeholder;
        }
        set placeholder(data) {
            this._data.placeholder = data;
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
        renderEditor() {
            if (!this._blocknoteObj)
                return;
            const { VideoSlashItem, VideoBlock } = (0, index_8.addVideoBlock)(this._blocknoteObj);
            const { ImageSlashItem, ImageBlock } = (0, index_8.addImageBlock)(this._blocknoteObj);
            const customSchema = {
                ...this._blocknoteObj.defaultBlockSchema,
                video: VideoBlock,
                imageWidget: ImageBlock
            };
            this._editor = new this._blocknoteObj.BlockNoteEditor({
                parentElement: this.pnlEditor,
                blockSchema: customSchema,
                slashMenuItems: [
                    ...this._blocknoteObj.getDefaultSlashMenuItems(),
                    VideoSlashItem,
                    ImageSlashItem
                ],
                onEditorContentChange: async (editor) => {
                    // TODO: check missing node
                    // this.value = await this.blocksToMarkdown(editor);
                    // if (this.onChanged) this.onChanged(this.value);
                },
                domAttributes: {
                    editor: {
                        class: 'scom-editor'
                    }
                }
            });
            console.log('_blocknoteObj', this._blocknoteObj);
            if (this.value)
                this.markdownToBlocks(this.value);
            (0, index_8.addSideMenu)(this._editor);
            (0, index_8.addFormattingToolbar)(this._editor);
            (0, index_8.addSlashMenu)(this._editor);
            (0, index_8.addHyperlinkToolbar)(this._editor);
            (0, index_8.addImageToolbar)(this._editor);
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
                components_18.RequireJS.require(libPlugins, (blocknote) => {
                    resolve(blocknote);
                });
            });
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            await this.markdownToBlocks(data.value || '');
        }
        async markdownToBlocks(markdown) {
            if (!this._editor)
                return;
            const blocks = await this._editor.markdownToBlocks(markdown);
            this._editor.replaceBlocks(JSON.parse(JSON.stringify(this._editor.topLevelBlocks)), JSON.parse(JSON.stringify(blocks)));
        }
        ;
        async blocksToMarkdown(editor) {
            const markdownContent = await editor.blocksToMarkdown(JSON.parse(JSON.stringify(editor.topLevelBlocks)));
            return markdownContent;
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
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
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
                    ...this.getWidgetSchemas()
                }
            ];
            return actions;
        }
        getWidgetSchemas() {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    pt: {
                        title: 'Top',
                        type: 'number'
                    },
                    pb: {
                        title: 'Bottom',
                        type: 'number'
                    },
                    pl: {
                        title: 'Left',
                        type: 'number'
                    },
                    pr: {
                        title: 'Right',
                        type: 'number'
                    },
                    align: {
                        type: 'string',
                        title: 'Alignment',
                        enum: [
                            'left',
                            'center',
                            'right'
                        ]
                    },
                    maxWidth: {
                        type: 'number'
                    },
                    link: {
                        title: 'URL',
                        type: 'string'
                    }
                }
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
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
            return {
                userInputDataSchema: propertiesSchema,
                userInputUISchema: themesSchema
            };
        }
        async init() {
            super.init();
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            this.initEditor();
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const value = this.getAttribute('value', true);
                const placeholder = this.getAttribute('placeholder', true);
                await this.setData({ value, placeholder });
            }
        }
        render() {
            return (this.$render("i-panel", { id: "pnlEditor", background: { color: Theme.background.main }, font: { color: Theme.text.primary }, border: { radius: 'inherit' } }));
        }
    };
    ScomEditor = __decorate([
        (0, components_18.customElements)('i-scom-editor')
    ], ScomEditor);
    exports.ScomEditor = ScomEditor;
});
