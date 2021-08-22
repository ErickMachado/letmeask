export interface IQuestion {
  authorName: string
  authorPhotoURL: string
  content: string
  id: string
  likes?: number
  resolved?: boolean
  highlighted?: boolean
}

export interface IRoom {
  authorId: string
  id: string
  name: string
  questions: IQuestion[]
}
