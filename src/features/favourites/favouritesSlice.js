import { createSlice } from '@reduxjs/toolkit';

const favouritesData = localStorage.getItem('favourites')

const initialState = {
	value: favouritesData ? JSON.parse(favouritesData) : [],
};

export const favouritesSlice = createSlice({
	name: 'favourites',
	initialState,
	reducers: {
		addFavourite: (state, action) => {
			state.value.push(action.payload);
		},
		removeFavourite: (state, action) => {
			state.value = state.value.filter(show => show.id !== action.payload)
		},
	},
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;


// Selectors:

export const selectFavourites = (state) => {
	const favs = [...state.favourites.value]
	return favs.reverse() // ordered by newest
};
