
class Dialog {

    constructor() {
        this.dialog = document.body.appendChild(document.createElement("DIV"));
        this.dialog.style.display = "none";
        this.dialog.innerHTML = ' <div data-domdialog="overlay" style="opacity: 0.75;background-color: black;position: fixed;top:0;left: 0;width: 100%;height: 100%">' +
                '<div data-domdialog="frame" style="min-width: 20%;resize: both;overflow: auto;left: 50%;top: 50%;transform: translate(-50%, -50%);border-color: rgb(197, 197, 197);max-width: 100%;max-height: 99%;position: absolute;background-color: rgb(255, 255, 255);border-style: solid;">' +
                '<div style="display: flex;flex-direction: column;width: 100%;height: 100%;">' +
                '<div style="font-weight: bold; background-color: rgb(233, 233, 233); width: 100%;">' +
                '<span data-domdialog="title">Dialog</span>' +
                '<span data-domdialog="bnclose" style="float: right; cursor: pointer;">X</span>' +
                '</div>' +
                '<div data-domdialog="content" style="height: 100%; overflow-y: auto;"></div>' +
                '<div data-domdialog="button" style="text-align: right;"></div>' +
                '</div> ' +
                '</div>' +
                '</div> ';
    }

    BeforeClose(args) {
        if (arguments.length === 0) {
            return     this.BeforeCloseEvent;
        } else if (arguments.length === 1 && typeof arguments[0] === "function") {
            this.BeforeCloseEvent = arguments[0];
        }
    }

    Button(args) {
        var button = this.dialog.querySelector('[data-domdialog="button"]');
        if (arguments.length === 0) {
            return   button.getElementsByTagName("button");
        } else if (arguments.length === 1 && (typeof arguments[0] === 'string' || arguments[0]  instanceof String)) {
            var bn = button.appendChild(document.createElement("button"));
            bn.innerHTML = arguments[0];
            return bn;
        }
    }

    Close() {
        if (this.BeforeCloseEvent === undefined || this.BeforeCloseEvent === null) {
            this.dialog.style.display = "none";
        } else if (this.BeforeCloseEvent()) {
            this.dialog.style.display = "none";
        }
    }

    Content(args) {
        var content = this.dialog.querySelector('[data-domdialog="content"]');
        if (arguments.length === 0) {
            return content.childNodes;
        } else if (arguments.length === 1) {
            var data = arguments[0];
            if (typeof data === 'string' || data instanceof String) {
                content.innerHTML = data;
            } else if (data instanceof HTMLElement) {
                content.appendChild(data);
            } else if (data instanceof NodeList || data instanceof HTMLCollection) {
                [].forEach.call(data, function (d) {
                    content.appendChild(d);
                });
            }
        }
    }

    Show() {
        this.dialog.style.display = "block";
        var selector = this.dialog.querySelector('[data-domdialog="bnclose"]');
        selector.addEventListener("click", function () {
            this.ref.Close();
        });
        selector.ref = this;
    }
    Title(args) {
        var selector = this.dialog.querySelector('[data-domdialog="title"]');
        if (arguments.length === 0) {
            return selector.innerHTML;
        } else if (arguments.length === 1) {
            selector.innerHTML = "";
            selector.appendChild(document.createTextNode(arguments[0]));
        }
    }
    ZIndex(args) {
        if (arguments.length === 0) {
            return this.dialog.style.zIndex;
        } else if (arguments.length === 1) {
            this.dialog.style.zIndex = arguments[0];
            this.dialog.querySelector('[data-domdialog="overlay"]').style.zIndex = arguments[0];
            this.dialog.querySelector('[data-domdialog="frame"]').style.zIndex = arguments[0] + 1;
        }
    }
}
