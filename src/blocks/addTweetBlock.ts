import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorCustomBlock } from "../components/index";
import { execCustomBLock } from "./utils";

export const addTweetBlock = (blocknote: any) => {
  const TweetBlock = blocknote.createBlockSpec({
    type: "tweet",
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
        module: 'scom-twitter-post',
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
          tag: "div[data-content-type=tweet]",
          node: 'tweet'
        },
        {
          tag: "a",
          getAttrs: (element2: any) => {
            if (typeof element2 === "string") {
              return false;
            }
            if (element2.getAttribute('href')) {
              const href = element2.getAttribute('href');
              const regex = /https:\/\/(twitter.com)\/\w*\/status\/(\d{19}$)/gm;
              if (regex.test(href)) {
                return {
                  url: href
                }
              }
            }
            return false;
          },
          priority: 406,
          node: 'tweet'
        }
      ]
    },
    renderInnerHTML: (attrs: any) => {
      const link = document.createElement("a");
      const url = attrs.url || "";
      link.setAttribute("href", url);
      link.textContent = 'tweet';
      return link;
    },
    pasteRules: [
      {
        find: /https:\/\/(twitter.com)\/\w*\/status\/(\d{19}$)/gm,
        handler(props: any) {
          const { state, chain, range } = props;
          const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;

          chain().BNUpdateBlock(state.selection.from, {
            type: "tweet",
            props: {
              url: textContent
            },
          }).setTextSelection(range.from + 1);
        }
      }
    ]
  });
  const TweetSlashItem = {
    name: "Tweet",
    execute: (editor: BlockNoteEditor) => {
      const block = { type: "tweet", props: { url: "" }};
      execCustomBLock(editor, block);
    },
    aliases: ["tweet", "widget"]
  }

  return {
    TweetBlock,
    TweetSlashItem
  }
};
