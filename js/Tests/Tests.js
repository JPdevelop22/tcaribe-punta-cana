import Travel from "../Models/Travel.js"
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
let travel = new Travel("Sgo", "PUJ", "ChevroletSuburban")
console.log(travel.getTotalPrice())