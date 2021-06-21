import React, { Component } from 'react';
import { getsubClubs } from '../api/apiCall';
import LoginNavbar from './browse_navbar';
import Sidebar from './browse_sidebar';

class Browse extends Component {
	state = { subClubs: [], currentPage: 1, clubsPerPage: 6 };
	componentDidMount() {
		getsubClubs().then((response) => {
			response.reverse();
			this.setState({ subClubs: response });
		});
	}

	routeChange = (id) => {
		let path = '/clubs/' + id;
		this.props.history.push(path);
	};

	render() {
		const { currentPage, clubsPerPage, subClubs } = this.state;

		const indexOfLastPost = currentPage * clubsPerPage;
		const indexOfFirstPost = indexOfLastPost - clubsPerPage;
		const currentClubs = subClubs.slice(indexOfFirstPost, indexOfLastPost);
		const active = ' active';
		const disabled = ' disabled';

		const paginate = (pageNum) => this.setState({ currentPage: pageNum });

		const nextPage = () => this.setState({ currentPage: currentPage + 1 });

		const prevPage = () => this.setState({ currentPage: currentPage - 1 });

		const pageNumbers = [];

		for (let i = 1; i <= Math.ceil(subClubs.length / clubsPerPage); i++) {
			pageNumbers.push(i);
		}
		return (
			<div
				style={{
					display: 'block',
					width: '100vw',
					minHeight: '100vh',
					height: '100%',
					backgroundColor: '#21104A',
				}}
			>
				<div className='container'>
					<LoginNavbar
						handleLog={this.props.handleLog}
						loginStatus={this.props.loginStatus}
					></LoginNavbar>
					<div className='row justify-content-center'>
						<div className='col-4'>
							<Sidebar />
						</div>
						<div className='col-8'>
							<div>
								<div className='container row' style={{ marginTop: '100px' }}>
									{currentClubs.map((element) => {
										return (
											<div
												className='card text-white bg-dark'
												id={element.subClubId}
												key={'parent' + element.subClubId}
												style={{
													width: '13rem',
													marginLeft: '20px',
													marginBottom: '30px',
													borderRadius: '10px',
													cursor: 'pointer',
													border: '0px',
												}}
												onClick={() => this.routeChange(element.subClubId)}
											>
												<img
													src={element.image}
													style={{
														borderRadius: '10px',
														borderBottomLeftRadius: '0px',
														borderBottomRightRadius: '0px',
														maxwidth: '13rem',
														maxheight: '300px',
													}}
													className='card-img-top'
													alt='...'
													key={'img' + element.subClubId}
												/>
												<div
													className='card-body'
													key={'div' + element.subClubId}
												>
													<h5
														className='card-title'
														key={'h5' + element.subClubId}
													>
														{element.name}
													</h5>
													<p
														className='card-text'
														key={'p' + element.subClubId}
													>
														{element.description}
													</p>
												</div>
											</div>
										);
									})}
								</div>
								<div
									className='container row justify-content-end'
									style={{ bottom: '20px', right: '365px', position: 'fixed' }}
								>
									<nav>
										<ul className='pagination  bg-dark text-white'>
											<li className='page-item bg-dark text-white'>
												<a
													className='page-link bg-dark text-white'
													href='#'
													onClick={() => prevPage()}
												>
													Previous
												</a>
											</li>
											{pageNumbers.map((num) => (
												<li className='page-item bg-dark text-white' key={num}>
													<a
														onClick={() => paginate(num)}
														href='#'
														className='page-link bg-dark text-white'
													>
														{num}
													</a>
												</li>
											))}
											<li className='page-item bg-dark text-white'>
												<a
													className='page-link bg-dark text-white'
													href='#'
													onClick={() => nextPage()}
												>
													Next
												</a>
											</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Browse;
