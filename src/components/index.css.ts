import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const buttonHoverStyle = Styles.style({
  $nest: {
    '&:hover': {
      background: `${Theme.action.hoverBackground}!important`
    }
  }
})

export const customModalStyle = Styles.style({
  $nest: {
    '.modal-wrapper': {
      top: '0px !important',
      left: '0px !important',
      overflow: 'unset'
    }
  }
})
