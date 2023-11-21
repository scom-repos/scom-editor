import { HStack } from "@ijstech/components";
import { BlockNoteEditor, CustomSideMenuState } from "../global/index";
import { ScomEditorSideMenu, createParent } from "../components/index";

export const addSideMenu = (editor: BlockNoteEditor) => {
  let element: HStack;
  let sideMenu: ScomEditorSideMenu;

  editor.sideMenu.onUpdate(async (sideMenuState: CustomSideMenuState) => {
    const block = {...sideMenuState.block};
    if (!element) {
      element = await createParent({
        border: {radius: '0px', style: 'none'},
        padding: {top: 0, left: '0.125rem', right: '0.125rem', bottom: 0},
        background: {color: 'transparent'},
        boxShadow: 'none',
        visible: false
      });
      element.id = 'pnlSideMenu';

      sideMenu = await ScomEditorSideMenu.create({
        block: block,
        editor: editor
      })
      element.appendChild(sideMenu);
      editor.domElement.parentElement.appendChild(element);
    }

    if (sideMenuState.show) {
      if (sideMenu.isShowing) editor.sideMenu.freezeMenu();
      else editor.sideMenu.unfreezeMenu();
      sideMenu.block = sideMenuState.block;
      element.visible = true;
    }
    const { top: parentTop } = editor.domElement.parentElement.getBoundingClientRect();
    const top = sideMenuState.referencePos.top - parentTop;
    element.style.top = `${top + (sideMenuState.referencePos.height / 2) - sideMenu.offsetHeight / 2}px`;
    element.style.left = `${0}px`;
  });
};
