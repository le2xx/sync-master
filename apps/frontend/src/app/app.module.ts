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
import { InputSwitchModule } from 'primeng/inputswitch';
import { CreateRoleFormComponent } from './create-role-form/create-role-form.component';
import { CreateCompanyFormComponent } from './create-company-form/create-company-form.component';
import { CreateProjectFormComponent } from './create-project-form/create-project-form.component';

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
    CreateRoleFormComponent,
    CreateCompanyFormComponent,
    CreateProjectFormComponent,
  ],
  providers: [provideAnimations(), provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
