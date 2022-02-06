import { HeaderService } from '../shared/services/header.service';
import { CategoryNameKeys } from './category.type';

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
    datePublished: string,
    dateModified: string,
    img: string,
    imgTitle: string,
    articleName: string,
    displayNewArticleBadge?: boolean
    categories: CategoryNameKeys[] // not an array, it is a string separate with ","
}

export class MyArticle implements Article{
    id: number;
    title: string;
    metaDesc: string; // use to set the meta balise
    description: string;
    datePublished: string;
    dateModified: string;
    img: string;
    imgTitle: string;
    articleName: string;
    categories: CategoryNameKeys[]

    constructor(id: number, title: string, metaDesc: string, description: string, datePublished: string, dateModified: string, img: string, imgTitle: string, articleName: string, categories: any) {
        this.id = id;
        this.title = title;
        this.metaDesc = metaDesc;
        this.description = description;
        this.datePublished = datePublished;
        this.dateModified = dateModified;
        this.img = img;
        this.imgTitle = imgTitle;
        this.articleName = articleName;
        this.categories = categories?.split(',')
    }
}

export interface ArticleConfig{
    id: number,
    idArticle: number,
    img: imgConfig[];
}

export interface imgConfig{
    src: string,
    alt: string,
    title: string,
    linkImgCreator: string,
    uploaded: boolean
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
    headerService: HeaderService;
}