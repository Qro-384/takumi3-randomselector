<template>
    <div class="song-memory glass-card">
        <p>選曲履歴</p>
        <div class="song-list">
        <ul>
            <li v-for="song in reversedSongHistory" :key="song.id || `${song.title}-${song.difficulty}`" class="song-item glass-card">
              <div class="song-details">
                <span class="song-title" :title="song.title" :class="difficultyClass(song)">{{ song.title }}</span>
                <span class="song-difficulty-text">[<span :class="difficultyClass(song)">{{ song.difficulty }}</span>]</span>
                <span class="song-level">Lv. {{ song.level.toFixed(1) }}</span>
              </div>
              <button @click="$emit('update:modelValue', modelValue.filter(s => s.id !== song.id))" class="glass-button danger">削除</button>
            </li>
        </ul>
        </div>
    
        <div class="controls">
        <button @click="clearMemory" class="glass-button">全て削除</button>
        </div>
    </div>
</template>

<script>
// import { getDifficultyClass } from './utils/styleUtils';
export default {
    name: 'SongMemory',
    props: {
        modelValue: { // v-model for song memory
            type: Array,
            default: () => [],
        }
    },
    emits: ['update:modelValue'],
    computed: {
        reversedSongHistory() {
            // 元のプロパティを直接変更せず、表示用に逆順のコピーを作成する
            return [...this.modelValue].reverse();
        }
    },
    methods: {
        clearMemory() {
            this.$emit('update:modelValue', []);
        },
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
    },
};
</script>

<style scoped>
.song-memory {
  margin-top: 30px;
  text-align: left;
}

.song-memory p {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

.song-list {
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 15px;
  padding-right: 10px;
}

.song-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.song-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 10px 15px; /* Reduced padding */
  background: rgba(255, 255, 255, 0.15); /* Slightly different background for items */
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.song-details {
  display: flex;
  align-items: center;
  flex-grow: 1;
  min-width: 0;
}

.song-title {
  flex-grow: 1;
  min-width: 50px;
  margin-right: 10px;
}

.song-difficulty-text, .song-level {
  flex-shrink: 0;
  white-space: nowrap;
  margin-right: 10px;
}

.song-item button.danger {
    background: rgba(244, 67, 54, 0.5);
}
.song-item button.danger:hover {
    background: rgba(211, 47, 47, 0.7);
}

.controls {
  text-align: right;
  margin-top: 20px;
}

/* Difficulty Colors */
.difficulty-hard { color: #ffd54f; text-shadow: 1px 1px 3px rgba(0,0,0,0.5); }
.difficulty-master { color: #ce93d8; text-shadow: 1px 1px 3px rgba(0,0,0,0.5); }
.difficulty-insanity { color: #e0e0e0; text-shadow: 1px 1px 3px rgba(0,0,0,0.5); }
.difficulty-ravage { color: #ff5252; text-shadow: 1px 1px 3px rgba(0,0,0,0.5); }

/* Responsive Design */
@media (max-width: 768px) {
  .song-difficulty-text {
    display: none;
  }
  /* On small screens, apply color to the title */
  .song-title.difficulty-hard { color: #ffd54f; }
  .song-title.difficulty-master { color: #ce93d8; }
  .song-title.difficulty-insanity { color: #e0e0e0; }
  .song-title.difficulty-ravage { color: #ff5252; }
}
</style>