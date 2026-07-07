/**
 * Combines multiple class names into a single string.
 * @param {...string} classes 
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format salary or rates
 * @param {string} salary 
 * @returns {string}
 */
export function formatSalary(salary) {
  return salary || 'Competitive';
}
