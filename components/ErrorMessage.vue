<template>
  <div v-if="message" class="error-message">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.error-message {
  margin-top: 20px; padding: 15px; background-color: #ffe6e6; border: 1px solid #ff0000; border-radius: 5px; color: #ff0000; font-weight: bold;
}
</style>