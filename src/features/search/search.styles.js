import styled from "styled-components"

import { colours, weights } from '../../utilities/settings'

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