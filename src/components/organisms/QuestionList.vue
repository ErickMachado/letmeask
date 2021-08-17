<template>
  <ul v-if="hasQuestions" class="questions">
    <Question
      v-for="(question, key) in questions"
      :key="key"
      :question="{ ...question, id: key }"
    />
  </ul>
  <div v-else class="no-quest">
    <img src="@/assets/images/image-no-quest.svg" alt="" />
    <h2>Nenhuma pergunta por aqui...</h2>
    <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta.</p>
  </div>
</template>

<script lang="ts">
import { Question } from '@/components/molecules'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Question },
  computed: {
    hasQuestions(): number {
      return Object.values(this.questions).length || 0
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
