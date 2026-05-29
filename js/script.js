"use strict";

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
})
});
