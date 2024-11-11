import { ScomStorage } from '@scom/scom-storage';
import { BlockNoteEditor, execCustomBLock } from '@scom/scom-blocknote-sdk';
import { modalStyle } from '../components/index';
import { Styles } from '@ijstech/components';
import { getBlockFromExtension } from '../global/index';

const Theme = Styles.Theme.ThemeVars;

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
        storageEl.uploadMultiple = false;
        storageEl.onUploadedFile = async (path: string) => {
          storageEl.closeModal();
          await renderBlock(editor, path);
        }
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
        overflow: 'hidden',
        zIndex: 1000,
        closeIcon: {width: '1rem', height: '1rem', name: 'times', fill: Theme.text.primary, margin: {bottom: '0.5rem'}},
        class: modalStyle
      })
      storageEl.onShow();
    },
    aliases: ["file", "media"]
  }

  return {
    FileSlashItem
  }
};
