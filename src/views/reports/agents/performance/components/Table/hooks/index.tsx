import { useReportStore } from "@/store/modules/reports";
import { storeToRefs } from "pinia";

import type { Column } from "element-plus";
import { onUnmounted } from "vue";

export function useHooks() {
  const reportStore = useReportStore();
  const { agentsTotal } = storeToRefs(reportStore);

  const currentDateCurrentGroup =
    agentsTotal.value.detailsReport.currentDateCurrentGroup;

  const compareDateCurrentGroup =
    agentsTotal.value.detailsReport.compareDateCurrentGroup;

  let data = [];
  let columns: Column<any>[] = [
    {
      key: "column-agent",
      dataKey: "column-agent",
      title: "Agent",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    },
    {
      key: "column-1",
      dataKey: "column-1",
      title: "First response time",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    },
    {
      key: "column-1",
      dataKey: "column-1",
      title: "First response chats count",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    },
    {
      key: "column-2",
      dataKey: "column-2",
      title: "Chatting time",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    },
    {
      key: "column-3",
      dataKey: "column-3",
      title: "Accepting chats time",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    },
    {
      key: "column-4",
      dataKey: "column-4",
      title: "Not accepting chats time",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    },
    {
      key: "column-5",
      dataKey: "column-5",
      title: "Logged in time",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    },
    {
      key: "column-6",
      dataKey: "column-6",
      title: "Chats count",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    },
    {
      key: "column-7",
      dataKey: "column-7",
      title: "Chats rated bad",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    },
    {
      key: "column-8",
      dataKey: "column-8",
      title: "Chats rated good",
      width: 200,
      cellRenderer: ({ cellData: description }) => {
        return <>{description}</>;
      }
    }
  ];
  const addColumnsData = (current, compare) => {
    if (current?.length) {
      current?.map((item, rowIndex) => {
        let rowCol = {
          id: "row-0",
          parentId: null,
          ["column-agent"]: item.email
        };

        const compareItem = compare.find(el => el.id === item.id);

        const differenceCount = {
          first_response_time: 0,
          first_response_chats_count: 0,
          chatting_time: 0,
          accepting_chats_time: 0,
          not_accepting_chats_time: 0,
          logged_in_time: 0,
          chats_count: 0,
          chats_rated_bad: 0,
          chats_rated_good: 0
        };

        Object.keys(differenceCount).map((key, index) => {
          if (compareItem) {
            differenceCount[key] = item.stats[key] - compareItem.stats[key];
          }

          rowCol = {
            ...rowCol,
            id: `row-${rowIndex}`,
            [`column-${index}`]: compare?.length ? (
              <div class="total-value">
                <div class="current-value">
                  <span class="count">{item.stats[key]}</span>
                  <span
                    class={
                      differenceCount[key] > 0
                        ? "difference-count text-green-500"
                        : "difference-count text-red-500"
                    }
                  >
                    {differenceCount[key] !== 0
                      ? `(${differenceCount[key]})`
                      : ""}
                  </span>
                </div>
              </div>
            ) : (
              <div class="compare-value">{item.stats[key]}</div>
            )
          };
        });

        data.push(rowCol);
      });
    }
  };

  addColumnsData(currentDateCurrentGroup, compareDateCurrentGroup);

  columns[0].fixed = true;

  onUnmounted(() => {
    columns = [];
    data = [];
  });

  return {
    columns,
    data
  };
}
