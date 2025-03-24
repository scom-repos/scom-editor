import { Control, ControlElement, Module, Panel, customElements } from "@ijstech/components";
import { getEmbedElement } from "../global/index";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor--widget']: WidgetElement;
    }
  }
}

interface IElement {
  module?: string;
  data?: string;
  content?: string;
}

interface WidgetElement extends ControlElement {
  moduleName?: string;
  data?: string;
  content?: string;
  elements?: IElement[];
}

@customElements('i-scom-editor--widget')
export class ScomEditorWidget extends Module {
  private _moduleName: string;
  private _data: any;
  private _elements: IElement[] = [];

  private pnlWidget: Panel;

  get moduleName() {
    return this._moduleName;
  }

  set moduleName(value: string) {
    this._moduleName = value;
  }

  get data() {
    return this._data || {};
  }

  set data(value: any) {
    this._data = value;
  }

  private renderWidget() {
    this.pnlWidget.clearInnerHTML();
    if (this.moduleName) {
      const data = this.data;
      const module = this.moduleName;
      getEmbedElement({ module, data }, this.pnlWidget, (el: Module) => {
        try {
          if (this._elements?.length) {
            this.renderChildElements(el, this._elements);
          }
        } catch {}
      });
    }
  }

  private async renderChildElements(el: Control, elements: any[]) {
    const parent = el.querySelector('#pnlWrapper') as Control;
    if (parent) {
      for (const element of elements) {
        const { module, data: dataStr, content } = element;
        const data = this.parseWidgetData(dataStr, module, content);
        await getEmbedElement({data, module}, parent, async(childEl) => {
          if (!element?.elements?.length) return;
          await this.renderChildElements(childEl, element.elements || []);
        });
      }
    }
  }

  private parseWidgetData(data: any, module: string, content: string) {
    try {
      const { data: dataVal, ...tag } = data;
      const propName = "data";
      const props: any = {
        properties: {},
        tag
      }
      if (Array.isArray(dataVal)) {
        props.properties[propName] = dataVal;
      } else {
        props.properties = dataVal;
      }
      if (content) {
        if (!props.properties) props.properties = {};
        const hasSpaces = content.indexOf(' ') >= 0;
        if (hasSpaces) {
          props.properties.value = content;
        } else {
          try {
            props.properties.value = content;
          } catch {
            props.properties.value = content;
          }
        }
      }

      return props;
    } catch(err) {
      console.error('parsed error: ', err);
      return null;
    }
  }

  init() {
    super.init();
    this.moduleName = this.getAttribute('moduleName', true);
    const data = this.getAttribute('data', true);
    const content = this.getAttribute('content', true);
    this._elements = this.getAttribute('elements', true);
    this.data = this.parseWidgetData(data, this.moduleName, content);
    if (this.moduleName) this.renderWidget();
  }

  render() {
    return <i-panel id="pnlWidget"></i-panel>
  }
}