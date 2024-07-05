import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorCustomBlock, getWidgetEmbedUrl } from "../components/index";
import { execCustomBLock, parseUrl } from "./utils";

function getData(href: string) {
  const widgetData = parseUrl(href);
  if (widgetData) {
    const { module, properties } = widgetData;
    if (module.localPath === 'oswap-nft-widget') return { ...properties };
  }
  return false;
}

export const addOswapNftBlock = (blocknote: any) => {
  const OswapNftBlock = blocknote.createBlockSpec({
    type: "oswapNft",
    propSchema: {
      ...blocknote.defaultProps,
      tier: { default: 'hungry' },
      defaultChainId: { default: 0 },
      networks: { default: [] },
      wallets: { default: [] },
      commissions: { default: [] },
    },
    content: "none"
  },
    {
      render: (block: Block) => {
        const wrapper = new Panel();
        const props = JSON.parse(JSON.stringify(block.props));
        const data = {
          module: 'oswap-nft-widget',
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
            tag: "div[data-content-type=oswapNft]",
            node: 'oswapNft'
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
            node: 'oswapNft'
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
            node: 'oswapNft'
          },
        ]
      },
      toExternalHTML: (block: any, editor: any) => {
        const link = document.createElement("a");
        const url = getWidgetEmbedUrl(
          {
            type: 'oswapNft',
            props: { ...(block.props || {}) }
          }
        );
        link.setAttribute("href", url);
        link.textContent = 'oswapNft';
        const wrapper = document.createElement("p");
        wrapper.appendChild(link);
        return { dom: wrapper };
      }
    });
  const OswapNftSlashItem = {
    name: "Oswap NFT",
    execute: (editor: BlockNoteEditor) => {
      const block: any = {
        type: "oswapNft",
        props: {
          "tier": "hungry",
          "defaultChainId": 97,
          "networks": [
            {
              "chainId": 97
            },
            {
              "chainId": 56
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
    aliases: ["oswapNft", "widget"]
  }

  return {
    OswapNftBlock,
    OswapNftSlashItem
  }
};
