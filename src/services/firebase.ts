import { IQuestion, IRoom } from '@/@types/room'
import { IUser } from '@/@types/user'
import { ErrorMessage } from '@/@types/feedbackMessages'
import databaseConfig from '@/@types/databaseConfig'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class FirebaseService {
  private auth
  private authProvider
  private database

  constructor() {
    firebase.initializeApp(databaseConfig)
    this.auth = firebase.auth()
    this.authProvider = new firebase.auth.GoogleAuthProvider()
    this.database = firebase.database()
  }

  async authenticate(): Promise<IUser> {
    try {
      const { user } = await this.auth.signInWithPopup(this.authProvider)
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

  async createRoom(roomName: string, userId: string): Promise<IRoom> {
    try {
      const roomRef = await this.database
        .ref('rooms')
        .push({ roomName, author: userId })
        .get()
      return { ...roomRef.val(), id: roomRef.key }
    } catch (error) {
      return Promise.reject(error.message)
    }
  }

  async findRoom(roomId: string): Promise<IRoom> {
    const roomRef = await this.database.ref(`rooms/${roomId}`).get()

    if (roomRef.exists()) {
      try {
        return { ...roomRef.val(), id: roomRef.key }
      } catch (error) {
        return Promise.reject(error.message)
      }
    } else {
      return Promise.reject(ErrorMessage.ROOM_NONEXISTENT)
    }
  }

  async createQuestion(roomId: string, question: IQuestion): Promise<void> {
    const roomRef = await this.database.ref(`rooms/${roomId}`).get()

    if (roomRef.exists()) {
      const formattedQuestion = {
        ...question,
        highlighted: false,
        resolved: false,
      }
      try {
        await this.database
          .ref(`rooms/${roomId}/questions`)
          .push(formattedQuestion)
      } catch (error) {
        return Promise.reject(error.message)
      }
    } else {
      return Promise.reject(ErrorMessage.ROOM_NONEXISTENT)
    }
  }

  async storeLike(
    roomId: string,
    questionId: string,
    authorId: string
  ): Promise<void> {
    const roomRef = await this.database.ref(`rooms/${roomId}`).get()

    if (roomRef.exists()) {
      try {
        await this.database
          .ref(`rooms/${roomId}/questions/${questionId}/likes`)
          .push({
            authorId,
          })
      } catch (error) {
        return Promise.reject(error.message)
      }
    } else {
      return Promise.reject(ErrorMessage.ROOM_NONEXISTENT)
    }
  }

  async deleteLike(
    roomId: string,
    questionId: string,
    likeId: string
  ): Promise<void> {
    const roomRef = await this.database.ref(`rooms/${roomId}`).get()

    if (roomRef.exists()) {
      try {
        await this.database
          .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
          .remove()
      } catch (error) {
        return Promise.reject(error.message)
      }
    } else {
      return Promise.reject(ErrorMessage.ROOM_NONEXISTENT)
    }
  }

  async resolveQuestion(
    roomId: string,
    questionId: string,
    value: boolean
  ): Promise<void> {
    const roomRef = await this.database.ref(`rooms/${roomId}`).get()

    if (roomRef.exists()) {
      try {
        this.database
          .ref(`rooms/${roomId}/questions/${questionId}`)
          .child('resolved')
          .set(value)
      } catch (error) {
        return Promise.reject(error.message)
      }
    } else {
      return Promise.reject(ErrorMessage.ROOM_NONEXISTENT)
    }
  }

  async highlightQuestion(
    roomId: string,
    questionId: string,
    value: boolean
  ): Promise<void> {
    const roomRef = await this.database.ref(`rooms/${roomId}`).get()

    if (roomRef.exists()) {
      try {
        this.database
          .ref(`rooms/${roomId}/questions/${questionId}`)
          .child('highlighted')
          .set(value)
      } catch (error) {
        return Promise.reject(error.message)
      }
    } else {
      return Promise.reject(ErrorMessage.ROOM_NONEXISTENT)
    }
  }

  async deleteQuestion(roomId: string, questionId: string): Promise<void> {
    const roomRef = await this.database.ref(`rooms/${roomId}`).get()

    if (roomRef.exists()) {
      try {
        await this.database
          .ref(`rooms/${roomId}/questions/${questionId}`)
          .remove()
      } catch (error) {
        return Promise.reject(error.message)
      }
    } else {
      return Promise.reject(ErrorMessage.ROOM_NONEXISTENT)
    }
  }

  async deleteRoom(roomId: string): Promise<void> {
    const roomRef = await this.database.ref(`rooms/${roomId}`).get()

    if (roomRef.exists()) {
      try {
        await this.database.ref(`rooms/${roomId}`).remove()
        await this.auth.signOut()
      } catch (error) {
        return Promise.reject(error.message)
      }
    } else {
      return Promise.reject(ErrorMessage.ROOM_NONEXISTENT)
    }
  }
}

export default new FirebaseService()
