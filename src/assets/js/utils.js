/**
* Manages communications between modules.
* @class Topic
* @namespace $
* @static
* @public
* @param {String} id name of custom event
* @required
* @return {Object} topic an object holding all the methods that manage callbacks
* @example:
*   $.Topic("custom:event:name").publish([args]);
*   $.Topic("custom:event:name").subscribe([callback]);
*/
$.Topic = function (id) {
  'use strict'

  var callbacks,
    topic = id && AFN.topics[id]

  if (!topic) {
    callbacks = $.Callbacks()

    topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove,
      one: function (fn) {
        var once = function () {
          fn.apply(null, $.makeArray(arguments))

          topic.unsubscribe(once)
        }

        callbacks.add(once)
      }
    }

    if (id) {
      AFN.topics[id] = topic
    }
  }

  return topic
} // end $.Topic

/**
* App's main namespace
* @module AFN
* @type {Object}
*/
if (typeof AFN === 'undefined') {
  var AFN = {}
}

/**
* Utility to create namespace and extend modules
* @namespace AFN
* @class namespace
* @return {Object} module
*/
AFN.namespace = function (ns_string) {
  'use strict'

  var parts = ns_string.split('.'),
    parent = AFN,
    len = parts.length,
    i = 0

  // strip redundant leading global
  if (parts[0] === 'AFN') {
    parts = parts.slice(1)
  }

  for (; i < len; i += 1) {
    // create a property if it doesn't exist
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {}
    }

    parent = parent[parts[i]]
  }

  return parent
}

AFN.namespace('topics')
AFN.namespace('globals')
AFN.namespace('_UTILS_')
AFN.namespace('_EVENTS_')
AFN.namespace('MSGS')

AFN.MSGS = {
  'twitter': {
    'hashtags': 'primio,secondo',
    'text': 'Here I am'
  },
  'form': {
    'success': 'YES!'
  }
}

/**
* @module AFN
* @submodule globals
* @description List of useful global vars
* @type {Object}
*/
AFN.globals = {

  /**
	 * @property {String} forceEnvironment
	 * Forces webservices' URI that are environment-based
	 */
  forceEnvironment: '',

  /**
	* @property scrollTimeout global for any pending scrollTimeout.
	* Used in window onscroll event handler.
	* @type {Function}
	*/
  scrollTimeout: null,

  /**
	 * @property mapCSSMediaQueries Map Inuit's mq as defined in _settings.responsive.scss
	 * @type {Object}
	 */
  mapCSSMediaQueries: {
    palm: 'screen and (max-width: 44.9375em)',
    lap: 'screen and (min-width: 45em) and (max-width: 63.9375em)',
    lapUp: 'screen and (min-width: 45em)',
    portable: 'screen and (max-width: 63.9375em)',
    desk: 'screen and (min-width: 64em)',
    deskWide: 'screen and (min-width: 74em)',
    retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
  }
};

