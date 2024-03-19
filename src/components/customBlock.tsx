import {
  customElements,
  ControlElement,
  Module,
  Container,
  Panel,
  application
} from '@ijstech/components';
import { getModalContainer, getToolbar } from './utils';
import { ScomEditorSideMenu } from './sideMenu';
import { Block } from '../global/index';

interface ICustomBlockConfig {
  module: string;
  properties: any;
  block: Block;
}

interface ScomEditorCustomBlockElement extends ControlElement {
  data: ICustomBlockConfig;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-custom-block']: ScomEditorCustomBlockElement;
    }
  }
}

@customElements('i-scom-editor-custom-block')
export class ScomEditorCustomBlock extends Module {
  private blockWrapper: Panel;
  private blockEl: any;

  private _data: ICustomBlockConfig = {
    module: '',
    properties: undefined,
    block: {
      id: '',
      type: '',
      props: undefined,
      content: undefined,
      children: []
    }
  };
  private currentModule: string = '';

  static async create(options?: ScomEditorCustomBlockElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  getData() {
    return this._data;
  }

  async setData(data: ICustomBlockConfig) {
    this._data = data;
    await this.renderUI(this._data);
  }

  private async renderUI(data: ICustomBlockConfig) {
    const { module, properties, block } = data;
    if (!this.blockEl || (this.blockEl && module !== this.currentModule)) {
      try {
        this.blockEl = await application.createElement(module);
        this.blockEl.display = 'block';
        if (module === 'scom-video') this.blockEl.minWidth = '7rem';
      } catch {}
      this.currentModule = module;
      this.blockWrapper.clearInnerHTML();
      this.blockWrapper.appendChild(this.blockEl);
    }
    const sideMenu = getToolbar('sideMenu') as ScomEditorSideMenu;
    switch(module) {
      case "scom-image":
      case "scom-video":
      case "scom-twitter-post":
        if (sideMenu && !properties?.url) sideMenu.openConfig(block, this);
        break;
      case "scom-swap":
        if (sideMenu && !properties?.providers?.length) sideMenu.openConfig(block, this);
        break;
    }
    await this.blockEl.setData(JSON.parse(JSON.stringify(properties)));
  }

  getActions() {
    if (this.blockEl?.getConfigurators) {
      const configs = this.blockEl.getConfigurators() || [];
      const configurator = configs.find((conf: any) => conf.target === 'Editor');
      if (configurator?.getActions) return configurator.getActions();
    }
    return [];
  }

  async init() {
    super.init();
    const data = this.getAttribute('data', true);
    if (data) await this.setData(data);
  }

  render(): void {
    return (
      <i-panel id="blockWrapper"></i-panel>
    )
  }
}
