<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="[currentPage]" mode="inline">
        <a-menu-item key="/admin">
          <nuxt-link to="/admin">
            <a-icon type="pie-chart" />
            <span>Dashboard</span>
          </nuxt-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="form" /><span>Articles</span></span>
          <a-menu-item key="/admin/articles/create"
            ><nuxt-link to="/admin/articles/create"
              >Create</nuxt-link
            ></a-menu-item
          >
          <a-menu-item key="/admin/articles/draft"
            ><nuxt-link to="/admin/articles/draft"
              >Draft</nuxt-link
            ></a-menu-item
          >
          <a-menu-item key="/admin/articles/published"
            ><nuxt-link to="/admin/articles/published"
              >Published</nuxt-link
            ></a-menu-item
          >
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"
            ><a-icon type="container" /><span>Series</span></span
          >
          <a-menu-item key="/admin/series/create"
            ><nuxt-link to="/admin/series/create"
              >Create</nuxt-link
            ></a-menu-item
          >
          <a-menu-item key="/admin/series/draft"
            ><nuxt-link to="/admin/series/draft">Draft</nuxt-link></a-menu-item
          >
          <a-menu-item key="/admin/series/published"
            ><nuxt-link to="/admin/series/published"
              >Published</nuxt-link
            ></a-menu-item
          >
        </a-sub-menu>
        <a-menu-item key="/admin/comments">
          <nuxt-link to="/admin/comments">
            <a-icon type="message" />
            <span>Comments</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="/admin/tags">
          <nuxt-link to="/admin/tags">
            <a-icon type="tags" />
            <span>Tags</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="/admin/roles">
          <nuxt-link to="/admin/roles">
            <a-icon type="apartment" />
            <span>Roles</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="/admin/users">
          <nuxt-link to="/admin/users">
            <a-icon type="team" />
            <span>Users</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="/admin/settings">
          <nuxt-link to="/admin/settings">
            <a-icon type="setting" />
            <span>Setting</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff">
        <a-row type="flex" justify="end">
          <a-col
            ><a-menu id="nav" mode="horizontal">
              <a-menu-item key="user" style="margin-top: -5px">
                <a-dropdown placement="bottomCenter">
                  <a
                    class="ant-dropdown-link"
                    @click="(e) => e.preventDefault()"
                  >
                    <a-avatar
                      :style="{
                        verticalAlign: 'middle'
                      }"
                      :src="this.$store.state.auth.user.avatar"
                    ></a-avatar
                    ><span
                      :style="{ marginLeft: '8px', verticalAlign: 'middle' }"
                      >{{ this.$store.state.auth.user.name }}</span
                    >
                    <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <nuxt-link to="/profile"
                        ><a-icon type="user" /> <span>Profile</span></nuxt-link
                      >
                    </a-menu-item>
                    <a-menu-item>
                      <a @click.prevent="logout"
                        ><a-icon type="logout" /> <span>Logout</span></a
                      >
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-menu-item>
              <a-menu-item key="notif">
                <a-badge :count="1"><a-icon type="bell"/></a-badge>
              </a-menu-item>
              <a-menu-item key="article">
                <a-icon type="plus" />Article
              </a-menu-item>
              <a-menu-item key="home">
                <nuxt-link to="/"
                  ><a-icon type="home" />Home
                </nuxt-link></a-menu-item
              >
            </a-menu></a-col
          >
        </a-row>
      </a-layout-header>
      <div class="admin-content-container">
        <Nuxt class="admin-content" />
      </div>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  middleware: 'admin',
  data() {
    return {
      collapsed: false
    }
  },

  computed: {
    currentPage() {
      return this.$route.path
    }
  },

  methods: {
    async logout() {
      this.$message.loading({ content: 'Memuat...', key: 'logout' })
      await this.$auth.logout()
      this.$message.success({ content: 'Berhasil keluar', key: 'logout' })
    }
  }
}
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
