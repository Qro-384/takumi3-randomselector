<template>
  <div class="song-display">
    <h2>選ばれた曲</h2>
    <p><strong>タイトル:</strong> {{ song.title }}[<span :class="difficultyClass(song)">{{ song.difficulty }}</span>]</p>
    <p><strong>レベル:</strong> {{ song.level.toFixed(1) }}</p>
  </div>
</template>

<script>
// import { getDifficultyClass } from './utils/styleUtils';
export default {
  name: 'SongDisplay',
  props: {
    song: {
      type: Object,
      required: true
    }
  },

  methods: {
    difficultyClass(song) {
      if (!song || !song.difficulty) {
        return '';
      }
      const difficulty = song.difficulty.toLowerCase();
      switch (difficulty) {
        case 'hard': return 'difficulty-hard';
        case 'master': return 'difficulty-master';
        case 'insanity': return 'difficulty-insanity';
        case 'ravage': return 'difficulty-ravage';
        default: return '';
        }
    }
  }

}
</script>

<style scoped>
.difficulty-hard { color: orange; }
.difficulty-master { color: purple; }
.difficulty-insanity { color: gray; }
.difficulty-ravage { color: red; }
.song-display { margin-top: 30px; padding: 20px; border: 1px dashed #42b983; border-radius: 5px; background-color: #e6ffee; }
.song-display p { margin: 8px 0; font-size: 1.1rem; }
.song-display strong { color: #2c3e50; }
.difficulty-default {
  color: grey;
}
</style>