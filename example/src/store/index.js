import { create } from 'redux-lite';
import counter from './counter';

const modules = { counter };

export const { useModule, dispatch, container } = create(modules);