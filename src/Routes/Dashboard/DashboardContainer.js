import React from 'react';
import Dashboard from './Dashboard';
import Noty from 'noty';

export class DashboardContainer extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			isModalVisible: false
		};
	}

	toggleModal = () => {
		const { isModalVisible } = this.state;
		this.setState({
			isModalVisible: !isModalVisible
		});
	};

	onAddNoteModalSubmit = () => {
		console.log('onSubmit', 123);
		new Noty({
			type: 'success',
			theme: 'metroui',
			timeout: 1500,
			text: 'Some notification text'
		}).show();
		this.toggleModal();
	};

	render() {
		const { isModalVisible } = this.state;
		return (
			<Dashboard
				toggleModal={this.toggleModal}
				onAddNoteModalSubmit={this.onAddNoteModalSubmit}
				isModalVisible={isModalVisible}
			/>
		);
	}
}

export default DashboardContainer;
