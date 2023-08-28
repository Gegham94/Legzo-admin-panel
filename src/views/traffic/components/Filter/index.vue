<script setup lang="ts">
import type { TabsPaneContext } from "element-plus";
import AddedFilter from "./AddedFilter.vue";
import { useFilterHooks } from "./hooks";

defineOptions({
  name: "Filter"
});

const { filterMatchOptions, selectMatchValue, activeTab } = useFilterHooks();
const emit = defineEmits(["send-filter"]);

const handleTabClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event.target);
};

const sendFilter = filter => {
  emit("send-filter", filter);
};
</script>

<template>
  <div class="traffic-filter">
    <div class="traffic-filter__tabs">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane :label="`All customers()`" name="allCustomers" />
        <el-tab-pane :label="`Chatting()`" name="chatting" />
        <el-tab-pane :label="`Supervised()`" name="supervised" />
        <el-tab-pane :label="`Queued()`" name="queued" />
        <el-tab-pane :label="`Waiting for reply()`" name="waitingForReply" />
        <el-tab-pane :label="`Invited()`" name="invited" />
        <el-tab-pane :label="`Browsing()`" name="browsing" />
      </el-tabs>
    </div>
    <div class="traffic-filter__select-add">
      <el-row>
        <el-select
          v-model="selectMatchValue"
          class="mb-2 mr-1"
          placeholder="Select matching filter"
        >
          <el-option
            v-for="item in filterMatchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div class="mr-1 mb-2 traffic-filter__select-add-selected--add-filter">
          <AddedFilter @send-filter="sendFilter" />
        </div>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.traffic-filter {
  &__select-add {
    &-selected--add-filter {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
