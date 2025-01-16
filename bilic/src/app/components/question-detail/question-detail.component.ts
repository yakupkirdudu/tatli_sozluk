import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {
  question?: Question;
  newAnswer: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const questionId = Number(params['id']);
      this.question = this.questionService.getQuestionById(questionId);
      if (this.question) {
        this.questionService.incrementViewCount(questionId);
      }
    });
  }

  submitAnswer(): void {
    if (!this.question || !this.newAnswer.trim()) return;

    const answer: Omit<Answer, 'id' | 'createdAt'> = {
      content: this.newAnswer.trim(),
      userId: '1', // Normalde gerçek kullanıcı ID'si gelecek
      userName: 'Kullanıcı', // Normalde gerçek kullanıcı adı gelecek
      questionId: this.question.id,
      likes: 0,
      dislikes: 0
    };

    this.questionService.addAnswer(this.question.id, answer);
    this.newAnswer = '';
  }

  likeAnswer(answerId: number): void {
    if (!this.question) return;
    this.questionService.updateAnswerVotes(this.question.id, answerId, true);
  }

  dislikeAnswer(answerId: number): void {
    if (!this.question) return;
    this.questionService.updateAnswerVotes(this.question.id, answerId, false);
  }
} 