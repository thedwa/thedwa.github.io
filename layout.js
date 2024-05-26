// layout.js
document.addEventListener("DOMContentLoaded", function () {
    const header = `
      <header class="px-4 lg:px-6 h-14 flex items-center">
        <a class="flex items-center justify-center" href="#">
          <span class="sr-only">Theodore Wanner</span>
        </a>
        <nav class="ml-auto flex gap-4 sm:gap-6">
          <a class="text-sm font-medium hover:underline underline-offset-4" href="#about">About</a>
          <a class="text-sm font-medium hover:underline underline-offset-4" href="#experience">Experience</a>
          <a class="text-sm font-medium hover:underline underline-offset-4" href="#education">Education</a>
        </nav>
      </header>
    `;
  
    const footer = `
      <footer class="px-4 lg:px-6 py-4 bg-gray-100 text-center">
        <p>&copy; 2024 Theodore Wanner. All rights reserved.</p>
      </footer>
    `;
  
    document.body.insertAdjacentHTML('afterbegin', header);
    document.body.insertAdjacentHTML('beforeend', footer);
  });
  