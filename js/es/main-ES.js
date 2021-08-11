/* 
    Book functionality controller:
    here's all controllers and events handlers
    for make The booking works
*/

// Globals vars
let wameMessage = ''
let bookTypesArr = ['Viaje turístico', 'Excursión']
const { travels, "excursions-ES": excursions, "prices-ES": prices } = DB
let carSelected // This var will change while the user click the select car

$(document).ready(() => {
    // Book type Select chaging event handler 
    $("#selectBookType").on('change', evt => {
        switch (evt.target.value) {
            case bookTypesArr[0]:
                emptyContainers(['excursionContainer'])
                drawTracksSelect(2)
                drawPickupsLocationSelect(Object.values(travels["pickup locations"]))
                drawDestinySelect([])
                drawPassengersSelect([])
                break;
        
            case bookTypesArr[1]:
                emptyContainers(['pickupLocationsContainer', 'tracksContainer', 'tracksTitleContainer', 'stopsContainer', 'destiniesContainer'])
                drawSelectExcursions(Object.keys(excursions))
                drawPassengersSelect([])
                break;
            
            default:
                drawTracksSelect(2)
                drawPickupsLocationSelect([])
                drawSelectExcursions([])
                drawDestinySelect([])
                drawPassengersSelect([])
                break;
        }
    })

    // On select excursion changing event handler 
    $("#excursionContainer").on('change', "#selectExcursions", evt => {
        const [ _, passegers ] = (evt.target.value)? evt.target.value.split(optionValueSeparator) : ["", ""]// Here we're getting the passegenrs ranges
        const passegersArr = passegers.split(arraySeparator)
        
        drawPassengersSelect(passegersArr)

        emptyContainers(['totalPriceContainer'])
    })

    // On select pickup locations changing event handler 
    $("#pickupLocationsContainer").on('change', "#selectPickupLocations", evt => {
        const [_, stops, destiny, tracks, passengers] = (evt.target.value)? evt.target.value.split(optionValueSeparator) : ["", "", "", "", ""]
        drawTracksSelect(tracks)
        
        // drawAlert('testing')
        // if (stops) {
        //     drawStopsSelect(stops.split(arraySeparator))
        // } else {
        //     emptyContainers(['stopsContainer'])
        // }

        drawDestinySelect(destiny.split(arraySeparator2))

        drawPassengersSelect(passengers.split(arraySeparator))

        // emptyContainers(['totalPriceContainer'])
    })

    // On click handler for some elements that must be inactive
    $('#destiniesContainer, #passengersContainer')
    .on('click', '#selectDestinies, #selectPassengers',
    () => {
        if (!document.fBook.bookType.value) {
            drawAlert('Primero debe seleccionar un tipo de reservacion, para que podamos saber con que podemos rellenar esos campos')
            animateCSS('#bookTypeContainer', 'bounce', 'faster')
        } 
        else if (document.fBook.bookType.value == bookTypesArr[0] && !document.fBook.pickupLocations.value) {
            drawAlert('Primero debe seleccionar un lugar de recogida, para que podamos saber con que podemos rellenar esos campos')
            animateCSS('#pickupLocationsContainer', 'bounce', 'faster')
        } else if (document.fBook.bookType.value == bookTypesArr[1] && !document.fBook.excursions.value) {
            drawAlert('Primero debe seleccionar una excursion, para que podamos saber con que podemos rellenar esos campos')
            animateCSS('#excursionContainer', 'bounce', 'faster')
        }
    })

    $('#pickupLocationsContainer').on('click', '#selectPickupLocations', 
    () => {
        if (!document.fBook.bookType.value) {
            drawAlert('Primero debe seleccionar un tipo de reservacion, para que podamos saber con que podemos rellenar esos campos')
            animateCSS('#bookTypeContainer', 'bounce', 'faster')
        } 
    })

    $('#excursionContainer').on('click', '#selectExcursions', 
    () => {
        if (!document.fBook.bookType.value) {
            drawAlert('Primero debe seleccionar un tipo de reservacion, para que podamos saber con que podemos rellenar esos campos')
            animateCSS('#bookTypeContainer', 'bounce', 'faster')
        } 
    })

    // On book form submiting event handler
    $('#formBook').on('submit', evt => {
        evt.preventDefault()
        const bookType = evt.target.selectBookType.value  
        const {
            selectPickupLocations,
            selectExcursions,
            selectDestinies,
            selectPassengers,
            pickupDate
        } = evt.target
        
        const pickupLocation = (selectPickupLocations)? selectPickupLocations.value.split(optionValueSeparator)[0] : undefined
        const trackSelectedValue = (document.fBook.tracks)? document.fBook.tracks.value : undefined
        const excursionSelectedValue = (selectExcursions)? selectExcursions.value.split(optionValueSeparator)[0]: undefined

        let totalPrice

        if (!carSelected) {
            drawAlert("Debe seleccionar un auto")
            window.location = '#carsContainer'
            return;
        } 

        switch (bookType) {
            case bookTypesArr[0]:
                try {
                    totalPrice = prices["pickup locations"]
                                    [pickupLocation]
                                    .destiny[selectDestinies.value]
                                    .tracks[trackSelectedValue]
                                    ["passengers ranges"][selectPassengers.value]
                    
                    $("#totalPriceContainer").html(
                        '<h3>Total Estimado:</h3>' +
                        `<p>${totalPrice}$</p>`
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

                    wameMessage = `Buenas quisiera hacer una reservacion a la ruta que va desde ` +
                        `${pickupLocation} a ` +
                        `${selectDestinies.value} para la fecha del ${pickupDate.value}, con una ` +
                        `cantidad de pasajeros que va desde ${selectPassengers.value} pasajeros, y en el cual ` +
                        `quiero que sea de ${trackSelectedValue} vias. Dame el precio plis`
                }
                
                // Modal contruction
                $('#selectedRouteContainer').html(
                    '<h3 class="title">Ruta Selecionada:</h3>' +
                    `<p>${pickupLocation} hacia ${selectDestinies.value}</p>`
                )

                $('#selectedCarContainer').html(
                    '<h3 class="title">Auto seleccionado:</h3>' +
                    `<p>${carSelected}</p>`
                )

                $('#ventanaModal').modal('show').modal('handleUpdate')
                break;
        
            case bookTypesArr[1]:
                try {
                    totalPrice = excursions[excursionSelectedValue]
                                ["passengers ranges"][selectPassengers.value]          
                    
                    $("#totalPriceContainer").html(
                        '<h3>Total Estimado:</h3>' +
                        `<p>${totalPrice}$</p>`
                    )

                    wameMessage = `Quiero la excursion: ${excursionSelectedValue}`
                } catch (error) {
                    $("#totalPriceContainer").html(
                        '<p>Consulte el precio con la empresa</p>'
                    )
                    wameMessage = 'Dame precio plis'
                }

                // Modal contruction
                $('#selectedRouteContainer').html(
                    '<h3 class="title">Excursion Selecionada:</h3>' +
                    `<p>${excursionSelectedValue}</p>`
                )

                $('#selectedCarContainer').html(
                    '<h3 class="title">Auto seleccionado:</h3>' +
                    `<p>${carSelected}</p>`
                )

                $('#ventanaModal').modal('show').modal('handleUpdate')
                break;
            
            default:
                break;
        }
    })

    // On button wame clicking event handler
    $("#btnWaMe").on('click', () => {
        wameMessage = wameMessage.replace(/\s+/g, '%20') // Replace every white space for a %20 what is a white space in a url 
        window.location = "https://wa.me/18494529589?text=" +  wameMessage
    })


})