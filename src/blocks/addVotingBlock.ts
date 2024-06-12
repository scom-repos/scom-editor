import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { getWidgetEmbedUrl, ScomEditorCustomBlock } from "../components/index";
import { execCustomBLock, parseUrl } from "./utils";

const votingRegex = /https:\/\/widget.noto.fan\/(#!\/)?scom\/scom-voting\/\S+/g;
function getData(href: string) {
    const widgetData = parseUrl(href);
    if (widgetData) {
        const { module, properties } = widgetData;
        if (module.localPath === 'scom-voting') return { ...properties };
    }
    return false;
}

export const addVotingBlock = (blocknote: any) => {
    const VotingBlock = blocknote.createBlockSpec(
        {
            type: 'voting',
            propSchema: {
                ...blocknote.defaultProps,
                title: { default: '' },
                backgroundImage: { default: '' },
                buttons: { default: [] },
                fontColor: { default: '' }
            },
            content: 'none'
        },
        {
            render: (block: Block) => {
                const wrapper = new Panel();
                const props = JSON.parse(JSON.stringify(block.props));
                const data = {
                    module: 'scom-voting',
                    properties: { ...props },
                    block: { ...block }
                }
                wrapper.maxWidth = 780;
                const customElm = new ScomEditorCustomBlock(wrapper, { data });
                wrapper.appendChild(customElm);
                return {
                    dom: wrapper
                }
            },
            parseFn: () => {
                return [
                    {
                        tag: "div[data-content-type=voting]",
                        node: "voting"
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
                        node: "voting"
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
                        node: "voting"
                    }
                ]
            },
            toExternalHTML: (block: any, editor: any) => {
                const link = document.createElement("a");
                const url = getWidgetEmbedUrl({
                    type: "voting",
                    props: { ...(block.props || {}) }
                });
                link.setAttribute("href", url);
                link.textContent = "voting";
                const wrapper = document.createElement("p");
                wrapper.appendChild(link);
                return { dom: wrapper }
            },
            pasteRules: [
                {
                    find: votingRegex,
                    handler(props: any) {
                        const { state, chain, range } = props;
                        const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
                        const widgetData = parseUrl(textContent);
                        if (!widgetData) return null;
                        const { properties } = widgetData;
                        chain().BNUpdateBlock(state.selection.from, {
                            type: 'voting',
                            props: {
                                ...properties
                            },
                        }).setTextSelection(range.from + 1);
                    }
                }
            ]
        }
    );
    const VotingSlashItem = {
        name: "Voting",
        execute: (editor: BlockNoteEditor) => {
            const block: any = {
                type: "voting",
                props: {
                    title: 'Do you schedule casts?',
                    buttons: [
                        {
                            value: 'yes',
                            label: 'Yes'
                        },
                        {
                            value: 'no',
                            label: 'No'
                        },
                        {
                            value: 'sometimes',
                            label: 'Sometimes'
                        }
                    ]
                }
            };
            execCustomBLock(editor, block);
        },
        aliases: ["voting", "widget"]
    };

    return {
        VotingBlock,
        VotingSlashItem
    }
}