import { Control, IconName } from "@ijstech/components";

export type IToolbarDropdownItem = {
  text: string;
  icon?: {name: IconName};
  onClick?: (target: Control, event: MouseEvent) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
};

export type IBlockTypeItem = {
  name: string;
  type: string;
  props?: Record<string, boolean | number | string>;
  icon?: {name: IconName};
  isSelected: (block: any) => boolean;
};

export const defaultBlockTypeItems: IBlockTypeItem[] = [
  {
    name: "Paragraph",
    type: "paragraph",
    icon: {name: 'paragraph'},
    isSelected: (block) => block.type === "paragraph",
  },
  {
    name: "Heading 1",
    type: "heading",
    props: { level: 1 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 1,
  },
  {
    name: "Heading 2",
    type: "heading",
    props: { level: 2 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 2,
  },
  {
    name: "Heading 3",
    type: "heading",
    props: { level: 3 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 3,
  },
  {
    name: "Bullet List",
    type: "bulletListItem",
    icon: {name: 'list-ul'},
    isSelected: (block) => block.type === "bulletListItem",
  },
  {
    name: "Numbered List",
    type: "numberedListItem",
    icon: {name: 'list-ol'},
    isSelected: (block) => block.type === "numberedListItem",
  },
];
