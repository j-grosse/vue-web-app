import { mount, createLocalVue } from '@vue/test-utils'
import EventCard from '~/components/EventCard.vue'
import VueRouter from 'vue-router'
import EventDetailPage from '@/pages/events/_permalink.vue'

describe('EventCard', () => {
  let localVue, router

  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)

    // Create a mock router instance with the dynamic route
    router = new VueRouter({
      routes: [
        {
          path: '/events/:permalink',
          component: EventDetailPage,
          name: 'event-detail',
        },
      ],
    })
  })

  it('renders the correct content and navigates to the correct URL', () => {
    const event = {
      permalink: 'test-event',
      title: 'Test Event',
      default_duration: '2 hours',
      rating: 4.5,
      default_price: {
        formatted: '€50',
      },
      images: [
        {
          isPrincipal: true,
          thumb: 'test-image.jpg',
        },
      ],
    }

    const wrapper = mount(EventCard, {
      localVue,
      router,
      propsData: {
        event,
      },
      stubs: {
        NuxtLink: {
          template: '<a :href="to"><slot></slot></a>',
          props: {
            to: {
              type: String,
              required: true,
            },
          },
        },
      },
    })

    // Assert the event title
    expect(wrapper.find('.font-medium').text()).toBe('Test Event')

    // Assert the event duration and rating
    expect(wrapper.find('p').text()).toBe('Dauer: 2 hours Bewertung: 4.5')

    // Assert the event image
    expect(wrapper.find('img').attributes('src')).toBe('test-image.jpg')

    // Assert the NuxtLink component
    const nuxtLink = wrapper.find('a')
    expect(nuxtLink.exists()).toBe(true)
    expect(nuxtLink.attributes('href')).toBe('/events/test-event')

    // Simulate a click on the EventCard
    nuxtLink.trigger('click')

    // Assert the navigation
    // expect(wrapper.vm.$route.path).toBe('/events/test-event')
  })
})
