import { colours } from "../../utilities/settings"

export const MissingImgSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 101 101">
            <path fill="#D9D9D9" d="M0 0h101v101H0z"/><path fill={colours.backgroundLight} d="M12 12h77v77H12z"/>
            <path fill="#D9D9D9" d="M32.17 39 11 59.91V90h79V70.62L66.25 47.16 53.34 59.91 32.17 39Z"/>
            <circle cx="72" cy="29" r="10" fill="#D9D9D9"/>
        </svg>
    )
}