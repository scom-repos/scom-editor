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
    https://ipfs.scom.dev/ipfs/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4?data=eyJtb2R1bGUiOnsibmFtZSI6IkBzY29tL3Njb20tdmlkZW8iLCJsb2NhbFBhdGgiOiJzY29tLXZpZGVvIn0sInByb3BlcnRpZXMiOnsidGV4dENvbG9yIjoiZGVmYXVsdCIsImJhY2tncm91bmRDb2xvciI6ImRlZmF1bHQiLCJ0ZXh0QWxpZ25tZW50IjoibGVmdCIsInVybCI6Imh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1dsZjFUNW5yTzUwIiwiZW1iZWRVcmwiOiIiLCJ3aWR0aCI6NTEyLCJoZWlnaHQiOiJhdXRvIn19\n\n12\n\n
    https://ipfs.scom.dev/ipfs/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4?data=eyJtb2R1bGUiOnsibmFtZSI6IkBzY29tL3Njb20taW1hZ2UiLCJsb2NhbFBhdGgiOiJzY29tLWltYWdlIn0sInByb3BlcnRpZXMiOnsidGV4dENvbG9yIjoiZGVmYXVsdCIsImJhY2tncm91bmRDb2xvciI6IiIsInRleHRBbGlnbm1lbnQiOiJsZWZ0IiwidXJsIjoiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NjUxNDYzNDQ0MjUtZjAwZDVmNWM4ZjA3P2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU0zdzBOek00TXpsOE1Id3hmSE5sWVhKamFId3hOSHg4Ym1GMGRYSmxmR1Z1ZkRCOGZIeDhNVGN3TURVek9UUXpNWHd3Jml4bGliPXJiLTQuMC4zJnE9ODAmdz0xMDgwIiwiY2lkIjoiIiwibGluayI6IiIsImFsdFRleHQiOiJvcmFuZ2UgZmxvd2VycyIsImtleXdvcmQiOiIiLCJwaG90b0lkIjoiSWljeWlhUFlHR0kiLCJlbWJlZFVybCI6Imh0dHBzOi8vaXBmcy5zY29tLmRldi9pcGZzL2JhZnliZWlhNDQybmw2ZGp6N3FpcG5mazVkeHUyNnBncjJ4Z3Bhcjd6bnZ0M2FpaDJrNm54azdzaWI0P2RhdGE9ZXlKdGIyUjFiR1VpT25zaWJtRnRaU0k2SWtCelkyOXRMM05qYjIwdGFXMWhaMlVpTENKc2IyTmhiRkJoZEdnaU9pSnpZMjl0TFdsdFlXZGxJbjBzSW5CeWIzQmxjblJwWlhNaU9uc2lZMmxrSWpvaUlpd2lkWEpzSWpvaWFIUjBjSE02THk5cGJXRm5aWE11ZFc1emNHeGhjMmd1WTI5dEwzQm9iM1J2TFRFME5qVXhORFl6TkRRME1qVXRaakF3WkRWbU5XTTRaakEzUDJOeWIzQTlaVzUwY205d2VTWmpjejEwYVc1NWMzSm5ZaVptYVhROWJXRjRKbVp0UFdwd1p5WnBlR2xrUFUwemR6Qk9lazAwVFhwc09FMUlkM2htU0U1c1dWaEthbUZJZDNoT1NIZzRZbTFHTUdSWVNteG1SMVoxWmtSQ09HWkllRGhOVkdOM1RVUlZlazlVVVhwTldIZDNKbWw0YkdsaVBYSmlMVFF1TUM0ekpuRTlPREFtZHoweE1EZ3dJaXdpWVd4MFZHVjRkQ0k2SW05eVlXNW5aU0JtYkc5M1pYSnpJaXdpWW1GamEyZHliM1Z1WkVOdmJHOXlJam9pSWl3aWJHbHVheUk2SWlJc0luQm9iM1J2U1dRaU9pSkphV041YVdGUVdVZEhTU0lzSW10bGVYZHZjbVFpT2lJaWZYMD0iLCJ3aWR0aCI6NTEyLCJoZWlnaHQiOiJhdXRvIn19\n\n`
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
