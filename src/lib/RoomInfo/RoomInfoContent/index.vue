<template>
  <div v-if="currentUser?.id">
    <el-card shadow="never" mb="4">
      <h3>General info</h3>
      <div class="vac-room-container">
        <slot :name="'room-list-item_' + currentUser.id">
          <slot :name="'room-list-avatar_' + currentUser.id">
            <div class="vac-avatar empty-avatar" />
          </slot>
          <div class="vac-name-container vac-text-ellipsis">
            <div class="vac-title-container">
              <div class="vac-room-name vac-text-ellipsis">
                {{ currentUser.name }}
              </div>
            </div>
            <div class="vac-text-last">
              <div class="vac-text-ellipsis">
                {{ currentUser.email }}
              </div>
            </div>
          </div>
        </slot>
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <div class="detail-line">
          <span class="detail-label">ID:</span>
          <span class="detail-value">{{ currentUser.id }}</span>
        </div>
        <div class="detail-line flex items-center">
          <span class="detail-label">
            <IconifyIconOffline
              class="close-sidebar"
              :icon="Clock()"
              width="15px"
              height="15px"
            />
          </span>
          <span class="detail-value">{{
            formatterDate(currentUser?.created_at)
          }}</span>
        </div>
      </div>
    </el-card>
    <template v-if="currentUser.last_visit">
      <el-card shadow="never">
        <h3>Location</h3>
        <div class="flex flex-col">
          <div class="detail-line">
            <span class="detail-label">City:</span>
            <span class="detail-value">{{
              currentUser?.last_visit?.geolocation?.city
            }}</span>
          </div>
          <div class="detail-line">
            <span class="detail-label">Region:</span>
            <span class="detail-value">{{
              currentUser?.last_visit?.geolocation?.region
            }}</span>
          </div>
          <div class="detail-line">
            <span class="detail-label">Country:</span>
            <span class="detail-value">{{
              currentUser?.last_visit?.geolocation?.country
            }}</span>
          </div>
        </div>
      </el-card>
      <el-card v-if="currentUser.last_visit.last_page" shadow="never">
        <h3>Chat info</h3>
        {{ currentUser.last_visit.last_page.openedAt }}
        {{ currentUser.last_visit.last_page.title }}
        <a target="_blank" :href="currentUser.last_visit.last_page.url">{{
          currentUser.last_visit.last_page.url
        }}</a>
      </el-card>
      <el-card v-if="currentUser.last_visit.user_agent" shadow="never">
        <h3>Technology</h3>
        <div class="detail-line">
          <span class="detail-label">IP address:</span>
          <span class="detail-value">{{ currentUser?.last_visit?.ip }}</span>
        </div>
        <div class="detail-line">
          <span class="detail-label">User agent:</span>
          <span class="detail-value">{{
            currentUser?.last_visit?.user_agent
          }}</span>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script>
import moment from "moment/moment";
import Clock from "@iconify-icons/ep/clock";
export default {
  name: "RoomsContent",

  props: {
    currentUser: { type: Object, required: true },
    room: { type: Object, required: true },
    textMessages: { type: Object, required: true }
  },
  methods: {
    Clock() {
      return Clock;
    },
    formatterDate(value) {
      return moment.unix(value).format("DD-MM-YYYY hh:mm");
    }
  }
};
</script>
<style lang="scss" scoped>
.rooms-list-title {
  padding: 0 0 10px;
}

.el-card {
  --el-card-padding: 15px 20px 20px;
  margin-bottom: 10px;
  font-size: 14px;
}

h3 {
  margin-bottom: 10px;
}

.detail-line {
  .detail-label {
    color: #677179;
    padding-right: 10px;
  }

  .detail-value {
    color: #424d57;
  }
}
</style>
