import React, { Component } from 'react';
import {
	getUser,
	getReports,
	getadminRequests,
	getclubRequests,
	deleteAdminreq,
	makesubadmin,
	banUser,
	deleteReport,
	createsubClub,
	createClub,
} from '../api/apiCall.js';

class Content extends Component {
	state = {
		down: true,
		isInSameClub: 1,
		postId: '',
		reports: [],
		admin_requests: [],
		club_requests: [],
		image: '',
	};

	componentDidMount() {
		getadminRequests().then((response) => {
			this.setState({ admin_requests: response });
		});
		getclubRequests().then((response1) => {
			this.setState({ club_requests: response1 });
		});
		getReports().then((response2) => {
			this.setState({ reports: response2 });
		});
	}

	changeDown = () => {
		if (this.state.down === true) this.setState({ down: false });
		else this.setState({ down: true });
	};

	goBack = () => {
		window.history.back();
	};

	givePostId = (postId) => {
		this.setState({ postId });
	};

	onChange = (data) => {
		this.setState({
			image: data.target.value,
		});
	};

	aboutEdit = () => {
		let about = {
			id: this.props.userId,
			about: this.state.about,
		};
		let user = this.state.user[0];
		user.about = this.state.about;
		this.setState({ user: [user] });
		userAbout(about);
	};

	makeAdmin = (user, club, subclub, id) => {
		let admin = {
			user: user,
			club: club,
			subClub: subclub,
		};
		makesubadmin(admin);
		this.deleteadminRequest(id);
	};

	deleteadminRequest = (id) => {
		let list = this.state.admin_requests;
		for (let i = 0; i < this.state.admin_requests.length; i++) {
			if (this.state.admin_requests[i].id === id) {
				list.splice(i, 1);
			}
		}
		this.setState({ admin_requests: list });
		deleteAdminreq(id);
	};

	delete_Report = (id) => {
		let reports = this.state.reports;
		for (let i = 0; i < reports.length; i++) {
			if (reports[i].id === id) {
				reports.splice(i, 1);
			}
		}
		this.setState(reports);
		deleteReport(id);
	};

	ban_User = (user, reason, id) => {
		let ban = {
			user: user,
			club: parseInt(this.state.Club[0].parentId),
			subClub: this.props.match.params.clubID,
			banDuration: 5,
			banReason: reason,
		};
		this.delete_Report(id);
		banUser(ban);
	};

	create_subclub = (name, club, desc) => {
		let sclub = {
			adminId: 1,
			creatorId: 1,
			description: desc,
			parentId: club,
			name: name,
			image: this.state.image,
			rating: 0,
			reviews: 0,
		};
		createsubClub(sclub);
	};

