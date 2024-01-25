import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorCustomBlock } from "../components/index";
import { execCustomBLock } from "./utils";

const twitterRegex = /https:\/\/(twitter.com)\/\w*\/status\/(\d{19}$)/g;

export const addTweetBlock = (blocknote: any) => {
  const TweetBlock = blocknote.createBlockSpec({
    type: "tweet",
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
    parseFn: () => {
      return [
        {
          tag: "div[data-content-type=tweet]",
          node: 'tweet'
        },
        {
          tag: "a",
          getAttrs: (element: string|HTMLElement) => {
            if (typeof element === "string") {
              return false;
            }
            const url = element.getAttribute('href');
            if (url && twitterRegex.test(url)) {
              return { url };
            }
            return false;
          },
          priority: 406,
          node: 'tweet'
        },
        {
          tag: "p",
          getAttrs: (element: string|HTMLElement) => {
            if (typeof element === "string") {
              return false;
            }
            const child = element.firstChild as HTMLElement;
            if (child?.nodeName === 'A') {
              const url = child.getAttribute('href');
              if (url && twitterRegex.test(url)) {
                return { url };
              }
            }
            return false;
          },
          priority: 407,
          node: 'tweet'
        },
      ]
    },
    toExternalHTML: (block: any, editor: any) => {
      const link = document.createElement("a");
      const url = block.props.url || "";
      link.setAttribute("href", url);
      link.textContent = 'tweet';
      const wrapper = document.createElement("p");
      wrapper.appendChild(link);
      return { dom: wrapper };
    },
    pasteRules: [
      {
        find: twitterRegex,
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
