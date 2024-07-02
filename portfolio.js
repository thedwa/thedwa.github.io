
// ADDING THE TEXT ANIMATION OF THE HEADER
document.addEventListener('DOMContentLoaded', function() {
    const tags = [
      "FOUNDER FOODWISE",
      "BUSINESS & TECHNOLOGY PRODUCT MANAGER",
      "EX-GOOGLE",
      "SELF-TAUGHT SOFTWARE ENGINEER",
      "CREDIT RISK"
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
        const tabButtons = item.querySelectorAll('.tab-button');
        const tabContents = item.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                const tabContent = item.querySelector(`#${tabId}`);

                // Remove active class from all buttons and contents within this experience item
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                tabContent.classList.add('active');
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

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
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
            addMessage('Sorry, I encountered an error.', 'bot');
        }
    }

    function addMessage(text, sender) {
        if (!chatMessages || !typingIndicator) {
            console.error("Required elements for adding messages are missing");
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.insertBefore(messageElement, typingIndicator);
        scrollToBottom();
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
            "http://localhost:3000/api/v1/prediction/74e19091-5c72-4230-b521-d8965f5d5e3e",
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
            event.stopPropagation();

            // Close all other open tags
            expertiseTags.forEach(otherTag => {
                if (otherTag !== tag) {
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