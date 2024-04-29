import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import EventDetailsPage from '@/pages/events/_permalink.vue'

describe('EventDetailsPage', () => {
  let localVue, router

  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)

    // Create a mock router instance with the dynamic route
    router = new VueRouter({
      routes: [
        { path: '/events/:permalink', component: EventDetailsPage, name: 'event-detail' },
      ],
    })
  })

  it('navigates to the correct URL and renders the expected content', () => {
    const wrapper = mount(EventDetailsPage, {
      localVue,
      router,
      mocks: {
        $route: {
          params: {
            permalink: 'test-event',
          },
        },
      },
    })

    // Simulate a navigation to the event detail page
    wrapper.vm.$router.push({ name: 'event-detail', params: { permalink: 'test-event' } })

    // Assert the URL
    expect(wrapper.vm.$route.path).toBe('/events/test-event')

    // Assert the content
    expect(wrapper.text()).toContain('Event Details')
    expect(wrapper.text()).toContain('Preis')
  })
})