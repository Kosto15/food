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

    if (!modal.matches(".hidden") && !modal.matches(".show")) {
    modal.classList.add("hidden");
    }

    openModalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
        modal.classList.add("show");
        document.body.style.overflowY = "hidden";
        }
    });

    //using close function

    function closeModal() {
        modal.classList.remove("show");
        modal.classList.add("hidden");
        document.body.style.overflowY = "auto";
    }
    closeModalTrigger.addEventListener("click", () => {
        if (modal.classList.contains("show")) {
        closeModal();
        }
    });

    //using event delegation

    modal.addEventListener("click", (e) => {
        if (e.target && e.target.matches(".modal")) {
        closeModal();
        }
    });

    document.addEventListener("keydown", (e)=>{
        if (e.key === "Escape" && modal.matches(".show")) {
        closeModal();
        }
    })
});

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

    // forms start

    // take all forms
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        postData(form);
    });

    const MESSAGES = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так... Попробуйте еще раз",
    };

    function postData(form) {
        form.addEventListener("submit", (e) => {
        e.preventDefault();

        const loading = document.createElement("div");
        loading.style.cssText = `      
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 16px;
        margin-top: 16px;`;
        loading.innerHTML = `<img src="icons/spinner.svg" style="width: 16px;height: 16px;"/> <span>${MESSAGES.loading}</span>`;
        form.insertAdjacentElement("beforeend", loading);

        const formData = new FormData(e.target);

        const request = new XMLHttpRequest();
        request.open("POST", "http://localhost:4200/support/");
        request.setRequestHeader("Content-Type", "application/json");

        // converting formData to JSON

        request.send(JSON.stringify(Object.fromEntries(formData)));
        e.target.reset();

        // request.send(formData);
        request.addEventListener("load", (e) => {
            if (request.status === 200) {
            //console.log(request.response);
            //console.log("Успех:", request.response);
            //form.insertAdjacentHTML("beforeend", `<p>${MESSAGES.success}</p>`);

            ShowResponseModal(MESSAGES.success, loading);
            } else {
            //console.error("Ошибка:", request.status);
            //form.insertAdjacentHTML("beforeend", `<p>${MESSAGES.failure}</p>`);

            ShowResponseModal(MESSAGES.failure, loading);
            }
        });
        });
    }

    // showing modal window with response message
    function ShowResponseModal(message, loading) {
        loading.remove();
        // hiding previous modal window
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        openModal();

        // creating new modal window
        const responseModal = document.createElement("div");
        responseModal.classList.add("modal__dialog");
        responseModal.innerHTML = `
        <div class="modal__content">          
                <div data-modal-close class="modal__close">&times;</div>
                <div class="modal__title">
                ${message}
                </div>                 
            </div>
        `;
        modal.append(responseModal);

        const srmId = setTimeout(() => {
        responseModal.remove();
        prevModalDialog.classList.remove("hide");
        prevModalDialog.classList.add("show");
        clearTimeout(srmId);
        closeModal();
        }, 2500);
    }

    //forms end

    //slider start

    const slides = document.querySelectorAll(".offer__slide");
    const prevbtn = document.querySelector(".offer__slider-prev");
    const nextBtn = document.querySelector(".offer__slider-next");

    let slideIndex = 1;

    function showSlides (n) {
        console.log(slides.lenght)
        if (n > slides) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.lenght;
        }

        slides.forEach(slide => slide.classList.add("hide"));

        if (slides[slideIndex - 1].matches(".hide")) {
            slides[slideIndex - 1].classList.remove("hide");
            slides[slideIndex - 1].classList.add("show");
        } else {
            slides[slideIndex - 1].classList.add("hide");
            slides[slideIndex - 1].classList.remove("show");
        }
    }

    function changeSlidesN(n) {
        showSlides(slideIndex += n);
    }

    prevbtn.addEventListener("click", () => changeSlidesN(-1));
    nextBtn.addEventListener("click", () => changeSlidesN(1));
    
    //slider end
});

