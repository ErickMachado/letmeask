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
        console.log(error.message)
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
