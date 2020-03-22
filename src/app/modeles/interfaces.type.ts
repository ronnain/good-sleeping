export interface Contact {
    id?: string;
    mail: string;
    firstName: string;
    creationDate?: Date;
}

export interface Article{
    id: number,
    title: string,
    description: string,
    date: string,
    img: string,
    metaDesc: string, // use to set the meta balise
    articleName: string
}

export interface Comment{
    id?: number,
    firstName: string,
    date: Date,
    comment: string,
    repliesComment?: Comment[],
    articleId?: number,
    mainCommentId?: number // use to add a response
}

export interface Page {
    setTitle(); // Set the title page
    handleMeta();
}