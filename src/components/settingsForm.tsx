import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Form,
  Panel
} from '@ijstech/components';
import { Block } from '../global/index';
const Theme = Styles.Theme.ThemeVars;

interface ScomEditorSettingsFormElement extends ControlElement {
  data?: ISettingsForm;
}

export interface ISettingsForm {
  action: any;
  block: Block;
  onConfirm: (block: Block, props: any) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-settings-form']: ScomEditorSettingsFormElement;
    }
  }
}

@customElements('i-scom-editor-settings-form')
export class ScomEditorSettingsForm extends Module {
  private pnlForm: Panel;
  private actionForm: Form;

  private _data: ISettingsForm;

  static async create(options?: ScomEditorSettingsFormElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get data() {
    return this._data;
  }
  set data(value: ISettingsForm) {
    this._data = value;
  }

  setData(value: ISettingsForm) {
    this._data = value;
    this.renderForm();
  }

  private async renderForm() {
    const { action, onConfirm, block } = this.data;
    this.pnlForm.visible = false;
    this.actionForm.visible = false;
    this.pnlForm.clearInnerHTML();
    if (action.customUI) {
      let element = await action.customUI.render({ ...block.props }, this.onSave.bind(this));
      this.pnlForm.append(element);
      this.pnlForm.visible = true;
    } else {
      this.actionForm.uiSchema = action.userInputUISchema;
      this.actionForm.jsonSchema = action.userInputDataSchema;
      this.actionForm.formOptions = {
        columnWidth: '100%',
        columnsPerRow: 1,
        confirmButtonOptions: {
          caption: 'Confirm',
          backgroundColor: Theme.colors.primary.main,
          fontColor: Theme.colors.primary.contrastText,
          padding: {top: '0.5rem', bottom: '0.5rem', right: '1rem', left: '1rem'},
          border: {radius: '0.5rem'},
          hide: false,
          onClick: async () => {
            const data = await this.actionForm.getFormData();
            if (onConfirm) onConfirm(block, data);
          }
        },
        customControls: action.customControls,
        dateTimeFormat: {
          date: 'YYYY-MM-DD',
          time: 'HH:mm:ss',
          dateTime: 'MM/DD/YYYY HH:mm'
        }
      };
      this.actionForm.renderForm();
      this.actionForm.clearFormData();
      this.actionForm.setFormData({ ...block.props });
      this.actionForm.visible = true;
    }
  }

  private onSave(result: boolean, data: any) {
    const { onConfirm, block } = this.data;
    if (onConfirm && result) onConfirm(block, {...data});
  }

  init() {
    super.init();
    const data = this.getAttribute('data', true);
    if (data) this.setData(data);
  }

  render() {
    return (
      <i-panel padding={{top: '1rem', bottom: '1rem', left: '1rem', right: '1rem'}}>
        <i-form id="actionForm" visible={false}></i-form>
        <i-panel id="pnlForm" visible={false}></i-panel>
      </i-panel>
    )
  }
}
