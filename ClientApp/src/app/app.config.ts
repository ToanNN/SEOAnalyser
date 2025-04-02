import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { SeoAnalyzerService } from './core/services/seo-analyzer.service';
import { SEO_ANALYZER_SERVICE } from './core/tokens/injection-tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: SEO_ANALYZER_SERVICE, useClass: SeoAnalyzerService }
  ]
};
