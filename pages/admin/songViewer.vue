<template>
  <div class="song-viewer-container">
    <h1 class="title">楽曲レベル別 曲数一覧</h1>

    <div v-if="pending" class="loading-message">
      読み込み中...
    </div>

    <div v-else-if="error" class="error-message">
      <p>データの読み込みに失敗しました。</p>
      <pre>{{ error.message }}</pre>
    </div>

    <div v-else class="table-container glass-card">
      <table>
        <thead>
          <tr>
            <th>レベル</th>
            <th>曲数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="[level, count] in sortedLevelCounts" :key="level">
            <td>{{ level }}</td>
            <td>{{ count }} 曲</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><strong>合計</strong></td>
            <td><strong>{{ totalSongs }} 曲</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// useFetchを使用してAPIから楽曲データを取得します。
// pending: 読み込み状態, error: エラー情報
const { data: allSongs, pending, error } = await useFetch('/api/songs');

// レベルごとに曲数を集計する算出プロパティ
const levelCounts = computed(() => {
  if (!allSongs.value) {
    return {};
  }
  // reduceを使って { level: count } の形式のオブジェクトを生成
  return allSongs.value.reduce((acc, song) => {
    const level = song.level.toFixed(1); // レベルを小数点第一位に統一
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});
});

// 集計結果をレベルの昇順でソートする算出プロパティ
const sortedLevelCounts = computed(() => {
  return Object.entries(levelCounts.value).sort(([a], [b]) => Number(a) - Number(b));
});

// 全曲数を計算する算出プロパティ
const totalSongs = computed(() => {
  return allSongs.value?.length || 0;
});
</script>

<style scoped>
.song-viewer-container { max-width: 800px; margin: 40px auto; padding: 20px; color: #fff; }
.title { text-align: center; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
.loading-message, .error-message { text-align: center; font-size: 1.2rem; }
.error-message { color: #ff8a80; }
.table-container { padding: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.2); }
thead th { background-color: rgba(255, 255, 255, 0.15); font-weight: bold; }
tbody tr:hover { background-color: rgba(255, 255, 255, 0.1); }
tfoot td { font-weight: bold; border-top: 2px solid rgba(255, 255, 255, 0.3); }
</style>