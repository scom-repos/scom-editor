export type Styles = {
  bold?: true;
  italic?: true;
  underline?: true;
  strike?: true;
  code?: true;
  textColor?: string;
  backgroundColor?: string;
};

export type ToggledStyle = {
  [K in keyof Styles]-?: Required<Styles>[K] extends true ? K : never;
}[keyof Styles];

export type ColorStyle = {
  [K in keyof Styles]-?: Required<Styles>[K] extends string ? K : never;
}[keyof Styles];

export type StyledText = {
  type: "text";
  text: string;
  styles: Styles;
};

export type Link = {
  type: "link";
  href: string;
  content: StyledText[];
};

export type PartialLink = Omit<Link, "content"> & {
  content: string | Link["content"];
};

export type InlineContent = StyledText | Link;
export type PartialInlineContent = StyledText | PartialLink;

export type PartialBlock = {
  id?: string;
  type?: string;
  props?: Partial<Record<string, string>>;
  content?: string | InlineContent[];
  children?: any[];
};

export type Block = {
  id: string;
  type: boolean | number | string;
  props: Record<string, string>;
  content: InlineContent[];
  children: Block[];
};

export type BlockIdentifier = string | Block;

export type SlashMenuItem = {
  name: string;
  execute: (editor: any) => void;
  aliases?: string[];
  group: string;
  icon: any;
  hint?: string;
  shortcut?: string;
};

export type BlockNoteEditor = any;

export type BlockNoteEditorOptions = Partial<{
  editable: boolean;
  initialContent: PartialBlock[];
  editorDOMAttributes: Record<string, string>;
  onEditorReady: (editor: BlockNoteEditor) => void;
  onEditorContentChange: (editor: BlockNoteEditor) => void;
  onTextCursorPositionChange: (editor: BlockNoteEditor) => void;
  slashMenuItems: SlashMenuItem[];
  defaultStyles: boolean;
  uploadFile: (file: File) => Promise<string>
}>;
