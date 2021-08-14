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
let commonErrorMessage = 
    'Primero debe seleccionar un tipo de reservacion, ' +
    'para que podamos saber con que podemos rellenar esos campos'

$(document).ready(() => {
    // Set actual date as min value to our date picker
    setActualDate("pickupDate")

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
                emptyContainers(['pickupLocationsContainer', 'tracksContainer', 'tracksTitleContainer', 'destiniesContainer'])
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
        const [ _, passegers ] = (evt.target.value)? 
            evt.target.value.split(optionValueSeparator) : ["", ""] // Here we're getting the passegenrs ranges
        
        const passegersArr = passegers.split(arraySeparator)
        
        drawPassengersSelect(passegersArr)
    })

    // On select pickup locations changing event handler 
    $("#pickupLocationsContainer").on('change', "#selectPickupLocations", evt => {
        const [_, destiny, tracks, passengers] = 
            (evt.target.value)? evt.target.value.split(optionValueSeparator) : ["", "", "", "", ""]
        
        drawTracksSelect(tracks)
        
        drawDestinySelect(destiny.split(arraySeparator2))

        drawPassengersSelect(passengers.split(arraySeparator))
    })

    // On click handler for some elements that must be inactive
    $('#destiniesContainer, #passengersContainer')
    .on('click', '#selectDestinies, #selectPassengers',
    () => {
        let errorMessage

        if (!document.fBook.bookType.value) {
            drawAlert(commonErrorMessage)
            animateCSS('#bookTypeContainer', 'bounce', 'faster')
        } 
        else if (document.fBook.bookType.value == bookTypesArr[0] && !document.fBook.pickupLocations.value) {
            errorMessage = 'Primero debe seleccionar un lugar de recogida, ' + 
                            'para que podamos saber con que podemos rellenar esos campos'
            drawAlert(errorMessage)
            animateCSS('#pickupLocationsContainer', 'bounce', 'faster')
        } else if (document.fBook.bookType.value == bookTypesArr[1] && !document.fBook.excursions.value) {
            errorMessage = 'Primero debe seleccionar una excursion, ' +
                            'para que podamos saber con que podemos rellenar esos campos' 
            drawAlert(errorMessage)
            animateCSS('#excursionContainer', 'bounce', 'faster')
        }
    })

    $('#pickupLocationsContainer').on('click', '#selectPickupLocations', 
    () => {
        if (!document.fBook.bookType.value) {
            drawAlert(commonErrorMessage)
            animateCSS('#bookTypeContainer', 'bounce', 'faster')
        } 
    })

    $('#excursionContainer').on('click', '#selectExcursions', 
    () => {
        if (!document.fBook.bookType.value) {
            drawAlert(commonErrorMessage)
            animateCSS('#bookTypeContainer', 'bounce', 'faster')
        } 
    })
    
    // On button wame clicking event handler
    $("#btnWaMe").on('click', () => {
        wameMessage = wameMessage.replace(/\s+/g, '%20') // Replace every white space for a %20 what is a white space in a url 
        window.location = "https://wa.me/18097576254?text=" +  wameMessage
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
        
        const pickupLocation = (selectPickupLocations)? 
                selectPickupLocations.value.split(optionValueSeparator)[0] : undefined
        
        const trackSelectedValue = (document.fBook.tracks)? 
                document.fBook.tracks.value : undefined
        
        const excursionSelectedValue = (selectExcursions)? 
                selectExcursions.value.split(optionValueSeparator)[0]: undefined

        const date = formatDate(pickupDate.value)
        let totalPrice

        if (!carSelected) {
            drawAlert("Debe seleccionar un vehiculo")
            window.location = '#carContainer1'
            return;
        } 

        switch (bookType) {
            case bookTypesArr[0]:
                try {
                    totalPrice = 
                        prices["pickup locations"][pickupLocation]
                            .destiny[selectDestinies.value]
                                .tracks[trackSelectedValue]
                                    ["passengers ranges"][selectPassengers.value]
                    
                    $("#totalPriceContainer").html(
                        '<h3>Total Estimado:</h3>' +
                        `<p>USD$ ${totalPrice}</p>`
                    )
                } catch (error) {
                    $("#totalPriceContainer").html(
                        '<p>Consulte el precio con la empresa</p>'
                    )
                }

                wameMessage = 
                    `Hola, quiero hacer una reservación del servicio de ${bookType}, ` +
                    `tomaré la ruta que va desde el punto de recogida ${pickupLocation} hasta ` +
                    `${selectDestinies.value}, para la fecha del ${date}, con una ` +
                    `cantidad de pasajeros que va desde ${selectPassengers.value} pasajeros, y en el cual ` +
                    'quiero que sea de ' + ((trackSelectedValue < 2)? "1 vía." : `${trackSelectedValue} vías.`) +
                    ' ¿Me podrían ofrecer más información, por favor?'
                
                // Modal contruction
                $('#selectedDateContainer').html(
                    '<h3 class="title">Fecha selecionada:</h3>' +
                    `<p>${date}</p>`
                )

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
                    totalPrice = 
                        excursions[excursionSelectedValue]
                            ["passengers ranges"][selectPassengers.value]          
                    
                    $("#totalPriceContainer").html(
                        '<h3>Total Estimado:</h3>' +
                        `<p>USD$ ${totalPrice}</p>`
                    )
                } catch (error) {
                    $("#totalPriceContainer").html(
                        '<p>Consulte el precio con la empresa</p>'
                    )
                }

                wameMessage = 
                    `Hola, quiero hacer una reservación del servicio de ${bookType}, ` +
                    `escogí: ${excursionSelectedValue}, para la fecha del ${date} ` +
                    ((selectPassengers.value)? `con una cantidad de pasajeros que va desde ${selectPassengers.value} pasajeros, ` : "") +
                    ' ¿Me podrían ofrecer más información, por favor?'

                // Modal contruction
                $('#selectedDateContainer').html(
                    '<h3 class="title">Fecha selecionada:</h3>' +
                    `<p>${date}</p>`
                )
                
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
})


