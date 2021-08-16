<template>
  <button
    @click="$emit('action:click')"
    :class="[
      'btn',
      { 'is-primary': isPrimary },
      { 'is-danger': isDanger },
      { 'is-neutral': isNeutral },
      { 'is-outline': isOutline },
    ]"
  >
    <slot name="icon" />
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    isDanger: {
      default: false,
      required: false,
      type: Boolean,
    },
    isNeutral: {
      default: false,
      required: false,
      type: Boolean,
    },
    isOutline: {
      default: false,
      required: false,
      type: Boolean,
    },
    isPrimary: {
      default: false,
      required: false,
      type: Boolean,
    },
    text: {
      default: '',
      required: false,
      type: String,
    },
  },
})
</script>

<style lang="scss" scoped>
.btn {
  align-items: center;
  background-color: transparent;
  border: 1px solid $gray-medium;
  border-radius: 0.8rem;
  color: $black;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  gap: 0.8rem;
  justify-content: center;
  padding: 1.4rem 3.2rem;
  transition: all 0.3s ease;
  &:hover {
    border-color: $gray-medium-hover;
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &.is-primary {
    background-color: $purple;
    border: none;
    color: $details;
    &:hover {
      background-color: $purple-hover;
    }
  }
  &.is-danger {
    background-color: $danger;
    border: none;
    color: $details;
    &:hover {
      background-color: $danger-hover;
    }
  }
  &.is-neutral {
    background-color: $gray-light;
    border: none;
    color: $gray-dark;
    &:hover {
      background-color: $gray-light-hover;
    }
  }
  &.is-outline {
    border-color: $purple;
    color: $purple;
    &:hover {
      border-color: $purple-hover;
      color: $purple-hover;
    }
  }
}
</style>
