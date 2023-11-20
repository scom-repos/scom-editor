import { Modal } from "@ijstech/components";
import { BlockNoteEditor, CustomFormattingToolbarState } from '../global/index';
import { MediaBlockTypes, ScomEditorFormattingToolbar, createModal, getModalContainer, getPlacement } from '../components/index';

export const addFormattingToolbar = async (editor: BlockNoteEditor) => {
  let modal: Modal;
  let formattingToolbar: ScomEditorFormattingToolbar;

  editor.formattingToolbar.onUpdate(async(formattingToolbarState: CustomFormattingToolbarState) => {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    const block = selectedBlocks[0];
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        id: 'pnlFormattingToolbar',
        popupPlacement: getPlacement(block),
        zIndex: 3000,
        overflow: 'hidden'
      })
      modal.linkTo = editor.domElement;
      modal.position = "fixed";
      getModalContainer().appendChild(modal);
    }

    if (formattingToolbar) {
      formattingToolbar.onRefresh();
    } else {
      formattingToolbar = await ScomEditorFormattingToolbar.create({
        editor: editor
      })
      modal.item = formattingToolbar;
    }

    const isMediaBlock =
      selectedBlocks.length === 1 &&
      MediaBlockTypes.includes(selectedBlocks[0].type);
    modal.popupPlacement = isMediaBlock ? 'top' : getPlacement(block) as any;

    if (formattingToolbarState.show) {
      const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
      if (blockEl) modal.linkTo = blockEl;
      modal.refresh();
      modal.visible = true;
    }
  });
};
