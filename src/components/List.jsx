import { useSelector } from "react-redux"
import { CAMPAIGN_DATA } from "../../data"
import './list.css'
import { useMemo, useState, useEffect } from "react";


//format function for budget as USD
function formatUSD(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
};

//Date string to date object Parser
function dateParser(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr);
}

//Helper function if campaign is active or not
const isActive = (startDate, endDate) => {
    const today = new Date();
    const start = dateParser(startDate);
    const end = dateParser(endDate);
    if (!start || !end) return false;
    return start <= today && end >= today
}


export default function List() {

    const campaigns = useSelector(state => state.campaigns.items);
    const users = useSelector(state => state.users.items);
    const nameFilter = useSelector(state => state.filters.name);
    const startDateFilter = useSelector(state => state.filters.startDate);
    const endDateFilter = useSelector(state => state.filters.endDate);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    //reseting current page to 1 whenever filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [nameFilter, startDateFilter, endDateFilter]);


    const filteredCampaigns = useMemo(() => {

        let filteredList = [...campaigns];

        if (nameFilter && nameFilter.trim().length > 0) {
            filteredList = filteredList.filter((camp) =>
                camp.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        //date range filter - shows campaigns if it fall between the range
        if (startDateFilter) {
            const filterStart = new Date(startDateFilter);

            //applying endDate filter if it is >= startdate
            if (endDateFilter) {
                const filterEnd = new Date(endDateFilter);
                if (filterEnd >= filterStart) {
                    //showing compaign if date range overlaps with filtered range
                    filteredList = filteredList.filter(camp => {
                        const campStart = dateParser(camp.startDate);
                        const campEnd = dateParser(camp.endDate);
                        if (!campEnd || !campStart) return true;
                        //campaig end after filter start and campaign starts before filter ends
                        return campEnd >= filterStart && campStart <= filterEnd
                    });
                }
            } else {
                //only start date, shows campaign that ends on or after this date
                filteredList = filteredList.filter(camp => {
                    const campEnd = dateParser(camp.endDate);
                    if (!campEnd) return true;
                    return campEnd >= filterStart;
                })
            }
        } else if (endDateFilter) {
            //only end date -shows campagn that start on or before this date
            const filterEnd = new Date(endDateFilter);
            filteredList = filteredList.filter(camp => {
                const campStart = dateParser(camp.startDate);
                if (!campStart) return true;
                return campStart <= filterEnd;
            })
        }

        return filteredList;

    }, [campaigns, nameFilter, startDateFilter, endDateFilter]);

    const paginatedCampaigns = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCampaigns, currentPage]);

    const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

    const getUserName = (userId) => {
        return users[userId] || "Unknown User";
    }


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Campaign Name</th>
                        <th>User Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Active</th>
                        <th>Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {filteredCampaigns.length === 0 ? ( */}
                    {paginatedCampaigns.length === 0 ? (
                        <tr key='empty-list'>
                            <td colSpan='6' style={{ textAlign: 'center' }}>
                                No Campaigns Found
                            </td>
                        </tr>
                    ) : (
                        // filteredCampaigns.map(camp => {
                        paginatedCampaigns.map(camp => {
                            const active = isActive(camp.startDate, camp.endDate);
                            return (
                                <tr key={camp.id}>
                                    <td>{camp.name}</td>
                                    <td>{getUserName(camp.userId)}</td>
                                    <td>{camp.startDate}</td>
                                    <td>{camp.endDate}</td>
                                    <td>
                                        <div>
                                            <div className={active ? 'status-dot green' : 'status-dot red'}></div>
                                            <span className={active ? 'status-text green' : 'status-text red'}>
                                                {active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>

                                    </td>
                                    <td>{formatUSD(camp.Budget)}</td>
                                </tr>
                            )
                        })
                    )
                    }

                </tbody>
            </table>

            {filteredCampaigns.length > 0 && (
                <div>
                    <button
                    onClick={() => setCurrentPage(prev => Math.max(prev-1,1))}
                    disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                    onClick={() => setCurrentPage(prev => Math.min(prev+1,totalPages))}
                    disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

        </>
    )
}