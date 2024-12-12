class PageTransitionManager {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupTransitions();
      this.handleInitialLoad();
    });
  }

  setupTransitions() {
    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && this.shouldHandleLink(link)) {
        e.preventDefault();
        this.navigateToPage(link.href);
      }
    });

    window.addEventListener('popstate', () => {
      this.handlePageChange();
    });
  }

  shouldHandleLink(link) {
    return (
      link.href &&
      link.href.startsWith(window.location.origin) &&
      !link.hasAttribute('download') &&
      !link.hasAttribute('target')
    );
  }

  async navigateToPage(url) {
    try {
      await this.transitionOut();
      window.history.pushState({}, '', url);
      await this.handlePageChange();
      this.transitionIn();
    } catch (error) {
      console.error('Navigation error:', error);
      this.handleError();
    }
  }

  async handlePageChange() {
    try {
      const response = await fetch(window.location.href);
      const html = await response.text();
      const newContent = this.extractMainContent(html);
      this.updatePageContent(newContent);
    } catch (error) {
      console.error('Page load error:', error);
      this.handleError();
    }
  }

  extractMainContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.querySelector('main').innerHTML;
  }

  updatePageContent(content) {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = content;
  }

  transitionOut() {
    return new Promise(resolve => {
      const main = document.querySelector('main');
      main.style.opacity = '0';
      main.style.transform = 'translateY(20px)';
      setTimeout(resolve, 300);
    });
  }

  transitionIn() {
    const main = document.querySelector('main');
    main.style.opacity = '1';
    main.style.transform = 'translateY(0)';
  }

  handleInitialLoad() {
    document.querySelector('main').classList.add('page-transition');
  }

  handleError() {
    // Redirect to error page or show error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message global';
    errorMessage.textContent = 'An error occurred. Please try again.';
    document.body.appendChild(errorMessage);
    setTimeout(() => errorMessage.remove(), 5000);
  }
}

// Initialize page transitions
new PageTransitionManager(); 