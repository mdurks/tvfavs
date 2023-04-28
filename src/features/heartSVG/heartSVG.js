import { colours } from "../../utilities/settings"

export const HeartSVG = ({ fill }) => {
    const svgFill = fill || colours.backgroundLight
    const strokeWidth = fill === colours.primary ? '0' : '4'

    return (
        <svg viewBox="0 0 52 47" fill={svgFill} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M44.5258 4.73257C50.5443 9.28605 51.7915 17.9364 47.3116 24.0537C43.5 29.2583 40.2909 32.3926 34.5563 37.1192L26.208 44L17.6994 37.3251C12.4782 33.229 9.41554 30.128 4.93789 24.3842C0.278372 18.4071 1.26819 9.72245 7.14872 4.98643C12.9323 0.328457 21.2927 1.22488 25.9997 6.9421C30.587 1.36549 38.7171 0.337802 44.5258 4.73257Z" stroke={colours.primary} strokeWidth={strokeWidth} strokeLinecap="round"/>
        </svg>
    )
}