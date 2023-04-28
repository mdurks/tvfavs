import styled from "styled-components"
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";

import { colours, weights, fontFamily } from '../../utilities/settings'

export const HeaderEl = styled.header``

export const BrandRow = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`

export const LogoText = styled(Link)`
    font-size: 40px;
    font-weight: ${weights.bold};
    color: white;
    text-decoration: none;

    span {
        font-weight: ${weights.regular};
        color: ${colours.primary};
    }
`

export const MyFavsLink = styled(Link)`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px 8px 7px 14px;
    border-radius: 10px;
    background-color: ${colours.backgroundLight};
    font-size: 16px;
    color: white;
    text-decoration: none;
    font-weight: ${weights.bold};

    span {
        position: absolute;
        right: 10px;
        top: 17px;
        width: 40px;
        text-align: center;
        color: ${colours.background};
    }

    svg {
        margin: 0 0 0 5px;
        width: 45px;
        height: 40px;
    }
`

export const SearchRow = styled(motion.div)`
    position: relative;
`

export const SearchInput = styled.input`
    width: 100%;
    padding: 12px 60px 13px 15px;
    border: none;
    border-radius: 10px;
    font-family: ${fontFamily.roboto};
    font-size: 17px;
    font-weight: ${weights.bold};

    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${colours.background};
        opacity: 1; /* Firefox */
    }
`

export const SearchSubmitBtn = styled.button`
    position: absolute;
    right: 4px;
    top: 4px;
    padding: 11px 16px 10px;
    border: none;
    border-radius: 8px;
    background: ${colours.background};
    color: white;
    text-transform: uppercase;
    font-weight: ${weights.bold};
`
