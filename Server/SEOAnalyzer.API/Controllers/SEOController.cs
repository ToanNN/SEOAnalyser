using Microsoft.AspNetCore.Mvc;
using SEOAnalyzer.Core.Interfaces;
using SEOAnalyzer.Core.Models;

namespace SEOAnalyzer.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SEOController : ControllerBase
{
    private readonly ISEOAnalyzerService _seoAnalyzerService;

    public SEOController(ISEOAnalyzerService seoAnalyzerService)
    {
        _seoAnalyzerService = seoAnalyzerService;
    }

    [HttpGet("analyze")]
    public async Task<ActionResult<SEOData>> AnalyzeUrl([FromQuery] string url)
    {
        if (string.IsNullOrEmpty(url))
        {
            return BadRequest("URL is required");
        }

        try
        {
            var seoData = await _seoAnalyzerService.AnalyzeUrlAsync(url);
            return Ok(seoData);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error analyzing URL: {ex.Message}");
        }
    }
} 