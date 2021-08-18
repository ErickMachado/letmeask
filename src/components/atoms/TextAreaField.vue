<template>
  <textarea
    v-model="content"
    @input="$emit('action:input', content)"
    class="textarea-field"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      content: '',
    }
  },
  name: 'TextAreaField',
})
</script>

<style lang="scss" scoped>
.textarea-field {
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 0.8rem;
  color: $black;
  font-size: 1.6rem;
  line-height: 24px;
  padding: 1.6rem;
  resize: none;
  &:focus {
    border-color: $purple;
  }
}
</style>
