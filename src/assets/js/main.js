/* global AFN, Power4, Strong, FixedSticky */

/**
 * @module AFN
 * @class Layer Utility to create modal windows
 * @param  {Object} app   Global module
 * @param  {Object} utils Utilities module
 * @param  {Object} d     Document object
 * @return {Object}       Layer class
 */
(function (app, utils, d) {
  'use strict'

  var Layer,
    _onClose,
    templates,
    ESC

  ESC = 27

  templates = app.HtmlTemplates

  Layer = {

    baseOptions: {
      /**
             * @property {Boolean} dynamic Tell if content is taken from an ajax request
             */
      dynamic: false,

      dynamicTplName: 'layer',

      tplData: {},

      context: 'body',

      rootEl: 'html',

      id: 'layer',

      /**
             * klass Additional class to be added to root element
             * @type {String}
             */
      klass: 'waiting',

      btnClose: '.js-close-layer',

      dimClass: 'is-dimmed',

      WAIT: 2 * 1000,

      onAfterOpen: $.noop,

      onAfterClose: $.noop

    },

    settings: {},

    /**
         * @method simpleBlocker
         */
    simpleBlocker: function () {
      return templates.get('blocker')
    },

    /**
         * @method dynamicContent
         * @param {Object} data Data to fill the template with
         */
    dynamicContent: function (data) {
      return templates.set(this.settings.dynamicTplName, data)
    },

    /**
         * @method setUplayer
         * @param {String} layer Flattened template to be append to DOM node
         */
    setUplayer: function (layer) {
      var def = $.Deferred()

      $(this.settings.rootEl)
        .addClass(this.settings.dimClass)
        .addClass(this.settings.klass)

      $(this.settings.context).append(layer)

      def.resolve(function () {
        $(this.settings.context).append(layer)
      }.bind(this))

      return def.promise()
    },

    /**
         * @method writeLayer
         * @param  {String} data Content to be printed into template
         */
    writeLayer: function (data) {
      var body, layer

      body = {
        content: data
      }

      layer = (typeof data !== 'undefined') ? this.dynamicContent(body) : this.simpleBlocker()

      this.setUplayer(layer).then(this.settings.onAfterOpen.bind(this))
    },

    /**
         * @method clear Remove layer node and reset default class to root element
         * @param  {Object} layer Layer node
         * @param  {Object} rootEl Root node
         */
    clear: function (layer, rootEl) {
      layer.remove()

      rootEl
        .removeClass(this.settings.klass)
        .removeClass(this.settings.dimClass)

      this.settings.onAfterClose()
    },

    /**
         * @method removeLayer
         * @param {Boolean} immediately Whether or not to remove layer ASAP
         */
    removeLayer: function (immediately) {
      var $layer = $('#' + this.settings.id),
        $rootEl = $(this.settings.rootEl)

      if (immediately) {
        this.clear($layer, $rootEl)
      } else {
        $layer.addClass('is-removing')

        $layer.on('transitionend', this.clear.bind(this, $layer, $rootEl))
      }

      this.removeListener()
    },

    /**
         * @method onClose Manage layer closing logic.
         * Close the layer when:
         * - clicking outside its content
         * - pressing ESC on keyboard
         * @param  {Object} evt jQuery Event object
         */
    onClose: function (evt) {
      var $target = $(evt.target)

      if (evt.type === 'click') {
        if ($target.hasClass('layer')) {
          this.removeLayer()
        } else if ($target.hasClass('js-close-layer')) {
          this.removeLayer()
        }
      } else if (evt.type === 'keydown') {
        if (evt.keyCode === ESC) {
          this.removeLayer()
        }
      }
    },

    /**
         * @method removeListener Detach event listener
         */
    removeListener: function () {
      d.removeEventListener('click', _onClose, false)

      d.removeEventListener('keydown', _onClose, false)
    },

    /**
         * @method eventHandler Register event listener
         */
    eventHandler: function () {
      d.addEventListener('click', _onClose, false)

      d.addEventListener('keydown', _onClose, false)
    },

    onError: function () {
      console.log('fail', arguments)
    },

    /**
         * @method init
         */
    init: function (opt) {
      /**
             * _onClose Store a class-wide reference to `onClose` method,
             * in order to pass it to add/remove EventListener
             * @type {Object}
             */
      _onClose = this.onClose.bind(this)

      this.settings = $.extend({}, this.baseOptions, opt || {})

      if (this.settings.dynamic) {
        this.writeLayer(this.settings.tplData)
      } else {
        this.writeLayer()
      }

      this.eventHandler()
    }

  }

  app.Layer = Layer
})(AFN, AFN._UTILS_, document) // end Layer

