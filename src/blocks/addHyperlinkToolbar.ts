import { Control, HStack, Styles } from "@ijstech/components";
import { createButton, createParent, setShown } from "./utils";
import { CustomHyperlinkToolbarState } from "../global/index";
import { buttonHoverStyle } from "./index.css";
import { ScomEditorLink } from "../components/index";
const Theme = Styles.Theme.ThemeVars;

const getToolbarButtons = (editor: any, hyperlinkToolbarState: CustomHyperlinkToolbarState, parent: Control) => {
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
            parent.visible = false;
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
        parent.visible = false;
      }
    }
  ]
}

export const addHyperlinkToolbar = async (editor: any, parent: Control) => {
  let element: HStack;
  let buttonList = [];

  editor.hyperlinkToolbar.onUpdate(async (hyperlinkToolbarState: CustomHyperlinkToolbarState) => {
    if (!element) {
      element = await createParent({
        id: 'pnlHyperlinkToolbar'
      });
      buttonList = getToolbarButtons(editor, hyperlinkToolbarState, element);
      for (let props of buttonList) {
        if (props.customControl) {
          const elm = props.customControl(element);
          element.appendChild(elm);
        } else {
          const btn = createButton(props, element);
          element.appendChild(btn);
        }
      }
      element.visible = false;
      parent.appendChild(element);
    }

    if (hyperlinkToolbarState.show) {
      setShown(parent, element);
    }
    element.style.top = `${hyperlinkToolbarState.referencePos.top - (element.offsetHeight - 10)}px`;
    element.style.left = hyperlinkToolbarState.referencePos.x - element.offsetWidth + "px";
  });
};
