import { BlockNoteEditor } from '../global/index';
import { ScomEditorTableToolbar, createModal, getModalContainer } from '../components/index';

export const addTableToolbar = async (editor: BlockNoteEditor) => {
  let columnTableHandle: ScomEditorTableToolbar;
  let rowTableHandle: ScomEditorTableToolbar;
  let draggedCellOrientation: 'row'|'col'|undefined = undefined;
  let mousePos: number|undefined = undefined;
  let hideRow = false;
  let hideCol = false;

  editor.tableHandles.onUpdate(async(tableToolbarState: any) => {
    const { referencePosCell, referencePosTable, draggingState, colIndex, rowIndex, block, show } = tableToolbarState;
    if (draggingState) {
      draggedCellOrientation = draggingState.draggedCellOrientation;
      mousePos = draggingState.mousePos;
    } else {
      draggedCellOrientation = undefined;
      mousePos = undefined;
    }

    const getReferenceClientRectRow = () => {
      if (!referencePosCell || !referencePosTable) {
        return undefined;
      }

      if (draggedCellOrientation === "row") {
        return () =>
          new DOMRect(
            referencePosTable.x,
            mousePos!,
            referencePosTable.width,
            0
          );
      }

      return () =>
        new DOMRect(
          referencePosTable.x,
          referencePosCell.y,
          referencePosTable.width,
          referencePosCell.height
        );
    }

    const getReferenceClientRectColumn = () => {
      if (!referencePosCell || !referencePosTable) {
        return undefined;
      }

      if (draggedCellOrientation === "col") {
        return () =>
          new DOMRect(
            mousePos!,
            referencePosTable.y,
            0,
            referencePosTable.height
          );
      }

      return () =>
        new DOMRect(
          referencePosCell.x,
          referencePosTable.y,
          referencePosCell.width,
          referencePosTable.height
        );
    }


    const { x: columnX, y: columnY } = getReferenceClientRectColumn()?.();
    const { width: cellWidth, height: cellHeight } = referencePosCell;
    if (columnTableHandle) {
      columnTableHandle.style.left = `${columnX + cellWidth / 2 - columnTableHandle.offsetWidth / 2}px`; //
      columnTableHandle.style.top = `${columnY - columnTableHandle.offsetHeight / 2}px`;
      columnTableHandle.setData({ editor, block, index: colIndex, orientation: 'column' });
      columnTableHandle.visible = show && draggedCellOrientation !== "row" && !hideCol;
    } else {
      columnTableHandle = await ScomEditorTableToolbar.create({
        orientation: 'column',
        editor,
        index: colIndex,
        block,
        position: 'fixed',
        zIndex: 1000,
        dragStart: editor.tableHandles!.colDragStart,
        // dragEnd={props.editor.tableHandles!.dragEnd}
        // freezeHandles={props.editor.tableHandles!.freezeHandles}
        // unfreezeHandles={props.editor.tableHandles!.unfreezeHandles}
        showOtherSide: () => hideRow = false,
        hideOtherSide: () => hideRow = true,
        visible: false
      })
      getModalContainer().appendChild(columnTableHandle);
    }

    const { x: rowX, y: rowY } = getReferenceClientRectRow()?.();
    if (rowTableHandle) {
      rowTableHandle.style.left = `${rowX - rowTableHandle.offsetWidth / 2}px`;
      rowTableHandle.style.top = `${rowY + cellHeight / 2 - rowTableHandle.offsetHeight / 2}px`;
      rowTableHandle.setData({ editor, block, index: rowIndex, orientation: 'row' });
      rowTableHandle.visible = show && draggedCellOrientation !== "col" && !hideRow;
    } else {
      rowTableHandle = await ScomEditorTableToolbar.create({
        orientation: "row",
        editor,
        index: rowIndex!,
        block,
        position: 'fixed',
        zIndex: 1000,
        dragStart: editor.tableHandles!.rowDragStart,
        // dragEnd={props.editor.tableHandles!.dragEnd}
        // freezeHandles={props.editor.tableHandles!.freezeHandles}
        // unfreezeHandles={props.editor.tableHandles!.unfreezeHandles}
        showOtherSide: () => hideCol = false,
        hideOtherSide: () => hideCol = true,
        visible: false
      });
      getModalContainer().appendChild(rowTableHandle);
    }
  });
};
