import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorCustomBlock } from "../components/index";
import { execCustomBLock } from "./utils";

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
      const data = {
        module: 'scom-image',
        properties: { url, cid, link, altText, keyword, photoId, backgroundColor },
        block: {...block}
      }
      const customElm = new ScomEditorCustomBlock(wrapper, { data });
      wrapper.appendChild(customElm);
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
            if (!child) {
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
          getAttrs: (element2: any) => {
            if (typeof element2 === "string") {
              return false;
            }
            if (element2.nodeName === 'IMG') {
              return {
                url: element2.getAttribute('src'),
                altText: element2.getAttribute('alt')
              };
            }
            return false;
          },
          node: 'imageWidget'
        }
      ]
    },
    // For render node to DOM (serializer.serializeNode(node))
    renderInnerHTML: (attrs: any) => {
      const imageTag = document.createElement("img");
      const src = attrs.url || "";
      const alt = attrs.altText || "";
      imageTag.setAttribute("src", src);
      imageTag.setAttribute("alt", alt);
      return imageTag;
    },
    pasteRules: [
      {
        find: /https:\/\/\S+\.(jpg|jpeg|png|gif|webp|svg)/g,
        handler(props: any) {
          const { state, chain, range } = props;
          const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;

          chain().BNUpdateBlock(state.selection.from, {
            type: "imageWidget",
            props: {
              url: textContent
            },
          }).setTextSelection(range.from + 1);
        }
      },
    ]
  });
  const ImageSlashItem = {
    name: "Image Widget",
    execute: (editor: BlockNoteEditor) => {
      const block = { type: "imageWidget", props: { url: "" }};
      execCustomBLock(editor, block);
    },
    aliases: ["image", "media"]
  }

  return {
    ImageBlock,
    ImageSlashItem
  }
};
