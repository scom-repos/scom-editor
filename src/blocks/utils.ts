import { BlockNoteEditor, PartialBlock } from "../global/index";

export const execCustomBLock = (editor: BlockNoteEditor, block: PartialBlock) => {
  const currentBlock = editor.getTextCursorPosition().block;
  if (
    Array.isArray(currentBlock.content) &&
    ((currentBlock.content.length === 1 &&
      currentBlock.content[0].type === "text" &&
      (currentBlock.content[0].text === "/" || !currentBlock.content[0].text)) ||
      currentBlock.content.length === 0)
  ) {
    editor.updateBlock(currentBlock, block);
  } else {
    editor.insertBlocks([block], currentBlock, "after");
  }
  editor.setTextCursorPosition(
    editor.getTextCursorPosition().nextBlock!,
    "end"
  );
}
