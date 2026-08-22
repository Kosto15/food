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
    const deadline = "2026-09-22 23:59:59";
    
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

    // modal logic start
    const openModalTriggers = document.querySelectorAll("[data-modal-open]");
    const closeModalTrigger = document.querySelector("[data-modal-close]");
    const modal = document.querySelector(".modal");

    const modalTimerId = setTimeout(openModal, 600000);

    function closeModal () {
        modal.classList.remove("show")
        modal.classList.add("hidden")
        document.body.style.overflowY = "auto";
        clearTimeout(modalTimerId);
    }

    function openModal () {
        modal.classList.remove("hidden")
        modal.classList.add("show")
        document.body.style.overflowY = "hidden";
        clearTimeout(modalTimerId);
    }

    function showModalWhenWeScroll () {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal()
            window.removeEventListener("scroll", showModalWhenWeScroll)
        }
    }

    if (!modal.matches(".hidden") && !modal.matches(".show")) {
        modal.classList.add("hidden")
    }

    openModalTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            if (modal.classList.contains("hidden")) openModal();
        });
    });

    closeModalTrigger.addEventListener("click", () => {
        if (modal.classList.contains("show")) closeModal();
    });

    modal.addEventListener("click", (e) => {
        if (e.target && e.target === modal) closeModal();
    });

    // presss escape button = closeModal function
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.matches(".show")) closeModal();
    });

    window.addEventListener("scroll", showModalWhenWeScroll);
    // modal logic end

    // MenuCard logic start
    class MenuCard {
        constructor(coverSrc, coverAlt, title, descr, price, parentSelector) {
            this.coverSrc = coverSrc;
            this.coverAlt = coverAlt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.usdRate = 41.25;
            this.changeToUAH()
        }

        changeToUAH() {
            this.price = this.price * this.usdRate;
        }

        render() {
            const elem = document.createElement("div");
            const { coverSrc, coverAlt, title, descr, price } = this;
            elem.innerHTML = `
            <div class="menu__item">
                    <img src="${coverSrc}" alt="${coverAlt}">
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> драм/день</div>
                    </div>
                </div>
            `;
            this.parentSelector.append(elem);
        }
    }

    new MenuCard (
        "/img/tabs/vegy.jpg",
        "vegy", 
        "Меню \"Фитнес\"",
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Для
        людей, которые интересуются спортом; активных и здоровых. Это абсолютно новый продукт с
        оптимальной ценой и высоким качеством!`,
        15.16,
        ".menu__field .container"
    ).render();

    new MenuCard(
        "/img/tabs/elite.jpg",
        "elite",
        "Меню \"Премиум\"",
        `Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное 
        исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        31.32,
        ".menu__field .container"
    ).render();

    new MenuCard(
        "/img/tabs/post.jpg",
        "post",
        "Меню \"Постное\"",
        `Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие
        продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все
        будет Ом!`,
        24.12,
        ".menu__field .container"
    ).render();

    // MenuCard logic end
});