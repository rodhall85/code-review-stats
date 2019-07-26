import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import axios from 'axios';
import { storeFactory } from "../../test/testUtils";
import App from "./App";
import "../../test/setupTests";
import { mockRequest } from '../../__mocks__/axios2';


jest.mock('axios');

let store;

const setup = (initialState = {}) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe("codeReviewStats", () => {
  it("should render without error", async () => {
    const mocked = mockRequest('/repos/comparethemarket.risk-journey/pulls?state=all', [{
      created_at: new Date(),
      url: 'fakeurl'
    }])
    console.log("TCL: mocked", mocked)

    axios.create.mockResolvedValue(() => {
      console.log('dfdf');
      return {
        get: () => {}
      }
    })
    console.log("TCL: axios", axios.mock)
    axios.get.mockResolvedValue([{
      created_at: new Date(),
      url: 'fakeurl'
    }])

    const wrapper = setup();

    await new Promise(resolve => {
      setTimeout(() => {
        console.log('waitning now');
        resolve();
      }, 10);
    });
    
    const stats = store.getState().stats;

    expect(stats.bob.user).toBe('bob');
    expect(stats.bob.rejected).toBe(1);
    expect(stats.bob.commented).toBe(0);
    expect(stats.bob.approved).toBe(0);

  });
});
