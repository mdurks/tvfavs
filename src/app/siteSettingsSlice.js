import { createSlice } from '@reduxjs/toolkit';

const scheduleFilterData = localStorage.getItem('scheduleFilter')
const countryData = localStorage.getItem('country')

const initialState = {
	scheduleFilter: scheduleFilterData ? JSON.parse(scheduleFilterData) : 'allShows',
	country: countryData ? JSON.parse(countryData) : 'GB',
};

export const siteSettingsSlice = createSlice({
	name: 'siteSettings',
	initialState,
	reducers: {
		setScheduleFilter: (state, action) => {
			state.scheduleFilter = action.payload
		},
		setCountry: (state, action) => {
			state.country = action.payload
		},
	},
});

export const { setScheduleFilter, setCountry } = siteSettingsSlice.actions;

export default siteSettingsSlice.reducer;


// Selectors:

export const selectScheduleFilter = (state) => state.siteSettings.scheduleFilter
export const selectCountry = (state) => state.siteSettings.country
