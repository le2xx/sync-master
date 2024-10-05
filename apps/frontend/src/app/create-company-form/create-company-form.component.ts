import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-create-company-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    FormsModule,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    Ripple,
  ],
  templateUrl: './create-company-form.component.html',
  styleUrl: './create-company-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyFormComponent {
  readonly formGroup = new FormGroup({
    name: new FormControl<string>(null, [Validators.required]),
  });

  constructor(
    private companyService: CompanyService,
    private destroyRef: DestroyRef
  ) {}

  onCreate() {
    const { name } = this.formGroup.value;
    this.companyService
      .create(name)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
