import { Injectable } from '@angular/core';
import { CategoryNameEnum, CategoryNameKeys } from 'src/app/modeles/category.type';

@Injectable({providedIn: 'root'})
export class CategoriesService {

    private categoriesOrder = [ // the order is important for categories service.
        CategoryNameEnum.apnee,
        CategoryNameEnum.insomnie,
        CategoryNameEnum.quizz,
        CategoryNameEnum.troubles,
        CategoryNameEnum.hygiene,
        CategoryNameEnum.other,
    ]

    selectedCategory: CategoryNameKeys = CategoryNameEnum.all;
    currentArticleCategories: CategoryNameKeys[];


    constructor() {
    }

    getLinkedArticlesCategory() {

        if (this.selectedCategory && this.selectedCategory !== CategoryNameEnum.all) {
            return this.selectedCategory;
        }

        if (!this.currentArticleCategories) {
            return this.selectedCategory;
        }

        for (const categoryName of this.categoriesOrder) {
            if (this.currentArticleCategories.includes(categoryName)) {
                return categoryName;
            }
        }

        return CategoryNameEnum.other;
    }

    setCurrentArticleCategories(categories: CategoryNameKeys[]) {
        this.currentArticleCategories = categories;
    }

    setSelectedCategory(category: CategoryNameKeys) {
        this.selectedCategory = category;
    }

    getSelectedCategory() {
        return this.selectedCategory;
    }

}