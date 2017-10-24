var val = require('./validations');
module.exports = {
    clickelement: function (element, label) {
        elempresent(element, label);
        element.click().then(function () {
            console.log(label + " is clicked")
        });
    },
    sendkeys: function (element, label, text) {
        elempresent(element, label);
        element.sendKeys(text);
    },
    verifyRowText: function (element, label, text) {
        var wordlist = text.toLowerCase().split(" ");
        var passed = true;
        var logtext = "All keywords contain text: " + text;
        element.each(function (el) {
            el.getText().then(function (text) {
                wordlist.forEach(function (item) {
                    text = text.toLowerCase();
                    if (!text.includes(item)) {
                        passed = false;
                        logtext = "No such keyword: " + item + " in the row: " + text
                    }
                })
            });
        }).then(function () {
            console.log(logtext);
            if (!passed) {
                val.assertTrue(passed);
            }
        });
    },
    verifyRowsCount: function (element, label, count) {
        element.count().then(function (cnt) {
            if (cnt !== count) {
                console.log("Elements count aren't equal " + count);
                val.assertEqual("Elements count", count, cnt)
            }
            else {
                console.log("Elements count are equal " + count);
            }
        })
    },
    verifySorting: function (element, label, sorting, order) {
        var passed = true;
        element.map(function (eachName) {
            return eachName.getText().then(function (unSorted) {
                return unSorted;
            });
        }).then(function (unSorted) {
            var sorted = unSorted.slice();
            function isNumeric(num) {
                return !isNaN(num)
            }
            if (sorted.every(isNumeric)){
                sorted = sorted.sort(function (a, b) {
                    return a-b;
                });
            }
            else{
                sorted = sorted.sort();
            }
            if (order === 'desc') {
                sorted.reverse();
            }
            var i = sorted.length;
            while (i--) {
                if (sorted[i] !== unSorted[i]) {
                    passed = false;
                    break;
                }
            }
        }).then(function () {
            if (!passed) {
                console.log("Results are not sorted by " + sorting);
                val.assertTrue(passed)
            }
            else {
                console.log("Results are sorted by " + sorting);
            }
        });
    },
    verifyValue: function (element, label, text) {
        val.assertEqual(label, element.getAttribute('value'), text);
    },
    visible: function (element, label) {
        elempresent(element, label)
    },
    pagedisplayed: function (element, label, pagename) {
        element.isPresent().then(function (present) {
            if (!present) {
                console.log(label + " not present");
                console.log(pagename + " is displayed");
                val.assertTrue(present)
            }
        });
        element.isDisplayed().then(function (display) {
            console.log(label + " is displayed");
            console.log(pagename + " is displayed");
            if (!display) {
                console.log(label + " not display");
                val.assertTrue(display)
            }
        })
    },
    clear: function (element, label) {
        element.clear();
    },
    veifyMessage:function (element, label, text) {
        element.getText().then(function (txt) {
            val.assertEqual(label, txt, text);
        });

    },
    getelement: function (type, id) {

        switch (type) {
            case "css":
                return element(by.css(id));
            case "id":
                return element(by.id(id));
            case "xpath":
                return element(by.xpath(id));
            case "linktext":
                return element(by.linkText(id));
            case "repeater":
                return element(by.repeater(id));
            case "buttonText":
                return element(by.buttonText(id));
            case "binding":
                return element(by.binding(id));
            case "exactBinding":
                return element(by.exactBinding(id));
            case "partialButtonText":
                return element(by.partialButtonText(id));
            case "cssContainingText":
                return element(by.cssContainingText(id));
            case "options":
                return element(by.options(id));
            case "model":
                return element(by.model(id));
            case "tagName":
                return element(by.tagName(id));
            default:
                return element(by.model(id))
        }

    },
    getallelements: function (type, id) {

        switch (type) {
            case "css":
                return element.all(by.css(id));
            case "xpath":
                return element.all(by.xpath(id));
            case "linktext":
                return element.all(by.linkText(id));
            case "repeater":
                return element.all(by.repeater(id));
            case "buttonText":
                return element.all(by.buttonText(id));
            case "binding":
                return element.all(by.binding(id));
            case "exactBinding":
                return element.all(by.exactBinding(id));
            case "partialButtonText":
                return element.all(by.partialButtonText(id));
            case "cssContainingText":
                return element.all(by.cssContainingText(id));
            case "options":
                return element.all(by.options(id));
            case "model":
                return element.all(by.model(id));
            case "tagName":
                return element.all(by.tagName(id));
            default:
                return element.all(by.model(id))
        }

    }
};
var elempresent = function (element, label) {
    element.isPresent().then(function (present) {
        if (!present) {
            console.log(label + " not present");
            val.assertTrue(present)
        }
        element.isDisplayed().then(function (display) {
            console.log(label + " is displayed");
            if (!display) {
                console.log(label + " not display");
                val.assertTrue(display)
            }
        })
    })
};
