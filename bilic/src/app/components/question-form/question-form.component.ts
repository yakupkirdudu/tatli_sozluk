import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {
  question = {
    title: '',
    description: '',
    category: '',
    userId: '1',
    userName: 'Kullanıcı',
    imageUrl: ''
  };

  categories: string[] = [];
  imagePreview: string | null = null;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {
    this.categories = this.questionService.getCategories();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.question.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.question.imageUrl = '';
  }

  submitQuestion(): void {
    if (this.isFormValid()) {
      this.questionService.addQuestion(this.question);
      this.router.navigate(['/']);
    }
  }

  isFormValid(): boolean {
    return this.question.title.trim() !== '' && 
           this.question.description.trim() !== '' && 
           this.question.category !== '';
  }
} 