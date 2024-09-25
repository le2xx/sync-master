import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserRegistry, UsersService } from '../services/users.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    Ripple,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    InputIconModule,
    IconFieldModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  readonly isDisplayPass = signal<boolean>(false);
  readonly formGroup = new FormGroup({
    email: new FormControl<string>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>(null, [Validators.required]),
    confirmPassword: new FormControl<string>(null),
  });

  constructor(private usersService: UsersService) {}

  onToggleDisplayPass() {
    this.isDisplayPass.set(!this.isDisplayPass());
  }

  onRegistry() {
    console.log(this.formGroup.value);
    const { email, password } = this.formGroup.value;
    this.usersService
      .createUser({ email, password })
      .pipe(tap((result) => console.log(result)))
      .subscribe();
  }
}
