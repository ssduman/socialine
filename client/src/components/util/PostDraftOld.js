import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';
import { addPost, getPosts } from '../api/apiCall';

// https://react-rte.org/demo
class PostDraftOld extends Component {
	state = {
		value: RichTextEditor.createEmptyValue(),
		posts: [],
		postTitle: '',
		isChecked: false,
	};

	componentDidMount() {
		getPosts(1).then((response) => {
			this.setState({ posts: response });
		});
	}

	onChange = (value) => {
		this.setState({ value });
		if (this.props.onChange) {
			this.props.onChange(value.toString('html'));
		}
	};

	toggleChange = () => {
		this.setState({
			isChecked: !this.state.isChecked,
		});
	};

	onSubmit = (e) => {
		var post = {
			userId: 1,
			subClubId: 1,
			title: this.state.postTitle,
			text: this.state.value.toString('html'),
			isEvent: this.state.isChecked ? 1 : 0,
		};

		addPost(post).then((response) => {});

		getPosts(1).then((response) => {
			this.setState({ posts: response });
		});
	};

	render() {
		const toolbarConfig = {
			// Optionally specify the groups to display (displayed in the order listed).
			display: [
				'INLINE_STYLE_BUTTONS',
				'BLOCK_TYPE_BUTTONS',
				'LINK_BUTTONS',
				'BLOCK_TYPE_DROPDOWN',
				'HISTORY_BUTTONS',
				'IMAGE_BUTTON',
			],
			INLINE_STYLE_BUTTONS: [
				{ label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
				{ label: 'Italic', style: 'ITALIC' },
				{ label: 'Underline', style: 'UNDERLINE' },
			],
			BLOCK_TYPE_DROPDOWN: [
				{ label: 'Normal', style: 'unstyled' },
				{ label: 'Heading Large', style: 'header-one' },
				{ label: 'Heading Medium', style: 'header-two' },
				{ label: 'Heading Small', style: 'header-three' },
			],
			BLOCK_TYPE_BUTTONS: [
				{ label: 'UL', style: 'unordered-list-item' },
				{ label: 'OL', style: 'ordered-list-item' },
			],
		};
		return (
			<div className='draft'>
				<table>
					<thead key='thead'>
						<tr>
							<th>Post ID</th>
							<th>Author ID</th>
							<th>SubClub ID</th>
							<th>Date</th>
							<th>Title</th>
							<th>Text</th>
							<th>Type</th>
						</tr>
					</thead>
					{this.state.posts.map((post) => (
						<tbody key={post.postId}>
							<tr>
								<th> {post.postId} </th>
								<th> {post.authorId} </th>
								<th> {post.subClubId} </th>
								<th> {post.date} </th>
								<th>
									{' '}
									<div
										dangerouslySetInnerHTML={{ __html: post.title }}
									></div>{' '}
								</th>
								<th>
									{' '}
									<div
										dangerouslySetInnerHTML={{ __html: post.text }}
									></div>{' '}
								</th>
								<th> {post.isEvent == 0 ? 'Post' : 'Event'} </th>
							</tr>
						</tbody>
					))}
				</table>

				<hr></hr>

				<label>
					Title:
					<input
						type='text'
						name='post-title'
						id='post-title'
						defaultValue='title...'
						onChange={(e) => this.setState({ postTitle: e.target.value })}
						value={this.state.postTitle}
						required
					/>
				</label>

				<label>
					Event:
					<input
						type='checkbox'
						defaultChecked={this.state.isChecked}
						onChange={this.toggleChange}
					/>
				</label>

				<RichTextEditor
					toolbarConfig={toolbarConfig}
					value={this.state.value}
					onChange={this.onChange}
				/>

				<form onSubmit={this.onSubmit}>
					<input type='submit' value='Post'></input>
				</form>
			</div>
		);
	}
}

export default PostDraftOld;
