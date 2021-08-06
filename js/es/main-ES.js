/* 
    Book functionality controller:
    here's all controllers and events handlers
    for make The booking works
*/

// Globals vars
let wameMessage = ''
let bookTypesArr = ['Viaje turístico', 'Excursión']
const { travels, "excursions-ES": excursions, "prices-ES": prices } = DB

$(document).ready(() => {
    // Book type Select chaging event handler 
    $("#selectBookType").on('change', evt => {
        switch (evt.target.value) {
            case bookTypesArr[0]:
                drawPickupsLocationSelect(Object.values(travels["pickup locations"]))
                emptyContainers(['excursionContainer', 'tracksContainer', 'stopsContainer', 'destiniesContainer', 'passengersContainer'])
                break;
        
            case bookTypesArr[1]:
                drawSelectExcursions(Object.keys(excursions), excursions)
                emptyContainers(['pickupLocationsContainer', 'tracksContainer', 'stopsContainer', 'destiniesContainer', 'passengersContainer'])
                break;
            
            default:
                break;
        }
    })

    // On select excursion changing event handler 
    $("#excursionContainer").on('change', "#selectExcursions", evt => {
        const [ _, passegers ] = evt.target.value.split(' . ') 
        const passegersArr = passegers.split(',')
        drawPassengersSelect(passegersArr)
    })

    // On select pickup locations changing event handler 
    $("#pickupLocationsContainer").on('change', "#selectPickupLocations", evt => {
        const [name, stops, destiny, tracks, passengers] = evt.target.value.split(' . ')
        console.debug("On selectPickupLocations change")
        drawTracksSelect(tracks)

        if (stops) {
            drawStopsSelect(stops.split(","))
        } else {
            emptyContainers(['stopsContainer'])
        }

        drawDestinySelect(destiny.split(" , "))

        drawPassengersSelect(passengers.split(","))

        emptyContainers(['totalPriceContainer'])
    })

    // On book form submiting event handler
    $('#formBook').on('submit', evt => {
        evt.preventDefault()
        const bookType = evt.target.selectBookType.value  
        const {
            selectPickupLocations,
            selectExcursions,
            tracks,
            selectStops,
            selectDestinies,
            selectPassengers
        } = evt.target
        let totalPrice

        switch (bookType) {
            case bookTypesArr[0]:
                if(!selectStops) {
                    try {
                        totalPrice = prices["pickup locations"]
                                        [selectPickupLocations.value]
                                        .destiny[selectDestinies.value]
                                        .tracks[tracks.value]
                                        ["passengers ranges"][selectPassengers.value]
                        $("#totalPriceContainer").html(
                            `<p>Precio a pagar: ${totalPrice}$</p>`
                        )
                    } catch (error) {
                        $("#totalPriceContainer").html(
                            `<p>Consulte el precio con la empresa</p>`
                        )
                    }
                }    

                break;
        
            case bookTypesArr[1]:
                break;
            
            default:
                break;
        }
    })

    // On button wame clicking event handler
    $("#btnWaMe").on('click', evt => {

    })
})