function createLoadingSpinner() {
  const svg = `
    <svg class="loading-spinner w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  `;
  return svg;
}

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
      formMessage.innerHTML = `
        <span class="success-message inline-flex items-center gap-2">
          <i data-lucide="check-circle" class="w-4 h-4 text-green-400"></i>
          Thanks for joining! We'll be in touch soon.
        </span>
      `;
      formMessage.className = 'text-sm text-green-400';
      emailInput.value = '';
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    formMessage.innerHTML = `
      <span class="inline-flex items-center gap-2">
        <i data-lucide="x-circle" class="w-4 h-4 text-red-400"></i>
        Something went wrong. Please try again.
      </span>
    `;
    formMessage.className = 'text-sm text-red-400';
  } finally {
    // Reset button state
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonContent;
    lucide.createIcons();
  }
}