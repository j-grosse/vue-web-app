## Description
Hello there, if you are here, it means we find we might make a great team together! So in this step, we would like to assess your technical knowledge by building a simple application.

This project was made with Nuxt 2 and we added a few modules, one of them being "@nuxtjs/composition-api", which we also use in our code.

## What you need to do
This is an open-ended challenge, there is no specific UI to implement, or technical approach to follow, and that's what we want to see.

In general, we would like you to build:
- an event list page with some filters 
- an event detail page with more details from a specific event

The event data is provided in `data/events.json`.

Requirements:

1. Event Listing Page: Create a page that displays a list of events. The page should show event cards that have relevant information for the user to understand what's available. Each event card should be clickable and take the user to the event details page.

2. Filtering: Implement filtering options to allow users to filter events based on city and category (You could implement more filters if you want). When a filter is applied, the event list should update dynamically without refreshing the page. The filter options can be presented as dropdown menus, checkboxes, or any other suitable UI components.

3. Event Details Page: Create a separate page to display the details of a selected event. This page should display more information compared to the Event List cards, for the user to learn more about the event and when to book it. Include a back button or link to return to the event listing page.

4. Responsive Design: Design the app to be responsive, ensuring a good user experience on both desktop and mobile devices.

Bonus points:
1. Tests (more details below)
2. Render the pages on server side (SSR)
3. Query Parameters: Ensure that the filter selections are reflected in the URL query parameters. When filters are applied or changed, the URL should update accordingly, allowing users to bookmark or share filtered event listings.


## Tests
You can create e2e and unit tests as you see fit.
- For unit tests, we have Jest configured; test files can be placed inside `tests` folder on root and need a `.test.js` extension.
- For e2e tests, we have Cypress configured; test files can be placed inside `cypress` folder.

## Questions?

You can email questions specific about the challenge to this address: `frontend-task@gokonfetti.com`. Don't worry about it, by the way... you are not expected to always know everything around here!

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
