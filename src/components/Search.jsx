import { useDispatch, useSelector } from 'react-redux'
import './Search.css'
import { changeName, changeStartDate, changeEndDate } from '../store/filterSlice';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
export default function Search() {

    const dispatch = useDispatch();
    const startDate = useSelector(state => state.filters.startDate);
    const endDate = useSelector(state => state.filters.endDate);

    const [searchText, setSearchText] = useState('');

    const debounedSearch = useDebounce(searchText);

    useEffect(() => {
        dispatch(changeName(debounedSearch));
    }, [debounedSearch, dispatch])

    const isDateError = startDate && endDate && new Date(endDate) < new Date(startDate);

    return (
        <div className='search-container'>
            <div className='search-field'>

                <input
                    id='filter-start'
                    type="date"
                    className='search-input'

                    onChange={(event) => dispatch(changeStartDate(event.target.value))}
                />
            </div>
            <div className='search-field'>
                <input
                    id='filter-end'
                    type="date"
                    className={`search-input ${isDateError ? 'input-error' : ''}`}

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
        </div>
    )
}