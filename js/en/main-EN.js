/* 
    Book functionality controller:
    here's all controllers and events handlers
    for make The booking works
*/

// Globals vars
let bookTypesArr = ['Tourist trip', 'Excursion']
const { travels, "excursions-EN": excursions, "prices-EN": prices } = DB
let commonErrorMessage = 
    'You must first select a reservation type, '+
    'so we can know what we can fill in those fields with'

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
            errorMessage = 'You must first select a pick up location, ' +
                            'so we can know what we can fill in those fields with'
            drawAlert(errorMessage)
            animateCSS('#pickupLocationsContainer', 'bounce', 'faster')
        } else if (document.fBook.bookType.value == bookTypesArr[1] && !document.fBook.excursions.value) {
            errorMessage = 'You must first select an excursion, ' +
                            'so we can know what we can fill in those fields with' 
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
            drawAlert("You should choose a vehicle first!")
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
                        '<h3>Total estimated:</h3>' +
                        `<p>USD$ ${totalPrice}</p>`
                    )
                } catch (error) {
                    $("#totalPriceContainer").html(
                        '<p>Check the price with the company</p>'
                    )
                }

                wameMessage = 
                    `Hi!, i want to make a reservation for the ${bookType} service, ` +
                    `I'll take the route that goes from the pickup point ${pickupLocation} to ` +
                    `${selectDestinies.value}, for the date of ${date}, with a range ` +
                    `of ${selectPassengers.value} passengers, and in which ` +
                    "It'll take " + ((trackSelectedValue < 2)? "1 track." : `${trackSelectedValue} tracks.`) +
                    ' Could you offer me more information, please?'
                
                // Modal contruction
                $('#selectedDateContainer').html(
                    '<h3 class="title">Selected date:</h3>' +
                    `<p>${date}</p>`
                )

                $('#selectedRouteContainer').html(
                    '<h3 class="title">Selected route:</h3>' +
                    `<p>${pickupLocation} to ${selectDestinies.value}</p>`
                )

                $('#selectedCarContainer').html(
                    '<h3 class="title">Selected vehicle:</h3>' +
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
                        '<h3>Total estimated::</h3>' +
                        `<p>USD$ ${totalPrice}</p>`
                    )
                } catch (error) {
                    $("#totalPriceContainer").html(
                        '<p>Check the price with the company</p>'
                    )
                }

                wameMessage = 
                    `Hi!, i want to make a reservation for the ${bookType} service, ` +
                    `I chose: ${excursionSelectedValue}, for the date of ${date} ` +
                    ((selectPassengers.value)? `with a range of ${selectPassengers.value} passengers,` : "") +
                    ' Could you offer me more information, please?'

                // Modal contruction
                $('#selectedDateContainer').html(
                    '<h3 class="title">Selected date:</h3>' +
                    `<p>${date}</p>`
                )
                
                $('#selectedRouteContainer').html(
                    '<h3 class="title">Selected excursion:</h3>' +
                    `<p>${excursionSelectedValue}</p>`
                )

                $('#selectedCarContainer').html(
                    '<h3 class="title">Selected vehicle:</h3>' +
                    `<p>${carSelected}</p>`
                )

                $('#ventanaModal').modal('show').modal('handleUpdate')
                break;
            
            default:
                break;
        }
    })
})