<template>
  <a-layout>
    <header id="header">
      <Navbar />
    </header>
    <a-layout-content><nuxt class="container"/></a-layout-content>
    <a-layout-footer><Footer /></a-layout-footer>
  </a-layout>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
