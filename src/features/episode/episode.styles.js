import styled from "styled-components"
import { motion } from "framer-motion";

import { colours, weights } from '../../utilities/settings'

export const Section = styled.section``

export const TitleWrapper = styled(motion.div)`
    display: flex;
    align-items: center;
    margin: 30px 0;
    padding: 10px 15px;
    background: ${colours.backgroundLight};
    border-radius: 10px;
`

export const TitleHeading = styled.div`
    flex: 1 1 auto;
    margin: 0;
    padding: 0 20px 0 0;
    font-size: 26px;

    a {
        font-weight: ${weights.bold};
    }
`

export const Title = styled.h1`
    flex: 1 1 auto;
    margin: 10px 0 20px;
    font-weight: ${weights.bold};
    font-size: 34px;
    color: ${colours.primary};

    strong {
        display: block;
        font-size: 20px;
        color: white;
    }

    span {
        display: block;
    }
`

export const FavBtnWrapper = styled.div``

export const BodyWrapper = styled.article`
    display: flex;
    margin-bottom: 20px;
`

export const ImageWrapper = styled(motion.div)`
    flex: 0 0 110px;
    margin-right: 20px;

    img {
        width: 100%;
        border-radius: 5px;
    }
`

export const DetailsWrapper = styled(motion.div)`
    p {
        margin: 0 0 10px;
        color: ${colours.primary};

        strong {
            color: white;
            margin: 0 8px 0 0;
        }
    }
`

export const BodyText = styled(motion.article)`
    p {
        margin-top: 0;
        font-size: 15px;
        line-height: 25px;
    }
`