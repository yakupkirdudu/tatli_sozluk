import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly QUESTIONS_KEY = 'questions';
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  
  private readonly categories = [
    'Programlama',
    'Teknoloji',
    'Bilim',
    'Matematik',
    'Fizik',
    'Kimya',
    'Biyoloji',
    'Tarih',
    'Coğrafya',
    'Edebiyat',
    'Sanat',
    'Müzik',
    'Spor',
    'Sağlık',
    'Yemek',
    'Seyahat',
    'İş Dünyası',
    'Ekonomi',
    'Genel'
  ];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const questions = JSON.parse(localStorage.getItem(this.QUESTIONS_KEY) || '[]');
    this.questionsSubject.next(questions);
  }

  private saveToLocalStorage(questions: Question[]): void {
    localStorage.setItem(this.QUESTIONS_KEY, JSON.stringify(questions));
    this.questionsSubject.next(questions);
  }

  getQuestions(): Observable<Question[]> {
    return this.questionsSubject.asObservable();
  }

  getQuestionById(id: number): Question | undefined {
    return this.questionsSubject.value.find(q => q.id === id);
  }

  addQuestion(question: Omit<Question, 'id' | 'answers' | 'createdAt' | 'viewCount'>): void {
    const questions = this.questionsSubject.value;
    const newQuestion: Question = {
      ...question,
      id: Date.now(),
      answers: [],
      createdAt: new Date(),
      viewCount: 0
    };
    questions.push(newQuestion);
    this.saveToLocalStorage(questions);
  }

  addAnswer(questionId: number, answer: Omit<Answer, 'id' | 'createdAt'>): void {
    const questions = this.questionsSubject.value;
    const question = questions.find(q => q.id === questionId);
    
    if (question) {
      const newAnswer: Answer = {
        ...answer,
        id: Date.now(),
        createdAt: new Date()
      };
      question.answers.push(newAnswer);
      this.saveToLocalStorage(questions);
    }
  }

  updateAnswerVotes(questionId: number, answerId: number, isLike: boolean): void {
    const questions = this.questionsSubject.value;
    const question = questions.find(q => q.id === questionId);
    
    if (question) {
      const answer = question.answers.find(a => a.id === answerId);
      if (answer) {
        if (isLike) {
          answer.likes++;
        } else {
          answer.dislikes++;
        }
        this.saveToLocalStorage(questions);
      }
    }
  }

  getCategories(): string[] {
    return this.categories;
  }

  incrementViewCount(questionId: number): void {
    const questions = this.questionsSubject.value;
    const question = questions.find(q => q.id === questionId);
    if (question) {
      question.viewCount = (question.viewCount || 0) + 1;
      this.saveToLocalStorage(questions);
    }
  }
} 