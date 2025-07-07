var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        }
      }
  });

  function openChat() {
    if (window.Retell && window.Retell.open) {
        window.Retell.open();
        console.log('Chat opened successfully');
    } else {
        console.log('Retell widget not available yet');
        alert('Chat is still loading, please try again in a moment.');
    }
}

// Function to check if chat widget is ready
function checkChatWidget() {
    const statusElement = document.getElementById('chat-status');
    const testButton = document.getElementById('test-chat-btn');
    
    if (window.Retell && window.Retell.open) {
        statusElement.textContent = '✅ Chat widget is ready!';
        statusElement.style.color = '#28a745';
        testButton.disabled = false;
        return true;
    } else {
        statusElement.textContent = '⏳ Chat widget is still loading...';
        statusElement.style.color = '#ffc107';
        return false;
    }
}

// Wait for the page to load completely
window.addEventListener('load', function() {
    console.log('Page loaded, checking for Retell widget...');
    
    // Check immediately
    if (!checkChatWidget()) {
        // If not ready, check every 500ms for up to 10 seconds
        let attempts = 0;
        const maxAttempts = 20;
        
        const checkInterval = setInterval(function() {
            attempts++;
            
            if (checkChatWidget()) {
                clearInterval(checkInterval);
                console.log('Retell widget is ready!');
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                document.getElementById('chat-status').textContent = '❌ Chat widget failed to load';
                document.getElementById('chat-status').style.color = '#dc3545';
                console.log('Retell widget failed to load after maximum attempts');
            }
        }, 500);
    }
});

// Add click event listeners to all custom-btn buttons
document.addEventListener('click', function(event) {
    // Check if clicked element has the 'custom-btn' class
    if (event.target.classList.contains('custom-btn')) {
        event.preventDefault(); // Prevent default button behavior
        openChat();
    }
});
