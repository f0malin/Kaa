function FakedNav(win) {
    this.window = win;
}

FakedNav.prototype.open = function() {
    this.window.open();
};

FakedNav.prototype.openWindow = function(win) {
    win.open();
};

FakedNav.prototype.closeWindow = function(win) {
    win.close();
};

module.exports = FakedNav;