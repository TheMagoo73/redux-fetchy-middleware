module.exports = exports = function reduxFetchy(config){

    return ({ dispatch }) => next => (action) => {
        if(!action || !action.payload) {
            return next(action);
        }
    }
}