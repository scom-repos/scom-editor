import { ScomEditorSideMenu, getModalContainer, setToolbar, customModalStyle } from "../components/index";
import { BlockNoteEditor, CustomSideMenuState } from "@scom/scom-blocknote-sdk";

export const addSideMenu = (editor: BlockNoteEditor) => {
  let sideMenu: ScomEditorSideMenu;

  editor.sideMenu.onUpdate(async (sideMenuState: CustomSideMenuState) => {
    if (!sideMenu) {
      sideMenu = await ScomEditorSideMenu.create({
        block: sideMenuState.block,
        editor: editor,
        position: 'absolute',
        zIndex: 9999,
        class: customModalStyle
      })
    }
    setToolbar('sideMenu', sideMenu);
    if (!getModalContainer().contains(sideMenu)) {
      getModalContainer().appendChild(sideMenu);
    }

    if (sideMenuState.show) {
      sideMenu.block = sideMenuState.block;
      sideMenu.opacity = editor.isFocused() ? 1 : 0;
      const blockEl = sideMenuState?.block?.id && editor.domElement.querySelector(`[data-id="${sideMenuState.block.id}"]`) as HTMLElement;
      if (blockEl) {
        const menuHeight = sideMenu.offsetHeight || 20;
        const menuWidth = sideMenu.offsetWidth || 50;
        const { top: parentTop, left: parentLeft } = editor.domElement.getBoundingClientRect();
        sideMenu.style.top = `${window.scrollY + parentTop + blockEl.offsetTop + blockEl.offsetHeight / 2 - menuHeight / 2}px`;
        sideMenu.style.left = `${window.scrollX + parentLeft + blockEl.offsetLeft - menuWidth}px`;
      } else {
        sideMenu.opacity = 0;
      }
    }
  });
};
