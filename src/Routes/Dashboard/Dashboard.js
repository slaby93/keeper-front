import React from 'react';
import AddNoteModal from './AddNoteModal';
import SearchNotes from './SearchNotes';
import NotesBoard from './NotesBoard';

export const Dashboard = () => {
	return (
		<div>
			<SearchNotes />
			<AddNoteModal />
			<NotesBoard />
		</div>
	);
};

export default Dashboard;
