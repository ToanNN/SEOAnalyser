using System.Net.Http;
using System.Text.RegularExpressions;
using HtmlAgilityPack;
using SEOAnalyzer.Core.Interfaces;
using SEOAnalyzer.Core.Models;

namespace SEOAnalyzer.Infrastructure.Services;

public class SEOAnalyzerService : ISEOAnalyzerService
{
    private readonly HttpClient _httpClient;
    private static readonly Regex UrlRegex = new(
        @"^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    public SEOAnalyzerService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.Timeout = TimeSpan.FromSeconds(30);
    }

    public async Task<SEOData> AnalyzeUrlAsync(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
            throw new ArgumentException("URL cannot be empty", nameof(url));

        if (!UrlRegex.IsMatch(url))
            throw new ArgumentException("Invalid URL format", nameof(url));

        try
        {
            var html = await _httpClient.GetStringAsync(url);
            var doc = new HtmlDocument();
            doc.LoadHtml(html);

            var seoData = new SEOData
            {
                Title = GetTitle(doc),
                Description = GetMetaContent(doc, "description"),
                Keywords = GetMetaContent(doc, "keywords"),
                Robots = GetMetaContent(doc, "robots"),
                OgTitle = GetMetaContent(doc, "og:title"),
                OgDescription = GetMetaContent(doc, "og:description"),
                OgImage = GetMetaContent(doc, "og:image"),
                TwitterTitle = GetMetaContent(doc, "twitter:title"),
                TwitterDescription = GetMetaContent(doc, "twitter:description"),
                TwitterImage = GetMetaContent(doc, "twitter:image")
            };

            // Use fallbacks for social media tags if they're not set
            seoData.OgTitle ??= seoData.Title;
            seoData.OgDescription ??= seoData.Description;
            seoData.TwitterTitle ??= seoData.OgTitle;
            seoData.TwitterDescription ??= seoData.OgDescription;

            return seoData;
        }
        catch (HttpRequestException ex)
        {
            throw new Exception($"Failed to fetch URL: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error analyzing URL: {ex.Message}", ex);
        }
    }

    private string GetTitle(HtmlDocument doc)
    {
        // Try to get title from meta og:title first
        var ogTitle = GetMetaContent(doc, "og:title");
        if (!string.IsNullOrWhiteSpace(ogTitle))
            return ogTitle;

        // Then try the title tag
        var titleNode = doc.DocumentNode.SelectSingleNode("//title");
        if (titleNode != null)
            return titleNode.InnerText.Trim();

        // Finally try h1
        var h1Node = doc.DocumentNode.SelectSingleNode("//h1");
        return h1Node?.InnerText.Trim() ?? string.Empty;
    }

    private string GetMetaContent(HtmlDocument doc, string name)
    {
        // Try name attribute first
        var node = doc.DocumentNode.SelectSingleNode($"//meta[@name='{name}']");
        if (node != null)
            return node.GetAttributeValue("content", string.Empty);

        // Then try property attribute (used by Open Graph)
        node = doc.DocumentNode.SelectSingleNode($"//meta[@property='{name}']");
        return node?.GetAttributeValue("content", string.Empty) ?? string.Empty;
    }
} 