import {
  Module,
  customModule,
  Container,
  Styles,
  Panel,
  Switch,
  MarkdownEditor,
} from '@ijstech/components';
import { ScomEditor } from '@scom/scom-editor';
const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Module1 extends Module {
  private postEditor: ScomEditor;
  private mdEditor: MarkdownEditor;
  private pnlPostComposer: Panel;
  private _value: string = '';

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this._value = "    ```javascript\n    <body>\n      <script>\n        async function init() {\n          let scbook = await application.createElement('@scom/scom-scbook', false, {\n          entrypoint: \"data\",\n        maxWidth: 1400,\n        showHeader: true,\n        showSearch: false\n          });\n        document.body.append(scbook);\n        };\n        init();\n      </script>\n    </body>\n    ```\n"
  }

  private onTypeChanged(target: Switch) {
    this.postEditor.visible = target.checked;
    this.mdEditor.visible = !target.checked;
    if (!this.postEditor.visible) {
      this.postEditor.onHide();
    }
    if (this.postEditor.visible) {
      this.postEditor.setValue(this._value);
    }
  }

  private renderMobilePostComposer() {
    const elm = (
      <i-panel cursor="default">
        <i-hstack
          justifyContent={'space-between'}
          alignItems={'center'}
          padding={{ left: '0.5rem', right: '0.5rem' }}
          border={{ bottom: { width: '.5px', style: 'solid', color: Theme.divider } }}
          height={50}
        >
          <i-button
            caption={'Cancel'}
            padding={{ left: 5, right: 5, top: 5, bottom: 5 }}
            font={{ size: Theme.typography.fontSize }}
            background={{ color: 'transparent' }}
          />
          <i-button
            id={'btnReply'}
            caption={'Post'}
            enabled={false}
            padding={{ left: '1rem', right: '1rem' }}
            height={36}
            background={{ color: Theme.colors.primary.main }}
            font={{
              size: Theme.typography.fontSize,
              color: Theme.colors.primary.contrastText,
              bold: true,
            }}
            border={{ radius: '30px' }}
          />
        </i-hstack>
        <i-hstack
          id="pnlReplyTo"
          visible={false}
          gap="0.5rem"
          verticalAlignment="center"
          padding={{ top: '0.25rem', bottom: '0.75rem', left: '3.25rem' }}
        >
          <i-label
            caption="Replying to"
            font={{ size: '1rem', color: Theme.text.secondary }}
          ></i-label>
          <i-label
            id="lbReplyTo"
            link={{ href: '' }}
            font={{ size: '1rem', color: Theme.colors.primary.main }}
          ></i-label>
        </i-hstack>
        <i-panel id={'pnlFocusedPost'} height={'200px'}></i-panel>
        <i-grid-layout
          id="gridReply"
          gap={{ column: '0.75rem' }}
          templateColumns={['2.75rem', 'minmax(auto, calc(100% - 3.5rem))']}
          templateRows={['auto']}
          templateAreas={[
            ['avatar', 'editor'],
            ['avatar', 'reply'],
          ]}
          padding={{ left: '0.75rem', top: '1rem' }}
        >
          <i-image
            id="imgReplier"
            grid={{ area: 'avatar' }}
            width={'2.75rem'}
            height={'2.75rem'}
            display="block"
            background={{ color: 'red' }}
            border={{ radius: '50%' }}
            overflow={'hidden'}
            margin={{ top: '0.75rem' }}
            objectFit="cover"
          ></i-image>
          <i-panel
            grid={{ area: 'editor' }}
            maxHeight={'45rem'}
            overflow={{ x: 'hidden', y: 'auto' }}
          >
            <i-panel>
              <i-markdown-editor
                id="mdEditor"
                width="100%"
                viewer={false}
                hideModeSwitch={true}
                mode="wysiwyg"
                toolbarItems={[]}
                font={{ size: '1.25rem', color: Theme.text.primary }}
                lineHeight={1.5}
                padding={{ top: 12, bottom: 12, left: 0, right: 0 }}
                background={{ color: 'transparent' }}
                height="auto"
                minHeight={0}
                overflow={'hidden'}
                overflowWrap="break-word"
                cursor="text"
                border={{ style: 'none' }}
                visible={true}
              ></i-markdown-editor>
            </i-panel>
            <i-panel>
              <i-scom-editor
                id="postEditor"
                width="100%"
                font={{ size: '1.25rem', color: Theme.text.primary }}
                cursor="text"
                visible={false}
              ></i-scom-editor>
            </i-panel>
            {/* <i-vstack id="pnlMedias" /> */}
          </i-panel>

          {/* comment */}
          <i-hstack
            id="pnlBorder"
            horizontalAlignment="space-between"
            grid={{ area: 'reply' }}
            padding={{ top: '0.625rem' }}
          >
            <i-hstack id="pnlIcons" gap="4px" verticalAlignment="center">
              <i-icon
                name="image"
                width={28}
                height={28}
                fill={Theme.colors.primary.main}
                border={{ radius: '50%' }}
                padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
                tooltip={{ content: 'Media', placement: 'bottom' }}
              ></i-icon>
              <i-icon
                name="images"
                width={28}
                height={28}
                fill={Theme.colors.primary.main}
                border={{ radius: '50%' }}
                padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
                tooltip={{ content: 'GIF', placement: 'bottom' }}
              ></i-icon>
              <i-panel>
                <i-icon
                  name="smile"
                  width={28}
                  height={28}
                  fill={Theme.colors.primary.main}
                  border={{ radius: '50%' }}
                  padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
                  tooltip={{ content: 'Emoji', placement: 'bottom' }}
                ></i-icon>
                <i-modal
                  id="mdEmoji"
                  maxWidth={'100%'}
                  minWidth={320}
                  popupPlacement="bottomRight"
                  showBackdrop={false}
                  border={{ radius: '1rem' }}
                  boxShadow="rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px"
                  padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  closeOnScrollChildFixed={true}
                >
                  <i-vstack position="relative" padding={{ left: '0.25rem', right: '0.25rem' }}>
                    <i-hstack
                      verticalAlignment="center"
                      border={{
                        radius: '9999px',
                        width: '1px',
                        style: 'solid',
                        color: Theme.divider,
                      }}
                      minHeight={40}
                      width={'100%'}
                      background={{ color: Theme.input.background }}
                      padding={{ left: '0.75rem', right: '0.75rem' }}
                      margin={{ top: '0.25rem', bottom: '0.25rem' }}
                      gap="4px"
                    >
                      <i-icon
                        width={'1rem'}
                        height={'1rem'}
                        name="search"
                        fill={Theme.text.secondary}
                      />
                      <i-input
                        id="inputEmoji"
                        placeholder="Search emojis"
                        width="100%"
                        height="100%"
                        border={{ style: 'none' }}
                        captionWidth={'0px'}
                        showClearButton={true}
                      ></i-input>
                    </i-hstack>
                    <i-grid-layout
                      id="gridEmojiCate"
                      verticalAlignment="center"
                      columnsPerRow={9}
                      margin={{ top: 4 }}
                      grid={{ verticalAlignment: 'center', horizontalAlignment: 'center' }}
                      border={{ bottom: { width: '1px', style: 'solid', color: Theme.divider } }}
                    ></i-grid-layout>
                    <i-vstack id="groupEmojis" maxHeight={400} overflow={{ y: 'auto' }} />
                    <i-vstack
                      id="pnlEmojiResult"
                      border={{ bottom: { width: '1px', style: 'solid', color: Theme.divider } }}
                      maxHeight={400}
                      overflow={{ y: 'auto' }}
                      minHeight={200}
                      gap="0.75rem"
                      visible={false}
                    />
                    <i-hstack
                      bottom="0px"
                      left="0px"
                      position="absolute"
                      width={'100%'}
                      verticalAlignment="center"
                      horizontalAlignment="space-between"
                      padding={{
                        top: '0.75rem',
                        left: '0.75rem',
                        right: '0.75rem',
                        bottom: '0.75rem',
                      }}
                      gap="0.75rem"
                      zIndex={20}
                      background={{ color: Theme.background.modal }}
                      border={{
                        radius: '0 0 1rem 1rem',
                        top: { width: '1px', style: 'solid', color: Theme.divider },
                      }}
                    >
                      <i-label
                        id="lbEmoji"
                        width={'1.25rem'}
                        height={'1.25rem'}
                        display="inline-block"
                      ></i-label>
                      <i-hstack
                        id="pnlColors"
                        verticalAlignment="center"
                        gap={'0.25rem'}
                        overflow={'hidden'}
                        cursor="pointer"
                        padding={{
                          top: '0.25rem',
                          left: '0.25rem',
                          right: '0.25rem',
                          bottom: '0.25rem',
                        }}
                      />
                    </i-hstack>
                  </i-vstack>
                </i-modal>
              </i-panel>
              <i-switch
                id="typeSwitch"
                height={28}
                display="inline-flex"
                grid={{ verticalAlignment: 'center' }}
                tooltip={{ content: 'Change editor', placement: 'bottom' }}
                uncheckedTrackColor={Theme.divider}
                checkedTrackColor={Theme.colors.primary.main}
                onChanged={this.onTypeChanged.bind(this)}
              ></i-switch>
            </i-hstack>
          </i-hstack>
        </i-grid-layout>

        <i-modal
          id="mdGif"
          border={{ radius: '1rem' }}
          maxWidth={'600px'}
          maxHeight={'90vh'}
          overflow={{ y: 'auto' }}
          padding={{ top: 0, right: 0, left: 0, bottom: 0 }}
          mediaQueries={[
            {
              maxWidth: '767px',
              properties: {
                showBackdrop: true,
                popupPlacement: 'top',
                position: 'fixed',
                zIndex: 999,
                maxWidth: '100%',
                height: '100%',
                width: '100%',
                border: { radius: 0 },
              },
            },
          ]}
        >
          <i-vstack>
            <i-hstack
              verticalAlignment="center"
              height={53}
              margin={{ top: 8, bottom: 8 }}
              padding={{ right: '1rem', left: '1rem' }}
              position="sticky"
              zIndex={2}
              top={'0px'}
              background={{ color: Theme.background.modal }}
            >
              <i-panel stack={{ basis: '56px' }}>
                <i-icon
                  id="iconGif"
                  name="times"
                  cursor="pointer"
                  width={20}
                  height={20}
                  fill={Theme.colors.secondary.main}
                ></i-icon>
              </i-panel>
              <i-hstack
                verticalAlignment="center"
                padding={{ left: '0.75rem', right: '0.75rem' }}
                border={{ radius: '9999px', width: '1px', style: 'solid', color: Theme.divider }}
                minHeight={40}
                width={'100%'}
                background={{ color: Theme.input.background }}
                gap="4px"
              >
                <i-icon width={16} height={16} name="search" fill={Theme.text.secondary} />
                <i-input
                  id="inputGif"
                  placeholder="Search for Gifs"
                  width="100%"
                  height="100%"
                  captionWidth={'0px'}
                  border={{ style: 'none' }}
                  showClearButton={true}
                ></i-input>
              </i-hstack>
            </i-hstack>
            <i-card-layout
              id="gridGifCate"
              cardMinWidth={'18rem'}
              cardHeight={'9.375rem'}
            ></i-card-layout>
            <i-vstack id="pnlGif" visible={false}>
              <i-hstack
                horizontalAlignment="space-between"
                gap="0.5rem"
                padding={{ left: '0.75rem', right: '0.75rem', top: '0.75rem', bottom: '0.75rem' }}
              >
                <i-label
                  caption="Auto-play GIFs"
                  font={{ color: Theme.text.secondary, size: '0.9rem' }}
                ></i-label>
                <i-switch
                  id="autoPlaySwitch"
                  checked={true}
                  uncheckedTrackColor={Theme.divider}
                  checkedTrackColor={Theme.colors.primary.main}
                ></i-switch>
              </i-hstack>
              <i-panel id="topElm" width={'100%'}></i-panel>
              <i-card-layout
                id="gridGif"
                autoRowSize="auto"
                autoColumnSize="auto"
                cardHeight={'auto'}
                columnsPerRow={4}
              ></i-card-layout>
              <i-panel id="bottomElm" width={'100%'} minHeight={20}>
                <i-vstack
                  id="gifLoading"
                  padding={{ top: '0.5rem', bottom: '0.5rem' }}
                  visible={false}
                  height="100%"
                  width="100%"
                  class="i-loading-overlay"
                  background={{ color: Theme.background.modal }}
                >
                  <i-vstack
                    class="i-loading-spinner"
                    horizontalAlignment="center"
                    verticalAlignment="center"
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
              </i-panel>
            </i-vstack>
          </i-vstack>
        </i-modal>

        <i-modal
          id="mdWidgets"
          border={{ radius: '1rem' }}
          maxWidth={'600px'}
          maxHeight={'90vh'}
          overflow={{ y: 'auto' }}
          padding={{ top: 0, right: 0, left: 0, bottom: 0 }}
          mediaQueries={[
            {
              maxWidth: '767px',
              properties: {
                showBackdrop: true,
                popupPlacement: 'top',
                position: 'fixed',
                zIndex: 999,
                maxWidth: '100%',
                height: '100%',
                width: '100%',
                border: { radius: 0 },
              },
            },
          ]}
        >
          <i-vstack>
            <i-hstack
              verticalAlignment="center"
              horizontalAlignment="space-between"
              padding={{ right: '1rem', left: '1rem', top: '1rem', bottom: '1rem' }}
            >
              <i-label
                caption="SCOM Widgets"
                font={{ color: Theme.colors.primary.main, size: '1rem', bold: true }}
              ></i-label>
              <i-icon
                name="times"
                cursor="pointer"
                width={20}
                height={20}
                fill={Theme.colors.secondary.main}
              ></i-icon>
            </i-hstack>
          </i-vstack>
        </i-modal>
      </i-panel>
    );

    this.pnlPostComposer.append(elm);
  }

  init() {
    super.init();
    this.renderMobilePostComposer();
    if (this.options.editorWidgets) {
      this.postEditor.widgets = this.options.editorWidgets;
    }
  }

  render() {
    return <i-panel id={'pnlPostComposer'} maxHeight={'100dvh'} overflow={'hidden'}></i-panel>;
  }
}
