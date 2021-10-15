import Travel from "../Models/Travel.js"
import Excursion from "../Models/Excursion.js"

import { 
	wameMessage, 
	carSelected, 
	optionValueSeparator, 
	arraySeparator,
    arraySeparator2, 
    timerId, 
    drawAlert, 
    animateCSS, 
    changeCarSelected,
    emptyContainers, 
    setActualDate 
} from "../general.js"

console.log("Should my object travel send me data:");
const travel = new Travel("Sgo", "PUJ", "ChevroletSuburban")
console.log(travel.getTotalPrice())

console.log("Should my object excursion send me data:");
const excursion = new Excursion("EZBPC13H", "StretchLimo")
console.log(excursion.getTotalPrice())
