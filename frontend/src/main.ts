import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Importing the required modules
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers, // Merge existing providers from appConfig
    importProvidersFrom(HttpClientModule, FormsModule) // Add your specific providers
  ]
})
  .catch((err) => console.error(err));
