export interface Answer {
    id: number;
    content: string;
    userId: string;
    userName: string;
    questionId: number;
    likes: number;
    dislikes: number;
    createdAt: Date;
} 