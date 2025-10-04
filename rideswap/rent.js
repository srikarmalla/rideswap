var selectedVehicle = null;
const bookingModal = document.getElementById('bookingModal');
const confirmationModal = document.getElementById('confirmationModal');
let bookingForm = document.getElementById('bookingForm');
var printButton = document.getElementById('printButton');
const doneButton = document.getElementById('doneButton');

const rentBtns = document.querySelectorAll('.rent-btn');
const vehicleCards = document.querySelectorAll('.vehicle-card');
const closeButtons = document.querySelectorAll('.close-modal');

document.getElementById('phone').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');

    if(this.value.length > 10) {
        this.value = this.value.substring(0, 10);
    }
});

var emailField = document.getElementById('email');
function checkEmail(mail) {
    return /^\S+@\S+\.\S+$/.test(mail);
}

emailField.addEventListener('blur', function() {
    if(!checkEmail(this.value) && this.value !== '') {
        this.style.borderColor = 'red';
    } else {
        this.style.borderColor = '';
    }
});

function openBookingModal(vehicle) {

    selectedVehicle = {
        name: vehicle.getAttribute('data-vehicle'),
        price: parseInt(vehicle.getAttribute('data-price')),
        type: vehicle.getAttribute('data-type')
    };

    bookingModal.style.display = 'flex';
}

vehicleCards.forEach(function(card) {
    card.addEventListener('click', function() {
        openBookingModal(card);
    });
});

rentBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.stopPropagation(); 
        var card = this.closest('.vehicle-card');
        openBookingModal(card);
    });
});

for(let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        bookingModal.style.display = 'none';
        confirmationModal.style.display = 'none';
    };
}

window.onclick = function(event) {
    if(event.target == bookingModal) {
        bookingModal.style.display = 'none';
    }
    
    if(event.target == confirmationModal) {
        confirmationModal.style.display = 'none';
    }
};

function validateDateRange() {
    var pickupD = new Date(pickupDateInput.value);
    var returnD = new Date(returnDateInput.value);

    if(!isNaN(pickupD.getTime()) && !isNaN(returnD.getTime())) {
        var timeDiff = returnD.getTime() - pickupD.getTime();
        var daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

        if(daysDiff > 100) {
            alert('Maximum rental period is 100 days. Please select a shorter period.');

            var maxDate = new Date(pickupD);
            maxDate.setDate(pickupD.getDate() + 99); 
            
            returnDateInput.value = maxDate.toISOString().split('T')[0];
            return false;
        }
    }
    return true;
}

var today = new Date();
var nextDay = new Date(today);
nextDay.setDate(today.getDate() + 1);

function formatDateStr(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

var pickupDateInput = document.getElementById('pickupDate');
var returnDateInput = document.getElementById('returnDate');

pickupDateInput.min = formatDateStr(today);
returnDateInput.min = formatDateStr(nextDay);

pickupDateInput.addEventListener('change', function() {
    var newPickupDate = new Date(this.value);
    var minReturnDate = new Date(newPickupDate);
    minReturnDate.setDate(minReturnDate.getDate() + 1);
    
    returnDateInput.min = formatDateStr(minReturnDate);
    

    var currentReturnDate = new Date(returnDateInput.value);
    if(currentReturnDate < minReturnDate) {
        returnDateInput.value = formatDateStr(minReturnDate);
    }
    
    validateDateRange();
});

returnDateInput.onchange = function() {
    validateDateRange();
};

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var phoneNum = document.getElementById('phone').value;
    if(phoneNum.length != 10) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    var emailVal = document.getElementById('email').value;
    if(!checkEmail(emailVal)) {
        alert('Please provide a valid email address');
        emailField.style.borderColor = 'red';
        emailField.focus();
        return;
    }

    if(!validateDateRange()) {
        return;
    }

    var fName = document.getElementById('firstName').value;
    var lName = document.getElementById('lastName').value;
    var idType = document.getElementById('idType').value;
    var idNum = document.getElementById('idNumber').value;
    var pickupDate = new Date(document.getElementById('pickupDate').value);
    var returnDate = new Date(document.getElementById('returnDate').value);

    var msPerDay = 24 * 60 * 60 * 1000;
    var diffTime = returnDate - pickupDate;
    var dayCount = Math.round(diffTime / msPerDay) + 1;
    
    var subTotal = selectedVehicle.price * dayCount;
    var taxAmount = Math.round(subTotal * 0.18 * 100) / 100; 
    var totalAmount = subTotal + taxAmount;
    

    var timestamp = new Date();
    var randomNum = Math.floor(Math.random() * 90 + 10); 
    var bookingId = 'RSW' + 
                  timestamp.getFullYear() + 
                  ('0' + (timestamp.getMonth() + 1)).slice(-2) + 
                  ('0' + timestamp.getDate()).slice(-2) + 
                  randomNum;
    
    document.getElementById('conf-vehicle').textContent = selectedVehicle.name;
    document.getElementById('conf-type').innerText = selectedVehicle.type;
    document.getElementById('conf-rate').textContent = '₹' + selectedVehicle.price + '/day';

    var dateOpts = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('conf-pickup').innerText = pickupDate.toLocaleDateString('en-US', dateOpts);
    document.getElementById('conf-return').textContent = returnDate.toLocaleDateString('en-US', dateOpts);
    
    var dayText = dayCount === 1 ? 'Day' : 'Days';
    document.getElementById('conf-duration').textContent = dayCount + ' ' + dayText;
    document.getElementById('conf-booking-id').innerText = bookingId;

    document.getElementById('conf-name').textContent = fName + ' ' + lName;
    document.getElementById('conf-email').innerText = emailVal;
    document.getElementById('conf-phone').textContent = phoneNum;
    document.getElementById('conf-id-type').innerText = idType;
    document.getElementById('conf-id-number').textContent = idNum;

    document.getElementById('conf-subtotal').innerText = '₹' + subTotal;
    document.getElementById('conf-tax').textContent = '₹' + taxAmount;
    document.getElementById('conf-total').textContent = '₹' + totalAmount;

    bookingModal.style.display = 'none';
    confirmationModal.style.display = 'flex';
});

printButton.onclick = function() {
    window.print();
};

doneButton.addEventListener('click', function() {
    confirmationModal.style.display = 'none';
    bookingForm.reset();
});