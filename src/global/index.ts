export type TextAlignmentType = "left" | "center" | "right" | "justify";

export type CustomFormattingToolbarState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;

  textAlignment: TextAlignmentType;

  textColor: string;
  backgroundColor: string;

  referencePos: any;
  show: boolean;
};

export type CustomHyperlinkToolbarState = {
  text: string;
  url: string;

  referencePos: any;
  show: boolean;
}

export type CustomSideMenuState = {
  referencePos: any;
  show: boolean;
  block: any;
}

export type CustomSlashMenuState = {
  referencePos: any;
  show: boolean;
  filteredItems: any[];
  itemCallback: any;
  keyboardHoveredItemIndex: number;
}

export * from './helper';

