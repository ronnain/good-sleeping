export interface Contact {
    id?: string;
    mail: string;
    firstName: string;
    creationDate?: Date;
}

export interface DescArticle{
    title: string,
    description: string,
    date: string,
    img: string,
    articleName: string
}

export interface Comment{
    id?: number,
    author: string,
    date: Date,
    comment: string,
    repliesComment?: Comment[]
}