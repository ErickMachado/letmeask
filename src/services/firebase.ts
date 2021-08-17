import { IQuestion } from '@/@types/room'
import { IUser } from '@/@types/user'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class FirebaseService {
  private _config = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
  }
  private _auth
  private _authProvider
  private _database

  constructor() {
    firebase.initializeApp(this._config)
    this._auth = firebase.auth()
    this._authProvider = new firebase.auth.GoogleAuthProvider()
    this._database = firebase.database()
  }

  async authenticate(): Promise<IUser> {
    try {
      const { user } = await this._auth.signInWithPopup(this._authProvider)
      return {
        email: user?.email as string,
        id: user?.uid as string,
        name: user?.displayName as string,
        photoURL: user?.photoURL as string,
      }
    } catch (error) {
      return Promise.reject(error.message)
    }
  }

  async createRoom(name: string, userId: string) {
    try {
      const room = await this._database
        .ref('rooms')
        .push({ name, author: userId })
        .get()
      return { ...room.val(), id: room.key }
    } catch (error) {
      return Promise.reject(error.message)
    }
  }

  async findRoom(roomId: string) {
    const roomRef = await this._database.ref(`rooms/${roomId}`).get()

    if (roomRef.exists()) {
      try {
        return { ...roomRef.val(), id: roomRef.key }
      } catch (error) {
        return Promise.reject(error.message)
      }
    } else {
      return Promise.reject('Sala inexistente')
    }
  }

  async createQuestion(roomId: string, question: IQuestion) {
    try {
      const newQuestion = await this._database
        .ref(`rooms/${roomId}/questions`)
        .push({
          ...question,
          highlighted: false,
          likes: [],
          resolved: false,
        })
        .get()
      return { ...newQuestion.val(), id: newQuestion.key }
    } catch (error) {
      return Promise.reject(error.message)
    }
  }

  async setLike(roomId: string, questionId: string, authorId: string) {
    try {
      const like = await this._database
        .ref(`rooms/${roomId}/questions/${questionId}/likes`)
        .push({
          authorId,
        })
        .get()
      return { ...like.val(), id: like.key }
    } catch (error) {
      return Promise.reject(error.message)
    }
  }

  async removeLike(roomId: string, questionId: string, likeId: string) {
    if (this._database.ref(`rooms/${roomId}`) !== null) {
      try {
        await this._database
          .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
          .remove()
      } catch (error) {
        return Promise.reject(error.message)
      }
    }
  }
}

export default new FirebaseService()
