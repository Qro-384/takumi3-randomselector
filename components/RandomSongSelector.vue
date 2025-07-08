<template>
  <div id="random-song-selector">
    <h1 class="title">TAKUMI³ Random Song Sel³ctor</h1>

    <div class="controls">
      <h2>選曲条件</h2>
      <SongFilterControls
        v-model:minLevel="minLevel"
        v-model:maxLevel="maxLevel"
      />
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
      
      <button @click="selectRandomSong">ランダム選曲！</button>
    </div>

    <SongDisplay v-if="currentSong" :song="currentSong" />

    <ErrorMessage v-if="errorMessage" :message="errorMessage" />

    <SongsMemory v-if="songsMemory.length > 0" v-model="songsMemory"/>
  </div>
</template>

<script>
import SongFilterControls from './SongFilterControls.vue';
import BlacklistManager from './BlacklistManager.vue';
import SongDisplay from './SongDisplay.vue';
import ErrorMessage from './ErrorMessage.vue';
import SongsMemory from './SongsMemory.vue';
import SelectDifficulty from './SelectDifficulty.vue';

export default {
  name: 'RandomSongSelector',
  components: {
    SongFilterControls,
    BlacklistManager,
    SongDisplay,
    ErrorMessage,
    SongsMemory,
    SelectDifficulty,
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
#random-song-selector {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 200px;
  margin-right: 200px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.title {
  color: black;
}

.controls {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

button {
  background-color: #42b983;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 10px;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #36a172;
}
</style>