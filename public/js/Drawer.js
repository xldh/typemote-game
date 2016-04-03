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
}


Drawer.prototype.clear = function () {
    this.drawRect({
        x: 0,
        y: 0,
        width: this.ctx.canvas.width,
        height: this.ctx.canvas.height,
        color: '#FFFFFF'
    })
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