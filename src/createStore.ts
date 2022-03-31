import { useState, useEffect, useCallback } from 'react';
import Container, { Modules } from './Container'
import EventEmitter from './eventEmitter';

const DISPATCH_TYPE = 'DISPATCH_TYPE';


const create = (modules: Modules) => {
  const container = new Container(modules);
  const emitter = new EventEmitter();
  // console.log(container.getModule())
  const dispatch: any = (
    nameAndMethod: string,
    payload: Record<string, any>
  ) => {
    const [namespace, methodName] = nameAndMethod.split('/');
    const combinedModule = container.getModule(namespace);
    // console.log(combinedModule);
    const { state, reducers, effects } = combinedModule;
    const rootState = container.getRootState();

    if(effects && effects[methodName]) {
      emitter.emit(DISPATCH_TYPE, {
        type: nameAndMethod,
        payload,
      });
      return effects[methodName]({ state, payload, dispatch, rootState });
    } else if(reducers && reducers[methodName]) {
      const newState = reducers[methodName]({
        state,
        rootState,
        payload,
      });
      container.setState(namespace, newState);

      emitter.emit(DISPATCH_TYPE, {
        type: nameAndMethod,
        payload,
        newState
      })
    }
  };

  const injectFns = (reducersOrEffects: any) => {
    Object.keys(reducersOrEffects).forEach((key) => {
      if (!dispatch[key]) dispatch[key] = {};
      const originFns = reducersOrEffects[key];
      const fns = {};
      Object.keys(originFns).forEach((fnKey) => {
        fns[fnKey] = (payload: Record<string, any>) =>
          dispatch(`${key}/${fnKey}`, payload);
      });
      Object.assign(dispatch[key], fns);
    });
  };

  function useModule(namespace: string) {
    const [, setState] = useState({});

    const forceUpdate = useCallback(() => setState({}), [setState]);

    useEffect(() => {
      container.addEventListener(namespace, forceUpdate);
      return () => container.removeEventListener(namespace, forceUpdate);
    }, [namespace, forceUpdate]);

    return container.getState(namespace);
  }

  // Inject each module's reducer and effect method into the Dispatch
  const rootReducers = container.getRootReducers();
  const rootEffects = container.getRootEffects();

  injectFns(rootReducers);
  injectFns(rootEffects);

  return { useModule, dispatch }
}

export default create;