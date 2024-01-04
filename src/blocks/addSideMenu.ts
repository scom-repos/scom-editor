import { BlockNoteEditor, CustomSideMenuState } from "../global/index";
import { ScomEditorSideMenu, getModalContainer, setToolbar, customModalStyle } from "../components/index";

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
      setToolbar('sideMenu', sideMenu);
    }
    if (!getModalContainer().contains(sideMenu)) {
      getModalContainer().appendChild(sideMenu);
    }

    if (sideMenuState.show) {
      sideMenu.block = sideMenuState.block;
      sideMenu.opacity = editor.isFocused() ? 1 : 0;
      const blockEl = sideMenuState?.block?.id && editor.domElement.querySelector(`[data-id="${sideMenuState.block.id}"]`) as HTMLElement;
      // if (blockEl) {
      //   const { top, left } = blockEl.getBoundingClientRect();
      //   const menuHeight = sideMenu.offsetHeight || 20;
      //   const menuWidth = sideMenu.offsetWidth || 50;
      //   const extra = window.outerHeight - window.innerHeight
      //   sideMenu.style.top = `${top + blockEl.offsetHeight / 2 - menuHeight / 2}px`;
      //   sideMenu.style.left = `${left - menuWidth}px`;
      // } else {
      //   sideMenu.opacity = 0;
      // }
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
