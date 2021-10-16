// Globals vars
// Timer controller for animations
let timerId
let carSelected // This var will change while the user click the select car
let wameMessage = ''

// Draw an alert in DOM with a animation
const drawAlert = (content) => {
    const alertContainerId = '#alertContainer'

    // Look if there's a timeout running and clear it
    if ($(alertContainerId).html()) {
        clearTimeout(timerId)
    }
    
    // First hide element and add html, then show element and put it an animation
    $(alertContainerId).hide().html(
        '<div class="content-one">' +
            '<i class="fas fa-exclamation-circle"></i>' +
        '</div>' +

        '<div class="content-two">' +
            '<p>' +
                content +
            '</p>' +
        '</div>'
    ).ready(() => {
        $(alertContainerId).show()
        animateCSS(alertContainerId, 'backInRight', 'faster')
    })

    // Here we're indentifing the timer for handle it
    timerId = setTimeout(() => {
        animateCSS(alertContainerId, 'backOutRight').then(() => {
            $(alertContainerId).hide().empty().show()
        })
    }, 4000);
}

// Function for animate elements
const animateCSS = (element, animation, duration = 'fast', prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const animationSpeed =  `${prefix}${duration}`
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName, animationSpeed);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName, animationSpeed);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    }
);

// A function for format a date into a writed date 
const formatDate = (date) => {
    let dateToFormat = new Date(date);
    let day = dateToFormat.getDate();
    let year = dateToFormat.getFullYear();
    let month = dateToFormat.toLocaleDateString("es-ES", {month: 'long'})

    // Now return a writed date in Spanish
    return  day + " de " + month + " del " + year; // Dia de Mes del Año
}

/**
 * Check errors in the reservation form, handle those errors 
 * and return true if get an error or false wherenot.
 * @return {[bool]} [true if there is an error or false where not]
 */
const checkErrors = () => {
    const {
        bookType,
        pickupLocations,
        excursions,
        destinies,
        passengers,
        pickupDate
    } = document.fBook

    if (!carSelected) {
        drawAlert("Debe seleccionar un vehiculo")
        window.location = '#carContainer1'
        return true;
    }

    if (bookType.value == 'Travel') {
        if (pickupLocations.value == destinies.value) {
            drawAlert("No puede tener un destino igual que el punto de recogida")
            window.location = '#formBook'
            return true;
        }
    }

    return false;
}    