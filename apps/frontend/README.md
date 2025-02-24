This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It uses the NextJS App Router which defaults to Server Components. It benefits from NextJS opinionated caching, and the initial page view is SSR rendered.

The frontend will throw a `fetch` error if the backend is not available, but it has some basic error handling using the declarative `not-found` component, for backend responses.

The buttons are dummies and there is no client-side interaction, so there is (as yet) no use of React Hooks. There is also no implementation of React Suspense but this could be added as progressive enhancement. Fun fact, if you rename/disable the declarative `loading.tsx` component then the page will work with JS disabled.

The `DeliveryNotification` UI component has some accessibility features with semantic HTML, a `<strong>` tag for the price and an `aria-label` for the free gift badge.

With more time the `DeliveryNotification` UI component should be composed of atomic UI components, ideally using a component library (e.g. [Tailwind UI](https://tailwindui.com/)). Also could implement [Storybook](https://storybook.js.org/) to review and test UI components in isolation.

There are some simple unit tests for the currency formatter util and some React Testing Library js-dom tests for the `<DeliveryNotification>` UI. With more time I would have added Playwright or Cypress E2E tests.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Currently using `pnpm` as this is recommended by NextJS

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.
