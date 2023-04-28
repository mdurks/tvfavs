import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import {
	addFavourite,
	removeFavourite,
	selectFavourites,
} from '../favourites/favouritesSlice'

import { FavouriteButtonToggle } from '../favouriteButtonToggle/favouriteButtonToggle';
import { MissingImgSVG } from '../missingImgSVG/missingImgSVG';
import { AnimateFadeInWhileInView } from '../../animations/animations';

import {
    ShowLinkWrapper,
    ShowLinkEl,
    ShowLinkImg,
    ShowInfoWrapper,
    ShowName,
    ShowChannel,
    FavouriteButtonWrapper,
} from './showLink.styles'

export const ShowLink = ({ showData, destination, favBtnAction }) => {
    const dispatch = useDispatch();
	const favourites = useSelector(selectFavourites)
    const [isShowInFavourites, setIsShowInFavourites] = useState()

    const isIdInFavourites = (id) => {
        const matches = favourites.filter(show => show.id === Number(id))
        return matches.length > 0
    }

    const manageFavourites = () => {
        if (isShowInFavourites) dispatch(removeFavourite(Number(showData.show.id)))
        else {
            axios.get(`https://api.tvmaze.com/shows/${showData.show.id}`)
			.then(function (response) {
                dispatch(addFavourite(response.data))
			})
			.catch(function (error) {
				console.log(error);
			})
        }
    }

    useEffect(() => {
        setIsShowInFavourites(isIdInFavourites(showData.show.id))
    }, [favourites])

    return (
        <AnimateFadeInWhileInView>
            <ShowLinkWrapper>
                <ShowLinkEl to={destination}>
                    <ShowLinkImg>
                        {showData.show.image?.medium ? (
                                <img src={showData.show.image.medium} alt={`${showData.show.name} poster`} />
                            ) : (
                                <MissingImgSVG />
                            )
                        }
                    </ShowLinkImg>
                    <ShowInfoWrapper>
                        <ShowName>{showData.show.name}</ShowName>
                        <ShowChannel>{showData?.airtime} - {showData.show.network?.name}</ShowChannel>
                    </ShowInfoWrapper>
                </ShowLinkEl>
                <FavouriteButtonWrapper>
                    <FavouriteButtonToggle
                        action={favBtnAction}
                        isShowInFavourites={isShowInFavourites}
                        handleClick={manageFavourites}
                        showName={showData.show.name}
                    />
                </FavouriteButtonWrapper>
            </ShowLinkWrapper>
        </AnimateFadeInWhileInView>
    )
}