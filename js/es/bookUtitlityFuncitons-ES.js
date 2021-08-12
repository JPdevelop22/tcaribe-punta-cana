// Separators for the data sending in string shape 
const optionValueSeparator = ' . '
const arraySeparator = ','
const arraySeparator2 = ' , ' 

// Timer controller for animations
let timerId

// DOM manipulation functions
const drawPickupsLocationSelect = (pickupLocations) => {
    const pickupLocationsContainerId = "#pickupLocationsContainer"
    
    // If pickupLocationsContainerId dons't have html inside we can add html into it
    if (!$(pickupLocationsContainerId).html()) {
        $(pickupLocationsContainerId).hide().html(
            '<h3>Desde:</h3>' +
            '<select name="pickupLocations" id="selectPickupLocations" required>' +
                '<option value=""></option>' +
            '</select>'
        ).ready(() => {
            $(pickupLocationsContainerId).show()
            animateCSS(pickupLocationsContainerId, 'bounce', 'faster')
        })
    }

    pickupLocations.forEach(location => {
        let optionValue = location["name-ES"] + optionValueSeparator + 
                            location["destinies-ES"] + optionValueSeparator +
                            location["tracks"] + optionValueSeparator +
                            location["passengers ranges"]

        $('#selectPickupLocations').append(
            `<option value="${optionValue}">${location["name-ES"]}</option>`
        )
    })
}

const drawSelectExcursions = (excursionNames) => {
    const excursionContainerId = "#excursionContainer"
    
    // If excursionContainerId dons't have html inside we can add html into it
    if (!$(excursionContainerId).html()) {
        $(excursionContainerId).hide().html(
            '<h3>Excursiones:</h3>' +
            '<select name="excursions" id="selectExcursions" required>' +
                '<option value=""></option>' +
            '</select>'       
        ).ready(() => {
            $(excursionContainerId).show()
            animateCSS(excursionContainerId, 'fadeIn', 'faster')
        })
    }

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
    const tracksTitleContainerId = "#tracksTitleContainer"
    const tracksContainerId = "#tracksContainer"

    if (!document.fBook.tracks || document.fBook.tracks.length != tracks) {
        $(tracksTitleContainerId).html("Vías:")

        $(tracksContainerId).hide().html(
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

        $(tracksContainerId).ready(() => {
            $(tracksContainerId).show()
            animateCSS(tracksContainerId, 'fadeIn', 'faster')
        })
    }
}

const drawDestinySelect = (destinies) => {
    const destiniesContainerId = "#destiniesContainer"

    $(destiniesContainerId).hide().html(
        '<h3>Hacia:</h3>' +
        '<select name="destinies" id="selectDestinies" required>' +
            '<option value=""></option>' +
        '</select>'        
    ).ready(() => {
        $(destiniesContainerId).show()
        animateCSS(destiniesContainerId, 'bounce', 'faster')
    })

    destinies.forEach(destiny => {
        $('#selectDestinies').append(
            `<option value="${destiny}">${destiny}</option>`
        )
    })
}

const drawPassengersSelect = (passgersCount) => {
    const passengersContainerId = "#passengersContainer"
    const selectPassengersId = '#selectPassengers'

    $(passengersContainerId).hide().html(
        '<h3>Cantidad de Persona:</h3>' +
        '<select name="passengers" id="selectPassengers" required>' +
            '<option value=""></option>' +
        '</select>'
    )

    // Here we pass an array called passgersCount and we need to check if the array is not and empty array
    if (passgersCount[0]) {
        passgersCount.forEach(passengers => {
            $(selectPassengersId).append(
                `<option value="${passengers}">De ${passengers} pasajeros</option>`
            )
        })
    } else {
        const pickupLocationsValue = (document.fBook.pickupLocations)? 
                                document.fBook.pickupLocations.value: undefined
        
        const excursionsValue = (document.fBook.excursions)? 
                                document.fBook.excursions.value: undefined

        if (pickupLocationsValue != undefined || excursionsValue != undefined) {
            drawAlert("El numero de pasajeros lo tiene que consultar con la empresa")
        }
        
        $(selectPassengersId).removeAttr('required')
    }

    $(passengersContainerId).ready(() => {
        $(passengersContainerId).show()
        animateCSS(passengersContainerId, 'bounce', 'faster')
    })
}

// Draw an alert in DOM with a animation
const drawAlert = (content) => {
    const alertContainerId = '#alertContainer'

    // Look if there's a timeout running and clear it
    if ($(alertContainerId).html()) {
        clearTimeout(timerId)
    }
    
    // First hide element and add html, then show element and put it an animation
    $(alertContainerId).hide().html(
        '<div class="content-one">' +
            '<i class="fas fa-exclamation-circle"></i>' +
        '</div>' +

        '<div class="content-two">' +
            '<p>' +
                content +
            '</p>' +
        '</div>'
    ).ready(() => {
        $(alertContainerId).show()
        animateCSS(alertContainerId, 'backInRight', 'faster')
    })

    // Here we're indentifing the timer for handle it
    timerId = setTimeout(() => {
        animateCSS(alertContainerId, 'backOutRight').then(() => {
            $(alertContainerId).hide().empty().show()
        })
    }, 4000);
}

// Function for animate elements
const animateCSS = (element, animation, duration = 'fast', prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const animationSpeed =  `${prefix}${duration}`
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName, animationSpeed);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName, animationSpeed);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    }
);

// On select a car click handler and this function will add a border outside of the car content when it is selected
const changeCarSelected = (newCar, containerId) => {
    carSelected = newCar

    $('#carContainer1, #carContainer2, #carContainer3').removeClass("car_selected_border")

    $(`#${containerId}`).addClass("car_selected_border")
}

// Empty containers in the recived array by Id
const emptyContainers = (containerIds) => {
    containerIds.forEach(containerId => {
        let id = `#${containerId}`
        animateCSS(id, 'fadeOut', 'faster').then(() => $(id).empty())
    })
}

// A function for format a date by its language
const formatDate = (date, langFormat = "es-ES") => {
    let dateToFormat = new Date(date);
    let day = dateToFormat.getDate();
    let year = dateToFormat.getFullYear();
    let month = dateToFormat.toLocaleDateString(langFormat, {month:'long'})
    return day + " de " + month + " del " + year; // Dia de Mes del Año
}

// A function for set actual date to a date input element by id
const setActualDate = (elementId) => {
    let datePicker = document.getElementById(elementId)
    let actualDate = new Date(Date.now())
    let day = actualDate.getDate();
    let year = actualDate.getFullYear();
    let month = actualDate.toLocaleDateString("es-ES", {month:'2-digit'})
    
    let actualDateFormated = year + "-" + month + "-" + day

    datePicker.min = actualDateFormated
}
