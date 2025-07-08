<template>
  <div>
    <div class="input-group">
      <label for="min-level">最小レベル:</label>
      <input type="number" 
        id="min-level" 
        :value="minLevel" 
        @input="handleInput($event, 'minLevel')" 
        @change="formatOnChange($event)"
        step="0.1" 
        placeholder="例: 14.0">
    </div>
    <div class="input-group">
      <label for="max-level">最大レベル:</label>
      <input type="number" 
        id="max-level" 
        :value="maxLevel" 
        @input="handleInput($event, 'maxLevel')" 
        @change="formatOnChange($event)"
        step="0.1" 
        placeholder="例: 14.9">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongFilterControls',
  props: {
    minLevel: {
      type: Number,
      default: null
    },
    maxLevel: {
      type: Number,
      default: null
    }
  },
  emits: ['update:minLevel', 'update:maxLevel'],
  methods: {
    // 入力中に親コンポーネントのデータを更新するメソッド
    handleInput(event, type) {
      const value = event.target.value;
      // 'update:minLevel' または 'update:maxLevel' イベントを通知
      this.$emit(`update:${type}`, value === '' ? null : Number(value));
    },
    // フォーカスが外れたときに表示をフォーマットするメソッド
    formatOnChange(event) {
      const value = event.target.value;
      // 値が空でなく、かつ有効な数値の場合のみフォーマットする
      if (value !== '' && !isNaN(Number(value))) {
        event.target.value = Number(value).toFixed(1);
      }
    }
  }
}
</script>

<style scoped>
.input-group {
  margin-bottom: 15px;
  text-align: left;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.input-group input[type="number"] {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
</style>