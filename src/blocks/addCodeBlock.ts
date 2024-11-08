import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor, execCustomBLock } from '@scom/scom-blocknote-sdk';
import { DEFAULT_LANGUAGE, ScomEditorCodeBlock, revertHtmlTags } from "../components/index";

function getData(element: HTMLElement) {
  if (element?.nodeName === 'PRE') {
    const codeElm = element.querySelector('code');
    if (codeElm) {
      return {
        code: codeElm.textContent,
        language: codeElm.getAttribute('data-language') || ''
      };
    }
  }
  return false;
}

const backtickInputRegex = /^```([a-z]+)?[\s\n]$/
const tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/

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

    content: 'none',

    marks: '',

    code: true,

    defining: true,

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
          tag: "pre",
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
      const preEl = document.createElement('pre');
      const codeElm = document.createElement('code');
      const code = revertHtmlTags(block.props.code || '');
      codeElm.textContent = code;
      preEl.appendChild(codeElm);
      const language = block.props.language;
      codeElm.setAttribute('data-language', language);
      if (language) {
        const customClass = `language-${language}`;
        codeElm.classList.add(customClass);
      }

      return {
        dom: preEl
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
              code: textContent,
              language: DEFAULT_LANGUAGE
            },
          }).setTextSelection(range.from + 1);
        }
      }
    ],
    inputRules: [
      {
        find: backtickInputRegex,
        getAttributes: match => ({
          language: match[1],
        })
      },
      {
        find: tildeInputRegex,
        getAttributes: match => ({
          language: match[1],
        })
      }
    ]
  });
  const CodeSlashItem = {
    name: "Code Block",
    execute: (editor: BlockNoteEditor) => {
      const block = { type: "codeBlock", props: { code: '', language: '' }};
      execCustomBLock(editor, block);
    },
    aliases: ["codeBlock", "Basic blocks"]
  }

  return {
    CodeBlock,
    CodeSlashItem
  }
};
