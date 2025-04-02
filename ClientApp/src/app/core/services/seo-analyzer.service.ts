import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISEOAnalyzerService } from '../interfaces/seo-analyzer.interface';
import { SEOData } from '../models/seo-data.model';

@Injectable({
  providedIn: 'root'
})
export class SeoAnalyzerService implements ISEOAnalyzerService {
  private apiUrl = `${environment.apiUrl}/api/seo`;

  constructor(private http: HttpClient) {}

  analyzeSEO(url: string): Promise<SEOData> {
    return this.http.get<SEOData>(`${this.apiUrl}/analyze`, {
      params: { url }
    }).toPromise() as Promise<SEOData>;
  }
} 