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
    const endTime = "2026-01-01 00:00";

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
    return n >= 0 && n < 10 ? `0${n}` : n;
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

    //modal start

    const openModalTriggers = document.querySelectorAll("[data-modal-open]");
    const closeModalTrigger = document.querySelector("[data-modal-close]");
    const modal = document.querySelector(".modal");

    const modalTimerId = setTimeout(openModal, 32000);

    function closeModal() {
        modal.classList.remove("show");
        modal.classList.add("hidden");
        document.body.style.overflowY = "auto";
        clearTimeout(modalTimerId);
    }

    function openModal() {
        modal.classList.remove("hidden");
        modal.classList.add("show");
        document.body.style.overflowY = "hidden";
        clearTimeout(modalTimerId);
    }

    openModalTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            if (modal.classList.contains("hidden")) openModal();
        });
    });
    
    if (!modal.matches(".hidden") && !modal.matches(".show"))
        modal.classList.add("hidden");

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    
    closeModalTrigger.addEventListener("click", () => {
        if (modal.classList.contains("show")) closeModal();
    });

    modal.addEventListener("click", (e) => {
        if(e.target && e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.matches(".show")) closeModal();
    });

    window.addEventListener("scroll", showModalByScroll);

    //modal end

    //MenuCard start

    class MenuCard {
        constructor (coverSrc, coverAlt, title, descr, price, parentSelector){
            this.coverSrc = coverSrc;
            this.coverAlt = coverAlt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.usdRate = 41.25;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.usdRate;
        }

        render() {
            const elem = document.createElement("div");
            const {coverSrc, coverAlt, title, descr, price } = this;
            elem.innerHTML = `
                <div class="menu__item">
                    <img src="${coverSrc}" alt="${coverAlt}">
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price.toFixed(2)}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parentSelector.append(elem);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg", 
        "vegy", 
        "Меню \"Фитнес\"",
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
            овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
            ценой и высоким качеством!`,
        5.55,
        ".menu__field .container"
     ).render();

     new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню “Премиум”",
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но
                        и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
                        в ресторан!`,
        13.33,
        ".menu__field .container"
     ).render();

     new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню \"Постное\"",
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
                        продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
                        количество белков за счет тофу и импортных вегетарианских стейков.`,
        10.42,
        ".menu__field .container"
     ).render();
    //MenuCard end
});

