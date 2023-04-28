import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import DOMPurify from 'dompurify';

import {
	addFavourite,
	removeFavourite,
	selectFavourites,
} from '../favourites/favouritesSlice'

import { FavouriteButtonToggle } from '../favouriteButtonToggle/favouriteButtonToggle';

import {
    Section,
    Title,
    TitleWrapper,
    FavBtnWrapper,
    BodyWrapper,
    ImageWrapper,
    DetailsWrapper,
    BodyText,
} from './show.styles'

export const Show = () => {
    const { id } = useParams()

    const dispatch = useDispatch();

	const favourites = useSelector(selectFavourites)

	const [showData, setShowData] = useState()
	const [cleanSummary, setCleanSummary] = useState()
    const [isShowInFavourites, setIsShowInFavourites] = useState()

    const isIdInFavourites = (id) => {
        const matches = favourites.filter(show => show.id === Number(id))
        return matches.length > 0
    }

    const manageFavourites = () => {
        if (isShowInFavourites) dispatch(removeFavourite(Number(id)))
        else dispatch(addFavourite(showData))
    }

    useEffect(() => {
        axios.get(`https://api.tvmaze.com/shows/${id}`)
            .then(function (response) {
                setShowData(response.data)
                setCleanSummary(DOMPurify.sanitize(response.data.summary))
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        setIsShowInFavourites(isIdInFavourites(id))
    }, [favourites])

    return (
        <Section>
            {showData ? (
                <>
                    <TitleWrapper>
                        {showData?.name && (<Title>{showData.name}</Title>)}
                        <FavBtnWrapper>
                            <FavouriteButtonToggle
                                action="toggle"
                                isShowInFavourites={isShowInFavourites}
                                handleClick={manageFavourites}
                            />
                        </FavBtnWrapper>
                    </TitleWrapper>
                    <BodyWrapper>
                        {showData?.image?.medium && (
                            <ImageWrapper>
                                <img src={showData.image.medium} alt={`${showData.name} poster`} />
                            </ImageWrapper>
                        )}
                        <DetailsWrapper>
                            {showData?.schedule?.days[0] && (
                                <p><strong>Next show:</strong> {showData.schedule.days[0]} {showData.schedule.time}</p>
                            )}
                            {showData?.runtime && (<p><strong>Runtime:</strong> {showData.runtime} min</p>)}
                            {showData?.genres.length !== 0 && (<p><strong>Genre:</strong> {showData.genres.join(", ")}</p>)}
                            {showData?.network?.name && (<p><strong>Network:</strong> <a href={showData.network.officialSite}>{showData.network.name}</a></p>)}
                            {showData?.rating?.average && (<p><strong>Rating:</strong> {showData.rating.average}</p>)}
                            {showData?.premiered && (<p><strong>Premiered:</strong> {showData.premiered}</p>)}
                            {showData?.status === 'Ended' && (<p><strong>Ended:</strong> {showData.ended}</p>)}
                            {showData?.officialSite && (
                                <p><strong>Official site:</strong> <a href={showData.officialSite}>{showData.officialSite}</a></p>
                            )}
                        </DetailsWrapper>
                    </BodyWrapper>
                    {cleanSummary && (<BodyText dangerouslySetInnerHTML={{__html: cleanSummary}}></BodyText>)}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Section>
    )
}