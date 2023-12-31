<script setup lang="ts">
import { useRouter } from "vue-router";
import { cloneDeep } from "@pureadmin/utils";
import SearchResult from "./SearchResult.vue";
import SearchFooter from "./SearchFooter.vue";
import { deleteChildren } from "@/utils/tree";
import { useNav } from "@/layout/hooks/useNav";
import { useDebounceFn, onKeyStroke } from "@vueuse/core";
import { ref, watch, computed, nextTick, shallowRef } from "vue";
import { usePermissionStoreHook } from "@/store/modules/permission";
import Search from "@iconify-icons/ep/search";

interface Props {
  value: boolean;
}

interface Emits {
  (e: "update:value", val: boolean): void;
}

const { device } = useNav();
const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {});
const router = useRouter();

const keyword = ref("");
const activePath = ref("");
const inputRef = ref<HTMLInputElement | null>(null);
const resultOptions = shallowRef([]);
const handleSearch = useDebounceFn(search, 300);

const menusData = computed(() => {
  return deleteChildren(cloneDeep(usePermissionStoreHook().wholeMenus));
});

const show = computed({
  get() {
    return props.value;
  },
  set(val: boolean) {
    emit("update:value", val);
  }
});

watch(show, async val => {
  if (val) {
    await nextTick();
    inputRef.value?.focus();
  }
});

function flatTree(arr) {
  const res = [];
  function deep(arr) {
    arr.forEach(item => {
      res.push(item);
      item.children && deep(item.children);
    });
  }
  deep(arr);
  return res;
}

function search() {
  const flatMenusData = flatTree(menusData.value);
  resultOptions.value = flatMenusData.filter(
    menu =>
      keyword.value &&
      menu.meta?.title
        .toLocaleLowerCase()
        .includes(keyword.value.toLocaleLowerCase().trim())
  );
  if (resultOptions.value?.length > 0) {
    activePath.value = resultOptions.value[0].path;
  } else {
    activePath.value = "";
  }
}

function handleClose() {
  show.value = false;
  setTimeout(() => {
    resultOptions.value = [];
    keyword.value = "";
  }, 200);
}

/** key up */
function handleUp() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex(
    item => item.path === activePath.value
  );
  if (index === 0) {
    activePath.value = resultOptions.value[length - 1].path;
  } else {
    activePath.value = resultOptions.value[index - 1].path;
  }
}

/** key down */
function handleDown() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex(
    item => item.path === activePath.value
  );
  if (index + 1 === length) {
    activePath.value = resultOptions.value[0].path;
  } else {
    activePath.value = resultOptions.value[index + 1].path;
  }
}

/** key enter */
function handleEnter() {
  const { length } = resultOptions.value;
  if (length === 0 || activePath.value === "") return;
  router.push(activePath.value);
  handleClose();
}

onKeyStroke("Enter", handleEnter);
onKeyStroke("ArrowUp", handleUp);
onKeyStroke("ArrowDown", handleDown);
</script>

<template>
  <el-dialog
    top="5vh"
    :width="device === 'mobile' ? '80vw' : '50vw'"
    v-model="show"
    :before-close="handleClose"
  >
    <div class="search-result-input">
      <el-input
        ref="inputRef"
        v-model="keyword"
        clearable
        placeholder="Please enter keywords to search"
        @input="handleSearch"
      >
        <template #prefix>
          <span class="el-input__icon">
            <IconifyIconOffline :icon="Search" />
          </span>
        </template>
      </el-input>
      <div class="search-result-container">
        <el-empty
          v-if="resultOptions.length === 0"
          description="No search results yet"
        />
        <SearchResult
          v-else
          v-model:value="activePath"
          :options="resultOptions"
          @click="handleEnter"
        />
      </div>
    </div>
    <template #footer>
      <SearchFooter />
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.search-result-input {
  padding: 20px;
}

.search-result-container {
  margin-top: 20px;
}
</style>
