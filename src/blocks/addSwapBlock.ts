import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorCustomBlock, getWidgetEmbedUrl } from "../components/index";
import { execCustomBLock, parseUrl } from "./utils";

const swapRegex = /https:\/\/ipfs\.scom\.dev\/ipfs\/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4\?data\=.*/g;
function getData(href: string) {
  const widgetData = parseUrl(href);
  if (widgetData) {
    const { module, properties } = widgetData;
    if (module.localPath === 'scom-swap') return {...properties};
  }
  return false;
}

export const addSwapBlock = (blocknote: any) => {
  const SwapBlock = blocknote.createBlockSpec({
    type: "swap",
    propSchema: {
      ...blocknote.defaultProps,
      category: { default: 'fixed-pair', values: ['fixed-pair', 'fixed-protocal', 'aggregator', 'cross-chain-swap'] },
      providers: { default: [] },
      tokens: { default: [] },
      defaultChainId: { default: 0 },
      networks: { default: [] },
      logo: { default: '' },
      title: { default: '' },
      campaignId: { default: null},
      wallets: { default: [] },
      commissions: { default: [] },
      defaultInputValue: { default: '' },
      defaultOutputValue: { default: '' },
      defaultInputToken: { default: null },
      defaultOutputToken: { default: null },
      apiEndpoints: { default: null }
    },
    content: "none"
  },
  {
    render: (block: Block) => {
      const wrapper = new Panel();
      const props = JSON.parse(JSON.stringify(block.props));
      const data = {
        module: 'scom-swap',
        properties: { ...props },
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
          tag: "div[data-content-type=swap]",
          node: 'swap'
        },
        {
          tag: "a",
          getAttrs: (element: string|HTMLElement) => {
            if (typeof element === "string") {
              return false;
            }
            const href = element.getAttribute('href');
            if (href) return getData(href);
            return false;
          },
          priority: 402,
          node: 'swap'
        },
        {
          tag: "p",
          getAttrs: (element: string|HTMLElement) => {
            if (typeof element === "string") {
              return false;
            }
            const child = element.firstChild as HTMLElement;
            if (child?.nodeName === 'A' && child.getAttribute('href')) {
              const href = child.getAttribute('href');
              return getData(href);
            }
            return false;
          },
          priority: 403,
          node: 'swap'
        },
      ]
    },
    toExternalHTML: (block: any, editor: any) => {
      const link = document.createElement("a");
      const url = getWidgetEmbedUrl(
        {
          type: 'swap',
          props: {...(block.props || {})}
        }
      );
      link.setAttribute("href", url);
      link.textContent = 'swap';
      const wrapper = document.createElement("p");
      wrapper.appendChild(link);
      return { dom: wrapper };
    },
    pasteRules: [
      {
        find: swapRegex,
        handler(props: any) {
          const { state, chain, range } = props;
          const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
          const widgetData = parseUrl(textContent);
          if (!widgetData) return null;
          const { module, properties } = widgetData;
          const type = module.localPath === 'scom-swap' ? 'swap' : 'chart';
          chain().BNUpdateBlock(state.selection.from, {
            type,
            props: {
              ...properties
            },
          }).setTextSelection(range.from + 1);
        }
      }
    ]
  });
  const SwapSlashItem = {
    name: "Swap",
    execute: (editor: BlockNoteEditor) => {
      const block: any = {
        type: "swap",
        props: {
          "providers": [
            {
              "key": "OpenSwap",
              "chainId": 97
            },
            {
              "key": "OpenSwap",
              "chainId": 43113
            }
          ],
          "category": "fixed-pair",
          "tokens": [
            {
              "address": "0x29386B60e0A9A1a30e1488ADA47256577ca2C385",
              "chainId": 97
            },
            {
              "address": "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
              "chainId": 97
            },
            {
              "address": "0xb9C31Ea1D475c25E58a1bE1a46221db55E5A7C6e",
              "chainId": 43113
            },
            {
              "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
              "chainId": 43113
            }
          ],
          "defaultChainId": 43113,
          "networks": [
            {
              "chainId": 43113
            },
            {
              "chainId": 97
            }
          ],
          "wallets": [
            {
              "name": "metamask"
            }
          ],
          "showHeader": true,
          "showFooter": true
        }
      };
      execCustomBLock(editor, block);
    },
    aliases: ["swap", "widget"]
  }

  return {
    SwapBlock,
    SwapSlashItem
  }
};
