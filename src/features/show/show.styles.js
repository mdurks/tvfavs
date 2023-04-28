import styled from "styled-components"

import { colours, weights } from '../../utilities/settings'

export const Section = styled.section``

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 30px 0;
    padding: 10px 15px;
    background: ${colours.backgroundLight};
    border-radius: 10px;
`

export const Title = styled.h1`
    flex: 1 1 auto;
    margin: 0;
    padding: 0 20px 0 0;
    font-weight: ${weights.bold};
    font-size: 26px;
    color: ${colours.primary};
`

export const FavBtnWrapper = styled.div``

export const BodyWrapper = styled.article`
    display: flex;
    margin-bottom: 20px;
`

export const ImageWrapper = styled.div`
    flex: 0 0 110px;

    img {
        width: 100%;
        border-radius: 5px;
    }
`

export const DetailsWrapper = styled.div`
    padding-left: 20px;

    p {
        margin: 0 0 10px;
        color: ${colours.primary};

        strong {
            color: white;
            margin: 0 8px 0 0;
        }
    }
`

export const BodyText = styled.div`
    p {
        margin-top: 0;
        font-size: 15px;
        line-height: 25px;
    }
`