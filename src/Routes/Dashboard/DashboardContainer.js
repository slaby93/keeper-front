import React from 'react';
import Dashboard from './Dashboard';

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
