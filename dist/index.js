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
define("@scom/scom-editor/components/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customPaddingStyle = exports.customPreStyle = exports.modalStyle = exports.customModalStyle = exports.formStyle = exports.settingStyle = exports.buttonHoverStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.buttonHoverStyle = components_1.Styles.style({
        pointerEvents: 'auto',
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
    exports.formStyle = components_1.Styles.style({
        $nest: {
            'i-scom-token-input > i-hstack > i-vstack': {
                margin: '0 !important'
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
    exports.modalStyle = components_1.Styles.style({
        $nest: {
            '.modal > div:nth-child(2)': {
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            },
            'i-scom-storage': {
                display: 'block',
                width: '100%',
                height: 'calc(100% - 1.5rem)',
                overflow: 'hidden'
            }
        }
    });
    exports.customPreStyle = components_1.Styles.style({
        $nest: {
            'pre': {
                margin: 0,
                padding: 0,
            }
        }
    });
    exports.customPaddingStyle = components_1.Styles.style({
        paddingLeft: '0px !important',
        paddingRight: '0px !important'
    });
});
define("@scom/scom-editor/global/helper.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getChartTypes = exports.setChartTypes = exports.getConfigs = exports.getConfig = exports.addConfig = exports.getBlockFromExtension = exports.getFileType = exports.getFileContent = void 0;
    ///<amd-module name='@scom/scom-editor/global/helper.ts'/> 
    const getFileContent = async (url) => {
        let result = '';
        if (url) {
            const response = await fetch(url);
            try {
                if (response.ok) {
                    result = await response.text();
                }
            }
            catch (err) { }
        }
        return result;
    };
    exports.getFileContent = getFileContent;
    function getFileType(ext) {
        let result = '';
        const video = ['mp4', 'webm', 'mov', 'm3u8'];
        const image = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
        if (video.includes(ext)) {
            result = 'video';
        }
        else if (image.includes(ext)) {
            result = 'image';
        }
        return result;
    }
    exports.getFileType = getFileType;
    async function getBlockFromExtension(url) {
        let block = null;
        const ext = url.split('.').pop().toLowerCase();
        const fileType = getFileType(ext);
        switch (fileType) {
            case 'image':
                block = {
                    type: "imageWidget",
                    props: { url }
                };
                break;
            case 'video':
                block = {
                    type: "video",
                    props: { url }
                };
                break;
            default:
                block = {
                    type: 'paragraph',
                    content: [
                        {
                            type: "link",
                            content: [{
                                    type: "text",
                                    text: url,
                                    styles: {}
                                }],
                            href: url
                        }
                    ]
                };
                break;
        }
        return block;
    }
    exports.getBlockFromExtension = getBlockFromExtension;
    const state = {
        configs: {},
        chartTypes: [],
        slashMenus: {}
    };
    const addConfig = (key, value) => {
        state.configs[key] = value;
    };
    exports.addConfig = addConfig;
    const getConfig = (key) => {
        return state.configs[key];
    };
    exports.getConfig = getConfig;
    const getConfigs = () => {
        return state.configs;
    };
    exports.getConfigs = getConfigs;
    const setChartTypes = (chartTypes) => {
        state.chartTypes = chartTypes || [];
    };
    exports.setChartTypes = setChartTypes;
    const getChartTypes = () => {
        return state.chartTypes || [];
    };
    exports.getChartTypes = getChartTypes;
});
define("@scom/scom-editor/global/index.ts", ["require", "exports", "@scom/scom-editor/global/helper.ts"], function (require, exports, helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(helper_1, exports);
});
define("@scom/scom-editor/components/utils.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.css.ts", "@scom/scom-editor/global/index.ts"], function (require, exports, components_2, index_css_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_LANGUAGE = exports.revertHtmlTags = exports.escapeHTML = exports.getChartTypeOptions = exports.getPlacement = exports.removeContainer = exports.getModalContainer = exports.getToolbars = exports.setToolbar = exports.removeToolbar = exports.getToolbar = exports.createModal = exports.createParent = exports.createButton = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
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
    const getChartTypeOptions = () => {
        return [...(0, index_1.getChartTypes)()].map(type => ({ value: type, label: type.split('-')[1] }));
    };
    exports.getChartTypeOptions = getChartTypeOptions;
    const escapeHTML = (str) => {
        return (str || '').replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };
    exports.escapeHTML = escapeHTML;
    const revertHtmlTags = (str) => {
        return (str || '').replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    };
    exports.revertHtmlTags = revertHtmlTags;
    exports.DEFAULT_LANGUAGE = 'javascript';
});
define("@scom/scom-editor/languages/main.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-editor/languages/main.json.ts'/> 
    exports.default = {
        "en": {
            "add_column_left": "Add column left",
            "add_column_right": "Add column right",
            "add_row_above": "Add row above",
            "add_row_below": "Add row below",
            "add": "Add",
            "align_text_center": "Align Text Center",
            "align_text_left": "Align Text Left",
            "align_text_right": "Align Text Right",
            "background": "Background",
            "bold": "Bold",
            "chart_title": "Chart Title",
            "chart_type": "Chart Type",
            "colors": "Colors",
            "confirm": "Confirm",
            "create_link": "Create Link",
            "delete_column": "Delete column",
            "delete_row": "Delete row",
            "delete": "Delete",
            "edit_title": "Edit Title",
            "edit_url": "Edit URL",
            "edit": "Edit",
            "embed_image": "Embed Image",
            "embed": "Embed",
            "enter_url": "Enter Url",
            "indent": "Indent",
            "italicize": "Italicize",
            "outdent": "Outdent",
            "replace_image": "Replace Image",
            "strike_through": "Strike-through",
            "text": "Text",
            "underline": "Underline",
            "upload_failed": "Error: Upload failed",
            "upload_image": "Upload Image",
            "upload": "Upload"
        },
        "zh-hant": {
            "add_column_left": "新增左列",
            "add_column_right": "新增右列",
            "add_row_above": "新增上列",
            "add_row_below": "新增下列",
            "add": "新增",
            "align_text_center": "文字置中",
            "align_text_left": "文字靠左",
            "align_text_right": "文字靠右",
            "background": "背景",
            "bold": "粗體",
            "chart_title": "圖表標題",
            "chart_type": "圖表類型",
            "colors": "顏色",
            "confirm": "確認",
            "create_link": "建立連結",
            "delete_column": "刪除列",
            "delete_row": "刪除行",
            "delete": "刪除",
            "edit_title": "編輯標題",
            "edit_url": "編輯 URL",
            "edit": "編輯",
            "embed_image": "嵌入圖片",
            "embed": "嵌入",
            "enter_url": "輸入 URL",
            "indent": "縮排",
            "italicize": "斜體",
            "outdent": "取消縮排",
            "replace_image": "取代圖片",
            "strike_through": "刪除線",
            "text": "文字",
            "underline": "底線",
            "upload_failed": "錯誤: 上傳失敗",
            "upload_image": "上傳圖片",
            "upload": "上傳"
        },
        "vi": {
            "add_column_left": "Thêm cột bên trái",
            "add_column_right": "Thêm cột bên phải",
            "add_row_above": "Thêm dòng trên",
            "add_row_below": "Thêm dòng dưới",
            "add": "Thêm",
            "align_text_center": "Căn giữa",
            "align_text_left": "Căn trái",
            "align_text_right": "Căn phải",
            "background": "Nền",
            "bold": "Đậm",
            "chart_title": "Tiêu đề biểu đồ",
            "chart_type": "Loại biểu đồ",
            "colors": "Màu sắc",
            "confirm": "Xác nhận",
            "create_link": "Tạo liên kết",
            "delete_column": "Xóa cột",
            "delete_row": "Xóa dòng",
            "delete": "Xóa",
            "edit_title": "Chỉnh sửa tiêu đề",
            "edit_url": "Chỉnh sửa URL",
            "edit": "Chỉnh sửa",
            "embed_image": "Nhúng hình ảnh",
            "embed": "Nhúng",
            "enter_url": "Nhập URL",
            "indent": "Thụt lề",
            "italicize": "Nghiêng",
            "outdent": "Dịch sang trái",
            "replace_image": "Thay thế hình ảnh",
            "strike_through": "Gạch ngang",
            "text": "Văn bản",
            "underline": "Gạch chân",
            "upload_failed": "Lỗi: Tải lên thất bại",
            "upload_image": "Tải lên hình ảnh",
            "upload": "Tải lên"
        }
    };
});
define("@scom/scom-editor/languages/slashMenu.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-editor/languages/slashMenu.json.ts'/> 
    exports.default = {
        "en": {
            "basic_blocks": "Basic blocks",
            "bullet_list": "Bullet List",
            "chart": "Chart",
            "code_block": "Code block",
            "create_a_table": "Create a table",
            "file": "File",
            "heading_2": "Heading 2",
            "heading_3": "Heading 3",
            "heading_4": "Heading 4",
            "heading_5": "Heading 5",
            "heading_6": "Heading 6",
            "heading": "Heading 1",
            "headings": "Headings",
            "image_widget": "Image",
            "image": "Image",
            "insert_a_chart_widget": "Insert a chart widget",
            "insert_a_code_block": "Insert a code block",
            "insert_a_file": "Insert a file",
            "insert_a_nft_minter_widget": "Insert a NFT Minter widget",
            "insert_a_staking_widget": "Insert a staking widget",
            "insert_a_swap_widget": "Insert a swap widget",
            "insert_a_twitter_post": "Insert a tweet post",
            "insert_a_video": "Insert a video",
            "insert_a_voting_widget": "Insert a voting widget",
            "insert_an_image": "Insert an image",
            "insert_an_oswap_nft_widget": "Insert an Oswap NFT",
            "insert_an_xchain_widget": "Insert an xchain widget",
            "media": "Media",
            "nft_minter": "NFT Minter",
            "numbered_list": "Numbered List",
            "oswap_nft": "Oswap NFT",
            "paragraph": "Paragraph",
            "staking": "Staking",
            "swap": "Swap",
            "table": "Table",
            "tweet": "Tweet",
            "used_for_a_top_level_heading": "Used for a top-level heading",
            "used_for_key_sections": "Used for key sections",
            "used_for_subsections_and_group_headings": "Used for subsections and group headings",
            "used_for_the_body_of_your_document": "Used for the body of your document",
            "used_to_display_a_numbered_list": "Used to display a numbered list",
            "used_to_display_an_unordered_list": "Used to display an unordered list",
            "video": "Video",
            "voting": "Voting",
            "widget": "Widget",
            "xchain": "Xchain"
        },
        "zh-hant": {
            "basic_blocks": "基本區塊",
            "bullet_list": "項目符號清單",
            "chart": "圖表",
            "code_block": "程式碼區塊",
            "create_a_table": "建立表格",
            "file": "檔案",
            "heading_2": "標題 2",
            "heading_3": "標題 3",
            "heading_4": "標題 4",
            "heading_5": "標題 5",
            "heading_6": "標題 6",
            "heading": "標題 1",
            "headings": "標題",
            "image_widget": "圖片",
            "image": "圖片",
            "insert_a_chart_widget": "插入圖表小工具",
            "insert_a_code_block": "插入程式碼區塊",
            "insert_a_file": "插入檔案",
            "insert_a_nft_minter_widget": "插入 NFT Minter 小工具",
            "insert_a_staking_widget": "插入 Staking 小工具",
            "insert_a_swap_widget": "插入 Swap 小工具",
            "insert_a_twitter_post": "插入推文",
            "insert_a_video": "插入影片",
            "insert_a_voting_widget": "插入投票小工具",
            "insert_an_image": "插入圖片",
            "insert_an_oswap_nft_widget": "插入 Oswap NFT",
            "insert_an_xchain_widget": "插入 xchain 小工具",
            "media": "媒體",
            "nft_minter": "NFT Minter",
            "numbered_list": "編號清單",
            "oswap_nft": "Oswap NFT",
            "paragraph": "段落",
            "staking": "Staking",
            "swap": "Swap",
            "table": "表格",
            "tweet": "推文",
            "used_for_a_top_level_heading": "用於頂級標題",
            "used_for_key_sections": "用於關鍵部分",
            "used_for_subsections_and_group_headings": "用於子部分和群組標題",
            "used_for_the_body_of_your_document": "用於文檔的主體",
            "used_to_display_a_numbered_list": "用於顯示編號清單",
            "used_to_display_an_unordered_list": "用於顯示無序列表",
            "video": "影片",
            "voting": "投票",
            "widget": "小工具",
            "xchain": "Xchain"
        },
        "vi": {
            "basic_blocks": "Khối cơ bản",
            "bullet_list": "Danh sách không sắp xếp",
            "chart": "Biểu đồ",
            "code_block": "Khối mã nguồn",
            "create_a_table": "Tạo bảng",
            "file": "Tập tin",
            "heading_2": "Tiêu đề 2",
            "heading_3": "Tiêu đề 3",
            "heading_4": "Tiêu đề 4",
            "heading_5": "Tiêu đề 5",
            "heading_6": "Tiêu đề 6",
            "heading": "Tiêu đề 1",
            "headings": "Tiêu đề",
            "image_widget": "Hình ảnh",
            "image": "Hình ảnh",
            "insert_a_chart_widget": "Chèn một biểu đồ",
            "insert_a_code_block": "Chèn một khối mã nguồn",
            "insert_a_file": "Chèn một tập tin",
            "insert_a_nft_minter_widget": "Chèn một tiện ích NFT Minter",
            "insert_a_staking_widget": "Chèn một tiện ích staking",
            "insert_a_swap_widget": "Chèn một tiện ích hoán đổi",
            "insert_a_twitter_post": "Chèn một bài đăng tweet",
            "insert_a_video": "Chèn một video",
            "insert_a_voting_widget": "Chèn một tiện ích bình chọn",
            "insert_an_image": "Chèn một hình ảnh",
            "insert_an_oswap_nft_widget": "Chèn một tiện ích Oswap NFT",
            "insert_an_xchain_widget": "Chèn một tiện ích xchain",
            "media": "Phương tiện",
            "nft_minter": "NFT Minter",
            "numbered_list": "Danh sách có sắp xếp",
            "oswap_nft": "Oswap NFT",
            "paragraph": "Đoạn văn",
            "staking": "Staking",
            "swap": "Hoán đổi",
            "table": "Bảng",
            "tweet": "Tweet",
            "used_for_a_top_level_heading": "Được sử dụng cho tiêu đề cấp cao nhất",
            "used_for_key_sections": "Được sử dụng cho các phần quan trọng",
            "used_for_subsections_and_group_headings": "Được sử dụng cho các phần phụ và tiêu đề nhóm",
            "used_for_the_body_of_your_document": "Được dùng cho nội dung tài liệu",
            "used_to_display_a_numbered_list": "Được dùng để hiển thị danh sách sắp xếp",
            "used_to_display_an_unordered_list": "Được dùng để hiển thị danh sách không được sắp xếp",
            "video": "Video",
            "voting": "Bình chọn",
            "widget": "Tiện ích",
            "xchain": "Xchain"
        }
    };
});
define("@scom/scom-editor/languages/index.ts", ["require", "exports", "@scom/scom-editor/languages/main.json.ts", "@scom/scom-editor/languages/slashMenu.json.ts"], function (require, exports, main_json_1, slashMenu_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.slashMenuJson = exports.mainJson = void 0;
    exports.mainJson = main_json_1.default;
    exports.slashMenuJson = slashMenu_json_1.default;
});
define("@scom/scom-editor/components/colorPicker.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_3, utils_1, index_2) {
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
        showModal(parent, popupPlacement) {
            (0, utils_1.getModalContainer)().appendChild(this.mdColorPicker);
            if (parent)
                this.mdColorPicker.linkTo = parent;
            this.mdColorPicker.position = 'fixed';
            const { top, height } = this.getBoundingClientRect();
            const maxHeight = window.innerHeight - (top + height);
            this.pnlColors.maxHeight = maxHeight <= 200 ? 200 : maxHeight;
            if (maxHeight <= 200) {
                this.mdColorPicker.popupPlacement = 'right';
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
                this.$render("i-label", { caption: `$${type}`, font: { size: '0.75rem', transform: 'capitalize', weight: 500 }, lineHeight: 1.55, padding: { top: '0.313rem', bottom: '0.313rem', left: '0.75rem', right: '0.75rem' } }),
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
            this.i18n.init({ ...index_2.mainJson });
            super.init();
            this.onSelected = this.getAttribute('onSelected', true) || this.onSelected;
            this.onClosed = this.getAttribute('onClosed', true) || this.onClosed;
            const textColor = this.getAttribute('textColor', true, 'default');
            const backgroundColor = this.getAttribute('backgroundColor', true, 'default');
            this.setData({ textColor, backgroundColor });
        }
        render() {
            return (this.$render("i-modal", { id: "mdColorPicker", popupPlacement: "bottom", minWidth: 200, maxWidth: 200, isChildFixed: true, 
                // closeOnScrollChildFixed={true}
                border: { radius: '0.375rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, boxShadow: Theme.shadows[1], showBackdrop: false, zIndex: 30001, visible: false, onClose: this.handleClose },
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
            this.btnColor.font = { size: '0.75rem', color: this.textColor === 'default' ? Theme.text.primary : this.textColor };
            this.btnColor.background.color = this.backgroundColor === 'default' ? 'transparent' : this.backgroundColor;
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
        (0, components_5.customElements)('i-scom-editor-toolbar-dropdown')
    ], ScomEditorToolbarDropdown);
    exports.ScomEditorToolbarDropdown = ScomEditorToolbarDropdown;
});
define("@scom/scom-editor/components/blockTypeButton.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-blocknote-sdk"], function (require, exports, components_6, scom_blocknote_sdk_1) {
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
            return this._data.items ?? scom_blocknote_sdk_1.defaultBlockTypeItems;
        }
        set items(value) {
            this._data.items = value ?? scom_blocknote_sdk_1.defaultBlockTypeItems;
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
        (0, components_6.customElements)('i-scom-editor-block-type')
    ], ScomEditorBlockType);
    exports.ScomEditorBlockType = ScomEditorBlockType;
});
define("@scom/scom-editor/components/linkModal.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_7, utils_3, index_3) {
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
        showModal(parent) {
            (0, utils_3.getModalContainer)().appendChild(this.mdLink);
            this.mdLink.position = 'fixed';
            this.inputLink.placeholder = this.i18n.get('enter_url');
            this.inputText.placeholder = this.i18n.get('edit_title');
            if (parent)
                this.mdLink.linkTo = parent;
            this.inputLink.focus();
            this.mdLink.refresh();
            this.mdLink.visible = true;
        }
        closeModal() {
            this.mdLink.visible = false;
        }
        handleInput(target, event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.key === 'Enter' && target.value) {
                if (this.onInputChanged)
                    this.onInputChanged(target, event);
            }
        }
        handleClosed() {
            if (this.mdLink)
                this.mdLink.remove();
        }
        init() {
            this.i18n.init({ ...index_3.mainJson });
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
                        this.$render("i-input", { id: "inputLink", width: '100%', height: '2rem', border: { style: 'none' }, background: { color: Theme.background.modal }, font: { size: '0.75rem', color: Theme.text.primary }, placeholder: '$edit_url', onKeyUp: this.handleInput })),
                    this.$render("i-hstack", { verticalAlignment: 'center', gap: "0.5rem", border: { radius: '0.25rem' }, background: { color: Theme.background.modal } },
                        this.$render("i-icon", { name: "paragraph", width: '0.75rem', height: '0.75rem', fill: Theme.text.primary, stack: { basis: '1.875rem', shrink: '0' } }),
                        this.$render("i-input", { id: "inputText", width: '100%', height: '2rem', border: { style: 'none' }, background: { color: Theme.background.modal }, font: { size: '0.75rem', color: Theme.text.primary }, placeholder: '$edit_title', onKeyUp: this.handleInput })))));
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
            if (this._data.url) {
                if (this.setLink)
                    this.setLink(this._data.text, this._data.url);
                this.mdCreateLink.closeModal();
            }
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
        (0, components_8.customElements)('i-scom-editor-link')
    ], ScomEditorLink);
    exports.ScomEditorLink = ScomEditorLink;
});
define("@scom/scom-editor/components/dragHandle.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/index.css.ts", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_9, utils_4, index_css_2, index_4) {
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
                    title: `<i-label caption="$delete"></i-label>`,
                    id: 'delete'
                },
                {
                    title: `<i-hstack verticalAlignment="center" horizontalAlignment="space-between" width="100%">
        <i-label caption="$colors"></i-label>
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
                this.mdPicker.showModal(this.mdMenu, 'right');
                if (this.freezeMenu)
                    this.freezeMenu();
            }
        }
        onShowMenu(parent) {
            (0, utils_4.getModalContainer)().appendChild(this.mdMenu);
            this.mdMenu.showBackdrop = false;
            this.mdMenu.linkTo = parent;
            this.mdMenu.popupPlacement = 'left';
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
            this.i18n.init({ ...index_4.mainJson });
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
            return (this.$render("i-modal", { id: "mdMenu", popupPlacement: "left", showBackdrop: false, minWidth: 0, maxWidth: '10rem', visible: false, position: "absolute", zIndex: 9999, boxShadow: Theme.shadows[1], class: index_css_2.customModalStyle, onOpen: this.onModalOpen, onClose: this.onModalClose },
                this.$render("i-panel", null,
                    this.$render("i-menu", { id: "menuElm", padding: { top: '0rem', bottom: '0rem', left: '0.675rem', right: '0.675rem' }, font: { color: Theme.text.primary, size: '0.75rem' }, width: '100%', mode: "vertical", data: this._menuData, background: { color: Theme.background.modal }, onItemClick: this.handleMenu }),
                    this.$render("i-scom-editor-color-picker", { id: "mdPicker", onSelected: this.onColorClicked }))));
        }
    };
    ScomEditorDragHandle = __decorate([
        (0, components_9.customElements)('i-scom-editor-drag-handle')
    ], ScomEditorDragHandle);
    exports.ScomEditorDragHandle = ScomEditorDragHandle;
});
define("@scom/scom-editor/components/settingsForm.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.css.ts", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_10, index_css_3, utils_5, index_5) {
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
            this.chartActions = new Map();
            this.onChartNameChanged = this.onChartNameChanged.bind(this);
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
        }
        async setData(value) {
            this._data = value;
            await this.renderForm();
        }
        async renderForm() {
            const { action, onConfirm, block } = this.data;
            this.pnlForm.visible = false;
            this.actionForm.visible = false;
            this.pnlForm.clearInnerHTML();
            if (action.customUI) {
                if (block.type === 'chart') {
                    const types = (0, utils_5.getChartTypeOptions)();
                    this.chartActions.set(block.props.name, action);
                    this.pnlForm.append(this.$render("i-vstack", { gap: '0.625rem', width: '100%' },
                        this.$render("i-label", { caption: '$chart_type' }),
                        this.$render("i-combo-box", { id: "cbName", items: types, value: block.props?.name, width: '100%', height: '2.625rem', onChanged: this.onChartNameChanged })));
                    this.pnlForm.append(this.$render("i-vstack", { gap: '0.625rem', width: '100%' },
                        this.$render("i-label", { caption: '$chart_title' }),
                        this.$render("i-input", { id: 'inputTitle', width: '100%', height: '2.625rem', placeholder: '$enter_title', background: { color: Theme.background.modal }, font: { size: '0.75rem', color: Theme.text.primary }, value: block.props?.title || '' })));
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
                        caption: '$confirm',
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
            this.i18n.init({ ...index_5.mainJson });
            super.init();
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
        }
        render() {
            return (this.$render("i-panel", { padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-form", { id: "actionForm", visible: false, class: index_css_3.formStyle }),
                this.$render("i-vstack", { id: "pnlForm", gap: '0.625rem', width: '100%', visible: false, class: index_css_3.settingStyle })));
        }
    };
    ScomEditorSettingsForm = __decorate([
        (0, components_10.customElements)('i-scom-editor-settings-form')
    ], ScomEditorSettingsForm);
    exports.ScomEditorSettingsForm = ScomEditorSettingsForm;
});
define("@scom/scom-editor/components/sideMenu.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/settingsForm.tsx", "@scom/scom-editor/components/index.css.ts", "@scom/scom-blocknote-sdk", "@scom/scom-editor/global/index.ts", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_11, settingsForm_1, index_css_4, scom_blocknote_sdk_2, index_6, index_7) {
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
            if (value.id && value.id === this._data?.block?.id &&
                value.type == this._data?.block?.type) {
                this._data.block = value;
                return;
            }
            this._data.block = value;
            this.dragHandle.block = value;
            // this.id = `side-${this.block.id}`;
            this.updateButtons();
        }
        get editor() {
            return this._data.editor;
        }
        set editor(value) {
            this._data.editor = value;
        }
        get isEditShown() {
            return this.block?.type && !scom_blocknote_sdk_2.BasicBlockTypes.includes(this.block.type);
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
            // this.id = `side-${this.block.id}`;
        }
        updateButtons() {
            this.btnEdit.visible = this.isEditShown;
            this.btnAdd.visible = !this.isEditShown;
        }
        openConfig(block, module) {
            const isCustomBlock = block?.type && !scom_blocknote_sdk_2.BasicBlockTypes.includes(block.type);
            if (isCustomBlock && !this.initedMap.has(block.id)) {
                const editAction = this.getActions(module)[0];
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
            if (this.actionForm)
                this.actionForm.closeModal();
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
            const blockType = this.block.type;
            if (blockType === 'codeBlock') {
                module = blockEl.querySelector('i-scom-editor--code-block');
                editAction = module.getActions();
            }
            else if (blockType === 'chart') {
                module = blockEl.querySelector('i-scom-charts--block');
                editAction = this.getActions(module)[0];
            }
            else if (blockType) {
                const configs = (0, index_6.getConfigs)();
                const moduleName = configs[blockType]?.localPath;
                if (moduleName) {
                    module = blockEl.querySelector(`i-${moduleName}`);
                    editAction = this.getActions(module)[0];
                }
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
                        const defaultChainId = networks[0].chainId;
                        this.updateBlock(block, { tokens, networks, title, logo, category, providers, defaultChainId });
                    }
                    else if (block.type === 'xchain') {
                        const { tokens, networks } = newProps;
                        const defaultChainId = networks[0].chainId;
                        this.updateBlock(block, { tokens, networks, defaultChainId });
                    }
                    else if (block.type === 'chart') {
                        const { name, apiEndpoint, dataSource, queryId, title, options, mode } = newProps;
                        this.updateBlock(block, { name, apiEndpoint, dataSource, queryId, title, options, mode });
                    }
                    else if (block.type === 'staking') {
                        const { chainId, name, desc, logo, getTokenURL, showContractLink, staking } = newProps;
                        this.updateBlock(block, { chainId, name, desc, logo, getTokenURL, showContractLink, staking });
                    }
                    else if (block.type === 'voting') {
                        const { title, backgroundImage, buttons, fontColor } = newProps;
                        this.updateBlock(block, { title, backgroundImage, buttons, fontColor });
                    }
                    else if (block.type === 'nftMinter') {
                        this.updateBlock(block, { ...newProps });
                    }
                    else if (block.type === 'oswapNft') {
                        const { tier, networks, defaultChainId } = newProps;
                        const _defaultChainId = defaultChainId || networks[0]?.chainId;
                        this.updateBlock(block, { tier, networks, defaultChainId: _defaultChainId });
                    }
                    else if (block.type === 'codeBlock') {
                        const { code, language } = newProps;
                        this.updateBlock(block, { code, language });
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
        async renderForm(data) {
            if (!this.actionForm) {
                this.actionForm = new settingsForm_1.ScomEditorSettingsForm();
            }
            const modal = this.actionForm.openModal({
                title: '$edit',
                width: '40rem',
                border: { radius: '0.375rem' },
                onClose: () => {
                    modal.width = '40rem';
                    modal.height = 'auto';
                    modal.border = { radius: '0.375rem' };
                    const wrapper = modal.querySelector('.modal-wrapper');
                    if (wrapper) {
                        wrapper.classList.remove(index_css_4.customPaddingStyle);
                    }
                }
            });
            await this.actionForm.setData(data);
            modal.refresh();
        }
        async updateBlock(block, props) {
            this.editor.updateBlock(block, { props });
        }
        init() {
            this.i18n.init({ ...index_7.mainJson });
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
                    this.$render("i-button", { id: "btnDrag", icon: { name: "grip-vertical", width: '0.75rem', height: '0.75rem', fill: Theme.text.secondary }, background: { color: 'transparent' }, boxShadow: 'none', class: index_css_4.buttonHoverStyle, border: { radius: '0.125rem' }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' }, onClick: this.showDragMenu })),
                this.$render("i-scom-editor-drag-handle", { id: "dragHandle", onSetColor: this.handleSetColor, onDeleted: this.handleDelete })));
        }
    };
    ScomEditorSideMenu = __decorate([
        (0, components_11.customElements)('i-scom-editor-side-menu')
    ], ScomEditorSideMenu);
    exports.ScomEditorSideMenu = ScomEditorSideMenu;
});
define("@scom/scom-editor/components/slashMenu.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts", "@scom/scom-blocknote-sdk", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_12, utils_6, scom_blocknote_sdk_3, index_8) {
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
        get groupData() {
            const result = {};
            const fieldData = (0, scom_blocknote_sdk_3.getExtraFields)();
            for (let item of this.items) {
                const executeFn = item.execute;
                item.execute = (editor) => {
                    const slashMenu = (0, utils_6.getToolbar)('slashMenu');
                    if (slashMenu)
                        slashMenu.visible = false;
                    editor.focus();
                    executeFn(editor);
                };
                let field = fieldData[item.name] || item;
                const groupName = field.group || 'widget';
                const hint = field.hint ? field.hint.replace(/\s/g, '_').toLowerCase() : '';
                if (result[groupName]) {
                    result[groupName].push({ ...field, ...item, hint });
                }
                else {
                    result[groupName] = [{ ...field, ...item, hint }];
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
                    this.$render("i-label", { caption: `$${group.replace(/\s/g, '_').toLowerCase()}`, padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, width: '100%', background: { color: Theme.action.hoverBackground } }),
                    itemsWrap));
                let selectedItem = null;
                for (let i = 0; i < this.groupData[group].length; i++) {
                    const item = this.groupData[group][i];
                    const isSelected = this.items[this.selectedIndex]?.name === item.name;
                    const icon = new components_12.Icon(undefined, { ...item.icon, width: '1rem', height: '1rem' });
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
                                this.$render("i-label", { caption: `$${item.id}`, font: { size: '0.875rem', weight: 500 } }),
                                this.$render("i-label", { caption: item.hint ? `$${item.hint}` : '', font: { size: '0.625rem', weight: 400 } }))),
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
            this.i18n.init({ ...index_8.slashMenuJson });
            super.init();
            this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
            const items = this.getAttribute('items', true);
            const selectedIndex = this.getAttribute('selectedIndex', true);
            if (items)
                this.setData({ items, selectedIndex });
        }
        render() {
            return (this.$render("i-panel", { id: "pnlWrap", minWidth: 300, maxWidth: '100%', height: "auto" },
                this.$render("i-vstack", { id: "pnlSlash", width: '100%', overflow: { y: 'auto' } })));
        }
    };
    ScomEditorSlashMenu = __decorate([
        (0, components_12.customElements)('i-scom-editor-splash-menu')
    ], ScomEditorSlashMenu);
    exports.ScomEditorSlashMenu = ScomEditorSlashMenu;
});
define("@scom/scom-editor/components/imageToolbar.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_13, index_9) {
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
            this.i18n.init({ ...index_9.mainJson });
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
                    this.$render("i-tab", { caption: "$upload", font: { color: Theme.text.primary, size: '0.875rem' }, minHeight: '0px' },
                        this.$render("i-panel", null,
                            this.$render("i-vstack", { id: "pnlLoading", padding: { top: '0.5rem', bottom: '0.5rem' }, visible: false, height: "100%", width: "100%", minHeight: 200, position: "absolute", top: 0, bottom: 0, zIndex: 999, background: { color: Theme.background.main }, class: "i-loading-overlay" },
                                this.$render("i-vstack", { horizontalAlignment: "center", verticalAlignment: "center", position: "absolute", top: "calc(50% - 0.75rem)", left: "calc(50% - 0.75rem)" },
                                    this.$render("i-icon", { class: "i-loading-spinner_icon", name: "spinner", width: 24, height: 24, fill: Theme.colors.primary.main }))),
                            this.$render("i-vstack", { gap: "0.5rem", padding: { left: '0.5rem', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' } },
                                this.$render("i-upload", { id: "btnUpload", caption: '$upload_image', width: '100%', minHeight: '6.25rem', border: { width: '1px', style: 'solid', color: Theme.divider }, font: { size: '0.75rem', color: Theme.text.primary, weight: 600 }, onChanged: this.onFileChanged }),
                                this.$render("i-label", { id: "lblFailed", caption: "$upload_failed", visible: false, font: { color: Theme.colors.error.main, size: '0.75rem' }, class: "text-center" })))),
                    this.$render("i-tab", { caption: "$embed", font: { color: Theme.text.primary, size: '0.875rem' }, minHeight: '0px' },
                        this.$render("i-vstack", { gap: '0.5rem', padding: { left: '0.5rem', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' } },
                            this.$render("i-input", { id: "inputUrl", placeholder: "$enter_url", border: { width: '1px', style: 'solid', color: Theme.divider }, font: { size: '0.75rem', color: Theme.text.primary }, background: { color: 'transparent' }, width: '100%', height: '1.875rem', onChanged: this.handleURLChanged, onKeyDown: this.handleURLEnter }),
                            this.$render("i-button", { id: "btnEmbed", width: '100%', border: { width: '1px', style: 'solid', color: Theme.divider }, font: { size: '0.75rem', color: Theme.text.primary, weight: 600 }, padding: { left: '0.625rem', right: '0.625rem' }, minHeight: '1.875rem', background: { color: 'transparent' }, enabled: false, caption: '$embed_image', onClick: () => this.updateBlock() }))))));
        }
    };
    ScomEditorImageToolbar = __decorate([
        (0, components_13.customElements)('i-scom-editor-image-toolbar')
    ], ScomEditorImageToolbar);
    exports.ScomEditorImageToolbar = ScomEditorImageToolbar;
});
define("@scom/scom-editor/components/formattingToolbar.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts", "@scom/scom-blocknote-sdk", "@scom/scom-editor/components/colorButton.tsx", "@scom/scom-editor/components/index.css.ts", "@scom/scom-editor/components/blockTypeButton.tsx", "@scom/scom-editor/components/linkButton.tsx", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_14, utils_7, scom_blocknote_sdk_4, colorButton_1, index_css_5, blockTypeButton_1, linkButton_1, index_10) {
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
            editor.focus();
            editor.createLink(url, text || editor.getSelectedText());
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
            const blocks = editor.getSelection()?.blocks || [];
            const hasTable = blocks.some(block => block.type === 'table');
            return [
                {
                    icon: { ...iconProps, name: 'image' },
                    tooltip: { ...toolTipProps, content: "$replace_image" },
                    isSelected: false,
                    visible: this.isImageBlock,
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
                            visible: !this.isMediaBlock && !hasTable,
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
                    tooltip: { ...toolTipProps, content: `${this.i18n.get('$bold')} <br/> ${(0, scom_blocknote_sdk_4.formatKeyboardShortcut)("Mod+B")}` },
                    isSelected: editor.getActiveStyles().bold,
                    visible: !this.isMediaBlock,
                    onClick: () => {
                        editor.toggleStyles({ bold: true });
                    }
                },
                {
                    icon: { ...iconProps, name: 'italic' },
                    visible: !this.isMediaBlock,
                    tooltip: { ...toolTipProps, content: `${this.i18n.get('$italicize')} <br/> ${(0, scom_blocknote_sdk_4.formatKeyboardShortcut)("Mod+I")}` },
                    isSelected: editor.getActiveStyles().italic,
                    onClick: () => {
                        editor.toggleStyles({ italic: true });
                    }
                },
                {
                    icon: { ...iconProps, name: 'underline' },
                    visible: !this.isMediaBlock,
                    tooltip: { ...toolTipProps, content: `${this.i18n.get('$underline')} <br/> ${(0, scom_blocknote_sdk_4.formatKeyboardShortcut)("Mod+U")}` },
                    isSelected: editor.getActiveStyles().underline,
                    onClick: () => {
                        editor.toggleStyles({ underline: true });
                    }
                },
                {
                    icon: { ...iconProps, name: 'strikethrough' },
                    visible: !this.isMediaBlock,
                    tooltip: { ...toolTipProps, content: `${this.i18n.get('$strike_through')} <br/>  ${(0, scom_blocknote_sdk_4.formatKeyboardShortcut)("Mod+Shift+X")} or  ${(0, scom_blocknote_sdk_4.formatKeyboardShortcut)("Mod+Shift+Z")}` },
                    isSelected: editor.getActiveStyles().strikethrough,
                    onClick: () => {
                        editor.toggleStyles({ strikethrough: true });
                    }
                },
                {
                    icon: { ...iconProps, name: 'align-left' },
                    visible: !hasTable,
                    tooltip: { ...toolTipProps, content: '$align_text_left' },
                    isSelected: this._block.props?.textAlignment === 'left',
                    onClick: () => {
                        this.setAlignment(editor, 'left');
                    }
                },
                {
                    icon: { ...iconProps, name: 'align-center' },
                    tooltip: { ...toolTipProps, content: '$align_text_center' },
                    visible: !hasTable,
                    isSelected: this._block.props?.textAlignment === 'center',
                    onClick: () => {
                        this.setAlignment(editor, 'center');
                    }
                },
                {
                    icon: { ...iconProps, name: 'align-right' },
                    visible: !hasTable,
                    isSelected: this._block.props?.textAlignment === 'right',
                    tooltip: { ...toolTipProps, content: '$align_text_right' },
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
                    tooltip: { ...toolTipProps, content: '$indent' },
                    onClick: () => {
                    },
                    enabled: false
                },
                {
                    icon: { ...iconProps, name: 'outdent' },
                    tooltip: { ...toolTipProps, content: '$outdent' },
                    onClick: () => {
                    },
                    enabled: false
                },
                {
                    customControl: (element) => {
                        let link = new linkButton_1.ScomEditorLink(undefined, {
                            ...customProps,
                            tooltip: { content: `${this.i18n.get('$create_link')} <br />  ${(0, scom_blocknote_sdk_4.formatKeyboardShortcut)("Mod+K")}`, placement: 'bottom' },
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
                !scom_blocknote_sdk_4.BasicBlockTypes.includes(selectedBlocks[0].type);
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
            this.renderList();
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
            this.i18n.init({ ...index_10.mainJson });
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
define("@scom/scom-editor/components/tableMenu.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_15, index_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorTableMenu = void 0;
    const Theme = components_15.Styles.Theme.ThemeVars;
    let ScomEditorTableMenu = class ScomEditorTableMenu extends components_15.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                orientation: 'column',
                editor: undefined,
                block: undefined,
                index: 0
            };
            this._menuData = [
                {
                    title: `${this.i18n.get('$delete')} ${this.orientation}`,
                    id: 'delete'
                }
            ];
            this.handleMenu = this.handleMenu.bind(this);
            this.deferReadyCallback = true;
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
        get index() {
            return this._data.index;
        }
        set index(value) {
            this._data.index = value;
        }
        get orientation() {
            return this._data.orientation;
        }
        set orientation(value) {
            this._data.orientation = value;
        }
        async setData(value) {
            this._data = value;
            this.renderUI();
        }
        renderUI() {
            this.updateMenuData();
        }
        updateMenuData() {
            if (this.menuElm) {
                this._menuData = [
                    {
                        title: this.i18n.get('$delete_' + this.orientation),
                        id: 'delete'
                    },
                    {
                        title: `${this.i18n.get('$add_' + this.orientation + '_' + (this.orientation === 'column' ? 'left' : 'above'))}`,
                        id: 'addLeft'
                    },
                    {
                        title: `${this.i18n.get('$add_' + this.orientation + '_' + (this.orientation === 'column' ? 'right' : 'below'))}`,
                        id: 'addRight'
                    },
                ];
                this.menuElm.data = this._menuData;
            }
        }
        handleMenu(target, item) {
            if (this.onClose)
                this.onClose();
            const emptyParagraph = {
                children: [],
                content: [],
                type: 'paragraph',
                props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' }
            };
            if (this.orientation === 'row') {
                if (item.id === 'delete') {
                    const content = {
                        type: "tableContent",
                        rows: this.block.content.rows.filter((_, index) => index !== this.index),
                    };
                    this.editor.updateBlock(this.block, {
                        type: "table",
                        content,
                    });
                }
                else {
                    const emptyCol = this.block.content.rows[this.index].cells.map(() => [{ ...emptyParagraph }]);
                    const rows = [...this.block.content.rows];
                    rows.splice(this.index + (item.id === 'addRight' ? 1 : 0), 0, {
                        cells: emptyCol,
                    });
                    this.editor.updateBlock(this.block, {
                        type: "table",
                        content: {
                            type: "tableContent",
                            rows,
                        },
                    });
                }
            }
            else if (this.orientation === 'column') {
                if (item.id === 'delete') {
                    const content = {
                        type: "tableContent",
                        rows: this.block.content.rows.map((row) => ({
                            cells: row.cells.filter((_, index) => index !== this.index),
                        })),
                    };
                    this.editor.updateBlock(this.block, {
                        type: "table",
                        content,
                    });
                }
                else {
                    const content = {
                        type: "tableContent",
                        rows: this.block.content.rows.map((row) => {
                            const cells = [...row.cells];
                            cells.splice(this.index + (item.id === 'addRight' ? 1 : 0), 0, [{ ...emptyParagraph }]);
                            return { cells };
                        }),
                    };
                    this.editor.updateBlock(this.block, {
                        type: "table",
                        content: content,
                    });
                }
            }
        }
        async init() {
            this.i18n.init({ ...index_11.mainJson });
            super.init();
            this.onClose = this.getAttribute('onClose', true) || this.onClose;
            const block = this.getAttribute('block', true);
            const editor = this.getAttribute('editor', true);
            const index = this.getAttribute('index', true);
            const orientation = this.getAttribute('orientation', true);
            await this.setData({ block, editor, index, orientation });
            super.executeReadyCallback();
        }
        render() {
            return (this.$render("i-menu", { id: "menuElm", padding: { top: '0rem', bottom: '0rem', left: '0.675rem', right: '0.675rem' }, font: { color: Theme.text.primary, size: '0.75rem' }, width: '100%', mode: "vertical", data: this._menuData, background: { color: Theme.background.modal }, onItemClick: this.handleMenu }));
        }
    };
    ScomEditorTableMenu = __decorate([
        (0, components_15.customElements)('i-scom-editor--table-menu')
    ], ScomEditorTableMenu);
    exports.ScomEditorTableMenu = ScomEditorTableMenu;
});
define("@scom/scom-editor/components/tableToolbar.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/tableMenu.tsx", "@scom/scom-editor/components/index.css.ts"], function (require, exports, components_16, tableMenu_1, index_css_6) {
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
            this.onButtonClicked = this.onButtonClicked.bind(this);
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
        get index() {
            return this._data.index;
        }
        set index(value) {
            this._data.index = value;
        }
        get orientation() {
            return this._data.orientation;
        }
        set orientation(value) {
            this._data.orientation = value;
        }
        setData(value) {
            this._data = value;
            // this.addEventListener("dragstart", this.dragStart);
            // this.addEventListener("dragend", this.dragEnd);
            this.btnTableToolbar.icon.name = this.orientation === 'row' ? 'grip-vertical' : 'grip-horizontal';
        }
        _handleMouseDown(event, stopPropagation) {
            event.stopPropagation();
            this.onButtonClicked();
            event.preventDefault();
            return true;
        }
        onButtonClicked() {
            if (this.tableMenu) {
                this.tableMenu.setData({ ...this._data });
            }
            else {
                this.tableMenu = new tableMenu_1.ScomEditorTableMenu(undefined, { ...this._data });
                this.tableMenu.onClose = () => {
                    this.tableMenu.closeModal();
                    if (this.unfreezeHandles)
                        this.unfreezeHandles();
                };
            }
            this.tableMenu.openModal({
                showBackdrop: false,
                popupPlacement: "rightTop",
                position: 'absolute',
                minWidth: '9.375rem',
                maxWidth: '10rem',
                boxShadow: Theme.shadows[1],
                linkTo: this,
                zIndex: 9999,
                onClose: () => {
                    if (this.unfreezeHandles)
                        this.unfreezeHandles();
                    if (this.showOtherSide)
                        this.showOtherSide();
                }
            });
            if (this.freezeHandles)
                this.freezeHandles();
            if (this.hideOtherSide)
                this.hideOtherSide();
        }
        init() {
            super.init();
            this.showOtherSide = this.getAttribute('showOtherSide', true) || this.showOtherSide;
            this.hideOtherSide = this.getAttribute('hideOtherSide', true) || this.hideOtherSide;
            this.dragStart = this.getAttribute('dragStart', true) || this.dragStart;
            this.dragEnd = this.getAttribute('dragEnd', true) || this.dragEnd;
            this.freezeHandles = this.getAttribute('freezeHandles', true) || this.freezeHandles;
            this.unfreezeHandles = this.getAttribute('unfreezeHandles', true) || this.unfreezeHandles;
            const block = this.getAttribute('block', true);
            const editor = this.getAttribute('editor', true);
            const index = this.getAttribute('index', true);
            const orientation = this.getAttribute('orientation', true);
            this.setData({ block, editor, index, orientation });
            this.draggable = true;
        }
        render() {
            return (this.$render("i-button", { id: "btnTableToolbar", icon: { name: "grip-vertical", width: 14, height: 14 }, border: { radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider }, padding: { top: '0.15rem', bottom: '0.15rem', left: '0.25rem', right: '0.25rem' }, font: { size: '0.875rem' }, background: { color: Theme.background.modal }, boxShadow: 'none', class: index_css_6.buttonHoverStyle }));
        }
    };
    ScomEditorTableToolbar = __decorate([
        (0, components_16.customElements)('i-scom-editor-table-toolbar')
    ], ScomEditorTableToolbar);
    exports.ScomEditorTableToolbar = ScomEditorTableToolbar;
});
define("@scom/scom-editor/components/customBlock.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts"], function (require, exports, components_17, utils_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorCustomBlock = void 0;
    let ScomEditorCustomBlock = class ScomEditorCustomBlock extends components_17.Module {
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
                    this.blockEl = await components_17.application.createElement(module);
                    this.blockEl.display = 'block';
                    if (module === 'scom-video')
                        this.blockEl.minWidth = '7rem';
                }
                catch { }
                this.currentModule = module;
                this.blockWrapper.clearInnerHTML();
                this.blockWrapper.appendChild(this.blockEl);
            }
            const sideMenu = (0, utils_8.getToolbar)('sideMenu');
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
                case "scom-xchain-widget":
                    if (sideMenu && !properties?.tokens?.length)
                        sideMenu.openConfig(block, this);
                    break;
                case "scom-staking":
                    if (sideMenu && !properties?.chainId)
                        sideMenu.openConfig(block, this);
                    break;
                case "scom-nft-minter":
                    if (sideMenu && !properties?.productType)
                        sideMenu.openConfig(block, this);
                    break;
                case "scom-voting":
                    if (sideMenu && !properties?.title)
                        sideMenu.openConfig(block, this);
                    break;
                case "oswap-nft-widget":
                    if (sideMenu && !properties?.networks?.length)
                        sideMenu.openConfig(block, this);
                    break;
            }
            if (this.blockEl.ready)
                await this.blockEl.ready();
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
        (0, components_17.customElements)('i-scom-editor-custom-block')
    ], ScomEditorCustomBlock);
    exports.ScomEditorCustomBlock = ScomEditorCustomBlock;
});
define("@scom/scom-editor/components/codeBlock.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/index.css.ts"], function (require, exports, components_18, utils_9, index_css_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditorCodeBlock = void 0;
    const Theme = components_18.Styles.Theme.ThemeVars;
    let ScomEditorCodeBlock = class ScomEditorCodeBlock extends components_18.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                code: '',
                language: ''
            };
        }
        get code() {
            return (0, utils_9.revertHtmlTags)(this._data.code || '');
        }
        set code(value) {
            this._data.code = value || '';
        }
        get language() {
            return this._data.language || utils_9.DEFAULT_LANGUAGE;
        }
        set language(value) {
            this._data.language = value || utils_9.DEFAULT_LANGUAGE;
        }
        get fullCode() {
            let code = this.code;
            if (!code.startsWith('`') && !code.endsWith('`')) {
                code = `\`\`\`${this.language}\n${code}\n\`\`\``;
            }
            return code;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            await this.renderUI();
        }
        async renderUI() {
            this.blockWrapper.clearInnerHTML();
            const codeBlock = this.createElement('i-scom-code-viewer', this.blockWrapper);
            codeBlock.parent = this.blockWrapper;
            const rootDir = components_18.application.rootDir;
            await codeBlock.isReady();
            await codeBlock.setData({
                code: this.fullCode,
                entryPoint: rootDir.endsWith('/') ? rootDir.slice(0, -1) : rootDir,
                isButtonsShown: false
            });
            this.blockWrapper.border = { radius: '0.375rem', width: !!this.code ? '0px' : '1px', style: 'solid', color: Theme.divider };
        }
        getActions() {
            const editAction = {
                name: 'Edit',
                icon: 'edit',
                command: (builder, userInputData) => {
                    let oldData = { code: '' };
                    return {
                        execute: () => {
                            oldData = JSON.parse(JSON.stringify(this._data));
                            if (builder?.setData)
                                builder.setData(userInputData);
                            this.setData(userInputData);
                        },
                        undo: () => {
                            if (builder?.setData)
                                builder.setData(oldData);
                            this.setData(oldData);
                        },
                        redo: () => { }
                    };
                },
                customUI: {
                    render: async (data, onConfirm) => {
                        const vstack = new components_18.VStack(null, { gap: '1rem', height: 300, width: '100%', overflow: 'hidden' });
                        new components_18.Button(vstack, {
                            icon: { name: 'expand', width: '0.75rem', height: '0.75rem', fill: Theme.colors.primary.main },
                            background: { color: 'transparent' },
                            boxShadow: 'none',
                            padding: { left: '0px', right: '0px', top: '0px', bottom: '0px' },
                            stack: { shrink: '0' },
                            position: 'absolute',
                            right: 30,
                            top: -16,
                            cursor: 'pointer',
                            onClick: (target, event) => {
                                event.stopPropagation();
                                if (target.icon.name === 'expand')
                                    target.icon.name = 'compress';
                                else
                                    target.icon.name = 'expand';
                                const isExpand = target.icon.name === 'compress';
                                const modal = config.closest('i-modal');
                                if (modal) {
                                    const wrapper = modal.querySelector('.modal-wrapper');
                                    if (wrapper) {
                                        if (isExpand)
                                            wrapper.classList.add(index_css_7.customPaddingStyle);
                                        else
                                            wrapper.classList.remove(index_css_7.customPaddingStyle);
                                    }
                                    modal.width = isExpand ? '100dvw' : '40rem';
                                    modal.height = isExpand ? '100dvh' : 'auto';
                                    modal.border = isExpand ? { radius: 0 } : { radius: '0.375rem' };
                                    modal.popupPlacement = 'center';
                                    vstack.height = isExpand ? 'calc(100vh - 70px)' : '300px';
                                    modal.refresh();
                                }
                            }
                        });
                        const config = this.createElement('i-scom-code-editor', vstack);
                        config.parent = vstack;
                        config.display = 'block';
                        config.width = '100%';
                        config.maxHeight = 'calc(100% - 60px)';
                        config.stack = { grow: '1' };
                        const hstack = new components_18.HStack(vstack, {
                            verticalAlignment: 'center',
                            horizontalAlignment: 'end',
                            height: 50,
                            stack: { shrink: '0' }
                        });
                        const button = new components_18.Button(hstack, {
                            caption: '$confirm',
                            width: '100%',
                            height: 40,
                            font: { color: Theme.colors.primary.contrastText }
                        });
                        await config.ready();
                        await config.loadContent(this.fullCode || '');
                        button.onClick = async () => {
                            const fullCode = (0, utils_9.escapeHTML)(config.value || '');
                            const regex = /```(\w+)?(\((.+?)\))?[\s\n]([\s\S]+)[\s\n]```/g;
                            const matches = regex.exec(fullCode);
                            const path = matches?.[3] || '';
                            let language = matches?.[1] || utils_9.DEFAULT_LANGUAGE;
                            if (language) {
                                language = `${language}${path ? `(${path})` : ''}`;
                            }
                            const code = matches?.[4] || '';
                            if (onConfirm)
                                onConfirm(true, { ...this._data, code, language });
                        };
                        return vstack;
                    }
                }
            };
            return editAction;
        }
        async init() {
            super.init();
            const code = this.getAttribute('code', true);
            const language = this.getAttribute('language', true);
            if (code)
                await this.setData({ code, language });
        }
        render() {
            return (this.$render("i-panel", { id: "blockWrapper", width: '100%', class: index_css_7.customPreStyle, minHeight: 30, border: { radius: '0.375rem', width: '1px', style: 'solid', color: Theme.divider } }));
        }
    };
    ScomEditorCodeBlock = __decorate([
        (0, components_18.customElements)('i-scom-editor--code-block')
    ], ScomEditorCodeBlock);
    exports.ScomEditorCodeBlock = ScomEditorCodeBlock;
});
define("@scom/scom-editor/components/index.ts", ["require", "exports", "@scom/scom-editor/components/colorButton.tsx", "@scom/scom-editor/components/toolbarDropdown.tsx", "@scom/scom-editor/components/blockTypeButton.tsx", "@scom/scom-editor/components/linkButton.tsx", "@scom/scom-editor/components/sideMenu.tsx", "@scom/scom-editor/components/slashMenu.tsx", "@scom/scom-editor/components/colorPicker.tsx", "@scom/scom-editor/components/formattingToolbar.tsx", "@scom/scom-editor/components/imageToolbar.tsx", "@scom/scom-editor/components/tableToolbar.tsx", "@scom/scom-editor/components/customBlock.tsx", "@scom/scom-editor/components/codeBlock.tsx", "@scom/scom-editor/components/utils.ts", "@scom/scom-editor/components/index.css.ts"], function (require, exports, colorButton_2, toolbarDropdown_1, blockTypeButton_2, linkButton_2, sideMenu_1, slashMenu_1, colorPicker_1, formattingToolbar_1, imageToolbar_1, tableToolbar_1, customBlock_1, codeBlock_1, utils_10, index_css_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.modalStyle = exports.customModalStyle = exports.buttonHoverStyle = exports.ScomEditorCodeBlock = exports.ScomEditorCustomBlock = exports.ScomEditorTableToolbar = exports.ScomEditorImageToolbar = exports.ScomEditorFormattingToolbar = exports.ScomEditorColorPicker = exports.ScomEditorSlashMenu = exports.ScomEditorSideMenu = exports.ScomEditorLink = exports.ScomEditorBlockType = exports.ScomEditorToolbarDropdown = exports.ScomEditorColor = void 0;
    Object.defineProperty(exports, "ScomEditorColor", { enumerable: true, get: function () { return colorButton_2.ScomEditorColor; } });
    Object.defineProperty(exports, "ScomEditorToolbarDropdown", { enumerable: true, get: function () { return toolbarDropdown_1.ScomEditorToolbarDropdown; } });
    Object.defineProperty(exports, "ScomEditorBlockType", { enumerable: true, get: function () { return blockTypeButton_2.ScomEditorBlockType; } });
    Object.defineProperty(exports, "ScomEditorLink", { enumerable: true, get: function () { return linkButton_2.ScomEditorLink; } });
    Object.defineProperty(exports, "ScomEditorSideMenu", { enumerable: true, get: function () { return sideMenu_1.ScomEditorSideMenu; } });
    Object.defineProperty(exports, "ScomEditorSlashMenu", { enumerable: true, get: function () { return slashMenu_1.ScomEditorSlashMenu; } });
    Object.defineProperty(exports, "ScomEditorColorPicker", { enumerable: true, get: function () { return colorPicker_1.ScomEditorColorPicker; } });
    Object.defineProperty(exports, "ScomEditorFormattingToolbar", { enumerable: true, get: function () { return formattingToolbar_1.ScomEditorFormattingToolbar; } });
    Object.defineProperty(exports, "ScomEditorImageToolbar", { enumerable: true, get: function () { return imageToolbar_1.ScomEditorImageToolbar; } });
    Object.defineProperty(exports, "ScomEditorTableToolbar", { enumerable: true, get: function () { return tableToolbar_1.ScomEditorTableToolbar; } });
    Object.defineProperty(exports, "ScomEditorCustomBlock", { enumerable: true, get: function () { return customBlock_1.ScomEditorCustomBlock; } });
    Object.defineProperty(exports, "ScomEditorCodeBlock", { enumerable: true, get: function () { return codeBlock_1.ScomEditorCodeBlock; } });
    __exportStar(utils_10, exports);
    Object.defineProperty(exports, "buttonHoverStyle", { enumerable: true, get: function () { return index_css_8.buttonHoverStyle; } });
    Object.defineProperty(exports, "customModalStyle", { enumerable: true, get: function () { return index_css_8.customModalStyle; } });
    Object.defineProperty(exports, "modalStyle", { enumerable: true, get: function () { return index_css_8.modalStyle; } });
});
define("@scom/scom-editor/blocks/addFormattingToolbar.ts", ["require", "exports", "@scom/scom-editor/components/index.ts", "@scom/scom-blocknote-sdk"], function (require, exports, index_12, scom_blocknote_sdk_5) {
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
                modal = await (0, index_12.createModal)({
                    popupPlacement: (0, index_12.getPlacement)(block),
                    overflow: 'hidden',
                    maxHeight: '2rem',
                    minWidth: 'max-content',
                    zIndex: 9999
                });
                modal.id = 'mdFormatting';
            }
            if (!(0, index_12.getModalContainer)().contains(modal))
                (0, index_12.getModalContainer)().appendChild(modal);
            if (formattingToolbar) {
                formattingToolbarState.show && formattingToolbar.onRefresh();
            }
            else {
                formattingToolbar = await index_12.ScomEditorFormattingToolbar.create({
                    editor: editor
                });
                modal.item = formattingToolbar;
            }
            const isMediaBlock = selectedBlocks.length === 1 &&
                !scom_blocknote_sdk_5.BasicBlockTypes.includes(selectedBlocks[0].type);
            modal.popupPlacement = isMediaBlock ? 'top' : (0, index_12.getPlacement)(block);
            if (formattingToolbarState.show) {
                if (blockID) {
                    const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                    if (blockEl) {
                        modal.linkTo = blockEl;
                        modal.showBackdrop = false;
                        modal.position = 'absolute';
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
            else {
                // modal.visible = false;
                // TODO: check blur event on format plugin
            }
        });
    };
    exports.addFormattingToolbar = addFormattingToolbar;
});
define("@scom/scom-editor/blocks/addSideMenu.ts", ["require", "exports", "@scom/scom-editor/components/index.ts"], function (require, exports, index_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addSideMenu = void 0;
    const addSideMenu = (editor) => {
        let sideMenu;
        editor.sideMenu.onUpdate(async (sideMenuState) => {
            if (!sideMenu) {
                sideMenu = await index_13.ScomEditorSideMenu.create({
                    block: sideMenuState.block,
                    editor: editor,
                    position: 'absolute',
                    zIndex: 9999,
                    class: index_13.customModalStyle
                });
            }
            (0, index_13.setToolbar)('sideMenu', sideMenu);
            if (!(0, index_13.getModalContainer)().contains(sideMenu)) {
                (0, index_13.getModalContainer)().appendChild(sideMenu);
            }
            if (sideMenuState.show) {
                sideMenu.block = sideMenuState.block;
                sideMenu.opacity = editor.isFocused() ? 1 : 0;
                const blockEl = sideMenuState?.block?.id && editor.domElement.querySelector(`[data-id="${sideMenuState.block.id}"]`);
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
define("@scom/scom-editor/blocks/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertedSlashItem = void 0;
    ///<amd-module name='@scom/scom-editor/blocks/utils.ts'/> 
    const convertedSlashItem = (item) => {
        const { name } = item;
        return {
            ...item,
            id: name.replace(/\s/g, '_').toLowerCase()
        };
    };
    exports.convertedSlashItem = convertedSlashItem;
});
define("@scom/scom-editor/blocks/addSlashMenu.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.ts", "@scom/scom-editor/blocks/utils.ts"], function (require, exports, components_19, index_14, utils_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addSlashMenu = void 0;
    const Theme = components_19.Styles.Theme.ThemeVars;
    const closeSideMenu = () => {
        const sideMenu = (0, index_14.getToolbar)('sideMenu');
        if (sideMenu)
            sideMenu.opacity = 0;
    };
    const openSideMenu = () => {
        const sideMenu = (0, index_14.getToolbar)('sideMenu');
        if (sideMenu)
            sideMenu.opacity = 1;
    };
    const convertedItems = (items) => {
        return items.map((item) => {
            return (0, utils_11.convertedSlashItem)(item);
        });
    };
    const addSlashMenu = (editor) => {
        let modal;
        let menuElm;
        async function updateItems(items, onClick, selected, referencePos) {
            const { bottom = 0 } = referencePos;
            const newItems = convertedItems(items);
            const maxHeight = window.innerHeight - bottom - 32;
            if (menuElm) {
                menuElm.setData({
                    items: [...newItems],
                    selectedIndex: selected
                });
            }
            else {
                menuElm = await index_14.ScomEditorSlashMenu.create({
                    items: [...newItems],
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
                modal = await (0, index_14.createModal)({
                    popupPlacement: "topLeft",
                    padding: { left: 0, top: 0, right: 0, bottom: 0 },
                    border: { radius: '0.375rem', style: 'solid', width: '1px', color: Theme.colors.secondary.light },
                    position: 'absolute',
                    zIndex: 9999,
                    onClose: closeSideMenu
                });
            }
            (0, index_14.setToolbar)('slashMenu', modal);
            if (!(0, index_14.getModalContainer)().contains(modal)) {
                (0, index_14.getModalContainer)().appendChild(modal);
            }
            if (slashMenuState.show) {
                updateItems(slashMenuState.filteredItems, editor.slashMenu.itemCallback, slashMenuState.keyboardHoveredItemIndex, slashMenuState.referencePos);
                const sideMenu = (0, index_14.getToolbar)('sideMenu');
                const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                // const isTable = blockEl.closest('table');
                if (sideMenu) {
                    openSideMenu();
                    editor.sideMenu.freezeMenu();
                    modal.linkTo = blockEl;
                    modal.showBackdrop = false;
                    modal.popupPlacement = 'topLeft';
                    // let innerMdX = 0;
                    // let innerMdY = 0;
                    // if (isTable) {
                    //   const { x: blockX, y: blockY } = blockEl.getBoundingClientRect();
                    //   const { x: sideMenuX } = sideMenu.getBoundingClientRect();
                    //   innerMdX = blockX - sideMenuX;
                    //   innerMdY = blockY;
                    // }
                    // const innerModal = modal.querySelector('.modal') as HTMLElement;
                    // if (innerModal) {
                    //   innerModal.style.left = `${innerMdX}px`;
                    //   innerModal.style.top = `${innerMdY}px`;
                    // }
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
define("@scom/scom-editor/blocks/addHyperlinkToolbar.ts", ["require", "exports", "@ijstech/components", "@scom/scom-editor/components/index.ts"], function (require, exports, components_20, index_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addHyperlinkToolbar = void 0;
    const Theme = components_20.Styles.Theme.ThemeVars;
    const getToolbarButtons = (editor, hyperlinkToolbarState, modal) => {
        const iconProps = { width: '0.75rem', height: '0.75rem', fill: Theme.text.primary };
        const toolTipProps = { placement: 'bottom' };
        return [
            {
                customControl: () => {
                    const link = new index_15.ScomEditorLink(undefined, {
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
                        class: index_15.buttonHoverStyle
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
        let linkBtn;
        editor.hyperlinkToolbar.onUpdate(async (hyperlinkToolbarState) => {
            const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
            const block = selectedBlocks[0];
            const blockID = block?.id;
            if (!modal) {
                modal = await (0, index_15.createModal)({
                    popupPlacement: 'top',
                    minWidth: 0,
                    zIndex: 9999
                });
                modal.id = 'mdHyperlink';
            }
            if (!(0, index_15.getModalContainer)().contains(modal))
                (0, index_15.getModalContainer)().appendChild(modal);
            if (!element) {
                element = await components_20.Panel.create({ minWidth: 'max-content' });
                buttonList = getToolbarButtons(editor, hyperlinkToolbarState, modal);
                for (let props of buttonList) {
                    if (props.customControl) {
                        const elm = props.customControl(element);
                        element.appendChild(elm);
                        linkBtn = elm;
                    }
                    else {
                        const btn = (0, index_15.createButton)(props, element);
                        element.appendChild(btn);
                    }
                }
                modal.item = element;
            }
            else if (linkBtn) {
                linkBtn.text = hyperlinkToolbarState.text;
                linkBtn.url = hyperlinkToolbarState.url;
            }
            if (hyperlinkToolbarState.show) {
                if (blockID) {
                    const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
                    if (blockEl) {
                        modal.linkTo = blockEl;
                        modal.showBackdrop = false;
                        modal.position = 'absolute';
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
    exports.addHyperlinkToolbar = addHyperlinkToolbar;
});
define("@scom/scom-editor/blocks/addTableToolbar.ts", ["require", "exports", "@scom/scom-editor/components/index.ts", "@ijstech/components"], function (require, exports, index_16, components_21) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addTableToolbar = void 0;
    const Theme = components_21.Styles.Theme.ThemeVars;
    const addTableToolbar = async (editor) => {
        let columnTableHandle;
        let rowTableHandle;
        let draggedCellOrientation = undefined;
        let mousePos = undefined;
        let hideRow = false;
        let hideCol = false;
        editor.tableHandles.onUpdate(async (tableToolbarState) => {
            const { referencePosCell, referencePosTable, draggingState, colIndex, rowIndex, block, show } = tableToolbarState;
            if (draggingState) {
                draggedCellOrientation = draggingState.draggedCellOrientation;
                mousePos = draggingState.mousePos;
            }
            else {
                draggedCellOrientation = undefined;
                mousePos = undefined;
            }
            const getReferenceClientRectRow = () => {
                if (!referencePosCell || !referencePosTable) {
                    return undefined;
                }
                if (draggedCellOrientation === "row") {
                    return () => new DOMRect(referencePosTable.x, mousePos, referencePosTable.width, 0);
                }
                return () => new DOMRect(referencePosTable.x, referencePosCell.y, referencePosTable.width, referencePosCell.height);
            };
            const getReferenceClientRectColumn = () => {
                if (!referencePosCell || !referencePosTable) {
                    return undefined;
                }
                if (draggedCellOrientation === "col") {
                    return () => new DOMRect(mousePos, referencePosTable.y, 0, referencePosTable.height);
                }
                return () => new DOMRect(referencePosCell.x, referencePosTable.y, referencePosCell.width, referencePosTable.height);
            };
            const { x: columnX, y: columnY } = getReferenceClientRectColumn()?.();
            const { width: cellWidth, height: cellHeight } = referencePosCell;
            if (columnTableHandle) {
                const offsetHeight = columnTableHandle.offsetHeight || 20;
                const offsetWidth = columnTableHandle.offsetWidth || 24;
                columnTableHandle.style.top = `${window.scrollY + columnY - offsetHeight / 2}px`;
                columnTableHandle.style.left = `${window.scrollX + columnX + cellWidth / 2 - offsetWidth / 2}px`;
                columnTableHandle.setData({ editor, block, index: colIndex, orientation: 'column' });
                columnTableHandle.visible = show && draggedCellOrientation !== "row" && !hideCol;
            }
            else {
                columnTableHandle = await index_16.ScomEditorTableToolbar.create({
                    orientation: 'column',
                    editor,
                    index: colIndex,
                    block,
                    position: 'absolute',
                    zIndex: 9999,
                    dragStart: editor.tableHandles.colDragStart,
                    dragEnd: editor.tableHandles.dragEnd,
                    freezeHandles: editor.tableHandles.freezeHandles,
                    unfreezeHandles: editor.tableHandles.unfreezeHandles,
                    showOtherSide: () => {
                        hideRow = false;
                        rowTableHandle.visible = show && draggedCellOrientation !== "col" && !hideRow;
                    },
                    hideOtherSide: () => {
                        hideRow = true;
                        rowTableHandle.visible = show && draggedCellOrientation !== "col" && !hideRow;
                    },
                    visible: false
                });
                columnTableHandle.id = "column";
            }
            if (!(0, index_16.getModalContainer)().contains(columnTableHandle)) {
                (0, index_16.getModalContainer)().appendChild(columnTableHandle);
            }
            const { x: rowX, y: rowY } = getReferenceClientRectRow()?.();
            if (rowTableHandle) {
                const offsetHeight = rowTableHandle.offsetHeight || 20;
                const offsetWidth = rowTableHandle.offsetWidth || 24;
                rowTableHandle.style.top = `${window.scrollY + rowY + cellHeight / 2 - offsetHeight / 2}px`;
                rowTableHandle.style.left = `${window.scrollX + rowX - offsetWidth / 2}px`;
                rowTableHandle.setData({ editor, block, index: rowIndex, orientation: 'row' });
                rowTableHandle.visible = show && draggedCellOrientation !== "col" && !hideRow;
            }
            else {
                rowTableHandle = await index_16.ScomEditorTableToolbar.create({
                    orientation: "row",
                    editor,
                    index: rowIndex,
                    block,
                    position: 'absolute',
                    zIndex: 9999,
                    dragStart: editor.tableHandles.rowDragStart,
                    dragEnd: editor.tableHandles.dragEnd,
                    freezeHandles: editor.tableHandles.freezeHandles,
                    unfreezeHandles: editor.tableHandles.unfreezeHandles,
                    showOtherSide: () => {
                        hideCol = false;
                        columnTableHandle.visible = show && draggedCellOrientation !== "row" && !hideCol;
                    },
                    hideOtherSide: () => {
                        hideCol = true;
                        columnTableHandle.visible = show && draggedCellOrientation !== "row" && !hideCol;
                    },
                    visible: false
                });
                rowTableHandle.id = "row";
            }
            if (!(0, index_16.getModalContainer)().contains(rowTableHandle)) {
                (0, index_16.getModalContainer)().appendChild(rowTableHandle);
            }
        });
    };
    exports.addTableToolbar = addTableToolbar;
});
define("@scom/scom-editor/blocks/addFileBlock.ts", ["require", "exports", "@scom/scom-storage", "@scom/scom-blocknote-sdk", "@scom/scom-editor/components/index.ts", "@ijstech/components", "@scom/scom-editor/global/index.ts"], function (require, exports, scom_storage_1, scom_blocknote_sdk_6, index_17, components_22, index_18) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addFileBlock = void 0;
    const Theme = components_22.Styles.Theme.ThemeVars;
    async function renderBlock(editor, url) {
        try {
            const block = await (0, index_18.getBlockFromExtension)(url);
            if (block)
                (0, scom_blocknote_sdk_6.execCustomBLock)(editor, block);
        }
        catch (error) { }
    }
    function addFileBlock() {
        let storageEl = null;
        const FileSlashItem = {
            name: "File",
            execute: async (editor) => {
                if (!storageEl) {
                    storageEl = scom_storage_1.ScomStorage.getInstance();
                    storageEl.uploadMultiple = false;
                    storageEl.onUploadedFile = async (path) => {
                        storageEl.closeModal();
                        await renderBlock(editor, path);
                    };
                    storageEl.onOpen = async (path) => {
                        storageEl.closeModal();
                        await renderBlock(editor, path);
                    };
                    storageEl.onCancel = () => storageEl.closeModal();
                }
                storageEl.openModal({
                    width: 800,
                    maxWidth: '100%',
                    height: '90vh',
                    overflow: 'hidden',
                    zIndex: 1000,
                    closeIcon: { width: '1rem', height: '1rem', name: 'times', fill: Theme.text.primary, margin: { bottom: '0.5rem' } },
                    class: index_17.modalStyle
                });
                storageEl.onShow();
            },
            aliases: ["file", "media"]
        };
        return {
            FileSlashItem
        };
    }
    exports.addFileBlock = addFileBlock;
    ;
});
define("@scom/scom-editor/blocks/addCodeBlock.ts", ["require", "exports", "@ijstech/components", "@scom/scom-blocknote-sdk", "@scom/scom-editor/components/index.ts"], function (require, exports, components_23, scom_blocknote_sdk_7, index_19) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addCodeBlock = void 0;
    function getData(element) {
        if (element?.nodeName === 'PRE') {
            const codeElm = element.querySelector('code');
            if (codeElm) {
                return {
                    code: codeElm.textContent,
                    language: codeElm.getAttribute('data-language') || ''
                };
            }
        }
        return false;
    }
    const backtickInputRegex = /^```([a-z]+)?[\s\n]$/;
    const tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/;
    function addCodeBlock(blocknote) {
        const CodeBlock = blocknote.createBlockSpec({
            type: "codeBlock",
            propSchema: {
                ...blocknote.defaultProps,
                language: { default: '' },
                code: { default: '' },
                width: { default: 512 },
                height: { default: 'auto' }
            },
            content: 'none',
            marks: '',
            code: true,
            defining: true,
        }, {
            render: (block) => {
                const wrapper = new components_23.Panel();
                const { code, language } = JSON.parse(JSON.stringify(block.props));
                const elTag = new index_19.ScomEditorCodeBlock(wrapper, {
                    code,
                    language,
                    display: 'block',
                    width: '100%',
                    height: '100%'
                });
                wrapper.appendChild(elTag);
                return {
                    dom: wrapper
                };
            },
            parseFn: () => {
                return [
                    {
                        tag: "div[data-content-type=codeBlock]",
                        contentElement: "[data-editable]"
                    },
                    {
                        tag: "p",
                        getAttrs: (element) => {
                            if (typeof element === "string")
                                return false;
                            const child = element.firstChild;
                            if (!child)
                                return false;
                            return getData(child);
                        },
                        priority: 600,
                        node: 'codeBlock'
                    },
                    {
                        tag: "pre",
                        getAttrs: (element) => {
                            if (typeof element === "string")
                                return false;
                            return getData(element);
                        },
                        priority: 601,
                        node: 'codeBlock'
                    }
                ];
            },
            toExternalHTML: (block, editor) => {
                const preEl = document.createElement('pre');
                const codeElm = document.createElement('code');
                const code = (0, index_19.revertHtmlTags)(block.props.code || '');
                codeElm.textContent = code;
                preEl.appendChild(codeElm);
                const language = block.props.language;
                codeElm.setAttribute('data-language', language);
                if (language) {
                    const customClass = `language-${language}`;
                    codeElm.classList.add(customClass);
                }
                return {
                    dom: preEl
                };
            },
            pasteRules: [
                {
                    find: /^(`{3,}[^`\n]*\n|^`{3,}[^`\s]*)([\s\S]*?)([\s|\n]?`{3,})/gm,
                    handler(props) {
                        const { state, chain, range } = props;
                        const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
                        chain().BNUpdateBlock(state.selection.from, {
                            type: "codeBlock",
                            props: {
                                code: textContent,
                                language: index_19.DEFAULT_LANGUAGE
                            },
                        }).setTextSelection(range.from + 1);
                    }
                }
            ],
            inputRules: [
                {
                    find: backtickInputRegex,
                    getAttributes: match => ({
                        language: match[1],
                    })
                },
                {
                    find: tildeInputRegex,
                    getAttributes: match => ({
                        language: match[1],
                    })
                }
            ]
        });
        const CodeSlashItem = {
            name: "Code Block",
            execute: (editor) => {
                const block = { type: "codeBlock", props: { code: '', language: '' } };
                (0, scom_blocknote_sdk_7.execCustomBLock)(editor, block);
            },
            aliases: ["codeBlock", "Basic blocks"]
        };
        return {
            CodeBlock,
            CodeSlashItem
        };
    }
    exports.addCodeBlock = addCodeBlock;
    ;
});
define("@scom/scom-editor/blocks/index.ts", ["require", "exports", "@scom/scom-editor/blocks/addFormattingToolbar.ts", "@scom/scom-editor/blocks/addSideMenu.ts", "@scom/scom-editor/blocks/addSlashMenu.ts", "@scom/scom-editor/blocks/addHyperlinkToolbar.ts", "@scom/scom-editor/blocks/addTableToolbar.ts", "@scom/scom-editor/blocks/addFileBlock.ts", "@scom/scom-editor/blocks/addCodeBlock.ts", "@scom/scom-editor/blocks/utils.ts"], function (require, exports, addFormattingToolbar_1, addSideMenu_1, addSlashMenu_1, addHyperlinkToolbar_1, addTableToolbar_1, addFileBlock_1, addCodeBlock_1, utils_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertedSlashItem = exports.addCodeBlock = exports.addFileBlock = exports.addTableToolbar = exports.addHyperlinkToolbar = exports.addSlashMenu = exports.addSideMenu = exports.addFormattingToolbar = void 0;
    Object.defineProperty(exports, "addFormattingToolbar", { enumerable: true, get: function () { return addFormattingToolbar_1.addFormattingToolbar; } });
    Object.defineProperty(exports, "addSideMenu", { enumerable: true, get: function () { return addSideMenu_1.addSideMenu; } });
    Object.defineProperty(exports, "addSlashMenu", { enumerable: true, get: function () { return addSlashMenu_1.addSlashMenu; } });
    Object.defineProperty(exports, "addHyperlinkToolbar", { enumerable: true, get: function () { return addHyperlinkToolbar_1.addHyperlinkToolbar; } });
    Object.defineProperty(exports, "addTableToolbar", { enumerable: true, get: function () { return addTableToolbar_1.addTableToolbar; } });
    Object.defineProperty(exports, "addFileBlock", { enumerable: true, get: function () { return addFileBlock_1.addFileBlock; } });
    Object.defineProperty(exports, "addCodeBlock", { enumerable: true, get: function () { return addCodeBlock_1.addCodeBlock; } });
    Object.defineProperty(exports, "convertedSlashItem", { enumerable: true, get: function () { return utils_12.convertedSlashItem; } });
});
define("@scom/scom-editor/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_24) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customEditorStyle = void 0;
    const Theme = components_24.Styles.Theme.ThemeVars;
    exports.customEditorStyle = components_24.Styles.style({
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
define("@scom/scom-editor", ["require", "exports", "@ijstech/components", "@scom/scom-editor/blocks/index.ts", "@scom/scom-blocknote-sdk", "@scom/scom-editor/components/index.ts", "@scom/scom-editor/index.css.ts", "@scom/scom-editor/global/index.ts", "@scom/scom-editor/languages/index.ts"], function (require, exports, components_25, index_20, scom_blocknote_sdk_8, index_21, index_css_9, index_22, index_23) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomEditor = void 0;
    const Theme = components_25.Styles.Theme.ThemeVars;
    const path = components_25.application.currentModuleDir;
    const libPlugins = [
        'blocknote'
    ];
    const cssPath = `${path}/lib/@blocknote/style.css`;
    const DEFAUT_WIDGETS = [
        'scom-video',
        'scom-image',
        'scom-charts',
        'scom-twitter-post',
        'scom-voting',
        'scom-nft-minter',
        'oswap-nft-widget',
        'scom-xchain-widget',
        'scom-staking',
        "scom-swap"
    ];
    let ScomEditor = class ScomEditor extends components_25.Module {
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
        get viewer() {
            return this._data.viewer ?? false;
        }
        set viewer(data) {
            this._data.viewer = data ?? false;
        }
        get widgets() {
            return this._widgets || DEFAUT_WIDGETS;
        }
        set widgets(data) {
            this._widgets = data || DEFAUT_WIDGETS;
            if (this._editor)
                this.renderData();
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
                await this.renderEditor();
            }
            catch { }
        }
        async renderEditor(initialContent) {
            if (!this._blocknoteObj)
                return;
            this.pnlEditor.clearInnerHTML();
            (0, index_21.removeContainer)();
            const { blockSpecs: customBlockSpecs, slashMenuItems: customSlashMenuItems } = await this.addCustomWidgets(this._blocknoteObj, scom_blocknote_sdk_8.execCustomBLock, this.addBlockCallback.bind(this));
            const { FileSlashItem } = (0, index_20.addFileBlock)();
            const { CodeSlashItem, CodeBlock } = (0, index_20.addCodeBlock)(this._blocknoteObj);
            const blockSpecs = {
                ...this._blocknoteObj.defaultBlockSpecs,
                codeBlock: CodeBlock,
                ...customBlockSpecs,
            };
            const editorConfig = {
                parentElement: this.pnlEditor,
                blockSpecs,
                editable: !this.viewer,
                slashMenuItems: [
                    ...this._blocknoteObj.getDefaultSlashMenuItems().filter((item) => item.name !== 'Image'),
                    FileSlashItem,
                    CodeSlashItem,
                    ...customSlashMenuItems
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
                        class: index_css_9.customEditorStyle,
                    },
                },
            };
            if (initialContent)
                editorConfig.initialContent = initialContent;
            this._editor = new this._blocknoteObj.BlockNoteEditor(editorConfig);
            (0, index_20.addSideMenu)(this._editor);
            (0, index_20.addFormattingToolbar)(this._editor);
            (0, index_20.addSlashMenu)(this._editor);
            (0, index_20.addHyperlinkToolbar)(this._editor);
            (0, index_20.addTableToolbar)(this._editor);
            this._editor.domElement.addEventListener('focus', () => {
                const sideMenu = (0, index_21.getToolbar)('sideMenu');
                if (sideMenu)
                    sideMenu.opacity = 1;
            });
            this._editor.domElement.addEventListener("blur", (event) => {
                const sideMenus = (0, index_21.getModalContainer)().querySelectorAll('i-scom-editor-side-menu');
                for (let menu of sideMenus) {
                    menu.opacity = 0;
                }
            });
        }
        async addCustomWidgets(blocknote, executeFn, callbackFn) {
            const blockSpecs = {};
            const slashMenuItems = [];
            for (const widget of this.widgets) {
                const result = await this.createWidget(widget, blocknote, executeFn, callbackFn);
                if (!result || !result?.block?.config?.type)
                    continue;
                const { block, slashItem } = result;
                blockSpecs[block.config.type] = block;
                slashMenuItems.push(slashItem);
            }
            return { blockSpecs, slashMenuItems };
        }
        async createWidget(name, blocknote, executeFn, callbackFn) {
            try {
                const module = await components_25.application.createElement(name);
                if (module && 'addBlock' in module) {
                    const { block, slashItem, moduleData } = module.addBlock(blocknote, executeFn, callbackFn);
                    block?.config?.type && (0, index_22.addConfig)(block?.config?.type, moduleData);
                    if (name === 'scom-charts') {
                        const charts = block?.config?.propSchema?.name?.values || [];
                        (0, index_22.setChartTypes)(charts);
                    }
                    return { block, slashItem };
                }
            }
            catch { }
        }
        addBlockCallback(module, block) {
            if (!block || !block.type || !module)
                return;
            const sideMenu = (0, index_21.getToolbar)('sideMenu');
            const properties = block.props;
            const openConfigIfMissingProp = (condition) => {
                if (sideMenu && condition)
                    sideMenu.openConfig(block, module);
            };
            switch (block.type) {
                case "imageWidget":
                case "video":
                case "tweet":
                    openConfigIfMissingProp(!properties?.url);
                    break;
                case "swap":
                    openConfigIfMissingProp(!properties?.providers?.length);
                    break;
                case "xchain":
                    openConfigIfMissingProp(!properties?.tokens?.length);
                    break;
                case "staking":
                    openConfigIfMissingProp(!properties?.chainId);
                    break;
                case "nftMinter":
                    openConfigIfMissingProp(!properties?.productType);
                    break;
                case "voting":
                    openConfigIfMissingProp(!properties?.title);
                    break;
                case "oswapNft":
                    openConfigIfMissingProp(!properties?.networks?.length);
                    break;
            }
        }
        async onEditorChanged(editor) {
            let value = '';
            const blocks = editor.topLevelBlocks;
            blocks.pop();
            value = await editor.blocksToMarkdownLossy(blocks);
            this.value = value.replace(/\[(swap|xchain|staking|chart|voting|nftMinter|oswapNft)\]\((.*)\)/g, "$2");
            console.log(JSON.stringify({ value: this.value }));
            if (this.onChanged)
                this.onChanged(this.value);
            const sideMenu = (0, index_21.getToolbar)('sideMenu');
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
                components_25.RequireJS.config({
                    paths: {
                        'blocknote': `${path}/lib/@blocknote/blocknote.bundled.umd.js`
                    }
                });
                components_25.RequireJS.require(libPlugins, (blocknote) => {
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
                await this.renderData();
            }
        }
        async renderData() {
            if (!this._editor)
                return;
            const blocks = await this._editor.tryParseMarkdownToBlocks(this.value);
            this.renderEditor(JSON.parse(JSON.stringify(blocks)));
        }
        async setValue(value) {
            this.value = value;
            if (!this._editor)
                return;
            const blocks = await this._editor.tryParseMarkdownToBlocks(value);
            this._editor.replaceBlocks(this._editor.topLevelBlocks, blocks);
        }
        async insertFile(url) {
            try {
                const block = await (0, index_22.getBlockFromExtension)(url);
                if (block)
                    (0, scom_blocknote_sdk_8.execCustomBLock)(this._editor, block);
            }
            catch (error) { }
        }
        insertBlock(block) {
            const currentBlock = this._editor.getTextCursorPosition().block;
            this._editor.insertBlocks([block], currentBlock, "after");
            this._editor.setTextCursorPosition(this._editor.getTextCursorPosition().nextBlock, "end");
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
            const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
            this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
            this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
            this.updateStyle('--input-background', this.tag[themeVar]?.inputBackgroundColor);
            this.updateStyle('--input-font_color', this.tag[themeVar]?.inputFontColor);
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
            (0, index_21.removeContainer)();
            (0, index_21.getToolbars)().clear();
        }
        focus() {
            if (!this._editor)
                return;
            this._editor.focus();
        }
        async init() {
            this.i18n.init({ ...index_23.mainJson });
            super.init();
            (0, index_21.removeContainer)();
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const value = this.getAttribute('value', true);
                const viewer = this.getAttribute('viewer', true);
                const scconfig = components_25.application.store.scconfig;
                let customWidgets = null;
                if (scconfig) {
                    try {
                        customWidgets = typeof scconfig === 'string' ? JSON.parse(scconfig)?.editorWidgets : scconfig.editorWidgets;
                    }
                    catch (error) {
                    }
                }
                this._widgets = customWidgets || this.getAttribute('widgets', true);
                await this.setData({ value, viewer });
            }
        }
        render() {
            return (this.$render("i-panel", { id: "pnlEditor", height: "100%", background: { color: Theme.background.main }, font: { color: Theme.text.primary }, border: { radius: 'inherit' } }));
        }
    };
    ScomEditor = __decorate([
        (0, components_25.customElements)('i-scom-editor')
    ], ScomEditor);
    exports.ScomEditor = ScomEditor;
});
