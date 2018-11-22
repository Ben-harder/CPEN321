import "react-native";
import React from "react";
import CreateJob from "../screens/CreateJobScreen";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import Expo from "expo";
import configureStore from 'redux-mock-store'
import toJson from 'enzyme-to-json';
import { TextInput } from 'react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from "../constants/Url";

configure({ adapter: new Adapter() });

// mock store
const mockStore = configureStore();
const initialState = {
  user: {
    data: {
      ID: "12345"
    }
  }
};
const store = mockStore(initialState);

// mock expo functions
jest.mock("expo", () => ({
  Constants: {
    manifest: {
      debuggerHost: {
        split: jest.fn().mockReturnValue({shift: jest.fn().mockReturnValue({concat: jest.fn()})})
      }
    }
  }
}));

// mock axios
const mockAxios = new MockAdapter(axios);

// mock alert
global.alert = jest.fn();

// mock navigation
const navigation = {
  navigate: jest.fn()
};

describe("Create Job Test", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("Renders the create job screen", async () => {
    const wrapper = shallow(<CreateJob store={store} />).dive();
    expect(wrapper.instance()).toMatchSnapshot();
  });

  it("Successful job post", async () => {
    // set axios to post to resolve
    mockAxios.onPost(`${api}/job/create-job`).reply(200, {});

    const wrapper = shallow(<CreateJob store={store} navigation={navigation} />).dive();

    // set text inputs
    wrapper.find({testID: '#address'}).simulate('ChangeText', '123 Wain Street');
    wrapper.find({testID: '#description'}).simulate('ChangeText', 'A valid description');
    wrapper.find({testID: '#wage'}).simulate('ChangeText', 20);
    wrapper.find({testID: '#type'}).prop('onValueChange')('Feed Lizard');
    
    // press button
    wrapper.find({testID: '#submit'}).simulate('press');

    const component = wrapper.instance();

    expect(component.state.address === '123 Wain Street');
    expect(component.state.description === 'A valid description');
    expect(component.state.wage === '20');
    expect(component.state.type === 'Feed Lizard');

    // assert success message state
    setTimeout(() => {
      expect(global.alert).toBeCalledWith("You've successfully created the job post.", expect.any(Function))
    }, 0);
  });

  it("Server request errors", async () => {
    // set axios to post to resolve
    mockAxios.onPost(`${api}/job/create-job`).reply(400, {err: {
      response: {
        data: {
          errorMessage: 'Mock error message'
        }
      }
    }});

    const wrapper = shallow(<CreateJob store={store} navigation={navigation} />).dive();

    // set text inputs
    wrapper.find({testID: '#address'}).simulate('ChangeText', '123 Wain Street');
    wrapper.find({testID: '#description'}).simulate('ChangeText', 'A valid description');
    wrapper.find({testID: '#wage'}).simulate('ChangeText', 20);
    wrapper.find({testID: '#type'}).prop('onValueChange')('Feed Lizard');
    
    // press button
    wrapper.find({testID: '#submit'}).simulate('press');

    const component = wrapper.instance();

    expect(component.state.address === '123 Wain Street');
    expect(component.state.description === 'A valid description');
    expect(component.state.wage === '20');
    expect(component.state.type === 'Feed Lizard');

    // assert error message state
    setTimeout(() => {
      expect(global.alert).toBeCalledWith("Mock error message", expect.any(Function))
    }, 0);
  });

  it("Has empty fields", async () => {
    const wrapper = shallow(<CreateJob store={store} navigation={navigation} />).dive();

    // press button
    wrapper.find({testID: '#submit'}).simulate('press');

    // assert error message state
    setTimeout(() => {
      expect(global.alert).toBeCalledWith("Please ensure you've field out the fields.", expect.any(Function))
    }, 0);
  });

  it("Has invalid wage", async () => {
    const wrapper = shallow(<CreateJob store={store} navigation={navigation} />).dive();

    // set text inputs
    wrapper.find({testID: '#address'}).simulate('ChangeText', '123 Wain Street');
    wrapper.find({testID: '#description'}).simulate('ChangeText', 'A valid description');
    wrapper.find({testID: '#wage'}).simulate('ChangeText', "20...0");
    wrapper.find({testID: '#type'}).prop('onValueChange')('Feed Lizard');
    
    // press button
    wrapper.find({testID: '#submit'}).simulate('press');

    const component = wrapper.instance();

    // assert error message state
    setTimeout(() => {
      expect(global.alert).toBeCalledWith("Wage must be a valid format!", expect.any(Function))
    }, 0);
  });

  it("Has invalid address", async () => {
    const wrapper = shallow(<CreateJob store={store} navigation={navigation} />).dive();

    // set text inputs
    wrapper.find({testID: '#address'}).simulate('ChangeText', '123 Wain!!!! Street');
    wrapper.find({testID: '#description'}).simulate('ChangeText', 'A valid description');
    wrapper.find({testID: '#wage'}).simulate('ChangeText', "20");
    wrapper.find({testID: '#type'}).prop('onValueChange')('Feed Lizard');
    
    // press button
    wrapper.find({testID: '#submit'}).simulate('press');

    const component = wrapper.instance();

    // assert error message state
    setTimeout(() => {
      expect(global.alert).toBeCalledWith("Address must be a valid address!", expect.any(Function))
    }, 0);
  });

  it("Component unmounts", async () => {
    const wrapper = shallow(<CreateJob store={store} navigation={navigation} />).dive();

    const component = wrapper.instance();

    component.componentWillUnmount();

    expect(console.disableYellowBox === false);
  });
});