/**
* @module AFN
* @submodule _UTILS_
* @description List of general purpose utilities
* used throughout the application
* @type {Object}
* @param {Object} app App global object
* @param {Object} w Window
* @param {Object} d Document
*/
(function (app, w, d) {
  'use strict'

  app._UTILS_ = {

    /**
		* Prints the desired message taken from a JSON file
		* @method printMsgs
		* @param {String} obj JSON key of the desired message
		* @param {String} status JSON value value of the desired message
		* @param {Object} data Object holding data for replacement
		* @return {String} app.msgs[obj][status] The desired message
		*/
    printMsgs: function (obj, status, data) {
      var str, k

      data = data || {}

      if (typeof app.msgs === 'undefined') {
        return
      }

      if (typeof app.msgs[obj] === 'undefined' || typeof app.msgs[obj][status] === 'undefined') {
        return '[undefined msg for ' + obj + ' ' + status + ']'
      } else {
        str = app.msgs[obj][status]

        for (k in data) {
          if (data.hasOwnProperty(k)) {
            str = str.replace('{' + k + '}', data[k], 'gi')
          }
        }

        return str
      }
    },

    /**
		 * @method  getUrlParam Get a parameter's name from a query string
		 * @param  {String} paramName Parameter's name to look for in query string
		 * @return {Boolean}
		 */
    getUrlParam: function (paramName) {
      var oRegex = new RegExp('[\?&]' + paramName + '=([^&]+)', 'i'),

        oMatch = oRegex.exec(d.location.search)

      if (oMatch && oMatch.length > 1) {
        return decodeURIComponent(oMatch[1])
      } else {
        return false
      }
    },

    updateQueryStringParameter: function (uri, key, value) {
      var re,
        separator

      re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
      separator = uri.indexOf('?') !== -1 ? '&' : '?'

      if (uri.match(re)) {
        return uri.replace(re, '$1' + key + '=' + value + '$2')
      } else {
        return uri + separator + key + '=' + value
      }
    },

    /**
		 * @method debounce
		 * Utility to execute a given function every set interval.
		 * Boost performance when used in CPU intensive event
		 * like resize, scroll, keyp, etc.
		 * @see  http://davidwalsh.name/javascript-debounce-function
		 * @param  {Function} func Function to be debounced
		 * @param  {Number} wait Debounce rate
		 * @param  {Boolean} immediate Whether it should be executed immediately or not
		 * @return {Function}
		 * @example
		 * 	AFN._UTILS_.debounce(function, rate)();
		 */
    debounce: function (func, wait, immediate) {
      var timeout

      return function debounced () {
        var context = this,
          args = arguments

        clearTimeout(timeout)

        timeout = setTimeout(function () {
          timeout = null

          if (!immediate) {
            func.apply(context, args)
          }
        }, wait)

        if (immediate && !timeout) {
          func.apply(context, args)
        }
      }
    },

    once: function (fn, context) {
      var result

      return function () {
        if (fn) {
          result = fn.apply(context || this, arguments)

          fn = null
        }

        return result
      }
    },

    /**
		 * @method isVisible Check if an element is in viewport (on Y axis)
		 * @param  {Object | String}  box    Node element to be checked
		 * @param  {Number}  offset
		 * @return {Boolean}
		 * @example:
		 * AFN._UTILS_.isVisible($("#main-header"));
		 */
    isVisible: function (box, offset) {
      var bottom, offset, top, viewBottom, viewTop, innerHeight, offsetTop

      if (box instanceof jQuery) {
        box = box[0]
      } else {
        box = d.querySelector(box)
      }

      if (!box) {
        return false
      }

      innerHeight = function innerHeight () {
        if ('innerHeight' in w) {
          return w.innerHeight
        } else {
          return d.documentElement.clientHeight
        }
      }

      offsetTop = function offsetTop (element) {
        var top
        while (element.offsetTop === void 0) {
          element = element.parentNode
        }
        top = element.offsetTop
        while (element = element.offsetParent) {
          top += element.offsetTop
        }
        return top
      }

      offset = offset || 0

      viewTop = w.pageYOffset

      viewBottom = viewTop + Math.min(box.clientHeight, innerHeight()) - offset

      top = offsetTop(box)

      bottom = top + box.clientHeight

      return top <= viewBottom && bottom >= viewTop
    }

  }
})(AFN, window, document)

AFN.AreaIdentifier = (function (w) {
  'use strict'

  var areas,
    area,
    loc

  areas = {
    home: '',
    guest: '',
    dev: '',
    prod: ''
  }

  loc = w.location.href

  area = (function () {
    var k, val

    val = ''

    for (k in areas) {
      if (loc.indexOf(areas[k]) !== -1) {
        val = k

        return val
      }
    }

    return val
  })()

  return {

    /**
		 * @method getArea
		 * @param  {String} force Pass in a custom string
		 * overriding area's value
		 * @return {String}
		 */
    getArea: function (force) {
      return force || area
    },

    getAreas: function () {
      return areas
    }

  }
})(window)

