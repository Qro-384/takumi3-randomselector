<template>
  <div class="payment-option-toggle">
    <button @click="toggle" class="glass-button" :class="{ 'is-active': modelValue }">
      <slot/>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaymentOptionToggle',
  props: {
    modelValue: { // v-model for OnlyNonPayingSongs
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    toggle() {
      this.$emit('update:modelValue', !this.modelValue);
    },
  },
};
</script>

<style scoped>
.payment-option-toggle {
  margin-bottom: 15px;
  text-align: left;
}

.glass-button {
  /* 既存のスタイルを流用しつつ、アクティブ状態のスタイルを追加 */
  transition: background-color 0.2s, transform 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  /* 日本語フォントを見やすいものに設定 */
  font-family: "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
}

.glass-button.is-active {
  background-color: rgba(76, 175, 80, 0.5); /* 緑系の色でアクティブ状態を示す */
  transform: scale(1.05);
  border-color: rgba(76, 175, 80, 0.7);
}
</style>