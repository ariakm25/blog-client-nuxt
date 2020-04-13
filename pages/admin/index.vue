<template>
  <h1>Welcome back, {{ this.$store.state.auth.user.name }}!</h1>
</template>

<script>
export default {
  layout: 'admin',
  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>

<style></style>