/**
 * @module AFN
 * @class QueryData Manages all ajax calls
 * @param {Object} app 			  Global app object
 * @param {Object} areaIdentifier AreaIdentifier utility class
 * @return {Object} Public API
 */
AFN.QueryData = (function (app, areaIdentifier) {
  'use strict'

  var queryModels,
    queryParams,
    wsURI,
    area,
    wsFolder,

    _query,
    _queryChain,
    _getWsURI,
    _getQueryParams

  area = areaIdentifier.getArea(app.globals.forceEnvironment)

  wsFolder = '/ws'

  /**
	 * @var wsURI Web service url
	 * @type {Object}
	 */
  wsURI = $.extend({}, app.AreaIdentifier.getAreas())

  /**
	 * @property queryModels Ajax opt
	 * @type {Object}
	 */
  queryModels = {
    method: 'POST',
    dataType: 'json'
  }

  /**
	 * @property queryParams Params to be passed to WS along with queryModels.data Object
	 * @type {Object}
	 */
  queryParams = {

    'SAVE_PROJECT': '/save',

    'GALLERY': '/gallery'
  }

  /**
	 * @function _getQueryParams Get query params
	 * @param  {String} type Query model name
	 * @return {String}      Params to be passed to WS along with queryModels.data Object
	 */
  _getQueryParams = function (type) {
    return queryParams[type]
  }

  /**
	 * @function _getWsURI Get WS Uri to build WS queries.
	 * @return {String} WS url
	 */
  _getWsURI = function () {
    return wsURI[area] + wsFolder
  }

  /**
	 * @function _query Performs ajax calls
	 * @param  {Object} settings Ajax call additional options
	 * @optional
	 * @return {Object}          jQuery XHR object
	 * @example
	 * AFN.QueryData.query("GET_BRAND", {data: data});
	 */
  _query = function (settings) {
    var options,
      promise

    options = $.extend(true, {}, queryModels, settings)

    promise = $.ajax(options)

    return promise
  }

  /**
	 * @function _queryChain Resolve any number of $.ajax calls
	 * by exploiting $.when utility method.
	 * @param {Array} Pass in an array of $.ajax calls
	 * @return {Object} jQuery Promise object
	 * @example
	 * AFN.QueryData.queryChain([
	 *		AFN.QueryData.query({
	 *			url: "/path"
	 *		}),
	 *		AFN.QueryData.query({
	 *			url: "/path"
	 *		}),
	 *		AFN.QueryData.query({
	 *			url: "/path"
	 *		})
	 *	]);
	 */
  _queryChain = function (deferreds) {
    return $.when.apply($, deferreds)
  }

  return {

    getQueryParams: _getQueryParams,

    getWsURI: _getWsURI,

    query: _query,

    queryChain: _queryChain

  }
})(AFN, AFN.AreaIdentifier) // end QueryData()

/**
 * @module AFN
 * @method createShareURL Method to create URLs ready to be shared via social networks.
 * @return {Object}       Public API
 */
AFN.createShareURL = (function (w, msgs) {
  'use strict'

  var	appUrl = w.location.origin + w.location.pathname,
    queryParam = '?box_id=',
    baseUrl = encodeURIComponent(appUrl + queryParam),
    fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + baseUrl,
    twUrl = 'https://twitter.com/intent/tweet/?url=',
    gPlusUrl = 'https://plus.google.com/share?url=' + baseUrl,
    pinterestUrl = 'https://pinterest.com/pin/create/button/?url=' + baseUrl,
    hashtags = msgs.twitter.hashtags,
    text = encodeURIComponent(msgs.twitter.text)

  return {

    fb: function (boxId) {
      return fbUrl + boxId
    },

    tw: function (boxId) {
      return twUrl + baseUrl + boxId + '&text=' + text + '&hashtags=' + hashtags + '&via=TWITTER-HANDLE'
    },

    gp: function (boxId) {
      return gPlusUrl + boxId
    },

    pin: function (desc, imgSrc) {
      return pinterestUrl + '&description=' + desc + '&media=' + imgSrc
    }

  }
})(window, AFN.MSGS)

