import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
  const findByTestId = (wrapper, testId, index) =>
    wrapper.findAll(`[data-testid="${testId}"]`).at(index);

  const records = [
    { id: 644, name: 'Pasta Place' },
    { id: 645, name: 'Salad Place' },
  ];

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantModule;
  let wrapper;

  beforeEach(() => {
    restaurantModule = {
      namespaced: true,
      state: { records },
      actions: {
        load: jest.fn().mockName('load'),
      },
    };

    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantModule,
      },
    });

    wrapper = mount(RestaurantList, { localVue, store });
  });

  it('loads restaurants on mount', () => {
    expect(restaurantModule.actions.load).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Pasta Place');
    expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Salad Place');
  });
});
