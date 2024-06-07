import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Form,
  VStack,
  ComboBox,
  Input,
  IComboItem
} from '@ijstech/components';
import { Block } from '../global/index';
import { formStyle, settingStyle } from './index.css';
import { getChartTypeOptions } from './utils';
const Theme = Styles.Theme.ThemeVars;

interface ScomEditorSettingsFormElement extends ControlElement {
  data?: ISettingsForm;
}

export interface ISettingsForm {
  action: any;
  block: Block;
  onConfirm: (block: Block, props: any) => void;
  onTypeChanged?: any;
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
  private pnlForm: VStack;
  private actionForm: Form;
  private inputTitle: Input;
  private cbName: ComboBox;
  private customForm: any;

  private _data: ISettingsForm;
  private chartActions: Map<string, any> = new Map();

  static async create(options?: ScomEditorSettingsFormElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.onChartNameChanged = this.onChartNameChanged.bind(this);
  }

  get data() {
    return this._data;
  }
  set data(value: ISettingsForm) {
    this._data = value;
  }

  async setData(value: ISettingsForm) {
    this._data = value;
    await this.renderForm();
  }

  private async renderForm() {
    const { action, onConfirm, block } = this.data;
    this.pnlForm.visible = false;
    this.actionForm.visible = false;
    this.pnlForm.clearInnerHTML();
    if (action.customUI) {
      if (block.type === 'chart') {
        const types = getChartTypeOptions();
        const selectedValue = types.find(item => block.props.name && item.value === block.props.name) || undefined;
        this.chartActions.set(block.props.name, action);
        this.pnlForm.append(
          <i-vstack gap={'0.625rem'} width={'100%'}>
            <i-label caption='Chart Type'></i-label>
            <i-combo-box
              id="cbName"
              items={types}
              selectedItem={selectedValue}
              width={'100%'}
              height={'2.625rem'}
              onChanged={this.onChartNameChanged}
            ></i-combo-box>
          </i-vstack>
        )
        this.pnlForm.append(
          <i-vstack gap={'0.625rem'} width={'100%'}>
            <i-label caption='Chart Title'></i-label>
            <i-input
              id='inputTitle'
              width={'100%'}
              height={'2.625rem'}
              placeholder='Enter Title'
              value={block.props?.title || ''}
            ></i-input>
          </i-vstack>
        )
      }
      this.customForm = await action.customUI.render({ ...block.props }, this.onSave.bind(this));
      this.pnlForm.append(this.customForm);
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

  private async onChartNameChanged(target: ComboBox) {
    const { block, onTypeChanged } = this.data;
    const name = (target.selectedItem as IComboItem).value;
    if (name === block.props.name) return;
    if (this.customForm) this.customForm.remove();
    if (this.chartActions.has(name)) {
      this.customForm = await this.chartActions.get(name).customUI.render({ ...block.props }, this.onSave.bind(this));
      this.pnlForm.append(this.customForm);
    } else if (onTypeChanged) {
      const newAction = await onTypeChanged(name);
      if (newAction) {
        this.customForm = await newAction.customUI.render({ ...block.props }, this.onSave.bind(this));
        this.pnlForm.append(this.customForm);
      }
    }
  }

  private onSave(result: boolean, data: any) {
    const { onConfirm, block } = this.data;
    if (block.type === 'chart') {
      data.title = this.inputTitle.value || '';
      data.name = (this.cbName.selectedItem as IComboItem).value;
    }
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
        <i-form id="actionForm" visible={false} class={formStyle}></i-form>
        <i-vstack
          id="pnlForm"
          gap={'0.625rem'}
          width={'100%'}
          visible={false}
          class={settingStyle}
        ></i-vstack>
      </i-panel>
    )
  }
}
