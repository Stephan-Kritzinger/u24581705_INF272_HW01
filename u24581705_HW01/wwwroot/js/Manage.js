$(document).ready(function () {
    const drivers = JSON.parse(localStorage.getItem("drivers")) || [];
    $.each(drivers, function (index, driver) {
        const row = `
            <tr>
                <td><img src="/Images/Driver/${driver.image}" width="50" height="50" /></td>
                <td>${driver.firstName}</td>
                <td>${driver.lastName}</td>
                <td>${driver.phone}</td>
                <td>${driver.service}</td>
                <td>
                    <div>
                        <button type="button" class="btn btn-warning rounded-pill px-4 text-light" onclick="window.location.href='/Home/EditDriver?driver=${encodeURIComponent(JSON.stringify(driver))}'">Update</button>
                        <button type="button" class="btn btn-danger rounded-pill px-4" onclick="deleteDriver('${driver.phone}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
        $("#driver-body").append(row);
    });

    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    $.each(vehicles, function (index, vehicle) {
        const row = `
            <tr>
                <td><img src="/Images/Vehicle/${vehicle.image}" width="50" height="50" /></td>
                <td>${vehicle.type}</td>
                <td>${vehicle.registration}</td>
                <td>${vehicle.service}</td>
                <td>
                    <div>
                        <button type="button" class="btn btn-warning rounded-pill px-4 text-light" onclick="window.location.href='/Home/EditVehicle?vehicle=${encodeURIComponent(JSON.stringify(vehicle))}'">Update</button>
                        <button type="button" class="btn btn-danger rounded-pill px-4" onclick="deleteVehicle('${vehicle.registration}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
        $("#vehicle-body").append(row);
    });

});

function deleteDriver(phone) {
    let drivers = JSON.parse(localStorage.getItem("drivers")) || [];
    drivers = drivers.filter(d => d.phone != phone);
    localStorage.setItem("drivers", JSON.stringify(drivers));
    window.location.reload();
}

function deleteVehicle(registration) {
    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    vehicles = vehicles.filter(d => d.registration != registration);
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    window.location.reload();
}

function renderDriverTable(driverList) {
    const drivers = driverList
    $.each(drivers, function (index, driver) {
        const row = `
            <tr>
                <td><img src="/Images/Driver/${driver.image}" width="50" height="50" /></td>
                <td>${driver.firstName}</td>
                <td>${driver.lastName}</td>
                <td>${driver.phone}</td>
                <td>${driver.service}</td>
                <td>
                    <div>
                        <button type="button" class="btn btn-warning rounded-pill px-4 text-light" onclick="window.location.href='/Home/EditDriver?driver=${encodeURIComponent(JSON.stringify(driver))}'">Update</button>
                        <button type="button" class="btn btn-danger rounded-pill px-4" onclick="deleteDriver('${driver.phone}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
        $("#driver-body").append(row);
    });
}

function filterDrivers() {
    var driverName = $("#driverSearchName").val();
    driverName = driverName.toString().trim().toLowerCase();

    var service = $("#driverSearchService").val();
    service = service.toString();

    const drivers = JSON.parse(localStorage.getItem("drivers")) || [];
    const filtered = drivers.filter(d => {
        const fullName = `${d.firstName} ${d.lastName}`.toLowerCase();
        const nameMatch = !driverName || fullName.includes(driverName);
        const serviceMatch = service === "--Select a Option--" || d.service == service;

        return nameMatch && serviceMatch;
    });
    $("#driver-body").empty();
    renderDriverTable(filtered);
    
}

function exportVehicles() {
    const vehicles = localStorage.getItem("vehicles");
    if (!vehicles) {
        alert("No vehicles found in localStorage.");
        return;
    }

    const blob = new Blob([JSON.stringify(JSON.parse(vehicles), null, 2)], {
        type: "text/plain"
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "vehicles.txt";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}