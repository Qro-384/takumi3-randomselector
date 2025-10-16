<template>
  <div class="song-display glass-card">
    <h2>選ばれた曲</h2>
    <p>{{ song.title }}[<span :class="difficultyClass(song)">{{ song.difficulty }}</span>]</p>
    <p><strong>Lv.</strong> {{formatLevel(song.level)}}</p>
  </div>
</template>

<script>
// import { getDifficultyClass } from './utils/styleUtils';
import { formatLevel } from './utils/showUtils';
export default {
  name: 'SongDisplay',
  props: {
    song: {
      type: Object,
      required: true
    }
  },  

  methods: {
    formatLevel,
    difficultyClass(song) {
      if (!song || !song.difficulty) {
        return '';
      }
      const difficulty = song.difficulty.toLowerCase();
      switch (difficulty) {
        case 'normal': return 'difficulty-normal';
        case 'hard': return 'difficulty-hard';
        case 'master': return 'difficulty-master';
        case 'insanity': return 'difficulty-insanity';
        case 'ravage': return 'difficulty-ravage';
        case 'chart lab': return 'difficulty-chartlab';
        default: return '';
        }
    }
  }

}
</script>

<style scoped>
.song-display {
    margin: 40px auto 0 auto; /* Increased top margin and centered */
    padding: 25px;
    text-align: center;
    background: rgba(76, 175, 80, 0.25); /* Greenish glass background */
    border: 1px solid rgba(76, 175, 80, 0.4); /* Matching green border */
    transform: scale(1.05); /* Make it pop a bit */
    box-shadow: 0 4px 20px rgba(0,0,0,0.3); /* Slightly stronger shadow */
    max-width: 90%;
}

.song-display h2 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.song-display p {
    margin: 12px 0;
    font-size: 1.25rem;
}
.song-display strong {
    color: #fff;
    font-weight: bold;
}
.difficulty-normal { color: #90caf9; text-shadow: 1px 1px 2px rgba(0,0,0,0.7); font-weight: bold; }
.difficulty-hard { color: #ffd54f; text-shadow: 1px 1px 2px rgba(0,0,0,0.7); font-weight: bold; }
.difficulty-master { color: #ce93d8; text-shadow: 1px 1px 2px rgba(0,0,0,0.7); font-weight: bold; }
.difficulty-insanity { color: #e0e0e0; text-shadow: 1px 1px 2px rgba(0,0,0,0.7); font-weight: bold; }
.difficulty-ravage { color: #ff5252; text-shadow: 1px 1px 2px rgba(0,0,0,0.7); font-weight: bold; }
.difficulty-chartlab { color: #34c039; text-shadow: 1px 1px 2px rgba(0,0,0,0.7); font-weight: bold; }
.difficulty-default {
  color: #eee;
}
</style>