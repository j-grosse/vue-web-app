import { mount, createLocalVue } from '@vue/test-utils'
import EventListings from '@/pages/index.vue'
import EventCard from '@/components/EventCard.vue'
import VueRouter from 'vue-router'

describe('EventListings', () => {
  let localVue

  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    localVue.component('EventCard', EventCard)
  })

  it('renders the correct content', () => {
    // Mock the filteredEvents data
    const mockEvents = [
      {
        id: 1,
        title: 'Event 1',
        city: 'Berlin',
        categories: [{ slug: 'category1' }],
        permalink:
          'http://localhost:3000/events/cocktailkurs-in-muenchen-0w1dlw',
      },
      {
        id: 2,
        title: 'Event 2',
        city: 'Berlin',
        categories: [{ slug: 'category2' }],
      },
      {
        id: 3,
        title: 'Event 3',
        city: 'Berlin',
        categories: [{ slug: 'category1' }],
      },
      {
        id: 4,
        title: 'Event 4',
        city: 'Berlin',
        categories: [{ slug: 'category2' }],
      },
      {
        id: 5,
        title: 'Event 5',
        city: 'Berlin',
        categories: [{ slug: 'category1' }],
      },
      {
        id: 6,
        title: 'Event 6',
        city: 'Berlin',
        categories: [{ slug: 'category2' }],
      },
      {
        id: 7,
        title: 'Event 7',
        city: 'Berlin',
        categories: [{ slug: 'category1' }],
      },
      {
        id: 8,
        title: 'Event 8',
        city: 'Berlin',
        categories: [{ slug: 'category2' }],
      },
      {
        id: 9,
        title: 'Event 9',
        city: 'Berlin',
        categories: [{ slug: 'category1' }],
      },
      {
        id: 10,
        title: 'Event 10',
        city: 'Berlin',
        categories: [{ slug: 'category2' }],
      },
    ]
    const wrapper = mount(EventListings, {
      localVue,
      stubs: {
        EventCard: true,
      },
      data() {
        return {
          events: mockEvents,
          filteredEvents: mockEvents.slice(0, 10),
        }
      },
    })

    // Assert the component's title
    expect(wrapper.find('h1').text()).toBe('Top Erlebnisse in Deiner Nähe')

    // Assert that 10 EventCard components are rendered
    const eventCards = wrapper.findAllComponents({ name: 'EventCard' })
    expect(eventCards.length).toBe(10)

    // Assert the link on the first EventCard
    const linkElement = eventCards.wrappers[0].findComponent({
      name: 'NuxtLink',
    })
    expect(linkElement.exists())

  })
})
