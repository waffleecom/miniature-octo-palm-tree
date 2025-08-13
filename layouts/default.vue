<template>
  <v-app>
    <Header />
    <HeaderMobile />
    <DrawerMobile />
    <v-main>
      <nuxt keep-alive />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },

  mounted() {
    // Ensure theme is applied when layout is mounted and Vuetify is ready
    this.$nextTick(() => {
      const isDark = this.$store.getters.getDarkTheme
      if (this.$vuetify) {
        this.$vuetify.theme.dark = isDark
      }
    })
  },
}
</script>

<style scoped>
.imgCover {
  margin-top: 48px;
}

.v-main {
  padding: 0px 0px 0px !important;
}
</style>