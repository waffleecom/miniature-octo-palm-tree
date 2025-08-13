<template>
  <div>
    <br />
    <h1
      style="margin-top: 62px; text-align: center; padding: 0px 50px 0px 50px"
    >
      {{ $t('games.list') }}
    </h1>
    <h3 style="text-align: center; padding: 0px 50px 0px 50px">
      {{ $t('games.subtitle') }}
    </h3>
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
        <v-progress-linear
          v-if="$fetchState.pending"
          indeterminate
          color="primary"
        ></v-progress-linear>
        <v-data-table
          v-if="!$fetchState.pending"
          :headers="headers"
          :items="games.storeContent"
          :search="search"
          :items-per-page="15"
          style="cursor: pointer"
          loading-text="Loading... Please wait"
          class="elevation-1"
          :footer-props="{
            'items-per-page-options': [15, 30, 50, 100, -1],
            sortBy: 'item.info.title',
          }"
          @click:row="selectGameBtn"
        >
          <template #item.info.icon_url="{ item }">
            <img
              :src="item.info.icon_url ? item.info.icon_url : 'noicon.png'"
            />
          </template>
        </v-data-table>
      </v-card>
      <v-dialog v-if="selectGame" v-model="dialogGame" scrollable width="800">
        <v-card outlined>
          <v-carousel
            v-if="selectGame.info.screenshots"
            :continuous="true"
            :show-arrows="false"
            cycle
            show-arrows-on-hover
            delimiter-icon="mdi-minus"
            height="300"
          >
            <v-carousel-item
              v-for="(item, i) in selectGame.info.screenshots"
              :key="i"
              :src="item.url"
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
            {{ selectGame.info.title }}
            <v-btn
              v-if="selectGame.info.videos"
              icon
              @click="
                dialogVideo = true
                dialogGame = false
              "
            >
              <v-icon>mdi-movie</v-icon>
            </v-btn>
          </v-card-title>
          <v-alert
            v-if="
              selectGame.info.console
                .toString()
                .replace(',', ', ')
                .includes('NEW3DS')
            "
            style="margin: 12px"
            dense
            text
            icon="mdi-alert-circle"
            border="left"
            type="error"
            >{{ $t('games.requirement_needed') }}</v-alert
          ><v-alert
            v-if="
              selectGame.info.console
                .toString()
                .replace(',', ', ')
                .includes('DSi')
            "
            style="margin: 12px"
            dense
            text
            icon="mdi-alert-circle"
            border="left"
            type="error"
            >{{ $t('games.nand_storage') }}
          </v-alert>
          <v-card-text>
            <b>Description :</b>
            {{
              selectGame.info.description
                ? selectGame.info.description
                : $t('games.notspecified')
            }}
            <br />
            <b>Version :</b>
            {{
              selectGame.info.version
                ? selectGame.info.version
                : $t('games.notspecified')
            }}
            <br />
            <b>{{ $t('games.author') }} :</b>
            {{
              selectGame.info.author
                ? selectGame.info.author
                : $t('games.notspecified')
            }}
            <br />
            <b>{{ $t('games.category') }} :</b>
            {{
              selectGame.info.category.toString().replace(',', ', ')
                ? selectGame.info.category.toString().replace(',', ', ')
                : $t('games.notspecified')
            }}
            <br />
            <b>Console :</b>
            {{
              selectGame.info.console.toString().replace(',', ', ')
                ? selectGame.info.console.toString().replace(',', ', ')
                : $t('games.notspecified')
            }}
            <br />
            <b>{{ $t('games.last_updated') }} :</b>
            {{
              selectGame.info.last_updated
                ? selectGame.info.last_updated
                : $t('games.notspecified')
            }}
            <br />

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

            <v-card flat>
              <qrcode-vue
                v-if="QRCodeURL"
                class="qrcode text-center"
                :value="QRCodeURL"
                :size="200"
              />
            </v-card>
          </v-card-text>
          <v-footer>
            <v-spacer></v-spacer>
            <div :v-if="QRsize">{{ $t('games.size') }} : {{ QRsize }}</div>
            <v-btn icon :href="QRCodeURL.replace('http://', 'https://')">
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn color="primary" text @click="dialogGame = false">
              {{ $t('close') }}
            </v-btn>
          </v-footer>
        </v-card>
      </v-dialog>
      <v-dialog v-if="selectGame" v-model="dialogVideo" scrollable width="800">
        <v-card outlined>
          <div v-for="(item, i) in selectGame.info.videos" :key="i">
            <h3 align="center" style="margin: 5px">{{ item.description }} :</h3>
            <video
              controls
              :src="item.url"
              height="auto"
              width="90%"
              style="
                margin-left: 5%;
                margin-right: 5%;
                margin-bottom: 12px;
                border-radius: 10px;
              "
              class="elevation-10"
            ></video>
            <v-divider
              v-if="i != selectGame.info.videos.length - 1"
              style="margin-top: 5px"
            ></v-divider>
          </div>
          <v-footer>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="
                dialogVideo = false
                dialogGame = true
              "
            >
              {{ $t('close') }}
            </v-btn>
          </v-footer>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue,
  },
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
      dialogVideo: false,
      downloadLinks: [],
      tabGame: null,
      QRCodeURL: undefined,
      QRsize: undefined,
    }
  },
  async fetch() {
    const gamesResponse = await this.$axios.$get(
      `https://ghosteshop.com/ghosteshop.json`
    )
    this.games = gamesResponse
    this.games.storeContent = this.games.storeContent.reverse()
    this.headers = [
      {
        text: this.$t('games.icon'),
        align: 'start',
        value: 'info.icon_url',
        sortable: false,
      },
      {
        text: this.$t('games.title'),
        value: 'info.title',
      },
      {
        text: this.$t('games.description'),
        value: 'info.description',
        sortable: false,
      },
      {
        text: this.$t('games.version'),
        value: 'info.version',
        sortable: false,
      },
      { text: this.$t('games.author'), value: 'info.author' },
      { text: this.$t('games.category'), value: 'info.category' },
      { text: this.$t('games.console'), value: 'info.console' },
    ]
  },
  head() {
    return {
      title: this.$t('titles.games'),
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
      this.videosURL = undefined
      for (const i in item) {
        if (i !== 'info') {
          this.downloadLinks.push({
            name: i,
            downloadLink: item[i].script[0].file,
            downloadSize: item[i].size,
          })
        }
      }
      this.QRCodeURL = this.downloadLinks[0].downloadLink
      this.QRsize = this.downloadLinks[0].downloadSize
      this.videosURL = item
      this.selectGame = item
      this.dialogGame = true
      this.dialogVideo = false
    },
    displayVideos() {
      this.dialogVideo = true
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
