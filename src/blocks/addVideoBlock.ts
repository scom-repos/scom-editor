import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorCustomBlock } from "../components/index";
import { execCustomBLock } from "./utils";

const findRegex = /(?:https?:\/\/\S+\.(?:mp4|webm|mov|ogg|m3u8))|(?:https:\/\/(?:www\.|m\.)?(youtu.*be.*)\/(?:watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$)))/g;
function getData(element: HTMLElement) {
  const url = element.getAttribute('href')
  if (url) {
    const match = findRegex.test(url);
    findRegex.lastIndex = 0;
    if (match) {
      return { url };
    }
  }
  return false;
}

export const addVideoBlock = (blocknote: any) => {
  const VideoBlock = blocknote.createBlockSpec({
    type: "video",
    propSchema: {
      ...blocknote.defaultProps,
      url: {default: ''},
      width: {default: 512},
      height: {default: 'auto'}
    },
    content: "none"
  },
  {
    render: (block: Block) => {
      const wrapper = new Panel();
      const { url } = JSON.parse(JSON.stringify(block.props));
      const data = {
        module: 'scom-video',
        properties: { url },
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
          tag: "div[data-content-type=video]",
          node: 'video'
        },
        {
          tag: "a",
          getAttrs: (element: string|HTMLElement) => {
            if (typeof element === "string") return false;
            return getData(element);
          },
          priority: 404,
          node: 'video'
        },
        {
          tag: "p",
          getAttrs: (element: string|HTMLElement) => {
            if (typeof element === "string") return false;
            const child = element.firstChild as HTMLElement;
            if (child?.nodeName === 'A') {
              return getData(child);
            }
            return false;
          },
          priority: 405,
          node: 'video'
        }
      ]
    },
    toExternalHTML: (block: any, editor: any) => {
      const link = document.createElement("a");
      const url = block.props.url || "";
      link.setAttribute("href", url);
      link.textContent = 'video';
      const wrapper = document.createElement("p");
      wrapper.appendChild(link);
      return {
        dom: wrapper
      }
    },
    pasteRules: [
      {
        find: findRegex,
        handler(props: any) {
          const { state, chain, range } = props;
          const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
          chain().BNUpdateBlock(state.selection.from, {
            type: "video",
            props: {
              url: textContent
            },
          }).setTextSelection(range.from + 1);
        }
      }
    ]
  });
  const VideoSlashItem = {
    name: "Video",
    execute: (editor: BlockNoteEditor) => {
      const block = { type: "video", props: { url: "" }};
      execCustomBLock(editor, block);
    },
    aliases: ["video", "media"]
  }

  return {
    VideoBlock,
    VideoSlashItem
  }
};
