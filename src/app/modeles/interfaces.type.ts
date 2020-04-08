export interface Contact {
    id?: string;
    mail: string;
    firstName: string;
    creationDate?: Date;
}

export interface Article{
    id: number,
    title: string,
    metaDesc: string, // use to set the meta balise
    description: string,
    date: string,
    img: string,
    imgTitle: string,
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