import { BlockNoteEditor } from '../global/index';
import { ScomEditorTableToolbar, getModalContainer } from '../components/index';
import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

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
      const offsetHeight = columnTableHandle.offsetHeight || 20;
      const offsetWidth = columnTableHandle.offsetWidth || 24;
      columnTableHandle.style.top = `${window.scrollY + columnY - offsetHeight / 2}px`;
      columnTableHandle.style.left = `${window.scrollX + columnX + cellWidth / 2 - offsetWidth / 2}px`;
      columnTableHandle.setData({ editor, block, index: colIndex, orientation: 'column' });
      columnTableHandle.visible = show && draggedCellOrientation !== "row" && !hideCol;
    } else {
      columnTableHandle = await ScomEditorTableToolbar.create({
        orientation: 'column',
        editor,
        index: colIndex,
        block,
        position: 'absolute',
        zIndex: 9999,
        dragStart: editor.tableHandles!.colDragStart,
        dragEnd: editor.tableHandles!.dragEnd,
        freezeHandles: editor.tableHandles!.freezeHandles,
        unfreezeHandles: editor.tableHandles!.unfreezeHandles,
        showOtherSide: () => {
          hideRow = false;
          rowTableHandle.visible = show && draggedCellOrientation !== "col" && !hideRow;
        },
        hideOtherSide: () => {
          hideRow = true;
          rowTableHandle.visible = show && draggedCellOrientation !== "col" && !hideRow;
        },
        visible: false
      })
      columnTableHandle.id = "column";
    }
    if (!getModalContainer().contains(columnTableHandle)) {
      getModalContainer().appendChild(columnTableHandle);
    }

    const { x: rowX, y: rowY } = getReferenceClientRectRow()?.();
    if (rowTableHandle) {
      const offsetHeight = rowTableHandle.offsetHeight || 20;
      const offsetWidth = rowTableHandle.offsetWidth || 24;
      rowTableHandle.style.top = `${window.scrollY + rowY + cellHeight / 2 - offsetHeight / 2}px`;
      rowTableHandle.style.left = `${window.scrollX + rowX - offsetWidth / 2}px`;
      rowTableHandle.setData({ editor, block, index: rowIndex, orientation: 'row' });
      rowTableHandle.visible = show && draggedCellOrientation !== "col" && !hideRow;
    } else {
      rowTableHandle = await ScomEditorTableToolbar.create({
        orientation: "row",
        editor,
        index: rowIndex!,
        block,
        position: 'absolute',
        zIndex: 9999,
        dragStart: editor.tableHandles!.rowDragStart,
        dragEnd: editor.tableHandles!.dragEnd,
        freezeHandles: editor.tableHandles!.freezeHandles,
        unfreezeHandles: editor.tableHandles!.unfreezeHandles,
        showOtherSide: () => {
          hideCol = false;
          columnTableHandle.visible = show && draggedCellOrientation !== "row" && !hideCol;
        },
        hideOtherSide: () => {
          hideCol = true;
          columnTableHandle.visible = show && draggedCellOrientation !== "row" && !hideCol;
        },
        visible: false
      });
      rowTableHandle.id = "row";
    }

    if (!getModalContainer().contains(rowTableHandle)) {
      getModalContainer().appendChild(rowTableHandle);
    }
  });
};
