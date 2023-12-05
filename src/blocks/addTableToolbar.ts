import { Modal } from "@ijstech/components";
import { BlockNoteEditor } from '../global/index';
import { ScomEditorTableToolbar, createModal, getModalContainer } from '../components/index';

export const addTableToolbar = async (editor: BlockNoteEditor) => {
  let modal: Modal;
  let tableToolbar: ScomEditorTableToolbar;

  editor.tableToolbar.onUpdate(async(tableToolbarState: any) => {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    const block = selectedBlocks[0];
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        popupPlacement: 'topRight',
        overflow: 'hidden',
        maxHeight: '2rem'
      })
      modal.id = 'mdTableToolbar';
      getModalContainer().appendChild(modal);
    }

    if (tableToolbar) {
      tableToolbar.onRefresh();
    } else {
      tableToolbar = await ScomEditorTableToolbar.create({
        editor: editor
      })
      modal.item = tableToolbar;
    }

    if (tableToolbarState.show) {
      const blockEl = blockID && editor.domElement.querySelector(`[data-id="${blockID}"]`);
      // const table = blockEl.querySelector('table') || blockEl?.closest('table');
      if (blockEl) {
        modal.linkTo = blockEl;
        modal.position = 'fixed';
        if (!modal.visible) modal.visible = true;
      } else {
        modal.visible = false;
      }
    }
  });
};