/**
 * @module AFN
 * @class handleGlobalAjax Handler for global ajax events:
 * print and remove a UI blocker overlay when an ajax call is fired/completed.
 * @param  {Object} app Global app object
 * @param  {Object} d 	window.document
 * @return {Object}     Public API
 */
AFN.handleGlobalAjax = (function (app, d) {
  'use strict'

  var $d,
    _onAjaxStart,
    _onAjaxError,
    _onAjaxComplete

  $d = $(d)

  _onAjaxStart = app.loading

  _onAjaxComplete = app.loaded

  _onAjaxError = function () {
    console.log('_onAjaxError')
  }

  return {

    init: function () {
      $d.ajaxStart(function () {
        _onAjaxStart()
      })

      $d.ajaxComplete(function () {
        _onAjaxComplete()
      })

      $d.ajaxError(function () {
        _onAjaxError()
      })
    }

  }
})(AFN, window.document)

/**
 * @module AFN
 * @class TabsCallbacks
 * @param  {Object} app         App global module
 * @return {Object}             Public API
 */
AFN.TabsCallbacks = (function (app) {
  'use strict'

  var $panels,
    $svgWrapper

  $panels = $('.grid__item')

  $svgWrapper = $('.svg-wrapper')

  return {

    showcase: function () {
      TweenMax.staggerTo($panels, 0.25, {
        scale: 1,
        opacity: 1,
        delay: 0,
        ease: Power4.easeOut
      }, 0.1)
    },

    gallery: function () {

    },

    partecipate: function () {
      $svgWrapper.addClass('is-visible')
    }

  }
})(AFN) // end TabsCallbacks

/**
 * @module AFN
 * @class BusinessEventListener
 * @param  {Object} app           App global module
 * @param  {Object} events        Events map
 * @param  {Object} tabsCallbacks Callbacks wrapper
 * @param  {Object} topic 		  Pub/sub utility
 * @return {Object}               Public API
 */
AFN.BusinessEventListener = (function (app, events, tabsCallbacks, topic) {
  'use strict'

  var tabSelected = events.tabs.selected,
    _onTabSelected,
    _onPageScrolled

  _onPageScrolled = function (hash) {
    switch (hash) {
      case 'showcase':

        tabsCallbacks.showcase()

        break

      case 'gallery':

        tabsCallbacks.gallery()

        break

      case 'partecipate':

        tabsCallbacks.partecipate()

        break

      default:

        break
    }
  }

  _onTabSelected = function (target, hash) {
    hash = hash.replace('#', '')

    app.scrollToPos({
      target: target
    }, function () {
      _onPageScrolled(hash)
    })
  }

  topic(tabSelected).subscribe(_onTabSelected)
})(AFN, AFN._EVENTS_, AFN.TabsCallbacks, $.Topic) // end BusinessEventListener

/**
 * @module AFN
 * @class  SliderInit
 * @type {Object}
 */
AFN.SliderInit = {

  hasSlides: function (selector) {
    return $(selector).length
  },

  slider: null,

  init: function (wrapper, options) {
    var defaults, settings, slider

    defaults = {
      wrapAround: true,
      pageDots: false,
      cellAlign: 'left'
    }

    settings = $.extend({}, defaults, options)

    if (this.hasSlides(settings.cellSelector)) {
      slider = new Flickity(wrapper, settings)

      this.slider = Flickity.data(wrapper)
    }

    return this
  }

} // end SliderInit

