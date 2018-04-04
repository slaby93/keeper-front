import React from 'react';
import styled, { css } from 'styled-components';
import AddNoteModal from './AddNoteModal';
import SearchNotes from './SearchNotes';
import NotesBoard from './NotesBoard';

export const Dashboard = ({className}) => {
	return (
		<div className={className}>
			<SearchNotes />
			<AddNoteModal />
			<NotesBoard />
		</div>
	);
};

const StyledDashboard = styled(Dashboard)`
	background-color: #ececec;
	min-height: 100vh;
`

export default StyledDashboard;
