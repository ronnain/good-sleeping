export interface Category {
    category: 'all' | 'quizz' | 'hygiène' | 'troubles';
    text: string;
    active?: boolean;
}