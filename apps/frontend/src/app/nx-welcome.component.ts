import { Component, ViewEncapsulation } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-nx-welcome',
  template: `
    <p-button label="Submit" />
    <button pButton pRipple label="Submit" class="p-button-success"></button>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [Button, ButtonDirective, Ripple],
})
export class NxWelcomeComponent {}
