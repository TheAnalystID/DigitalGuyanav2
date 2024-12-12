class FormValidator {
  constructor(form) {
    this.form = form;
    this.submitButton = form.querySelector('button[type="submit"]');
    this.isSubmitting = false;

    this.setupValidation();
  }

  setupValidation() {
    this.form.noValidate = true; // Disable native validation
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.form.addEventListener('input', this.handleInput.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.isSubmitting) return;

    const isValid = this.validateForm();
    if (!isValid) return;

    try {
      this.setLoading(true);
      await this.submitForm();
      this.showSuccess();
      this.form.reset();
    } catch (error) {
      this.showError(error);
    } finally {
      this.setLoading(false);
    }
  }

  handleInput(event) {
    const field = event.target;
    this.validateField(field);
  }

  validateForm() {
    let isValid = true;
    this.form.querySelectorAll('input, select, textarea').forEach(field => {
      if (!this.validateField(field)) isValid = false;
    });
    return isValid;
  }

  validateField(field) {
    const errorElement = this.getErrorElement(field);
    let isValid = field.checkValidity();
    let errorMessage = '';

    if (!isValid) {
      if (field.validity.valueMissing) {
        errorMessage = 'This field is required';
      } else if (field.validity.typeMismatch) {
        errorMessage = `Please enter a valid ${field.type}`;
      } else if (field.validity.tooShort) {
        errorMessage = `Minimum ${field.minLength} characters required`;
      }
    }

    this.updateFieldStatus(field, errorElement, isValid, errorMessage);
    return isValid;
  }

  updateFieldStatus(field, errorElement, isValid, errorMessage) {
    field.setAttribute('aria-invalid', !isValid);
    field.classList.toggle('error', !isValid);
    field.classList.toggle('valid', isValid);
    
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.hidden = isValid;
    }
  }

  getErrorElement(field) {
    const id = `${field.id}-error`;
    return document.getElementById(id) || this.createErrorElement(field, id);
  }

  createErrorElement(field, id) {
    const error = document.createElement('div');
    error.id = id;
    error.className = 'error-message';
    error.setAttribute('aria-live', 'polite');
    field.parentNode.appendChild(error);
    return error;
  }

  setLoading(isLoading) {
    this.isSubmitting = isLoading;
    this.submitButton.classList.toggle('loading', isLoading);
    this.submitButton.disabled = isLoading;
  }

  async submitForm() {
    // Replace with your actual form submission logic
    const formData = new FormData(this.form);
    const response = await fetch(this.form.action, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }
  }

  showSuccess() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Form submitted successfully!';
    this.form.parentNode.insertBefore(message, this.form.nextSibling);
    setTimeout(() => message.remove(), 5000);
  }

  showError(error) {
    const message = document.createElement('div');
    message.className = 'error-message global';
    message.textContent = error.message;
    this.form.parentNode.insertBefore(message, this.form);
    setTimeout(() => message.remove(), 5000);
  }
} 