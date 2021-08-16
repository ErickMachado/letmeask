<template>
  <span class="separator">{{ text }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Separator',
  props: {
    text: {
      required: true,
      type: String,
    },
  },
})
</script>

<style lang="scss" scoped>
.separator {
  align-items: center;
  color: $gray-medium;
  display: flex;
  font-size: 1.4rem;
  gap: 1.6rem;
  &::before,
  &::after {
    background-color: currentColor;
    content: '';
    display: block;
    height: 1px;
    width: 70px;
  }
}
</style>
