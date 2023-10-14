import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../action/tool_bar.action';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return state + 1;
  }),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);