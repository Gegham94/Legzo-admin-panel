import { TrafficFilterParams, TrafficFilter } from "@/api/traffic/interfaces";
import { computed, ref } from "vue";

export function useWebCrawlersHooks() {
  const params = ref<TrafficFilterParams>(null);
  const filter = ref<TrafficFilter>(null);
  const radioValue = ref("show_web_crawlers");
  const selectShowOnlyWebCrawlersValue = ref(true);
  const selectExcludeWebCrawlersValue = ref(false);

  const isInputsEmpty = computed(() => {
    switch (radioValue.value) {
      case "show_web_crawlers":
        selectShowOnlyWebCrawlersValue.value = true;
        selectExcludeWebCrawlersValue.value = false;
        params.value = {
          isTrue: [selectShowOnlyWebCrawlersValue.value],
          key: "Show only web crawlers"
        };
        break;
      case "exclude_web_crawlers":
        selectShowOnlyWebCrawlersValue.value = false;
        selectExcludeWebCrawlersValue.value = true;
        params.value = {
          isFalse: [selectExcludeWebCrawlersValue.value],
          key: "Exclude web crawlers"
        };
        break;
    }
    filter.value = {
      id: "web_crawlers",
      label: "Web crawlers",
      icon: "crawlers",
      used: true,
      isOpen: true,
      params: params.value
    };
    return (
      selectShowOnlyWebCrawlersValue.value &&
      selectExcludeWebCrawlersValue.value
    );
  });

  return {
    isInputsEmpty,
    radioValue,
    selectShowOnlyWebCrawlersValue,
    selectExcludeWebCrawlersValue,
    filter
  };
}
