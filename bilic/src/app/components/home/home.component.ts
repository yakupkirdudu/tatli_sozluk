import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  questions: Question[] = [];
  selectedCategory: string = '';
  categories: string[] = [];
  searchText: string = '';
  sortOption: string = 'newest'; // Varsayılan sıralama

  sortOptions = [
    { value: 'newest', label: 'En Yeni' },
    { value: 'oldest', label: 'En Eski' },
    { value: 'popular', label: 'En Popüler' },
    { value: 'mostAnswered', label: 'En Çok Cevaplanan' }
  ];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
    this.categories = this.questionService.getCategories();
  }

  get filteredQuestions(): Question[] {
    return this.questions
      .filter(q => !this.selectedCategory || q.category === this.selectedCategory)
      .filter(q => !this.searchText || 
        q.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        q.description.toLowerCase().includes(this.searchText.toLowerCase()))
      .sort((a, b) => {
        switch (this.sortOption) {
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'popular':
            return (b.viewCount || 0) - (a.viewCount || 0);
          case 'mostAnswered':
            return b.answers.length - a.answers.length;
          default:
            return 0;
        }
      });
  }
} 