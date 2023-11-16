import { Modal } from "@ijstech/components";
import { ScomEditorSlashMenu, createModal, getModalContainer } from "../components/index";
import { CustomSlashMenuState } from "../global/index";

export const addSlashMenu = (editor: any) => {
  let modal: Modal;
  let menuElm: ScomEditorSlashMenu;

  async function updateItems(items: any[], onClick: (item: any) => void, selected: number, referencePos: any) {
    menuElm = await ScomEditorSlashMenu.create({
      items,
      selectedIndex: selected,
      referencePos,
      onItemClicked: (item: any) => {
        onClick(item);
        modal.visible = false;
      }
    });
    modal.item = menuElm;
  }

  editor.slashMenu.onUpdate(async (slashMenuState: CustomSlashMenuState) => {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    const block = selectedBlocks[0];
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        id: 'pnlSlashMenu',
        popupPlacement: 'bottomLeft',
        padding: {left: 0, top: 0, right: 0, bottom: 0},
        zIndex: 3000
      })
      modal.linkTo = editor.domElement;
      modal.position = "fixed";
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
          modal.visible = true;
        }
      } else {
        modal.visible = false;
      }
    }
  });
};
