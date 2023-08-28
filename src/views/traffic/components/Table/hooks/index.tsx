import { RequestResult } from "@/api/interfaces";
import { Traffic } from "@/api/traffic/interfaces";
import { http } from "@/utils/http";
import { message } from "@/utils/message";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

export function useTableHooks() {
  const tableData = ref([]);
  const tableHeight = ref(400);
  const tableColWidth = ref(250);
  const isDropdownOpen = ref(false);
  const selectAll = ref(false);
  const tableHeaderTitles = ref([
    {
      label: "Name",
      isSelected: true,
      value: "name"
    },
    {
      label: "Email",
      isSelected: true,
      value: "email"
    },
    {
      label: "Activity",
      isSelected: true,
      value: "activity"
    },
    {
      label: "Country",
      isSelected: true,
      value: "country_code"
    },
    {
      label: "City",
      isSelected: true,
      value: "city"
    },
    {
      label: "Groups",
      isSelected: true,
      value: "group_name"
    },
    {
      label: "Last page",
      isSelected: true,
      value: "last_page_title"
    },
    {
      label: "No. of chats",
      isSelected: true,
      value: "chats_count"
    },
    {
      label: "Customer ID",
      isSelected: true,
      value: "customer_id"
    },
    {
      label: "Browser",
      isSelected: false,
      value: "prefs_browser"
    },
    {
      label: "Operating System",
      isSelected: false,
      value: "prefs_os"
    },
    {
      label: "IP",
      isSelected: false,
      value: "ip"
    }
  ]);
  const totalCount = ref(0);
  const pagination = ref({
    page: 1,
    perPage: 20
  });
  const apiParams = {
    ...pagination.value
  };

  const filteredTableHeaderTitles = computed(() => {
    return tableHeaderTitles.value.filter(option => option.isSelected);
  });

  watch(tableHeaderTitles.value, val => {
    const all = val.some(item => item.isSelected === false);
    selectAll.value = !all;
    handleTableColWidth();
  });

  const selectAllCheckbox = (state: boolean) => {
    tableHeaderTitles.value.forEach(option => {
      if (option.value !== "name") {
        option.isSelected = state;
      }
    });
  };

  const fetchTableData = async (filterParams?) => {
    if (filterParams) {
      if (filterParams.value.params.is) {
        apiParams["filters[is]"] = filterParams.value.params.is.join(",");
      }
      if (filterParams.value.params.isNot) {
        apiParams["filters[is-not]"] =
          filterParams.value.params.isNot.join(",");
      }
      if (filterParams.value.params.isExactly) {
        apiParams["filters[is-exactly]"] =
          filterParams.value.params.isExactly.join(",");
      }
      if (filterParams.value.params.contains) {
        apiParams["filters[contains]"] =
          filterParams.value.params.contains.join(",");
      }
      if (filterParams.value.params.doesNotContains) {
        apiParams["filters[does-not-contains]"] =
          filterParams.value.params.doesNotContains.join(",");
      }
      if (filterParams.value.params.hasAnyValue) {
        apiParams["filters[has-any-value]"] =
          filterParams.value.params.hasAnyValue.join(",");
      }
      if (filterParams.value.params.ip) {
        apiParams["filters[ip]"] = filterParams.value.params.ip.join(",");
      }
      if (filterParams.value.params.isGreaterThan) {
        apiParams["filters[is-greater-than]"] =
          filterParams.value.params.isGreaterThan.join(",");
      }
      if (filterParams.value.params.isGreaterOrEqual) {
        apiParams["filters[is-greater-or-equal]"] =
          filterParams.value.params.isGreaterOrEqual.join(",");
      }
      if (filterParams.value.params.isLessThan) {
        apiParams["filters[is-less-than]"] =
          filterParams.value.params.isLessThan.join(",");
      }
      if (filterParams.value.params.isLessOrEqual) {
        apiParams["filters[is-less-or-equal]"] =
          filterParams.value.params.isLessOrEqual.join(",");
      }
      if (filterParams.value.params.isBetween) {
        apiParams["filters[is-between]"] =
          filterParams.value.params.isBetween.join(",");
      }
      if (filterParams.value.params.isTrue) {
        apiParams["filters[is-true]"] =
          filterParams.value.params.isTrue.join(",");
      }
      if (filterParams.value.params.isFalse) {
        apiParams["filters[is-false]"] =
          filterParams.value.params.isFalse.join(",");
      }
      if (filterParams.value.params.showWebCrawlers) {
        apiParams["filters[show-web-crawlers]"] =
          filterParams.value.params.showWebCrawlers.join(",");
      }
      if (filterParams.value.params.excludeWebCrawlers) {
        apiParams["filters[exclude-web-crawlers]"] =
          filterParams.value.params.excludeWebCrawlers.join(",");
      }
    }

    try {
      const { data, total } = await http.get<void, RequestResult<Traffic[]>>(
        "/managers/traffic",
        {
          params: apiParams
        }
      );
      totalCount.value = total;
      return data;
    } catch (error) {
      message(error, { type: "error" });
    }
  };

  const getTableData = async () => {
    fetchTableData()
      .then(data => {
        tableData.value = data.map(item => ({
          name: item.login.trim() || "-",
          email: item.email || "-",
          activity: item.activity || "-",
          country_code: item.country_code || "-",
          group_name: item.group_name || "-",
          ip: item.ip || "-",
          chats_count: item.chats_count || 0,
          last_page_title: item.last_page.title || "-",
          last_page_url: item.last_page.url || "-",
          login: item.login || "-",
          customer_id: item.customer_id || "-",
          prefs_browser: item.prefs.browser || "-",
          prefs_os: item.prefs.os || "-",
          city: item.prefs.geolocation.city || "-"
        }));
        return data;
      })
      .catch();
  };

  const handleTableHeightResize = () => {
    tableHeight.value = Math.round(window.innerHeight * 0.6);
  };

  const handleTableColWidth = () => {
    if (filteredTableHeaderTitles.value.length < 8) {
      tableColWidth.value = null;
    }
    if (filteredTableHeaderTitles.value.length >= 8) {
      tableColWidth.value = 250;
    }
  };

  const onPageSizeChange = (size: number) => {
    pagination.value.perPage = size;
    pagination.value.page = 1;
  };

  const onCurrentChange = (page: number) => {
    pagination.value.page = page;
  };

  onMounted(() => {
    getTableData();
    tableHeight.value = Math.round(window.innerHeight * 0.6);
    window.addEventListener("resize", handleTableHeightResize);
    handleTableColWidth();
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleTableHeightResize);
  });

  return {
    tableData,
    tableHeight,
    tableColWidth,
    isDropdownOpen,
    selectAll,
    tableHeaderTitles,
    filteredTableHeaderTitles,
    pagination,
    totalCount,
    selectAllCheckbox,
    onPageSizeChange,
    onCurrentChange,
    fetchTableData
  };
}
