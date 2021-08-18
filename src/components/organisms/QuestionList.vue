<template>
  <ul v-if="hasQuestions" class="questions">
    <Question
      v-for="(question, key) in questions"
      @action:delete="handleQuestionExclusion"
      :key="key"
      :question="{ ...question, id: key }"
    />
    <Modal
      v-show="isModalVisible"
      title="Excluir pergunta?"
      text="Tem certeza que deseja excluir esta pergunta?"
    >
      <template #icon>
        <img src="@/assets/images/icon-trash-danger.svg" alt="" />
      </template>
      <template #buttons>
        <Button @click="closeModal" text="Cancelar" is-neutral />
        <Button
          @action:click="executeExclusion"
          text="Sim, excluir"
          is-danger
        />
      </template>
    </Modal>
  </ul>
  <div v-else class="no-quest">
    <img src="@/assets/images/image-no-quest.svg" alt="" />
    <h2>Nenhuma pergunta por aqui...</h2>
    <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta.</p>
  </div>
</template>

<script lang="ts">
import { Button } from '@/components/atoms'
import { Question } from '@/components/molecules'
import { mapActions } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Button, Question },
  computed: {
    hasQuestions(): number {
      return Object.values(this.questions).length || 0
    },
  },
  data() {
    return {
      isModalVisible: false,
      selectedQuestionId: '',
    }
  },
  methods: {
    ...mapActions(['deleteQuestion']),
    closeModal() {
      this.isModalVisible = false
      this.selectedQuestionId = ''
    },
    async executeExclusion() {
      try {
        await this.deleteQuestion(this.selectedQuestionId)
        this.$notify({
          text: 'Pergunta excluida com sucesso',
          type: 'success',
        })
        this.isModalVisible = false
        this.selectedQuestionId = ''
      } catch (error) {
        this.$notify({
          text: error,
          type: 'error',
        })
      }
    },
    handleQuestionExclusion(questionId: string) {
      this.isModalVisible = true
      this.selectedQuestionId = questionId
    },
  },
  name: 'QuestionList',
  props: {
    questions: {
      required: true,
      type: Object,
    },
  },
})
</script>

<style lang="scss" scoped>
.questions {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
.no-quest {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  & > h2 {
    font-size: 1.8rem;
    margin-top: 3.2rem;
  }
  & > p {
    color: $gray-medium;
    font-size: 1.4rem;
    line-height: 2.1rem;
    margin-top: 0.8rem;
    max-width: 284px;
    text-align: center;
  }
}
</style>
