import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonDirective,
    Ripple,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  readonly isDisplayPass = signal<boolean>(false);

  readonly formGroup = new FormGroup({
    email: new FormControl<string>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>(null, [
      Validators.required,
      Validators.min(8),
    ]),
  });

  constructor(private authService: AuthService) {}

  onToggleDisplayPass() {
    this.isDisplayPass.set(!this.isDisplayPass());
  }

  onAuth() {
    const { email, password } = this.formGroup.value;
    this.authService
      .login({ email, password })
      .pipe(
        tap((response) =>
          localStorage.setItem('access_token', response.access_token)
        )
      )
      .subscribe();
  }
}
