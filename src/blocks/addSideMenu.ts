import { Control, HStack } from "@ijstech/components";
import { CustomSideMenuState } from "../global/index";
import { createParent, setShown } from "./utils";
import { ScomEditorSideMenu } from "../components/index";

export const addSideMenu = (editor: any, parent: Control) => {
  let element: HStack;
  let sideMenu: ScomEditorSideMenu;

  editor.sideMenu.onUpdate(async (sideMenuState: CustomSideMenuState) => {
    if (!element) {
      element = await createParent({
        id: 'pnlSideMenu',
        border: {radius: '0px', style: 'none'},
        background: {color: 'transparent'},
        boxShadow: 'none',
        visible: false
      });

      sideMenu = await ScomEditorSideMenu.create({
        block: sideMenuState.block,
        editor: editor
      })
      element.appendChild(sideMenu);
      parent.appendChild(element);
    }

    if (sideMenuState.show) {
      if (sideMenu.isShowing) editor.sideMenu.freezeMenu();
      else editor.sideMenu.unfreezeMenu();
      sideMenu.block = sideMenuState.block;
      element.visible = true;
    }
    const { top: parentTop } = parent.getBoundingClientRect();
    const top = sideMenuState.referencePos.top - parentTop;
    element.style.top = `${top + (sideMenuState.referencePos.height / 2) - sideMenu.offsetHeight / 2}px`;
    element.style.left = `${0}px`;
  });
};
