import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(theme: string): void {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    themeLink.href = themeLink ? `${theme}.css` : 'light';
  }
}
