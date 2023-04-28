import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { selectFavourites } from '../favourites/favouritesSlice'

import { animateFadeIn } from '../../animations/animations';
import { colours } from '../../utilities/settings';
import { HeartSVG } from '../heartSVG/heartSVG';

import {
	HeaderEl,
	BrandRow,
	LogoText,
	MyFavsLink,
	SearchRow,
	SearchInput,
	SearchSubmitBtn,
} from './header.styles'

export const Header = () => {

	const navigate = useNavigate()

	const favourites = useSelector(selectFavourites)

	const [searchInputValue, setSearchInputValue] = useState('')

	const navigateToSearchResults = () => navigate(`/search/${searchInputValue}`)
	const searchInputSubmit = () => { if (searchInputValue) navigateToSearchResults() }
	const searchFieldEnter = (e) => { if (e.key === "Enter") navigateToSearchResults() }

	return (
		<HeaderEl>
			<BrandRow
				variants={animateFadeIn}
                initial="initial"
                animate="animate"
			>
				<LogoText to="/" aria-label="Go to homepage">TV<span>FAVS</span></LogoText>
				<MyFavsLink to="/favourites">
					MY FAVS:
					<HeartSVG fill={colours.primary} />
					<span>{favourites.length || 0}</span>
				</MyFavsLink>
			</BrandRow>
			<SearchRow
				variants={animateFadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2}}
			>
				<SearchInput
					type="text"
					name="search"
					placeholder="Search shows..."
					value={searchInputValue}
					onChange={(e) => setSearchInputValue(e.target.value)}
					onKeyDown={(e) => searchFieldEnter(e)}
				/>
				<SearchSubmitBtn
					type="button"
					onClick={() => searchInputSubmit()}
				>
					Search
				</SearchSubmitBtn>
			</SearchRow>
		</HeaderEl>
	);
}
