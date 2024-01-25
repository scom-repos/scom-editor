import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorCustomBlock } from "../components/index";
import { execCustomBLock } from "./utils";

function getData(element: HTMLElement) {
  if (element?.nodeName === 'IMG') {
    return {
      url: element.getAttribute('src'),
      altText: element.getAttribute('alt')
    };
  }
  return false;
}

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
    content: "none"
  },
  {
    render: (block: Block) => {
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
    parseFn: () => {
      return [
        {
          tag: "div[data-content-type=imageWidget]",
          contentElement: "[data-editable]"
        },
        {
          tag: "p",
          getAttrs: (element: string | HTMLElement) => {
            if (typeof element === "string") return false;
            const child = element.firstChild as HTMLElement;
            if (!child) return false;
            return getData(child);
          },
          priority: 400,
          node: 'imageWidget'
        },
        {
          tag: "img",
          getAttrs: (element: string | HTMLElement) => {
            if (typeof element === "string") return false;
            return getData(element);
          },
          priority: 401,
          node: 'imageWidget'
        }
      ]
    },
    toExternalHTML: (block: any, editor: any) => {
      const imageTag = document.createElement("img");
      const src = block.props.url || "";
      const alt = block.props.altText || "";
      imageTag.setAttribute("src", src);
      imageTag.setAttribute("alt", alt);
      const wrapper = document.createElement("p");
      wrapper.appendChild(imageTag);
      return {
        dom: wrapper
      }
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
