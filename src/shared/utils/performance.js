// Performance optimization utilities

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to limit
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Intersection Observer for lazy loading
 * @param {Element} element - The element to observe
 * @param {Function} callback - The callback to execute when element is visible
 * @param {Object} options - Intersection Observer options
 * @returns {IntersectionObserver} - The observer instance
 */
export const createIntersectionObserver = (element, callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
        observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  if (element) {
    observer.observe(element);
  }

  return observer;
};

/**
 * Preload critical resources
 * @param {string[]} urls - Array of URLs to preload
 */
export const preloadResources = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = url.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
};

/**
 * Optimize images with lazy loading and proper sizing
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {Object} options - Additional options
 * @returns {Object} - Optimized image props
 */
export const optimizeImage = (src, alt, options = {}) => {
  const {
    loading = 'lazy',
    decoding = 'async',
    className = '',
    sizes = '100vw',
    ...rest
  } = options;

  return {
    src,
    alt,
    loading,
    decoding,
    className,
    sizes,
    ...rest
  };
};

/**
 * Memoize expensive calculations
 * @param {Function} fn - The function to memoize
 * @returns {Function} - The memoized function
 */
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Batch DOM updates for better performance
 * @param {Function[]} updates - Array of update functions
 */
export const batchUpdates = (updates) => {
  // Use requestAnimationFrame for smooth updates
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
};

/**
 * Check if element is in viewport
 * @param {Element} element - The element to check
 * @returns {boolean} - Whether element is in viewport
 */
export const isInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};