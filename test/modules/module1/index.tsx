import { Module, customModule, Container, Styles } from '@ijstech/components';
import { ScomEditor } from '@scom/scom-editor';
const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Module1 extends Module {
  private elm: ScomEditor;
  private _value: string = '';

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this._value = `### Heading
    \n\n[video](https://www.youtube.com/embed/Wlf1T5nrO50)\n\n\n\n![orange flowers](https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzM4Mzl8MHwxfHNlYXJjaHwxNHx8bmF0dXJlfGVufDB8fHx8MTcwMDUzOTQzMXww&ixlib=rb-4.0.3&q=80&w=1080)\n\n`
  }

  init() {
    super.init();
  }

  render() {
    return (
      <i-vstack margin={{ left: 'auto', right: 'auto' }} maxWidth={960}>
        <i-scom-editor
          id="elm" width={600}
          margin={{left: 'auto', right:'auto'}}
          border={{radius: '0.5rem', width: '1px', style: 'solid', color: Theme.divider}}
          // font={{color: Theme.text.primary}}
          // background={{color: Theme.background.main}}
          value={this._value}
        />
      </i-vstack>
    );
  }
}
