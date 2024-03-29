# React Boilerplate

[![CircleCI](https://circleci.com/gh/axross/react-boilerplate.svg?style=svg)](https://circleci.com/gh/axross/react-boilerplate)

A complete example of React application considered application architecture so that it scales

## Live Demo

### Application

[https://clean-react.web.app](https://clean-react.web.app)

### Storybook

[https://clean-react-storybook.web.app](https://clean-react-storybook.web.app)

## What Included / To-Do

- Foundation
  - [x] **Clean architecture with BLoCs pattern**
  - [x] TypeScript
  - [x] Storybook
  - [ ] Testing
  - [x] Common components
- Real use-cases
  - [x] CI configuration
  - [x] Automatic deployment
  - [ ] Code splitting
  - [x] Session token encryption
  - [ ] The second page
- Implementation technique
  - [x] Optimistic UI
  - [ ] Placeholder Loading
  - [ ] Infinite scrolling paging

## Getting Started

(Fork and) clone this repository, `npm i` then:

```
$ cp .env.example .env
```

Then:

### Starting development server (to develop the application)

```
$ npm run serve:app
```

### Starting storybook server (to develop components)

```
$ npm run serve:storybook
```

### Format code

```
$ npm run format
```

## License

MIT
