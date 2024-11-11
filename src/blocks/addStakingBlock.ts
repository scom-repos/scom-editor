import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor, execCustomBLock, getWidgetEmbedUrl, parseUrl } from '@scom/scom-blocknote-sdk';
import { ScomEditorCustomBlock } from "../components/index";
import { getConfigs } from "../global/index";

const stakingRegex = /https:\/\/widget.noto.fan\/(#!\/)?scom\/scom-staking\/\S+/g;
function getData(href: string) {
    const widgetData = parseUrl(href);
    if (widgetData) {
        const { module, properties } = widgetData;
        if (module.localPath === 'scom-staking') return { ...properties };
    }
    return false;
}

export const addStakingBlock = (blocknote: any) => {
    const StakingBlock = blocknote.createBlockSpec(
        {
            type: "staking",
            propSchema: {
                ...blocknote.defaultProps,
                chainId: { default: 0 },
                name: { default: '' },
                desc: { default: '' },
                logo: { default: '' },
                getTokenURL: { default: '' },
                showContractLink: { default: false },
                staking: { default: null },
                stakeInputValue: { default: '' },
                commissions: { default: [] },
                wallets: { default: [] },
                networks: { default: [] },
            },
            content: "none"
        },
        {
            render: (block: Block) => {
                const wrapper = new Panel();
                const props = JSON.parse(JSON.stringify(block.props));
                const data = {
                    module: 'scom-staking',
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
                        tag: "div[data-content-type=staking]",
                        node: "staking"
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
                        priority: 408,
                        node: "staking"
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
                        priority: 409,
                        node: "staking"
                    }
                ]
            },
            toExternalHTML: (block: any, editor: any) => {
                const link = document.createElement("a");
                const url = getWidgetEmbedUrl({
                    type: "staking",
                    props: { ...(block.props || {}) }
                }, getConfigs()?.['staking']);
                link.setAttribute("href", url);
                link.textContent = "staking";
                const wrapper = document.createElement("p");
                wrapper.appendChild(link);
                return { dom: wrapper };
            },
            pasteRules: [
                {
                    find: stakingRegex,
                    handler(props: any) {
                        const { state, chain, range } = props;
                        const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
                        const widgetData = parseUrl(textContent);
                        if (!widgetData) return null;
                        const { properties } = widgetData;
                        chain().BNUpdateBlock(state.selection.from, {
                            type: 'staking',
                            props: {
                                ...properties
                            },
                        }).setTextSelection(range.from + 1);
                    }
                }
            ]
        }
    );
    const StakingSlashItem = {
        name: "Staking",
        execute: (editor: BlockNoteEditor) => {
            const block: any = {
                type: "staking",
                props: {
                    "chainId": 43113,
                    "name": "Staking",
                    "desc": "Earn OSWAP",
                    "showContractLink": true,
                    "staking": {
                        "address": "0x03C22D12eb6E5ea3a06F46Fc0e1857438BB7DCae",
                        "lockTokenType": 0,
                        "rewards": {
                            "address": "0x10B846B7A1807B3610ee94c1b120D9c5E87C148d",
                            "isCommonStartDate": false
                        }
                    },
                    "networks": [
                        {
                            "chainId": 43113
                        }
                    ],
                    "wallets": [
                        {
                            "name": "metamask"
                        }
                    ]
                }
            };
            execCustomBLock(editor, block);
        },
        aliases: ["staking", "widget"]
    };

    return {
        StakingBlock,
        StakingSlashItem
    }
}