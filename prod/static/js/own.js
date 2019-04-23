"use strict";

function qs(query) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return root.querySelector(query);
}

function qsAll(query) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return root.querySelectorAll(query);
}

function getParent(el, findParent) {
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.classList && el.classList.contains(findParent)) return el;
  }

  return false;
}

window.onload = function () {
  return qs('body').classList.add('loaded-page');
};

if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) qs('body').classList.add('ios');
document.addEventListener("DOMContentLoaded", function (event) {
  window.site = {};
  window.site.form = {
    init: function init() {
      var _th = this,
          forms = qsAll('form'),
          fieldPhones = qsAll('.js-phone'),
          formElems = qsAll('.form__field-input, .form__field-textarea');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fieldPhones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var phoneItem = _step.value;
          $(phoneItem).mask('+7(999) 999-9999');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var formElem = _step2.value;

          if (formElem.value != '') {
            formElem.classList.add('no-empty');
          } else {
            formElem.classList.remove('no-empty');
          }

          formElem.addEventListener('keyup', function () {
            if (formElem.value != '') {
              formElem.classList.add('no-empty');
            } else {
              formElem.classList.remove('no-empty');
            }
          });
        };

        for (var _iterator2 = formElems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = forms[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var formItem = _step3.value;
          formItem.addEventListener('submit', function (event) {
            if (!_th.checkForm($(this))) event.preventDefault();
          });
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return this;
    },
    checkForm: function checkForm(form) {
      var checkResult = true;
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
      if (!selector) return;
      var element,
          op = 1;

      if (typeof selector === 'string' || selector instanceof String) {
        element = document.querySelector(selector);
      } else {
        element = selector;
      }

      var timer = setInterval(function () {
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
      if (!selector) return;
      var element,
          op = 0.1;

      if (typeof selector === 'string' || selector instanceof String) {
        element = document.querySelector(selector);
      } else {
        element = selector;
      }

      element.style.opacity = 0;
      element.style.display = 'block';
      var timer = setInterval(function () {
        if (op >= 1) {
          clearInterval(timer);
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
      }, duration / 50 || 20);
    },
    burger: function burger() {
      var _th = this,
          $body = qs('body'),
          nav = qs('.nav');

      qs('.js-burger').addEventListener('click', function () {
        var _t = this;

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
      var inputFiles = qsAll('.js-file'),
          fileItems;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = inputFiles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var inputFileItem = _step4.value;
          inputFileItem.addEventListener('change', function () {
            var _t = this,
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
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      document.onclick = function (e) {
        if (e.target.classList.contains('js-del-file')) {
          var _t = e.target,
              over = _t.parentNode.parentNode.parentNode,
              input = over.querySelector('.uploaded-file__input');

          _t.parentNode.remove();

          over.classList.remove('uploaded-file--no-empty');

          if (input) {
            input.value = '';
          }

          e.preventDefault();
        }
      };
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
          wrapScroll.animate({
            scrollTop: $('.mfp-content').height()
          }, "slow");
        } else {
          wrapScroll.animate({
            scrollTop: 0
          }, "slow");
        }

        return false;
      });
    },
    mfpAjax: function mfpAjax() {
      var mfpAjax = $('.js-mfp-ajax');
      mfpAjax.on('click', function () {
        var _t = $(this),
            html = $.ajax(),
            hiddenBlock = $('.hidden-block');
        /*заглушка с уникальным id - заменть на контент подтянутый по ajax,
          разметку попапа взять с попапа в скрытом блоке после футера
          --> .popup.popup--brands.mfp-hide#brands
        */


        html = $('.popup--brands:first-child').clone().addClass('appended').attr('id', 'brands_02');
        /*end - заглушка с уникальным id*/
        //помещаю контент в скрытый блок на стр

        html.prependTo(hiddenBlock); //закрываю текущий попап

        $.magnificPopup.close(); //показываю добавленный на страницу

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
      var ivideoVideos = qsAll('.ivideo__item');
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        var _loop2 = function _loop2() {
          var ivideoItem = _step5.value;
          var ivideoOver = ivideoItem.parentNode,
              centerContent = ivideoItem.nextElementSibling,
              playBtn = centerContent.querySelector('.ivideo__play-ico');
          ivideoItem.addEventListener('ended', function (e) {
            centerContent.classList.remove('ivideo__center--hide');
            ivideoOver.classList.remove('ivideo--full');
          });
          ivideoItem.addEventListener('pause', function (e) {
            centerContent.classList.remove('ivideo__center--hide');
            ivideoOver.classList.remove('ivideo--full');
          });
          ivideoOver.addEventListener('click', function (event) {
            if (!ivideoItem.paused) {
              ivideoItem.pause();
              centerContent.classList.remove('ivideo__center--hide');
              ivideoOver.classList.remove('ivideo--full');
            } else {
              ivideoItem.play();
              centerContent.classList.add('ivideo__center--hide');
              ivideoOver.classList.add('ivideo--full');
            }

            event.preventDefault();
          });
          playBtn.addEventListener('click', function (event) {
            ivideoItem.play();
            centerContent.classList.add('ivideo__center--hide');
            ivideoOver.classList.add('ivideo--full');
            event.preventDefault();
            console.log('2');
          });
        };

        for (var _iterator5 = ivideoVideos[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          _loop2();
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    },
    iclientsSwiper: function iclientsSwiper() {
      var _th = this;

      var iclientsSwiper = new Swiper('.js-iclients-swiper', {
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
          init: function init() {
            if (qs('.js-mfp-video')) _th.mfpVideo();
          }
        }
      });

      qs('.js-iclients-swiper').onmouseover = function (event) {
        iclientsSwiper.autoplay.stop();
      };

      qs('.js-iclients-swiper').onmouseout = function (event) {
        iclientsSwiper.autoplay.start();
      };
    },
    peopleSwiper: function peopleSwiper() {
      var _th = this;

      var peopleSwiper = new Swiper('.js-people-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 'auto',
        loopedSlides: qsAll('.js-people-swiper .swiper-slide').length,
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
      peopleSwiper.on('slideChangeTransitionEnd', function () {
        var _t = this,
            _tSlideChildren = qs('.swiper-slide-active .people__item', _t.el),
            dataName = _tSlideChildren.dataset.name && _tSlideChildren.dataset.name != '' ? _tSlideChildren.dataset.name : false,
            dataPos = _tSlideChildren.dataset.pos && _tSlideChildren.dataset.pos != '' ? _tSlideChildren.dataset.pos : false,
            dataDescr = _tSlideChildren.dataset.descr && _tSlideChildren.dataset.descr != '' ? _tSlideChildren.dataset.descr : false,
            infoName = qs('.people__info-name') || false,
            infoPos = qs('.people__info-pos') || false,
            infoDescr = qs('.people__info-descr') || false;

        function changeInfo(dataAtr, selector) {
          if (dataAtr) {
            selector.textContent = dataAtr;

            _th.fadeIn(selector, 250);
          } else {
            _th.fadeOut(selector, 250);
          }
        }

        if (dataName && infoName) changeInfo(dataName, infoName);
        if (dataPos && infoPos) changeInfo(dataPos, infoPos);
        if (dataDescr && infoDescr) changeInfo(dataDescr, infoDescr);
      });
    },
    scrollnextElem: function scrollnextElem() {
      qs('.arrow').addEventListener('click', function (e) {
        window.scroll({
          left: 0,
          top: this.parentNode.offsetHeight,
          behavior: 'smooth'
        });
        e.preventDefault();
      });
    },
    anim: function anim() {
      var elemsAnimArr = ['.js-scroll-anim'];

      function visChecker(el, scrollTop) {
        var rect = el.getBoundingClientRect();
        var wHeight = window.innerHeight || document.documentElement.clientHeight;
        var wWidth = window.innerWidth || document.documentElement.clientWidth;
        return rect.top + scrollTop <= wHeight * 0.82 + scrollTop && rect.right <= wWidth;
      }

      function elemVisCheck(elArray) {
        window.addEventListener('scroll', function (event) {
          var wst = this.pageYOffset;

          if (elArray.length) {
            elArray.forEach(function (item) {
              if (document.querySelectorAll(item).length) {
                document.querySelectorAll(item).forEach(function (elem) {
                  if (visChecker(elem, wst)) {
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
      var elemsAnimArr = ['.js-scroll-anim'];
      if (elemsAnimArr.length) this.anim();
      if (qs('.arrow')) this.scrollnextElem();
      if (qs('.js-burger')) this.burger();
      if (qsAll('.ivideo__item').length) this.ivideo();
      if (qs('.js-file')) this.jsFile();
      if (qs('.js-mfp')) this.mfp();
      if (qs('.js-mfp-video')) this.mfpVideo();
      if (qs('.js-mfp-ajax')) this.mfpAjax();
      if (qs('.js-iclients-swiper')) this.iclientsSwiper();
      if (qs('.js-people') && qs('.js-people-swiper')) this.peopleSwiper();
      $('.js-toggle-desr').on('click', function () {
        var _t = $(this),
            hiddenSibl = _t.siblings('.services__item-descr');

        if (_t.hasClass('services__item-title-button--active')) {
          _t.removeClass('services__item-title-button--active');

          hiddenSibl.slideUp(350);
        } else {
          _t.addClass('services__item-title-button--active');

          hiddenSibl.slideDown(350);
        }

        return false;
      });
      $('.ihead__btn').on('click', function () {
        if ($('.ifeed').length) {
          $('html, body').stop().animate({
            scrollTop: $('.ifeed').offset().top
          }, 700, 'swing');
          return false;
        }

        if ($('.common-feed').length) {
          $('html, body').stop().animate({
            scrollTop: $('.common-feed').offset().top
          }, 700, 'swing');
          return false;
        }
      });
      $(document).on('click', function (e) {
        if ($(e.target).closest('.popup--brands').length && !$(e.target).closest('.popup__container').length) {
          $.magnificPopup.close();
          e.preventDefault;
        }
      });
      var eventScroll;

      try {
        eventScroll = new Event('scroll');
      } catch (e) {
        eventScroll = document.createEvent('Event');
        var doesnt_bubble = false,
            isnt_cancelable = false;
        eventScroll.initEvent('scroll', doesnt_bubble, isnt_cancelable);
      }

      window.dispatchEvent(eventScroll);
      return this;
    }
  }.init();
});
//# sourceMappingURL=own.js.map
