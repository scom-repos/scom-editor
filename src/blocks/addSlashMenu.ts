import { Control, Modal } from "@ijstech/components";
import { ScomEditorSlashMenu, createModal, getModalContainer } from "../components/index";
import { BlockNoteEditor, CustomSlashMenuState } from "../global/index";

export const addSlashMenu = (editor: BlockNoteEditor) => {
  let modal: Modal;
  let menuElm: ScomEditorSlashMenu;
  let popupPlacement: 'topLeft'|'bottomLeft' = 'topLeft';

  async function updateItems(items: any[], onClick: (item: any) => void, selected: number, referencePos: any) {
    const { bottom = 0 } = referencePos;
    const maxHeight = window.innerHeight - bottom - 32;
    menuElm = await ScomEditorSlashMenu.create({
      items: [...items],
      selectedIndex: selected,
      overflow: {y: 'auto'},
      maxHeight: maxHeight <= 200 ? 200 : maxHeight,
      display: 'block',
      onItemClicked: (item: any) => {
        onClick(item);
        modal.visible = false;
      }
    });
    popupPlacement = window.innerHeight - bottom <= 200 ? 'topLeft' : 'bottomLeft';
    modal.popupPlacement = popupPlacement;
    modal.item = menuElm;
    modal.refresh();
  }

  editor.slashMenu.onUpdate(async (slashMenuState: CustomSlashMenuState) => {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    const block = selectedBlocks[0];
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        popupPlacement,
        padding: {left: 0, top: 0, right: 0, bottom: 0}
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
          modal.visible = true;
          const sideMenu = editor.domElement?.parentElement?.querySelector('#pnlSideMenu');
          if (sideMenu) sideMenu.visible = false;
        }
      } else {
        modal.visible = false;
      }
    }
  });
};
