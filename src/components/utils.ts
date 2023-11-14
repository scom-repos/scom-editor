import { Control, IconName } from "@ijstech/components";
import { formatKeyboardShortcut } from "../global/index";

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

export function getExtraFields () {
  const extraFields = {
    Heading: {
      group: "Headings",
      icon: { name: 'heading' },
      hint: "Used for a top-level heading",
      shortcut: formatKeyboardShortcut("Mod-Alt-1"),
    },
    "Heading 2": {
      group: "Headings",
      icon: { name: 'heading' },
      hint: "Used for key sections",
      shortcut: formatKeyboardShortcut("Mod-Alt-2"),
    },
    "Heading 3": {
      group: "Headings",
      icon: { name: 'heading' },
      hint: "Used for subsections and group headings",
      shortcut: formatKeyboardShortcut("Mod-Alt-3"),
    },
    "Numbered List": {
      group: "Basic blocks",
      icon: { name: 'list-ol' },
      hint: "Used to display a numbered list",
      shortcut: formatKeyboardShortcut("Mod-Alt-7"),
    },
    "Bullet List": {
      group: "Basic blocks",
      icon: { name: 'list-ul' },
      hint: "Used to display an unordered list",
      shortcut: formatKeyboardShortcut("Mod-Alt-9"),
    },
    Paragraph: {
      group: "Basic blocks",
      icon: { name: 'paragraph' },
      hint: "Used for the body of your document",
      shortcut: formatKeyboardShortcut("Mod-Alt-0"),
    },
    Image: {
      group: "Media",
      icon: { name: 'image' },
      hint: "Insert an image",
    }
  };
  return extraFields;
}

