import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const buttonHoverStyle = Styles.style({
  $nest: {
    '&:hover': {
      background: `${Theme.action.hoverBackground}!important`
    }
  }
})