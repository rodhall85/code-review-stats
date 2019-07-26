import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import { storeFactory } from '../../test/testUtils';
import CodeReviewStats from './CodeReviewStats';
import '../../test/setupTests';

const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  return mount(<CodeReviewStats store={store} />);
};

describe('codeReviewStats', () => {
  it('should render without error', () => {
    const wrapper = setup({ 
      stats: [
        {user: "bob", rejected: 1, commented: 2, approved: 3 }
    ]});
    expect(wrapper).not.toBe(undefined);
  });
});