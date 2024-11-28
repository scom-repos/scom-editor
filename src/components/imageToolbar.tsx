import {
  customElements,
  ControlElement,
  Styles,
  Module,
  Container,
  Button,
  Input,
  Tabs,
  Label,
  VStack,
  Upload
} from '@ijstech/components';
import { Block, BlockNoteEditor } from '@scom/scom-blocknote-sdk';
import { mainJson as translations } from '../languages/index';

const Theme = Styles.Theme.ThemeVars;

interface ScomEditorImageToolbarElement extends ControlElement {
  editor?: BlockNoteEditor;
  block?: Block;
  onUpdated?: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-editor-image-toolbar']: ScomEditorImageToolbarElement;
    }
  }
}

interface IImageToolbar {
  editor: BlockNoteEditor;
  block: Block;
}

@customElements('i-scom-editor-image-toolbar')
export class ScomEditorImageToolbar extends Module {
  private imageTabs: Tabs;
  private inputUrl: Input;
  private btnUpload: Upload;
  private btnEmbed: Button;
  private lblFailed: Label;
  private pnlLoading: VStack;

  private _data: IImageToolbar;

  onUpdated: () => void;

  static async create(options?: ScomEditorImageToolbarElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get editor() {
    return this._data.editor;
  }
  set editor(value: BlockNoteEditor) {
    this._data.editor = value;
  }

  get block() {
    return this._data.block;
  }
  set block(value: Block) {
    this._data.block = value;
  }

  async setData(value: IImageToolbar) {
    this._data = value;
  }

  getData() {
    return this._data;
  }

  private async onFileChanged(target: Upload, files: File[]) {
    const file = files[0];
    if (!file) return;
    this.lblFailed.visible = false;
    try {
      this.pnlLoading.visible = true;
      const file = files[0];
      const imageStr = await this.btnUpload.toBase64(file) as string;
      this.updateBlock(imageStr);
    } catch(err) {
      this.btnUpload.clear();
      this.lblFailed.visible = true;
    }
    this.pnlLoading.visible = false;
  }

  private handleURLEnter(target: Input, event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.updateBlock();
    }
  }

  private updateBlock (url?: string) {
    this.editor.updateBlock(this.block, {
      type: "image",
      props: {
        url: url ?? this.inputUrl.value,
      },
    });
    this.btnUpload.clear();
    this.imageTabs.activeTabIndex = 0;
    if (this.onUpdated) this.onUpdated();
  }

  private handleURLChanged(target: Input) {
    this.btnEmbed.enabled = !!target.value;
  }

  init() {
    this.i18n.init({...translations});
    super.init();
    this.onUpdated = this.getAttribute('onUpdated', true) || this.onUpdated;
    const editor = this.getAttribute('editor', true);
    const block = this.getAttribute('block', true);
    if (editor && block) this.setData({editor, block});
  }

  render() {
    return (
      <i-panel width={'100%'}>
        <i-tabs id="imageTabs" width={'100%'}>
          <i-tab
            caption="$upload"
            font={{ color: Theme.text.primary, size: '0.875rem' }}
            minHeight={'0px'}
          >
            <i-panel>
              <i-vstack
                id="pnlLoading"
                padding={{ top: '0.5rem', bottom: '0.5rem' }}
                visible={false}
                height="100%"
                width="100%"
                minHeight={200}
                position="absolute"
                top={0}
                bottom={0}
                zIndex={999}
                background={{ color: Theme.background.main }}
                class="i-loading-overlay"
              >
                <i-vstack
                  horizontalAlignment="center"
                  verticalAlignment="center"
                  position="absolute"
                  top="calc(50% - 0.75rem)"
                  left="calc(50% - 0.75rem)"
                >
                  <i-icon
                    class="i-loading-spinner_icon"
                    name="spinner"
                    width={24}
                    height={24}
                    fill={Theme.colors.primary.main}
                  />
                </i-vstack>
              </i-vstack>
              <i-vstack
                gap="0.5rem"
                padding={{ left: '0.5rem', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' }}
              >
                <i-upload
                  id="btnUpload"
                  caption='$upload_image'
                  width={'100%'}
                  minHeight={'6.25rem'}
                  border={{ width: '1px', style: 'solid', color: Theme.divider }}
                  font={{ size: '0.75rem', color: Theme.text.primary, weight: 600 }}
                  onChanged={this.onFileChanged}
                ></i-upload>
                <i-label
                  id="lblFailed"
                  caption="$upload_failed"
                  visible={false}
                  font={{ color: Theme.colors.error.main, size: '0.75rem' }}
                  class="text-center"
                ></i-label>
              </i-vstack>
            </i-panel>
          </i-tab>
          <i-tab
            caption="$embed"
            font={{ color: Theme.text.primary, size: '0.875rem' }}
            minHeight={'0px'}
          >
            <i-vstack
              gap={'0.5rem'}
              padding={{ left: '0.5rem', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' }}
            >
              <i-input
                id="inputUrl"
                placeholder="$enter_url"
                border={{ width: '1px', style: 'solid', color: Theme.divider }}
                font={{ size: '0.75rem', color: Theme.text.primary }}
                background={{ color: 'transparent' }}
                width={'100%'}
                height={'1.875rem'}
                onChanged={this.handleURLChanged}
                onKeyDown={this.handleURLEnter}
              ></i-input>
              <i-button
                id="btnEmbed"
                width={'100%'}
                border={{ width: '1px', style: 'solid', color: Theme.divider }}
                font={{ size: '0.75rem', color: Theme.text.primary, weight: 600 }}
                padding={{ left: '0.625rem', right: '0.625rem' }}
                minHeight={'1.875rem'}
                background={{ color: 'transparent' }}
                enabled={false}
                caption='$embed_image'
                onClick={() => this.updateBlock()}
              ></i-button>
            </i-vstack>
          </i-tab>
        </i-tabs>
      </i-panel>
    );
  }
}
