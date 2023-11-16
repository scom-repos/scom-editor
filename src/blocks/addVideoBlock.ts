import { Panel } from "@ijstech/components";
import ScomVideo from '@scom/scom-video';
import { Block, BlockNoteEditor } from "../global/index";

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
      const video = new ScomVideo(wrapper, {
        url: block.props.url
      });
      wrapper.appendChild(video);
      return {
        dom: wrapper
      };
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
              url: "https://www.youtube.com/embed/Wlf1T5nrO50"
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
