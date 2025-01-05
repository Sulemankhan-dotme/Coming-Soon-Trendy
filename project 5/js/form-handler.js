import { getErrorMessage } from './utils/error-messages.js';
import { createLoadingSpinner, showMessage } from './utils/ui-helpers.js';

async function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const emailInput = form.querySelector('#emailInput');
  const submitButton = form.querySelector('button[type="submit"]');
  const formMessage = document.getElementById('formMessage');
  const originalButtonContent = submitButton.innerHTML;
  
  // Disable the button and show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = `${createLoadingSpinner()} Joining...`;
  
  try {
    const response = await fetch('https://greenmusk.app.n8n.cloud/webhook/1acf57ee-a4c5-40ff-a500-7d0cc21733ef', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailInput.value })
    });

    if (response.ok) {
      showMessage(formMessage, 'Thanks for joining! We\'ll be in touch soon.', 'success');
      emailInput.value = '';
    } else {
      const errorMessage = getErrorMessage(response);
      showMessage(formMessage, errorMessage);
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    showMessage(formMessage, errorMessage);
  } finally {
    // Reset button state
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonContent;
    lucide.createIcons();
  }
}