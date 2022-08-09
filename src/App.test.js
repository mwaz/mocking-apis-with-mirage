/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-query-by-disappearance */
import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import App from './App';
import { makeServer } from './server'

let server

beforeEach(() => {
  server = makeServer({ environment: "test" })
})

afterEach(() => {
  server.shutdown()
})


test('Page loads successfully', async () => {
  render(<App />);

  await waitForElementToBeRemoved(() => screen.getByText("Loading..."))
  expect(screen.getByText("Todos")).toBeInTheDocument()

});

test('Initial todos are displayed', async () => {
  server.create("todo", { name: "Grooming the cat" })
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."))

  expect(screen.getByText("Grooming the cat")).toBeInTheDocument()

})

test('Todo can be created', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."))

  const postTodo = await screen.findByTestId("post-todo")
  userEvent.type(postTodo.querySelector("input[type=text]"), "Feed the cat")
  fireEvent.submit(screen.getByTestId("post-todo"))
})
