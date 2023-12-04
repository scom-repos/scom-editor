import { Panel } from "@ijstech/components";
import ScomVideo from '@scom/scom-video';
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorSideMenu, getModalContainer } from "../components/index";

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
      const video = new ScomVideo(wrapper, { url });
      wrapper.appendChild(video);
      if (!url) {
        const sideMenu = getModalContainer().querySelector('i-scom-editor-side-menu') as ScomEditorSideMenu;
        if (sideMenu) sideMenu.openConfig(block, video);
      }
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
        }
      ]
    },
    renderInnerHTML: (attrs: any) => {
      const link = document.createElement("a");
      const url = attrs.url || "";
      link.setAttribute("href", url);
      link.textContent = 'video';
      return link;
    }
  });
  const VideoSlashItem = {
    name: "Video",
    execute: (editor: BlockNoteEditor) => {
      editor.insertBlocks(
        [
          {
            type: "video",
            props: {
              url: ""
            }
          }
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["video", "media"]
  }

  return {
    VideoBlock,
    VideoSlashItem
  }
};
