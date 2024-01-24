import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const buttonHoverStyle = Styles.style({
  $nest: {
    '&:hover': {
      background: `${Theme.action.hoverBackground}!important`
    }
  }
})

export const settingStyle = Styles.style({
  $nest: {
    '#pnlForm > * > *:first-child': {
      maxHeight: 'calc(100vh - 114px)',
      overflowY: 'auto',
      justifyContent: 'start',
      $nest: {
        '&::-webkit-scrollbar': {
          width: '7px',
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: '10px',
          border: '1px solid transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: Theme.colors.primary.main,
          borderRadius: '10px',
          outline: '1px solid transparent'
        },
      }
    }
  }
})


export const customModalStyle = Styles.style({
  '-webkit-transform': 'translate3d(0, 0, 0)',
  transform: 'translate3d(0, 0, 0)',
  $nest: {
    '.modal, .modal-wrapper': {
      '-webkit-transform': 'translate3d(0, 0, 0)',
      transform: 'translate3d(0, 0, 0)',
    }
  }
})