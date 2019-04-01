"use strict";

function qs(query, root = document) {
  return root.querySelector(query);
}
function qsAll(query, root = document) {
  return root.querySelectorAll(query);
}
function getParent(elem, selector) {
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.classList.contains(selector)) return parent;
  }
}
//getParent(document.querySelector('.elem'), 'parent-class')

document.addEventListener("DOMContentLoaded", function (event) {

  window.site = {};

  window.site.form = {

    init: function init() {
      let _th = this,
        forms = qsAll('form'),
        fieldPhones = qsAll('.js-phone'),
        formElems = qsAll('.form__field-input, .form__field-textarea');
      for (let phoneItem of fieldPhones) {
        phoneItem.mask('+7(999) 999-9999')
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
      let element,
        op = 1;
      if (typeof selector === 'string' || selector instanceof String) {
        element = document.querySelector(selector);
      } else {
        element = selector;
      }
      if (!element)
        return;
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
      let element,
        op = 0.1;
      if (typeof selector === 'string' || selector instanceof String) {
        element = document.querySelector(selector);
      } else {
        element = selector;
      }
      if (!element)
        return;
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
        } else {
          _t.classList.remove('header__burger--active');
          nav.classList.remove('nav--show');
        }
        return false;
      });
    },

    map2Gis: function map2Gis() {
      let $map = qs('.js-map'),
        coords = $map.dataset.coords.split(',');

      DG.then(function () {
        let map = DG.map('2GisMap', {
          center: [coords[0], coords[1]],
          zoom: $map.dataset.zoom || 17,
        });

        let myIcon = DG.icon({
          iconUrl: 'static/img/pin.png',
          iconSize: [77, 83],
          iconAnchor: [38, 100]
        });

        map.scrollWheelZoom.disable();

        DG.marker([coords[0], coords[1]], {
          icon: myIcon
        }).addTo(map).bindPopup('DEVSAL');
      });
    },

    stickyAside: function stickyAside() {
      let sidebarRight = new StickySidebar('.js-sticky-right', {
        topSpacing: 35,
        bottomSpacing: 35
      });
    },

    mfp: function mfp() {
      let closeMfp = qsAll('.js-close-mfp');
      $('.js-mfp').magnificPopup({
        type: 'inline',
        midClick: true,
        mainClass: 'mfp-fade'
      });
      if (closeMfp.length) {
        for (let closeMfpItem of closeMfp) {
          closeMfpItem.addEventListener('click', (e) => {
            $.magnificPopup.close();
            e.preventDefault();
          });
        }
      }
    },

    jsFile: function jsFile() {
      let inputFile = qs('.js-file'),
        fileItems;
      inputFile.addEventListener('change', function () {
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

    init: function init() {
      let _self = this,
        $body = qs('body');

      window.onload = () => $body.classList.add('loaded-page')

      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $body.classList.add('ios');
      }

      if (qs('.js-file')) this.jsFile()

      if (qs('.js-map')) this.map2Gis()

      if (qs('.js-mfp')) this.mfp()

      if ($('.js-cases-swiper').length) {
        let casesSwiper = new Swiper('.js-cases-swiper', {
          loop: true,
          speed: 500,
          slidesPerView: 1,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          autoHeight: true,
          mousewheel: false,
          grabCursor: false,
          keyboard: false,
          simulateTouch: false,
          allowSwipeToNext: false,
          allowSwipeToPrev: false,
          navigation: {
            nextEl: '.cases .swiper-button-next',
            prevEl: '.cases .swiper-button-prev'
          },
          pagination: {
            el: '.cases .swiper-pagination',
            clickable: true
          }
        });
      }

      if ($('.js-clients-swiper').length) {
        let clientsSwiper = new Swiper('.js-clients-swiper', {
          loop: true,
          speed: 500,
          slidesPerView: 4,
          mousewheel: false,
          grabCursor: false,
          keyboard: false,
          simulateTouch: false,
          allowSwipeToNext: false,
          allowSwipeToPrev: false,
          navigation: {
            nextEl: '.clients .swiper-button-next',
            prevEl: '.clients .swiper-button-prev'
          }
        });
      }

      if (qsAll('.js-toggle-answer').length) {
        let btns = qsAll('.js-toggle-answer');
        for (let btnItem of btns) {
          btnItem.addEventListener('click', function (e) {
            var _t = this,
              answer = _t.nextElementSibling;
            if (_t.classList.contains('active')) {
              _self.fadeOut(answer, 300)
              _t.classList.remove('active');
            } else {
              _self.fadeIn(answer, 300)
              _t.classList.add('active');
            }
            e.preventDefault();
          });
        }
      }

      /*
      if ($('.js-rating').length) {
        var rating = $('.js-rating'),
          star = rating.find('.rating-review__star-item');
        star.on('click', function () {
          var _tStar = $(this),
            input = _tStar.parents('.rating-review').find('.rating-review__input');
          if (!_tStar.hasClass('selected')) {
            star.removeClass('active selected');
            _tStar.addClass('selected');
            _tStar.prevAll('.rating-review__star-item').addClass('active');
            input.prop('value', _tStar.index() + 1);
          } else {
            _tStar.removeClass('selected');
            star.removeClass('active');
            input.prop('value', '0');
          }
          return false;
        });

        star.mouseenter(function () {
          var _t = $(this),
            starSelected = $('.rating-review__star-item.selected');
          if (!_t.hasClass('active')) {
            star.removeClass('active');
            _t.addClass('active');
            _t.prevAll('.rating-review__star-item').addClass('active');
          } else {
            if (starSelected.length) {
              if (_t.index() >= starSelected.index()) {
                _t.nextAll('.rating-review__star-item').removeClass('active');
              }
            } else {
              _t.nextAll('.rating-review__star-item').removeClass('active');
            }
          }
        });

        rating.mouseleave(function () {
          if (!$('.rating-review__star-item.selected').length) {
            star.removeClass('active');
          }
        });

      }

      var $contentTables = $(".text table");
      if ($contentTables.length) {
          $contentTables.each(function () {
              $(this).wrap('<div class="table-wrap">');
          });
      }
      */

      return this;
    }

  }.init();

});
