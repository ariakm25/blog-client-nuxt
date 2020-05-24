<template>
  <a-layout>
    <header id="header">
      <Navbar />
    </header>
    <a-layout-content>
      <div class="container">
        <a-row :gutter="24">
          <a-col :xs="24" :sm="24" :md="17">
            <nuxt />
          </a-col>
          <a-col :xs="24" :sm="24" :md="7">
            <Sidebar />
          </a-col>
        </a-row>
      </div>
      <a-back-top />
    </a-layout-content>
    <a-layout-footer>
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import Sidebar from '~/components/Sidebar'

export default {
  components: {
    Navbar,
    Footer,
    Sidebar
  }
}
</script>
