<template>
  <div class="room-creation">
    <h1>Crie uma nova sala</h1>
    <form @submit.prevent="handleRoomCreation" class="room-creation__form">
      <TextField
        @action:input="(value) => (roomName = value)"
        placeholder="Nome da sala"
      />
      <Button text="Criar sala" is-primary :disabled="!roomName || isLoading" />
    </form>
    <p>
      Quer entrar em uma sala já existente?
      <span @click="$emit('action:back', 'RoomEntrance')">Clique aqui</span>
    </p>
  </div>
</template>

<script lang="ts">
import { TextField, Button } from '@/components/atoms'
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Button,
    TextField,
  },
  computed: {
    ...mapGetters(['getRoom']),
  },
  data() {
    return {
      isLoading: false,
      roomName: '',
    }
  },
  methods: {
    ...mapActions(['createRoom']),
    async handleRoomCreation() {
      this.isLoading = true
      try {
        await this.createRoom(this.roomName)
        this.$router.push({ name: 'room', params: { id: this.getRoom.id } })
      } catch (error) {
        this.$notify({
          text: error,
          type: 'error',
        })
      } finally {
        this.isLoading = false
      }
    },
  },
  name: 'RoomCreation',
})
</script>

<style lang="scss" scoped>
.room-creation {
  display: flex;
  flex-direction: column;
  & > h1 {
    margin: 5.6rem 0 2.4rem;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
  & > p {
    color: $gray-medium;
    font-size: 1.4rem;
    margin-top: 1.6rem;
    text-align: center;
    & > span {
      color: $pink-dark;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
