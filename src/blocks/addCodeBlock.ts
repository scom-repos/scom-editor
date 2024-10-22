import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { execCustomBLock } from "./utils";
import { DEFAULT_LANGUAGE, ScomEditorCodeBlock, revertHtmlTags } from "../components/index";

function getData(element: HTMLElement) {
  if (element?.nodeName === 'CODE') {
    const props: any = { type: 'inline' };
    if (element.parentElement?.nodeName === 'PRE') {
      props.type = 'block';
    }
    return {
      ...props,
      code: element.textContent,
      language: element.getAttribute('data-language') || ''
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
      type: {default: 'block'},
      width: {default: 512},
      height: {default: 'auto'}
    },
    content: "none"
  },
  {
    render: (block: Block) => {
      const wrapper = new Panel();
      let { code, language, type } = JSON.parse(JSON.stringify(block.props));
      if (type === 'inline') {
        const codeElm = document.createElement('code');
        codeElm.textContent = code;
        wrapper.appendChild(codeElm);
        return {
          dom: wrapper
        };
      }
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
      const blockType = block.props.type;
      let wrapper = null;
      if (blockType === 'block') {
        wrapper = document.createElement('pre');
        const codeElm = document.createElement('code');
        const code = revertHtmlTags(block.props.code || '');
        codeElm.textContent = code;
        wrapper.appendChild(codeElm);
        const language = block.props.language;
        codeElm.setAttribute('data-language', language);
        if (language) {
          const customClass = `language-${language}`;
          codeElm.classList.add(customClass);
        }
      } else {
        wrapper = document.createElement('code');
        const code = revertHtmlTags(block.props.code || '');
        wrapper.textContent = code;
      }
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
              code: textContent,
              language: DEFAULT_LANGUAGE
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
