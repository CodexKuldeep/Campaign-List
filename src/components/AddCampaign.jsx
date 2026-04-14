import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCampaigns } from "../store/campaignSlice";
import './AddCampaign.css'
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";


export default function AddCampaign() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const campaigns = useSelector(state => state.campaigns.items);


    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        Budget: '',
        userId: '',
    });

    const [errors, setErrors] = useState({});

    function handleChange(field, value) {
        setFormData(prev => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    }

    //Validation
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Campaign name is required'
        }
        if (!formData.startDate) {
            newErrors.startDate = 'Start Date is required'
        }
        if (!formData.endDate) {
            newErrors.endDate = 'End Date is required'
        }
        if (formData.startDate && formData.endDate) {
            if (new Date(formData.startDate) > new Date(formData.endDate)) {
                newErrors.endDate = 'End Date mst be after start date'
            }
        }
        if (!formData.Budget || Number(formData.Budget) <= 0) {
            newErrors.Budget = 'Budget Must be zero or more'
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    //
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!validate()) return;

        //generating new id based o exixting compaign
        const nextId = campaigns.length > 0 ?
            Math.max(...campaigns.map(c => c.id)) + 1 : 1;

        const newCampaign = {
            id: nextId,
            name: formData.name.trim(),
            startDate: formatDate(formData.startDate),
            endDate: formatDate(formData.endDate),
            Budget: Number(formData.Budget),
            userId: Number(formData.userId),
        }

        dispatch(addCampaigns([newCampaign]));
        navigate("/")

    };


    return (
        <div className="add-container">
            <h1>Add Campaign</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <TextField
                        error={errors.name}
                        id="outlined-error-helper-text"
                        label="Camp Name"
                        helperText={errors.name}
                        type="text"
                        placeholder="Enter Campaign name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <label htmlFor="">Start Date</label>
                    <TextField
                        className="txt"
                       error={errors.startDate}
                        id="outlined-error-helper-text"
                        // label="Camp Name"
                        helperText={errors.startDate}
                        variant="outlined"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)} />
                    <label htmlFor="">End Date</label>
                    <TextField
                        className="txt"
                         error={errors.endDate}
                        id="outlined-error-helper-text"
                        helperText={errors.endDate}
                        variant="outlined"
                        type="date"

                        value={formData.endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)} />
                    <TextField
                        className="txt"
                       error={errors.Budget}
                        id="outlined-error-helper-text"
                        helperText={errors.Budget}
                        label="Camp Budget"
                        variant="outlined"
                        type="number"
                        placeholder="Enter Campaign name"
                        value={formData.Budget}
                        onChange={(e) => handleChange('Budget', e.target.value)}
                    />
                    <TextField
                        className="txt"
                        id="outlined-basic"
                        label="User Id"
                        variant="outlined"
                        type="number"
                        placeholder="Enter User Id"
                        value={formData.userId}
                        onChange={(e) => handleChange('userId', e.target.value)}
                    />
                </div>
                <Link to="/">
                    <Button
                        variant="outlined"
                        color="error"
                        type='button' >
                        Cancel
                    </Button>
                </Link>

                <Button
                    variant="contained"
                    color="success"
                    type="submit">
                    Add Campaign
                </Button>

            </form>
        </div>
    )

}