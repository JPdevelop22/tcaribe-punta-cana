/**
 * This algorithm add animations by position of the scroll
 * @param  {string} idOfElement The plain id of the element that will be animate
 * @param  {[type]} animation   The animation to use
 * @param  {String} duration    The duration of the animation
 * @param  {String} prefix      The animation prfix class
 */
const animationByScroll = (idOfElement, animation, duration = "fast", prefix = 'animate__') => {
    let element = document.getElementById(idOfElement);
    let elementPosition = element.getBoundingClientRect().top;
    
    if(elementPosition < window.innerHeight) {
        let animationClass = `${prefix}${animation}`
        let animationDurationClass = `${prefix}${duration}`
        element.classList.add(`${prefix}animated`, animationClass, animationDurationClass)
    }
}

// Animation actioner
$(document).ready(() => {
    animationByScroll("langContainer", "fadeIn", "slower")
    $(window).on('scroll', () => {
        //Scroll event listener
        animationByScroll("carContainer1", "slideInRight")
        animationByScroll("carContainer2", "slideInLeft")
        animationByScroll("carContainer3", "slideInRight")

        animationByScroll("contactBanner", "slideInLeft")

        animationByScroll("instagramIcon", "tada", "slow")
        animationByScroll("twitterIcon", "tada", "slow")
        animationByScroll("whatsappIcon", "tada", "slow")
        animationByScroll("facebookIcon", "tada", "slow")
        animationByScroll("emailIcon", "tada", "slow")
    })
})
