import { Container, Control, HStack, Styles } from "@ijstech/components";
import { createButton, createParent } from "./utils";
import { CustomFormattingToolbarState, TextAlignmentType } from '../global/index';
import { ScomEditorColor, IBlockTypeItem, ScomEditorBlockType, ScomEditorLink, ColorType } from '../components/index';
import { buttonHoverStyle } from "./index.css";

const Theme = Styles.Theme.ThemeVars;

const getToolbarButtons = (editor: any) => {
  const iconProps = {width: '0.75rem', height: '0.75rem', fill: Theme.text.primary};
  const toolTipProps = {placement: 'bottom'};
  const customProps = {
    display: 'inline-flex',
    grid: {verticalAlignment: 'center'},
    height: '100%',
    minHeight: '1.875rem',
    padding: {top: '0px', bottom: '0px', left: '0.5rem', right: '0.5rem'}
  }
  return [
    {
      customControl: (element: Container) => {
        const block = editor.getTextCursorPosition().block;
        let blockType = new ScomEditorBlockType(undefined, {
          ...customProps,
          block,
          onItemClicked: (item: IBlockTypeItem) => setBlockType(editor, item),
          onValidate: (item: IBlockTypeItem) => {
            return (item.type in editor.schema);
          },
          class: buttonHoverStyle
        })
        return blockType;
      }
    },
    {
      icon: {...iconProps, name: 'bold'},
      tooltip: {...toolTipProps, content: 'Bold <br/> Ctrl + B'},
      onClick: () => {
        editor.toggleStyles({ bold: true });
      }
    },
    {
      icon: {...iconProps, name: 'italic'},
      tooltip: {...toolTipProps, content: 'Italicize <br/> Ctrl + I'},
      onClick: () => {
        editor.toggleStyles({ italic: true });
      }
    },
    {
      icon: {...iconProps, name: 'underline'},
      tooltip: {...toolTipProps, content: 'Underline <br/> Ctrl + U'},
      onClick: () => {
        editor.toggleStyles({ underline: true });
      }
    },
    {
      icon: {...iconProps, name: 'strikethrough'},
      tooltip: {...toolTipProps, content: 'Strike-through <br/> Ctrl + Shift + X or Ctrl + Shift + Z'},
      onClick: () => {
        editor.toggleStyles({ strikethrough: true });
      }
    },
    {
      icon: {...iconProps, name: 'align-left'},
      tooltip: {...toolTipProps, content: 'Align Text Left'},
      onClick: () => {
        setAlignment(editor, 'left');
      }
    },
    {
      icon: {...iconProps, name: 'align-center'},
      tooltip: {...toolTipProps, content: 'Align Text Center'},
      onClick: () => {
        setAlignment(editor, 'center');
      }
    },
    {
      icon: {...iconProps, name: 'align-right'},
      tooltip: {...toolTipProps, content: 'Align Text Right'},
      onClick: () => {
        setAlignment(editor, 'right');
      }
    },
    {
      customControl: (element: Container) => {
        let colorPicker = new ScomEditorColor(undefined, {
          ...customProps,
          textColor: editor.getActiveStyles().textColor || "default",
          backgroundColor: editor.getActiveStyles().backgroundColor || "default",
          setColor: (type: ColorType, color: string) => setColor(editor, type, color),
          class: buttonHoverStyle
        });
        return colorPicker;
      }
    },
    {
      icon: {...iconProps, name: 'indent'},
      tooltip: {...toolTipProps, content: 'Indent'},
      onClick: () => {
      },
      enabled: false
    },
    {
      icon: {...iconProps, name: 'outdent'},
      tooltip: {...toolTipProps, content: 'Outdent'},
      onClick: () => {
      },
      enabled: false
    },
    {
      customControl: (element: Container) => {
        let link = new ScomEditorLink(undefined, {
          ...customProps,
          tooltip: { content: 'Create Link <br /> Ctrl + K', placement: 'bottom' },
          editor: editor,
          setLink: (text: string, url: string) => {
            setLink(editor, text, url);
            element.visible = false;
          },
          class: buttonHoverStyle
        })
        return link;
      }
    }
  ]
}

function setBlockType(editor: any, item: IBlockTypeItem) {
  const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block]
  editor.focus();
  for (const block of selectedBlocks) {
    editor.updateBlock(block, {
      type: item.type,
      props: item.props,
    });
  }
}

function setAlignment(editor: any, textAlignment: TextAlignmentType) {
  const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
  editor.focus();
  for (const block of selectedBlocks) {
    editor.updateBlock(block, {
      props: { textAlignment }
    });
  }
}

function setColor(editor: any, type: ColorType, color: string) {
  editor.focus();
  const prop = type === 'text' ? 'textColor' : 'backgroundColor';
  color === "default"
    ? editor.removeStyles({ [prop]: color })
    : editor.addStyles({ [prop]: color });
}

function setLink(editor: any, text: string, url: string) {
  editor.createLink(url, text || editor.getSelectedText());
  editor.focus();
}

export const addFormattingToolbar = async (editor: any, parent: Control) => {
  let element: HStack;
  let buttonList = getToolbarButtons(editor);

  editor.formattingToolbar.onUpdate(async(formattingToolbarState: CustomFormattingToolbarState) => {
    if (!element) {
      element = await createParent();
      for (let props of buttonList) {
        if (props.customControl) {
          const elm = props.customControl(element);
          element.appendChild(elm);
        } else {
          const btn = createButton(props, element);
          element.appendChild(btn);
        }
      }
      element.style.display = "none";
      parent.appendChild(element);
    }

    if (formattingToolbarState.show) {
      const wrappers = parent.querySelectorAll('.wrapper');
      for (let wrapper of wrappers) {
        (wrapper as Control).visible = false;
      }
      element.visible = true;
      element.style.top = `${formattingToolbarState.referencePos.top}px`;
      const newPos = formattingToolbarState.referencePos.x + element.offsetWidth;
      const newLeft = formattingToolbarState.referencePos.x - (element.offsetWidth / 2);
      let left = '';
      let right = ''
      if (newPos >= parent.offsetWidth) {
        left = 'auto';
        right = '0px';
      } else {
        left = `${Math.max(newLeft, 0)}px`;
        right = '';
      }
      element.style.left = left;
      element.style.right = right;
    } else {
      console.log('hide formatting toolbar')
    }
  });
};
