type EventName = string | symbol;
type Listener = (...args: any[]) => void;

class EventEmitter {
  private _events: Record<EventName, Listener[]> = Object.create(null);
  constructor() {
    if(!this._events) {
      this._events = Object.create(null);
    } else {
      return this;
    }
  }

  on(event: EventName, listener: Listener) {
    const name = event as string;
    // create an array at first time
    if(!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(listener);
    return this;
  }

  emit(event: EventName, ...args: any[]) {
    const listeners = this._events[event as string];
    if(!listeners || listeners.length === 0)  return false;
    listeners.forEach(callback => {
      callback(...args);
    });
    return true;
  }

  off(event: EventName, listener: Listener) {
    const listeners = this._events[event as string];
    if(listeners && listeners.length > 0) {
      const index = listeners.indexOf(listener);
      if(index > - 1) {
        listeners.splice(index, 1);
      }
    }
    return this;
  }


}

export default EventEmitter;