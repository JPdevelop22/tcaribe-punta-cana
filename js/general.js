// Globals vars
let wameMessage = ''
let carSelected // This var will change while the user click the select car

// Timer controller for animations
let timerId

$(document).ready(() => {
    // On button wame clicking event handler
    $("#btnWaMe").on('click', () => {
        wameMessage = wameMessage.replace(/\s+/g, '%20') // Replace every white space for a %20 what is a white space in a url 
        window.location = "https://wa.me/18097576254?text=" +  wameMessage
    })
})

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

// On select a car click handler and this function will add a border outside of the car content when it is selected
const changeCarSelected = (newCar, containerId) => {
    carSelected = newCar

    $('#carContainer1, #carContainer2, #carContainer3').removeClass("car_selected_border")

    $(`#${containerId}`).addClass("car_selected_border")
}

// Empty containers in the recived array by Id
const emptyContainers = (containerIds) => {
    containerIds.forEach(containerId => {
        let id = `#${containerId}`
        animateCSS(id, 'fadeOut', 'faster').then(() => $(id).empty())
    })
}

// A function for set actual date to a date input element by id
const setActualDate = (elementId, langFormat = "es-ES") => {
    let datePicker = document.getElementById(elementId)
    let actualDate = new Date(Date.now())
    let day = actualDate.getDate();
    let year = actualDate.getFullYear();
    let month = actualDate.toLocaleDateString(langFormat, {month:'2-digit'})
    
    let actualDateFormated = year + "-" + month + "-" + day

    datePicker.min = actualDateFormated
}

// A function for format a date by its language return a 
// correct date writed according the langFormat argument
const formatDate = (date, langFormat = "es-ES") => {
    let dateToFormat = new Date(date);
    let day = dateToFormat.getDate();
    let year = dateToFormat.getFullYear();
    let month = dateToFormat.toLocaleDateString(langFormat, {month: 'long'})

    // Now return a writed date in Spanish if langFormat is in spanish, anyways not
    return (langFormat == "es-ES")?  
        day + " de " + month + " del " + year: // Dia de Mes del Año
        month + " " + day + ",  " + year; // Month Day, Year
}

export {
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
}