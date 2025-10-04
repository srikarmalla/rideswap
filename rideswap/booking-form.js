document.addEventListener('DOMContentLoaded', function() {
    let selectedRide = JSON.parse(sessionStorage.getItem('selectedVehicle'));
    
    let rideInfoBox = document.getElementById('selected-vehicle-info');
    rideInfoBox.innerHTML = `
        <strong>${selectedRide.name}</strong> (₹${selectedRide.pricePerHour}/hour)
    `;
    
    let now = new Date();
    document.getElementById('date').valueAsDate = now;
    
    let bookingTime = new Date(now.getTime() + 60 * 60 * 1000);
    let hours = bookingTime.getHours().toString().padStart(2,'0');
    let mins = bookingTime.getMinutes().toString().padStart(2,'0');
    document.getElementById('time').value =` ${hours}:${mins}`;

    let phoneField = document.getElementById('phone');
    phoneField.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g,'');
    });

    let dateField = document.getElementById('date');
    dateField.addEventListener('change', checkDateIsValid);
    
    document.getElementById('duration-hours').addEventListener('change', updatePrice);
    document.getElementById('duration-minutes').addEventListener('change', updatePrice);
    
    updatePrice();
    
    let bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateAllFields()) return;
        
        let hrs = parseInt(document.getElementById('duration-hours').value) || 0;
        let mins = parseInt(document.getElementById('duration-minutes').value) || 0;
        let totalTime = hrs + (mins / 60);
        let finalCost = Math.round(selectedRide.pricePerHour * totalTime);
        
        document.getElementById('confirm-name').textContent = document.getElementById('name').value;
        document.getElementById('confirm-email').textContent = document.getElementById('email').value;
        document.getElementById('confirm-phone').textContent = document.getElementById('phone').value;
        document.getElementById('confirm-pickup').textContent = document.getElementById('pickup').value;
        document.getElementById('confirm-dropoff').textContent = document.getElementById('dropoff').value;
        
        let bookingDate = new Date(document.getElementById('date').value);
        let bookingTimeStr = document.getElementById('time').value;
        document.getElementById('confirm-datetime').textContent = 
            `${bookingDate.toDateString()} at ${bookingTimeStr}`;
        
        let durationText = `${hrs} hour${hrs !== 1 ? 's' : ''}`;
        if (mins > 0) {
            durationText += ` and ${mins} minute${mins !== 1 ? 's' : ''}`;
        }
        document.getElementById('confirm-duration').textContent = durationText;
        
        document.getElementById('confirm-vehicle').textContent = selectedRide.name;
        document.getElementById('confirm-rate').textContent = selectedRide.pricePerHour;
        document.getElementById('confirm-cost').textContent = finalCost;
        
        showSuccessScreen();
    });
});

function updatePrice() {
    let selectedRide = JSON.parse(sessionStorage.getItem('selectedVehicle'));
    let hrs = parseInt(document.getElementById('duration-hours').value) || 0;
    let mins = parseInt(document.getElementById('duration-minutes').value) || 0;
    let totalTime = hrs + (mins / 60);
    let finalCost = Math.round(selectedRide.pricePerHour * totalTime);
    
    document.getElementById('estimated-cost').textContent = `₹${finalCost}`;
}

function checkDateIsValid() {
    let dateField = document.getElementById('date');
    let chosenDate = new Date(dateField.value);
    
    let today = new Date();
    today.setHours(0,0,0,0);
    
    let errorMsg = document.getElementById('date-error');
    if (chosenDate < today) {
        errorMsg.style.display = 'block';
        dateField.setCustomValidity('Please select today or a future date');
        return false;
    } else {
        errorMsg.style.display = 'none';
        dateField.setCustomValidity('');
        return true;
    }
}

function validateAllFields() {
    let formIsValid = true;

    let phone = document.getElementById('phone').value;
    let phoneError = document.getElementById('phone-error');
    if (phone.length !== 10) {
        phoneError.style.display = 'block';
        formIsValid = false;
    } else {
        phoneError.style.display = 'none';
    }

    let email = document.getElementById('email').value;
    let emailError = document.getElementById('email-error');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.style.display = 'block';
        formIsValid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (!checkDateIsValid()) {
        formIsValid = false;
    }

    let hrs = parseInt(document.getElementById('duration-hours').value);
    let mins = parseInt(document.getElementById('duration-minutes').value);
    if (hrs < 1 && mins < 1) {
        alert('Please enter a valid duration (minimum 1 hour or 1 minute)');
        formIsValid = false;
    }

    return formIsValid;
}

function showSuccessScreen() {
    let animation = document.getElementById('receiptAnimation');
    animation.style.display = 'flex';
    
    setTimeout(() => {
        animation.classList.add('active');
    }, 10);
}

function hideAnimation() {
    let animation = document.getElementById('receiptAnimation');
    animation.classList.remove('active');
    
    setTimeout(() => {
        animation.style.display = 'none';
        document.getElementById('bookingForm').style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';
    }, 300);
}