// Separators for the data in string shape 
const optionSeparator = ' . '
const arraySeparator = ','
const arraySeparator2 = ' , ' 

// DOM manipulation functions
const drawPickupsLocationSelect = (pickupLocations) => {
    $("#pickupLocationsContainer").html(
        '<label for="pickUpPoints">Punto de recogida</label>' +
        '<select name="pickup locations" id="selectPickupLocations" required>' +
            '<option value=""></option>' +
        '</select>'        
    )

    pickupLocations.forEach((location) => {
        let optionValue = `${location["name-ES"]} . ${location["stops"]} . ${location["destiny-ES"]} . ${location["tracks"]} . ${location["passengers"]}`
        $('#pickUpPoints').append(
            `<option value="${optionValue}">${location["name-ES"]}</option>`
        )
    })
}

const drawSelectExcursions = (excursions, excursionsObject) => {
    $("#excursionContainer").html(
        '<label for="excursions">Excursiones</label>' +
        '<select name="excursions" id="selectExcursions" required>' +
            '<option value=""></option>' +
        '</select>'        
    )

    excursions.forEach((excursion) => {
        let optionValue = excursion + optionSeparator
        try {
            optionValue += Object.keys(excursionsObject[excursion]["passengers ranges"])
        } catch (_) {}

        $('#excursions').append(
            `<option value="${optionValue}">${excursion}</option>`
        )
    })
}

const drawTracksSelect = (tracks) => {
    $("#tracksContainer").html(
        '<p>Vias:</p>' +
        '<input type="radio" name="tracks" id="tracks" value="1" required />' +        
        '<label for="tracks">1 via</label>' 
    )

    if (tracks > 1) {
        for (let i = 2; i <= tracks; i++) {
            $('#tracksContainer').append(
                `<input type="radio" name="tracks" id="tracks" value="${i}" required />` +
                `<label for="tracks">${i} vias</label>`
            )
        }
    }
}

const drawStopsSelect = (stops) => {
    $("#stopsContainer").html(
        '<label for="stops">Punto de parada</label>' +
        '<select name="stops" id="stops" required>' +
            '<option value=""></option>' +
        '</select>'        
    )

    stops.forEach(stop => {
        $('#stops').append(
            `<option value="${stop}">${stop}</option>`
        )
    })
}

const drawDestinySelect = (destinies) => {
    $("#destiniesContainer").html(
        '<label for="destinies">Destino</label>' +
        '<select name="destinies" id="destinies" required>' +
            '<option value=""></option>' +
        '</select>'        
        )
        
    destinies.forEach(destiny => {
        $('#destinies').append(
            `<option value="${destiny}">${destiny}</option>`
        )
    })
}

const drawPassengersSelect = (passgersCount) => {
    if (passgersCount[0]) {
        $("#passengersContainer").html(
            '<label for="passengers">Pasajeros</label>' +
            '<select name="passengers" id="passengers" required>' +
                '<option value=""></option>' +
            '</select>'        
        )

        passgersCount.forEach(passengers => {
            $('#passengers').append(
                `<option value="${passengers}">De ${passengers} pasajeros</option>`
            )
        })
    } else {
        $("#passengersContainer").html(
            '<p>El numero de pasajeros lo tiene que consultar con su proveedor</p>'
        )
    }
}

// Empty containers in the recived array by Id
const emptyContainers = (containerIds) => {
    containerIds.forEach(id => $(`#${id}`).empty())
}