import { create } from 'redux-lite';
import counter from './counter';

const modules = { counter };

export const { useModule, dispatch } = create(modules);