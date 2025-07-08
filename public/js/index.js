document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.container-a');
  
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  });
  