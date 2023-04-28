import { useState } from 'react'
import { useSelector } from 'react-redux';

import { ShowLink } from '../showLink/showLink';

import {
	selectFavourites,
} from '../favourites/favouritesSlice'

import { AnimateFadeInAndUp } from '../../animations/animations';

import {
    Title
} from './favourites.styles'

export const Favourites = () => {
	const favourites = useSelector(selectFavourites)

	const [animateShowLinks, setAnimateShowLinks] = useState(false)

    // ShowLink is expecting an object with a 'show' key and value with the show data
    // so the local storage data needs reshaping a little bit before passing it to ShowLink
    const reShapedFavourites = favourites.map(show => ({
        show: {...show},
    }))

    return (
        <>
			<AnimateFadeInAndUp callback={() => setAnimateShowLinks(true)}>
                <Title>
                    Favourites:
                </Title>
            </AnimateFadeInAndUp>
            {animateShowLinks && reShapedFavourites.length > 0 && reShapedFavourites?.map(item => (
                <ShowLink
                    key={item.show.id}
                    showData={item}
                    destination={`/show/${item.show.id}`}
                    favBtnAction="remove"
                />
            ))}
            {reShapedFavourites.length === 0 && (
                <h2>You don't have any favourites added yet.</h2>
            )}
        </>
    )
}