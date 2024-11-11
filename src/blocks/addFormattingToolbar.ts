import { Control, Modal } from "@ijstech/components";
import { ScomEditorFormattingToolbar, createModal, getModalContainer, getPlacement } from '../components/index';
import { BasicBlockTypes, BlockNoteEditor, CustomFormattingToolbarState } from "@scom/scom-blocknote-sdk";

export const addFormattingToolbar = async (editor: BlockNoteEditor) => {
  let modal: Modal;
  let formattingToolbar: ScomEditorFormattingToolbar;

  editor.formattingToolbar.onUpdate(async(formattingToolbarState: CustomFormattingToolbarState) => {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    const block = selectedBlocks[0];
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        popupPlacement: getPlacement(block),
        overflow: 'hidden',
        maxHeight: '2rem',
        minWidth: 'max-content',
        zIndex: 9999
      })
      modal.id = 'mdFormatting';
    }
    if (!getModalContainer().contains(modal))
      getModalContainer().appendChild(modal);

    if (formattingToolbar) {
      formattingToolbarState.show && formattingToolbar.onRefresh();
    } else {
      formattingToolbar = await ScomEditorFormattingToolbar.create({
        editor: editor
      })
      modal.item = formattingToolbar;
    }

    const isMediaBlock =
      selectedBlocks.length === 1 &&
      !BasicBlockTypes.includes(selectedBlocks[0].type);
    modal.popupPlacement = isMediaBlock ? 'top' : getPlacement(block) as any;

    if (formattingToolbarState.show) {
      if (blockID) {
        const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`) as Control;
        if (blockEl) {
          modal.linkTo = blockEl;
          modal.showBackdrop = false;
          modal.position = 'absolute';
          if (modal.visible) modal.refresh();
          else modal.visible = true;
        }
      } else {
        modal.visible = false;
      }
    } else {
      // modal.visible = false;
      // TODO: check blur event on format plugin
    }
  });
};
