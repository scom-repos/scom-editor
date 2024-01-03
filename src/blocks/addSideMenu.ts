import { BlockNoteEditor, CustomSideMenuState } from "../global/index";
import { ScomEditorSideMenu, getModalContainer } from "../components/index";

export const addSideMenu = (editor: BlockNoteEditor) => {
  let sideMenu: ScomEditorSideMenu;

  editor.sideMenu.onUpdate(async (sideMenuState: CustomSideMenuState) => {
    if (!sideMenu) {
      sideMenu = await ScomEditorSideMenu.create({
        block: sideMenuState.block,
        editor: editor,
        position: 'fixed',
        zIndex: 9999,
        visible: false
      })
      getModalContainer().appendChild(sideMenu);
    }

    if (sideMenuState.show) {
      sideMenu.block = sideMenuState.block;
      sideMenu.visible = editor.isFocused();
    }

    const blockEl = sideMenuState?.block?.id && editor.domElement.querySelector(`[data-id="${sideMenuState.block.id}"]`) as HTMLElement;
    if (blockEl) {
      const menuHeight = sideMenu.offsetHeight || 20;
      const menuWidth = sideMenu.offsetWidth || 50;
      sideMenu.style.top = `${sideMenuState.referencePos.y + blockEl.offsetHeight / 2 - menuHeight / 2}px`;
      sideMenu.style.left = `${sideMenuState.referencePos.x - menuWidth}px`;
    } else {
      sideMenu.visible = false;
    }
  });
};
