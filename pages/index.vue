<template>
  <div>
    <h2>Artikel Terbaru</h2>
    <a-row type="flex" :gutter="[32, 32]">
      <a-col
        v-for="article in newArticles.data"
        :key="article.id"
        :xs="24"
        :sm="24"
        :md="12"
      >
        <a-card hoverable :bordered="false" :loading="loading">
          <template slot="cover">
            <nuxt-link :to="'/article/' + article.slug">
              <img
                width="100%"
                style="height: 250px; object-fit: cover"
                :alt="article.title"
                :src="article.image"
              />
            </nuxt-link>
          </template>
          <a-card-meta>
            <template slot="title">
              <div>
                <a-row type="flex" justify="space-between" align="middle">
                  <a-col :span="12">
                    <a-avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <span style="color: #777">{{ article.user.name }}</span>
                  </a-col>
                  <a-col :span="12" style="text-align: right">
                    <span style="color: #777"
                      ><a-icon type="clock-circle" />
                      {{
                        $moment(article.updated_at).format('DD MMMM, YYYY')
                      }}</span
                    >
                  </a-col>
                </a-row>
              </div>
            </template>
            <template slot="description">
              <nuxt-link :to="'/article/' + article.slug">
                <h2>{{ article.title }}</h2>
              </nuxt-link>
              <nuxt-link
                v-for="tag in article.tags"
                :key="tag.id"
                :to="'/tag/' + tag.slug"
              >
                <a-badge
                  :count="tag.name"
                  :number-style="{ backgroundColor: '#52c41a' }"
                />
              </nuxt-link>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <a-divider />
    <dir style="text-align: center">
      <a-pagination
        :current="newArticles.page"
        :page-size="newArticles.perPage"
        :total="newArticles.total"
        @change="onChangePage"
      />
    </dir>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, query }) {
    const getNewArticles = await $axios.get('/articles?page=' + query.page)
    const newArticles = getNewArticles.data.data
    return {
      newArticles,
      loading: false
    }
  },
  data() {
    return {
      loading: true
    }
  },
  moment: {
    defaultLocale: 'id'
  },
  watchQuery: ['page'],
  methods: {
    onChangePage(page) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.loading = true
      this.$router.push({ query: { ...this.$route.query, page } })
    }
  }
}
</script>
