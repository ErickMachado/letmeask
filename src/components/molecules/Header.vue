<template>
  <header class="header">
    <nav class="nav container">
      <div class="nav__brand">
        <Logo />
      </div>
      <div class="nav__actions">
        <CopyButton :roomCode="$route.params.id" />
        <Button
          v-show="getUser.id === getRoom.author"
          text="Encerrar sala"
          is-outline
        />
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Button, Logo } from '@/components/atoms'
import { CopyButton } from '@/components/molecules'
import { mapGetters } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Button,
    CopyButton,
    Logo,
  },
  computed: {
    ...mapGetters(['getUser', 'getRoom']),
  },
  name: 'Header',
})
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  border-bottom: 1px solid $gray-light;
}

.nav {
  display: flex;
  justify-content: space-between;
  padding: 2.4rem 0;
  &__brand {
    max-width: 100px;
  }
  &__actions {
    display: flex;
    gap: 0.8rem;
    & > .copy-btn {
      height: 40px;
      padding-right: 1.6rem;
    }
    & > button:last-child {
      height: 40px;
    }
  }
}
</style>
