export enum Biorythme {
    Dolphin,
    Lion,
    Bear,
    Wolf
};

export type BiorythmeType = typeof Biorythme[keyof typeof Biorythme];

export type BiorythmeScore = [bioryhtme: BiorythmeType, score: number];
