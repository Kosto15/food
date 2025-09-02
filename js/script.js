"use strict";

window.addEventListener("DOMContentLoaded", function () {
    // tabs start
    const tabHeadersParent = document.querySelectorAll(".tabheader__items");
    const tabHeaders = document.querySelectorAll(".tabheader__item");
    const tabContents = document.querySelectorAll(".tabcontent");

    // function for hiddening all tabs and all active classes
    function hideTabContentsAndActiveClasses() {
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].style.display = "none";
            tabHeaders[i].classList.remove("tabheader__item_active");
        }
    }

    //function for showing current tab and adding active class for current header
    function showTabContentsAndActiveClass(i = 0) {
        tabContents[i].style.display = "block";
        tabHeaders[i].classList.add("tabheader__item_active");
    }

    hideTabContentsAndActiveClasses();
    showTabContentsAndActiveClass();

    //event delegation
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.matches(".tabheader__item")) {
            for (let i = 0; i < tabHeaders.length; i++) {
                if (target == tabHeaders[i]) {
                    hideTabContentsAndActiveClasses();
                    showTabContentsAndActiveClass(i);
                }
            }
        }
    });
    //tabs end

    //timer start
    const endTime = "2025-12-31 23:59:59";

function getTimeRemaning(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    let days, hours, minutes, seconds;

    if (total <= 0){
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } 
    
    else {
        days = Math.floor(total / (1000 * 60 * 60 * 24));
        hours = Math.floor(total / (1000 * 60 * 60) % 24);
        minutes = Math.floor(total / (1000 / 60) % 60);
        seconds = Math.floor((total / 1000) % 60);
    }


    return { total, days, hours, minutes, seconds };
}

function setZero(n) {
    return n >= 0 && n < 9 ? `0${n}` : n;
}

function setClock(selector, endTime) {
    const timer = document.querySelector(selector);
    const daysElem = document.querySelector("#days");
    const hoursElem = document.querySelector("#hours");
    const minutesElem = document.querySelector("#minutes");
    const secondsElem = document.querySelector("#seconds");

    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock(){
        const { total, days, hours, minutes, seconds } = getTimeRemaning(endTime);

        daysElem.textContent = setZero(days);
        hoursElem.textContent = setZero(hours);
        minutesElem.textContent = setZero(minutes);
        secondsElem.textContent = setZero(seconds);

        if (total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock(".timer", endTime);

    //timer end
});

