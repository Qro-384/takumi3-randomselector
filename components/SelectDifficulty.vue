<template>
  <div class="difficulty-selector">
    <button
      v-for="difficulty in difficulties"
      :key="difficulty"
      class="button"
      :class="[`btn-${difficulty.toLowerCase()}`, { 'is-selected': isSelected(difficulty) }]"
      @click="toggleDifficulty(difficulty)"
    >
      {{ difficulty }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SelectDifficulty',
  props: {
    selectedDifficulty: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:selectedDifficulty'],
  data() {
    return {
      difficulties: ['Hard', 'Master', 'Insanity', 'Ravage'],
    };
  },
  methods: {
    isSelected(difficulty) {
      // Check if the difficulty is in the selected array
      return this.selectedDifficulty.includes(difficulty);
    },
    toggleDifficulty(difficulty) {
      // Create a new array from the prop to avoid direct mutation
      const newSelection = [...this.selectedDifficulty];
      const index = newSelection.indexOf(difficulty);

      if (index > -1) {
        // If it exists, remove it
        newSelection.splice(index, 1);
      } else {
        // If it doesn't exist, add it
        newSelection.push(difficulty);
      }
      
      // Emit the updated array
      this.$emit('update:selectedDifficulty', newSelection);
    },
  },
};
</script>

<style scoped>
.difficulty-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  justify-content: center; /* Flexアイテム（ボタン）を中央揃えにする */
}

.button {
  padding: 8px 15px;
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.2s;
  font-weight: bold;
}

.button:hover:not(.is-selected) {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 難易度ごとの色設定 (非選択時はテキストとボーダーの色) */
.btn-hard { color: orange; border-color: orange; }
.btn-master { color: purple; border-color: purple; }
.btn-insanity { color: gray; border-color: gray; }
.btn-ravage { color: red; border-color: red; }

/* 選択時のスタイル反転 */
.btn-hard.is-selected { background-color: orange; color: white; }
.btn-master.is-selected { background-color: purple; color: white; }
.btn-insanity.is-selected { background-color: gray; color: white; }
.btn-ravage.is-selected { background-color: red; color: white; }

.button.is-selected {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>