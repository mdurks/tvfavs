import styled from "styled-components"
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";

import { colours } from '../../utilities/settings'

export const ShowLinkWrapper = styled(motion.article)`
    display: flex;
    margin: 7px 0;
    border-radius: 8px;
    background: ${colours.backgroundLight};
    overflow: hidden;
    transition: background ease 0.5s;

    @media (hover: hover) {
        &:hover {
            background: #00727c;
        }
    }
`

export const ShowLinkEl = styled(Link)`
    flex: 1 1 auto;
    display: flex;
    margin-right: 15px;
    text-decoration: none;
`

export const ShowLinkImg = styled.div`
    flex: 0 0 70px;
    min-height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
    }

    svg {
        width: 42px;
    }
`

export const ShowInfoWrapper = styled.div`
    flex: 1 1 auto;
    padding: 15px 0 15px 15px;
`

export const ShowName = styled.h3`
    margin: 0 0 3px;
    font-size: 18px;
    text-decoration: underline;
`

export const ShowChannel = styled.p`
    margin: 0;
    font-size: 14px;
    color: white;
`

export const FavouriteButtonWrapper = styled.div`
    padding: 15px 15px 0 0;
`
