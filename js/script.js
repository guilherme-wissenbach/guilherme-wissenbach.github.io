// const swiper = new Swiper('.swiper-container', {
//   loop: true,
//   spaceBetween: 0,
//   slidesPerView: 3,
//   centeredSlides: false,
//   autoplay: {
//     delay: 10000,
//     disableOnInteraction: false,
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   breakpoints: {
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     }
//   }
// });
const swiper = new Swiper('.swiper-container', {
  effect: "cards",
  grabCursor: true,
  // loop: true,
  cardsEffect: {
    slideShadows: false,
    perSlideOffset: 15, // Space between cards in px
    // perSlideRotate: 1, // Rotation of cards in degrees
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
swiper.slideTo(2, 0)


$('a[href^="#"]').on('click', function (e) {
  e.preventDefault();
  const target = $(this.getAttribute('href'));
  if (target.length) {
    if (isMobileUserAgent() && !$(this).hasClass("nav-logo")) {
      $(".nav-container").fadeToggle().css('display', 'flex');
    }
    if (isMobileUserAgent() && $(this).hasClass("nav-logo") && $(".nav-container").is(":visible")) {
      $(".nav-container").fadeToggle().css('display', 'flex');
    }
    $('html, body').animate({
      scrollTop: target.offset().top - 200
    }, 800);
  }
});


$(".nav-menu").on("click", function () {
  $(".nav-container").fadeToggle().css('display', 'flex');
})

function isMobileUserAgent() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}


let lastScrollTop = 0;
const nav = $('#main-nav');

$(window).on('scroll', function () {
  const scrollTop = $(this).scrollTop();

  if (scrollTop > 500) {
    nav.css('top', '0'); // show nav
  } else {
    nav.css('top', '-100px'); // hide nav when near top
  }

  lastScrollTop = scrollTop;
});

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 1000; // total time in ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    counter.textContent = '+' + value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = '+' + target; // Ensure final value
    }
  }

  requestAnimationFrame(update);
}

// Trigger when stats are visible
function setupCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  let triggered = false;

  window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    const statsTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (!triggered && statsTop < windowHeight - 100) {
      counters.forEach(animateCounter);
      triggered = true;
    }
  });
}

setupCounterAnimation();
