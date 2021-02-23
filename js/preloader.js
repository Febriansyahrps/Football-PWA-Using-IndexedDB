$(document).ready(function(){
    $(".preloader").fadeOut().before($("#body-content").hide().fadeIn(1000))
    // $("#body-content").after($(".preloader")).fadeIn(5000)
})