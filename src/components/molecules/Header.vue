<template>
  <div>
    <header class="header">
      <nav class="nav container">
        <div class="nav__brand">
          <Logo />
        </div>
        <div class="nav__actions">
          <CopyButton :roomCode="$route.params.id" />
          <Button
            @action:click="isModalVisible = true"
            v-show="getUser.id === getRoom.author"
            text="Encerrar sala"
            is-outline
          />
        </div>
      </nav>
    </header>
    <Modal
      v-show="isModalVisible"
      title="Encerrar sala?"
      text="Tem certeza que deseja encerrar essa sala?"
    >
      <template #icon>
        <img src="@/assets/images/icon-close.svg" alt="" />
      </template>
      <template #buttons>
        <Button
          @action:click="isModalVisible = false"
          text="Cancelar"
          is-neutral
        />
        <Button
          @action:click="handleCloseRoom"
          text="Sim, encerrar"
          is-danger
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue'
import { Button, Logo } from '@/components/atoms'
import { CopyButton } from '@/components/molecules'
import firebase from 'firebase/app'

export default defineComponent({
  components: {
    Button,
    CopyButton,
    Logo,
  },
  computed: {
    ...mapGetters(['getUser', 'getRoom']),
  },
  data() {
    return {
      isModalVisible: false,
    }
  },
  methods: {
    ...mapActions(['closeRoom']),
    async handleCloseRoom() {
      try {
        firebase.database().ref(`rooms/${this.$route.params.id}`).off('value')
        await this.closeRoom()
        this.$router.push({ name: 'auth' })
      } catch (error) {
        this.$notify({
          text: error,
          type: 'error',
        })
      }
    },
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
  padding: 2.4rem 1.5rem;
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
