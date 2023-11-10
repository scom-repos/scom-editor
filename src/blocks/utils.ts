import { Button, Control, HStack, Styles } from "@ijstech/components";
import { buttonHoverStyle } from "./index.css";
const Theme = Styles.Theme.ThemeVars;

interface IButtonProps {
  caption?: string;
  icon?: any;
  enabled?: boolean;
  border?: any;
  isSelected?: boolean;
  onClick?: (target: Control, event: MouseEvent) => void;
}

export const createButton = (props: IButtonProps, parent: Control) => {
  const border = props?.border || {};
  border.radius = '0.25rem';
  const onClick = props.onClick;
  props.onClick = (target: Control, event: MouseEvent) => {
    // TODO: check by selected block
    // const isSelected = props.isSelected ?? false;
    // props.isSelected = !isSelected;
    // target.background.color = props.isSelected ? Theme.action.activeBackground : 'transparent';
    onClick(target, event);
  }
  const button = new Button(parent, {
    font: {size: '0.875rem'},
    padding: {top: '0px', bottom: '0px', left: '0.5rem', right: '0.5rem'},
    border: {...border},
    background: {color: 'transparent'},
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
    zIndex: 3000,
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
