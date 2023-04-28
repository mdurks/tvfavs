import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom"

import { ShowLink } from '../showLink/showLink';

import { Title } from './search.styles'

export const Search = () => {
    const { query } = useParams()

	const [searchResultsData, setSearchResultsData] = useState([])

    useEffect(() => {
        axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then(function (response) {
            setSearchResultsData(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [query])

    return (
        <>
            <Title>Search results for: <span>"{query}"</span></Title>
            {searchResultsData && searchResultsData?.map(item => (
                <ShowLink
                    key={item.show.id}
                    showData={item}
                    destination={`/show/${item.show.id}`}
                    favBtnAction="toggle"
                />
            ))}
        </>
    )
}