<template>
  <div id="random-song-selector" class="glass-card">
    <h1 class="title">TAKUMI³ Random Song Sel³ctor</h1>

    <div class="controls glass-card">
      <h2>選曲条件</h2>
      <SongFilterControls
        v-model:minLevel="minLevel"
        v-model:maxLevel="maxLevel"
      />
      <div class="input-group">
        <label>オプション:</label>
        <PaymentOptionToggle v-model="OnlyNonPayingSongs">無課金曲のみ（現状Lv14以上のみ）</PaymentOptionToggle>
      </div>
      <h2>難易度</h2>
      <SelectDifficulty
        v-model:selectedDifficulty="selectedDifficulty"
      />
      
      <BlacklistManager
        :all-songs="allSongs"
        v-model="blacklistedSongs"
        :min-level="minLevel"
        :max-level="maxLevel"
      />
      
      <div class="button-container">
        <button @click="selectRandomSong" class="glass-button glass-button-primary">Random Select</button>
      </div>
    </div>

    <SongDisplay v-if="currentSong" :song="currentSong" />

    <ErrorMessage v-if="errorMessage" :message="errorMessage" />

    <SongsMemory v-model="songsMemory"/>
  </div>
</template>

<script>
import SongFilterControls from './SongFilterControls.vue';
import BlacklistManager from './BlacklistManager.vue';
import SongDisplay from './SongDisplay.vue';
import ErrorMessage from './ErrorMessage.vue';
import SongsMemory from './SongsMemory.vue';
import SelectDifficulty from './SelectDifficulty.vue';
import PaymentOptionToggle from './PaymentOptionToggle.vue';

export default {
  name: 'RandomSongSelector',
  components: {
    SongFilterControls,
    BlacklistManager,
    SongDisplay,
    ErrorMessage,
    SongsMemory,
    SelectDifficulty,
    PaymentOptionToggle,
  },
  data() {
    return {
        minLevel: null,
        maxLevel: null,
        selectedDifficulty: ['Master', 'Insanity', 'Ravage'],
        blacklistedSongs: [], // Stores { id, title, difficulty } objects
        allSongs: [],
        currentSong: null,
        errorMessage: '',
        songsMemory: [], // 選曲履歴を保持するための配列
        OnlyNonPayingSongs: false
    };
  },
  methods: {
    selectRandomSong() {
      this.currentSong = null; // 前回の選曲結果をクリア
      this.errorMessage = ''; // エラーメッセージをクリア

      let availableSongs = this.allSongs;

      // 難易度でフィルタリング
      const selectedDifficultiesSet = new Set(
        this.selectedDifficulty.map(d => d.toLowerCase())
      );
      availableSongs = availableSongs.filter(song =>
        song.difficulty && selectedDifficultiesSet.has(song.difficulty.toLowerCase())
      );

      if (this.minLevel !== null && !isNaN(this.minLevel)) {
          availableSongs = availableSongs.filter(song => song.level >= this.minLevel);
      }

      if (this.maxLevel !== null && !isNaN(this.maxLevel)) {
          availableSongs = availableSongs.filter(song => song.level <= this.maxLevel);
      }

      if (this.OnlyNonPayingSongs) {
          availableSongs = availableSongs.filter(song => !song.is_paying);
      }

      // ブラックリスト処理: title と difficulty の両方が一致する場合に除外
      if (Array.isArray(this.blacklistedSongs) && this.blacklistedSongs.length > 0) {
          const blacklistSet = new Set(
              this.blacklistedSongs.map(item => `${item.title};;${item.difficulty}`)
          );

          if (blacklistSet.size > 0) {
              availableSongs = availableSongs.filter(song => {
                  const songIdentifier = `${song.title};;${song.difficulty}`;
                  return !blacklistSet.has(songIdentifier);
              });
          }
      }

      if (availableSongs.length === 0) {
          this.errorMessage = "該当する曲が見つかりませんでした。";
          return;
      }

      const randomIndex = Math.floor(Math.random() * availableSongs.length);
      this.currentSong = availableSongs[randomIndex];

      if (this.currentSong) {
        console.log('選曲された曲:', this.currentSong);
        this.addSongToMemory(this.currentSong); // 選曲履歴に追加
      }
    },

    addSongToMemory(song) {
      // 選曲履歴に曲を追加
        this.songsMemory.push(song);
    },
  },


  async mounted() {
    try {
      // Nuxtが提供する$fetchを使用してAPIからデータを取得
      const songs = await $fetch('/api/songs');
      this.allSongs = songs;
      console.log('全曲の読み込みが完了しました。');
    } catch (error) {
      this.errorMessage = '曲データの読み込みに失敗しました。';
      console.error('Failed to fetch songs:', error);
    }
  },
};
</script>

<style scoped>
.title {
  color: white; /* Changed to white to be visible on the new background */
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.button-container {
  text-align: center;
  margin-top: 20px;
}

/* Add styles for the new option group */
.input-group {
  margin-bottom: 15px;
  text-align: left;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
/* Keep other specific styles if necessary, but remove general layout styles */
</style>