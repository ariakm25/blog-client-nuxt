<template>
  <div>
    <h2>Artikel Lainnya</h2>
    <div v-if="!loading">
      <a-row v-for="article in random" :key="article.id" :gutter="[8, 8]">
        <a-col :span="6">
          <nuxt-link :to="'article/' + article.slug">
            <img
              :src="article.image"
              :alt="article.title"
              width="100%"
              style="height: 50px; object-fit: cover"
            />
          </nuxt-link>
        </a-col>
        <a-col :span="18">
          <nuxt-link :to="'article/' + article.slug">
            <h3>{{ article.title }}</h3>
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
    <div v-else>
      <a-skeleton
        :loading="true"
        :title="false"
        :active="true"
        :avatar="{ size: 'large', shape: 'square' }"
        :paragraph="{ rows: 2 }"
      />
      <a-skeleton
        :loading="true"
        :title="false"
        :active="true"
        :avatar="{ size: 'large', shape: 'square' }"
        :paragraph="{ rows: 2 }"
      />
      <a-skeleton
        :loading="true"
        :title="false"
        :active="true"
        :avatar="{ size: 'large', shape: 'square' }"
        :paragraph="{ rows: 2 }"
      />
      <a-skeleton
        :loading="true"
        :title="false"
        :active="true"
        :avatar="{ size: 'large', shape: 'square' }"
        :paragraph="{ rows: 2 }"
      />
      <a-skeleton
        :loading="true"
        :title="false"
        :active="true"
        :avatar="{ size: 'large', shape: 'square' }"
        :paragraph="{ rows: 2 }"
      />
    </div>
    <h2>Tags</h2>
    <a-skeleton
      :loading="true"
      active
      :avatar="{ size: 'small', shape: 'circle' }"
      :paragraph="false"
    />
    <a-skeleton
      :loading="true"
      active
      :avatar="{ size: 'small', shape: 'circle' }"
      :paragraph="false"
    />
    <a-skeleton
      :loading="true"
      active
      :avatar="{ size: 'small', shape: 'circle' }"
      :paragraph="false"
    />
    <a-skeleton
      :loading="true"
      active
      :avatar="{ size: 'small', shape: 'circle' }"
      :paragraph="false"
    />
    <a-skeleton
      :loading="true"
      active
      :avatar="{ size: 'small', shape: 'circle' }"
      :paragraph="false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      random: [],
      tags: [],
      loading: true
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const getRandom = await this.$axios.get('/random_articles')
      const random = getRandom.data.data
      this.random = random
      this.loading = false
    }
  }
}
</script>
