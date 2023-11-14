import { Control, Modal } from "@ijstech/components";
import { CustomFormattingToolbarState } from '../global/index';
import { ScomEditorFormattingToolbar, createModal } from '../components/index';

export const addFormattingToolbar = async (editor: any, parent: Control) => {
  let modal: Modal;
  let formattingToolbar: ScomEditorFormattingToolbar;

  editor.formattingToolbar.onUpdate(async(formattingToolbarState: CustomFormattingToolbarState) => {
    if (!modal) {
      modal = await createModal({
        id: 'pnlFormattingToolbar'
      })
      parent.append(modal);
    }

    if (!formattingToolbar) {
      formattingToolbar = await ScomEditorFormattingToolbar.create({
        editor: editor
      })
      modal.item = formattingToolbar;
    } else {
      formattingToolbar.onRefresh();
    }

    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    const isImageBlock =
      selectedBlocks.length === 1 &&
      selectedBlocks[0].type === "image";

    const top = formattingToolbarState.referencePos.top - (formattingToolbarState.referencePos.height / 2);
    modal.style.top = isImageBlock ? `${formattingToolbarState.referencePos.top}px` : `${top}px`;
    modal.style.left = `${formattingToolbarState.referencePos.width / 2}px`;

    modal.refresh();
    modal.visible = true; // TODO: formattingToolbarState.show;
  });
};
