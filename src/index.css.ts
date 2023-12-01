import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const customEditorStyle = Styles.style({
  $nest: {
    'table': {
      borderCollapse: "collapse",
      overflow: 'hidden',
      tableLayout: 'fixed',
      width: '100%'
    },
    'td, th': {
      border: `1px solid ${Theme.divider}`,
      boxSizing: 'border-box',
      minWidth: '1rem',
      padding: '0.25rem 0.5rem',
      verticalAlign: 'top',
      position: 'relative'
    },
    'th': {
      fontWeight: 600,
      textAlign: 'left',
      background: Theme.background.default
    }
  }
})