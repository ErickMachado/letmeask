<template>
  <div class="copy-btn">
    <Button @action:click="handleTextCopy" class="copy-btn__btn" is-primary>
      <template #icon>
        <img src="@/assets/images/icon-copy.svg" alt="Copiar" />
      </template>
    </Button>
    <span class="copy-btn__text">Sala {{ roomCode }}</span>
  </div>
</template>

<script lang="ts">
import { Button } from '@/components/atoms'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Button,
  },
  methods: {
    handleTextCopy() {
      navigator.clipboard.writeText(this.roomCode)
    },
  },
  name: 'CopyButton',
  props: {
    roomCode: {
      required: true,
      type: String,
    },
  },
})
</script>

<style lang="scss" scoped>
.copy-btn {
  align-items: center;
  border: 1px solid $purple;
  border-radius: 0.8rem;
  display: flex;
  & > button {
    border-radius: 0.7rem 0 0 0.7rem;
    padding: 1rem 1.2rem;
  }
  &__text {
    font-weight: 500;
    margin-left: 1.2rem;
  }
}
</style>
