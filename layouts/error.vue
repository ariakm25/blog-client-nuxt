<template>
  <a-result
    v-if="error.statusCode === 404"
    status="404"
    title="404"
    sub-title="Maaf, halaman yang kamu cari tidak tersedia."
  >
    <template v-slot:extra>
      <a-button type="primary" @click="back">Kembali</a-button>
    </template>
  </a-result>
  <a-result
    v-else-if="error.statusCode === 403"
    status="403"
    title="403"
    sub-title="Maaf, kamu tidak memiliki akses ke halaman ini."
  >
    <template v-slot:extra>
      <a-button type="primary" @click="back">Kembali</a-button>
    </template>
  </a-result>
  <a-result
    v-else-if="error.statusCode === 500"
    status="500"
    title="500"
    sub-title="Maaf, terjadi kesalahan server."
  >
    <template v-slot:extra>
      <a-button type="primary" @click="back">Kembali</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  transition: 'fade'
}
</script>
