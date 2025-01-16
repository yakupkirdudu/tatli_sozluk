import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'soru/:id', component: QuestionDetailComponent },
  { path: 'soru-ekle', component: QuestionFormComponent },
  { path: 'giris', component: LoginComponent },
  { path: 'kayit', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 