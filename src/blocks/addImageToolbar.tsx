import { Control, Modal } from "@ijstech/components";
import { ScomEditorImageToolbar, createModal } from "../components/index";

export const addImageToolbar = (editor: any, parent: Control) => {
  let modal: Modal;
  let imageToolbar: ScomEditorImageToolbar;

  editor.imageToolbar.onUpdate(async (imageToolbarState: any) => {
    if (!modal) {
      modal = await createModal({
        id: 'pnlImageToolbar',
        width: 500
      })
      parent.append(modal);
    }
    if (!imageToolbar) {
      imageToolbar = await ScomEditorImageToolbar.create({
        block: imageToolbarState.block,
        editor: editor,
        width: '100%',
        display: 'block',
        onUpdated: () => modal.visible = false
      })
      modal.item = imageToolbar;
    }
    modal.refresh();
    modal.visible = true;
    modal.style.top = `${imageToolbarState.referencePos.top + imageToolbarState.referencePos.height}px`;
    // modal.style.left = `${imageToolbarState.referencePos.left - (+modal.width / 2)}px`;
    modal.style.left = `${(+parent.width - +modal.width) / 2}px`;
  })
}
