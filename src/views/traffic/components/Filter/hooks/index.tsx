import { ref } from "vue";

export function useFilterHooks() {
  const filterMatchOptions = [
    {
      value: "all",
      label: "Match all filters"
    },
    {
      value: "any",
      label: "Match any filters"
    }
  ];
  const selectMatchValue = ref("all");
  const activeTab = ref("allCustomers");
  const isShowFilterButton = ref(true);
  const filterItemsList = [
    {
      label: "Activity",
      icon: "chart",
      id: "activity",
      used: false,
      isOpen: false,
      params: {
        is: [],
        isNot: [],
        key: "is"
      }
    },
    {
      label: "Assigned agent",
      icon: "agent",
      id: "assigned_agent",
      used: false,
      isOpen: false,
      params: {
        is: [],
        isNot: [],
        key: "is"
      }
    },
    {
      label: "Group",
      icon: "group",
      id: "group",
      used: false,
      isOpen: false,
      params: {
        is: [],
        isNot: [],
        key: "is"
      }
    },
    {
      label: "Country",
      icon: "location",
      id: "country_code",
      used: false,
      isOpen: false,
      params: {
        is: [],
        isNot: [],
        key: "is"
      }
    },
    {
      label: "City",
      icon: "location",
      id: "city",
      used: false,
      isOpen: false,
      params: {
        isExactly: [],
        isNot: [],
        contains: [],
        doesNotContains: [],
        hasAnyValue: [false],
        key: "is exactly"
      }
    },
    {
      label: "State",
      icon: "location",
      id: "state",
      used: false,
      isOpen: false,
      params: {
        isExactly: [],
        isNot: [],
        contains: [],
        doesNotContains: [],
        hasAnyValue: [false],
        key: "is exactly"
      }
    },
    {
      label: "Name",
      icon: "agent",
      id: "name",
      used: false,
      isOpen: false,
      params: {
        isExactly: [],
        isNot: [],
        contains: [],
        doesNotContains: [],
        hasAnyValue: [false],
        key: "is exactly"
      }
    },
    {
      label: "Email",
      icon: "mail",
      id: "email",
      used: false,
      isOpen: false,
      params: {
        isExactly: [],
        isNot: [],
        contains: [],
        doesNotContains: [],
        hasAnyValue: [false],
        key: "is exactly"
      }
    },
    {
      label: "Returning customer",
      icon: "returning",
      id: "returning_customer",
      used: false,
      isOpen: false,
      params: {
        isTrue: [true],
        isFalse: [false]
      }
    },
    {
      label: "Number of visits",
      icon: "visits",
      id: "number_of_visits",
      used: false,
      isOpen: false,
      params: {
        isExactly: [],
        isNot: [],
        isGreaterThan: [],
        isGreaterOrEqual: [],
        isLessThan: [],
        isLessOrEqual: [],
        isBetween: [],
        key: "is true"
      }
    },
    {
      label: "Web crawlers",
      icon: "crawlers",
      id: "web_crawlers",
      used: false,
      isOpen: false,
      params: {
        isTrue: [true],
        isFalse: [false],
        key: " - Show only web crawlers"
      }
    },
    {
      label: "IP address",
      icon: "earth",
      id: "ip_address",
      used: false,
      isOpen: false,
      params: {
        ip: [],
        key: " - My current IP address"
      }
    },
    {
      label: "Came from",
      icon: "earth",
      id: "came_from",
      used: false,
      isOpen: false,
      params: {
        isExactly: [],
        isNot: [],
        contains: [],
        doesNotContains: [],
        hasAnyValue: [false],
        key: "is exactly"
      }
    },
    {
      label: "Last page title",
      icon: "earth",
      id: "last_page_title",
      used: false,
      isOpen: false,
      params: {
        isExactly: [],
        isNot: [],
        contains: [],
        doesNotContains: [],
        hasAnyValue: [false],
        key: "is exactly"
      }
    }
  ];
  return {
    filterMatchOptions,
    selectMatchValue,
    activeTab,
    filterItemsList,
    isShowFilterButton
  };
}
