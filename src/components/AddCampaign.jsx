import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCampaigns } from "../store/campaignSlice";
import './AddCampaign.css'

export default function AddCampaign({ onClose }) {
    const dispatch = useDispatch();
    const campaigns = useSelector(state => state.campaigns.items);
    const users = useSelector(state => state.users.items)

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
        // if (!formData.userId) {
        //     newErrors.userId = 'Please select  user id'
        // }

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
        onClose();

    };

    const userOptions = Object.entries(users).map(([id, name]) => (
        <option key={id} value={id}>{name}</option>
    ));

    return (
        <div>
            <h1>Add Campaign</h1>
            <button onClick={onClose}>&times;</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="camp-name">Camp Name</label>
                    <input
                        id="camp-name"
                        type="text"
                        placeholder="Enter Campaign name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="camp-start">Start Date</label>
                    <input
                        id="camp-start"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                    />
                    {errors.startDate && <span>{errors.startDate}</span>}
                </div>
                <div>
                    <label htmlFor="camp-end">End date</label>
                    <input
                        id="camp-end"
                        type="date"

                        value={formData.endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                    />
                    {errors.endDate && <span>{errors.endDate}</span>}
                </div>
                <div>
                    <label htmlFor="camp-budget">Camp Budget</label>
                    <input
                        id="camp-budget"
                        type="number"

                        placeholder="Enter Campaign name"
                        value={formData.Budget}
                        onChange={(e) => handleChange('Budget', e.target.value)}
                    />
                    {errors.Budget && <span>{errors.Budget}</span>}
                </div>
                <div>
                    <label htmlFor="camp-user">User Name</label>
                    {/* <select
                        id="camp-user"
                        value={formData.userId}
                        onChange={(e) => handleChange('userId', e.target.value)}
                    >
                        <option value="">Select User..</option>
                        {userOptions}
                    </select> */}
                    <input
                        id="user-name"
                        type="number"
                        placeholder="Enter User Id"
                        value={formData.userId}
                         onChange={(e) => handleChange('userId', e.target.value)}
                   
                    />
                    {errors.userId && <span>{errors.userId}</span>}
                </div>
                <button type='button' onClick={onClose}>Cancel</button>
                <button type="submit">Add Campaign</button>
            </form>
        </div>
    )

}