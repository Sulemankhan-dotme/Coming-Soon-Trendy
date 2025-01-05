// Error message constants
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  SERVER: 'Server error. Please try again later.',
  VALIDATION: 'Please enter a valid email address.',
  RATE_LIMIT: 'Too many attempts. Please try again later.',
  DEFAULT: 'Something went wrong. Please try again.'
};

export function getErrorMessage(error) {
  if (!navigator.onLine) {
    return ERROR_MESSAGES.NETWORK;
  }
  
  if (error.status === 429) {
    return ERROR_MESSAGES.RATE_LIMIT;
  }
  
  if (error.status >= 500) {
    return ERROR_MESSAGES.SERVER;
  }
  
  return ERROR_MESSAGES.DEFAULT;
}