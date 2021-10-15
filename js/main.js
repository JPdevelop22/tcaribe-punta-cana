import { 
    timerId, 
    drawAlert, 
    animateCSS, 
    hideContainer,
    hideContainers,
    setActualDate,
    formatDate
} from "./general.js"

import Travel from "./Models/Travel.js"
import Excursion from "./Models/Excursion.js"

// Globals vars
let wameMessage = ''
let carSelected // This var will change while the user click the select car

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
                $("#destiniesContainer").show('fast');
                $('#excursionContainer').hide('faster')
                break;
        
            case "Excursion":
                $("#excursionContainer").show('faster');
                $('#pickupLocationsContainer').hide('faster')
                $('#destiniesContainer').hide('faster')
                break;
            
            default:
                $("#excursionContainer").show('faster');
                $("#pickupLocationsContainer").show('fast');
                break;
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

