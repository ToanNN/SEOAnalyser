import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SEOData } from '../../core/models/seo-data.model';
import { ISEOAnalyzerService } from '../../core/interfaces/seo-analyzer.interface';
import { SEO_ANALYZER_SERVICE } from '../../core/tokens/injection-tokens';

@Component({
  selector: 'app-seo-analyzer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seo-analyzer.component.html',
  styleUrls: ['./seo-analyzer.component.scss']
})
export class SeoAnalyzerComponent {
  url: string = '';
  loading: boolean = false;
  seoData: SEOData | null = null;
  seoScore: number = 0;
  passedChecks: number = 0;
  warnings: number = 0;
  failedChecks: number = 0;

  constructor(@Inject(SEO_ANALYZER_SERVICE) private seoAnalyzerService: ISEOAnalyzerService) {}

  async analyzeSEO() {
    if (!this.url) return;
    
    this.loading = true;
    try {
      this.seoData = await this.seoAnalyzerService.analyzeSEO(this.url);
      this.calculateSEOScore();
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      // TODO: Add error handling UI
    } finally {
      this.loading = false;
    }
  }

  private calculateSEOScore() {
    if (!this.seoData) return;

    let score = 0;
    this.passedChecks = 0;
    this.warnings = 0;
    this.failedChecks = 0;

    // Title checks
    if (this.getTitleStatus() === 'success') {
      score += 20;
      this.passedChecks++;
    } else if (this.getTitleStatus() === 'warning') {
      score += 10;
      this.warnings++;
    } else {
      this.failedChecks++;
    }

    // Description checks
    if (this.getDescriptionStatus() === 'success') {
      score += 20;
      this.passedChecks++;
    } else if (this.getDescriptionStatus() === 'warning') {
      score += 10;
      this.warnings++;
    } else {
      this.failedChecks++;
    }

    // Keywords check
    if (this.getKeywordsStatus() === 'success') {
      score += 15;
      this.passedChecks++;
    } else if (this.getKeywordsStatus() === 'warning') {
      score += 7;
      this.warnings++;
    } else {
      this.failedChecks++;
    }

    // Robots check
    if (this.getRobotsStatus() === 'success') {
      score += 15;
      this.passedChecks++;
    } else {
      this.failedChecks++;
    }

    // Social media checks
    if (this.seoData.ogTitle && this.seoData.ogDescription && this.seoData.ogImage) {
      score += 15;
      this.passedChecks++;
    } else if (this.seoData.ogTitle || this.seoData.ogDescription || this.seoData.ogImage) {
      score += 7;
      this.warnings++;
    } else {
      this.failedChecks++;
    }

    if (this.seoData.twitterTitle && this.seoData.twitterDescription && this.seoData.twitterImage) {
      score += 15;
      this.passedChecks++;
    } else if (this.seoData.twitterTitle || this.seoData.twitterDescription || this.seoData.twitterImage) {
      score += 7;
      this.warnings++;
    } else {
      this.failedChecks++;
    }

    this.seoScore = Math.min(100, score);
  }

  getTitleLength(): number {
    return this.seoData?.title?.length || 0;
  }

  getDescriptionLength(): number {
    return this.seoData?.description?.length || 0;
  }

  getTitleStatus(): 'success' | 'warning' | 'error' {
    const length = this.getTitleLength();
    if (length >= 30 && length <= 60) return 'success';
    if (length > 0 && (length < 30 || length <= 70)) return 'warning';
    return 'error';
  }

  getDescriptionStatus(): 'success' | 'warning' | 'error' {
    const length = this.getDescriptionLength();
    if (length >= 120 && length <= 155) return 'success';
    if (length > 0 && (length < 120 || length <= 170)) return 'warning';
    return 'error';
  }

  getKeywordsStatus(): 'success' | 'warning' | 'error' {
    if (!this.seoData?.keywords) return 'error';
    const keywords = this.seoData.keywords.split(',').map((k: string) => k.trim());
    if (keywords.length >= 5 && keywords.length <= 10) return 'success';
    if (keywords.length > 0) return 'warning';
    return 'error';
  }

  getRobotsStatus(): 'success' | 'error' {
    return this.seoData?.robots ? 'success' : 'error';
  }

  getSeoScoreText(score: number): string {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  }

  getWarningRecommendations(): string[] {
    if (!this.seoData) return [];

    const recommendations: string[] = [];

    if (this.getTitleStatus() === 'warning') {
      recommendations.push('Title length is not optimal. Aim for 30-60 characters for better visibility in search results.');
    }

    if (this.getDescriptionStatus() === 'warning') {
      recommendations.push('Meta description length is not optimal. Aim for 120-155 characters for better click-through rates.');
    }

    if (this.getKeywordsStatus() === 'warning') {
      recommendations.push('Consider using 5-10 relevant keywords to better target your audience.');
    }

    if (this.seoData.ogTitle || this.seoData.ogDescription || this.seoData.ogImage) {
      if (!this.seoData.ogTitle || !this.seoData.ogDescription || !this.seoData.ogImage) {
        recommendations.push('Complete your Open Graph tags for better social media sharing.');
      }
    }

    if (this.seoData.twitterTitle || this.seoData.twitterDescription || this.seoData.twitterImage) {
      if (!this.seoData.twitterTitle || !this.seoData.twitterDescription || !this.seoData.twitterImage) {
        recommendations.push('Complete your Twitter Card tags for better Twitter sharing.');
      }
    }

    return recommendations;
  }

  getFailedRecommendations(): string[] {
    if (!this.seoData) return [];

    const recommendations: string[] = [];

    if (this.getTitleStatus() === 'error') {
      recommendations.push('Missing or invalid title tag. Add a descriptive title between 30-60 characters.');
    }

    if (this.getDescriptionStatus() === 'error') {
      recommendations.push('Missing or invalid meta description. Add a compelling description between 120-155 characters.');
    }

    if (this.getKeywordsStatus() === 'error') {
      recommendations.push('Missing meta keywords. Add 5-10 relevant keywords to help search engines understand your content.');
    }

    if (this.getRobotsStatus() === 'error') {
      recommendations.push('Missing robots meta tag. Consider adding appropriate robots directives to control search engine behavior.');
    }

    if (!this.seoData.ogTitle && !this.seoData.ogDescription && !this.seoData.ogImage) {
      recommendations.push('Missing Open Graph tags. Add og:title, og:description, and og:image for better social media sharing.');
    }

    if (!this.seoData.twitterTitle && !this.seoData.twitterDescription && !this.seoData.twitterImage) {
      recommendations.push('Missing Twitter Card tags. Add twitter:title, twitter:description, and twitter:image for better Twitter sharing.');
    }

    return recommendations;
  }
} 