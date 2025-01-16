import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    // Şimdilik basit bir kontrol
    if (this.loginData.email && this.loginData.password) {
      // Gerçek uygulamada burada auth service kullanılacak
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        email: this.loginData.email,
        name: 'Kullanıcı'
      }));
      this.router.navigate(['/']);
    }
  }
} 