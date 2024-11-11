import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor, execCustomBLock, getWidgetEmbedUrl, parseUrl } from '@scom/scom-blocknote-sdk';
import { ScomEditorCustomBlock } from "../components/index";
import { getConfigs } from "../global/index";

const nftMinterRegex = /https:\/\/widget.noto.fan\/(#!\/)?scom\/scom-nft-minter\/\S+/g;
function getData(href: string) {
    const widgetData = parseUrl(href);
    if (widgetData) {
        const { module, properties } = widgetData;
        if (module.localPath === 'scom-nft-minter') return { ...properties };
    }
    return false;
}

export const addNftMinterBlock = (blocknote: any) => {
    const NftMinterBlock = blocknote.createBlockSpec(
        {
            type: "nftMinter",
            propSchema: {
                ...blocknote.defaultProps,
                name: { default: '' },
                title: { default: '' },
                productType: { default: 'Buy' },
                productId: { default: 0 },
                donateTo: { default: '' },
                logoUrl: { default: '' },
                description: { default: '' },
                link: { default: '' },
                commissions: { default: [] },
                chainSpecificProperties: { default: {} },
                defaultChainId: { default: 0 },
                wallets: { default: [] },
                networks: { default: [] },
                requiredQuantity: { default: 0 }
            },
            content: "none"
        },
        {
            render: (block: Block) => {
                const wrapper = new Panel();
                const props = JSON.parse(JSON.stringify(block.props));
                const data = {
                    module: 'scom-nft-minter',
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
                        tag: "div[data-content-type=nftMinter]",
                        node: "nftMinter"
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
                        node: "nftMinter"
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
                        node: "nftMinter"
                    }
                ]
            },
            toExternalHTML: (block: any, editor: any) => {
                const link = document.createElement("a");
                const url = getWidgetEmbedUrl({
                    type: "nftMinter",
                    props: { ...(block.props || {}) }
                }, getConfigs()?.['nftMinter']);
                link.setAttribute("href", url);
                link.textContent = "nftMinter";
                const wrapper = document.createElement("p");
                wrapper.appendChild(link);
                return { dom: wrapper };
            },
            pasteRules: [
                {
                    find: nftMinterRegex,
                    handler(props: any) {
                        const { state, chain, range } = props;
                        const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
                        const widgetData = parseUrl(textContent);
                        if (!widgetData) return null;
                        const { properties } = widgetData;
                        chain().BNUpdateBlock(state.selection.from, {
                            type: 'nftMinter',
                            props: {
                                ...properties
                            },
                        }).setTextSelection(range.from + 1);
                    }
                }
            ]
        }
    );
    const NftMinterSlashItem = {
        name: "NFT Minter",
        execute: (editor: BlockNoteEditor) => {
            const block: any = {
                type: "nftMinter",
                props: {
                    title: "Title",
                    description: "#### Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    logoUrl: "https://placehold.co/600x400?text=No+Image",
                    networks: [
                        {
                            chainId: 43113
                        },
                        {
                            chainId: 97
                        }
                    ],
                    wallets: [
                        {
                            name: "metamask"
                        }
                    ],
                    defaultChainId: 43113
                }
            };
            execCustomBLock(editor, block);
        },
        aliases: ["nftMinter", "widget"]
    };

    return {
        NftMinterBlock,
        NftMinterSlashItem
    }
}