export interface IQuestion {
  authorName: string
  authorPhotoURL: string
  content: string
  likes?: number
  resolved?: boolean
  highlighted?: boolean
}

export interface IRoom {
  id: string
  name: string
  questions: IQuestion[]
}