import React from 'react';
import './pointsTable.css';
import '../../assets/utils/utils.css';
import PtsTable from './components/PtsTable';

function PointsTable() {
    return (
        <div className="PointsTable">
            <PtsTable title="Group A" />
            <PtsTable title="Group B" />
            <PtsTable title="Group 1" />
            <PtsTable title="Group 2" />
        </div>
    );
}

export default PointsTable;