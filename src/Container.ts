import EventEmitter from "./eventEmitter";

export interface Module {
  state?: Record<string, any>
  reducers?: Record<string, any>
  effects?: Record<string, any>
}

export type Modules = Record<string, Module>;
export type Listener = (...args: any[]) => void;

const extractFromModules = (modules: Modules) => {
  const rootState = {};
  const rootReducers = {};
  const rootEffects = {};

  Object.keys(modules).forEach((key) => {
    const module = modules[key];
    rootState[key] = {};
    rootReducers[key] = {};
    rootEffects[key] = {};

    Object.assign(rootState[key], module.state);
    Object.assign(rootReducers[key], module.reducers);
    Object.assign(rootEffects[key], module.effects);

  })
  return { rootState, rootReducers, rootEffects };
}

class Container {
  private rootState: Record<string, any>;
  private rootReducers: Record<string, any>;
  private rootEffects: Record<string, any>;
  private emitter: EventEmitter;

  constructor(modules: Modules) {
    const extracted = extractFromModules(modules);
    this.rootState = extracted.rootState;
    this.rootReducers = extracted.rootReducers;
    this.rootEffects = extracted.rootEffects;
    this.emitter = new EventEmitter();
  }

  public getRootState() {
    return this.rootState;
  }

  public getRootReducers() {
    return this.rootReducers;
  }

  public getRootEffects() {
    return this.rootEffects;
  }

  public getModule(namespace: string) {
    const combinedModule = {};
    const module = {
      state: this.rootState[namespace],
      reducers: this.rootReducers[namespace],
      effects: this.rootEffects[namespace],
    }
    Object.assign(combinedModule, module);
    return combinedModule as Module;
  }

  public getState(namespace: string) {
    const combinedModule = this.getModule(namespace);
    // const state = {};
    // console.log(combinedModule);
    const state = {};
    Object.assign(state, combinedModule.state);
    return state;
  }

  public setState(namespace: string, newState: Record<string, any>) {
    let oldState = {};
    if(this.rootState[namespace]) {
      Object.assign(oldState, this.rootState[namespace]);
      // oldState = this.rootReducers[namespace];
      this.rootState[namespace] = newState;
    }
    this.trigger(namespace, oldState, newState);
  }

  public addEventListener(namespace: string, listener: Listener) {
    this.emitter.on(namespace, listener);
  }

  public removeEventListener(namespace: string, listener: Listener) {
    this.emitter.off(namespace, listener)
  }

  public trigger(namespace: string, oldState: Record<string, any>, newState: Record<string, any>) {
    this.emitter.emit(namespace, oldState, newState);
  }
  
}

export default Container;