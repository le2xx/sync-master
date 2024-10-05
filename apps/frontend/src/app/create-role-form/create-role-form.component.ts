import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-create-role-form',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonDirective,
    Ripple,
  ],
  templateUrl: './create-role-form.component.html',
  styleUrl: './create-role-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRoleFormComponent {
  readonly formGroup = new FormGroup({
    name: new FormControl<string>(null, [Validators.required]),
  });

  constructor(
    private roleService: RoleService,
    private destroyRef: DestroyRef
  ) {}

  onCreate() {
    const { name } = this.formGroup.value;
    this.roleService
      .create(name)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
