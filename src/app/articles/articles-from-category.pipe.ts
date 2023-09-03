import { Pipe, PipeTransform } from '@angular/core';
import { CategoryNameEnum, CategoryNameKeys } from '../modeles/category.type';
import { Article } from '../modeles/interfaces.type';

@Pipe({
    name: 'articlesFromCategory',
    standalone: true
})
export class ArticlesFromCategoryPipe implements PipeTransform {
    transform(articles: Article[], category: CategoryNameKeys): Article[] {

        if (category === CategoryNameEnum.all) {
            return articles;
        }

        return articles.filter(article => article.categories.includes(category));
    }
}