	render() {
		if (this.state.isInSameClub) {
			return (
				<div className='container row' style={{ marginTop: '100px' }}>
					<div className='col'>
						<h5 className='text-white'>Admin Requests</h5>
						<br></br>
						{this.state.admin_requests.map((element) => {
							let target = '#Collapse' + element.id;
							let heading = 'heading' + element.id;
							let downclass = 'fa fa-angle-double-down';
							let upclass = 'fa fa-angle-double-up';
							let finalclass = this.state.down === false ? upclass : downclass;
							let comment_counter = 1;

							return (
								<div
									id='accordion'
									key={element.id}
									style={{ marginBottom: '20px' }}
								>
									<div className='card text-white bg-warning'>
										<div className='card-header' id={heading}>
											<h5 className='mb-0 text-white'>
												{element.reason + ' '}
											</h5>
											<i
												className={finalclass}
												aria-hidden='true'
												data-toggle='collapse'
												data-target={target}
												aria-expanded='true'
												aria-controls={'Collapse' + element.id}
												style={{
													cursor: 'pointer',
													position: 'absolute',
													right: '10px',
													bottom: '10px',
												}}
												onClick={
													(this.changeDown, () => this.givePostId(element.id))
												}
											></i>
										</div>

										<div
											id={'Collapse' + element.id}
											className='collapse'
											aria-labelledby={heading}
											data-parent='#accordion'
										>
											<div>
												<i
													className='btn btn-primary'
													aria-hidden='true'
													style={{
														marginLeft: '20px',
														marginBottom: '10px',
														cursor: 'pointer',
													}}
													onClick={() =>
														this.makeAdmin(
															element.userId,
															element.clubId,
															element.subClubId,
															element.id
														)
													}
												>
													Make Admin
												</i>
												<i
													className='btn btn-primary'
													aria-hidden='true'
													style={{
														marginLeft: '10px',
														marginBottom: '10px',
														cursor: 'pointer',
													}}
													onClick={() => this.deleteadminRequest(element.id)}
												>
													Delete Request
												</i>
											</div>
											<div></div>
										</div>
									</div>
								</div>
							);
						})}
						<h5 className='text-white'>Reports</h5>
						{this.state.reports.map((report) => {
							let target = '#Collapse' + report.id;
							let heading = 'heading' + report.id;
							let downclass = 'fa fa-angle-double-down';
							let upclass = 'fa fa-angle-double-up';
							let finalclass = this.state.down === false ? upclass : downclass;
							let comment_counter = 1;

							return (
								<div
									id='accordion'
									key={report.id}
									style={{ marginBottom: '20px' }}
								>
									<div class='card text-white bg-danger mb-3'>
										<div class='card-header' id={heading}>
											<h5 className='mb-0 text-white'>
												Report for Post #{report.targetPost}
											</h5>
											<i
												className={finalclass}
												aria-hidden='true'
												data-toggle='collapse'
												data-target={target}
												aria-expanded='true'
												aria-controls={'Collapse' + report.id}
												style={{
													cursor: 'pointer',
													position: 'absolute',
													right: '10px',
													bottom: '10px',
												}}
												onClick={
													(this.changeDown, () => this.givePostId(report.id))
												}
											></i>
										</div>
										<div
											id={'Collapse' + report.id}
											className='collapse'
											aria-labelledby={heading}
											data-parent='#accordion'
										>
											<div>
												<a
													href={
														'http://localhost:3000/user/' + report.reporterId
													}
												>
													Reporting User
												</a>
											</div>
											Reason: {report.reason}
											<div>
												<button
													className='btn btn-primary mr-3 mt-3'
													onClick={() =>
														this.ban_User(
															report.targetId,
															report.reason,
															report.id
														)
													}
												>
													Ban User
												</button>
												<button
													className='btn btn-primary mt-3'
													onClick={() => this.delete_Report(report.id)}
												>
													Delete Report
												</button>
											</div>
										</div>
									</div>
								</div>
							);
						})}
						<h5 className='text-white'>Club Requests</h5>
						{this.state.club_requests.map((element) => {
							let target = '#Collapse' + element.id;
							let heading = 'heading' + element.id;
							let downclass = 'fa fa-angle-double-down';
							let upclass = 'fa fa-angle-double-up';
							let event = element.isEvent;
							let cardclass =
								event === 0
									? 'card text-white bg-dark'
									: ' card text-white bg-success';
							let finalclass = this.state.down === false ? upclass : downclass;
							let comment_counter = 1;

							return (
								<div
									id='accordion'
									key={element.id}
									style={{ marginBottom: '20px' }}
								>
									<div className={cardclass}>
										<div className='card-header' id={heading}>
											<h5 className='mb-0'>
												{element.subClubName +
													' club suggestion. (' +
													element.allUsers.length +
													')'}
											</h5>
											<i
												className={finalclass}
												aria-hidden='true'
												data-toggle='collapse'
												data-target={target}
												aria-expanded='true'
												aria-controls={'Collapse' + element.id}
												style={{
													cursor: 'pointer',
													position: 'absolute',
													right: '10px',
													bottom: '10px',
												}}
												onClick={
													(this.changeDown, () => this.givePostId(element.id))
												}
											></i>
										</div>

										<div
											id={'Collapse' + element.id}
											className='collapse'
											aria-labelledby={heading}
											data-parent='#accordion'
										>
											<div
											// className='card-body'
											// dangerouslySetInnerHTML={{ __html: element.text }}
											></div>
											<div>
												<i
													className='btn btn-sm btn-primary'
													aria-hidden='true'
													style={{
														marginLeft: '20px',
														marginBottom: '10px',
														marginTop: '10px',
														cursor: 'pointer',
													}}
													data-toggle='modal'
													data-target={'#modal' + element.id}
												>
													Create Club
												</i>
												<i
													className='fa fa-flag'
													aria-hidden='true'
													style={{
														marginLeft: '10px',
														marginBottom: '10px',
														cursor: 'pointer',
													}}
													data-toggle='modal'
													data-target={'#modal1' + element.id}
												></i>
												<i
													className='fa fa-share-alt'
													aria-hidden='true'
													style={{
														marginLeft: '10px',
														marginBottom: '10px',
														cursor: 'pointer',
													}}
												></i>

												<div
													className='modal fade '
													id={'modal' + element.id}
													tabIndex='-1'
													role='dialog'
													aria-labelledby='exampleModalLabel'
													aria-hidden='true'
												>
													<div
														className='modal-dialog bg-dark'
														style={{ borderRadius: '10px' }}
														role='document'
													>
														<div
															className='modal-content bg-dark'
															style={{ borderRadius: '10px' }}
														>
															<div
																className='modal-header'
																style={{ border: '0px' }}
															>
																<h5
																	className='modal-title'
																	id='exampleModalLabel'
																>
																	Club Creation
																</h5>
																<button
																	type='button'
																	className='close'
																	data-dismiss='modal'
																	aria-label='Close'
																	style={{ color: 'white' }}
																>
																	<span aria-hidden='true'>&times;</span>
																</button>
															</div>
															<div
																className='modal-body'
																style={{
																	maxHeight: '700px',
																	scrollBehavior: 'smooth',
																	overflow: 'auto',
																}}
															>
																<br></br>
																<h5 className='text-white'>
																	Subclub name and other information will be
																	taken from the request automatically.
																</h5>
																<br></br>

																<input
																	type='text'
																	className='form-control'
																	onChange={(e) => this.onChange(e)}
																	defaultValue=''
																	aria-label='Club Image'
																	placeholder='Club Image Link Here'
																></input>
															</div>
															<div className='modal-footer'>
																<button
																	type='button'
																	className='btn btn-outline-success'
																	onClick={() =>
																		this.create_subclub(
																			element.subClubName,
																			element.clubId,
																			element.suggestion
																		)
																	}
																>
																	Create SubClub
																</button>
															</div>
														</div>
													</div>
												</div>
												<div
													className='modal fade'
													id={'modal1' + element.id}
													tabIndex='-1'
													role='dialog'
													aria-labelledby='exampleModalLabel'
													aria-hidden='true'
												>
													<div
														className='modal-dialog bg-dark'
														style={{ borderRadius: '10px' }}
														role='document'
														role='document'
													>
														<div
															className='modal-content bg-dark'
															style={{ borderRadius: '10px' }}
														>
															<div
																className='modal-header'
																style={{ border: '0px' }}
															>
																<h5
																	className='modal-title'
																	id='exampleModalLabel'
																>
																	Report
																</h5>
																<button
																	type='button'
																	className='close'
																	data-dismiss='modal'
																	aria-label='Close'
																	style={{ color: 'white' }}
																>
																	<span aria-hidden='true'>&times;</span>
																</button>
															</div>
															<div className='modal-body'>
																<input
																	type='text'
																	className='form-control'
																	onChange={(e) => this.onChange(e)}
																	defaultValue=''
																	placeholder='Please state your reason briefly.'
																></input>
															</div>
															<div className='modal-footer'>
																<button
																	type='button'
																	className='btn btn-outline-danger'
																	data-dismiss='modal'
																	onClick={() =>
																		this.reportUser(
																			element.authorId,
																			element.id
																		)
																	}
																>
																	Report User
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div></div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			);
		} else if (this.state.isInSameClub)
			return (
				<div className='container row' style={{ marginTop: '100px' }}>
					<div className='col-9'>
						{this.state.Posts.map((element) => {
							let target = '#Collapse' + element.postId;
							let heading = 'heading' + element.postId;
							let downclass = 'fa fa-angle-double-down';
							let upclass = 'fa fa-angle-double-up';
							let event = element.isEvent;
							let cardclass =
								event === 0
									? 'card text-white bg-dark'
									: ' card text-white bg-success';
							let finalclass = this.state.down === false ? upclass : downclass;
							let comment_counter = 1;

							return (
								<div
									id='accordion'
									key={element.postId}
									style={{ marginBottom: '20px' }}
								>
									<div className={cardclass}>
										<div className='card-header' id={heading}>
											<h5 className='mb-0'>{element.title + ' '}</h5>
											<i
												className={finalclass}
												aria-hidden='true'
												data-toggle='collapse'
												data-target={target}
												aria-expanded='true'
												aria-controls={'Collapse' + element.postId}
												style={{
													cursor: 'pointer',
													position: 'absolute',
													right: '10px',
													bottom: '10px',
												}}
												onClick={
													(this.changeDown,
													() => this.givePostId(element.postId))
												}
											></i>
										</div>

										<div
											id={'Collapse' + element.postId}
											className='collapse'
											aria-labelledby={heading}
											data-parent='#accordion'
										>
											<div
											// className='card-body'
											// dangerouslySetInnerHTML={{ __html: element.text }}
											>
												<MuiThemeProvider
													theme={
														element.isEvent == 0 ? defaultTheme : eventTheme
													}
													key={'muitheme' + element.postId}
												>
													<MUIRichTextEditor
														defaultValue={this.convertToDraft(element.text)}
														readOnly={true}
														toolbar={false}
														key={'mui' + element.postId}
													/>
												</MuiThemeProvider>
											</div>
											<div>
												<i
													className='fa fa-comments'
													aria-hidden='true'
													style={{
														marginLeft: '20px',
														marginBottom: '10px',
														cursor: 'pointer',
													}}
													data-toggle='modal'
													data-target={'#modal' + element.postId}
												></i>
												<i
													className='fa fa-flag'
													aria-hidden='true'
													style={{
														marginLeft: '10px',
														marginBottom: '10px',
														cursor: 'pointer',
													}}
													data-toggle='modal'
													data-target={'#modal1' + element.postId}
												></i>
												<i
													className='fa fa-share-alt'
													aria-hidden='true'
													style={{
														marginLeft: '10px',
														marginBottom: '10px',
														cursor: 'pointer',
													}}
												></i>

												<div
													className='modal fade '
													id={'modal' + element.postId}
													tabIndex='-1'
													role='dialog'
													aria-labelledby='exampleModalLabel'
													aria-hidden='true'
												>
													<div
														className='modal-dialog bg-dark'
														style={{ borderRadius: '10px' }}
														role='document'
													>
														<div
															className='modal-content bg-dark'
															style={{ borderRadius: '10px' }}
														>
															<div
																className='modal-header'
																style={{ border: '0px' }}
															>
																<h5
																	className='modal-title'
																	id='exampleModalLabel'
																>
																	Comments
																</h5>
																<button
																	type='button'
																	className='close'
																	data-dismiss='modal'
																	aria-label='Close'
																	style={{ color: 'white' }}
																>
																	<span aria-hidden='true'>&times;</span>
																</button>
															</div>
															<div
																className='modal-body'
																style={{
																	maxHeight: '700px',
																	scrollBehavior: 'smooth',
																	overflow: 'auto',
																}}
															>
																{this.state.Comments.map((comment) => {
																	if (comment.postId === this.state.postId) {
																		return (
																			<div className='card bg-dark'>
																				<div className='card-body'>
																					<h5 className='card-title'>
																						{'#' + comment_counter++}
																					</h5>
																					<p className='card-text'>
																						{comment.text}
																					</p>
																				</div>
																			</div>
																		);
																	}
																})}
															</div>
															<div className='modal-footer'>
																<input
																	type='text'
																	className='form-control'
																	onChange={(e) => this.onChange3(e)}
																	defaultValue=''
																	placeholder='Comment Here.'
																></input>
																<button
																	type='button'
																	className='btn btn-outline-success'
																	onClick={this.postComment}
																>
																	Post Comment
																</button>
															</div>
														</div>
													</div>
												</div>
												<div
													className='modal fade'
													id={'modal1' + element.postId}
													tabIndex='-1'
													role='dialog'
													aria-labelledby='exampleModalLabel'
													aria-hidden='true'
												>
													<div
														className='modal-dialog bg-dark'
														style={{ borderRadius: '10px' }}
														role='document'
														role='document'
													>
														<div
															className='modal-content bg-dark'
															style={{ borderRadius: '10px' }}
														>
															<div
																className='modal-header'
																style={{ border: '0px' }}
															>
																<h5
																	className='modal-title'
																	id='exampleModalLabel'
																>
																	Report
																</h5>
																<button
																	type='button'
																	className='close'
																	data-dismiss='modal'
																	aria-label='Close'
																	style={{ color: 'white' }}
																>
																	<span aria-hidden='true'>&times;</span>
																</button>
															</div>
															<div className='modal-body'>
																<input
																	type='text'
																	className='form-control'
																	onChange={(e) => this.onChange(e)}
																	defaultValue=''
																	placeholder='Please state your reason briefly.'
																></input>
															</div>
															<div className='modal-footer'>
																<button
																	type='button'
																	className='btn btn-outline-danger'
																	data-dismiss='modal'
																	onClick={() =>
																		this.reportUser(
																			element.authorId,
																			element.postId
																		)
																	}
																>
																	Report User
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div></div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className='col-3'>
						<div className='card text-white bg-dark'>
							<div
								className='card-header'
								style={{ textAlign: 'center', fontWeight: '500' }}
							>
								About Me
							</div>
							<div className='card-body'>
								<div style={{ fontWeight: 500, marginBottom: '10px' }}>
									{/* 									{this.state.user[0].about}
									 */}{' '}
								</div>
								<div style={{ fontWeight: 300, marginBottom: '20px' }}>
									{/* 									{this.state.Club[0].description}
									 */}{' '}
								</div>

								<div>
									{}
									<button
										className='btn btn-primary btn-block'
										aria-hidden='true'
										style={{
											marginTop: '20px',
										}}
										data-toggle='modal'
										data-target='#modal'
									>
										MESSAGE
									</button>
									<div
										className='modal fade'
										id='modal'
										tabIndex='-1'
										role='dialog'
										aria-labelledby='ModalLabel'
										aria-hidden='true'
									>
										<div
											className='modal-dialog bg-dark'
											style={{ borderRadius: '10px' }}
											role='document'
											role='document'
										>
											<div
												className='modal-content bg-dark'
												style={{ borderRadius: '10px' }}
											>
												<div className='modal-header' style={{ border: '0px' }}>
													<h5 className='modal-title' id='exampleModalLabel'>
														Message
													</h5>
													<button
														type='button'
														className='close'
														data-dismiss='modal'
														aria-label='Close'
														style={{ color: 'white' }}
													>
														<span aria-hidden='true'>&times;</span>
													</button>
												</div>
												<div className='modal-body'>
													<input
														type='text'
														className='form-control'
														/* onChange={(e) => this.onChange2(e)} */
														defaultValue=''
														placeholder='Message here.'
													></input>
												</div>
												<div className='modal-footer'>
													<button
														type='button'
														className='btn btn-outline-warning'
														/* onClick={this.review_Club} */
														data-dismiss='modal'
													>
														MESSAGE
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		else
			return (
				<div
					class='modal fade show d-block'
					id='ModalCenter'
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.68)',
						backdropFilter: 'blur(6px)',
					}}
					tabIndex='-1'
					role='dialog'
					aria-labelledby='exampleModalCenterTitle'
					aria-hidden='true'
				>
					<div
						class='modal-dialog modal-dialog-centered'
						role='document'
						style={{ borderRadius: '10px' }}
					>
						<div class='modal-content bg-dark' style={{ borderRadius: '10px' }}>
							<div class='modal-header' style={{ border: '0px' }}></div>
							<div class='modal-body'>
								<h5
									class='modal-title'
									id='exampleModalLongTitle'
									style={{ color: 'white' }}
								>
									You need to be in the same club with this user to see this
									page
								</h5>
							</div>
							<div class='modal-footer'>
								<button
									type='submit'
									class='btn btn-warning'
									onClick={this.goBack}
								>
									Go Back
								</button>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default Content;
