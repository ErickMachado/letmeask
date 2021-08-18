<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__content">
        <header class="modal__icon">
          <slot name="icon" />
        </header>
        <main class="modal__text">
          <h1>{{ title }}</h1>
          <p>{{ text }}</p>
        </main>
        <footer class="modal__actions">
          <slot name="buttons" />
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    title: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
  },
})
</script>

<style lang="scss" scoped>
.overlay {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
}

.modal {
  animation: modal 0.5s ease forwards;
  background-color: $details;
  border-radius: 0.8rem;
  padding: 6.4rem 11.2rem;
  &__content {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  &__text {
    margin-top: 2.4rem;
    text-align: center;
    & > h1 {
      font-size: 2.4rem;
      line-height: 3.4rem;
    }
    & > p {
      color: $gray-dark;
      margin-top: 1.2rem;
    }
  }
  &__actions {
    display: flex;
    gap: 0.8rem;
    margin-top: 4rem;
  }
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translate3d(0, -30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
