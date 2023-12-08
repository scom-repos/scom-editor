import { BlockNoteEditor, PartialBlock, parseStringToObject } from "../global/index";

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

export function parseUrl(href: string) {
  const WIDGET_LOADER_URL = 'https://ipfs.scom.dev/ipfs/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4';
  if (href.startsWith(WIDGET_LOADER_URL)) {
    const [_, params = ''] = href.split('?');
    const dataStr = params.replace('data=', '');
    return dataStr ? parseStringToObject(dataStr) : null;
  }
  return null;
}