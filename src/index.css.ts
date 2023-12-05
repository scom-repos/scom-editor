import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const customEditorStyle = Styles.style({
  $nest: {
    '.tableWrapper': {
      maxWidth: '100%',
      overflowX: 'auto',
      padding: '1rem 0'
    },
    'table': {
      borderCollapse: "collapse",
      overflow: 'hidden',
      tableLayout: 'fixed',
      width: '100%',
      margin: 0
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
    },
    '.selectedCell:after': {
      zIndex: 2,
      position: 'absolute',
      content: "''",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      background: Theme.action.selectedBackground,
      pointerEvents: 'none'
    },
    '.column-resize-handle': {
      position: 'absolute',
      right: -1,
      top: 0,
      bottom: -1,
      width: 2,
      backgroundColor: Theme.colors.primary.light,
      cursor: 'col-resize'
    },
    '.resize-cursor': {
      cursor: 'col-resize'
    }
  }
})