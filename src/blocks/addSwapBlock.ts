import { Panel } from "@ijstech/components";
import ScomSwap from '@scom/scom-swap';
import { Block, BlockNoteEditor } from "../global/index";
import { ScomEditorSideMenu } from "../components/index";

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
      defaultOutputValue: { default: '' }
      // defaultInputToken?: ITokenConfig;
      // defaultOutputToken?: ITokenConfig;
      // apiEndpoints?: Record<string, string>;
    },
    containsInlineContent: false,
    render: (block: Block, editor: BlockNoteEditor) => {
      const wrapper = new Panel();
      const props = JSON.parse(JSON.stringify(block.props));
      const swapEl = new ScomSwap(wrapper, props);
      wrapper.appendChild(swapEl);
      if (!props?.providers?.length) {
        const sideMenu = editor.domElement?.parentElement?.querySelector('i-scom-editor-side-menu') as ScomEditorSideMenu;
        if (sideMenu) sideMenu.openConfig(block, swapEl);
      }
      return {
        dom: wrapper
      };
    },
    parse: () => {
      return [
        {
          tag: "div[data-content-type=swap]",
          node: 'swap'
        }
      ]
    }
  });
  const SwapSlashItem = {
    name: "Swap",
    execute: (editor: BlockNoteEditor) => {
      editor.insertBlocks(
        [
          {
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
          }
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["swap", "widget"]
  }

  return {
    SwapBlock,
    SwapSlashItem
  }
};
