import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getAllMovies } from '../apiCalls/apiCalls';

import { BrowserRouter } from 'react-router-dom';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../apiCalls/apiCalls');

getAllMovies.mockResolvedValue(() => {
	return Promise.resolve({
		movies: [
		{
				id: 475430,
				poster_path: "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
				backdrop_path: "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
				title: "Artemis Fowl",
				average_rating: 6.333333333333333,
				release_date: "2020-06-12"
		}]})
	})

describe(('App'), () => {
  it.skip('renders title to the page', () => {
    const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = getByText(/Decaying Ketchup/i);
    expect(linkElement).toBeInTheDocument();
  })

  it.skip('renders Login button to the page', () => {
    const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
  })

  it.skip("Should render the heading", () => {
    const { getByRole } = render(<BrowserRouter><App /></BrowserRouter>);
    const heading = getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  it.skip('Should populate movie cards on page load', () => {
		const { getByText, getByRole, getByPlaceholderText } = render(<BrowserRouter><App /></BrowserRouter>);

		const movieTitle = getByText('Artemis Fowl');

		expect(movieTitle).toBeInTheDocument();
	})

	it('Should render movies from server when loaded', async () => {
		const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);

		const mockedTitle = await wait(() => getByText('Artemis Fowl'));

		expect(mockedTitle).toBeInTheDocument();
	})
})

