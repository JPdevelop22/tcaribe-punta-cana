// Separators for the data sending in string shape 
const optionValueSeparator = ' . '
const arraySeparator = ','
const arraySeparator2 = ' , ' 

// DOM manipulation functions
const drawPickupsLocationSelect = (pickupLocations) => {
    $("#pickupLocationsContainer").html(
        '<h3>Desde:</h3>' +
        '<select name="pickup locations" id="selectPickupLocations" required>' +
            '<option value=""></option>' +
        '</select>'       
    )

    pickupLocations.forEach(location => {
        let optionValue = location["name-ES"] + optionValueSeparator + 
                            location["stops"] + optionValueSeparator + 
                            location["destinies-ES"] + optionValueSeparator +
                            location["tracks"] + optionValueSeparator +
                            location["passengers ranges"]

        $('#selectPickupLocations').append(
            `<option value="${optionValue}">${location["name-ES"]}</option>`
        )
    })
}

const drawSelectExcursions = (excursionNames) => {
    $("#excursionContainer").html(
        '<h3>Excursiones:</h3>' +
        '<select name="excursions" id="selectExcursions" required>' +
            '<option value=""></option>' +
        '</select>'       
    )

    excursionNames.forEach(excursionName => {
        let optionValue = excursionName + optionValueSeparator
        try {
            // Some excursions don't have passegers ranges, so we need to look for those and for that we're using an try-catch
            optionValue += Object.keys(excursions[excursionName]["passengers ranges"])
        } catch (_) {}

        $('#selectExcursions').append(
            // Value can have data without passegers ranges
            `<option value="${optionValue}">${excursionName}</option>`
        )
    })
}

const drawTracksSelect = (tracks) => {
    $('#tracksTitleContainer').html("Vías:")
    $("#tracksContainer").html(
        '<div class="option_tracks">' +
            '<input type="radio" name="tracks" id="tracks1" value="1" required />' +       
            '<label for="tracks1">1 via</label>' +
        '</div>'
    )

    if (tracks > 1) {
        for (let i = 2; i <= tracks; i++) {
            $('#tracksContainer').append(
                '<div class="option_tracks">' +
                    `<input type="radio" name="tracks" id="tracks${i}" value="${i}" required />` +       
                    `<label for="tracks${i}">${i} vias</label>` +
                '</div>'
            )
        }
    }
}

// const drawStopsSelect = (stops) => {
//     $("#stopsContainer").html(
//         '<h3>Paradas:</h3>' +
//         '<select name="stops" id="selectStops" required>' +
//             '<option value=""></option>' +
//         '</select>'
//     )

//     stops.forEach(stop => {
//         $('#selectStops').append(
//             `<option value="${stop}">${stop}</option>`
//         )
//     })
// }

const drawDestinySelect = (destinies) => {
    $("#destiniesContainer").html(
        '<h3>Hacia:</h3>' +
        '<select name="destinies" id="selectDestinies" required>' +
            '<option value=""></option>' +
        '</select>'        
    )
        
    destinies.forEach(destiny => {
        $('#selectDestinies').append(
            `<option value="${destiny}">${destiny}</option>`
        )
    })
}

const drawPassengersSelect = (passgersCount) => {
    // Here we pass an array called passgersCount and we need to check if the array is not and empty array
    if (passgersCount[0]) {
        $("#passengersContainer").html(
            '<h3>Cantidad de Persona:</h3>' +
            '<select name="passengers" id="selectPassengers" required>' +
                '<option value=""></option>' +
            '</select>'       
        )

        passgersCount.forEach(passengers => {
            $('#selectPassengers').append(
                `<option value="${passengers}">De ${passengers} pasajeros</option>`
            )
        })
    } else {
        $("#passengersContainer").html(
            '<p>El numero de pasajeros lo tiene que consultar con su proveedor</p>'
        )
    }
}

const drawBtnWaMe = () => {
    $('#btnWaMeContainer').html(
        '<button id="btnWaMe" type="button">' +
            'Hacer reservacion' +
        '</button>'
    )
}

// Empty containers in the recived array by Id
const emptyContainers = (containerIds) => {
    containerIds.forEach(id => $(`#${id}`).empty())
}