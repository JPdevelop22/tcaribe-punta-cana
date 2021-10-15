import { 
    timerId, 
    drawAlert, 
    animateCSS, 
    changeCarSelected,
    emptyContainers, 
    setActualDate,
    formatDate
} from "../general.js"

import Travel from "./Models/Travel.js"
import Excursion from "./Models/Excursion.js"

// Globals vars
let wameMessage = ''
let carSelected // This var will change while the user click the select car

$(document).ready(() => {

    // On button wame clicking event handler
    $("#btnWaMe").on('click', () => {
        wameMessage = wameMessage.replace(/\s+/g, '%20') // Replace every white space for a %20 what is a white space in a url 
        window.location = "https://wa.me/18097576254?text=" +  wameMessage
    })
})