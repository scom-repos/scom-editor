import { ScomStorage } from '@scom/scom-storage';
import { BlockNoteEditor } from "../global/index";
import { execCustomBLock, getBlockFromExtension } from './utils';

async function renderBlock(editor: BlockNoteEditor, url: string) {
  try {
    const block = await getBlockFromExtension(url);
    if (block) execCustomBLock(editor, block);
  } catch (error) { }
}

export function addFileBlock() {
  let storageEl: ScomStorage = null

  const FileSlashItem = {
    name: "File",
    execute: async (editor: BlockNoteEditor) => {
      if (!storageEl) {
        storageEl = ScomStorage.getInstance();
        storageEl.onOpen = async (path: string) => {
          storageEl.closeModal();
          await renderBlock(editor, path);
        }
        storageEl.onCancel = () => storageEl.closeModal();
      }
      storageEl.openModal({
        width: 800,
        maxWidth: '100%',
        height: '90vh',
        overflow: 'hidden'
      })
    },
    aliases: ["file", "media"]
  }

  return {
    FileSlashItem
  }
};
