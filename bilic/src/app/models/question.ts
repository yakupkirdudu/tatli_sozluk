import { Answer } from './answer';

export interface Question {
    id: number;
    title: string;
    description: string;
    category: string;
    userId: string;
    userName: string;
    createdAt: Date;
    answers: Answer[];
    viewCount: number;
    imageUrl?: string;
} 