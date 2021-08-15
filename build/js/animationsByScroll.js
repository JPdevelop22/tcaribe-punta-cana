//This algorithm add animations by position of the scroll
const animationByScroll = (idOfElement, animation, duration = "fast", prefix = 'animate__') => {
    let element = document.getElementById(idOfElement);
    let elementPosition = element.getBoundingClientRect().top;
    
    if(elementPosition < window.innerHeight) {
        let animationClass = `${prefix}${animation}`
        let animationDurationClass = `${prefix}${duration}`
        element.classList.add(`${prefix}animated`, animationClass, animationDurationClass)
    }
}

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
