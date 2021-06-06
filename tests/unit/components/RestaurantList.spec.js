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
});
