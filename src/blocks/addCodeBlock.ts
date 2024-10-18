import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { execCustomBLock } from "./utils";
import { ScomEditorCodeBlock } from "../components/index";

const DEFAULT_LANGUAGE = 'javascript';

function getData(element: HTMLElement) {
  if (element?.nodeName === 'CODE') {
    let code = element.innerHTML;
    code = code.replace(/^`{3,}[^`\n]*\n|^`{3,}[^`\s]*\s?/gm, '').replace(/`{3,}$/g, '');
    return {
      code,
      language: DEFAULT_LANGUAGE
    };
  }
  return false;
}

export function addCodeBlock(blocknote: any) {
  const CodeBlock = blocknote.createBlockSpec({
    type: "codeBlock",
    propSchema: {
      ...blocknote.defaultProps,
      language: {default: DEFAULT_LANGUAGE},
      code: {default: ''},
      width: {default: 512},
      height: {default: 'auto'}
    },
    content: "none"
  },
  {
    render: (block: Block) => {
      const wrapper = new Panel();
      const { code, language } = JSON.parse(JSON.stringify(block.props));
      const elTag = new ScomEditorCodeBlock(wrapper, {
        code,
        language,
        display: 'block',
        width: '100%',
        height: '100%'
      })
      wrapper.appendChild(elTag);
      return {
        dom: wrapper
      };
    },
    parseFn: () => {
      return [
        {
          tag: "div[data-content-type=codeBlock]",
          contentElement: "[data-editable]"
        },
        {
          tag: "p",
          getAttrs: (element: string | HTMLElement) => {
            if (typeof element === "string") return false;
            const child = element.firstChild as HTMLElement;
            if (!child) return false;
            return getData(child);
          },
          priority: 600,
          node: 'codeBlock'
        },
        {
          tag: "code",
          getAttrs: (element: string | HTMLElement) => {
            if (typeof element === "string") return false;
            return getData(element);
          },
          priority: 601,
          node: 'codeBlock'
        }
      ]
    },
    toExternalHTML: (block: any, editor: any) => {
      const wrapper = document.createElement('pre');
      const codeElm = document.createElement('code');
      const code = block.props.code || '';
      codeElm.innerHTML = code;
      wrapper.appendChild(codeElm);
      return {
        dom: wrapper
      }
    },
    pasteRules: [
      {
        find: /`{3,}\s?([\s\S]*?)\s?`{3,}/g,
        handler(props: any) {
          const { state, chain, range } = props;
          let textContent = state.doc.resolve(range.from).nodeAfter?.textContent;

          chain().BNUpdateBlock(state.selection.from, {
            type: "codeBlock",
            props: {
              code: textContent.replace(/^`{3,}[^`\n]*\n|^`{3,}[^`\s]*\s?/gm, '').replace(/`{3,}$/g, '')
            },
          }).setTextSelection(range.from + 1);
        }
      }
    ]
  });
  const CodeSlashItem = {
    name: "Code Block",
    execute: (editor: BlockNoteEditor) => {
      const block = { type: "codeBlock", props: { code: "", language: DEFAULT_LANGUAGE }};
      execCustomBLock(editor, block);
    },
    aliases: ["codeBlock", "Basic blocks"]
  }

  return {
    CodeBlock,
    CodeSlashItem
  }
};
