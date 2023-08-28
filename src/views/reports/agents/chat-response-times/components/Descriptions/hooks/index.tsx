import { useReportStore } from "@/store/modules/reports";
import { storeToRefs } from "pinia";
import moment from "moment-timezone";

export function useHooks() {
  const reportStore = useReportStore();

  const { agentsResponseTime } = storeToRefs(reportStore);

  const getTotalSumma = data => {
    return data.reduce((a, b) => a + b, 0);
  };
  const getTotalTime = data => {
    const seconds = data.reduce((a, b) => a + b, 0);
    return moment
      .utc(seconds * 1000)
      .format(seconds < 3600 ? "mm[m] ss[s]" : "HH[h] mm[m] ss[s]");
  };
  return {
    agentsResponseTime,
    getTotalSumma,
    getTotalTime
  };
}
