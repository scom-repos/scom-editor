var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
define("@scom/scom-editor/blocks/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
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
define("@scom/scom-editor/blocks/utils.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/blocks/index.css.ts"], function (require, exports, components_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createParent = exports.createButton = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    const createButton = (props, parent) => {
        const border = props?.border || {};
        border.radius = '0.25rem';
        const onClick = props.onClick;
        props.onClick = (target, event) => {
            // TODO: check by selected block
            // const isSelected = props.isSelected ?? false;
            // props.isSelected = !isSelected;
            // target.background.color = props.isSelected ? Theme.action.activeBackground : 'transparent';
            onClick(target, event);
        };
        const button = new components_2.Button(parent, {
            font: { size: '0.875rem' },
            padding: { top: '0px', bottom: '0px', left: '0.5rem', right: '0.5rem' },
            border: { ...border },
            background: { color: 'transparent' },
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
            zIndex: 3000,
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
});
define("@scom/scom-editor/global/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-editor/components/colorPicker.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
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
        showModal() {
            this.mdColorPicker.refresh();
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
            // this.btnColor.font = {size: '0.75rem', color: this.textColor === 'default' ? Theme.text.primary : this.textColor};
            // this.btnColor.background.color = this.backgroundColor === 'default' ? 'transparent' : this.backgroundColor;
        }
        init() {
            super.init();
            this.onSelected = this.getAttribute('onSelected', true) || this.onSelected;
            const textColor = this.getAttribute('textColor', true, 'default');
            const backgroundColor = this.getAttribute('backgroundColor', true, 'default');
            this.setData({ textColor, backgroundColor });
        }
        render() {
            return (this.$render("i-modal", { id: "mdColorPicker", popupPlacement: "bottom", minWidth: 200, maxWidth: 300, border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], showBackdrop: false },
                this.$render("i-vstack", { id: "pnlColors", maxHeight: '37.488rem', overflow: { y: 'auto' } })));
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
            this.mdPicker.showModal();
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
define("@scom/scom-editor/components/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultBlockTypeItems = void 0;
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
});
define("@scom/scom-editor/components/toolbarDropdown.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_5) {
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
            this.mdDropdown.refresh();
            this.mdDropdown.visible = true;
        }
        init() {
            super.init();
            const items = this.getAttribute('items', true);
            this.setData({ items });
        }
        render() {
            return (this.$render("i-panel", { width: 'auto', height: '100%', display: 'inline-block' },
                this.$render("i-button", { id: "btnSelected", height: '100%', width: 'auto', minWidth: '1rem', border: { radius: '0px' }, background: { color: 'transparent' }, font: { size: '0.75rem', color: Theme.text.primary }, boxShadow: 'none', icon: { width: '0.75rem', height: '0.75rem', fill: Theme.text.primary }, rightIcon: { width: '0.5rem', height: '0.5rem', fill: Theme.text.primary, name: 'angle-down' }, onClick: () => this.showModal() }),
                this.$render("i-modal", { id: "mdDropdown", popupPlacement: "bottom", minWidth: 200, maxWidth: 'max-content', border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], margin: { top: '1rem' }, showBackdrop: false },
                    this.$render("i-vstack", { id: "pnlOptions", maxHeight: '34.788rem', overflow: { y: 'auto' } }))));
        }
    };
    ScomEditorToolbarDropdown = __decorate([
        (0, components_5.customElements)('i-scom-editor-toolbar-dropdown')
    ], ScomEditorToolbarDropdown);
    exports.ScomEditorToolbarDropdown = ScomEditorToolbarDropdown;
});
define("@scom/scom-editor/components/blockTypeButton.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_6, utils_1) {
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
            return this._data.items ?? utils_1.defaultBlockTypeItems;
        }
        set items(value) {
            this._data.items = value ?? utils_1.defaultBlockTypeItems;
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
define("@scom/scom-editor/components/linkModal.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_7) {
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
        init() {
            super.init();
            this.onInputChanged = this.getAttribute('onInputChanged', true) || this.onInputChanged;
            const text = this.getAttribute('text', true);
            const url = this.getAttribute('url', true);
            this.setData({ text, url });
        }
        render() {
            return (this.$render("i-modal", { id: "mdLink", popupPlacement: "bottom", minWidth: '18.75rem', maxWidth: 'max-content', border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], showBackdrop: false },
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
define("@scom/scom-editor/components/sideMenu.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorSideMenu = void 0;
    const Theme = components_9.Styles.Theme.ThemeVars;
    let ScomEditorSideMenu = class ScomEditorSideMenu extends components_9.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
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
            this.mdPicker.setData({
                textColor: this.block?.props?.textColor,
                backgroundColor: this.block?.props?.backgroundColor
            });
        }
        onShowMenu() {
            this.menuElm.visible = true;
        }
        clear() {
            this.menuElm.visible = false;
        }
        onColorClicked(type, color) {
            this.menuElm.visible = false;
            if (this.onSetColor)
                this.onSetColor(type, color);
        }
        init() {
            super.init();
            this.onDeleted = this.getAttribute('onDeleted', true) || this.onDeleted;
            this.onSetColor = this.getAttribute('onSetColor', true) || this.onSetColor;
            this.menuElm.data = [
                {
                    title: 'Delete'
                },
                {
                    title: 'Colors',
                    icon: {
                        name: 'angle-right',
                        width: '0.3rem',
                        height: '0.3rem',
                        fill: Theme.text.primary
                    }
                }
            ];
            this.menuElm.onItemClick = (target, item) => {
                if (item.title === 'Delete') {
                    this.menuElm.visible = false;
                    if (this.onDeleted && this._data?.block)
                        this.onDeleted(this._data?.block);
                }
                else {
                    this.mdPicker.parent = item;
                    this.mdPicker.position = 'fixed';
                    this.mdPicker.showModal();
                }
            };
            const block = this.getAttribute('block', true);
            if (block)
                this.setData({ block });
        }
        render() {
            return (this.$render("i-panel", { width: 'auto', height: '100%', display: 'inline-block' },
                this.$render("i-button", { height: '100%', width: 'auto', minWidth: '1rem', border: { radius: '0px' }, icon: { name: "ellipsis-v", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary }, background: { color: 'transparent' }, boxShadow: 'none', onClick: () => this.onShowMenu() }),
                this.$render("i-menu", { id: "menuElm", padding: { top: '0rem', bottom: '0rem', left: '0.675rem', right: '0.675rem' }, font: { color: Theme.text.primary, size: '0.75rem' }, 
                    // border={{radius: '0.25rem'}}
                    boxShadow: Theme.shadows[1], width: '6.25rem', position: "absolute", left: "-4.375rem", top: "0px", mode: "vertical", background: { color: Theme.background.modal }, visible: false }),
                this.$render("i-scom-editor-color-picker", { id: "mdPicker", onSelected: this.onColorClicked })));
        }
    };
    ScomEditorSideMenu = __decorate([
        (0, components_9.customElements)('i-scom-editor-side-menu')
    ], ScomEditorSideMenu);
    exports.ScomEditorSideMenu = ScomEditorSideMenu;
});
define("@scom/scom-editor/components/index.ts", ["require", "exports", "@scom/scom-editor/components/colorButton.tsx", "@scom/scom-editor/components/toolbarDropdown.tsx", "@scom/scom-editor/components/blockTypeButton.tsx", "@scom/scom-editor/components/linkButton.tsx", "@scom/scom-editor/components/sideMenu.tsx", "@scom/scom-editor/components/colorPicker.tsx", "@scom/scom-editor/components/utils.ts"], function (require, exports, colorButton_1, toolbarDropdown_1, blockTypeButton_1, linkButton_1, sideMenu_1, colorPicker_1, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorColorPicker = exports.ScomEditorSideMenu = exports.ScomEditorLink = exports.ScomEditorBlockType = exports.ScomEditorToolbarDropdown = exports.ScomEditorColor = void 0;
    Object.defineProperty(exports, "ScomEditorColor", { enumerable: true, get: function () { return colorButton_1.ScomEditorColor; } });
    Object.defineProperty(exports, "ScomEditorToolbarDropdown", { enumerable: true, get: function () { return toolbarDropdown_1.ScomEditorToolbarDropdown; } });
    Object.defineProperty(exports, "ScomEditorBlockType", { enumerable: true, get: function () { return blockTypeButton_1.ScomEditorBlockType; } });
    Object.defineProperty(exports, "ScomEditorLink", { enumerable: true, get: function () { return linkButton_1.ScomEditorLink; } });
    Object.defineProperty(exports, "ScomEditorSideMenu", { enumerable: true, get: function () { return sideMenu_1.ScomEditorSideMenu; } });
    Object.defineProperty(exports, "ScomEditorColorPicker", { enumerable: true, get: function () { return colorPicker_1.ScomEditorColorPicker; } });
    __exportStar(utils_2, exports);
});
define("@scom/scom-editor/blocks/addFormattingToolbar.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/blocks/utils.ts", "@scom/scom-editor/components/index.ts", "@scom/scom-editor/blocks/index.css.ts"], function (require, exports, components_10, utils_3, index_1, index_css_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addFormattingToolbar = void 0;
    const Theme = components_10.Styles.Theme.ThemeVars;
    const getToolbarButtons = (editor) => {
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
                customControl: (element) => {
                    const block = editor.getTextCursorPosition().block;
                    let blockType = new index_1.ScomEditorBlockType(undefined, {
                        ...customProps,
                        block,
                        onItemClicked: (item) => setBlockType(editor, item),
                        onValidate: (item) => {
                            return (item.type in editor.schema);
                        },
                        class: index_css_2.buttonHoverStyle
                    });
                    return blockType;
                }
            },
            {
                icon: { ...iconProps, name: 'bold' },
                tooltip: { ...toolTipProps, content: 'Bold <br/> Ctrl + B' },
                onClick: () => {
                    editor.toggleStyles({ bold: true });
                }
            },
            {
                icon: { ...iconProps, name: 'italic' },
                tooltip: { ...toolTipProps, content: 'Italicize <br/> Ctrl + I' },
                onClick: () => {
                    editor.toggleStyles({ italic: true });
                }
            },
            {
                icon: { ...iconProps, name: 'underline' },
                tooltip: { ...toolTipProps, content: 'Underline <br/> Ctrl + U' },
                onClick: () => {
                    editor.toggleStyles({ underline: true });
                }
            },
            {
                icon: { ...iconProps, name: 'strikethrough' },
                tooltip: { ...toolTipProps, content: 'Strike-through <br/> Ctrl + Shift + X or Ctrl + Shift + Z' },
                onClick: () => {
                    editor.toggleStyles({ strikethrough: true });
                }
            },
            {
                icon: { ...iconProps, name: 'align-left' },
                tooltip: { ...toolTipProps, content: 'Align Text Left' },
                onClick: () => {
                    setAlignment(editor, 'left');
                }
            },
            {
                icon: { ...iconProps, name: 'align-center' },
                tooltip: { ...toolTipProps, content: 'Align Text Center' },
                onClick: () => {
                    setAlignment(editor, 'center');
                }
            },
            {
                icon: { ...iconProps, name: 'align-right' },
                tooltip: { ...toolTipProps, content: 'Align Text Right' },
                onClick: () => {
                    setAlignment(editor, 'right');
                }
            },
            {
                customControl: (element) => {
                    let colorPicker = new index_1.ScomEditorColor(undefined, {
                        ...customProps,
                        textColor: editor.getActiveStyles().textColor || "default",
                        backgroundColor: editor.getActiveStyles().backgroundColor || "default",
                        setColor: (type, color) => setColor(editor, type, color),
                        class: index_css_2.buttonHoverStyle
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
                    let link = new index_1.ScomEditorLink(undefined, {
                        ...customProps,
                        tooltip: { content: 'Create Link <br /> Ctrl + K', placement: 'bottom' },
                        editor: editor,
                        setLink: (text, url) => {
                            setLink(editor, text, url);
                            element.visible = false;
                        },
                        class: index_css_2.buttonHoverStyle
                    });
                    return link;
                }
            }
        ];
    };
    function setBlockType(editor, item) {
        const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
        editor.focus();
        for (const block of selectedBlocks) {
            editor.updateBlock(block, {
                type: item.type,
                props: item.props,
            });
        }
    }
    function setAlignment(editor, textAlignment) {
        const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
        editor.focus();
        for (const block of selectedBlocks) {
            editor.updateBlock(block, {
                props: { textAlignment }
            });
        }
    }
    function setColor(editor, type, color) {
        editor.focus();
        const prop = type === 'text' ? 'textColor' : 'backgroundColor';
        color === "default"
            ? editor.removeStyles({ [prop]: color })
            : editor.addStyles({ [prop]: color });
    }
    function setLink(editor, text, url) {
        editor.createLink(url, text || editor.getSelectedText());
        editor.focus();
    }
    const addFormattingToolbar = async (editor, parent) => {
        let element;
        let buttonList = getToolbarButtons(editor);
        editor.formattingToolbar.onUpdate(async (formattingToolbarState) => {
            if (!element) {
                element = await (0, utils_3.createParent)();
                for (let props of buttonList) {
                    if (props.customControl) {
                        const elm = props.customControl(element);
                        element.appendChild(elm);
                    }
                    else {
                        const btn = (0, utils_3.createButton)(props, element);
                        element.appendChild(btn);
                    }
                }
                element.style.display = "none";
                parent.appendChild(element);
            }
            if (formattingToolbarState.show) {
                const wrappers = parent.querySelectorAll('.wrapper');
                for (let wrapper of wrappers) {
                    wrapper.visible = false;
                }
                element.visible = true;
                element.style.top = `${formattingToolbarState.referencePos.top}px`;
                const newPos = formattingToolbarState.referencePos.x + element.offsetWidth;
                const newLeft = formattingToolbarState.referencePos.x - (element.offsetWidth / 2);
                let left = '';
                let right = '';
                if (newPos >= parent.offsetWidth) {
                    left = 'auto';
                    right = '0px';
                }
                else {
                    left = `${Math.max(newLeft, 0)}px`;
                    right = '';
                }
                element.style.left = left;
                element.style.right = right;
            }
            else {
                console.log('hide formatting toolbar');
            }
        });
    };
    exports.addFormattingToolbar = addFormattingToolbar;
});
define("@scom/scom-editor/blocks/addSideMenu.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/blocks/utils.ts", "@scom/scom-editor/components/index.ts"], function (require, exports, components_11, utils_4, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addSideMenu = void 0;
    const Theme = components_11.Styles.Theme.ThemeVars;
    const getToolbarButtons = (editor, sideMenuState) => {
        const iconProps = { width: '0.75rem', height: '0.75rem', fill: Theme.text.primary };
        return [
            {
                icon: { ...iconProps, name: 'plus' },
                padding: { top: 0, bottom: 0, left: '0.25rem', right: '0.25rem' },
                minWidth: 0,
                onClick: () => {
                    editor.sideMenu.addBlock();
                }
            },
            {
                customControl: () => {
                    const currentBlock = sideMenuState.block;
                    const dragBtn = new index_2.ScomEditorSideMenu(undefined, {
                        display: 'inline-flex',
                        grid: { verticalAlignment: 'center' },
                        padding: { top: 0, bottom: 0, left: '0.25rem', right: '0.25rem' },
                        height: '100%',
                        minHeight: '1.875rem',
                        block: currentBlock,
                        onSetColor: (type, color) => updateColor(editor, currentBlock, type, color),
                        onDeleted: (block) => { editor.removeBlocks([block]); }
                    });
                    dragBtn.addEventListener("dragstart", editor.sideMenu.blockDragStart);
                    dragBtn.addEventListener("dragend", editor.sideMenu.blockDragEnd);
                    dragBtn.draggable = true;
                    return dragBtn;
                }
            }
        ];
    };
    function updateColor(editor, currentBlock, type, color) {
        const prop = type === 'text' ? 'textColor' : 'backgroundColor';
        editor.updateBlock(currentBlock, {
            props: { [prop]: color }
        });
    }
    const addSideMenu = (editor, parent) => {
        let element;
        let buttonList = [];
        editor.sideMenu.onUpdate(async (sideMenuState) => {
            if (!element) {
                element = await (0, utils_4.createParent)({
                    border: { radius: '0px', style: 'none' },
                    background: { color: 'transparent' },
                    boxShadow: 'none'
                });
                buttonList = getToolbarButtons(editor, sideMenuState);
                for (let props of buttonList) {
                    if (props.customControl) {
                        const elm = props.customControl(element);
                        element.appendChild(elm);
                    }
                    else {
                        const btn = (0, utils_4.createButton)(props, element);
                        element.appendChild(btn);
                    }
                }
                element.visible = false;
                parent.appendChild(element);
            }
            if (sideMenuState.show) {
                element.visible = true;
                // const menuElm = element.querySelector('i-scom-editor-side-menu') as ScomEditorSideMenu;
                // if (menuElm) menuElm.clear();
                // TODO: check height, update block
                element.style.top = `${sideMenuState.referencePos.top - element.offsetHeight - 28}px`;
                element.style.left = `${0}px`;
            }
            else {
                // element.visible = false;
            }
        });
    };
    exports.addSideMenu = addSideMenu;
});
define("@scom/scom-editor/blocks/addSlashMenu.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/blocks/utils.ts"], function (require, exports, components_12, utils_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addSlashMenu = void 0;
    const addSlashMenu = (editor, parent) => {
        let element;
        async function updateItems(items, onClick, selected) {
            element.clearInnerHTML();
            const wrapper = await components_12.VStack.create({
                gap: '0.25rem',
                padding: { left: '0.25rem', right: '0.25rem' }
            });
            for (let item of items) {
                const hstack = new components_12.HStack(wrapper, {
                    padding: { top: '0.675rem', bottom: '0.675rem', left: '0.75rem', right: '0.75rem' },
                    onClick: () => onClick(item)
                });
                const label = new components_12.Label(hstack, {
                    caption: item.name
                });
                hstack.append(label);
                wrapper.append(hstack);
            }
            const domItems = items.map((val, i) => {
                return {
                    text: val.name,
                    icon: { name: 'heading' },
                    onClick: () => onClick(val)
                };
            });
            element.append(wrapper);
            return domItems;
        }
        editor.slashMenu.onUpdate(async (slashMenuState) => {
            if (!element) {
                element = await (0, utils_5.createParent)();
                parent.appendChild(element);
            }
            if (slashMenuState.show) {
                updateItems(slashMenuState.filteredItems, editor.slashMenu.itemCallback, slashMenuState.keyboardHoveredItemIndex);
                element.visible = true;
                element.style.top = slashMenuState.referencePos.top + "px";
                element.style.left =
                    slashMenuState.referencePos.x - element.offsetWidth + "px";
            }
            else {
                // element.visible = false;
            }
        });
    };
    exports.addSlashMenu = addSlashMenu;
});
define("@scom/scom-editor/blocks/addHyperlinkToolbar.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/blocks/utils.ts", "@scom/scom-editor/blocks/index.css.ts", "@scom/scom-editor/components/index.ts"], function (require, exports, components_13, utils_6, index_css_3, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addHyperlinkToolbar = void 0;
    const Theme = components_13.Styles.Theme.ThemeVars;
    const getToolbarButtons = (editor, hyperlinkToolbarState, parent) => {
        const iconProps = { width: '0.75rem', height: '0.75rem', fill: Theme.text.primary };
        const toolTipProps = { placement: 'bottom' };
        return [
            {
                customControl: () => {
                    let link = new index_3.ScomEditorLink(undefined, {
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
                            parent.visible = false;
                        },
                        class: index_css_3.buttonHoverStyle
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
                    parent.visible = false;
                }
            }
        ];
    };
    const addHyperlinkToolbar = async (editor, parent) => {
        let element;
        let buttonList = [];
        editor.hyperlinkToolbar.onUpdate(async (hyperlinkToolbarState) => {
            if (!element) {
                element = await (0, utils_6.createParent)();
                buttonList = getToolbarButtons(editor, hyperlinkToolbarState, element);
                for (let props of buttonList) {
                    if (props.customControl) {
                        const elm = props.customControl(element);
                        element.appendChild(elm);
                    }
                    else {
                        const btn = (0, utils_6.createButton)(props, element);
                        element.appendChild(btn);
                    }
                }
                element.visible = false;
                parent.appendChild(element);
            }
            if (hyperlinkToolbarState.show) {
                const wrappers = parent.querySelectorAll('.wrapper');
                for (let wrapper of wrappers) {
                    wrapper.visible = false;
                }
                element.visible = true;
                element.style.top = `${hyperlinkToolbarState.referencePos.top - (element.offsetHeight - 10)}px`;
                element.style.left = hyperlinkToolbarState.referencePos.x - element.offsetWidth + "px";
            }
            else {
                element.style.top = `${hyperlinkToolbarState.referencePos.top - (element.offsetHeight - 10)}px`;
                element.style.left = hyperlinkToolbarState.referencePos.x - element.offsetWidth + "px";
            }
        });
    };
    exports.addHyperlinkToolbar = addHyperlinkToolbar;
});
define("@scom/scom-editor/blocks/index.ts", ["require", "exports", "@scom/scom-editor/blocks/addFormattingToolbar.ts", "@scom/scom-editor/blocks/addSideMenu.ts", "@scom/scom-editor/blocks/addSlashMenu.ts", "@scom/scom-editor/blocks/addHyperlinkToolbar.ts"], function (require, exports, addFormattingToolbar_1, addSideMenu_1, addSlashMenu_1, addHyperlinkToolbar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addHyperlinkToolbar = exports.addSlashMenu = exports.addSideMenu = exports.addFormattingToolbar = void 0;
    Object.defineProperty(exports, "addFormattingToolbar", { enumerable: true, get: function () { return addFormattingToolbar_1.addFormattingToolbar; } });
    Object.defineProperty(exports, "addSideMenu", { enumerable: true, get: function () { return addSideMenu_1.addSideMenu; } });
    Object.defineProperty(exports, "addSlashMenu", { enumerable: true, get: function () { return addSlashMenu_1.addSlashMenu; } });
    Object.defineProperty(exports, "addHyperlinkToolbar", { enumerable: true, get: function () { return addHyperlinkToolbar_1.addHyperlinkToolbar; } });
});
define("@scom/scom-editor", ["require", "exports", "@ijstech/components", "@scom/scom-editor/blocks/index.ts"], function (require, exports, components_14, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditor = void 0;
    const Theme = components_14.Styles.Theme.ThemeVars;
    const path = components_14.application.currentModuleDir;
    components_14.RequireJS.config({
        paths: {
            'blocknote': `${path}/lib/@blocknote/blocknote.bundled.umd.js`
        }
    });
    const libPlugins = [
        'blocknote'
    ];
    const cssPath = `${path}/lib/@blocknote/style.css`;
    let ScomEditor = class ScomEditor extends components_14.Module {
        constructor(parent, options) {
            super(parent, options);
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
            const self = this;
            this._editor = new this._blocknoteObj.BlockNoteEditor({
                parentElement: self.pnlEditor,
                onEditorContentChange: (editor) => {
                    if (this.onChanged)
                        this.onChanged(editor.topLevelBlocks);
                },
                domAttributes: {
                    editor: {
                        class: "scom-editor"
                    }
                }
            });
            (0, index_4.addSideMenu)(this._editor, this.pnlEditor);
            (0, index_4.addFormattingToolbar)(this._editor, this.pnlEditor);
            (0, index_4.addSlashMenu)(this._editor, this.pnlEditor);
            (0, index_4.addHyperlinkToolbar)(this._editor, this.pnlEditor);
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
                components_14.RequireJS.require(libPlugins, (blocknote) => {
                    resolve(blocknote);
                });
            });
        }
        init() {
            super.init();
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            this.initEditor();
        }
        render() {
            return (this.$render("i-panel", { id: "pnlEditor", background: { color: 'inherit' }, font: { color: 'inherit' }, border: { radius: 'inherit' } }));
        }
    };
    ScomEditor = __decorate([
        (0, components_14.customElements)('i-scom-editor')
    ], ScomEditor);
    exports.ScomEditor = ScomEditor;
});
