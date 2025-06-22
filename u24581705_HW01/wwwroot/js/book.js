
    document.addEventListener("DOMContentLoaded", function () {
    const pickerElement = document.getElementById("datetimepicker1");
    if (pickerElement) {
        new tempusDominus.TempusDominus(pickerElement, {
            display: {
                viewMode: "clock",
                components: {
                    decades: false,
                    year: false,
                    month: false,
                    date: false,
                    hours: true,
                    minutes: true,
                    seconds: false
                }
            },
            localization: {
                hourCycle: 'h23',
                format: 'yyyy-MM-dd HH:mm'
            }
        }
        );
    } else {
        console.warn("Tempus Dominus: picker element not found.");
    }
    });

$(document).ready(function () {
    function getQueryParam(key) {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
    }
    const selectedService = getQueryParam("service");

    const drivers = JSON.parse(localStorage.getItem("drivers")) || [];
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

    const $driverSelect = $("#Driver");
    const $vehicleSelect = $("#Vehicle");

    const filteredDrivers = drivers.filter(d => d.service === selectedService);
    if (filteredDrivers.length) {
        $.each(filteredDrivers, function (index, d) {
            const fullName = `${d.firstName} ${d.lastName}`;
            $driverSelect.append(`<option value="${d.phone}" data-name="${fullName}" data-image="${d.image}">${fullName}</option>`);
        });
    } else {
        $driverSelect.append(`<option disabled>No drivers available</option>`);
    }

    const filteredVehicles = vehicles.filter(v => v.service === selectedService);
    if (filteredVehicles.length) {
        $.each(filteredVehicles, function (index, v) {
            $vehicleSelect.append(`<option value="${v.registration}" data-type="${v.type}" data-image="${v.image}">${v.type}</option>`);
        });
    } else {
        $vehicleSelect.append(`<option disabled>No vehicles available</option>`);
    }

    syncDriver();
    syncVehicle();
});

function syncVehicle() {
    const selected = $("#Vehicle option:selected");
    $("#vehicleType").val(selected.data("type"));
    $("#vehicleImage").val(selected.data("image"));
}
function syncDriver() {
    const selected = $("#Driver option:selected");
    $("#driverName").val(selected.data("name"));
    $("#driverImage").val(selected.data("image"));
}

