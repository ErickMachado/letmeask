<template>
  <div>
    <div class="auth-google">
      <Button
        @action:click="handleAuthentication"
        text="Crie uma sala com o Google"
      >
        <template #icon>
          <img src="@/assets/images/icon-google.svg" alt="Google" />
        </template>
      </Button>
    </div>
    <Separator text="ou entre em uma sala" />
    <form @submit.prevent="handleRoomEntering" class="auth-form">
      <TextField
        @action:input="(value) => (roomCode = value)"
        placeholder="Digite o código da sala"
      />
      <Button text="Entrar na sala" is-primary :disabled="!roomCode">
        <template #icon>
          <img src="@/assets/images/icon-login.svg" alt="" />
        </template>
      </Button>
    </form>
  </div>
</template>

<script lang="ts">
import { Button, Separator, TextField } from '@/components/atoms'
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Button,
    Separator,
    TextField,
  },
  computed: {
    ...mapGetters(['getRoom']),
  },
  data() {
    return {
      roomCode: '',
    }
  },
  methods: {
    ...mapActions(['authenticate', 'enterRoom']),
    async handleAuthentication() {
      try {
        await this.authenticate()
        this.$emit('action:next', 'RoomCreation')
      } catch (error) {
        this.$notify({
          text: `${error} 😵‍💫`,
          type: 'error',
        })
      }
    },
    async handleRoomEntering() {
      try {
        await this.enterRoom(this.roomCode)
        this.$router.push({ name: 'room', params: { id: this.getRoom.id } })
      } catch (error) {
        this.$notify({
          text: `${error} 😵‍💫`,
          type: 'error',
        })
      }
    },
  },
  name: 'RoomEntrance',
})
</script>

<style lang="scss" scoped>
.auth-google {
  margin: 5.6rem 0 3.2rem;
  width: 100%;
  & > button {
    width: 100%;
  }
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 3.2rem;
  width: 100%;
}
</style>
