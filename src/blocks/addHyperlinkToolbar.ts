import { Control, Modal, Panel, Styles } from "@ijstech/components";
import { CustomHyperlinkToolbarState } from "../global/index";
import { ScomEditorLink, buttonHoverStyle, createButton, createModal, getModalContainer } from "../components/index";
const Theme = Styles.Theme.ThemeVars;

const getToolbarButtons = (editor: any, hyperlinkToolbarState: CustomHyperlinkToolbarState, modal: Control) => {
  const iconProps = {width: '0.75rem', height: '0.75rem', fill: Theme.text.primary};
  const toolTipProps = {placement: 'bottom'};
  return [
    {
      customControl: () => {
        let link = new ScomEditorLink(undefined, {
          display: 'inline-flex',
          grid: {verticalAlignment: 'center'},
          height: '100%',
          minHeight: '1.875rem',
          tooltip: { content: 'Edit', placement: 'bottom' },
          text: hyperlinkToolbarState.text,
          url: hyperlinkToolbarState.url,
          caption: 'Edit Link',
          setLink: (text: string, url: string) => {
            editor.hyperlinkToolbar.editHyperlink(url, text || editor.getSelectedText());
            modal.visible = false;
          },
          class: buttonHoverStyle
        })
        return link;
      }
    },
    {
      icon: {...iconProps, name: 'external-link-alt'},
      tooltip: {...toolTipProps, content: 'Open in new tab'},
      onClick: () => {
        window.open(`${editor.getSelectedLinkUrl()}`);
      }
    },
    {
      icon: {...iconProps, name: 'unlink'},
      tooltip: {...toolTipProps, content: 'Remove link'},
      onClick: () => {
        editor.hyperlinkToolbar.deleteHyperlink();
        modal.visible = false;
      }
    }
  ]
}

export const addHyperlinkToolbar = async (editor: any) => {
  let modal: Modal;
  let element: Panel;
  let buttonList = [];

  editor.hyperlinkToolbar.onUpdate(async (hyperlinkToolbarState: CustomHyperlinkToolbarState) => {
    const selectedBlocks = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
    const block = selectedBlocks[0];
    const blockID = block?.id;
    if (!modal) {
      modal = await createModal({
        id: 'pnlHyperlinkToolbar',
        popupPlacement: 'top',
        minWidth: 0,
        zIndex: 3000
      })
      modal.linkTo = editor.domElement;
      modal.position = "fixed";
      getModalContainer().appendChild(modal);
    }

    if (!element) {
      element = await Panel.create({ minWidth: 'max-content' });
      buttonList = getToolbarButtons(editor, hyperlinkToolbarState, modal);
      for (let props of buttonList) {
        if (props.customControl) {
          const elm = props.customControl(element);
          element.appendChild(elm);
        } else {
          const btn = createButton(props, element);
          element.appendChild(btn);
        }
      }
      modal.item = element;
    }

    if (hyperlinkToolbarState.show) {
      const blockEl = editor.domElement.querySelector(`[data-id="${blockID}"]`);
      if (blockEl) modal.linkTo = blockEl;
      modal.visible = true;
    }
  });
};
