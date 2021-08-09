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
                emptyContainers(['excursionContainer', 'tracksContainer', 'stopsContainer', 'destiniesContainer', 'passengersContainer'])
                drawPickupsLocationSelect(Object.values(travels["pickup locations"]))
                break;
        
            case bookTypesArr[1]:
                emptyContainers(['pickupLocationsContainer', 'tracksContainer', 'tracksTitleContainer', 'stopsContainer', 'destiniesContainer', 'passengersContainer'])
                drawSelectExcursions(Object.keys(excursions))
                break;
            
            default:
                break;
        }
    })

    // On select excursion changing event handler 
    $("#excursionContainer").on('change', "#selectExcursions", evt => {
        const [ _, passegers ] = evt.target.value.split(optionValueSeparator) // Here we're getting the passegenrs ranges
        const passegersArr = passegers.split(arraySeparator)
        
        drawPassengersSelect(passegersArr)

        emptyContainers(['totalPriceContainer'])
    })

    // On select pickup locations changing event handler 
    $("#pickupLocationsContainer").on('change', "#selectPickupLocations", evt => {
        const [_, stops, destiny, tracks, passengers] = evt.target.value.split(optionValueSeparator)
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
            selectStops,
            selectDestinies,
            selectPassengers,
            pickupDate
        } = evt.target
        
        const pickupLocation = selectPickupLocations.value.split(optionValueSeparator)[0]
        const trackSelectedValue = document.fBook.tracks.value

        let totalPrice

        switch (bookType) {
            case bookTypesArr[0]:
                try {
                    totalPrice = prices["pickup locations"]
                                    [pickupLocation]
                                    .destiny[selectDestinies.value]
                                    .tracks[trackSelectedValue]
                                    ["passengers ranges"][selectPassengers.value]
                    
                    $("#totalPriceContainer").html(
                        `<p>Precio a pagar: ${totalPrice}$</p>`
                    )
                    
                    wameMessage = `Buenas quisiera hacer una reservacion a la ruta que va desde ` +
                        `${pickupLocation} a ` +
                        `${selectDestinies.value} para la fecha del ${pickupDate.value}, con una ` +
                        `cantidad de pasajeros que va desde ${selectPassengers.value} pasajeros, y en el cual ` +
                        `quiero que sea de ${trackSelectedValue} vias.`
        
                } catch (error) {
                    $("#totalPriceContainer").html(
                        '<p>Consulte el precio con la empresa</p>'
                    )
                }

                drawBtnWaMe()
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

                drawBtnWaMe()
                break;
            
            default:
                break;
        }
    })

    // On button wame clicking event handler
    $("#btnWaMeContainer").on('click', '#btnWaMe', () => {
        wameMessage = wameMessage.replace(/\s+/g, '%20') // Replace every white space for a %20 what is a white space in a url 
        window.location = "https://wa.me/18494529589?text=" +  wameMessage
    })
})