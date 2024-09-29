import { Inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal<boolean>(false);
  themeKey = 'theme';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setTheme(localStorage.getItem(this.themeKey) || 'light');
  }

  setTheme(theme: string): void {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `${theme}.css`;
    }
    localStorage.setItem(this.themeKey, theme);
    this.isDark.set(theme === 'dark');
  }
}
