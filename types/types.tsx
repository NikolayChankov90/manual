export type QuizOption = {
    display: string
    value: string | boolean
    isRejection: boolean
}

export type QuizQuestion = {
    question: string
    type: string
    options: QuizOption[]
}

export type QuizData = {
    questions: QuizQuestion[]
}

export type InfoDataObj = {
    id: number
    assetID: string
    title: string
    header: string
    subtitle: string
}

export type InfoData = {
    data: InfoDataObj[]
}

