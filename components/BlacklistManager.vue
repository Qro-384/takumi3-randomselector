<template>
  <div class="blacklist-section glass-card">
    <h3>ブラックリスト指定</h3>
    <div class="input-group">
      <label for="search-song">曲を検索して追加:</label>
      <input type="text" id="search-song" v-model="searchKeyword" placeholder="曲名や難易度で検索">
    </div>

    <ul v-if="filteredSearchResults.length > 0" class="search-results">
      <li v-for="song in filteredSearchResults" :key="song.id" @click="addSongToBlacklist(song)" :class="{ 'is-blacklisted': isSongBlacklisted(song) }">
        {{ song.title }} [{{ song.difficulty || '?' }}] (Level: {{ song.level >= 13 ? song.level.toFixed(1) : song.level.toFixed(0) }})
        <span v-if="isSongBlacklisted(song)" class="blacklisted-indicator">（追加済み）</span>
      </li>
    </ul>
    <p v-else-if="searchKeyword && filteredSearchResults.length === 0" class="no-results">検索結果がありません。</p>

    <div v-if="modelValue.length > 0" class="current-blacklist">
      <h4>現在のブラックリスト:</h4>
      <ul>
        <li v-for="(song, index) in modelValue" :key="song.id || `${song.title}-${song.difficulty}-${index}`">
          {{ song.title }} [{{ song.difficulty || '?' }}]
          <button @click="removeSongFromBlacklist(song)">解除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlacklistManager',
  props: {
    modelValue: { // v-model for blacklistedSongs
      type: Array,
      required: true
    },
    allSongs: {
      type: Array,
      required: true
    },
    minLevel: {
      type: Number,
      default: null
    },
    maxLevel: {
      type: Number,
      default: null
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      searchKeyword: '',
      searchDictionary: {
        'Я':'R',
        '!':'I',
        'Σ':'E',
        '(?,':'G',
        '≠':'overlimit',
        'α':'a',
        'η':'eta',
        '³':'3'
      }
    };
  },
  computed: {
    filteredSearchResults() {
      if (!this.searchKeyword) {
        return [];
      }
      const keyword = this.normalizeForSearch(this.searchKeyword);
      if (!keyword) {
        return [];
      }

      let filtered = this.allSongs.filter(song =>
        (song.title && this.normalizeForSearch(song.title).includes(keyword)) ||
        (song.difficulty && song.difficulty.toLowerCase().includes(keyword)) ||
        (song.level && String(song.level).includes(keyword))
      );

      if (this.minLevel !== null && this.maxLevel !== null) {
        filtered = filtered.filter(song => song.level >= this.minLevel && song.level <= this.maxLevel);
      } else if (this.minLevel !== null) {
        filtered = filtered.filter(song => song.level >= this.minLevel);
      } else if (this.maxLevel !== null) {
        filtered = filtered.filter(song => song.level <= this.maxLevel);
      }

      return filtered;
    }
  },
  methods: {
    normalizeForSearch(str) {
      if (typeof str !== 'string') return '';
      let result = str;
      for (const [char, replacement] of Object.entries(this.searchDictionary)) {
        result = result.replaceAll(char, replacement);
      }
      return result.toLowerCase().replace(/\s/g, '');
    },
    addSongToBlacklist(songToAdd) {
      if (this.isSongBlacklisted(songToAdd)) {
        return;
      }
      const newBlacklist = [...this.modelValue, {
        id: songToAdd.id,
        title: songToAdd.title,
        difficulty: songToAdd.difficulty
      }];
      this.$emit('update:modelValue', newBlacklist);
      this.searchKeyword = '';
    },
    removeSongFromBlacklist(songToRemove) {
      const newBlacklist = this.modelValue.filter(
        bs => !(bs.title === songToRemove.title && bs.difficulty === songToRemove.difficulty)
      );
      this.$emit('update:modelValue', newBlacklist);
    },
    isSongBlacklisted(song) {
      return this.modelValue.some(
        bs => bs.title === song.title && bs.difficulty === song.difficulty
      );
    }
  }
}
</script>

<style scoped>
.input-group { margin-bottom: 15px; text-align: left; }
.input-group label { display: block; margin-bottom: 5px; font-weight: bold; color: #eee; }
.input-group input[type="text"] {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
}
.input-group input[type="text"]::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.blacklist-section { margin-top: 25px; padding-top: 20px; }
.blacklist-section h3, .current-blacklist h4 { color: #fff; text-shadow: 1px 1px 3px rgba(0,0,0,0.2); }
.search-results {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05); /* Lighter glass for search results */
  text-align: left;
}
.search-results li {
  padding: 10px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  color: #fff;
}
.search-results li:last-child { border-bottom: none; }
.search-results li:hover { background-color: rgba(255, 255, 255, 0.15); }
.search-results li.is-blacklisted {
  background-color: rgba(255, 99, 71, 0.2); /* Tomato red for blacklisted */
  color: #ccc;
  cursor: default;
}
.search-results li.is-blacklisted:hover { background-color: rgba(255, 99, 71, 0.3); }
.blacklisted-indicator { font-size: 0.8em; color: #ff8a80; margin-left: 5px; }
.no-results { font-style: italic; color: #aaa; margin-top: 10px; }
.current-blacklist {
  margin-top: 20px;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.08); /* Slightly different glass for current blacklist */
}
.current-blacklist h4 { margin-top: 0; margin-bottom: 10px; color: #fff; }
.current-blacklist ul { list-style: none; padding: 0; }
.current-blacklist li {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.current-blacklist li button {
  background-color: rgba(244, 67, 54, 0.5); /* Red for remove button */
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 0;
  transition: background-color 0.2s ease;
}
.current-blacklist li button:hover {
  background-color: rgba(211, 47, 47, 0.7);
}
</style>