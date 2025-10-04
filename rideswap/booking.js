function selectVehicle(vehicleType, vehicleName, pricePerHour) {
    sessionStorage.setItem('selectedVehicle', JSON.stringify({
        type: vehicleType,
        name: vehicleName,
        pricePerHour: pricePerHour
    }));

window.location.href = 'booking-form.html';}