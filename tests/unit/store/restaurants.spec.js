import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import restaurants from '@/store/restaurants';

describe('restaurants', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  describe('initially', () => {
    it('does not have the loading flag set', () => {
      const store = new Vuex.Store({
        modules: {
          restaurants: restaurants(),
        },
      });
      expect(store.state.restaurants.loading).toEqual(false);
    });
  });

  describe('load action', () => {
    describe('while loading', () => {
      it('sets a loading flag', () => {
        const api = {
          loadRestaurants: () => new Promise(() => {}),
        };

        const store = new Vuex.Store({
          modules: {
            restaurants: restaurants(api),
          },
        });

        store.dispatch('restaurants/load');
        expect(store.state.restaurants.loading).toEqual(true);
      });
    });

    describe('when loading succeeds', () => {
      const records = [
        { id: 644, name: 'Pasta Place' },
        { id: 645, name: 'Salad Place' },
      ];

      let store;

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.resolve(records),
        };

        store = new Vuex.Store({
          modules: {
            restaurants: restaurants(api),
          },
        });

        return store.dispatch('restaurants/load');
      });

      it('stores the restaurants', () => {
        expect(store.state.restaurants.records).toEqual(records);
      });

      it('clears the loading flag', () => {
        expect(store.state.restaurants.loading).toEqual(false);
      });
    });
  });
});
