import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../modeles/interfaces.type';

@Pipe({
    name: 'articlesFromCategory'
})

export class ArticlesFromCategoryPipe implements PipeTransform {
    transform(articles: Article[], category:'all' | 'quizz' | 'hygiene' | 'troubles' | 'other'): any {
        if (category === 'all') {
            return articles;
        }

        return articles.filter(article => article.category === category);
    }
}