AFN.sanitizeString = function (str) {
  'use strict'

  var HTML_TAGS,
    CHARS

  /**
	 * HTML_TAGS Strip html tags
	 * @type {RegExp}
	 * @final
	 */
  HTML_TAGS = /(<([^>]+)>)/ig

  /**
	 * CHARS Special characters (line feed, tab, etc.)
	 * @type {RegExp}
	 * @final
	 */
  CHARS = /[\f\t\n\r]/ig

  return str.replace(HTML_TAGS, '').replace(CHARS, '')
}

/**
 * @module AFN
 * @class HtmlTemplates Template engine
 * @param  {Object} app App global namespace
 * @return {Object}             Public API
 */
AFN.HtmlTemplates = (function (app) {
  'use strict'

  var HTML_TEMPLATE = {},
    joinStr = '',
    _printMsgs,
    _get,
    _set

  _printMsgs = app._UTILS_.printMsgs

  // Loading
  HTML_TEMPLATE.loading = []
  HTML_TEMPLATE.loading.push('<div class="loading"></div>')

  // UI blocker
  HTML_TEMPLATE.blocker = []
  HTML_TEMPLATE.blocker.push('<div id="ui-blocker" class="layer layer--blocker">')
  HTML_TEMPLATE.blocker.push('<div class="layer__inner layer__inner--blocker">')
  HTML_TEMPLATE.blocker.push('<div class="loading"></div>')
  HTML_TEMPLATE.blocker.push('</div>')
  HTML_TEMPLATE.blocker.push('</div>')

  // Layer
  HTML_TEMPLATE.layer = []
  HTML_TEMPLATE.layer.push("<div id='layer' class='layer'>")
  HTML_TEMPLATE.layer.push("<div class='layer__inner'>")
  HTML_TEMPLATE.layer.push("<button class='layer__close js-close-layer'>X</button>")
  HTML_TEMPLATE.layer.push("<div class='layer__content'><% this.content %></div>")
  HTML_TEMPLATE.layer.push('</div>')
  HTML_TEMPLATE.layer.push('</div>')

  // Form response
  HTML_TEMPLATE.formResponse = []
  HTML_TEMPLATE.formResponse.push("<p class='form__reponse'>")
  HTML_TEMPLATE.formResponse.push('<% this.msg %>')
  HTML_TEMPLATE.formResponse.push('</p>')

  // Paging commands
  HTML_TEMPLATE.pagingCommands = []
  HTML_TEMPLATE.pagingCommands.push('<% var currentPage = this.currentPage * 1; %>')
  HTML_TEMPLATE.pagingCommands.push('<% var prev = this.prev; %>')
  HTML_TEMPLATE.pagingCommands.push('<% var next = this.next; %>')

  // start goToFirst
  HTML_TEMPLATE.pagingCommands.push('<% if ( prev.length ) { %>')
  HTML_TEMPLATE.pagingCommands.push("<button class='js-paging js-paging--first gallery__paging__cmd gallery__paging__cmd--symbol' data-page='1'>&laquo;</button>")
  HTML_TEMPLATE.pagingCommands.push('<% } %>') // end goToFirst

  // start goToPrev
  HTML_TEMPLATE.pagingCommands.push('<% if ( prev.length ) { %>')
  HTML_TEMPLATE.pagingCommands.push("<button class='js-paging js-paging--prev gallery__paging__cmd gallery__paging__cmd--symbol' data-page='<% currentPage -1 %>'>&lsaquo;</button>")
  HTML_TEMPLATE.pagingCommands.push('<% } %>') // end goToPrev

  // start prevPages
  HTML_TEMPLATE.pagingCommands.push('<% if ( prev.length ) { %>')
  HTML_TEMPLATE.pagingCommands.push('<% for ( var i = 0, len = prev.length; i < len; i+=1 ) { %>')
  HTML_TEMPLATE.pagingCommands.push("<button class='js-paging gallery__paging__cmd' data-page='<% prev[i] %>'><% prev[i] %></button>")
  HTML_TEMPLATE.pagingCommands.push('<% } %>') // end for
  HTML_TEMPLATE.pagingCommands.push('<% } %>') // end prevPages

  // start currentPage
  HTML_TEMPLATE.pagingCommands.push('<% if ( currentPage ) { %>')
  HTML_TEMPLATE.pagingCommands.push("<span class='gallery__paging__cmd is-active'> <%currentPage%> </span>")
  HTML_TEMPLATE.pagingCommands.push('<% } %>') // end currentPage

  // start nextPages
  HTML_TEMPLATE.pagingCommands.push('<% if ( next.length ) { %>')
  HTML_TEMPLATE.pagingCommands.push('<% for ( var j = 0, nlen = next.length; j < nlen; j+=1 ) { %>')
  HTML_TEMPLATE.pagingCommands.push("<button class='js-paging gallery__paging__cmd' data-page='<% next[j] %>'><% next[j] %></button>")
  HTML_TEMPLATE.pagingCommands.push('<% } %>') // end for
  HTML_TEMPLATE.pagingCommands.push('<% } %>') // end nextPages

  // start goToNext
  HTML_TEMPLATE.pagingCommands.push('<% if ( next.length ) { %>')
  HTML_TEMPLATE.pagingCommands.push("<button class='js-paging js-paging--next gallery__paging__cmd gallery__paging__cmd--symbol' data-page='<% currentPage +1 %>'> &rsaquo; </button>")
  HTML_TEMPLATE.pagingCommands.push('<% } %>') // end goToNext

  // start goToLast
  HTML_TEMPLATE.pagingCommands.push('<% if ( next.length ) { %>')
  HTML_TEMPLATE.pagingCommands.push("<button class='js-paging js-paging--next gallery__paging__cmd gallery__paging__cmd--symbol' data-page='<% this.last %>'> &raquo; </button>")
  HTML_TEMPLATE.pagingCommands.push('<% } %>') // end goToLast

  // showcase gallery on layer
  HTML_TEMPLATE.showCase = []
  HTML_TEMPLATE.showCase.push("<div class='showcase-gallery'>")
  HTML_TEMPLATE.showCase.push('<% for ( var i = 0, len = this.length; i < len; i++ ) { %>')
  HTML_TEMPLATE.showCase.push("<div class='showcase-gallery__el'>")
  HTML_TEMPLATE.showCase.push("<img src='<% this[i].src %>' alt=''>")
  HTML_TEMPLATE.showCase.push('</div>')
  HTML_TEMPLATE.showCase.push('<% } %>')
  HTML_TEMPLATE.showCase.push('</div>')

  /**
	 * _get Generate flat template string
	 * @param  {String} templateName Name of the template to be rendered
	 * @required
	 * @return {String}
	 */
  _get = function (templateName) {
    if (HTML_TEMPLATE.hasOwnProperty(templateName)) {
      return HTML_TEMPLATE[templateName].join(joinStr)
    }
  }

  /**
	 * @function _set Generate template strings with data
	 * @param {String} templateName    Template string
	 * @param {Object} templateData Data to fill the template with
	 * @return {Function}
	 * @see https://github.com/krasimir/absurd/blob/master/lib/processors/html/helpers/TemplateEngine.js
	 */
  _set = function (templateName, templateData) {
    var html = _get(templateName) || templateName,
      re = /<%(.+?)%>/g,
      reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
      code = 'with(obj) { var r=[];\n',
      cursor = 0,
      match,
      result

    var add = function (line, js) {
      js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n')
        : (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '')

      return add
    }

    while (match = re.exec(html)) {
      add(html.slice(cursor, match.index))(match[1], true)

      cursor = match.index + match[0].length
    }

    add(html.substr(cursor, html.length - cursor))

    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, '')

    try {
      result = new Function('obj', code).apply(templateData, [templateData])
    } catch (err) {
      console.error("'" + err.message + "'", ' in \n\nCode:\n', code, '\n')
    }

    return result
  }

  return {

    set: _set,

    get: _get

  }
})(AFN) // end HtmlTemplates()

