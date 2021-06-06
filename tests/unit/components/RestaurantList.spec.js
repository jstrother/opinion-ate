import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  it('loads restaurants on mount', () => {
    const restaurantModule = {
      namespaced: true,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };

    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantModule,
      },
    });

    mount(RestaurantList, { localVue, store });

    expect(restaurantModule.actions.load).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    const records = [
      { id: 644, name: 'Pasta Place' },
      { id: 645, name: 'Salad Place' },
    ];

    const restaurantModule = {
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

    const wrapper = mount(RestaurantList, { localVue, store });

    const firstRestaurantName = wrapper.findAll('[data-testid="restaurant"]').at(0).text();

    expect(firstRestaurantName).toBe('Pasta Place');

    const secondRestaurantName = wrapper.findAll('[data-testid="restaurant"]').at(1).text();

    expect(secondRestaurantName).toBe('Salad Place');
  });
});
