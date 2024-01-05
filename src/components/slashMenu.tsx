import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  VStack,
  HStack,
  Control,
  Icon
} from '@ijstech/components';
import { getExtraFields, getModalContainer, getToolbar } from './utils';
const Theme = Styles.Theme.ThemeVars;

interface ScomEditorSlashMenuElement extends ControlElement {
  items?: any;
  selectedIndex?: number;
  onItemClicked?: (item: any) => void,
}

interface ISlashMenuItem {
  name: string;
  execute: any;
  aliases: string[];
}

interface ISlashMenu {
  items?: ISlashMenuItem[];
  selectedIndex?: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-splash-menu']: ScomEditorSlashMenuElement;
    }
  }
}

@customElements('i-scom-editor-splash-menu')
export class ScomEditorSlashMenu extends Module {
  private pnlSlash: VStack;
  private itemsMap: Map<string, HStack> = new Map();

  private _data: ISlashMenu;

  onItemClicked: (item: any) => void

  static async create(options?: ScomEditorSlashMenuElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get items() {
    return this._data.items || [];
  }
  set items(value: ISlashMenuItem[]) {
    this._data.items = value || [];
  }

  get selectedIndex() {
    return this._data.selectedIndex ?? 0;
  }
  set selectedIndex(value: number) {
    this._data.selectedIndex = value ?? 0;
  }

  get groupData() {
    const result: {[key: string]: any[]} = {};
    const fieldData = getExtraFields();
    for (let item of this.items) {
      const executeFn = item.execute;
      item.execute = (editor: any) => {
        const slashMenu = getToolbar('slashMenu');
        if (slashMenu) slashMenu.visible = false;
        editor.focus();
        executeFn(editor);
      }
      const field = fieldData[item.name] || {};
      if (result[field.group]) {
        result[field.group].push({...field, ...item});
      } else {
        result[field.group] = [{...field, ...item}];
      }
    }
    return result;
  }

  setData(value: ISlashMenu) {
    this._data = value;
    this.renderUI();
  }

  updateMaxHeight(maxHeight: number) {
    this.pnlSlash.maxHeight = maxHeight;
  }

  private renderUI() {
    this.pnlSlash.clearInnerHTML();
    const groups = Object.keys(this.groupData);
    for(let group of groups) {
      const itemsWrap = <i-vstack></i-vstack>
      const groupEl = (
        <i-vstack>
          <i-label
            caption={group}
            padding={{top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem'}}
            width={'100%'}
            background={{color: Theme.action.hoverBackground}}
          ></i-label>
          {itemsWrap}
        </i-vstack>
      );
      let selectedItem: Control | null = null;
      for (let i = 0; i < this.groupData[group].length; i++) {
        const item = this.groupData[group][i];
        const isSelected = this.items[this.selectedIndex]?.name === item.name;
        const icon = new Icon(undefined, { ...item.icon, width: '1rem', height: '1rem' });
        const hstack = <i-hstack
          padding={{top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem'}}
          cursor="pointer"
          gap={'1rem'} width={'100%'}
          verticalAlignment="center"  horizontalAlignment="space-between"
          background={{color: isSelected ? Theme.action.activeBackground : 'transparent'}}
          hover={{
            backgroundColor: Theme.action.activeBackground
          }}
          onClick={() => {
            if (this.onItemClicked) this.onItemClicked(item);
            const oldSelected = this.items[this.selectedIndex]?.name
            const oldItem = oldSelected && this.itemsMap.get(oldSelected);
            if (oldItem) oldItem.background.color = 'transparent';
            const currentItem = this.itemsMap.get(item.name);
            if (currentItem) currentItem.background.color = Theme.action.activeBackground;
          }}
        >
          <i-hstack width={'100%'} gap={'1rem'} verticalAlignment="center">
            {icon}
            <i-vstack gap={'0.25rem'}>
              <i-label caption={item.name} font={{size: '0.875rem', weight: 500}}></i-label>
              <i-label caption={item.hint} font={{size: '0.625rem', weight: 400}}></i-label>
            </i-vstack>
          </i-hstack>
          <i-label
            caption={item.shortcut || ''}
            font={{size: '0.625rem', weight: 600}}
            border={{radius: '0.25rem'}}
            background={{color: item.shortcut ? Theme.action.activeBackground : 'transparent'}}
            visible={item.shortcut}
            padding={{top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem'}}
            stack={{shrink: '0'}}
          ></i-label>
        </i-hstack>
        if (isSelected) selectedItem = hstack;
        itemsWrap.append(hstack);
        this.itemsMap.set(item.name, hstack);
      }
      this.pnlSlash.appendChild(groupEl);
      if (selectedItem) {
        this.pnlSlash.scrollTo({ top: selectedItem.offsetTop })
      }
    }
  }

  init() {
    super.init();
    this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
    const items = this.getAttribute('items', true);
    const selectedIndex = this.getAttribute('selectedIndex', true);
    if (items) this.setData({items, selectedIndex});
  }

  render() {
    return (
      <i-panel id="pnlWrap" minWidth={300} maxWidth={'100%'} height="auto">
        <i-vstack id="pnlSlash"
          width={'100%'} overflow={{y: 'auto'}}
          border={{radius: '0.375rem', width: '1px', style: 'solid', color: Theme.colors.secondary.light}}
        />
      </i-panel>
    )
  }
}
