// import { create } from 'redux-lite';
import { create } from '@sixgramwater/redux-lite';
import counter from './counter';

const modules = { counter };

export const { useModule, dispatch, useSelector } = create(modules);