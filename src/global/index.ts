import { application, Control } from '@ijstech/components';

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

export const getWidgetData = (html: string) => {
  html = `\`\`\`${html}\`\`\``;
  const blocks = html.split(/```/).filter(b => b.trim() !== "");
  let result = {
    module: '',
    data: '',
    value: '',
    elements: []
  }

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const match = checkMatches(block);
    if (!match) continue;
    const { module, data, value } = match;
    if (match.module === '@scom/page-block') {
      result = {
        ...match,
        elements: []
      }
    } else {
      const isGroup = module === '@scom/page-group';
      const moduleName = isGroup ? '@scom/page-block' : module;

      const lasElement = result.elements?.[result.elements.length - 1];
      if (lasElement?.hasItems) {
        lasElement.elements = lasElement.elements || [];
        lasElement.elements.push({
          module: moduleName,
          data,
          content: value,
          hasItems: isGroup
        });
      } else if (result.module) {
        result.elements = result.elements || [];
        result.elements.push({
          module: moduleName,
          data,
          content: value,
          hasItems: isGroup
        });
      } else {
        result = {
          ...match,
          elements: [],
          module: moduleName
        }
      }
    }
  }

  return result;
}

const checkMatches = (content: string) => {
  const codeRegex = /([^{}]+)\{((?:[^{}]+|{(?:[^{}]+|{[^{}]*})*})*)\}(?:([\s\S]*))?/gm;
  const match = codeRegex.exec(content)
  let module = '';
  let data = '';
  let value = '';

  if (!match) return null;

  module = match[1];
  value = match[3] || '';
  data = `${match[2] || ''}`
    .replace(/\n/gm, "")
    .replace(/&amp;/g, '&')
    .replace(/\{\s+/gm, "{")
    .replace(/\s+\}/gm, "}")
    .replace(/^\s*/gm, "")
    .replace(/\s*$/gm, "")
    .replace(/\,\s*/gm, ", ");

  if (data && data.includes(':')) {
    data = `{${data}}`;
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.error('parse error: ', e, data);
    }
  }

  return {
    module,
    data,
    value
  };
}

export const getEmbedElement = async (postData: any, parent: Control, callback?: any) => {
  const { module, data } = postData;
  const elm = await application.createElement(module, true) as any;
  if (!elm) throw new Error(`${module} not found`);

  elm.parent = parent;
  if (elm.ready) await elm.ready();

  const builderTarget = elm.getConfigurators ? elm.getConfigurators().find((conf: any) => conf.target === 'Builders') : null;
  elm.maxWidth = '100%';
  elm.maxHeight = '100%';

  if (module === "@scom/page-blog") {
    elm.stack = {grow: 1, shrink: 1, basis: '0%'};
  }

  if (module === '@scom/page-button') {
    const value = data?.properties?.value;
    const contentRegex = /\[(.*?)\]\((.*?)\)/g;
    let match = contentRegex.exec(value);
    if (match) {
      data.properties = {
        linkButtons: [
          {
            caption: match[1] || '',
            url: match[2] || ''
          }
        ]
      }
    }
  }

  if (builderTarget?.setData && data?.properties) {
    await builderTarget.setData(data.properties);
  }

  const colors = getColorValues(data?.tag || {});
  let tag = {};
  tag['dark'] = colors;
  tag['light'] = colors;
  tag = { ...tag, ...(data?.tag || {}) };

  if (builderTarget?.setTag && Object.keys(tag).length) {
    await builderTarget.setTag(tag);
  }

  if (callback) callback(elm);

  return elm;
}

const getColorValues = (tag: any) => {
  if (!tag || typeof tag !== 'object') return null;
  let values = {};
  for (let prop in tag) {
    if (/color/gi.test(prop)) {
      values[prop] = tag[prop];
    }
  }
  return Object.keys(values).length ? values : null;
};
