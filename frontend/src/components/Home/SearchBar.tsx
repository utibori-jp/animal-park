import React, {useState} from 'react';
import {useSetRecoilState} from "recoil";
import {searchState} from "../../atoms/searchState.ts";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import Search from '@mui/icons-material/Search';

function SearchIcon() {
    return <Search />;
}

const SearchBar: React.FC = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const setSearch = useSetRecoilState(searchState);

    const handleSearch = () => {
        setSearch(prev => ({
            ...prev,
            keyword: searchKeyword
        }));
    }

    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    return (
        <TextField
            fullWidth
            placeholder={"検索"}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleEnterKeyPress}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position={"end"}>
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />
    )
}

export default SearchBar;
