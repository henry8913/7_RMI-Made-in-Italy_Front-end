/**
 * Utility functions for formatting data
 */

/**
 * Formats a number as a price in Euro
 * @param {number} price - The price to format
 * @returns {string} - The formatted price
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};