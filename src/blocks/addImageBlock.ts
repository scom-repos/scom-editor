import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import ScomImage from "@scom/scom-image";
import { ScomEditorSideMenu, getModalContainer } from "../components/index";

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
      width: {default: 512},
      height: {default: 'auto'}
    },
    containsInlineContent: false,
    render: (block: Block, editor: BlockNoteEditor) => {
      const wrapper = new Panel();
      const { url, cid, link, altText, keyword, photoId, backgroundColor } = JSON.parse(JSON.stringify(block.props))
      const image = new ScomImage(wrapper, { url, cid, link, altText, keyword, photoId, backgroundColor });
      wrapper.appendChild(image);
      if (!url) {
        const sideMenu = getModalContainer().querySelector('i-scom-editor-side-menu') as ScomEditorSideMenu;
        if (sideMenu) sideMenu.openConfig(block, image);
      }
      return {
        dom: wrapper
      };
    },
    parse: () => {
      return [
        {
          tag: "div[data-content-type=imageWidget]",
          node: 'imageWidget'
        },
        {
          tag: "p",
          getAttrs: (element2: any) => {
            if (typeof element2 === "string") {
              return false;
            }
            const child = element2.firstChild;
            if (child === null) {
              return false;
            }
            if (child.nodeName === 'IMG') {
              return {
                url: child.getAttribute('src'),
                altText: child.getAttribute('alt')
              };
            }
            return false;
          },
          priority: 400,
          node: 'imageWidget'
        },
        {
          tag: "img",
          node: 'imageWidget'
        }
      ]
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
