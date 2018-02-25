'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);
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

        it('must call next() when the fetch type is not in the meta', ()=>{
            let nextSpy = sinon.spy((action)=>{});
            let dispatchSpy = sinon.spy((action)=>{});
      
            const middleware = reduxFetchy();
            middleware({})(nextSpy)({type: 'GET_DATA', meta: {}, payload: {}});

            nextSpy.should.have.been.calledOnce;            
            dispatchSpy.should.not.have.been.called;                        
        })
    })

    describe('handles meta information', ()=>{

        it('fetches when the action has meta.fetch', ()=>{
            let nextSpy = sinon.spy((action)=>{});
            let dispatchSpy = sinon.spy((action)=>{});
            let fetchStub = sinon.spy((url)=>{return new Promise(resolve=>resolve())});

            const middleware = reduxFetchy({fetcher: fetchStub});
            middleware({ dispatch: dispatchSpy })(nextSpy)({type: 'GET_DATA', meta: {fetch: true}, payload: {url: 'www.foo.bar'}});

            nextSpy.should.not.have.been.called;
            dispatchSpy.should.have.been.called;                        
            fetchStub.should.have.been.called;
            fetchStub.should.have.been.calledWith('www.foo.bar');
        })

        it('dispatches pending', ()=>{
            let nextSpy = sinon.spy((action)=>{});
            let dispatchSpy = sinon.spy((action)=>{});
            let fetchStub = sinon.spy((url)=>{return new Promise(resolve=>resolve())});

            const middleware = reduxFetchy({fetcher: fetchStub});
            middleware({ dispatch: dispatchSpy })(nextSpy)({type: 'GET_DATA', meta: {fetch: true}, payload: {url: 'www.foo.bar'}});

            nextSpy.should.not.have.been.called;
            dispatchSpy.should.have.been.called;
            dispatchSpy.firstCall.should.have.been.calledWith({type: 'GET_DATA_PENDING'});                                                
        })

        it('dispatches resolved', ()=>{
            let nextSpy = sinon.spy((action)=>{});
            let dispatchSpy = sinon.spy((action)=>{});
            let fetchStub = sinon.spy((url)=>{return new Promise(resolve=>resolve())});

            const middleware = reduxFetchy({fetcher: fetchStub});
            return middleware({ dispatch: dispatchSpy })(nextSpy)({type: 'GET_DATA', meta: {fetch: true}, payload: {url: 'www.foo.bar'}}).then(
                ()=>{
                    Promise.all([
                        dispatchSpy.should.have.been.calledTwice,
                        dispatchSpy.secondCall.should.have.been.calledWith({type: 'GET_DATA_RESOLVED'})
                    ]); 
                }
            )
        })

        it('dispatches rejected', ()=>{
            let nextSpy = sinon.spy((action)=>{});
            let dispatchSpy = sinon.spy((action)=>{});
            let fetchStub = sinon.spy((url)=>{return new Promise((resolve, reject)=>reject())});

            const middleware = reduxFetchy({fetcher: fetchStub});
            return middleware({ dispatch: dispatchSpy })(nextSpy)({type: 'GET_DATA', meta: {fetch: true}, payload: {url: 'www.foo.bar'}}).then(
                ()=>{
                    Promise.all([
                        dispatchSpy.should.have.been.calledTwice,
                        dispatchSpy.secondCall.should.have.been.calledWith({type: 'GET_DATA_REJECTED'})
                    ]);                                                            
                }
            )
        })

    })
})