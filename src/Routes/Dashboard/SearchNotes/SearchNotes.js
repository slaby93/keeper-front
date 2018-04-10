import React from 'react';
import styled from 'styled-components';
import { Popover, Button } from 'antd';
import SearchBox from './SearchBox';
export class SearchNotes extends React.PureComponent {
	render() {
		return (
			<Popover placement="left" content={<SearchBox />}>
				<SearchButton type="primary" shape="circle" icon="search" size="large" />
			</Popover>
		);
	}
}

const SearchButton = styled(Button)`
	--distance: 5%;
	position: fixed;
	top: calc(2*var(--distance));
	right: var(--distance);
	z-index: 123;
`;

export default SearchNotes;
