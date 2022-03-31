export interface Module {
  state?: Record<string, any>
  reducers?: Record<string, any>
  effects?: Record<string, any>
}

export type Modules = Record<string, Module>;
export type Listener = (...args: any[]) => void;