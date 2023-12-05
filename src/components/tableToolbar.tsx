import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  HStack,
} from '@ijstech/components';
import { Block, BlockNoteEditor } from '../global/index';
import { IToolbarDropdownItem, createButton } from './utils';
import { ScomEditorToolbarDropdown } from './toolbarDropdown';
import { buttonHoverStyle } from './index.css';

const Theme = Styles.Theme.ThemeVars;

interface ScomEditorTableToolbarElement extends ControlElement {
  editor?: BlockNoteEditor;
}

interface ITableToolbar {
  editor: BlockNoteEditor;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-table-toolbar']: ScomEditorTableToolbarElement;
    }
  }
}

@customElements('i-scom-editor-table-toolbar')
export class ScomEditorTableToolbar extends Module {
  private pnlTableToolbar: HStack;

  private _data: ITableToolbar;
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

  static async create(options?: ScomEditorTableToolbarElement, parent?: Container) {
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
      // {
      //   icon: {...iconProps, name: 'expand-alt'},
      //   tooltip: {...toolTipProps, content: `Fix table to page width`},
      //   onClick: () => {
      //     editor._tiptapEditor.chain().focus().fixTables().run();
      //   }
      // },
      {
        customControl: () => {
          let dropdown = new ScomEditorToolbarDropdown(undefined, {
            ...customProps,
            caption: 'Options',
            items: this.getDropdownItems(this.editor),
            class: buttonHoverStyle
          });
          return dropdown;
        }
      }
    ]
  }

  private getDropdownItems(editor: BlockNoteEditor) {
    const items: IToolbarDropdownItem[] = [
      {
        icon: {name: 'plus-circle'},
        text: `Insert column before`,
        isDisabled: !editor._tiptapEditor.can().addColumnBefore(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().addColumnBefore().run();
        }
      },
      {
        icon: {name: 'plus-circle'},
        text: `Insert column after`,
        isDisabled: !editor._tiptapEditor.can().addColumnAfter(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().addColumnAfter().run();
        }
      },
      {
        icon: {name: 'minus-circle'},
        text: `Delete column`,
        isDisabled: !editor._tiptapEditor.can().deleteColumn(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().deleteColumn().run();
        }
      },
      {
        icon: {name: 'plus-circle'},
        text: `Insert row before`,
        isDisabled: !editor._tiptapEditor.can().addRowBefore(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().addRowBefore().run();
        }
      },
      {
        icon: {name: 'plus-circle'},
        text: `Insert row after`,
        isDisabled: !editor._tiptapEditor.can().addRowBefore(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().addRowBefore().run();
        }
      },
      {
        icon: {name: 'times'},
        text: `Delete row`,
        isDisabled: !editor._tiptapEditor.can().deleteRow(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().deleteRow().run();
        }
      },
      {
        icon: {name: 'times'},
        text: `Delete table`,
        isDisabled: !editor._tiptapEditor.can().deleteTable(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().deleteTable().run();
        }
      },
      {
        icon: {name: 'object-ungroup'},
        text: `Split cell`,
        isDisabled: !editor._tiptapEditor.can().splitCell(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().splitCell().run();
        }
      },
      {
        icon: {name: 'columns'},
        text: `Merge cells`,
        isDisabled: !editor._tiptapEditor.can().mergeCells(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().mergeCells().run();
        }
      },
      {
        icon: {name: 'toggle-on'},
        text: `Toggle header column`,
        isDisabled: !editor._tiptapEditor.can().toggleHeaderColumn(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().toggleHeaderColumn().run();
        }
      },
      {
        icon: {name: 'toggle-on'},
        text: `Toggle header row`,
        isDisabled: !editor._tiptapEditor.can().toggleHeaderColumn(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().toggleHeaderColumn().run();
        }
      },
      {
        icon: {name: 'toggle-on'},
        text: `Toggle header cells`,
        isDisabled: !editor._tiptapEditor.can().toggleHeaderCell(),
        onClick: () => {
          editor._tiptapEditor.chain().focus().toggleHeaderCell().run();
        }
      }
    ]
    return items;
  }

  setData(value: ITableToolbar) {
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
  }

  private async renderList() {
    this.pnlTableToolbar.clearInnerHTML();
    let buttonList: any = this.getToolbarButtons(this.editor);
    for (let props of buttonList) {
      if (props.customControl) {
        const elm = props.customControl();
        this.pnlTableToolbar.appendChild(elm);
      } else {
        const btn = createButton(props, this.pnlTableToolbar);
        this.pnlTableToolbar.appendChild(btn);
      }
    }
  }

  init() {
    super.init();
    const editor = this.getAttribute('editor', true);
    if (editor) this.setData({editor});
  }

  render() {
    return (
      <i-panel>
        <i-hstack id="pnlTableToolbar" width={'100%'} verticalAlignment='center' gap="0.125rem" overflow={'hidden'}></i-hstack>
      </i-panel>
    )
  }
}
