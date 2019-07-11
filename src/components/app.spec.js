import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { storeFactory } from '../../test/testUtils';
import App from './App';
import '../../test/setupTests';

let store;

const setup = (initialState={}) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <App />
    </Provider>);
};

describe('codeReviewStats', () => {
  it('should render without error', () => {
    const wrapper = setup({ 
      stats: [
        {user: "bob", rejected: 1, commented: 2, approved: 3 }
    ]});
    console.log(wrapper.debug());
    expect(wrapper).not.toBe(undefined);
  });

  it('should have stuff in the store', () => {
    const wrapper = setup({ 
      stats: [
        {user: "bob", rejected: 1, commented: 2, approved: 3 }
    ]});
    console.log(store.getState());
    expect(wrapper).not.toBe(undefined);
  });
});