<template>
  <v-footer padless>
    <v-card
      flat
      tile
      color="black"
      class="lighten-1 white--text text-center footer"
    >
      <v-card-text>
        <v-btn class="mx-4 white--text" href="https://social.ghostland.at" icon target="_blank" rel="noopener noreferrer">
          <v-icon size="24px"> mdi-account-group </v-icon>
        </v-btn>
        <v-btn class="mx-4 white--text" href="https://github.com/ghost-land" icon target="_blank" rel="noopener noreferrer">
          <v-icon size="24px"> mdi-github </v-icon>
        </v-btn>
        <!-- <v-btn class="mx-4 white--text" href="https://ghosteshop.com/feed/news.xml" icon target="_blank" rel="noopener noreferrer">
          <v-icon size="24px"> mdi-rss </v-icon>
        </v-btn> -->
        <v-btn class="mx-4 white--text" href="https://wiki.ghosteshop.com/" icon target="_blank" rel="noopener noreferrer">
          <v-icon size="24px"> mdi-book-open-page-variant </v-icon>
        </v-btn>
        <v-btn class="mx-4 white--text" href="https://status.ghostland.at" icon target="_blank" rel="noopener noreferrer">
          <v-icon size="24px"> mdi-server </v-icon>
        </v-btn>
        <v-btn class="mx-4 white--text" href="https://ghostland.at/dmca" icon target="_blank" rel="noopener noreferrer">
          <v-icon size="24px"> mdi-scale-balance </v-icon>
        </v-btn>
        <v-btn class="mx-4 white--text" href="https://ghostland.at/privacy" icon target="_blank" rel="noopener noreferrer">
          <v-icon size="24px"> mdi-shield-lock </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider dark></v-divider>

      <v-card-text class="white--text">
        {{ $t('footer.copyright') }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {}
</script>

<style scopped>
.footer {
  width: 100% !important;
}
</style>
