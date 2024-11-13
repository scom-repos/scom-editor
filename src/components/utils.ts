import { Button, Control, HStack, Styles, IconName, Modal } from "@ijstech/components";
import { buttonHoverStyle, customModalStyle } from "./index.css";
import { getChartTypes } from "../global/index";
const Theme = Styles.Theme.ThemeVars;

export type IToolbarDropdownItem = {
  text: string;
  icon?: {name: IconName};
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

export const getChartTypeOptions = () => {
  return [...getChartTypes()].map(type => ({ value: type, label: type.split('-')[1]}))
}

export const escapeHTML = (str: string) => {
  return (str || '').replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const revertHtmlTags = (str: string) => {
  return (str || '').replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

export const DEFAULT_LANGUAGE = 'javascript';