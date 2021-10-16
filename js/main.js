import Travel from "./Models/Travel.js"
import Excursion from "./Models/Excursion.js"

/**
 * Global event handler, here he set up and manage the booking form. 
 */
$(document).ready(() => {
    // First of all we set the actual date as minimun date of pickupDate element
    setActualDate("pickupDate")

    // Control what to show when the user select a type of travel (Travel or Excursion)
    $("#selectBookType").on('change', evt => {
        switch (evt.target.value) {
            case "Travel":
                $("#pickupLocationsContainer").show('fast');
                $("#selectPickupLocations").removeAttr('disabled');

                $("#destiniesContainer").show('fast');
                $("#selectDestinies").removeAttr('disabled');

                $('#excursionContainer').hide('faster')
                $('#selectExcursions').attr('disabled', 'disabled')
                break;
        
            case "Excursion":
                $("#excursionContainer").show('faster');
                $('#selectExcursions').removeAttr('disabled')

                $('#pickupLocationsContainer').hide('faster')
                $('#selectPickupLocations').attr('disabled', 'disabled')

                $('#destiniesContainer').hide('faster')
                $('#selectDestinies').attr('disabled', 'disabled')
                break;
            
            default:
                $("#excursionContainer").show('faster')
                $('#selectExcursions').removeAttr('disabled')

                $("#pickupLocationsContainer").show('fast')
                $("#selectPickupLocations").removeAttr('disabled');

                $("#destiniesContainer").show('fast')
                $("#selectDestinies").removeAttr('disabled');
                break;
        }
    })

    $('#formBook').on('submit', (evt) => {
        evt.preventDefault()
        if (checkErrors()) {
            return;
        }
    })

    //On click of select a car btn
    $("#btnCarSelected1").on('click', () => {
        changeCarSelected('Chevrolet suburban 2012', 'carContainer1');
    });

    $("#btnCarSelected2").on('click', () => {
        changeCarSelected('Limosina Town Car 2007', 'carContainer2');
    });

    $("#btnCarSelected3").on('click', () => {
        changeCarSelected('Mercedes Benz Clase C 2012', 'carContainer3');
    });

    // On button wame clicking event handler
    $("#btnWaMe").on('click', () => {
        wameMessage = wameMessage.replace(/\s+/g, '%20') // Replace every white space for a %20 what is a white space in a url 
        window.location = "https://wa.me/18097576254?text=" +  wameMessage
    })
})

// On select a car click handler and this function will add a border outside of the car content when it is selected
const changeCarSelected = (newCar, containerId) => {
    carSelected = newCar

    $('#carContainer1, #carContainer2, #carContainer3').removeClass("car_selected_border")

    $(`#${containerId}`).addClass("car_selected_border")
}

// A function for set actual date to a date input element by id
const setActualDate = (elementId, langFormat = "es-ES") => {
    let datePicker = document.getElementById(elementId)
    let actualDate = new Date(Date.now())
    let day = actualDate.getDate();
    let year = actualDate.getFullYear();
    let month = actualDate.toLocaleDateString(langFormat, {month:'2-digit'})
    
    let actualDateFormated = year + "-" + month + "-" + day

    datePicker.min = actualDateFormated
}

