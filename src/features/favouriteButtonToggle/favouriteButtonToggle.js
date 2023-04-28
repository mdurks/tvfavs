import { HeartSVG } from '../heartSVG/heartSVG'
import { colours } from '../../utilities/settings'

import {
    FavBtn,
    RemoveFavBtn,
} from './favouriteButtonToggle.styles'

export const FavouriteButtonToggle = ({action, isShowInFavourites, handleClick, showName}) => {
    if (action === 'toggle') return (
        <FavBtn
            type="button"
            aria-label={isShowInFavourites ?
                `Remove ${showName} from my favourites` : `Add ${showName} to my favourites`
            }
            onClick={() => handleClick()}
        >
            <HeartSVG fill={isShowInFavourites ? colours.primary : colours.backgroundLight} />
        </FavBtn>
    )

    if (action === 'remove') return (
        <RemoveFavBtn
            type="button"
            onClick={() => handleClick()}
        >
            Delete
        </RemoveFavBtn>
    )
}