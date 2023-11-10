import { Module, customModule, Container } from '@ijstech/components';
import { ScomEditor } from '@scom/scom-editor';

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
          border={{radius: '0.5rem'}}
          background={{color: 'gray'}}
        />
      </i-vstack>
    );
  }
}
