"use strict";

function qs(query, root = document) {
  return root.querySelector(query);
}

function qsAll(query, root = document) {
  return root.querySelectorAll(query);
}

function getParent(el, findParent) {
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.classList && el.classList.contains(findParent)) return el;
  }
  return false;
}

window.onload = () => qs('body').classList.add('loaded-page');

if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) qs('body').classList.add('ios');

document.addEventListener("DOMContentLoaded", function (event) {

  window.site = {};

  window.site.form = {

    init: function init() {
      let _th = this,
        forms = qsAll('form'),
        fieldPhones = qsAll('.js-phone'),
        formElems = qsAll('.form__field-input, .form__field-textarea');
      for (let phoneItem of fieldPhones) {
        $(phoneItem).mask('+7(999) 999-9999')
      }
      for (let formElem of formElems) {
        if (formElem.value != '') {
          formElem.classList.add('no-empty')
        } else {
          formElem.classList.remove('no-empty')
        }
        formElem.addEventListener('keyup', function () {
          if (formElem.value != '') {
            formElem.classList.add('no-empty')
          } else {
            formElem.classList.remove('no-empty')
          }
        });
      }
      for (let formItem of forms) {
        formItem.addEventListener('submit', function (event) {
          if (!_th.checkForm($(this))) event.preventDefault()
        });
      }
      return this;
    },

    checkForm: function checkForm(form) {
      let checkResult = true;
      form.find('.warning').removeClass('warning');
      form.find('input, textarea, select').each(function () {
        if ($(this).data('req')) {
          switch ($(this).data('type')) {
            case 'tel':
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test($(this).val())) {
                $(this).addClass('warning');
                checkResult = false;
              }
              break;
            case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test($(this).val())) {
                $(this).addClass('warning');
                checkResult = false;
              }
              break;
            case 'checkbox_personal':
              if (!$(this).is(':checked')) {
                $(this).parents('.checkbox').addClass('warning');
                checkResult = false;
              }
              break;
            default:
              if ($.trim($(this).val()) === '') {
                $(this).addClass('warning');
                checkResult = false;
              }
              break;
          }
        }
      });
      return checkResult;
    }

  }.init();

  window.site.obj = {

    fadeOut: function fadeOut(selector, duration) {
      if (!selector)
        return;
      let element,
        op = 1;
      if (typeof selector === 'string' || selector instanceof String) {
        element = document.querySelector(selector);
      } else {
        element = selector;
      }
      let timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      }, duration / 50 || 20);
    },

    fadeIn: function fadeIn(selector, duration) {
      if (!selector)
        return;
      let element,
        op = 0.1;
      if (typeof selector === 'string' || selector instanceof String) {
        element = document.querySelector(selector);
      } else {
        element = selector;
      }
      element.style.opacity = 0;
      element.style.display = 'block';
      let timer = setInterval(function () {
        if (op >= 1) {
          clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
      }, duration / 50 || 20);
    },

    burger: function burger() {
      let _th = this,
        $body = qs('body'),
        nav = qs('.nav');
      qs('.js-burger').addEventListener('click', function () {
        let _t = this;
        if (!_t.classList.contains('header__burger--active')) {
          _t.classList.add('header__burger--active');
          nav.classList.add('nav--show');
          _th.fadeIn('.nav', 300);
        } else {
          _t.classList.remove('header__burger--active');
          nav.classList.remove('nav--show');
          _th.fadeOut('.nav', 300);
        }
        return false;
      });
    },

    jsFile: function jsFile() {
      let inputFiles = qsAll('.js-file'),
        fileItems;

      for (let inputFileItem of inputFiles) {
        inputFileItem.addEventListener('change', function () {
          let _t = this,
            over = _t.parentNode.parentNode,
            fileItems = over.querySelector('.uploaded-file__items'),
            fileItemDiv = document.createElement('div');
          if (_t.files.length && fileItems) {
            fileItemDiv.classList.add('uploaded-file__item');
            fileItemDiv.innerHTML = '<p class="uploaded-file__item-name">' + _t.files[0].name + '</p><button class="uploaded-file__item-del-btn js-del-file" type="button">удалить</button>';
            fileItems.appendChild(fileItemDiv);
            if (!over.classList.contains('uploaded-file--no-empty')) {
              over.classList.add('uploaded-file--no-empty');
            }
          }
        });
      }

      document.onclick = function (e) {
        if (e.target.classList.contains('js-del-file')) {
          let _t = e.target,
            over = _t.parentNode.parentNode.parentNode,
            input = over.querySelector('.uploaded-file__input');
          _t.parentNode.remove();
          over.classList.remove('uploaded-file--no-empty');
          if (input) {
            input.value = '';
          }
          e.preventDefault();
        }
      }

    },

    mfpVideo: function mfp() {
      $('.js-mfp-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });
    },

    mfp: function mfp() {
      $('.js-mfp').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade'
      });
      $('.js-scroll-btn').on('click', function () {
        var wrapScroll = $('.mfp-wrap');
        if ($(this).hasClass('popup__scroll-btn--bottom')) {
          wrapScroll.animate({ scrollTop: $('.mfp-content').height() }, "slow");
        } else {
          wrapScroll.animate({ scrollTop: 0 }, "slow");
        }
        return false;
      });
    },

    mfpAjax: function mfpAjax() {
      let mfpAjax = $('.js-mfp-ajax');
      mfpAjax.on('click', function () {
        var _t = $(this),
          html = $.ajax(),
          hiddenBlock = $('.hidden-block');

        /*заглушка с уникальным id - заменть на контент подтянутый по ajax,
          разметку попапа взять с попапа в скрытом блоке после футера
          --> .popup.popup--brands.mfp-hide#brands
        */
        html = $('.popup--brands:first-child')
          .clone()
          .addClass('appended')
          .attr('id', 'brands_02');
        /*end - заглушка с уникальным id*/

        //помещаю контент в скрытый блок на стр
        html.prependTo(hiddenBlock);

        //закрываю текущий попап
        $.magnificPopup.close();

        //показываю добавленный на страницу
        $.magnificPopup.open({
          items: {
            // сюда вставляем тот самый уникальный id
            src: '#brands_02'
          },
          type: 'inline',
          mainClass: 'mfp-fade'
        }, 0);

        return false;
      });

    },

    ivideo: function ivideo() {
      let ivideoVideos =  qsAll('.ivideo__item');
      for (let ivideoItem of ivideoVideos) {
        let ivideoOver = ivideoItem.parentNode,
          centerContent = ivideoItem.nextElementSibling,
          playBtn = centerContent.querySelector('.ivideo__play-ico');
        ivideoItem.addEventListener('ended', (e)=> {
          centerContent.classList.remove('ivideo__center--hide');
          ivideoOver.classList.remove('ivideo--full');
        });
        ivideoItem.addEventListener('pause', (e)=> {
          centerContent.classList.remove('ivideo__center--hide');
          ivideoOver.classList.remove('ivideo--full');
        });
        playBtn.addEventListener('click', (e)=> {
          ivideoItem.play();
          centerContent.classList.add('ivideo__center--hide');
          ivideoOver.classList.add('ivideo--full');
          e.preventDefault();
        });
      }
    },

    iclientsSwiper: function iclientsSwiper() {
      let _th = this;
      let iclientsSwiper = new Swiper('.js-iclients-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 7,
        autoHeight: true,
        mousewheel: false,
        keyboard: false,
        allowSwipeToNext: false,
        allowSwipeToPrev: false,
        autoplay: {
          delay: 1000
        },
        breakpoints: {
          768: {
            slidesPerView: 2
          },
          992: {
            slidesPerView: 3
          },
          1600: {
            slidesPerView: 5
          }
        },
        on: {
          init: function () {
            if (qs('.js-mfp-video')) _th.mfpVideo();
          },
        }
      });
      qs('.js-iclients-swiper').onmouseover = function(event) {
        iclientsSwiper.autoplay.stop();
      };
      qs('.js-iclients-swiper').onmouseout = function(event) {
        iclientsSwiper.autoplay.start();
      };
    },

    peopleSwiper: function peopleSwiper() {
      let _th = this;
      let peopleSwiper = new Swiper('.js-people-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 'auto',
        centeredSlides: true,
        slidesOffsetBefore: 0,
        spaceBetween: 40,
        slideToClickedSlide: true,
        breakpoints: {
          1600: {
            spaceBetween: 0
          }
        }
      });
      peopleSwiper.on('slideChangeTransitionEnd', function() {
        let _t = this,
          _tSlideChildren = qs('.swiper-slide-active .people__item', _t.el),
          dataName = _tSlideChildren.dataset.name && _tSlideChildren.dataset.name != '' ? _tSlideChildren.dataset.name : false,
          dataPos = _tSlideChildren.dataset.pos && _tSlideChildren.dataset.pos != '' ? _tSlideChildren.dataset.pos : false,
          dataDescr = _tSlideChildren.dataset.descr && _tSlideChildren.dataset.descr != '' ? _tSlideChildren.dataset.descr : false,
          infoName = qs('.people__info-name') || false,
          infoPos = qs('.people__info-pos') || false,
          infoDescr = qs('.people__info-descr') || false;
        function changeInfo(dataAtr, selector) {
          if (dataAtr){
            selector.textContent = dataAtr;
            _th.fadeIn(selector, 250);
          } else{
            _th.fadeOut(selector, 250);
          }
        }
        if (dataName && infoName ) changeInfo(dataName, infoName);
        if (dataPos && infoPos) changeInfo(dataPos, infoPos);
        if (dataDescr && infoDescr) changeInfo(dataDescr, infoDescr);
      });
    },

    scrollnextElem: function scrollnextElem() {
      qs('.arrow').addEventListener('click', function(e) {
        window.scroll({
          left: 0,
          top: this.parentNode.offsetHeight,
          behavior: 'smooth'
        });
        e.preventDefault();
      });
    },

    anim: function anim() {
      let elemsAnimArr = ['.js-scroll-anim'];

      function visChecker(el) {
        const rect = el.getBoundingClientRect();
        const wHeight = window.innerHeight || document.documentElement.clientHeight;
        const wWidth = window.innerWidth || document.documentElement.clientWidth;
        return (
          rect.bottom - el.offsetHeight * 0.75 <= wHeight &&
          rect.right <= wWidth
        );
      }

      function elemVisCheck(elArray) {
        window.addEventListener('scroll', () => {
          if (elArray.length) {
            elArray.forEach((item) => {
              if (document.querySelectorAll(item).length) {
                document.querySelectorAll(item).forEach((elem) => {
                  if (visChecker(elem)) {
                    elem.classList.add('start-animate');
                  }
                });
              }
            });
          }
        });
      }

      if (elemsAnimArr.length) {
        elemVisCheck(elemsAnimArr);
      }
    },

    init: function init() {

      let elemsAnimArr = ['.js-scroll-anim'];

      if (elemsAnimArr.length) this.anim();

      if(qs('.arrow')) this.scrollnextElem();

      if (qs('.js-burger')) this.burger();

      if (qsAll('.ivideo__item').length) this.ivideo();

      if (qs('.js-file')) this.jsFile();

      if (qs('.js-mfp')) this.mfp();

      if (qs('.js-mfp-video')) this.mfpVideo();

      if (qs('.js-mfp-ajax')) this.mfpAjax();

      if (qs('.js-iclients-swiper')) this.iclientsSwiper();

      if (qs('.js-people') && qs('.js-people-swiper')) this.peopleSwiper();

      $('.js-toggle-desr').on('click', function() {
        var _t = $(this),
          hiddenSibl = _t.siblings('.services__item-descr');
        if (_t.hasClass('services__item-title-button--active')) {
          _t.removeClass('services__item-title-button--active')
          hiddenSibl.slideUp(350);
        } else {
          _t.addClass('services__item-title-button--active')
          hiddenSibl.slideDown(350);
        }
        return false;
      });

      let eventScroll
      try {
        eventScroll = new Event('scroll')
      } catch (e) {
        eventScroll = document.createEvent('Event');
        let doesnt_bubble = false,
          isnt_cancelable = false
        eventScroll.initEvent('scroll', doesnt_bubble, isnt_cancelable);
      }
      window.dispatchEvent(eventScroll)

      return this;
    }

  }.init();

});

