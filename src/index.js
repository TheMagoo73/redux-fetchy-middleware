'use strict';

import fetch from 'isomorphic-fetch';

const defaults = {
    pendingSuffix: 'PENDING',
    resolvedSuffix: 'RESOLVED',
    rejectedSuffix: 'REJECTED',
    fetcher: fetch
}

function reduxFetchy(config){

    const baseConfig = Object.assign(defaults, config);

    return ({ dispatch }) => next => (action) => {
        if(!action || !action.payload) {
            return next(action);
        }

        const { type, payload, meta} = action;

        if(!meta || !meta.fetch) {
            return next(action);
        }

        const {url, fetchOptions} = payload;

        const {pendingSuffix, resolvedSuffix, rejectedSuffix, fetcher} = baseConfig;

        dispatch({type: `${type}_${pendingSuffix}`});

        return fetcher(url).then(
            ()=>{dispatch({type: `${type}_${resolvedSuffix}`})},
            ()=>{dispatch({type: `${type}_${rejectedSuffix}`})}
        );
    }
}

export default reduxFetchy;