import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  themes = signal<string[]>(['light', 'dark']);
  formControl = new FormControl<string>('light');

  constructor(private themeService: ThemeService) {
    this.formControl.valueChanges
      .pipe(
        tap((v) => {
          console.log(v);
          this.themeService.setTheme(v as string);
        })
      )
      .subscribe();
  }
}
