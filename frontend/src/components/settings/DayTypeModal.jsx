import React, {useEffect, useRef, useState} from 'react';
import {toast} from "react-toastify";
import {useApi} from '../../hooks/useApi';
import './DayTypeModal.css'; // Import the CSS file

const DayTypeModal = ({ isOpen, onClose, editingDayType }) => {
    const [dayTypeData, setDayTypeData] = useState({
        name: '',
        identifier: '',
        color: '',
    });
    const modalContentRef = useRef(null);
    const { apiCall } = useApi();

    useEffect(() => {
        if (editingDayType) {
            setDayTypeData({
                name: editingDayType.name,
                identifier: editingDayType.identifier,
                color: editingDayType.color,
            });
        }
    }, [editingDayType]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const method = editingDayType ? 'PUT' : 'POST';
        const url = editingDayType ? `/daytypes/${editingDayType._id}` : `/daytypes`;

        try {
            await apiCall(url, method, dayTypeData);
            onClose(); // Close the modal and refresh the day types list
        } catch (error) {
            console.error('Error saving day type:', error);
            toast.error('Error saving day type');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDayTypeData({ ...dayTypeData, [name]: value });
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content" ref={modalContentRef}>
                <form onSubmit={handleFormSubmit}>
                    <input
                        autoFocus={true}
                        type="text"
                        name="name"
                        value={dayTypeData.name}
                        onChange={handleChange}
                        placeholder="Day Type Name"
                        required
                    />
                    <input
                        type="text"
                        name="identifier"
                        value={dayTypeData.identifier}
                        onChange={handleChange}
                        placeholder="Day Type Identifier"
                        required
                    />
                    <div className="color-input-container">
                        <input
                            type="text"
                            name="color"
                            value={dayTypeData.color}
                            onChange={handleChange}
                            placeholder="Day Type Color"
                        />
                        <input
                            type="color"
                            name="color"
                            value={dayTypeData.color}
                            onChange={handleChange}
                            className="color-picker"
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit">{editingDayType ? 'Update' : 'Add'} Day Type</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DayTypeModal;
