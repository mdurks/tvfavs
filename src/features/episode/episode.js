import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { motion } from "framer-motion"

import {
	addFavourite,
	removeFavourite,
	selectFavourites,
} from '../favourites/favouritesSlice'

import { FavouriteButtonToggle } from '../favouriteButtonToggle/favouriteButtonToggle';

import { animateFadeIn, animateStaggered } from '../../animations/animations';

import {
    Section,
    Title,
    TitleWrapper,
    TitleHeading,
    FavBtnWrapper,
    BodyWrapper,
    ImageWrapper,
    DetailsWrapper,
    BodyText,
} from './episode.styles'

export const Episode = () => {
    const [searchParams] = useSearchParams();
    const season = searchParams.get("season")
    const episode = searchParams.get("episode")
    const { id } = useParams()

    const dispatch = useDispatch();

	const favourites = useSelector(selectFavourites)

	const [showData, setShowData] = useState()
	const [showEpisodeData, setEpisodeData] = useState()
	const [cleanEpisodeSummary, setCleanEpisodeSummary] = useState()
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
        // get episode data:
        axios.get(`https://api.tvmaze.com/shows/${id}/episodebynumber?season=${season}&number=${episode}`)
            .then(function (response) {
                setEpisodeData(response.data)
                setCleanEpisodeSummary(DOMPurify.sanitize(response.data.summary))
            })
            .catch(function (error) {
                console.log(error);
            })

        // get show data:
        axios.get(`https://api.tvmaze.com/shows/${id}`)
            .then(function (response) {
                setShowData(response.data)
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
                    <TitleWrapper
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.35 }}
                    >
                        {showData?.name && (
                            <TitleHeading>
                                <Link to={`/show/${id}`}>{showData.name}</Link>
                            </TitleHeading>
                        )}
                        <FavBtnWrapper>
                            <FavouriteButtonToggle
                                action="toggle"
                                isShowInFavourites={isShowInFavourites}
                                handleClick={manageFavourites}
                            />
                        </FavBtnWrapper>
                    </TitleWrapper>

                    {showEpisodeData?.name && (
                        <Title>
                            <motion.strong variants={animateFadeIn} initial="initial" animate="animate" transition={{ delay: 0.3}}>
                                Tonights Episode:
                            </motion.strong>
                            <motion.span variants={animateFadeIn} initial="initial" animate="animate" transition={{ delay: 0.4}}>
                                {showEpisodeData.name}
                            </motion.span>
                        </Title>)
                    }

                    <BodyWrapper>
                        {showData?.image?.medium && (
                            <ImageWrapper variants={animateFadeIn} initial="initial" animate="animate" transition={{ delay: 0.35}}>
                                <img src={showData.image.medium} alt={`${showData.name} poster`} />
                            </ImageWrapper>
                        )}
                        <DetailsWrapper variants={animateStaggered} initial="initial" animate="animate">
                            {showData?.network?.name && (<motion.p variants={animateStaggered}><strong>Channel:</strong> {showData.network.name}</motion.p>)}
                            {showEpisodeData?.airtime && (<motion.p variants={animateStaggered}><strong>Airtime:</strong> {showEpisodeData.airtime}</motion.p>)}
                            {showEpisodeData?.runtime && (<motion.p variants={animateStaggered}><strong>Runtime:</strong> {showEpisodeData.runtime} min</motion.p>)}
                        </DetailsWrapper>
                    </BodyWrapper>

                    <BodyText dangerouslySetInnerHTML={{__html: cleanEpisodeSummary}} variants={animateFadeIn} initial="initial" animate="animate" transition={{ delay: 0.5}}></BodyText>
                </>
            ) : (
                <motion.p variants={animateFadeIn} initial="initial" animate="animate" transition={{ delay: 0.3}}>
                    Loading...
                </motion.p>
            )}
        </Section>
    )
}