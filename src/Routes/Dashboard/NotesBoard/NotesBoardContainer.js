import React from 'react';
import NotesBoard from './NotesBoard';
import { graphql, compose, Query, withApollo } from 'react-apollo';
import Noty from 'noty';
import GET_NOTES from './../../../queries/GET_NOTES.query.gql';
import REMOVE_NOTE from './../../../queries/REMOVE_NOTE.mutation.gql';
import GET_FILTERS from './../../../queries/GET_FILTERS.local.query.gql';
export class NotesBoardContainer extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			isModalVisible: false,
			modalData: null,
			isLoading: false
		};
	}

	onNoteClick = noteID => {
		this.setState({
			isModalVisible: true,
			noteID
		});
	};

	onNoteRemove = async id => {
		const { removeNote } = this.props;
		this.setState({
			isLoading: true
		});

		try {
			await removeNote({
				variables: {
					id: parseFloat(id)
				},
				/**
				 * Example of mutation in which we requery all Notes
				 */
				refetchQueries: [{ query: GET_NOTES }]
			});
		} catch (error) {
			new Noty({
				type: 'error',
				theme: 'metroui',
				timeout: 1500,
				text: 'Error occured :('
			}).show();
		} finally {
			this.setState({
				isLoading: false
			});
		}
	};

	toggleModal = data => {
		const { isModalVisible } = this.state;
		this.setState({
			isModalVisible: !isModalVisible,
			modalData: data || null
		});
	};

	render() {
		const { isModalVisible, noteID, isLoading } = this.state;
		const { filters: { filterByTitle = null, filterByState = null } } = this.props;
		
		return (
			<Query query={GET_NOTES} variables={{title: filterByTitle, state: filterByState}}>
				{
					({ data: { noteSearch }, loading }) => {
						return (
							<NotesBoard
								isLoading={isLoading || loading}
								toggleModal={this.toggleModal}
								onNoteClick={this.onNoteClick}
								onNoteRemove={this.onNoteRemove}
								isModalVisible={isModalVisible}
								noteID={noteID}
								notesList={noteSearch}
							/>
						)
					}
				}
			</Query>
		)
	}
}

export default compose(
	graphql(GET_FILTERS, { name: 'filters' }),
	graphql(GET_NOTES, { name: 'notes' }),
	graphql(REMOVE_NOTE, { name: 'removeNote' }))(withApollo(NotesBoardContainer));
