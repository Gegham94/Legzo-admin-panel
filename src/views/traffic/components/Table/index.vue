<script setup lang="ts">
import SvgIcon from "@/lib/components/SvgIcon/SvgIcon.vue";
import { useTableHooks } from "./hooks";
import { watch } from "vue";

defineOptions({
  name: "Table"
});

const {
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
} = useTableHooks();

const props = defineProps({
  params: {
    type: Object,
    default: () => {}
  }
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleChange = val => {
  selectAllCheckbox(val.target.checked);
};

watch(
  () => props.params,
  val => {
    if (val) {
      fetchTableData(val);
    }
  }
);
</script>

<template>
  <div class="traffic-table">
    <el-card>
      <el-table :data="tableData" style="width: 100%" :height="tableHeight">
        <el-table-column
          v-for="tableTitle in filteredTableHeaderTitles"
          :key="tableTitle.value"
          :prop="tableTitle.value"
          :label="tableTitle.label"
          :sortable="true"
          :width="tableColWidth"
        >
          <template #default="scope">
            <span v-if="scope.column.property === 'last_page_title'">
              <a :href="scope.row.last_page_url" target="blank">{{
                scope.row.last_page_title
              }}</a>
            </span>
            <span v-else>{{ scope.row[scope.column.property] }}</span>
          </template></el-table-column
        >
      </el-table>
      <el-pagination
        class="float-right pt-4 pb-4"
        v-model:currentPage="pagination.page"
        :page-size="pagination.perPage"
        :total="totalCount"
        :page-sizes="[20, 40, 80]"
        :background="true"
        layout="sizes, prev, pager, next, jumper"
        @size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
    </el-card>
    <div class="traffic-table_dropdown-options">
      <el-tooltip
        content="Edit columns"
        placement="top-end"
        popper-class="pure-tooltip"
      >
        <svg-icon
          class="traffic-table_dropdown-options-icon"
          @click="toggleDropdown"
          name="options"
        />
      </el-tooltip>
      <div v-if="isDropdownOpen" class="traffic-table_dropdown-options-content">
        <label class="traffic-table_dropdown-options-content-all">
          <input
            type="checkbox"
            v-model="selectAll"
            @change="handleChange($event)"
          />
          Select all
        </label>
        <label
          class="traffic-table_dropdown-options-content-label"
          v-for="(option, index) in tableHeaderTitles"
          :key="index"
        >
          <input
            type="checkbox"
            v-model="option.isSelected"
            :disabled="option.value === 'name'"
          />
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.traffic-table {
  position: relative;

  &_dropdown-options {
    position: absolute;
    display: flex;
    align-items: center;
    right: 1px;
    top: 25px;
    border-left: 1px solid var(--border-default);
    padding: 0 20px 0 10px;
    cursor: pointer;
    z-index: 999;
    background: var(--surface-primary-default);

    &-icon {
      outline: none;
      text-decoration: none;

      &:hover {
        opacity: 0.7;
      }
    }

    &-content {
      min-width: 220px;
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 30px;
      right: 0;
      background: var(--surface-primary-default);
      box-shadow: 0 6px 20px 0 rgb(19 19 23 / 30%);
      padding: 8px 11px;
      max-height: 390px;
      overflow-y: auto;
      z-index: 1000;
      border-radius: 4px;

      input {
        margin-right: 6px;
        border-color: var(--color-action-default);
        background-color: var(--color-action-default);
        width: 15px;
        height: 15px;
      }

      &-all {
        cursor: pointer;
        margin-bottom: 10px;
        padding-bottom: 10px;
        font-weight: 400;
        background: var(--surface-primary-default);

        &:hover {
          opacity: 0.8;
        }

        &::after {
          content: "";
          position: absolute;
          top: 40px;
          left: 0px;
          height: 1px;
          width: 100%;
          background: var(--border-default);
        }
      }

      &-label {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        font-weight: 400;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 20px;
        margin-bottom: 8px;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}

:deep(.el-table__body) {
  .el-table__row {
    height: 50px;
  }
}
</style>
