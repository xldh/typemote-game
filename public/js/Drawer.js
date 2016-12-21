function Drawer(context2D) {
    this.ctx = context2D;
}


Drawer.prototype.drawRect = function (params) {
    params = params || {};
    var color = params.color || '#000000';
    var width = params.width;
    var height = params.height;
    var x = params.x;
    var y = params.y;
    var canvasScreenCoordinates = this.toPixels(x, y);

    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
        canvasScreenCoordinates.x,
        canvasScreenCoordinates.y,
        width * this.ctx.canvas.width,
        height * this.ctx.canvas.height
    );
    this.ctx.restore();
};

Drawer.prototype.drawText = function (params) {
    params = params || {};

    if (!params.text) {
        return;
    }

    var color = params.color || '#000000';
    var text = params.text;
    var x = params.x * this.ctx.canvas.width || 0;
    var y = params.y * this.ctx.canvas.height || 0;

    // @TODO allow a fontSize param that would be computed into font
    var font = params.font;

    this.ctx.save();

    if (font !== undefined) {
        this.ctx.font = font;
    }

    this.ctx.fillStyle = color;
    this.ctx.textAlign = 'center';

    this.ctx.fillText(text, x, y);
    this.ctx.restore();
};


Drawer.prototype.clear = function () {
    var width = this.ctx.canvas.width;
    var height = this.ctx.canvas.height;
    var x = 0;
    var y = 0;
    var canvasScreenCoordinates = this.toPixels(x, y);

    this.ctx.clearRect(
        canvasScreenCoordinates.x,
        canvasScreenCoordinates.y,
        width * this.ctx.canvas.width,
        height * this.ctx.canvas.height
    );
};

Drawer.prototype.toPixels = function (x, y) {
    var width = this.ctx.canvas.width;
    var height = this.ctx.canvas.height;

    return {
        x: width * x,
        y: height * y
    };
};


module.exports = Drawer;
