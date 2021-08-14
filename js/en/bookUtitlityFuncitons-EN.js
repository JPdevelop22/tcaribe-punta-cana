// DOM manipulation functions
const drawPickupsLocationSelect = (pickupLocations) => {
    const pickupLocationsContainerId = "#pickupLocationsContainer"
    
    // If pickupLocationsContainerId dons't have html inside we can add html into it
    if (!$(pickupLocationsContainerId).html()) {
        $(pickupLocationsContainerId).hide().html(
            '<h3>From:</h3>' +
            '<select name="pickupLocations" id="selectPickupLocations" required>' +
                '<option value=""></option>' +
            '</select>'
        ).ready(() => {
            $(pickupLocationsContainerId).show()
            animateCSS(pickupLocationsContainerId, 'bounce', 'faster')
        })
    }

    pickupLocations.forEach(location => {
        let optionValue = location["name-EN"] + optionValueSeparator + 
                            location["destinies-EN"] + optionValueSeparator +
                            location["tracks"] + optionValueSeparator +
                            location["passengers ranges"]

        $('#selectPickupLocations').append(
            `<option value="${optionValue}">${location["name-EN"]}</option>`
        )
    })
}

const drawSelectExcursions = (excursionNames) => {
    const excursionContainerId = "#excursionContainer"
    
    // If excursionContainerId dons't have html inside we can add html into it
    if (!$(excursionContainerId).html()) {
        $(excursionContainerId).hide().html(
            '<h3>Excursion:</h3>' +
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
        $(tracksTitleContainerId).html("Tracks:")

        $(tracksContainerId).hide().html(
            '<div class="option_tracks">' +
                '<input type="radio" name="tracks" id="tracks1" value="1" required />' +       
                '<label for="tracks1">1 track</label>' +
            '</div>'
        )
    
        if (tracks > 1) {
            for (let i = 2; i <= tracks; i++) {
                $('#tracksContainer').append(
                    '<div class="option_tracks">' +
                        `<input type="radio" name="tracks" id="tracks${i}" value="${i}" required />` +       
                        `<label for="tracks${i}">${i} tracks</label>` +
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
        '<h3>To:</h3>' +
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
        '<h3>Amount of people:</h3>' +
        '<select name="passengers" id="selectPassengers" required>' +
            '<option value=""></option>' +
        '</select>'
    )

    // Here we pass an array called passgersCount and we need to check if the array is not and empty array
    if (passgersCount[0]) {
        passgersCount.forEach(passengers => {
            $(selectPassengersId).append(
                `<option value="${passengers}">${passengers} passengers</option>`
            )
        })
    } else {
        const pickupLocationsValue = (document.fBook.pickupLocations)? 
                                document.fBook.pickupLocations.value: ""
        
        const excursionsValue = (document.fBook.excursions)? 
                                document.fBook.excursions.value: ""

        const bookTypeValue = document.fBook.bookType.value

        if (bookTypeValue == bookTypesArr[0] && pickupLocationsValue ||
            bookTypeValue == bookTypesArr[1] && excursionsValue) {
            drawAlert("The number of passengers must be consulted with the company")
        }
        
        $(selectPassengersId).removeAttr('required')
        $(selectPassengersId).attr('disabled', true)
    }

    $(passengersContainerId).ready(() => {
        $(passengersContainerId).show()
        animateCSS(passengersContainerId, 'bounce', 'faster')
    })
}

// A function for format a date by its language
const formatDate = (date, langFormat = "en-EN") => {
    let dateToFormat = new Date(date);
    let day = dateToFormat.getDate();
    let year = dateToFormat.getFullYear();
    let month = dateToFormat.toLocaleDateString(langFormat, {month:'long'})
    return month + " " + day + ",  " + year; // Month Day, Year
}