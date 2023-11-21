import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import ScomImage from "@scom/scom-image";

export function addImageBlock(blocknote: any) {
  const ImageBlock = blocknote.createBlockSpec({
    type: "imageWidget",
    propSchema: {
      ...blocknote.defaultProps,
      url: {default: ''},
      cid: {default: ''},
      link: {default: ''},
      altText: {default: '',},
      keyword: {default: ''},
      photoId: {default: ''},
      embedUrl: {default: ''},
      width: {default: 512},
      height: {default: 'auto'}
    },
    containsInlineContent: false,
    render: (block: Block, editor: BlockNoteEditor) => {
      const wrapper = new Panel();
      const { url, cid, link, altText, keyword, photoId, backgroundColor } = JSON.parse(JSON.stringify(block.props))
      const image = new ScomImage(wrapper, { url, cid, link, altText, keyword, photoId, backgroundColor });
      wrapper.appendChild(image);
      return {
        dom: wrapper
      };
    }
  });
  const ImageSlashItem = {
    name: "Image Widget",
    execute: (editor: BlockNoteEditor) => {
      editor.insertBlocks(
        [
          {
            type: "imageWidget",
            props: {
              url: ""
            }
          }
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["image", "media"]
  }

  return {
    ImageBlock,
    ImageSlashItem
  }
};
