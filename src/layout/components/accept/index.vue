<script setup lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
import { setManagerStatus } from "@/api/agents";

defineOptions({
  name: "Accept"
});

const setUserStatus = status => {
  setManagerStatus(status);
};

const usersStore = useUserStoreHook();
</script>

<template>
  <div>
    <div
      v-if="usersStore.getOnlineStatus === 1"
      class="flex gap-4 items-center no-accept-chat-content"
    >
      <span class="font-medium">You are currently not accepting chats</span>
      <el-button plain @click="setUserStatus(2)">
        Start accepting chats
      </el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.no-accept-chat-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--chat-no-accept-bg-color);
  height: 100%;
  width: 100%;

  .font-medium {
    color: var(--chat-no-accept-message-color);
    font-size: 15px;
    font-weight: 600;
  }

  .el-button {
    font-weight: 600;
  }
}
</style>
