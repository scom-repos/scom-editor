import { Control, HStack, Styles } from "@ijstech/components";
import { CustomSideMenuState } from "../global/index";
import { createButton, createParent } from "./utils";
import { ScomEditorSideMenu, ColorType } from "../components/index";
const Theme = Styles.Theme.ThemeVars;

const getToolbarButtons = (editor: any, sideMenuState: CustomSideMenuState) => {
  const iconProps = {width: '0.75rem', height: '0.75rem', fill: Theme.text.primary};
  return [
    {
      icon: {...iconProps, name: 'plus'},
      padding: {top: 0, bottom: 0, left: '0.25rem', right: '0.25rem'},
      minWidth: 0,
      onClick: () => {
        editor.sideMenu.addBlock();
      }
    },
    {
      customControl: () => {
        const currentBlock = sideMenuState.block;
        const dragBtn = new ScomEditorSideMenu(undefined, {
          display: 'inline-flex',
          grid: {verticalAlignment: 'center'},
          padding: {top: 0, bottom: 0, left: '0.25rem', right: '0.25rem'},
          height: '100%',
          minHeight: '1.875rem',
          block: currentBlock,
          onSetColor: (type: ColorType, color: string) => updateColor(editor, currentBlock, type, color),
          onDeleted: (block: any) => {  editor.removeBlocks([block]) }
        })
        dragBtn.addEventListener("dragstart", editor.sideMenu.blockDragStart);
        dragBtn.addEventListener("dragend", editor.sideMenu.blockDragEnd);
        dragBtn.draggable = true;
        return dragBtn;
      }
    }
  ]
}

function updateColor(editor: any, currentBlock: any, type: ColorType, color: string) {
  const prop = type === 'text' ? 'textColor' : 'backgroundColor';
  editor.updateBlock(currentBlock, {
    props: { [prop]: color }
  })
}

export const addSideMenu = (editor: any, parent: HTMLElement) => {
  let element: HStack;
  let buttonList = [];

  editor.sideMenu.onUpdate(async (sideMenuState: CustomSideMenuState) => {
    if (!element) {
      element = await createParent({
        border: {radius: '0px', style: 'none'},
        background: {color: 'transparent'},
        boxShadow: 'none'
      });
      buttonList = getToolbarButtons(editor, sideMenuState);
      for (let props of buttonList) {
        if (props.customControl) {
          const elm = props.customControl(element);
          element.appendChild(elm);
        } else {
          const btn = createButton(props, element);
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
    } else {
      // element.visible = false;
    }
  });
};
