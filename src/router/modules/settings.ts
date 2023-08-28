export default {
  path: "/settings",
  redirect: "/settings/tags",
  meta: {
    icon: "setting",
    title: "Settings",
    rank: 10
  },
  children: [
    {
      path: "/settings/tags",
      name: "tags",
      component: () => import("@/views/settings/tags/index.vue"),
      meta: {
        title: "Tags"
      }
    },
    {
      path: "/settings/canned-responses",
      name: "Canned responses",
      component: () => import("@/views/settings/canned-responses/index.vue"),
      meta: {
        title: "Canned responses",
        roles: [1]
      }
    },
    {
      path: "/settings/chat-settings",
      name: "chat-settings",
      redirect: "/settings/chat-settings",
      meta: {
        title: "Chat settings"
      },
      children: [
        {
          path: "/settings/chat-settings/inactivity-timeouts",
          name: "inactivity-timeouts",
          component: () =>
            import(
              "@/views/settings/chat-settings/inactivity-timeoutes/index.vue"
            ),
          meta: {
            title: "Inactivity timeouts",
            roles: [1]
          }
        }
      ]
    }
  ]
} as RouteConfigsTable;
