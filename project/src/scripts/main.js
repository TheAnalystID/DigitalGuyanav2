import { FormValidator } from './form-validation.js';
import './page-transitions.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize form validation for all forms
  document.querySelectorAll('form').forEach(form => {
    new FormValidator(form);
  });

  // Global error handler
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showErrorNotification('An unexpected error occurred. Please try again.');
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showErrorNotification('An unexpected error occurred. Please try again.');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.1
  });

  // Observe all sections except hero
  document.querySelectorAll('section:not(.hero)').forEach(section => {
    observer.observe(section);
  });
});

function showErrorNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'error-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
} 