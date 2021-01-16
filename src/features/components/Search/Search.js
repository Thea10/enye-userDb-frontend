import React, {useContext} from 'react'
import { ThemeContext } from "../../Theme/ThemeProvider";
import SearchBar from './SearchBar'
import SearchResultCards from './SearchResultCards'

const Search = () => {
    const { bodyTheme } = useContext(ThemeContext);

    return (
        <div className="search" style={{background: bodyTheme.searchBg}}>

            <SearchBar/>

            <SearchResultCards/>
            

        </div>
    )
}

export default Search
