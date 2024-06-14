document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('signupModal');
  const btn = document.getElementById('openSignupModal');
  const span = document.getElementsByClassName('close-btn')[0];

  if (btn) {
    btn.onclick = function() {
      modal.style.display = "block";
    };
  }

  if (span) {
    span.onclick = function() {
      modal.style.display = "none";
    };
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});