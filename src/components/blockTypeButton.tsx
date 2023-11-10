import {
  customElements,
  ControlElement,
  Module,
  Container
} from '@ijstech/components';
import { IBlockTypeItem, defaultBlockTypeItems } from './utils';
import { ScomEditorToolbarDropdown } from './toolbarDropdown';

type callbackType = (item: IBlockTypeItem) => void;
type validateCallback = (item: IBlockTypeItem) => boolean;

interface ScomEditorBlockTypeElement extends ControlElement {
  items?: IBlockTypeItem[];
  block?: any;
  onItemClicked?: callbackType;
  onValidate?: validateCallback;
}

interface IBlockType {
  items?: IBlockTypeItem[];
  block?: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-block-type']: ScomEditorBlockTypeElement;
    }
  }
}

@customElements('i-scom-editor-block-type')
export class ScomEditorBlockType extends Module {
  private blockType: ScomEditorToolbarDropdown;

  private _data: IBlockType;

  onItemClicked: callbackType;
  onValidate: validateCallback;

  static async create(options?: ScomEditorBlockTypeElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get items() {
    return this._data.items ?? defaultBlockTypeItems;
  }
  set items(value: IBlockTypeItem[]) {
    this._data.items = value ?? defaultBlockTypeItems;
  }

  get block() {
    return this._data.block;
  }
  set block(value: IBlockTypeItem[]) {
    this._data.block = value;
  }

  setData(value: IBlockType) {
    this._data = value;
    this.blockType.setData({ items: this.getItems() });
  }

  getData() {
    return this._data;
  }

  get filteredItems() {
    return [...this.items].filter((item) => {
      if (!this.onValidate(item)) {
        return false;
      }
      // Checks if props for the block type are valid
      // for (const [prop, value] of Object.entries(item.props || {})) {
      //   const propSchema = props.editor.schema[item.type].propSchema;

      //   // Checks if the prop exists for the block type
      //   if (!(prop in propSchema)) {
      //     return false;
      //   }

      //   // Checks if the prop's value is valid
      //   if (
      //     propSchema[prop].values !== undefined &&
      //     !propSchema[prop].values!.includes(value)
      //   ) {
      //     return false;
      //   }
      // }

      return true;
    });
  }

  private getItems() {
    return [...this.items].map((item) => ({
      text: item.name,
      icon: item.icon,
      onClick: () => {
        if (this.onItemClicked) this.onItemClicked(item);
      },
      isSelected: item.isSelected(this.block),
    }));
  }

  init() {
    super.init();
    this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
    this.onValidate = this.getAttribute('onValidate', true) || this.onValidate;
    const items = this.getAttribute('items', true);
    const block = this.getAttribute('block', true);
    this.setData({ items, block });
  }

  render() {
    return (
      <i-scom-editor-toolbar-dropdown id="blockType" display="inline-block" height={'100%'} />
    )
  }
}
