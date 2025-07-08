<template>
    <div class="song-memory">
        <p>選曲履歴</p>
        <div class="song-list">
        <ul>
            <li v-for="song in reversedSongHistory" :key="song.id || `${song.title}-${song.difficulty}`" class="song-item">
              <div class="song-details">
                <span class="song-title" :title="song.title">{{ song.title }}</span>
                <span class="song-difficulty">[<span :class="difficultyClass(song)">{{ song.difficulty }}</span>]</span>
                <span class="song-level">レベル: {{ song.level.toFixed(1) }}</span>
              </div>
              <button @click="$emit('update:modelValue', modelValue.filter(s => s.id !== song.id))">削除</button>
            </li>
        </ul>
        </div>
    
        <div class="controls">
        <button @click="clearMemory">リセット</button>
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
.difficulty-hard { color: orange; }
.difficulty-master { color: purple; }
.difficulty-insanity { color: gray; }
.difficulty-ravage { color: red; }

.song-memory {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: left;
}

.difficulty-default {
  color: grey;
}

.song-memory p {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.song-list {
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 15px;
  padding-right: 5px; /* スクロールバーのスペース */
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
  padding: 10px 15px;
  margin-bottom: 8px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  transition: box-shadow 0.2s ease;
}

.song-item:hover {
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.song-details {
  display: flex;
  align-items: center;
  flex-grow: 1; /* ボタン以外の残りのスペースを埋める */
  min-width: 0; /* flexアイテムがコンテナより大きい場合に縮小できるようにする */
}

.song-title {
  flex-grow: 1; /* 利用可能なスペースを最大限に使う */
  white-space: nowrap; /* テキストを折り返さない */
  overflow: hidden; /* はみ出した部分を隠す */
  text-overflow: ellipsis; /* はみ出した部分を...で表示 */
  min-width: 50px; /* 最小幅を確保 */
  margin-right: 10px;
}

.song-difficulty {
  flex-shrink: 0; /* 縮まないようにする */
  margin-right: 10px;
  white-space: nowrap;
}

.song-level {
  flex-shrink: 0; /* 縮まないようにする */
  white-space: nowrap;
}

.song-item button,
.controls button {
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.song-item button {
  background-color: #f44336; /* Red */
  padding: 5px 10px;
  font-size: 0.85rem;
  margin-left: 15px;
  flex-shrink: 0; /* ボタンが縮まないようにする */
}

.song-item button:hover {
  background-color: #d32f2f;
}

.controls {
  text-align: right;
  margin-top: 20px;
}

.controls button {
  background-color: #757575; /* Gray */
  padding: 8px 15px;
  font-size: 0.9rem;
}

.controls button:hover {
  background-color: #616161;
}
</style>