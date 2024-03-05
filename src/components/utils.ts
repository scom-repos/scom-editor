import { Button, Control, HStack, Styles, IconName, Modal } from "@ijstech/components";
import { PartialBlock, formatKeyboardShortcut } from "../global/index";
import { buttonHoverStyle, customModalStyle } from "./index.css";
import assets from "../assets";
const Theme = Styles.Theme.ThemeVars;

export type IToolbarDropdownItem = {
  text: string;
  icon?: {name: IconName};
  onClick?: (target: Control, event: MouseEvent) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
};

export type IBlockTypeItem = {
  name: string;
  type: string;
  props?: Record<string, boolean | number | string>;
  icon?: {name: IconName};
  isSelected: (block: any) => boolean;
};

export const defaultBlockTypeItems: IBlockTypeItem[] = [
  {
    name: "Paragraph",
    type: "paragraph",
    icon: {name: 'paragraph'},
    isSelected: (block) => block.type === "paragraph",
  },
  {
    name: "Heading 1",
    type: "heading",
    props: { level: 1 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 1,
  },
  {
    name: "Heading 2",
    type: "heading",
    props: { level: 2 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 2,
  },
  {
    name: "Heading 3",
    type: "heading",
    props: { level: 3 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 3,
  },
  {
    name: "Heading 4",
    type: "heading",
    props: { level: 4 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 4,
  },
  {
    name: "Heading 5",
    type: "heading",
    props: { level: 5 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 5,
  },
  {
    name: "Heading 6",
    type: "heading",
    props: { level: 6 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 6,
  },
  {
    name: "Bullet List",
    type: "bulletListItem",
    icon: {name: 'list-ul'},
    isSelected: (block) => block.type === "bulletListItem",
  },
  {
    name: "Numbered List",
    type: "numberedListItem",
    icon: {name: 'list-ol'},
    isSelected: (block) => block.type === "numberedListItem",
  },
];

export function getExtraFields () {
  const extraFields = {
    Heading: {
      group: "Headings",
      icon: { name: 'heading' },
      hint: "Used for a top-level heading",
      shortcut: formatKeyboardShortcut("Mod-Alt-1"),
    },
    "Heading 2": {
      group: "Headings",
      icon: { name: 'heading' },
      hint: "Used for key sections",
      shortcut: formatKeyboardShortcut("Mod-Alt-2"),
    },
    "Heading 3": {
      group: "Headings",
      icon: { name: 'heading' },
      hint: "Used for subsections and group headings",
      shortcut: formatKeyboardShortcut("Mod-Alt-3"),
    },
    "Heading 4": {
      group: "Headings",
      icon: { name: 'heading' },
      hint: "Used for subsections and group headings",
      shortcut: formatKeyboardShortcut("Mod-Alt-4"),
    },
    "Heading 5": {
      group: "Headings",
      icon: { name: 'heading' },
      hint: "Used for subsections and group headings",
      shortcut: formatKeyboardShortcut("Mod-Alt-5"),
    },
    "Heading 6": {
      group: "Headings",
      icon: { name: 'heading' },
      hint: "Used for subsections and group headings",
      shortcut: formatKeyboardShortcut("Mod-Alt-6"),
    },
    "Numbered List": {
      group: "Basic blocks",
      icon: { name: 'list-ol' },
      hint: "Used to display a numbered list",
      shortcut: formatKeyboardShortcut("Mod-Alt-7"),
    },
    "Bullet List": {
      group: "Basic blocks",
      icon: { name: 'list-ul' },
      hint: "Used to display an unordered list",
      shortcut: formatKeyboardShortcut("Mod-Alt-9"),
    },
    Paragraph: {
      group: "Basic blocks",
      icon: { name: 'paragraph' },
      hint: "Used for the body of your document",
      shortcut: formatKeyboardShortcut("Mod-Alt-0"),
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
      icon: {name: 'video'},
      hint: "Insert a video",
    },
    Swap: {
      group: "Widget",
      icon: {name: 'exchange-alt'},
      hint: "Insert a swap widget",
    },
    Table: {
      group: "Basic blocks",
      icon: { name: 'table' },
      hint: "Create a table"
    },
    Chart: {
      group: "Widget",
      icon: {name: 'chart-line'},
      hint: "Insert a chart widget",
    },
    Tweet: {
      group: "Widget",
      icon: {image: {url: assets.fullPath('img/twitter.svg'), width: '100%', height: '100%', display: 'inline-block'}},
      hint: "Insert a twitter post",
    },
  };
  return extraFields;
}

interface IButtonProps {
  caption?: string;
  icon?: any;
  enabled?: boolean;
  border?: any;
  isSelected?: boolean | (() => boolean);
  tooltip?: any,
  onClick?: (target: Control, event: MouseEvent) => void;
}

export const createButton = (props: IButtonProps, parent: Control) => {
  const border = props?.border || {};
  border.radius = '0.25rem';
  const isSelectedVal = !props.isSelected || typeof props.isSelected === 'boolean' ? props.isSelected : props.isSelected();
  const onClick = props.onClick;
  props.onClick = (target: Control, event: MouseEvent) => {
    const isSelected = !(isSelectedVal ?? false);
    target.background.color = isSelected ? Theme.action.activeBackground : 'transparent';
    onClick(target, event);
  }
  const button = new Button(parent, {
    font: {size: '0.875rem'},
    padding: {top: '0px', bottom: '0px', left: '0.5rem', right: '0.5rem'},
    border: {...border},
    background: {color: isSelectedVal ? Theme.action.activeBackground : 'transparent'},
    boxShadow: 'none',
    enabled: true,
    minWidth: '1.875rem',
    minHeight: '1.875rem',
    class: buttonHoverStyle,
    ...props
  });
  return button;
}

export const createParent = async (props = {}) => {
  const elm = await HStack.create({
    background: {color: Theme.background.main},
    position: 'absolute',
    zIndex: 500,
    boxShadow: Theme.shadows[1],
    lineHeight: 1.2,
    padding: {top: '0.125rem', bottom: '0.125rem', left: '0.125rem', right: '0.125rem'},
    verticalAlignment: 'center',
    border: {radius: '0.375rem', width: '1px', style: 'solid', color: Theme.colors.secondary.light},
    gap: '0.125rem',
    class: 'wrapper',
    ...props
  });
  return elm;
}

export const createModal = async (props = {}) => {
  const elm = await Modal.create({
    background: {color: Theme.background.main},
    boxShadow: Theme.shadows[1],
    lineHeight: 1.2,
    padding: {top: '0.125rem', bottom: '0.125rem', left: '0.125rem', right: '0.125rem'},
    border: {radius: '0.375rem', width: '1px', style: 'solid', color: Theme.colors.secondary.light},
    showBackdrop: false,
    visible: false,
    minWidth: 0,
    isChildFixed: false,
    closeOnScrollChildFixed: false,
    ...props,
    class: customModalStyle
  });
  elm.onClose = () => {
    if (getModalContainer().contains(elm)) {
      getModalContainer().removeChild(elm)
    }
  }
  return elm;
}

let toolbarsMap: Map<string, Control> = new Map();
export const getToolbar = (id: string) => {
  return toolbarsMap.get(id);
}

export const removeToolbar = (id: string) => {
  if (toolbarsMap.has(id)) {
    toolbarsMap.delete(id);
  }
}

export const setToolbar = (id: string, toolbar: Control) => {
  toolbarsMap.set(id, toolbar);
}

export const getToolbars = () => toolbarsMap;

export const getModalContainer = () => {
  let span = document.getElementById("toolbar-container");
  if (!span) {
    span = document.createElement('span');
    span.id = "toolbar-container";
    document.body.appendChild(span);
  }
  return span;
}

export const removeContainer = () => {
  const span = document.getElementById("toolbar-container");
  if (span) {
    span.remove();
  }
}

const textAlignmentToPlacement = (textAlignment: string) => {
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

export const getPlacement = (block: any) => {
  const props = block?.props || {};
  let placement = '';
  if (!("textAlignment" in props)) {
    placement = 'bottom';
  } else {
    placement = textAlignmentToPlacement(props.textAlignment);
  }
  return placement;
}

export const CustomBlockTypes = ['video', 'imageWidget', 'swap', 'chart', 'tweet'];
export const MediaBlockTypes = ['image', ...CustomBlockTypes];
export const WidgetMapping: {[key: string]: any} = {
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
}

const WIDGET_LOADER_URL = 'https://ipfs.scom.dev/ipfs/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4';
export const getWidgetEmbedUrl = (block: PartialBlock) => {
  const type = block.type as string;
  let module = null;
  if (type === 'chart') {
    module = {
      name: `@scom/${block.props?.name || 'scom-line-chart'}`,
      localPath: `${block.props?.name || 'scom-line-chart'}`
    }
  } else {
    module = WidgetMapping[type];
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
}

export const ChartTypes = ['scom-pie-chart', 'scom-line-chart', 'scom-bar-chart', 'scom-area-chart', 'scom-mixed-chart', 'scom-scatter-chart', 'scom-counter'];

export const getChartTypeOptions = () => {
  return [...ChartTypes].map(type => ({ value: type, label: type.split('-')[1]}))
}
