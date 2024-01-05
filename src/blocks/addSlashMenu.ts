import { Control, Modal } from "@ijstech/components";
import { ScomEditorSlashMenu, createModal, getModalContainer, getToolbar, setToolbar } from "../components/index";
import { BlockNoteEditor, CustomSlashMenuState } from "../global/index";

const closeSideMenu = () => {
  const sideMenu = getToolbar('sideMenu');
  if (sideMenu) sideMenu.opacity = 0;
}

const openSideMenu = () => {
  const sideMenu = getToolbar('sideMenu');
  if (sideMenu) sideMenu.opacity = 1;
}

export const addSlashMenu = (editor: BlockNoteEditor) => {
  let modal: Modal;
  let menuElm: ScomEditorSlashMenu;

  async function updateItems(items: any[], onClick: (item: any) => void, selected: number, referencePos: any) {
    const { bottom = 0 } = referencePos;
    const maxHeight = window.innerHeight - bottom - 32;
    if (menuElm) {
      menuElm.setData({
        items: [...items],
        selectedIndex: selected
      })
    } else {
      menuElm = await ScomEditorSlashMenu.create({
        items: [...items],
        selectedIndex: selected,
        border: {radius: 'inherit'},
        height:'auto',
        onItemClicked: (item: any) => onClick(item)
      });
      modal.item = menuElm;
    }
    menuElm.updateMaxHeight(maxHeight <= 200 ? 200 : maxHeight);
  }

  editor.slashMenu.onUpdate(async (slashMenuState: CustomSlashMenuState) => {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    const block = selectedBlocks[0];
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        popupPlacement: "rightTop",
        padding: {left: 0, top: 0, right: 0, bottom: 0},
        border: {radius: 0, style: 'none'},
        position: 'absolute',
        // isChildFixed: true,
        // closeOnScrollChildFixed: true,
        zIndex: 9999,
        onClose: closeSideMenu
      })
      setToolbar('slashMenu', modal);
    }

    if (!getModalContainer().contains(modal)) {
      getModalContainer().appendChild(modal);
    }

    if (slashMenuState.show) {
      updateItems(
        slashMenuState.filteredItems,
        editor.slashMenu.itemCallback,
        slashMenuState.keyboardHoveredItemIndex,
        slashMenuState.referencePos
      );

      const sideMenu = getToolbar('sideMenu');
      const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`) as Control;
      const isTable = blockEl.closest('table');
      if (sideMenu) {
        openSideMenu();
        editor.sideMenu.freezeMenu();
        modal.linkTo = sideMenu;
        modal.popupPlacement = isTable ? 'topLeft' : 'rightTop';
        // modal.position = 'fixed';
        let innerMdX = 0;
        let innerMdY = 0;
        if (isTable) {
          const { x: blockX, y: blockY, height: blockHeight } = blockEl.getBoundingClientRect();
          const { x: sideMenuX, y: sideMenuY } = sideMenu.getBoundingClientRect();
          innerMdX = blockX - sideMenuX;
          innerMdY = blockY - sideMenuY - blockHeight;
        }
        const innerModal = modal.querySelector('.modal') as HTMLElement;
        if (innerModal) {
          innerModal.style.left = `${innerMdX}px`;
          innerModal.style.top = `${innerMdY}px`;
        }
        if (modal.visible) modal.refresh();
        else modal.visible = true;
      } else {
        modal.visible = false;
      }
    }
  });
};
