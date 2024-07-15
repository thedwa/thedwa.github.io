
// ADDING THE TEXT ANIMATION OF THE HEADER
document.addEventListener('DOMContentLoaded', function() {
    const tags = [
      "FOUNDER FOODWISE",
      "PRODUCT MANAGER",
      "BUSINESS & TECHNOLOGY",
      "SOFTWARE ENGINEERING",
      "CREDIT RISK",
      "ACCOUNT MANAGEMENT"
    ];
    const typedTags = document.getElementById('typed-tags');
    let currentTagIndex = 0;
  
    function typeTag(tag, index = 0) {
      if (index < tag.length) {
        typedTags.textContent = tag.substring(0, index + 1);
        setTimeout(() => typeTag(tag, index + 1), 50);
      } else {
        setTimeout(eraseTag, 2000);
      }
    }
  
    function eraseTag() {
      const currentText = typedTags.textContent;
      if (currentText.length > 0) {
        typedTags.textContent = currentText.substring(0, currentText.length - 1);
        setTimeout(eraseTag, 30);
      } else {
        currentTagIndex = (currentTagIndex + 1) % tags.length;
        setTimeout(() => typeTag(tags[currentTagIndex]), 500);
      }
    }
  
    typeTag(tags[currentTagIndex]);
  });

// EXPERIENCE ITEMS

document.addEventListener('DOMContentLoaded', function() {
    const experienceItems = document.querySelectorAll('.experience-item');
  
    experienceItems.forEach(item => {
      const tabs = item.querySelectorAll('.tab-button');
      const contents = item.querySelectorAll('.tab-content');
  
      // Show the first tab content by default
      contents[0].style.display = 'block';
  
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const tabId = tab.getAttribute('data-tab');
          
          tabs.forEach(t => t.classList.remove('active'));
          contents.forEach(c => c.style.display = 'none');
  
          tab.classList.add('active');
          item.querySelector(`#${tabId}`).style.display = 'block';
        });
      });
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-item');
    
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target.querySelector('.skill-fill');
                const skillLevel = entry.target.querySelector('.skill-level').textContent;
                skillFill.style.width = skillLevel;
                observer.unobserve(entry.target);
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Animate certification cards
    const certCards = document.querySelectorAll('.certification-card');
    
    const animateCertCards = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const certObserver = new IntersectionObserver(animateCertCards, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    certCards.forEach(card => {
        certObserver.observe(card);
    });

    // Animate education timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateTimelineItems = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-item-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const timelineObserver = new IntersectionObserver(animateTimelineItems, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Degree card flip animation
    const degreeCards = document.querySelectorAll('.degree-card');
    
    degreeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.degree-card-inner').style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.degree-card-inner').style.transform = 'rotateY(0deg)';
        });
    });

    // Parallax effect for section backgrounds
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionSpeed = section.dataset.speed || 0.5;
            const yPos = -(scrollPosition * sectionSpeed);
            section.style.backgroundPositionY = yPos + 'px';
        });
    });
});


// technical background:
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const header = item.querySelector('.skill-header');
        const expandBtn = item.querySelector('.expand-btn');

        header.addEventListener('click', () => {
            item.classList.toggle('expanded');
            expandBtn.textContent = item.classList.contains('expanded') ? '−' : '+';
        });
    });
});

// when expanding one section, collapse the other section: 

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        // Collapse all sections
        document.querySelectorAll('.accordion-body').forEach(body => {
            body.style.display = 'none';
        });

        // Expand the clicked section
        const body = header.nextElementSibling;
        if (body.style.display === 'none' || body.style.display === '') {
            body.style.display = 'block';
        }
    });
});

