import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  HStack,
  Modal
} from '@ijstech/components';
import { Block, BlockNoteEditor, TextAlignmentType, formatKeyboardShortcut } from '../global/index';
import { IBlockTypeItem, MediaBlockTypes, createButton } from './utils';
import { ScomEditorColor } from './colorButton';
import { ColorType } from './colorPicker';
import { buttonHoverStyle } from './index.css';
import { ScomEditorBlockType } from './blockTypeButton';
import { ScomEditorLink } from './linkButton';
import { ScomEditorImageToolbar } from './imageToolbar';
const Theme = Styles.Theme.ThemeVars;

interface ScomEditorFormattingToolbarElement extends ControlElement {
  editor?: BlockNoteEditor;
}

interface IFormattingToolbar {
  editor: BlockNoteEditor;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-formatting-toolbar']: ScomEditorFormattingToolbarElement;
    }
  }
}

@customElements('i-scom-editor-formatting-toolbar')
export class ScomEditorFormattingToolbar extends Module {
  private pnlFormatting: HStack;
  private imgToolbar: ScomEditorImageToolbar;
  private mdReplace: Modal;

  private _data: IFormattingToolbar;
  private _oldBlock: Block = {
    id: '',
    type: '',
    props: undefined,
    content: [],
    children: []
  };
  private _block: Block = {
    id: '',
    type: '',
    props: undefined,
    content: [],
    children: []
  };

  static async create(options?: ScomEditorFormattingToolbarElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get editor() {
    return this._data.editor;
  }
  set editor(value: BlockNoteEditor) {
    this._data.editor = value;
  }
  
  private setBlockType(editor: BlockNoteEditor, item: IBlockTypeItem) {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block]
    editor.focus();
    for (const block of selectedBlocks) {
      editor.updateBlock(block, {
        type: item.type,
        props: item.props,
      });
    }
  }

  private setAlignment(editor: BlockNoteEditor, textAlignment: TextAlignmentType) {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    editor.focus();
    for (const block of selectedBlocks) {
      editor.updateBlock(block, {
        props: { textAlignment }
      });
    }
  }

  private setColor(editor: BlockNoteEditor, type: ColorType, color: string) {
    editor.focus();
    const prop = type === 'text' ? 'textColor' : 'backgroundColor';
    color === "default"
      ? editor.removeStyles({ [prop]: color })
      : editor.addStyles({ [prop]: color });
  }

  private setLink(editor: BlockNoteEditor, text: string, url: string) {
    editor.createLink(url, text || editor.getSelectedText());
    editor.focus();
  }

