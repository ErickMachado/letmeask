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
    SET_LIKE(state, payload) {
      state.room.questions[payload.id] = payload
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

    async like({ commit, state }, payload): Promise<void> {
      try {
        const like = await FirebaseService.setLike(
          state.room.id,
          payload.questionId,
          payload.userId
        )
        commit('SET_LIKE', like)
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
