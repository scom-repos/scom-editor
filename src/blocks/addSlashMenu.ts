import { HStack, Label, VStack } from "@ijstech/components";
import { createParent } from "./utils";

export const addSlashMenu = (editor: any, parent: HTMLElement) => {
  let element: HStack;

  async function updateItems(items: any[], onClick: (item: any) => void, selected: number) {
    element.clearInnerHTML();
    const wrapper = await VStack.create({
      gap: '0.25rem',
      padding: {left: '0.25rem', right: '0.25rem'}
    })
    for (let item of items) {
      const hstack = new HStack(wrapper, {
        padding: {top: '0.675rem', bottom: '0.675rem', left: '0.75rem', right: '0.75rem'},
      })
      hstack.onClick = () => {
        onClick(item)
      }
      const label = new Label(hstack, {
        caption: item.name
      })
      hstack.append(label);
      wrapper.append(hstack);
    }
    element.append(wrapper);
  }

  editor.slashMenu.onUpdate(async (slashMenuState: any) => {
    if (!element) {
      element = await createParent();
      parent.appendChild(element);
    }

    if (slashMenuState.show) {
      updateItems(
        slashMenuState.filteredItems,
        editor.slashMenu.itemCallback,
        slashMenuState.keyboardHoveredItemIndex
      );

      element.visible = true;
      element.style.top = slashMenuState.referencePos.top + "px";
      element.style.left =
        slashMenuState.referencePos.x - element.offsetWidth + "px";
    } else {
      // element.visible = false;
    }
  });
};
