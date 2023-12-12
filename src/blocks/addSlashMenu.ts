import { Control, Modal } from "@ijstech/components";
import { ScomEditorSlashMenu, createModal, getModalContainer } from "../components/index";
import { BlockNoteEditor, CustomSlashMenuState } from "../global/index";

const closeModal = () => {
  const sideMenu = getModalContainer().querySelector('i-scom-editor-side-menu') as Control;
  if (sideMenu && sideMenu.visible) sideMenu.visible = false;
}

export const addSlashMenu = (editor: BlockNoteEditor) => {
  let modal: Modal;
  let menuElm: ScomEditorSlashMenu;
  let popupPlacement: 'topLeft'|'bottomLeft' = 'topLeft';

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
    popupPlacement = window.innerHeight - bottom <= 200 ? 'topLeft' : 'bottomLeft';
    modal.popupPlacement = popupPlacement;
  }

  editor.slashMenu.onUpdate(async (slashMenuState: CustomSlashMenuState) => {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    const block = selectedBlocks[0];
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        popupPlacement,
        padding: {left: 0, top: 0, right: 0, bottom: 0},
        border: {radius: 0, style: 'none'},
        onClose: closeModal,
        onOpen: closeModal
      })
      modal.id = 'mdSlash';
      getModalContainer().appendChild(modal);
    }

    if (slashMenuState.show) {
      updateItems(
        slashMenuState.filteredItems,
        editor.slashMenu.itemCallback,
        slashMenuState.keyboardHoveredItemIndex,
        slashMenuState.referencePos
      );
      if (blockID) {
        const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
        if (blockEl) {
          modal.linkTo = blockEl;
          modal.position = 'fixed';
          if (modal.visible) modal.refresh();
          else modal.visible = true;
        }
      } else {
        modal.visible = false;
      }
    }
  });
};
