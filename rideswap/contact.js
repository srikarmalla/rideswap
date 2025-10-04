const phoneInput = document.querySelector('input[type="tel"]');  

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
        
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });
    
    phoneInput.addEventListener('focus', function() {
        this.style.borderColor = 'lightgray';
    });
}

const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        if (phoneInput) {
            const phone = phoneInput.value;
            
            if (phone.length !== 10) {
                e.preventDefault();
                alert('Please enter a valid 10-digit phone number');
                phoneInput.style.borderColor = 'red';
                phoneInput.focus();
            }
        }
    });
}

const loginEmail = document.getElementById("loginEmail");
if (loginEmail) {
    loginEmail.addEventListener("input", function() {
        this.value = this.value.toLowerCase();
    });
}

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const accordion = header.parentElement;
        accordion.classList.toggle('active');
    });
});