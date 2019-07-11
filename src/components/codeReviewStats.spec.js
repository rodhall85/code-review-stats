import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory } from '../../test/testUtils';
import CodeReviewStats from './CodeReviewStats';
import '../../test/setupTests';

const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  return shallow(<CodeReviewStats store={store} />).dive().dive();
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
});