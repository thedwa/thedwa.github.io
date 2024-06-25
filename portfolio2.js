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