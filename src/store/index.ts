import { createStore } from 'vuex'
import { IUser } from '@/@types/user'
import FirebaseService from '@/services/firebase'
import { IQuestion, IRoom } from '@/@types/room'

export default createStore({
  state: {
    room: {
      id: '',
      name: '',
      questions: [],
    } as IRoom,
    user: {
      email: '',
      id: '',
      name: '',
    } as IUser,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_ROOM(state, room) {
      state.room = room
    },
  },
  actions: {
    async authenticate({ commit }) {
      try {
        const user: IUser = await FirebaseService.authenticate()
        commit('SET_USER', user)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async createRoom({ commit, state }, roomName) {
      try {
        const room = await FirebaseService.createRoom(roomName, state.user.id)
        commit('SET_ROOM', room)
      } catch (error) {
        Promise.reject(error)
      }
    },
    async enterRoom({ commit }, roomId: string) {
      try {
        const room = await FirebaseService.findRoom(roomId)
        commit('SET_ROOM', room)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async createQuestion({ state }, question: IQuestion) {
      try {
        await FirebaseService.createQuestion(state.room.id, question)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async like({ state }, payload): Promise<void> {
      try {
        await FirebaseService.setLike(
          state.room.id,
          payload.questionId,
          payload.userId
        )
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async dislike({ state }, payload): Promise<void> {
      try {
        await FirebaseService.removeLike(
          state.room.id,
          payload.questionId,
          payload.likeId
        )
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async resolveQuestion({ state }, payload) {
      try {
        await FirebaseService.resolveQuestion(
          state.room.id,
          payload.questionId,
          payload.value
        )
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async highlightQuestion({ state }, payload) {
      try {
        await FirebaseService.highlightQuestion(
          state.room.id,
          payload.questionId,
          payload.value
        )
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async deleteQuestion({ state }, questionId: string) {
      try {
        await FirebaseService.deleteQuestion(state.room.id, questionId)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async closeRoom({ commit, state }) {
      try {
        await FirebaseService.deleteRoom(state.room.id)
        commit('SET_USER', {
          email: '',
          id: '',
          name: '',
          photoURL: '',
        })
        commit('SET_ROOM', {
          id: '',
          name: '',
          questions: [],
        })
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getRoom(state) {
      return state.room
    },
  },
})
