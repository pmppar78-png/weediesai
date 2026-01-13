// Ensure DOM is fully loaded before initializing chat
function initChat() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const windowEl = document.getElementById('chat-window');

  // Debug logging to help diagnose issues
  if (!form) {
    console.error('Chat initialization failed: #chat-form not found');
    return;
  }
  if (!input) {
    console.error('Chat initialization failed: #chat-input not found');
    return;
  }
  if (!windowEl) {
    console.error('Chat initialization failed: #chat-window not found');
    return;
  }

  console.log('Chat initialized successfully');

  const mode = document.body.getAttribute('data-ai-mode') || 'strain';

  function scrollToBottom() {
    windowEl.scrollTop = windowEl.scrollHeight;
  }

  function appendMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + (role === 'user' ? 'user' : 'ai');

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';

    // Convert newlines to paragraphs for better formatting
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    bubble.innerHTML = paragraphs.map(p =>
      '<p>' + p
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>") + '</p>'
    ).join('');

    msg.appendChild(bubble);
    windowEl.appendChild(msg);
    scrollToBottom();
  }

  let isSending = false;
  const history = [];

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Form submitted');

    if (isSending) {
      console.log('Already sending, ignoring submit');
      return;
    }

    const value = input.value.trim();
    if (!value) {
      console.log('Empty message, ignoring submit');
      return;
    }

    console.log('Sending message:', value);

    // Append user message to chat window
    appendMessage('user', value);
    history.push({ role: "user", content: value });

    // Clear input field
    input.value = "";
    isSending = true;

    // Show loading bubble
    appendMessage('ai', "…");
    const bubbles = windowEl.querySelectorAll('.chat-message.ai .chat-bubble');
    const loadingBubble = bubbles[bubbles.length - 1];

    try {
      console.log('Fetching AI response...');
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode: mode,
          messages: history
        })
      });

      if (!res.ok) {
        throw new Error("Network error: " + res.status);
      }

      const data = await res.json();
      const reply = (data && data.reply) ? data.reply : "Sorry, I couldn't respond right now. Please try again.";

      console.log('AI response received:', reply.substring(0, 50) + '...');

      // Convert newlines to paragraphs for better formatting
      const paragraphs = reply.split('\n\n').filter(p => p.trim());
      loadingBubble.innerHTML = paragraphs.map(p =>
        '<p>' + p
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\n/g, "<br>") + '</p>'
      ).join('');

      history.push({ role: "assistant", content: reply });
    } catch (err) {
      console.error('AI chat error:', err);
      loadingBubble.innerHTML = "<p>I hit a snag connecting to the AI. Please try again in a moment.</p>";
    } finally {
      isSending = false;
      scrollToBottom();
    }
  });

  // Auto-resize textarea as user types
  input.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 200) + 'px';
  });

  // Reset textarea height on submit
  form.addEventListener('submit', function() {
    setTimeout(() => {
      input.style.height = 'auto';
    }, 0);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChat);
} else {
  // DOM is already ready
  initChat();
}