/**
 * @module setUpMainSlider
 * @class setUpMainSlider
 * @param  {Object} app       App global module
 * @param  {Object} o 		  Object
 * @return {Object}           Public API
 */
AFN.setUpMainSlider = (function (app, o) {
  'use strict'

  app.mainSlider = o.create(AFN.SliderInit, {})

  app.mainSlider.init('.slider-wrapper', {
    cellSelector: '.slider__el',
    setGallerySize: false,
    pageDots: false,
    lazyLoad: true
  })

  app.mainSlider.setBGImage = function (event, cellElement) {
    cellElement.style.backgroundImage = 'url(' + event.target.src + ')'

    cellElement.style.opacity = 1
  }

  app.mainSlider.eventListener = function () {
    this.slider.on('lazyLoad', this.setBGImage.bind(this))
  }
})(AFN, Object) // end setUpMainSlider

/**
 * @module AFN
 * @class Tabs
 * @param  {Object} events    Events map
 * @param  {Object} w         window object
 * @return {Object}           Public API
 */
AFN.Tabs = (function (events, w) {
  'use strict'

  var $target,
    $tabsWrapper,
    $tabsContentWrapper,
    $tabs,
    $panels,
    targets,
    activeClass,
    eventSelected,
    tween,
    _setMinSize,
    _setUpTargets,
    _setUpPanels,
    _update,
    _show,
    _broadCastEvent,
    _handleTabClick,
    _evtListener,
    _gatherElements,
    _init

  activeClass = 'is-selected'

  eventSelected = events.tabs.selected

  // a temp value to cache *what* we're about to show
  $target = null

  tween = new TimelineLite()

  _setUpTargets = function () {
    // get an array of the panel ids (from the anchor hash)
    targets = $tabs.map(function () {
      return this.hash
    }).get()
  }

  _setUpPanels = function () {
    // use those ids to get a jQuery collection of panels
    $panels = $(targets.join(',')).each(function () {
      // keep a copy of what the original el.id was
      $(this).data('old-id', this.id)
    })
  }

  _update = function _update () {
    var hash = w.location.hash

    _broadCastEvent($tabsWrapper, hash)

    if ($target) {
      $target.attr('id', $target.data('old-id'))

      $target = null
    }

    if (targets.indexOf(hash) !== -1) {
      _show(hash)
    }
  }

  _show = function _show (id) {
    // if no value was given, let's take the first panel
    if (!id) {
      id = targets[0]
    }

    // remove the selected class from the tabs,
    // and add it back to the one the user selected
    $tabs.removeClass(activeClass).filter(function () {
      return (this.hash === id)
    }).addClass(activeClass)

    // now hide all the panels, then filter to
    // the one we're interested in, and show it
    tween
      .set($panels, {
        autoAlpha: 0,
        display: 'none',
        scale: 1.1
      })
      .to($panels.filter(id), 1, {
        autoAlpha: 1,
        display: 'block',
        scale: 1,
        clearProps: 'scale'
      })
  }

  _broadCastEvent = function (target, hash) {
    $.Topic(eventSelected).publish(target, hash)
  }

  _handleTabClick = function () {
    $tabsWrapper.on('click', $tabs.selector, function () {
      $target = $(this.hash).removeAttr('id')

      // if the URL isn't going to change, then hashchange
      // event doesn't fire, so we trigger the update manually
      if (w.location.hash === this.hash) {
        setTimeout(_update, 0)
      }
    })
  }

  _setMinSize = function () {
    $tabsContentWrapper.addClass('has-size')
  }

  _gatherElements = function () {
    $tabsWrapper = $('.tabs__cmds')

    $tabs = $tabsWrapper.find('.js-tab-cmd')

    $tabsContentWrapper = $('.tabs__content-wrapper')
  }

  _evtListener = function _evtListener () {
    _handleTabClick()

    $(w)
      .one('hashchange', _setMinSize)
      .on('hashchange', _update)
  }

  _init = function _init () {
    _gatherElements()

    _setUpTargets()

    _setUpPanels()

    // initialise
    if (targets.indexOf(w.location.hash) !== -1) {
      _update()
    } else {
      _show()
    }
  }

  return {

    init: function () {
      _init()

      _evtListener()
    }

  }
})(AFN._EVENTS_, window) // end Tabs

