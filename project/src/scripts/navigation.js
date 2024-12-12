document.addEventListener('DOMContentLoaded', () => {
  // Handle keyboard navigation for dropdown menus
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('[aria-haspopup="true"]');
    const menu = dropdown.querySelector('[role="menu"]');
    const menuItems = menu.querySelectorAll('[role="menuitem"]');
    
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', !expanded);
        menu.hidden = expanded;
      }
    });
    
    // Allow arrow key navigation within menu items
    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        let targetItem;
        
        switch(e.key) {
          case 'ArrowDown':
            e.preventDefault();
            targetItem = menuItems[index + 1] || menuItems[0];
            break;
          case 'ArrowUp':
            e.preventDefault();
            targetItem = menuItems[index - 1] || menuItems[menuItems.length - 1];
            break;
          case 'Escape':
            e.preventDefault();
            trigger.setAttribute('aria-expanded', 'false');
            menu.hidden = true;
            trigger.focus();
            break;
        }
        
        targetItem?.focus();
      });
    });
  });
}); 