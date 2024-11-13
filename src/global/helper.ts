export const getFileContent = async (url: string) => {
  let result = '';
  if (url) {
    const response = await fetch(url);
    try {
      if (response.ok) {
        result = await response.text();
      }
    } catch (err) { }
  }
  return result;
}

export function getFileType(ext: string) {
  let result = '';
  const video = ['mp4', 'webm', 'mov', 'm3u8'];
  const image = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
  if (video.includes(ext)) {
    result = 'video';
  } else if (image.includes(ext)) {
    result = 'image';
  }
  return result;
}

export async function getBlockFromExtension(url: string) {
  let block = null;
  const ext = url.split('.').pop().toLowerCase();
  const fileType = getFileType(ext);
  switch (fileType) {
    case 'image':
      block = {
        type: "imageWidget",
        props: { url }
      }
      break;
    case 'video':
      block = {
        type: "video",
        props: { url }
      }
      break;
    default:
      block = {
        type: 'paragraph',
        content: [
          {
            type: "link",
            content: [{
              type: "text",
              text: url,
              styles: {}
            }],
            href: url
          }
        ]
      }
      break;
  }
  return block
}

interface IConfig {
  name: string;
  localPath: string;
}

const state = {
  configs: {} as { [key: string]: IConfig },
  chartTypes: [] as string[],
  slashMenus: {}
}

export const addConfig = (key: string, value: IConfig) => {
  state.configs[key] = value;
}

export const getConfig = (key: string) => {
  return state.configs[key];
}

export const getConfigs = () => {
  return state.configs;
}

export const setChartTypes = (chartTypes: string[]) => {
  state.chartTypes = chartTypes || [];
}

export const getChartTypes = () => {
  return state.chartTypes || [];
}
