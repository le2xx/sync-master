import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  signal,
} from '@angular/core';
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
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    password: new FormControl<string>(null, [
      Validators.required,
      Validators.min(8),
    ]),
    confirmPassword: new FormControl<string>(null),
  });

  constructor(
    private usersService: UserService,
    private destroyRef: DestroyRef
  ) {}

  onToggleDisplayPass() {
    this.isDisplayPass.set(!this.isDisplayPass());
  }

  onRegistry() {
    console.log(this.formGroup.value);
    const { email, password } = this.formGroup.value;
    this.usersService
      .createUser({ email, password })
      .pipe(
        tap((result) => console.log(result)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
