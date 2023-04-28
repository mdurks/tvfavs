import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from '../features/favourites/favouritesSlice'
import siteSettingsReducer from '../app/siteSettingsSlice'

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    siteSettings: siteSettingsReducer,
  },
});

store.subscribe(() => {
    const { favourites, siteSettings } = store.getState();
    localStorage.setItem('favourites', JSON.stringify(favourites.value));
    localStorage.setItem('scheduleFilter', JSON.stringify(siteSettings.scheduleFilter));
    localStorage.setItem('country', JSON.stringify(siteSettings.country));
});