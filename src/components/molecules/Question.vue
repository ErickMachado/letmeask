<template>
  <li
    :class="[
      'question',
      { 'is-highlighted': question.highlighted },
      { 'is-resolved': question.resolved },
    ]"
  >
    <p>{{ question.content }}</p>
    <footer class="question__footer">
      <div class="question__user">
        <img :src="question.authorPhotoURL" :alt="question.authorName" />
        <span>{{ question.authorName }}</span>
      </div>
      <div v-show="isAuthenticated && !isAdmin" class="question__likes">
        <span>{{ likes.length }}</span>
        <svg
          @click="handleLike"
          :class="{ active: hasLiked }"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
            stroke="#737380"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div v-show="isAuthenticated && isAdmin" class="question__admin-actions">
        <ul>
          <li>
            <svg
              @click="resolve"
              :class="['resolve-icon', { active: question.resolved }]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12.0001"
                cy="12"
                r="9.00375"
                stroke="#737380"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.44263 12.3392L10.6105 14.5071L10.5965 14.4931L15.4876 9.60205"
                stroke="#737380"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
          <li @click="highlight">
            <svg
              :class="['highlight-icon', { active: question.highlighted }]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 18H18C19.657 18 21 16.657 21 15V7C21 5.343 19.657 4 18 4H6C4.343 4 3 5.343 3 7V15C3 16.657 4.343 18 6 18H7.5V21L12 18Z"
                stroke="#737380"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
          <li @click="$emit('action:delete', question.id)">
            <svg
              class="delete-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H5H21"
                stroke="#737380"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                stroke="#737380"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
        </ul>
      </div>
    </footer>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  computed: {
    ...mapGetters(['getUser', 'getRoom']),
    likes() {
      if (this.question.likes) {
        return Object.entries(this.question.likes).map(([key, value]: any) => {
          return {
            authorId: value.authorId,
            id: key,
          }
        })
      }

      return []
    },
    hasLiked() {
      return this.likes.some((like) => like.authorId === this.getUser.id)
    },
    isAdmin(): boolean {
      return this.getUser.id === this.getRoom.author
    },
    isAuthenticated() {
      return this.getUser.id
    },
  },
  methods: {
    ...mapActions(['like', 'dislike', 'resolveQuestion', 'highlightQuestion']),
    async handleLike(): Promise<void> {
      if (!this.hasLiked) {
        try {
          await this.like({
            questionId: this.question.id,
            userId: this.getUser.id,
          })
        } catch (error) {
          alert(error)
        }
      } else {
        const likeId = this.likes.find(
          (like) => like.authorId === this.getUser.id
        )?.id
        try {
          await this.dislike({
            questionId: this.question.id,
            likeId,
          })
        } catch (error) {
          alert(error)
        }
      }
    },
    async highlight() {
      const value = this.question.highlighted ? false : true
      try {
        await this.highlightQuestion({ questionId: this.question.id, value })
      } catch (error) {
        this.$notify({
          title: 'Erro',
          text: error,
          type: 'error',
        })
      }
    },
    async resolve() {
      try {
        const value = this.question.resolved ? false : true
        await this.resolveQuestion({ questionId: this.question.id, value })
      } catch (error) {
        this.$notify({
          text: error,
          type: 'error',
        })
      }
    },
  },
  name: 'Question',
  props: {
    question: {
      required: true,
      type: Object,
    },
  },
})
</script>

<style lang="scss" scoped>
.question {
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid transparent;
  border-radius: 0.8rem;
  padding: 2.4rem;
  transition: all 0.3s ease;
  width: 100%;
  &.is-resolved {
    background-color: $gray-light;
  }
  &.is-highlighted {
    background-color: #f4f0ff;
    border: 1px solid $purple;
  }
  & > p {
    line-height: 2.4rem;
  }
  &__footer {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 2.4rem;
  }
  &__user {
    align-items: center;
    display: flex;
    & > img {
      border-radius: 50%;
      height: 32px;
      object-fit: cover;
      width: 32px;
    }
    & > span {
      color: $gray-medium;
      font-size: 1.4rem;
      margin-left: 0.8rem;
    }
  }
  &__likes {
    align-items: flex-end;
    display: flex;
    & > span {
      color: $gray-medium;
      margin-right: 0.8rem;
    }
    & > svg {
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.3s ease;
      &:hover {
        opacity: 1;
      }
      &.active > path {
        stroke: $purple;
        opacity: 1;
      }
    }
  }
  &__admin-actions {
    ul {
      display: flex;
      gap: 1.6rem;
      li {
        cursor: pointer;
      }
    }
  }
}

.resolve-icon > path,
.resolve-icon > circle,
.highlight-icon > path,
.delete-icon > path {
  opacity: 0.5;
  transition: all 0.3s ease;
}

.resolve-icon:hover > path,
.resolve-icon:hover > circle,
.highlight-icon:hover > path {
  opacity: 1;
}

.resolve-icon.active > path,
.resolve-icon.active > circle,
.highlight-icon.active > path {
  stroke: $purple;
  opacity: 1;
}

.delete-icon:hover path {
  stroke: $danger;
  opacity: 1;
  transition: all 0.5s ease;
}
</style>
