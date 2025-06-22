function generateSOS() {
    const guid = crypto.randomUUID();

    const datetime = new Date();
    const date = datetime.toLocaleDateString('en-GB').replace(/\//g, '-');
    const time = datetime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const driver = getRandomObject("drivers");
    const vehicle = getRandomObject("vehicles");

    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const json = {
            guid: guid,
            date: date,
            time: time,
            address: `${latitude}, ${longitude}`,
            driverImage: driver.image,
            driverName: `${driver.firstName} ${driver.lastName}`,
            phone: driver.phone,
            vehicleImage: vehicle.image,
            type: vehicle.type,
            registration: vehicle.registration,
            sos: true
        };

        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push(json);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        window.location.href = "/Home/BookingConfirmed?guid=" + guid;
    });
}

function getRandomObject(key) {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    if (list.length === 0) return null;
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}