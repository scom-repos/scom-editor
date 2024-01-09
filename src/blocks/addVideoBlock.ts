import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorCustomBlock } from "../components/index";
import { execCustomBLock } from "./utils";

export const addVideoBlock = (blocknote: any) => {
  const VideoBlock = blocknote.createBlockSpec({
    type: "video",
    propSchema: {
      ...blocknote.defaultProps,
      url: {default: ''},
      width: {default: 512},
      height: {default: 'auto'}
    },
    containsInlineContent: false,
    render: (block: Block, editor: BlockNoteEditor) => {
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
    parse: () => {
      return [
        {
          tag: "div[data-content-type=video]",
          node: 'video'
        },
        {
          tag: "a",
          getAttrs: (element2: any) => {
            if (typeof element2 === "string") {
              return false;
            }
            if (element2.getAttribute('href')) {
              const href = element2.getAttribute('href');
              const videoUrlRegex = /https:\/\/\S+\.(mp4|webm)/g;
              const youtubeUrlRegex = /https:\/\/(?:www\.|m\.)(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/g;
              if (videoUrlRegex.test(href) || youtubeUrlRegex.test(href)) {
                return {
                  url: href
                }
              }
            }
            return false;
          },
          priority: 400,
          node: 'video'
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
            if (child.getAttribute('href')) {
              const href = child.getAttribute('href');
              const videoUrlRegex = /https:\/\/\S+\.(mp4|webm)/g;
              const youtubeUrlRegex = /https:\/\/(?:www\.|m\.)(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/g;
              if (videoUrlRegex.test(href) || youtubeUrlRegex.test(href)) {
                return {
                  url: href
                }
              }
            }
            return false;
          },
          priority: 410,
          node: 'video'
        },
      ]
    },
    renderInnerHTML: (attrs: any) => {
      const link = document.createElement("a");
      const url = attrs.url || "";
      link.setAttribute("href", url);
      link.textContent = 'video';
      return link;
    },
    pasteRules: [
      {
        find: /https:\/\/(?:www\.|m\.)(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/g,
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
