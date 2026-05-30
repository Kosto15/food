"use strict";

// tabs logic start
window.addEventListener("DOMContentLoaded", function () {
    const tabHeadersParent = document.querySelector(".tabheader__items");
    const tabHeaders = tabHeadersParent.querySelectorAll(".tabheader__item");
    const tabContents = document.querySelectorAll(".tabcontent");

// function for hidding all active classes and tabs
    function hideTabContectsAndActiveClasses() {
        for(let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove("show");
            tabContents[i].classList.add("hide", "fade");
            tabHeaders[i].classList.remove("tabheader__item_active");
        }
    }

// function for showing current tab and adding active class for current header item
    function showTabContectsAndActiveClasses(i = 0) {
        tabContents[i].classList.remove("hide");
        tabContents[i].classList.add("show", "fade");
        tabHeaders[i].classList.add("tabheader__item_active");
    }

    hideTabContectsAndActiveClasses();
    showTabContectsAndActiveClasses();

// event delegation
    tabHeadersParent.addEventListener("click", (e) => {
        if(e.target && e.target.matches(".tabheader__item")) {
            for (let i = 0; i < tabHeaders.length; i++) {
                if (e.target == tabHeaders[i]) {
                    hideTabContectsAndActiveClasses();
                    showTabContectsAndActiveClasses(i);
                }
            }
        }
    });
    // tabs logic end
    
    // timer logic start
    const deadline = "2026-09-23 23:59:59"
    
    function timeRemaining(deadline) {
        const total = Date.parse(deadline) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } 
        
        else {
            days = Math.floor(total / (1000 * 60 * 60 * 24));
            hours = Math.floor((total / 1000 * 60 * 60) % 24);
            minutes = Math.floor((total / 1000 / 60) % 60);
            seconds = Math.floor((total / 1000) % 60);
        }
    
        return {total, days, hours, minutes, seconds};
    }

    function setZero(n) {
        return n >= 0 && n < 10 ? `0${n}` : n;
    }
    
    function setClock(selector, deadline) {
        const timer = document.querySelector(selector);
        const daysElem = timer.querySelector("#days");
        const hoursElem = timer.querySelector("#hours");
        const minutesElem = timer.querySelector("#minutes");
        const secondsElem = timer.querySelector("#seconds");

        const timeInterval = setInterval(clockUpdate, 1000);
    
        clockUpdate()

        function clockUpdate() {
            const {total, days, hours, minutes, seconds} = timeRemaining(deadline);

            daysElem.textContent = setZero(days);
            hoursElem.textContent = setZero(hours);
            minutesElem.textContent = setZero(minutes);
            secondsElem.textContent = setZero(seconds);

            if (total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    // timer logic end
});