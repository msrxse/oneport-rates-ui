# Oneport rates UI clone

This is a clone of the [Oneport](https://www.oneport365.com/) site at the rates' scene. Showcases a list of cards:

- Filterable with 2 params (container size and container type) (server side)
- Filterable by rate filters (locally)

### Note

- We use `react-query` to manage API state and `Zustand` to manage UI state

## To start development server:

```
pnpm run dev
```

Next, open your browser and visit http://localhost:5173/. The default React project will be running on port 5173.

### Note:

- that if running `antfu.vite` and `antfu.browse-lite`, vite server will start itself at port 4000.

## Tests

```
pnpm test:watch

```

or

```
pnpm test:watch <path-to-file>

```

## TODOS

- [ ] Add rates scene
- [ ] Wire data from react-query to rates scene
- [ ] Use Zustand to keep hold of filter and params UI data
- [ ] ...
