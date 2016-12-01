function right(state) {
    state.right = true;
    state.left = false;
}

function left(state) {
    state.left = true;
    state.right = false;
}

function up(state) {
    state.up = true;
    state.down = false;
}

function down(state) {
    state.down = true;
    state.up = false;
}

module.exports = {
    right: right,
    left: left,
    up: up,
    down: down
};