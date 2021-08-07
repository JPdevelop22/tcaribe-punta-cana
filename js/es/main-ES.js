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
                drawSelectExcursions(Object.keys(excursions))
                emptyContainers(['pickupLocationsContainer', 'tracksContainer', 'stopsContainer', 'destiniesContainer', 'passengersContainer'])
                break;
            
            default:
                break;
        }
    })

    // On select excursion changing event handler 
    $("#excursionContainer").on('change', "#selectExcursions", evt => {
        const [ _, passegers ] = evt.target.value.split(optionValueSeparator) 
        const passegersArr = passegers.split(arraySeparator)
        
        drawPassengersSelect(passegersArr)

        emptyContainers(['totalPriceContainer'])
    })

    // On select pickup locations changing event handler 
    $("#pickupLocationsContainer").on('change', "#selectPickupLocations", evt => {
        const [name, stops, destiny, tracks, passengers] = evt.target.value.split(optionValueSeparator)
        drawTracksSelect(tracks)

        if (stops) {
            drawStopsSelect(stops.split(arraySeparator))
        } else {
            emptyContainers(['stopsContainer'])
        }

        drawDestinySelect(destiny.split(arraySeparator2))

        drawPassengersSelect(passengers.split(arraySeparator))

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
                try {
                    totalPrice = prices["pickup locations"]
                                    [selectPickupLocations.value.split(optionValueSeparator)[0]]
                                    .destiny[selectDestinies.value]
                                    .tracks[tracks.value]
                                    ["passengers ranges"][selectPassengers.value]
                    $("#totalPriceContainer").html(
                        `<p>Precio a pagar: ${totalPrice}$</p>`
                    )
                } catch (error) {
                    $("#totalPriceContainer").html(
                        '<p>Consulte el precio con la empresa</p>'
                    )
                }
                break;
        
            case bookTypesArr[1]:
                try {
                    totalPrice = excursions[selectExcursions.value.split(optionValueSeparator)[0]]
                                ["passengers ranges"][selectPassengers.value]                   
                    
                    $("#totalPriceContainer").html(
                        `<p>Precio a pagar: ${totalPrice}$</p>`
                    )
                } catch (error) {
                    $("#totalPriceContainer").html(
                        '<p>Consulte el precio con la empresa</p>'
                    )
                }
                break;
            
            default:
                break;
        }
    })

    // On button wame clicking event handler
    $("#btnWaMe").on('click', evt => {

    })
})