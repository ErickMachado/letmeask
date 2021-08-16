<template>
  <input
    type="text"
    class="text-field"
    @input="$emit('action:input', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextField',
})
</script>

<style lang="scss" scoped>
.text-field {
  background-color: #fff;
  border: 1px solid $gray-medium;
  border-radius: 0.8rem;
  color: $black;
  padding: 1.4rem;
  &:focus {
    border-color: $purple;
  }
}
</style>
