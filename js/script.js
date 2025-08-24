"use strict";

window.addEventListener("DOMContentLoaded", function () {
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
});