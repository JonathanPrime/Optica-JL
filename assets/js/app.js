window.onscroll = function() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0 ) {
        document.getElementById('navbar').classList.add('scrolled');
        document.getElementById('navbar-to').style.backgroundColor = "#FFFF";
        document.getElementById('link-1').style.color = "#C80048";
        document.getElementById('link-2').style.color = "#C80048";
        document.getElementById('link-3').style.color = "#C80048";
        document.getElementById('link-4').style.color = "#C80048";
        document.getElementById('link-5').style.color = "#C80048";
        document.getElementById('link-6').style.color = "#C80048";
    } else {
		  document.getElementById('navbar-to').style.backgroundColor = "#FFFF";
      document.getElementById('navbar').classList.add('scrolled');
      document.getElementById('link-1').style.color = "#FFFF";
        document.getElementById('link-2').style.color = "#FFFF";
        document.getElementById('link-3').style.color = "#FFFF";
        document.getElementById('link-4').style.color = "#FFFF";
        document.getElementById('link-5').style.color = "#FFFF";
        document.getElementById('link-6').style.color = "#FFFF";
    }
}

// AOS
AOS.init({
    duration: 800,
});

/*---------------------------------
[Master Javascript]

Project: Music

-------------------------------------------------------------------*/

/* let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .nav');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('active');
    document.getElementById('img-logo').src = '../images/svg/logo-dark.svg';
  } else {
    document.querySelector('.header').classList.remove('active');
    document.getElementById('img-logo').src = '../images/svg/logo-white.svg';
  }
} */
const $window = $(window);
const $body = $('body');

class Slideshow {
  constructor(userOptions = {}) {
    const defaultOptions = {
      $el: $('.slideshow'),
      showArrows: false,
      showPagination: true,
      duration: 6000,
      autoplay: true
    };
    let options = Object.assign({}, defaultOptions, userOptions);
    this.$el = options.$el;
    this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
    this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
    this.showPagination = options.showPagination;
    this.currentSlide = 1;
    this.isAnimating = false;
    this.animationDuration = 1200;
    this.autoplaySpeed = options.duration;
    this.interval;
    this.$controls = this.$el.find('.js-slider-home-button');
    this.autoplay = this.maxSlide > 1 ? options.autoplay : false;
    this.$el.on('click', '.js-slider-home-next', event => this.nextSlide());
    this.$el.on('click', '.js-slider-home-prev', event => this.prevSlide());
    this.$el.on('click', '.js-pagination-item', event => {
      if (!this.isAnimating) {
        this.preventClick();
        this.goToSlide(event.target.dataset.slide);
      }
    });
    this.init();
  }

  init() {
    this.goToSlide(1);

    if (this.autoplay) {
      this.startAutoplay();
    }

    if (this.showPagination) {
      let paginationNumber = this.maxSlide;
      let pagination = '<div class="pagination"><div class="container">';

      for (let i = 0; i < this.maxSlide; i++) {
        let item = `<span class="pagination__item js-pagination-item ${i === 0 ? 'is-current' : ''}" data-slide=${i + 1}>${i + 1}</span>`;
        pagination = pagination + item;
      }

      pagination = pagination + '</div></div>';
      this.$el.append(pagination);
    }
  }

  preventClick() {
    this.isAnimating = true;
    this.$controls.prop('disabled', true);
    clearInterval(this.interval);
    setTimeout(() => {
      this.isAnimating = false;
      this.$controls.prop('disabled', false);

      if (this.autoplay) {
        this.startAutoplay();
      }
    }, this.animationDuration);
  }

  goToSlide(index) {
    this.currentSlide = parseInt(index);

    if (this.currentSlide > this.maxSlide) {
      this.currentSlide = 1;
    }

    if (this.currentSlide === 0) {
      this.currentSlide = this.maxSlide;
    }

    const newCurrent = this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]');
    const newPrev = this.currentSlide === 1 ? this.$el.find('.js-slider-home-slide').last() : newCurrent.prev('.js-slider-home-slide');
    const newNext = this.currentSlide === this.maxSlide ? this.$el.find('.js-slider-home-slide').first() : newCurrent.next('.js-slider-home-slide');
    this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
    this.$el.find('.js-pagination-item').removeClass('is-current');

    if (this.maxSlide > 1) {
      newPrev.addClass('is-prev');
      newNext.addClass('is-next');
    }

    newCurrent.addClass('is-current');
    this.$el.find('.js-pagination-item[data-slide="' + this.currentSlide + '"]').addClass('is-current');
  }

  nextSlide() {
    this.preventClick();
    this.goToSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.preventClick();
    this.goToSlide(this.currentSlide - 1);
  }

  startAutoplay() {
    this.interval = setInterval(() => {
      if (!this.isAnimating) {
        this.nextSlide();
      }
    }, this.autoplaySpeed);
  }

  destroy() {
    this.$el.off();
  }

}

(function () {
  let loaded = false;
  let maxLoad = 3000;

  function load() {
    const options = {
      showPagination: true
    };
    let slideShow = new Slideshow(options);
  }

  function addLoadClass() {
    $body.addClass('is-loaded');
    setTimeout(function () {
      $body.addClass('is-animated');
    }, 600);
  }

  $window.on('load', function () {
    if (!loaded) {
      loaded = true;
      load();
    }
  });
  setTimeout(function () {
    if (!loaded) {
      loaded = true;
      load();
    }
  }, maxLoad);
  addLoadClass();
})();

popupWhatsApp = () => {

   let btnClosePopup = document.querySelector('.closePopup');
   let btnOpenPopup = document.querySelector('.whatsapp-button');
   let popup = document.querySelector('.popup-whatsapp');
   let sendBtn = document.getElementById('send-btn');

   btnClosePopup.addEventListener("click", () => {
      popup.classList.toggle('is-active-whatsapp-popup')
   })

   btnOpenPopup.addEventListener("click", () => {
      popup.classList.toggle('is-active-whatsapp-popup')
      popup.style.animation = "fadeIn .6s 0.0s both";
   })

   sendBtn.addEventListener("click", () => {
      let msg = document.getElementById('whats-in').value;
      let relmsg = msg.replace(/ /g, "%20");
      //just change the numbers "1515551234567" for your number. Don't use +001-(555)1234567     
      window.open('https://wa.me/573103048082?text=' + relmsg, '_blank');

   });

   /* Open pop-up in 15 seconds */
   setTimeout(() => {
     popup.classList.toggle('is-active-whatsapp-popup');
   }, 8000);

}

window.onload=function () {
  fadeOut();
}

function fadeOut() {
  setInterval(loader, 3000);
}

function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}

popupWhatsApp();