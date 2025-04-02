import { InjectionToken } from '@angular/core';
import { ISEOAnalyzerService } from '../interfaces/seo-analyzer.interface';

export const SEO_ANALYZER_SERVICE = new InjectionToken<ISEOAnalyzerService>('SEOAnalyzerService'); 