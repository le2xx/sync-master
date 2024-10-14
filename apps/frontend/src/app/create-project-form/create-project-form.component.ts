import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Ripple } from 'primeng/ripple';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-create-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    Ripple,
  ],
  templateUrl: './create-project-form.component.html',
  styleUrl: './create-project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectFormComponent {
  readonly formGroup = new FormGroup({
    name: new FormControl<string>(null, [Validators.required]),
    companyId: new FormControl<string>(null, [Validators.required]),
    description: new FormControl<string>(null),
  });

  constructor(
    private projectService: ProjectService,
    private destroyRef: DestroyRef
  ) {}

  onCreate() {
    const { name, companyId, description } = this.formGroup.value;
    this.projectService
      .createProject(name, companyId, description)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
