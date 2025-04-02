import { SEOData } from '../models/seo-data.model';

export interface ISEOAnalyzerService {
  analyzeSEO(url: string): Promise<SEOData>;
} 