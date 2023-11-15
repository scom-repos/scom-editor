import { Modal } from "@ijstech/components";
import { ScomEditorImageToolbar, createModal, getModalContainer } from "../components/index";

export const addImageToolbar = (editor: any) => {
  let modal: Modal;
  let imageToolbar: ScomEditorImageToolbar;

  editor.imageToolbar.onUpdate(async (imageToolbarState: any) => {
    const block = imageToolbarState.block;
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        id: 'pnlImageToolbar',
        popupPlacement: 'center',
        zIndex: 3000,
        width: '31.25rem'
      })
      modal.linkTo = editor.domElement;
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
    // modal.refresh();
    // modal.visible = true;
    // modal.style.top = `${imageToolbarState.referencePos.top + imageToolbarState.referencePos.height}px`;
    // modal.style.left = `${(+parent.width - +modal.width) / 2}px`;
  })
}
