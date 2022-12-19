import deepFreeze from 'deep-freeze'
import reducer from './reducer'

describe('Unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('Should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = reducer(undefined, action);
    expect(newState).toEqual(initialState);
  })

  test('Should increment good when called', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState;

    deepFreeze(state);

    const newState = reducer(state, action);
    expect(newState).toEqual({ ...initialState, good: 1 });
  })

  test('Should increment ok when called', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState;

    deepFreeze(state);

    const newState = reducer(state, action);
    expect(newState).toEqual({ ...initialState, ok: 1 });
  })

  test('Should increment bad when called', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState;

    deepFreeze(state);

    const newState = reducer(state, action);
    expect(newState).toEqual({ ...initialState, bad: 1 });
  })
})