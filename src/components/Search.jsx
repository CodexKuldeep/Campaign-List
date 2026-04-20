import { useDispatch, useSelector } from 'react-redux'
import './Search.css'
import { changeName, changeStartDate, changeEndDate } from '../store/filterSlice';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import CloseIcon from '@mui/icons-material/Close';
export default function Search() {

    const dispatch = useDispatch();
    const startDate = useSelector(state => state.filters.startDate);
    const endDate = useSelector(state => state.filters.endDate);
    
    const [searchText, setSearchText] = useState('');

    const debounedSearch = useDebounce(searchText);

    useEffect(() => {
        
        dispatch(changeName(debounedSearch));
    }, [debounedSearch, dispatch]);

    function clearHandle() {
        console.log("Hello")
        dispatch(changeEndDate(null));
        dispatch(changeStartDate(null))
    }

    console.log("search ")

    return (
        <div className='search-container'>
            <div className='search-field'>

                <input
                    id='filter-start'
                    type="date"
                    className='search-input'
                    placeholder="dd-mm-yyyy"
                    value={startDate || ""}
                    onChange={(event) => dispatch(changeStartDate(event.target.value))}
                />
            </div>
            <div className='search-field'>
                <input
                    id='filter-end'
                    type="date"
                    className='search-input'
                    placeholder="dd-mm-yyyy"
                    value={endDate || ""}
                    disabled={startDate === null}
                    onChange={(event) => dispatch(changeEndDate(event.target.value))}
                />
            </div>
            <div className='search-field'>

                <input
                    id='search-name'
                    type="text"
                    className='search-input'
                    placeholder='Search by coampaign name...'
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />
            </div>
            <div className="cross-btn">
                <CloseIcon
                    onClick={clearHandle}
                />
            </div>
        </div>
    )
}