import { createStore } from 'vuex'
import { IUser } from '@/@types/user'
import FirebaseService from '@/services/firebase'
import { IQuestion, IRoom } from '@/@types/room'

export default createStore({
  state: {
    room: {
      authorId: '',
      id: '',
      name: '',
      questions: [],
    } as IRoom,
    user: {
      email: '',
      id: '',
      name: '',
      photoURL: '',
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
    async authenticate({ commit }): Promise<void> {
      try {
        const user: IUser = await FirebaseService.authenticate()
        commit('SET_USER', user)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async createRoom({ commit, state }, roomName: string): Promise<void> {
      try {
        const room: IRoom = await FirebaseService.createRoom(
          roomName,
          state.user.id
        )
        commit('SET_ROOM', room)
      } catch (error) {
        Promise.reject(error)
      }
    },
    async enterRoom({ commit }, roomId: string): Promise<void> {
      try {
        const room: IRoom = await FirebaseService.findRoom(roomId)
        commit('SET_ROOM', room)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async createQuestion({ state }, question: IQuestion): Promise<void> {
      try {
        await FirebaseService.createQuestion(state.room.id, question)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async like({ state }, payload): Promise<void> {
      try {
        await FirebaseService.storeLike(
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
        await FirebaseService.deleteLike(
          state.room.id,
          payload.questionId,
          payload.likeId
        )
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async resolveQuestion({ state }, payload): Promise<void> {
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

    async highlightQuestion({ state }, payload): Promise<void> {
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

    async deleteQuestion({ state }, questionId: string): Promise<void> {
      try {
        await FirebaseService.deleteQuestion(state.room.id, questionId)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async closeRoom({ commit, state }): Promise<void> {
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
    getUser(state): IUser {
      return state.user
    },
    getRoom(state): IRoom {
      return state.room
    },
  },
})
