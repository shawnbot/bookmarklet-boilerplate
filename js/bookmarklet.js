(function(window) {
    // path to assets, like style.css
    // FIXME this should be a fully qualified http:// URL!
    var BASE_URL = "",
        SELECTOR = "table",
        UI_ID = "my-bookmarklet",
        ADD_CLASS = UI_ID,
        STYLE_URL = BASE_URL + "style.css",
        STYLE_LINK;

    var UI = addBookmarklet(document.body);

    function addBookmarklet(context) {
        removeBookmarklet();

        var ui = context.appendChild(create("div", {
            "id": UI_ID
        }));

        var title = ui.appendChild(create("h5", {
            "class": "title"
        }, {
            "textContent": "My Bookmarklet"
        }));

        var closeLink = ui.appendChild(create("a", {
            "class": "close",
            "href": "#"
        }, {
            "innerHTML": "&times;",
            "onclick": function(e) {
                removeBookmarklet();
                e.preventDefault();
                return false;
            }
        }));

        if (STYLE_URL) {
            var style = ui.appendChild(create("link", {
                "rel": "stylesheet",
                "type": "text/css",
                "media": "screen",
                "href": STYLE_URL
            }));
        }

        var elements = document.querySelectorAll(SELECTOR);
        forEach(elements, function(element) {
            element.classList.add(ADD_CLASS);
        });

        return ui;
    }

    function removeBookmarklet() {
        // remove existing UI
        if (UI) {
            remove(UI);
            UI = null;
        // and just in case, remove the UI created by another click to the
        // bookmarklet
        } else {
            var ui = document.getElementById(UI_ID);
            if (ui) remove(ui);
        }

        // remove custom class from relevant elements
        var elements = document.querySelectorAll(SELECTOR);
        forEach(elements, function(element) {
            element.classList.remove(ADD_CLASS);
        });
    };

    // create an element with optional attributes and properties as key/value
    // pairs:
    // create("div", {id: "foo"}, {"textContent": "bar"});
    function create(name, attrs, props) {
        var el = document.createElement(name);
        if (attrs) {
            for (var a in attrs) {
                el.setAttribute(a, attrs[a]);
            }
        }
        if (props) {
            for (var p in props) {
                el[p] = props[p];
            }
        }
        return el;
    }

    // remove an element from the DOM
    function remove(element) {
        return element
            && element.parentNode
            && element.parentNode.removeChild(element);
    }

    // Iterate over anything array-like (including DOM element lists)
    function forEach(things, fn, context) {
        var len = things.length;
        for (var i = 0; i < len; i++) {
            var result = fn.call(context, things[i], i);
            if (result === false) break;
        }
    }

})(window);
