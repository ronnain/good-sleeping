export enum Biorythme {
    Dolphin = "Dauphin",
    Lion = "Lion",
    Bear = "Ours",
    Wolf = "Loup"
};

export type BiorythmeType = typeof Biorythme[keyof typeof Biorythme];

export type BiorythmeScore = [bioryhtme: BiorythmeType, score: number];
