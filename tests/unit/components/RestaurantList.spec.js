import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
  Vue.use(Vuetify);
  const findByTestId = (wrapper, testId, index) =>
    wrapper.findAll(`[data-testid="${testId}"]`).at(index);

  const records = [
    { id: 644, name: 'Pasta Place' },
    { id: 645, name: 'Salad Place' },
  ];

  const vuetify = new Vuetify();
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantModule;
  let wrapper;

  const mountWithStore = (state = { records, loading: false }) => {
    restaurantModule = {
      namespaced: true,
      state,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };

    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantModule,
      },
    });

    wrapper = mount(RestaurantList, { localVue, store, vuetify });
  };

  it('loads restaurants on mount', () => {
    mountWithStore();
    expect(restaurantModule.actions.load).toHaveBeenCalled();
  });

  it('displays the loading indicator while loading', () => {
    mountWithStore({ loading: true });
    expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(true);
  });

  describe('when loading succeeds', () => {
    beforeEach(() => {
      mountWithStore();
    });

    it('displays the restaurants', () => {
      expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Pasta Place');
      expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Salad Place');
    });

    it('does not display the loading indicator while not loading', () => {
      expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(false);
    });

    it('does not display the error message', () => {
      expect(wrapper.find('[data-testid="loading-error"]').exists()).toBe(false);
    });
  });

  describe('when loading fails', () => {
    beforeEach(() => {
      mountWithStore({ loadError: true });
    });

    it('displays the error message', () => {
      expect(wrapper.find('[data-testid="loading-error"]').exists()).toBe(true);
    });
  });
});
