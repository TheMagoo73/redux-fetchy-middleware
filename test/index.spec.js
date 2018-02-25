'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);


import reduxFetchy from '../src/index';

describe('redux-fetchy-middleware', ()=>{

    describe('creation and configuration', ()=>{


        it('should return middleware from creator', ()=>{
            const middleware = reduxFetchy();
            middleware.should.be.a('function');
        })

    })

    describe('functions as a Redux middleware', ()=>{

        it('must call next() when not given an action', ()=>{
            let nextSpy = sinon.spy((action)=>{});

            const middleware = reduxFetchy();
            middleware({})(nextSpy)();

            nextSpy.should.have.been.calledOnce;
        })

        it('must call next() when no payload is provided', ()=>{
            let nextSpy = sinon.spy((action)=>{});

            const middleware = reduxFetchy();
            middleware({})(nextSpy)({type: 'AN_ACTION'});

            nextSpy.should.have.been.calledOnce;            
        })

    })
})