import styled from "styled-components"

import { colours } from '../../utilities/settings'
import { mediaQuery } from '../../utilities/mediaQueries'

export const FavBtn = styled.button`
    padding: 6px;
    border: none;
    border-radius: 8px;
    background: none;

    svg {
        width: 30px;
    }

    ${mediaQuery.min_tablet} {
    }
`

export const RemoveFavBtn = styled.button`
    padding: 13px 10px;
    border: none;
    border-radius: 8px;
    background: ${colours.background};
    color: white;
`
