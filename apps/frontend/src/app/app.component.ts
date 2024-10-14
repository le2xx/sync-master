import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CompanyService } from './services/company.service';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isLogin = this.authService.isLogin;
  formControl = new FormControl<boolean>(this.themeService.isDark());
  profile$ = this.userService.getProfile();
  myCompanies$ = this.companyService.getMyCompanies();
  myProjects$ = this.projectService.getMyProjects();

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private userService: UserService,
    private companyService: CompanyService,
    private projectService: ProjectService,
    private destroyRef: DestroyRef
  ) {
    this.formControl.valueChanges
      .pipe(
        tap((v) => this.themeService.setTheme(v ? 'dark' : 'light')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
