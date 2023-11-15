import { Control, Modal } from "@ijstech/components";
import { ScomEditorSlashMenu, createModal } from "../components/index";

export const addSlashMenu = (editor: any, parent: Control) => {
  let modal: Modal;

  async function updateItems(items: any[], onClick: (item: any) => void, selected: number) {
    const slashMenu = await ScomEditorSlashMenu.create({
      items,
      selectedIndex: selected,
      onItemClicked: (item: any) => {
        onClick(item);
        modal.visible = false;
      }
    });
    modal.item = slashMenu;
  }

  editor.slashMenu.onUpdate(async (slashMenuState: any) => {
    if (!modal) {
      modal = await createModal({
        id: 'pnlSlashMenu',
        popupPlacement: "center",
        padding: {left: 0, top: 0, right: 0, bottom: 0}
      })
      parent.appendChild(modal);
    }

    if (slashMenuState.show) {
      updateItems(
        slashMenuState.filteredItems,
        editor.slashMenu.itemCallback,
        slashMenuState.keyboardHoveredItemIndex
      );
      modal.visible = true;
    }
    modal.style.top = `${slashMenuState.referencePos.top}px`;
    modal.style.left = '3rem';
  });
};
