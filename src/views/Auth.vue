<template>
  <div class="auth">
    <div class="auth__left-side">
      <div class="auth__presentation">
        <img src="@/assets/images/image-login.svg" alt="" />
        <h1>Toda pergunta tem uma resposta.</h1>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </div>
    </div>
    <div class="auth__right-side">
      <div class="auth__box">
        <div class="auth__brand">
          <Logo />
        </div>
        <transition name="auth" mode="out-in">
          <component
            :is="activeStep"
            @action:next="(value) => (activeStep = value)"
            @action:back="(value) => (activeStep = value)"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Logo } from '@/components/atoms'
import { RoomEntrance, RoomCreation } from '@/components/organisms'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Logo,
    RoomEntrance,
    RoomCreation,
  },
  data() {
    return {
      activeStep: 'RoomEntrance',
    }
  },
  name: 'Auth',
})
</script>

<style lang="scss" scoped>
.auth-enter,
.auth-leave-to {
  opacity: 0;
  transform: translate3d(30px, 0, 0);
}

.auth-enter-active,
.auth-leave-active {
  transition: all 0.5s ease;
}

.auth {
  display: grid;
  grid-template-columns: 40% 1fr;
  height: 100%;
  width: 100%;
  &__left-side {
    align-items: center;
    background-color: $purple;
    display: flex;
    padding-left: 8.4rem;
  }
  &__presentation {
    & > h1 {
      color: #fff;
      font-size: 3.6rem;
      font-weight: 700;
      line-height: 4.2rem;
      max-width: 440px;
      margin: 0.8rem 0 1.6rem;
    }
    & > p {
      color: #fff;
      font-size: 2.4rem;
      line-height: 3.2rem;
      max-width: 460px;
      opacity: 0.7;
    }
  }
  &__right-side {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  &__box {
    align-items: center;
    display: flex;
    flex-direction: column;
    max-width: 320px;
    width: 100%;
  }
  &__brand {
    max-width: 154px;
  }
}
</style>
