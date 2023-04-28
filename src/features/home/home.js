import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { selectFavourites } from '../favourites/favouritesSlice'
import { selectScheduleFilter, selectCountry, setScheduleFilter, setCountry } from '../../app/siteSettingsSlice';

import { ShowLink } from '../showLink/showLink'
import { HeartSVG } from '../heartSVG/heartSVG';

import { AnimateFadeInWhileInView, AnimateFadeInAndUp, AnimateFadeIn } from '../../animations/animations';
import { colours } from '../../utilities/settings';

import {
	Title,
	ScheduleConfigWrapper,
	LocationWrapper,
	LocationLabel,
	LocationSelect,
	ShowToggleWrapper,
	ToggleLabel,
	ToggleShowBtn,
	ToggleShowBtnAllShows,
	ToggleShowBtnFavouritesWrapper,
	ToggleShowBtnFavouritesValue,
	TimeSlotHourHeading,
} from './home.styles'

export const Home = () => {
    const dispatch = useDispatch();

	const favourites = useSelector(selectFavourites)
	const scheduleFilterValue = useSelector(selectScheduleFilter)
	const country = useSelector(selectCountry)

	const countryOptions = {
		'AU': 'Australia',
		'CA': 'Canada',
		'IT': 'Italy',
		'ES': 'Spain',
		'GB': 'United Kingdom',
		'US': 'USA',
	}

	const [sceduleData, setSceduleData] = useState(null)
	// console.log('sceduleData', sceduleData);

	const [timeSlot20, setTimeSlot20] = useState([])
	const [timeSlot21, setTimeSlot21] = useState([])
	const [timeSlot22, setTimeSlot22] = useState([])
	const [timeSlot20AllShows, setTimeSlot20AllShows] = useState([])
	const [timeSlot21AllShows, setTimeSlot21AllShows] = useState([])
	const [timeSlot22AllShows, setTimeSlot22AllShows] = useState([])
	const [timeSlot20Favs, setTimeSlot20Favs] = useState([])
	const [timeSlot21Favs, setTimeSlot21Favs] = useState([])
	const [timeSlot22Favs, setTimeSlot22Favs] = useState([])
	const [timeSlotFavsTotal, setTimeSlotFavsTotal] = useState(0)

	const isIdInFavourites = (id) => {
        const matches = favourites.filter(show => show.id === Number(id))
        return matches.length > 0
    }

	const returnAirTimeStartHour = (airtime) => {
		// expecting airtime string in format "20:00"
		return Number(airtime.slice(0, airtime.indexOf(':')))
	}

	const processSceduleData = (data) => {
		if (!data) return
		const tempTimeSlot20AllShows = []
		const tempTimeSlot21AllShows = []
		const tempTimeSlot22AllShows = []
		const tempTimeSlot20Favs = []
		const tempTimeSlot21Favs = []
		const tempTimeSlot22Favs = []
		data.forEach(show => {
			// get hour as a number from string "20:00" to test hourly boundaries
			const showAirTimeStart = returnAirTimeStartHour(show.airtime)
			const showId = show.show.id
			if (showAirTimeStart >= 20 && showAirTimeStart < 21) {
				tempTimeSlot20AllShows.push(show)
				if(isIdInFavourites(showId)) tempTimeSlot20Favs.push(show)
			}
			else if (showAirTimeStart >= 21 && showAirTimeStart < 22) {
				tempTimeSlot21AllShows.push(show)
				if(isIdInFavourites(showId)) tempTimeSlot21Favs.push(show)
			}
			else if (showAirTimeStart >= 22 && showAirTimeStart < 23) {
				tempTimeSlot22AllShows.push(show)
				if(isIdInFavourites(showId)) tempTimeSlot22Favs.push(show)
			}
		})
		setTimeSlot20AllShows(tempTimeSlot20AllShows)
		setTimeSlot21AllShows(tempTimeSlot21AllShows)
		setTimeSlot22AllShows(tempTimeSlot22AllShows)
		setTimeSlot20Favs(tempTimeSlot20Favs)
		setTimeSlot21Favs(tempTimeSlot21Favs)
		setTimeSlot22Favs(tempTimeSlot22Favs)
	}

	const setTimeSlotData = () => {
		if (!sceduleData) return
		if (scheduleFilterValue === 'allShows') {
			setTimeSlot20([...timeSlot20AllShows])
			setTimeSlot21([...timeSlot21AllShows])
			setTimeSlot22([...timeSlot22AllShows])
		} else if (scheduleFilterValue === 'favourites') {
			setTimeSlot20([...timeSlot20Favs])
			setTimeSlot21([...timeSlot21Favs])
			setTimeSlot22([...timeSlot22Favs])
		}
	}

	const toggleScheduleType = () => {
		if (scheduleFilterValue === 'allShows') dispatch(setScheduleFilter('favourites'))
		else dispatch(setScheduleFilter('allShows'))
	}

	const handleSelectLocationChange = (e) => {
		dispatch(setCountry(e.target.value))
		setSceduleData(null)
	}

	const getScheduleData = () => {
		if (sceduleData !== null) return
        axios.get(`https://api.tvmaze.com/schedule?country=${country}`)
			.then(function (response) {
				setSceduleData(response.data)
				processSceduleData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
	}

    useEffect(() => {
		getScheduleData()
    }, [])

    useEffect(() => {
		getScheduleData()
    }, [sceduleData])

    useEffect(() => {
		setTimeSlotData()
		setTimeSlotFavsTotal(timeSlot20Favs.length + timeSlot21Favs.length + timeSlot22Favs.length)
    }, [timeSlot20AllShows, timeSlot21AllShows, timeSlot22AllShows, timeSlot20Favs, timeSlot21Favs, timeSlot22Favs])

    useEffect(() => {
		// refresh all the timeSlot arrays if favourites updates
		processSceduleData(sceduleData)
    }, [favourites, scheduleFilterValue])

    return (
        <>
			<AnimateFadeInAndUp>
				<Title>
					Tonights <span>Schedule:</span>
				</Title>
			</AnimateFadeInAndUp>

			<AnimateFadeIn delay={0.25}>
				<ScheduleConfigWrapper>
					<LocationWrapper>
						<LocationLabel htmlFor="location">Location:</LocationLabel>
						<LocationSelect
							name="location"
							id="location"
							onChange={(e) => handleSelectLocationChange(e)}
							value={country}
						>
							{Object.keys(countryOptions).map(countryCode => (
								<option value={countryCode} key={countryCode}>{countryOptions[countryCode]}</option>
							))}
						</LocationSelect>
					</LocationWrapper>
					<ShowToggleWrapper>
						<ToggleLabel>Filter shows by:</ToggleLabel>
						<ToggleShowBtn
							type="button"
							onClick={toggleScheduleType}
						>
							<ToggleShowBtnAllShows scheduleFilterValue={scheduleFilterValue}>All</ToggleShowBtnAllShows>
							<ToggleShowBtnFavouritesWrapper scheduleFilterValue={scheduleFilterValue}>
								<HeartSVG fill={colours.primary} />
								<ToggleShowBtnFavouritesValue>{timeSlotFavsTotal}</ToggleShowBtnFavouritesValue>
							</ToggleShowBtnFavouritesWrapper>

						</ToggleShowBtn>
					</ShowToggleWrapper>
				</ScheduleConfigWrapper>
			</AnimateFadeIn>

			{timeSlot20.length > 0 && (
				<AnimateFadeInWhileInView>
					<TimeSlotHourHeading>
						20:00
					</TimeSlotHourHeading>
				</AnimateFadeInWhileInView>
			)}
			{timeSlot20.length > 0 && timeSlot20.map(episode => (
				<ShowLink
					key={episode.id}
					showData={episode}
					destination={`/episode/${episode.show.id}?season=${episode.season}&episode=${episode.number}`}
					favBtnAction="toggle"
				/>
			))}

			{timeSlot21.length > 0 && (
				<AnimateFadeInWhileInView>
					<TimeSlotHourHeading>
						21:00
					</TimeSlotHourHeading>
				</AnimateFadeInWhileInView>
			)}
			{timeSlot21.length > 0 && timeSlot21.map(episode => (
				<ShowLink
					key={episode.id}
					showData={episode}
					destination={`/episode/${episode.show.id}?season=${episode.season}&episode=${episode.number}`}
					favBtnAction="toggle"
				/>
			))}

			{timeSlot22.length > 0 && (
				<AnimateFadeInWhileInView>
					<TimeSlotHourHeading>
						22:00
					</TimeSlotHourHeading>
				</AnimateFadeInWhileInView>
			)}
			{timeSlot22.length > 0 && timeSlot22.map(episode => (
				<ShowLink
					key={episode.id}
					showData={episode}
					destination={`/episode/${episode.show.id}?season=${episode.season}&episode=${episode.number}`}
					favBtnAction="toggle"
				/>
			))}

			{timeSlot20.length + timeSlot21.length + timeSlot22.length === 0 && (
				<AnimateFadeInAndUp delay={0.5}>
					<h2>No shows found for tonight.</h2>
				</AnimateFadeInAndUp>
			)}
		</>
    )
}