export function createLoadingSpinner() {
  return `
    <svg class="loading-spinner w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  `;
}

export function showMessage(element, message, type = 'error') {
  const icon = type === 'success' ? 'check-circle' : 'x-circle';
  const colorClass = type === 'success' ? 'text-green-400' : 'text-red-400';
  
  element.innerHTML = `
    <span class="${type === 'success' ? 'success-message' : ''} inline-flex items-center gap-2">
      <i data-lucide="${icon}" class="w-4 h-4 ${colorClass}"></i>
      ${message}
    </span>
  `;
  element.className = `text-sm ${colorClass}`;
  lucide.createIcons();
}