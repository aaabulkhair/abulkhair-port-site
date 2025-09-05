#!/usr/bin/env node

/**
 * MCP Server for abulkhair.ai Visual QA
 * 
 * This server provides tools for automated visual and SEO testing
 * of the abulkhair.ai website using Playwright.
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

class AbulkhairAIMCPServer {
  constructor() {
    this.tools = {
      'visual-qa': {
        name: 'visual-qa',
        description: 'Run complete visual and SEO QA tests for abulkhair.ai',
        parameters: {
          type: 'object',
          properties: {
            project: {
              type: 'string',
              description: 'Browser project to run (chromium, firefox, webkit, mobile)',
              default: 'chromium'
            },
            headed: {
              type: 'boolean', 
              description: 'Run tests in headed mode (visible browser)',
              default: false
            },
            grep: {
              type: 'string',
              description: 'Run only tests matching this pattern'
            }
          }
        }
      },
      'screenshot-baseline': {
        name: 'screenshot-baseline',
        description: 'Generate new screenshot baselines for visual regression testing',
        parameters: {
          type: 'object',
          properties: {
            update: {
              type: 'boolean',
              description: 'Update existing baselines',
              default: true
            }
          }
        }
      },
      'health-check': {
        name: 'health-check',
        description: 'Quick health check for external links and basic functionality',
        parameters: {
          type: 'object',
          properties: {}
        }
      },
      'performance-audit': {
        name: 'performance-audit', 
        description: 'Run Lighthouse-style performance audit',
        parameters: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to audit',
              default: 'http://localhost:3000'
            }
          }
        }
      }
    };
  }

  async executeTool(tool, parameters = {}) {
    switch (tool) {
      case 'visual-qa':
        return await this.runVisualQA(parameters);
      case 'screenshot-baseline':
        return await this.generateBaselines(parameters);
      case 'health-check':
        return await this.healthCheck(parameters);
      case 'performance-audit':
        return await this.performanceAudit(parameters);
      default:
        throw new Error(`Unknown tool: ${tool}`);
    }
  }

  async runVisualQA(params) {
    const { project = 'chromium', headed = false, grep } = params;
    
    let command = `npx playwright test --project=${project}`;
    
    if (headed) {
      command += ' --headed';
    }
    
    if (grep) {
      command += ` --grep="${grep}"`;
    }

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: process.cwd(),
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
      });

      const report = await this.generateTestReport();
      
      return {
        success: true,
        message: 'Visual QA tests completed successfully',
        output: stdout,
        errors: stderr,
        report,
        screenshots: await this.listScreenshots()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Visual QA tests failed',
        error: error.message,
        output: error.stdout,
        errors: error.stderr
      };
    }
  }

  async generateBaselines(params) {
    const { update = true } = params;
    
    const command = update ? 
      'npx playwright test --update-snapshots' :
      'npx playwright test --reporter=null';

    try {
      const { stdout, stderr } = await execAsync(command);
      
      return {
        success: true,
        message: 'Screenshot baselines updated successfully',
        output: stdout,
        errors: stderr,
        baselines: await this.listScreenshots()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate baselines',
        error: error.message,
        output: error.stdout,
        errors: error.stderr
      };
    }
  }

  async healthCheck(params) {
    const healthTests = [
      'hero & CTAs present',
      'outbound monetization links are healthy',
      'SEO meta tags'
    ];

    const results = [];
    
    for (const testName of healthTests) {
      try {
        const { stdout } = await execAsync(
          `npx playwright test --grep="${testName}" --reporter=json`,
          { maxBuffer: 1024 * 1024 }
        );
        
        const jsonResult = JSON.parse(stdout);
        results.push({
          test: testName,
          status: jsonResult.stats?.expected > 0 ? 'passed' : 'failed',
          details: jsonResult.suites?.[0]?.specs?.[0]?.title || 'No details'
        });
      } catch (error) {
        results.push({
          test: testName,
          status: 'failed',
          error: error.message
        });
      }
    }

    const allPassed = results.every(r => r.status === 'passed');
    
    return {
      success: allPassed,
      message: allPassed ? 'All health checks passed' : 'Some health checks failed',
      results,
      summary: {
        total: results.length,
        passed: results.filter(r => r.status === 'passed').length,
        failed: results.filter(r => r.status === 'failed').length
      }
    };
  }

  async performanceAudit(params) {
    const { url = 'http://localhost:3000' } = params;
    
    // Basic performance checks using Playwright
    const performanceScript = `
      const { chromium } = require('playwright');
      
      (async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        
        const startTime = Date.now();
        await page.goto('${url}');
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;
        
        // Get Core Web Vitals metrics
        const metrics = await page.evaluate(() => {
          return new Promise((resolve) => {
            new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              resolve(entries.map(entry => ({
                name: entry.name,
                value: entry.value,
                rating: entry.value < 2500 ? 'good' : entry.value < 4000 ? 'needs-improvement' : 'poor'
              })));
            }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'cumulative-layout-shift'] });
            
            setTimeout(() => resolve([]), 5000);
          });
        });
        
        await browser.close();
        
        console.log(JSON.stringify({
          loadTime,
          metrics,
          url: '${url}'
        }));
      })();
    `;

    try {
      const { stdout } = await execAsync(`node -e "${performanceScript.replace(/"/g, '\\"')}"`);
      const result = JSON.parse(stdout);
      
      return {
        success: true,
        message: 'Performance audit completed',
        audit: result,
        recommendations: this.generatePerformanceRecommendations(result)
      };
    } catch (error) {
      return {
        success: false,
        message: 'Performance audit failed',
        error: error.message
      };
    }
  }

  generatePerformanceRecommendations(audit) {
    const recommendations = [];
    
    if (audit.loadTime > 3000) {
      recommendations.push('Consider optimizing images and reducing bundle size - load time is over 3 seconds');
    }
    
    audit.metrics?.forEach(metric => {
      if (metric.rating === 'poor') {
        recommendations.push(`Improve ${metric.name} - current rating: ${metric.rating}`);
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('Performance looks good! All metrics are within acceptable ranges.');
    }
    
    return recommendations;
  }

  async listScreenshots() {
    try {
      const testResultsPath = path.join(process.cwd(), 'test-results');
      const files = await fs.readdir(testResultsPath, { recursive: true });
      return files
        .filter(file => file.endsWith('.png'))
        .map(file => path.join(testResultsPath, file));
    } catch (error) {
      return [];
    }
  }

  async generateTestReport() {
    try {
      const reportPath = path.join(process.cwd(), 'playwright-report', 'index.html');
      const reportExists = await fs.access(reportPath).then(() => true).catch(() => false);
      
      return {
        reportPath: reportExists ? reportPath : null,
        reportUrl: reportExists ? `file://${reportPath}` : null,
        message: reportExists ? 'HTML report generated' : 'No report generated'
      };
    } catch (error) {
      return {
        error: error.message
      };
    }
  }

  // CLI interface
  async handleCommand(args) {
    const [command, ...params] = args;
    
    if (!command) {
      console.log('Available commands:');
      Object.keys(this.tools).forEach(tool => {
        console.log(`  ${tool} - ${this.tools[tool].description}`);
      });
      return;
    }

    if (!this.tools[command]) {
      console.error(`Unknown command: ${command}`);
      process.exit(1);
    }

    const parameters = {};
    for (let i = 0; i < params.length; i += 2) {
      const key = params[i]?.replace('--', '');
      const value = params[i + 1];
      if (key && value !== undefined) {
        parameters[key] = value === 'true' ? true : value === 'false' ? false : value;
      }
    }

    try {
      const result = await this.executeTool(command, parameters);
      console.log(JSON.stringify(result, null, 2));
      
      if (!result.success) {
        process.exit(1);
      }
    } catch (error) {
      console.error('Error executing command:', error.message);
      process.exit(1);
    }
  }
}

// CLI execution
if (require.main === module) {
  const server = new AbulkhairAIMCPServer();
  server.handleCommand(process.argv.slice(2));
}

module.exports = AbulkhairAIMCPServer;