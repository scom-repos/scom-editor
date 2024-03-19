import { BlockNoteEditor, PartialBlock, parseStringToObject } from "../global/index";

export const execCustomBLock = (editor: BlockNoteEditor, block: PartialBlock) => {
  // TODO: add loading
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

export const getFileContent = async (url: string) => {
  let result = '';
  if (url) {
    const response = await fetch(url);
    try {
      if (response.ok) {
        result = await response.text();
      }
    } catch (err) { }
  }
  return result;
}

export function getFileType(ext: string) {
  let result = '';
  const video = ['mp4', 'webm', 'mov', 'm3u8'];
  const image = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
  if (video.includes(ext)) {
    result = 'video';
  } else if (image.includes(ext)) {
    result = 'image';
  }
  return result;
}

export async function getBlockFromExtension(url: string) {
  let block = null;
  const ext = url.split('.').pop().toLowerCase();
  const fileType = getFileType(ext);
  switch (fileType) {
    case 'image':
      block = {
        type: "imageWidget",
        props: { url }
      }
      break;
    case 'video':
      block = {
        type: "video",
        props: { url }
      }
      break;
    default:
      block = {
        type: 'paragraph',
        content: [
          {
            type: "link",
            content: [{
              type: "text",
              text: url,
              styles: {}
            }],
            href: url
          }
        ]
      }
      break;
  }
  return block
}
