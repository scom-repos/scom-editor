import { Module, customModule, Container, Styles } from '@ijstech/components';
import { ScomEditor } from '@scom/scom-editor';
const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Module1 extends Module {
  private elm: ScomEditor;
  private _value: string = '';

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this._value = "|   |   |                                                                                                                                                                                                                                     |\n| - | - | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n|   |   |                                                                                                                                                                                                                                     |\n| 1 | 1 | [video](https://www.youtube.com/watch?v=5p248yoa3oE)                                                                                                                                                                                |\n|   |   |                                                                                                                                                                                                                                     |\n|   |   | ![orange flowers](https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy\\&cs=tinysrgb\\&fit=max\\&fm=jpg\\&ixid=M3w0NzM4Mzl8MHwxfHNlYXJjaHwxNHx8bmF0dXJlfGVufDB8fHx8MTcwMTY1OTcyN3ww\\&ixlib=rb-4.0.3\\&q=80\\&w=1080) |\n\n[swap](https://ipfs.scom.dev/ipfs/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4?data=eyJtb2R1bGUiOnsibmFtZSI6IkBzY29tL3Njb20tc3dhcCIsImxvY2FsUGF0aCI6InNjb20tc3dhcCJ9LCJwcm9wZXJ0aWVzIjp7ImJhY2tncm91bmRDb2xvciI6ImRlZmF1bHQiLCJ0ZXh0Q29sb3IiOiJkZWZhdWx0IiwidGV4dEFsaWdubWVudCI6ImxlZnQiLCJjYXRlZ29yeSI6ImZpeGVkLXBhaXIiLCJwcm92aWRlcnMiOlt7ImtleSI6Ik9wZW5Td2FwIiwiY2hhaW5JZCI6OTd9LHsia2V5IjoiT3BlblN3YXAiLCJjaGFpbklkIjo0MzExM31dLCJ0b2tlbnMiOlt7ImFkZHJlc3MiOiIweDI5Mzg2QjYwZTBBOUExYTMwZTE0ODhBREE0NzI1NjU3N2NhMkMzODUiLCJjaGFpbklkIjo5N30seyJhZGRyZXNzIjoiMHg0NWVlZTc2MmFhZUE0ZTVjZTMxNzQ3MUJEYTg3ODI3MjQ5NzJFZTE5IiwiY2hhaW5JZCI6OTd9LHsiYWRkcmVzcyI6IjB4YjlDMzFFYTFENDc1YzI1RTU4YTFiRTFhNDYyMjFkYjU1RTVBN0M2ZSIsImNoYWluSWQiOjQzMTEzfSx7ImFkZHJlc3MiOiIweDc4ZDlEODBFNjdiQzgwQTExZWZiZjg0QjdjOEE2NURhNTFhOEVGM0MiLCJjaGFpbklkIjo0MzExM31dLCJkZWZhdWx0Q2hhaW5JZCI6NDMxMTMsIm5ldHdvcmtzIjpbeyJjaGFpbklkIjo0MzExM30seyJjaGFpbklkIjo5N31dLCJsb2dvIjoiIiwidGl0bGUiOiIiLCJjYW1wYWlnbklkIjpudWxsLCJ3YWxsZXRzIjpbeyJuYW1lIjoibWV0YW1hc2sifV0sImNvbW1pc3Npb25zIjpbXSwiZGVmYXVsdElucHV0VmFsdWUiOiIiLCJkZWZhdWx0T3V0cHV0VmFsdWUiOiIifX0=)\n";
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
