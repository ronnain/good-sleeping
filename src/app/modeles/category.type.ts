export enum CategoryNameEnum { // update categories service.
    all = "all",
    apnee = "apnee",
    insomnie = "insomnie",
    quizz = "quizz",
    troubles = "troubles",
    hygiene = "hygiene",
    other = "other",
}
export type CategoryNameKeys = keyof typeof CategoryNameEnum;