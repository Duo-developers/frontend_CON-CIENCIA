#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes the build output and provides performance insights
 */

import fs from 'fs';
import path from 'path';

const DIST_PATH = './dist/assets';
const KB = 1024;
const MB = 1024 * 1024;

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  try {
    const files = fs.readdirSync(DIST_PATH);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    const cssFiles = files.filter(file => file.endsWith('.css'));
    
    console.log('📊 Bundle Analysis Report\n');
    
    // Analyze JavaScript files
    console.log('📦 JavaScript Bundles:');
    let totalJsSize = 0;
    let totalJsGzipSize = 0;
    
    jsFiles.forEach(file => {
      const filePath = path.join(DIST_PATH, file);
      const stats = fs.statSync(filePath);
      const size = stats.size;
      totalJsSize += size;
      
      // Estimate gzip size (rough approximation)
      const gzipSize = Math.round(size * 0.3);
      totalJsGzipSize += gzipSize;
      
      console.log(`  ${file.padEnd(30)} ${formatBytes(size).padStart(10)} (${formatBytes(gzipSize).padStart(8)} gzipped)`);
    });
    
    console.log(`\n  Total JS: ${formatBytes(totalJsSize)} (${formatBytes(totalJsGzipSize)} gzipped)`);
    
    // Analyze CSS files
    console.log('\n🎨 CSS Bundles:');
    let totalCssSize = 0;
    let totalCssGzipSize = 0;
    
    cssFiles.forEach(file => {
      const filePath = path.join(DIST_PATH, file);
      const stats = fs.statSync(filePath);
      const size = stats.size;
      totalCssSize += size;
      
      // Estimate gzip size for CSS (usually compresses well)
      const gzipSize = Math.round(size * 0.2);
      totalCssGzipSize += gzipSize;
      
      console.log(`  ${file.padEnd(30)} ${formatBytes(size).padStart(10)} (${formatBytes(gzipSize).padStart(8)} gzipped)`);
    });
    
    console.log(`\n  Total CSS: ${formatBytes(totalCssSize)} (${formatBytes(totalCssGzipSize)} gzipped)`);
    
    // Performance insights
    const totalSize = totalJsSize + totalCssSize;
    const totalGzipSize = totalJsGzipSize + totalCssGzipSize;
    
    console.log('\n📈 Performance Insights:');
    console.log(`  Total Bundle Size: ${formatBytes(totalSize)} (${formatBytes(totalGzipSize)} gzipped)`);
    console.log(`  Number of Chunks: ${jsFiles.length + cssFiles.length}`);
    
    // Performance recommendations
    console.log('\n💡 Recommendations:');
    
    if (totalSize > 2 * MB) {
      console.log('  ⚠️  Bundle size is large. Consider:');
      console.log('     - Further code splitting');
      console.log('     - Tree shaking unused dependencies');
      console.log('     - Lazy loading more components');
    }
    
    if (jsFiles.length < 5) {
      console.log('  ℹ️  Consider more granular code splitting for better caching');
    }
    
    if (totalGzipSize > 500 * KB) {
      console.log('  ⚠️  Gzipped size is large. Consider:');
      console.log('     - Removing unused dependencies');
      console.log('     - Optimizing images and assets');
      console.log('     - Implementing service worker caching');
    }
    
    // Bundle size thresholds
    const thresholds = {
      excellent: 250 * KB,
      good: 500 * KB,
      poor: 1 * MB
    };
    
    console.log('\n🏆 Performance Grade:');
    if (totalGzipSize <= thresholds.excellent) {
      console.log('  🟢 EXCELLENT - Bundle size is optimal');
    } else if (totalGzipSize <= thresholds.good) {
      console.log('  🟡 GOOD - Bundle size is acceptable');
    } else if (totalGzipSize <= thresholds.poor) {
      console.log('  🟠 FAIR - Bundle size needs optimization');
    } else {
      console.log('  🔴 POOR - Bundle size is too large');
    }
    
  } catch (error) {
    console.error('❌ Error analyzing bundle:', error.message);
    console.log('Make sure to run "npm run build" first');
  }
}

// Run analysis
analyzeBundle();