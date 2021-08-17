<template>
  <div class="room">
    <Header />
    <div class="room__content container">
      <h1>Sala {{ getRoom.name }}</h1>
      <div class="room__new-question">
        <TextAreaField
          @action:input="(value) => (questionContent = value)"
          placeholder="O que você quer perguntar?"
        />
        <div class="room__actions">
          <p v-if="!getUser.id" class="room__make-login">
            Para enviar uma pergunta,
            <span @click="authenticate">faça seu login.</span>
          </p>
          <div v-else class="room__user">
            <img :src="getUser.photoURL" :alt="getUser.name" />
            <span>{{ getUser.name }}</span>
          </div>
          <Button
            @action:click="handleQuestionCreation"
            text="Enviar pergunta"
            is-primary
            :disabled="!getUser.id || !questionContent"
          />
        </div>
      </div>
      <QuestionList :questions="questions" />
    </div>
  </div>
</template>

<script lang="ts">
import { Button, TextAreaField } from '@/components/atoms'
import { Header } from '@/components/molecules'
import { QuestionList } from '@/components/organisms'
import { mapGetters, mapActions } from 'vuex'
import { defineComponent } from 'vue'
import firebase from 'firebase/app'

export default defineComponent({
  components: {
    Button,
    Header,
    QuestionList,
    TextAreaField,
  },
  computed: {
    ...mapGetters(['getRoom', 'getUser']),
  },
  async created() {
    try {
      await this.enterRoom(this.$route.params.id)
      const roomRef = firebase.database().ref(`rooms/${this.$route.params.id}`)
      roomRef.on('value', (room) => {
        this.questions = room.val().questions || {}
      })
    } catch (error) {
      this.$notify({
        title: 'Erro',
        text: 'Sala inexistente',
        type: 'error',
      })
      this.$router.push({ name: 'auth' })
    }
  },
  data() {
    return {
      questions: {},
      questionContent: '',
    }
  },
  methods: {
    ...mapActions(['authenticate', 'createQuestion', 'enterRoom']),
    async handleQuestionCreation(): Promise<void> {
      const { questionContent } = this
      const user = this.getUser
      try {
        await this.createQuestion({
          authorName: user.name,
          authorPhotoURL: user.photoURL,
          content: questionContent,
        })
      } catch (error) {
        alert(error)
      }
    },
  },
  name: 'Room',
})
</script>

<style lang="scss" scoped>
.room {
  &__content {
    margin-top: 6.4rem;
    & > h1 {
      font-size: 2.4rem;
      margin: 0 auto;
      max-width: 800px;
      width: 100%;
    }
  }
  &__new-question {
    margin-top: 2.4rem;
    margin: 3.2rem auto 0;
    max-width: 800px;
    width: 100%;
    & > .textarea-field {
      height: 133px;
      width: 100%;
    }
  }
  &__actions {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 1.6rem;
  }
  &__make-login {
    color: $gray-dark;
    font-size: 1.4rem;
    & > span {
      color: $purple;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  &__user {
    align-items: center;
    display: flex;
    & > img {
      border-radius: 50%;
      height: 32px;
      width: 32px;
    }
    & > span {
      font-size: 1.4rem;
      margin-left: 0.8rem;
    }
  }
  & .questions,
  & .no-quest {
    margin: 0 auto;
    max-width: 800px;
    margin-top: 6.4rem;
  }
}
</style>
