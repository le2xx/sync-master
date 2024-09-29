import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    DropdownModule,
    ReactiveFormsModule,
    RegistrationFormComponent,
    AuthFormComponent,
    InputSwitchModule,
  ],
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    ThemeService,
    AuthService,
    UsersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
