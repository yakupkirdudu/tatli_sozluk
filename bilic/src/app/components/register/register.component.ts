import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.isFormValid()) {
      // Gerçek uygulamada burada auth service kullanılacak
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        email: this.registerData.email,
        name: this.registerData.name
      }));
      this.router.navigate(['/']);
    }
  }

  isFormValid(): boolean {
    return this.registerData.name.trim() !== '' &&
           this.registerData.email.trim() !== '' &&
           this.registerData.password === this.registerData.confirmPassword &&
           this.registerData.password.length >= 6;
  }
} 