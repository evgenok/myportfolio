"use strict"

// -------------device-------------

const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   IOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.IOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
};

if (isMobile.any()) {
   document.body.classList.add('_touch');

   let menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
         const menuArrow = menuArrows[index];
         menuArrow.addEventListener("click", function (e) {
            menuArrow.parentElement.classList.toggle('_active');
         });
      }
   }
}
else {
   document.body.classList.add('_pc');
}

// -----------плавный scroll---------------

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
   anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
         behavior: 'smooth',
         block: 'start'
      })
      document.body.classList.remove('_lock');
      iconMenu.classList.remove('_active');
      menuBody.classList.remove('_active');
   })
}

// --------Появление элементов при скролле--------------

function onEntry(entry) {
   entry.forEach(change => {
      if (change.isIntersecting) {
         change.target.classList.add('element-show');
      }
   });
}

let options = {
   threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
   observer.observe(elm);
}

// -----------------СЛАЙДЕР--------------

/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующий слайд*/
function plusSlide() {
   showSlides(slideIndex += 1);
}

/* Функция уменьшает индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
   showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
   showSlides(slideIndex = n);
}

/* Основная функция сладера */
function showSlides(n) {
   var i;
   var slides = document.getElementsByClassName("item");
   var dots = document.getElementsByClassName("slider-dots_item");
   if (n > slides.length) {
      slideIndex = 1
   }
   if (n < 1) {
      slideIndex = slides.length
   }
   for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
   }
   for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
   }
   slides[slideIndex - 1].style.display = "block";
   dots[slideIndex - 1].className += " active";
}

// ---------------исчезающее меню---------------

window.onscroll = function () { myFunction() };

// Получаем шапку
var header = document.querySelector(".header");

// Получаем позицию элемента
var sticky = header.offsetTop;

// Добавляем класс sticky, когда шапка достигнет нужной позиции.
// Удаляем класс sticky, когда шапка уйдет с этой позиции.
function myFunction() {
   if (window.pageYOffset > sticky) {
      header.classList.add("opacity");
   } else {
      header.classList.remove("opacity");
   }
}

// ---------------фильтр карточек портфолио-----------------

function myapp() {
   const buttons = document.querySelectorAll(".portfolio__menu-item");
   const cards = document.querySelectorAll(".portfolio__item");

   function filter(category, items) {
      items.forEach((item) => {
         const isItemFiltered = !item.classList.contains(category);
         const isShowAll = category.toLowerCase() === "all";
         if (isItemFiltered && !isShowAll) {
            item.classList.add("hide");
         } else {
            item.classList.remove("hide");
         }
      });
   }

   buttons.forEach((button) => {
      button.addEventListener("click", () => {
         const currentCategory = button.dataset.filter;
         filter(currentCategory, cards);
      });
   });
}

myapp();
