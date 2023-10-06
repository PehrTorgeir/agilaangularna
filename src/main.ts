import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routes from './app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routes),
      provideHttpClient()
    ]
  }
).catch(err => console.error(err));