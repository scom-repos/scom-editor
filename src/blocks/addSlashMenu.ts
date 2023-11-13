import { Control, HStack } from "@ijstech/components";
import { createParent, setShown } from "./utils";
import { ScomEditorSlashMenu } from "../components/index";

export const addSlashMenu = (editor: any, parent: Control) => {
  let element: HStack;

  async function updateItems(items: any[], onClick: (item: any) => void, selected: number) {
    element.clearInnerHTML();
    const slashMenu = await ScomEditorSlashMenu.create({
      items,
      selectedIndex: selected,
      onItemClicked: (item: any) => {
        onClick(item);
        element.visible = false;
      }
    });
    element.append(slashMenu);
  }

  editor.slashMenu.onUpdate(async (slashMenuState: any) => {
    if (!element) {
      element = await createParent({
        id: 'pnlSlashMenu',
        padding: {left: 0, top: 0, right: 0, bottom: 0}
      });
      parent.appendChild(element);
    }

    if (slashMenuState.show) {
      updateItems(
        slashMenuState.filteredItems,
        editor.slashMenu.itemCallback,
        slashMenuState.keyboardHoveredItemIndex
      );
      setShown(parent, element);
    }
    element.style.top = slashMenuState.referencePos.top + "px";
    element.style.left = '3rem';
  });
};
