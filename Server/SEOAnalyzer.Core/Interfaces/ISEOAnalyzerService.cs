using SEOAnalyzer.Core.Models;

namespace SEOAnalyzer.Core.Interfaces;

public interface ISEOAnalyzerService
{
    Task<SEOData> AnalyzeUrlAsync(string url);
} 