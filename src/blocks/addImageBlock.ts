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
      altText: {default: ''},
      keyword: {default: ''},
      photoId: {default: ''},
      width: {default: 512},
      height: {default: 'auto'}
    },
    containsInlineContent: false,
    render: (block: Block, editor: BlockNoteEditor) => {
      const wrapper = new Panel();
      const image = new ScomImage(wrapper, {
        url: block.props.url,
        cid: block.props?.cid || '',
        link: block.props?.link || '',
        altText: block.props?.altText || '',
        keyword: block.props?.keyword || '',
        photoId: block.props?.photoId || ''
      });
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
