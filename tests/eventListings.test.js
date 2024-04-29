import { mount, createLocalVue } from '@vue/test-utils';
import { createApp, compile } from '@vue/runtime-dom';
import Main from '@/main.vue'
import IndexPage from '@/pages/index.vue';
import EventCard from '@/components/EventCard.vue';

// Mock NuxtLink component
const NuxtLink = {
  name: 'NuxtLink',
  template: '<a><slot></slot></a>',
};

describe('Main', () => {
  let localVue;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.component('EventCard', EventCard);
    localVue.component('NuxtLink', NuxtLink);
  });

  test('displays 10 event cards', async () => {
    const app = createApp({Main});
    app.component('EventCard', EventCard);
    app.component('NuxtLink', NuxtLink);
    app.use(compile);

// Mount the IndexPage component
const wrapper = mount(IndexPage, {
  global: {
    plugins: [
      (app) => {
        app.component('EventCard', EventCard);
        app.component('NuxtLink', NuxtLink);
        app.config.globalProperties.$compile = compile;
      },
    ],
    stubs: {
      NuxtLink: true,
    },
  },
  data() {
    return {
      selectedCity: '',
      selectedCategory: '',
    };
  },
});

    // Set the selected city and category
    await wrapper.setData({
      selectedCity: 'München',
      selectedCategory: 'essen-trinken',
    });

    // Get the rendered event cards
    const eventCards = wrapper.findAllComponents(EventCard);

    // Assert that the correct number of event cards is displayed
    expect(eventCards.length).toBe(6);

    // Assert that each event card belongs to the selected city and category
    eventCards.forEach((eventCard) => {
      expect(eventCard.props().event.city).toBe('München');
      expect(
        eventCard.props().event.categories.some(
          (category) => category.slug === 'essen-trinken'
        )
      ).toBe(true);
    });
  });
});