/**
 * @module AFN
 * @class ToggleShareLayer
 * @param  {Object} app       App global module
 * @param  {Object} d 		  window.document
 * @return {Object}           Public API
 */
AFN.ToggleShareLayer = (function (app, d) {
  'use strict'

  var $root,
    $elements,
    openBtn,
    closeBtn,
    activeClass,
    tween,
    _openLayer,
    _closeLayer,
    _eventListener,
    _init

  openBtn = '.js-show-share-layer'

  closeBtn = '.js-close-share'

  $elements = $('.share-layer__btn-wrapper')

  $root = $('html')

  activeClass = 'is-share-shown'

  tween = new TimelineLite({
    paused: true,
    onStart: function () {
      $root.addClass(activeClass)
    },
    onReverseComplete: function () {
      $root.removeClass(activeClass)
    }
  })

  tween.staggerFrom($elements, 0.7, {
    force3D: true,
    scale: 0.5,
    opacity: 0,
    delay: 0.5,
    ease: Power4.easeOut
  }, 0.2)

  _closeLayer = function () {
    tween.reverse()
  }

  _openLayer = function () {
    tween.play()
  }

  _eventListener = function () {
    $(d)
      .on('click', openBtn, _openLayer)
      .on('click', closeBtn, _closeLayer)
  }

  _init = function () {
    _eventListener()
  }

  return {

    init: _init

  }
})(AFN, document) // end ToggleShareLayer

/**
 * @module AFN
 * @class  ShowExternalContent
 * @description Inject external content into a layer
 * when user clicks on a specific button
 * @param  {Object} app       App global module
 * @param  {Object} layer     Layer utility
 * @param  {Object} templates emplate engine
 * @param  {Object} d         window.document
 * @param  {Object} o         Native Object
 * @return {Object}           Public API
 */
AFN.ShowExternalContent = (function (app, layer, templates, d, o) {
  'use strict'

  var button,
    overlay,

    _getUrl,
    _buildLayer,
    _onXhrSuccess,
    _onXhrError,
    _showLayer,
    _eventListener,
    _init

  overlay = o.create(layer, {})

  button = '.js-show-ext-layer'

  _getUrl = function (el) {
    return el.href
  }

  _onXhrSuccess = function (data) {
    _buildLayer(data)
  }

  _onXhrError = function () {
    console.log('ShowExternalContent ajax error')
    console.log(arguments)
  }

  _buildLayer = function (data) {
    var tplData = {
      content: data
    }

    overlay.init({
      id: 'layer',
      klass: 'is-textual',
      dynamic: true,
      tplData: tplData.content
    })
  }

  _showLayer = function (evt) {
    evt.preventDefault()

    $.ajax({
      url: _getUrl(evt.currentTarget)
    }).then(_onXhrSuccess, _onXhrError)
  }

  _eventListener = function () {
    $(d).on('click', button, _showLayer)
  }

  _init = function () {
    _eventListener()
  }

  return {

    init: _init

  }
})(AFN, AFN.Layer, AFN.HtmlTemplates, document, Object) // end ShowExternalContent

/**
 * @module AFN
 * @class StartAnimation
 * @description Add some fanciness to selected elements
 */
AFN.StartAnimation = function () {
  'use strict'

  var $elements = $('.slider__head__el'),
    $icons = $('.tabs__icon')

  TweenMax.staggerTo($elements, 1, {
    y: 0,
    scale: 1,
    opacity: 1,
    ease: Power4.easeOut
  }, 0.25)

  $icons.addClass('is-loaded')
} // end StartAnimation

/**
 * @module AFN
 * @class Init
 * @description App's entry point
 * @param {Object} app App global module
 */
AFN.Init = (function (app) {
  'use strict'

  app.StartAnimation()

  app.mainSlider.init().eventListener()

  app.Tabs.init()

  app.ToggleShareLayer.init()

  app.ShowExternalContent.init()

  app.handleGlobalAjax.init()
})(AFN)
