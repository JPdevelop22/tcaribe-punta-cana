import Travel from "../Models/Travel.js"

console.log("Should my object travel send me data:");
let travel = new Travel("Sgo", "PUJ", "ChevroletSuburban")
console.log(travel.getTotalPrice())