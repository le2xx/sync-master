import { Component, DestroyRef, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  themes = signal<string[]>(['light', 'dark']);
  formControl = new FormControl<string>('light');

  constructor(
    private themeService: ThemeService,
    private destroyRef: DestroyRef
  ) {
    this.formControl.valueChanges
      .pipe(
        tap((v) => this.themeService.setTheme(v as string)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
