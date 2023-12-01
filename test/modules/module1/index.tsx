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
    \n\n[video](https://www.youtube.com/embed/Wlf1T5nrO50)\n\n\n\n![orange flowers](https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzM4Mzl8MHwxfHNlYXJjaHwxNHx8bmF0dXJlfGVufDB8fHx8MTcwMDUzOTQzMXww&ixlib=rb-4.0.3&q=80&w=1080)\n\n11111**111111111111** 11111111111
    \n\nhttps://ipfs.scom.dev/ipfs/bafybeia442nl6djz7qipnfk5dxu26pgr2xgpar7znvt3aih2k6nxk7sib4?data=eyJtb2R1bGUiOnsibmFtZSI6IkBzY29tL3Njb20tc3dhcCIsImxvY2FsUGF0aCI6InNjb20tc3dhcCJ9LCJwcm9wZXJ0aWVzIjp7InRleHRDb2xvciI6ImRlZmF1bHQiLCJiYWNrZ3JvdW5kQ29sb3IiOiJkZWZhdWx0IiwidGV4dEFsaWdubWVudCI6ImxlZnQiLCJjYXRlZ29yeSI6ImZpeGVkLXBhaXIiLCJwcm92aWRlcnMiOlt7ImtleSI6Ik9wZW5Td2FwIiwiY2hhaW5JZCI6OTd9LHsia2V5IjoiT3BlblN3YXAiLCJjaGFpbklkIjo0MzExM31dLCJ0b2tlbnMiOlt7ImNoYWluSWQiOjk3LCJhZGRyZXNzIjoiMHgyOTM4NkI2MGUwQTlBMWEzMGUxNDg4QURBNDcyNTY1NzdjYTJDMzg1In0seyJjaGFpbklkIjo5NywiYWRkcmVzcyI6IjB4NDVlZWU3NjJhYWVBNGU1Y2UzMTc0NzFCRGE4NzgyNzI0OTcyRWUxOSJ9LHsiY2hhaW5JZCI6NDMxMTMsImFkZHJlc3MiOiIweGI5QzMxRWExRDQ3NWMyNUU1OGExYkUxYTQ2MjIxZGI1NUU1QTdDNmUifSx7ImNoYWluSWQiOjQzMTEzLCJhZGRyZXNzIjoiMHg3OGQ5RDgwRTY3YkM4MEExMWVmYmY4NEI3YzhBNjVEYTUxYThFRjNDIn1dLCJkZWZhdWx0Q2hhaW5JZCI6NDMxMTMsIm5ldHdvcmtzIjpbeyJjaGFpbklkIjo0MzExM30seyJjaGFpbklkIjo5N31dLCJsb2dvIjoiIiwidGl0bGUiOiIxMjMxMjMifX0=\n\n`
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
          // value={this._value}
        />
      </i-vstack>
    );
  }
}
