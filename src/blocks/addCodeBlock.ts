import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { execCustomBLock } from "./utils";
import { ScomEditorCodeBlock, escapeHTML } from "../components/index";

function getData(element: HTMLElement) {
  if (element?.nodeName === 'CODE') {
    return {
      code: escapeHTML(element.innerHTML)
    };
  }
  return false;
}

export function addCodeBlock(blocknote: any) {
  const CodeBlock = blocknote.createBlockSpec({
    type: "codeBlock",
    propSchema: {
      ...blocknote.defaultProps,
      language: {default: ''},
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
        find: /^(`{3,}[^`\n]*\n|^`{3,}[^`\s]*)([\s\S]*?)([\s|\n]?`{3,})/gm,
        handler(props: any) {
          const { state, chain, range } = props;
          const textContent = state.doc.resolve(range.from).nodeAfter?.textContent;
          chain().BNUpdateBlock(state.selection.from, {
            type: "codeBlock",
            props: {
              code: textContent
            },
          }).setTextSelection(range.from + 1);
        }
      }
    ],
    inputRules: [
      {
        find: new RegExp(`^(\`{3,})\\s$`),
      }
    ]
  });
  const CodeSlashItem = {
    name: "Code Block",
    execute: (editor: BlockNoteEditor) => {
      const block = { type: "codeBlock", props: { code: "" }};
      execCustomBLock(editor, block);
    },
    aliases: ["codeBlock", "Basic blocks"]
  }

  return {
    CodeBlock,
    CodeSlashItem
  }
};
