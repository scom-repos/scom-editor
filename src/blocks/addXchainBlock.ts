import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorCustomBlock, getWidgetEmbedUrl } from "../components/index";
import { execCustomBLock, parseUrl } from "./utils";

function getData(href: string) {
  const widgetData = parseUrl(href);
  if (widgetData) {
    const { module, properties } = widgetData;
    if (module.localPath === 'scom-xchain-widget') return { ...properties };
  }
  return false;
}

export const addXchainBlock = (blocknote: any) => {
  const XchainBlock = blocknote.createBlockSpec({
    type: "xchain",
    propSchema: {
      ...blocknote.defaultProps,
      tokens: { default: [] },
      defaultChainId: { default: 0 },
      networks: { default: [] },
      wallets: { default: [] },
      commissions: { default: [] },
      defaultInputToken: { default: null },
    },
    content: "none"
  },
    {
      render: (block: Block) => {
        const wrapper = new Panel();
        const props = JSON.parse(JSON.stringify(block.props));
        const data = {
          module: 'scom-xchain-widget',
          properties: { ...props },
          block: { ...block }
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
            tag: "div[data-content-type=xchain]",
            node: 'xchain'
          },
          {
            tag: "a",
            getAttrs: (element: string | HTMLElement) => {
              if (typeof element === "string") {
                return false;
              }
              const href = element.getAttribute('href');
              if (href) return getData(href);
              return false;
            },
            priority: 402,
            node: 'xchain'
          },
          {
            tag: "p",
            getAttrs: (element: string | HTMLElement) => {
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
            node: 'xchain'
          },
        ]
      },
      toExternalHTML: (block: any, editor: any) => {
        const link = document.createElement("a");
        const url = getWidgetEmbedUrl(
          {
            type: 'xchain',
            props: { ...(block.props || {}) }
          }
        );
        link.setAttribute("href", url);
        link.textContent = 'xchain';
        const wrapper = document.createElement("p");
        wrapper.appendChild(link);
        return { dom: wrapper };
      }
    });
  const XchainSlashItem = {
    name: "Xchain",
    execute: (editor: BlockNoteEditor) => {
      const block: any = {
        type: "xchain",
        props: {
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
    aliases: ["xchain", "widget"]
  }

  return {
    XchainBlock,
    XchainSlashItem
  }
};