  private getToolbarButtons(editor: BlockNoteEditor) {
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
        icon: {...iconProps, name: 'image'},
        tooltip: {...toolTipProps, content: `Replace Image`},
        isSelected: false,
        visible: this.isMediaBlock,
        onClick: () => {
          this.mdReplace.visible = true;
        }
      },
      {
        customControl: (element: Container) => {
          let blockType = new ScomEditorBlockType(undefined, {
            ...customProps,
            block: this._block,
            visible: !this.isMediaBlock,
            stack: {shrink: '0'},
            onItemClicked: (item: IBlockTypeItem) => this.setBlockType(editor, item),
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
        tooltip: {...toolTipProps, content: `Bold <br/> ${formatKeyboardShortcut("Mod+B")}`},
        isSelected: editor.getActiveStyles().bold,
        visible: !this.isMediaBlock,
        onClick: () => {
          editor.toggleStyles({ bold: true });
        }
      },
      {
        icon: {...iconProps, name: 'italic'},
        visible: !this.isMediaBlock,
        tooltip: {...toolTipProps, content: `Italicize <br/> ${formatKeyboardShortcut("Mod+I")}`},
        isSelected: editor.getActiveStyles().italic,
        onClick: () => {
          editor.toggleStyles({ italic: true });
        }
      },
      {
        icon: {...iconProps, name: 'underline'},
        visible: !this.isMediaBlock,
        tooltip: {...toolTipProps, content: `Underline <br/> ${formatKeyboardShortcut("Mod+U")}`},
        isSelected: editor.getActiveStyles().underline,
        onClick: () => {
          editor.toggleStyles({ underline: true });
        }
      },
      {
        icon: {...iconProps, name: 'strikethrough'},
        visible: !this.isMediaBlock,
        tooltip: {...toolTipProps, content: `Strike-through <br/>  ${formatKeyboardShortcut("Mod+Shift+X")} or  ${formatKeyboardShortcut("Mod+Shift+Z")}`},
        isSelected: editor.getActiveStyles().strikethrough,
        onClick: () => {
          editor.toggleStyles({ strikethrough: true });
        }
      },
      {
        icon: {...iconProps, name: 'align-left'},
        tooltip: {...toolTipProps, content: 'Align Text Left'},
        isSelected: this._block.props?.textAlignment === 'left',
        onClick: () => {
          this.setAlignment(editor, 'left');
        }
      },
      {
        icon: {...iconProps, name: 'align-center'},
        tooltip: {...toolTipProps, content: 'Align Text Center'},
        isSelected: this._block.props?.textAlignment === 'center',
        onClick: () => {
          this.setAlignment(editor, 'center');
        }
      },
      {
        icon: {...iconProps, name: 'align-right'},
        isSelected: this._block.props?.textAlignment === 'right',
        tooltip: {...toolTipProps, content: 'Align Text Right'},
        onClick: () => {
          this.setAlignment(editor, 'right');
        }
      },
      {
        customControl: (element: Container) => {
          let colorPicker = new ScomEditorColor(undefined, {
            ...customProps,
            visible: !this.isMediaBlock,
            textColor: editor.getActiveStyles().textColor || "default",
            backgroundColor: editor.getActiveStyles().backgroundColor || "default",
            setColor: (type: ColorType, color: string) => this.setColor(editor, type, color),
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
            tooltip: { content: `Create Link <br />  ${formatKeyboardShortcut("Mod+K")}`, placement: 'bottom' },
            editor: editor,
            visible: !this.isMediaBlock,
            setLink: (text: string, url: string) => {
              this.setLink(editor, text, url);
            },
            class: buttonHoverStyle
          })
          return link;
        }
      }
    ]
  }

  private get isMediaBlock() {
    const selectedBlocks = this.editor.getSelection()?.blocks || [this.editor.getTextCursorPosition().block];
    const show =
      selectedBlocks.length === 1 &&
      MediaBlockTypes.includes(selectedBlocks[0].type);
    return show;
  }

  setData(value: IFormattingToolbar) {
    this._data = value;
    this.renderUI();
  }

  onRefresh() {
    this.updateBlock();
    if (this._oldBlock?.id !== this._block?.id) {
      this.renderList()
    }
  }

  private renderUI() {
    this.updateBlock();
    this.renderList();
  }

  private updateBlock() {
    this._oldBlock = {...this._block};
    const block = this.editor.getTextCursorPosition().block;
    this._block = block;
    this.imgToolbar.setData({
      block: this._block,
      editor: this.editor
    })
  }

  private renderList() {
    this.pnlFormatting.clearInnerHTML();
    let buttonList = this.getToolbarButtons(this.editor);
    for (let props of buttonList) {
      if (props.customControl) {
        const elm = props.customControl(this.pnlFormatting);
        this.pnlFormatting.appendChild(elm);
      } else {
        const btn = createButton(props, this.pnlFormatting);
        this.pnlFormatting.appendChild(btn);
      }
    }
  }

  init() {
    super.init();
    const editor = this.getAttribute('editor', true);
    if (editor) this.setData({editor});
    this.imgToolbar.onUpdated = () => {
      this.mdReplace.visible = false;
    }
  }

  render() {
    return (
      <i-panel>
        <i-hstack id="pnlFormatting" width={'100%'} verticalAlignment='center' gap="0.125rem" overflow={'hidden'}></i-hstack>
        <i-modal
          id="mdReplace"
          popupPlacement='bottom'
          showBackdrop={false}
          width={500}
          maxWidth={'100%'}
          background={{color: Theme.background.main}}
          boxShadow={Theme.shadows[1]}
          visible={false}
          padding={{top: '0.125rem', bottom: '0.125rem', left: '0.125rem', right: '0.125rem'}}
          border={{radius: '0.375rem', width: '1px', style: 'solid', color: Theme.colors.secondary.light}}
        >
          <i-scom-editor-image-toolbar id="imgToolbar" />
        </i-modal>
      </i-panel>
    )
  }
}