/**
 * @namespace AFN
 * @method loading
 * Helper method to show a loading spinner.
 */
AFN.loading = function () {
  'use strict'

  $('html').addClass('is-loading')
}

/**
 * @namespace AFN
 * @method loaded
 * Helper method to hide the loading spinner
 * previously shown with AFN.loading().
 */
AFN.loaded = function () {
  'use strict'

  $('html').removeClass('is-loading')
}

/**
  * @namespace AFN
  * @return void
  * @param {Object} opt Configuration options
  * @param {Function} additional argument holding a callback function to be executed on animation end
  * @desc Smooth scroll utility
  *
*/
AFN.scrollToPos = function scrollToPos (opt) {
  'use strict'

  /**
	 * target DOM node to scroll to.
	 * You can pass in either a jQuery wrapped set or an unwrapped element:
	 * it'll be converted to a jQuery wrapped set, if necessary.
	 * @type {Object}
	 */
  var target = opt.target instanceof jQuery ? opt.target : $(opt.target)

  if (!target.length) {
    console.warn('$(target) not in DOM')

    return
  }

  var
    /**
		 * position Element top position
		 * Bitshift is used to boost conversion time
		 * @type {Number}
		 */
    position = target.offset().top >> 0,

    /**
		 * SPEED Animation speed
		 * @type {Number}
		 */
    SPEED = opt.speed || 1000,

    /**
		 * OFFSET Optional offset to be subtracted from element's position
		 * @type {Number}
		 */
    OFFSET = opt.offset || 0,

    /**
		 * _arguments Original arguments of the function
		 * @type {Object}
		 */
    _arguments = arguments,

    /**
		 * args Real array function arguments
		 * @type {Array}
		 */
    args = Array.prototype.slice.call(_arguments),

    /**
		 * i Index to filter off the first argument
		 * @type {Number}
		 */
    i = 1,

    /**
		 * len Arguments length
		 * @type {Numer}
		 */
    len = _arguments.length,

    /**
		 * callback Fn to be executed on animation end.
		 * If there are enough arguments, loop through them
		 * and, if they are functions, execute them.
		 * If there aren't enough arguments, pass in an empty function
		 * and save a loop.
		 * @return {Function}
		 */
    callback = ~len ? function () {
      for (; i < len; i += 1) {
        if (typeof _arguments[i] === 'function') {
          _arguments[i].apply(null, args)
        }
      }
    } : $.noop

  $('html, body').stop().animate({

    scrollTop: position - OFFSET

  }, SPEED, callback)
} // end scrollToPos()

/**
 * @namespace AFN
 * @property _EVENTS_ Hashmap of all available custom events
 * @type {Object}
 */
AFN._EVENTS_ = {

  form: {
    valid: 'form:valid',
    invalid: 'form:invalid'
  },
  cookiesettings: {
    load: 'cookiesettings:load',
    save: 'cookiesettings:save'
  },
  accordion: {
    open: 'accordion:open'
  },
  tabs: {
    selected: 'TABS:SELECTED'
  },
  scroll: {
    scrolled: 'scroll:complete'
  }

}

/**
* Utility to manage cookies
* @namespace AFN
* @class docCookies
* @see https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
*/
AFN.docCookies = {

  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
  },

  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }

    var sExpires = ''

    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
          break
        case String:
          sExpires = '; expires=' + vEnd
          break
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString()
          break
      }
    }

    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')

    return true
  },

  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false
    }

    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')

    return true
  },

  hasItem: function (sKey) {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
  }

}
