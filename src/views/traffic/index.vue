<script setup lang="ts">
import { ref } from "vue";
import Filter from "./components/Filter/index.vue";
import Table from "./components/Table/index.vue";

const filterParams = ref([]);
const sendFilter = filter => {
  filterParams.value = filter;
};
</script>

<template>
  <div class="traffic">
    <Filter @send-filter="sendFilter" />
    <Table :params="filterParams" />
  </div>
</template>
<style lang="scss" scoped></style>
