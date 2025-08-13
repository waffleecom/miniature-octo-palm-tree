<template>
  <div>
    <br />
    <h1
      style="margin-top: 62px; text-align: center; padding: 0px 50px 0px 50px"
    >
      {{ $t('wiiu.list') }}
    </h1>
    <h3 style="text-align: center; padding: 0px 50px 0px 50px">
      {{ $t('wiiu.subtitle') }}
    </h3>
    <v-alert
      type="error"
      width="75%"
      style="margin: 20px auto"
      elevation="2"
      border="left"
    >
      This section is currently being tested and is subject to change. The
      database is incomplete and the missing games are indicated with the small
      red icon next to their name.</v-alert
    >
    <v-container>
      <v-card>
        <v-card-title
          >{{ $t('games.search') }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="$t('games.inputhere')"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 5px;
          "
        >
          <v-switch
            label="Show only available games"
            v-model="showAvailableOnly"
            color="primary"
            style="margin-top: 0px !important"
            hide-details
          ></v-switch>
        </div>
        <v-progress-linear
          v-if="$fetchState.pending"
          indeterminate
          color="primary"
        ></v-progress-linear>
        <v-data-table
          v-if="!$fetchState.pending"
          :headers="headers"
          :items="filteredGames"
          :search="search"
          :items-per-page="15"
          style="cursor: pointer"
          loading-text="Loading... Please wait"
          class="elevation-1"
          :footer-props="{
            'items-per-page-options': [15, 30, 50, 100, -1],
          }"
          @click:row="selectGameBtn"
        >
          <template #item.icon="{ item }">
            <img :src="item.icon ? item.icon : 'noicon.png'" height="48px" />
          </template>
          <template #item.name="{ item }">
            <v-icon
              v-if="!item.files"
              color="error"
              size="small"
              style="margin-right: 2px"
              >mdi-alert</v-icon
            >
            {{ item.name }}</template
          >
        </v-data-table>
      </v-card>
      <v-dialog v-if="selectGame" v-model="dialogGame" scrollable width="800">
        <v-card outlined>
          <v-carousel
            v-if="selectGame.screenshots"
            :continuous="true"
            :show-arrows="false"
            cycle
            show-arrows-on-hover
            delimiter-icon="mdi-minus"
            height="300"
          >
            <v-carousel-item
              v-for="(item, i) in selectGame.screenshots"
              :key="i"
              :src="item"
            ></v-carousel-item>
          </v-carousel>
          <v-tabs
            v-if="downloadLinks[1]"
            v-model="tabGame"
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            show-arrows
          >
            <v-tab
              v-for="downloadLinkItem in downloadLinks"
              :key="downloadLinkItem.name"
            >
              {{ downloadLinkItem.name }}
            </v-tab>
          </v-tabs>

          <v-card-title>
            {{ selectGame.name }}
          </v-card-title>

          <v-card-text>
            <b>Description :</b>
            {{
              selectGame.description
                ? selectGame.description
                : $t('games.notspecified')
            }}
            <br />
            <b>Version :</b>
            {{
              selectGame.version ? selectGame.version : $t('games.notspecified')
            }}
            <br />
            <b>{{ $t('games.author') }} :</b>
            {{
              selectGame.author ? selectGame.author : $t('games.notspecified')
            }}
            <br />
            <b>{{ $t('games.category') }} :</b>
            {{ selectGame.genre ? selectGame.genre : $t('games.notspecified') }}
            <br />
            <b>{{ $t('games.rating') }} :</b>
            {{ selectGame.score ? selectGame.score : $t('games.notspecified') }}
            <br />
          </v-card-text>

          <!-- <v-tabs
            v-if="downloadLinks[0]"
            v-model="tabGame"
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            show-arrows
          >
            <v-tab
              v-for="downloadLinkItem in downloadLinks"
              :key="downloadLinkItem.name"
            >
              {{ downloadLinkItem.name }}
            </v-tab>
          </v-tabs> -->

          <v-footer>
            <v-spacer></v-spacer>
            <div v-if="QRsize && downloadLinks.length > 0">
              {{ $t('games.size') }} : {{ QRsize }}
            </div>
            <v-btn v-if="downloadLinks.length > 0" icon :href="QRCodeURL">
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-chip v-if="downloadLinks.length == 0" color="error text-white"
              >Not available</v-chip
            >
            <v-btn color="primary" text @click="dialogGame = false">
              {{ $t('close') }}
            </v-btn>
          </v-footer>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  asyncData() {
    return new Promise((resolve) => {
      // eslint-disable-next-line nuxt/no-timing-in-fetch-data
      setTimeout(function () {
        resolve({})
      }, 500)
    })
  },
  data() {
    return {
      search: '',
      games: null,
      headers: null,
      selectGame: null,
      dialogGame: false,
      downloadLinks: [],
      tabGame: null,
      QRCodeURL: undefined,
      QRsize: undefined,
      showAvailableOnly: false,
    }
  },
  async fetch() {
    const gamesResponse = await this.$axios.$get(
      `https://ghosteshop.com/wii-u-api.php`
    )
    this.games = gamesResponse
    this.headers = [
      {
        text: this.$t('games.icon'),
        align: 'start',
        value: 'icon',
        sortable: false,
      },
      {
        text: this.$t('games.title'),
        value: 'name',
      },
      {
        text: this.$t('games.description'),
        value: 'short_description',
        sortable: false,
      },
      { text: this.$t('games.author'), value: 'publisher' },
      { text: this.$t('games.category'), value: 'genre' },
    ]
  },
  head() {
    return {
      title: this.$t('titles.wiiu_games'),
    }
  },
  watch: {
    tabGame(index, item) {
      if (this.downloadLinks[index]) {
        this.QRCodeURL = this.downloadLinks[index].downloadLink
        this.QRsize = this.downloadLinks[index].downloadSize
      } else {
        this.QRCodeURL = this.downloadLinks[0].downloadLink
        this.QRsize = this.downloadLinks[0].downloadSize
      }
    },
  },
  methods: {
    selectGameBtn(item) {
      this.downloadLinks = []
      this.QRsize = undefined
      this.QRCodeURL = undefined
      for (const i in item.files) {
        this.downloadLinks.push({
          name: item.files[i].name,
          downloadLink: item.files[i].url,
          downloadSize: item.files[i].size,
        })
      }
      this.QRCodeURL = this.downloadLinks[0]
        ? this.downloadLinks[0].downloadLink
        : undefined
      this.QRsize = this.downloadLinks[0]
        ? this.downloadLinks[0].downloadSize
        : undefined
      this.selectGame = item
      this.dialogGame = true
    },
  },
  computed: {
    filteredGames() {
      if (this.showAvailableOnly) {
        return this.games.en.filter((game) => game.files)
      } else {
        return this.games.en
      }
    },
  },
}
</script>

<style scopped>
.qrcode canvas {
  border: 15px solid #ffffff;
}

.v-window-item .v-image__image.v-image__image--cover {
  background-size: contain;
}
</style>
