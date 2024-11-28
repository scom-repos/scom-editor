import { Control, Modal, Styles } from "@ijstech/components";
import { ScomEditorSlashMenu, createModal, getModalContainer, getToolbar, setToolbar } from "../components/index";
import { BlockNoteEditor, CustomSlashMenuState } from "@scom/scom-blocknote-sdk";
import { convertedSlashItem } from "./utils";
const Theme = Styles.Theme.ThemeVars;

const closeSideMenu = () => {
  const sideMenu = getToolbar('sideMenu');
  if (sideMenu) sideMenu.opacity = 0;
}

const openSideMenu = () => {
  const sideMenu = getToolbar('sideMenu');
  if (sideMenu) sideMenu.opacity = 1;
}

const convertedItems = (items: any[]) => {
  return items.map((item: any) => {
    return convertedSlashItem(item);
  });
}

export const addSlashMenu = (editor: BlockNoteEditor) => {
  let modal: Modal;
  let menuElm: ScomEditorSlashMenu;

  async function updateItems(items: any[], onClick: (item: any) => void, selected: number, referencePos: any) {
    const { bottom = 0 } = referencePos;
    const newItems = convertedItems(items);
    const maxHeight = window.innerHeight - bottom - 32;
    if (menuElm) {
      menuElm.setData({
        items: [...newItems],
        selectedIndex: selected
      })
    } else {
      menuElm = await ScomEditorSlashMenu.create({
        items: [...newItems],
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
        popupPlacement: "topLeft",
        padding: {left: 0, top: 0, right: 0, bottom: 0},
        border: {radius: '0.375rem', style: 'solid', width: '1px', color: Theme.colors.secondary.light},
        position: 'absolute',
        zIndex: 9999,
        onClose: closeSideMenu
      })
    }
    setToolbar('slashMenu', modal);

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
      // const isTable = blockEl.closest('table');
      if (sideMenu) {
        openSideMenu();
        editor.sideMenu.freezeMenu();
        modal.linkTo = blockEl;
        modal.showBackdrop = false
        modal.popupPlacement = 'topLeft';
        // let innerMdX = 0;
        // let innerMdY = 0;
        // if (isTable) {
        //   const { x: blockX, y: blockY } = blockEl.getBoundingClientRect();
        //   const { x: sideMenuX } = sideMenu.getBoundingClientRect();
        //   innerMdX = blockX - sideMenuX;
        //   innerMdY = blockY;
        // }
        // const innerModal = modal.querySelector('.modal') as HTMLElement;
        // if (innerModal) {
        //   innerModal.style.left = `${innerMdX}px`;
        //   innerModal.style.top = `${innerMdY}px`;
        // }
        if (modal.visible) modal.refresh();
        else modal.visible = true;
      } else {
        modal.visible = false;
      }
    }
  });
};
