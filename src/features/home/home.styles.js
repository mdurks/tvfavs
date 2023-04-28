import styled from "styled-components"

import { colours, weights, fontFamily } from '../../utilities/settings'

export const Title = styled.h1`
    margin: 40px 0 25px;
    text-align: center;
    text-transform: uppercase;
    font-weight: ${weights.regular};
    font-size: 30px;

    span {
        color: ${colours.primary};
    }
`

export const ScheduleConfigWrapper = styled.div`
    display: flex;
    margin: 0 0 25px;
`

export const LocationWrapper = styled.div`
    flex: 1 1 auto;
    padding: 0 15px 0 0;
`

export const LocationLabel = styled.label`
    display: block;
    margin: 0 0 10px;
    font-size: 15px;
`

export const LocationSelect = styled.select`
    width: 100%;
    padding: 13px 15px;
    border: none;
    border-radius: 10px;
    color: ${colours.background};
    font-size: 17px;
    font-family: ${fontFamily.roboto};
    font-weight: ${weights.bold};

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-indent: 1px;
    text-overflow: '';
`

export const ShowToggleWrapper = styled.div``

export const ToggleLabel = styled.div`
    display: block;
    margin: 0 0 10px;
    font-size: 15px;
    text-align: center;
`

export const ToggleShowBtn = styled.button`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding: 4px;
    background: white;
    border: none;
    border-radius: 10px;

    svg {
        display: block;
        width: 30px;
    }
`

export const ToggleShowBtnAllShows = styled.span`
    display: block;
    margin: 0 5px 0 0;
    padding: 11px;
    border-radius: 7px;
    background-color: ${props => props.scheduleFilterValue === 'allShows' && colours.background};
    color: ${props => props.scheduleFilterValue === 'allShows' ? 'white' : colours.background};
    font-weight: ${weights.bold};
`

export const ToggleShowBtnFavouritesWrapper = styled.span`
    position: relative;
    display: block;
    padding: 4px;
    border-radius: 7px;
    background-color: ${props => props.scheduleFilterValue === 'favourites' && colours.background};
`

export const ToggleShowBtnFavouritesValue = styled.span`
    position: absolute;
    top: 9px;
    left: 0;
    width: 100%;
    text-align: center;
    color: ${colours.background};
    font-weight: ${weights.bold};
`

export const TimeSlotHourHeading = styled.h2`
    margin: 20px 0;
    padding: 10px;
    background: ${colours.primary};
    color: ${colours.background};
    text-align: center;
`
