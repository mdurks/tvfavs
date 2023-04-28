import React from 'react';
import { Route, Routes } from 'react-router-dom'

import { Header } from './features/header/header'

import { Home } from './features/home/home';
import { Search } from './features/search/search';
import { Favourites } from './features/favourites/favourites'
import { Show } from './features/show/show';
import { Episode } from './features/episode/episode';

function App() {

	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/search" element={<Search />} />
				<Route path="/search/:query" element={<Search />} />
				<Route path="/show/:id" element={<Show />} />
				<Route path="/episode/:id" element={<Episode />} />
				<Route path="/favourites" element={<Favourites />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
