import { Modal } from "@ijstech/components";
import { ScomEditorImageToolbar, createModal, getModalContainer } from "../components/index";
import { BlockNoteEditor } from "../global/index";

export const addImageToolbar = (editor: BlockNoteEditor) => {
  let modal: Modal;
  let imageToolbar: ScomEditorImageToolbar;

  editor.imageToolbar.onUpdate(async (imageToolbarState: any) => {
    const block = imageToolbarState.block;
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        id: 'pnlImageToolbar',
        popupPlacement: 'bottom',
        zIndex: 2000,
        width: '31.25rem'
      })
      modal.position = "fixed";
      getModalContainer().appendChild(modal);
    }
    if (!imageToolbar) {
      imageToolbar = await ScomEditorImageToolbar.create({
        block: block,
        editor: editor,
        width: '100%',
        display: 'block',
        onUpdated: () => modal.visible = false
      })
      modal.item = imageToolbar;
    }

    if (blockID) {
      const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
      if (blockEl) {
        modal.linkTo = blockEl;
        modal.visible = true;
      }
    } else {
      modal.visible = false;
    }
  })
}
