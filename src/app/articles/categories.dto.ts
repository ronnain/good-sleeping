export interface Category {
    category: 'all' | 'quizz' | 'hygiene' | 'troubles' | 'other';
    text: string;
    active?: boolean;
}