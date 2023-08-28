import { TrafficFilterParams, TrafficFilter } from "@/api/traffic/interfaces";
import { computed, ref } from "vue";

export function useReturningCustomerHooks() {
  const params = ref<TrafficFilterParams>(null);
  const filter = ref<TrafficFilter>(null);
  const radioValue = ref("is_true");
  const selectIsTrueValue = ref(true);
  const selectIsFalseValue = ref(false);

  const isInputsEmpty = computed(() => {
    switch (radioValue.value) {
      case "is_true":
        selectIsTrueValue.value = true;
        selectIsFalseValue.value = false;
        params.value = {
          isTrue: [selectIsTrueValue.value],
          key: "is true"
        };
        break;
      case "is_false":
        selectIsTrueValue.value = false;
        selectIsFalseValue.value = true;
        params.value = {
          isFalse: [selectIsFalseValue.value],
          key: "is false"
        };
        break;
    }
    filter.value = {
      id: "returning_customer",
      label: "Returning customer",
      icon: "returning",
      used: true,
      isOpen: true,
      params: params.value
    };
    return selectIsTrueValue.value && selectIsFalseValue.value;
  });

  return {
    isInputsEmpty,
    radioValue,
    selectIsTrueValue,
    selectIsFalseValue,
    filter
  };
}
