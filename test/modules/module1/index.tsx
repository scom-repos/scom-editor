import { Module, customModule, Container, Styles } from '@ijstech/components';
import { ScomEditor } from '@scom/scom-editor';
const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Module1 extends Module {
  private elm: ScomEditor;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
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
          font={{color: Theme.text.primary}}
          background={{color: Theme.background.main}}
          value='New content'
        />
      </i-vstack>
    );
  }
}
