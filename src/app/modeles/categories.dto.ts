import { CategoryNameKeys } from "../modeles/category.type";

export interface Categories {
    categoryName: CategoryNameKeys;
    label: string;
    active?: boolean;
}