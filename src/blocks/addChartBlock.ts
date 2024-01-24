import { Panel } from "@ijstech/components";
import { Block, BlockNoteEditor } from "../global/index";
import { ChartTypes, ScomEditorChart, getWidgetEmbedUrl } from "../components/index";
import { execCustomBLock, parseUrl } from "./utils";

function getData(href: string) {
  const widgetData = parseUrl(href);
  if (widgetData) {
    const { module, properties } = widgetData;
    if (module.localPath !== 'scom-swap') return {...properties};
  }
  return false;
}

export const addChartBlock = (blocknote: any) => {
  const ChartBlock = blocknote.createBlockSpec({
    type: "chart",
    propSchema: {
      ...blocknote.defaultProps,
      name: {default: 'scom-line-chart', values: [...ChartTypes]},
      apiEndpoint: {default: ''},
      dataSource: { default: 'Dune', values: ['Dune', 'Custom']},
      queryId: { default: ''},
      title: {default: ''},
      options: { default: undefined },
      mode: {default: 'Live', values: ['Live', 'Snapshot']},
      width: {default: '100%'},
      height: {default: 'auto'}
    },
    content: "none"
  },
  {
    render: (block: Block) => {
      const wrapper = new Panel();
      const data = JSON.parse(JSON.stringify(block.props));
      const chart = new ScomEditorChart(wrapper, { data });
      wrapper.appendChild(chart);
      return {
        dom: wrapper
      };
    },
    parseFn: () => {
      return [
        {
          tag: "div[data-content-type=chart]",
          contentElement: "[data-editable]"
        },
        {
          tag: "a",
          getAttrs: (element: string|HTMLElement) => {
            if (typeof element === "string") {
              return false;
            }
            const href = element.getAttribute('href');
            if (href) return getData(href);
            return false;
          },
          priority: 404,
          node: 'chart'
        },
        {
          tag: "p",
          getAttrs: (element: string|HTMLElement) => {
            if (typeof element === "string") {
              return false;
            }
            const child = element.firstChild as HTMLElement;
            if (!child) {
              return false;
            }
            if (child.nodeName === 'A' && child.getAttribute('href')) {
              const href = child.getAttribute('href');
              return getData(href);
            }
            return false;
          },
          priority: 405,
          node: 'chart'
        },
      ]
    },
    toExternalHTML: (block: any, editor: any) => {
      const link = document.createElement("a");
      const url = getWidgetEmbedUrl(
        {
          type: 'chart',
          props: {...(block.props || {})}
        }
      );
      link.setAttribute("href", url);
      link.textContent = 'chart';
      const wrapper = document.createElement("p");
      wrapper.appendChild(link);
      return {
        dom: wrapper
      }
    }
  });
  const ChartSlashItem = {
    name: "Chart",
    execute: (editor: BlockNoteEditor) => {
      const block: any =  {
        type: "chart",
        props: {
          name: 'scom-area-chart',
          "dataSource": "Dune",
          "queryId": "2030745",
          title: 'ETH Staked - Cumulative',
          options: {
            xColumn: {
              key: 'date',
              type: 'time'
            },
            yColumns: [
              'total_eth',
            ],
            stacking: true,
            groupBy: 'depositor_entity_category',
            seriesOptions: [
              {
                key: 'CEX',
                color: '#d52828'
              },
              {
                key: 'Liquid Staking',
                color: '#d2da25'
              },
              {
                key: 'Others',
                color: '#000000'
              },
              {
                key: 'Staking Pools',
                color: '#49a34f'
              },
              {
                key: 'Unidentified',
                color: '#bcb8b8'
              }
            ],
            xAxis: {
              title: 'Date',
              tickFormat: 'MMM YYYY'
            },
            yAxis: {
              title: 'ETH deposited',
              labelFormat: '0,000.00ma',
              position: 'left'
            }
          }
        }
      }
      execCustomBLock(editor, block);
    },
    aliases: ["chart", "widget"]
  }

  return {
    ChartBlock,
    ChartSlashItem
  }
};
