import { useSelector } from "react-redux"
import { CAMPAIGN_DATA } from "../../data"
import './list.css'
import { useMemo, useState, useEffect } from "react";
import Button from "@mui/material/Button";



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




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
                        return campEnd <= filterEnd && campStart >= filterStart
                    });
                }else {
                    filteredList = [];
                }

            } else {
                //only start date, shows campaign that ends on or after this date
                filteredList = filteredList.filter(camp => {
                    const campStart = dateParser(camp.startDate);
                    if (!campStart) return true;
                    return campStart >= filterStart;
                })
            }
        } 


        return filteredList;

    }, [campaigns, nameFilter, startDateFilter, endDateFilter]);
    console.log("List")

    const paginatedCampaigns = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCampaigns, currentPage]);

    const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

    const getUserName = (userId) => {
        return users[userId] || "Unknown User";
    }


    return (
        <div className="container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell ><span className="head" >Campaign name</span></TableCell>
                            <TableCell align="right"><span className="head" >User Name</span></TableCell>
                            <TableCell align="right"><span className="head" >Start Date</span></TableCell>
                            <TableCell align="right"><span className="head" >End date</span></TableCell>
                            <TableCell align="center"><span className="head" >Active</span></TableCell>
                            <TableCell align="right"><span className="head" >Budget</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCampaigns.length === 0 ? (
                            <TableRow
                                key="empty-list">
                                <TableCell> No Campaign Found</TableCell>
                            </TableRow>
                        ) : (
                            paginatedCampaigns.map(camp => {
                                const active = isActive(camp.startDate, camp.endDate);
                                return (
                                    <TableRow
                                        key={camp.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >
                                            {camp.name}
                                        </TableCell>
                                        <TableCell align="right">{getUserName(camp.userId)}</TableCell>
                                        <TableCell align="right">{camp.startDate}</TableCell>
                                        <TableCell align="right">{camp.endDate}</TableCell>
                                        <TableCell >
                                            <div className="status">
                                                <div className={active ? 'dot-green' : 'dot-red'}></div>
                                                <span className={active ? 'green' : 'red'}>
                                                    {active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>

                                        </TableCell>
                                        <TableCell align="right">{formatUSD(camp.Budget)}</TableCell>
                                    </TableRow>
                                )
                            }))}
                    </TableBody>
                </Table>
            </TableContainer>

            {filteredCampaigns.length > 0 && (
                <div className="change-page">
                    <Button variant="contained"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button variant="contained"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}

        </div>
    )
}