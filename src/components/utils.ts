import { Button, Control, HStack, Styles, IconName, Modal } from "@ijstech/components";
import { formatKeyboardShortcut } from "../global/index";
import { buttonHoverStyle } from "./index.css";
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
    }
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
    isChildFixed: true,
    closeOnScrollChildFixed: true,
    ...props
  });
  return elm;
}

export const getModalContainer = () => {
  let span = document.getElementById("toolbar-container");
  if (!span) {
    span = document.createElement('span');
    span.id = "toolbar-container";
    document.body.appendChild(span);
  }
  return span;
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
  let placement = '';
  if (!("textAlignment" in block.props)) {
    placement = 'bottom';
  } else {
    placement = textAlignmentToPlacement(block.props.textAlignment);
  }
  return placement;
}

export const CustomBlockTypes = ['video', 'imageWidget'];
export const MediaBlockTypes = ['video', 'image', 'imageWidget'];
export const TypeMapping = {
  '@scom/scom-video': 'video',
  '@scom/scom-image': 'imageWidget'
}
export const WidgetMapping: {[key: string]: any} = {
  video: {
    name: '@scom/scom-video',
    localPath: 'scom-video'
  },
  imageWidget: {
    name: '@scom/scom-image',
    localPath: 'scom-image'
  }
}