// CHAT FEATURE AND FUNCTIONS START
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    function getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Element with id '${id}' not found`);
        }
        return element;
    }

    const chatToggle = getElement('chat-toggle');
    const chatWindow = getElement('chat-window');
    const chatClose = getElement('chat-close');
    const chatMessages = getElement('chat-messages');
    const chatInput = getElement('chat-input');
    const chatSend = getElement('chat-send');

    if (!chatMessages) {
        console.error("Chat messages container not found. Chat functionality will not work.");
        return;
    }

    // Create typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingIndicator);

    // Disclaimer message
    const disclaimer = `
        <div class="chat-disclaimer">
            <p><strong>Disclaimer:</strong> This AI assistant provides information based on my background but may occasionally make mistakes or deviate from my actual thoughts or intentions. Please use it for general inquiries and a general look and feel, but don't take it for granted.</p>
        </div>
    `;

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            if (!chatWindow.classList.contains('hidden') && chatMessages.children.length === 1) {
                // Add disclaimer when opening chat for the first time
                chatMessages.insertAdjacentHTML('afterbegin', disclaimer);
            }
        });
    }

    if (chatClose && chatWindow) {
        chatClose.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }

    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    async function sendMessage() {
        if (!chatInput || !typingIndicator) {
            console.error("Required elements for sending messages are missing");
            return;
        }

        const message = chatInput.value.trim();
        if (message === '') return;

        addMessage(message, 'user');
        chatInput.value = '';

        // Show typing indicator
        typingIndicator.style.display = 'flex';
        scrollToBottom();

        try {
            const response = await query({ question: message });
            // Hide typing indicator
            typingIndicator.style.display = 'none';
            addMessage(response.text, 'bot');
        } catch (error) {
            console.error('Error sending message:', error);
            // Hide typing indicator
            typingIndicator.style.display = 'none';
            addMessage('Coming soon - just awaiting deployment :)', 'bot');
        }
    }

    function addMessage(text, sender) {
        if (!chatMessages || !typingIndicator) {
            console.error("Required elements for adding messages are missing");
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        
        // Parse markdown for bot messages
        if (sender === 'bot') {
            messageElement.innerHTML = parseMarkdown(text);
        } else {
            messageElement.textContent = text;
        }
        
        chatMessages.insertBefore(messageElement, typingIndicator);
        scrollToBottom();
    }

    function parseMarkdown(text) {
        // Enhanced Markdown parsing
        return text
            // Headers
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h4>$1</h4>')
            .replace(/^# (.*$)/gm, '<h5>$1</h5>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Line breaks
            .replace(/\n/g, '<br>')
            // Unordered list
            .replace(/^\s*[-*+] (.+)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            // Ordered list
            .replace(/^\s*\d+\. (.+)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')
            // Links
            .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    async function query(data) {
        // Simulate network delay for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await fetch(
            //"http://localhost:3000/api/v1/prediction/74e19091-5c72-4230-b521-d8965f5d5e3e",
            "https://thewa-thewanner-com.hf.space/api/v1/prediction/0d9758da-b30e-4460-8908-3c2d1ba1c770",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        const result = await response.json();
        return result;
    }

    console.log("Chat functionality initialized");
});

// expertise tags opening and closing

document.addEventListener('DOMContentLoaded', function() {
    const expertiseTags = document.querySelectorAll('.expertise-tag');

    expertiseTags.forEach(tag => {
        tag.addEventListener('click', function(event) {
            // Prevent the click from bubbling up to parent elements
            event.stopPropagation();

            // Close all other open tags
            expertiseTags.forEach(otherTag => {
                if (otherTag !== this) {
                    otherTag.classList.remove('active');
                }
            });

            // Toggle the clicked tag
            this.classList.toggle('active');
        });
    });

    // Close tag content when clicking outside
    document.addEventListener('click', function() {
        expertiseTags.forEach(tag => tag.classList.remove('active'));
    });
});

// hero buttons functions:

document.addEventListener('DOMContentLoaded', function() {
    const openChatButton = document.getElementById('open-chat');
    const chatToggle = document.getElementById('chat-toggle');
    
    openChatButton.addEventListener('click', function() {
        chatToggle.click();
    });
});


// toggle menu for mobile view
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    const navItems = document.querySelectorAll('nav ul li');
  
    function isMobile() {
      return window.innerWidth < 768; // Adjust this breakpoint if needed
    }
  
    function closeMenu() {
      if (isMobile()) {
        menuToggle.classList.remove('active');
        navUl.classList.remove('show');
        navItems.forEach(item => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(-20px)';
        });
      }
    }
  
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navUl.classList.toggle('show');
  
      if (navUl.classList.contains('show')) {
        navItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 100);
        });
      } else {
        closeMenu();
      }
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (isMobile() && !event.target.closest('nav')) {
        closeMenu();
      }
    });
  
    // Close menu when clicking a menu item on mobile
    navItems.forEach(item => {
      item.addEventListener('click', function(event) {
        if (isMobile()) {
          closeMenu();
        }
      });
    });
  
    // Handle window resize
    window.addEventListener('resize', function() {
      if (!isMobile()) {
        navUl.classList.remove('show');
        menuToggle.classList.remove('active');
        navItems.forEach(item => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      }
    });


  // Smooth scroll function
  function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Apply smooth scroll to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (isMobile()) {
        closeMenu();
      }

      // Get the target element's top position, accounting for the fixed header
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const headerOffset = document.querySelector('nav').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Smooth scroll to the target
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// projects section

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const imagePopup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const popupCaption = document.getElementById('popupCaption');
    const closePopup = document.querySelector('.close-popup');

    // Lazy loading
    const lazyImages = document.querySelectorAll('.lazy-image');
    const lazyLoadOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, lazyLoadOptions);

    lazyImages.forEach(img => lazyLoadObserver.observe(img));

    projectCards.forEach(card => {
        card.addEventListener('click', function(event) {
            if (!event.target.classList.contains('clickable-image') && !card.classList.contains('placeholder-card')) {
                event.preventDefault();

                // Close all other expanded cards
                projectCards.forEach(otherCard => {
                    if (otherCard !== this && otherCard.classList.contains('expanded')) {
                        otherCard.classList.remove('expanded');
                    }
                });

                // Toggle the clicked card
                this.classList.toggle('expanded');

                // Ensure the expanded card is fully visible
                if (this.classList.contains('expanded')) {
                    const rect = this.getBoundingClientRect();
                    const isFullyVisible = (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                    );

                    if (!isFullyVisible) {
                        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }
            }
        });

        const clickableImage = card.querySelector('.clickable-image');
        if (clickableImage) {
            clickableImage.addEventListener('click', function(event) {
                event.stopPropagation();
                popupImage.src = this.src;
                popupCaption.textContent = this.nextElementSibling.textContent;
                imagePopup.style.display = 'block';
            });
        }
    });

    // Close expanded card when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.project-card')) {
            projectCards.forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });

    // Close popup when clicking on close button or outside the image
    closePopup.onclick = function() {
        imagePopup.style.display = 'none';
    }

    imagePopup.onclick = function(event) {
        if (event.target === imagePopup) {
            imagePopup.style.display = 'none';
        }
    }
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// button tracking GA4

document.addEventListener('DOMContentLoaded', function() {
    // Chat with TheoGPT button
    const chatGPTButton = document.getElementById('open-chat');
    if (chatGPTButton) {
        chatGPTButton.addEventListener('click', function() {
            gtag('event', 'chat_with_theogpt_click', {
                event_category: 'engagement',
                event_label: 'hero_chat_button'
            });
        });
    }

    // Chat about Théodore button
    const chatToggle = document.getElementById('chat-toggle');
    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            gtag('event', 'chat_about_theodore_click', {
                event_category: 'engagement',
                event_label: 'hover_chat_button'
            });
        });
    }
});
