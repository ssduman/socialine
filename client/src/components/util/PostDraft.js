import React, { Component, PropTypes } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { Chip } from '@material-ui/core';
import {
	EditorState,
	convertFromHTML,
	ContentState,
	convertToRaw,
} from 'draft-js';
import MUIRichTextEditor from 'mui-rte';
import { addPost, getPosts } from '../api/apiCall';
var FilterBadWord = require('bad-words'),
	filterBadWord = new FilterBadWord();

export const defaultTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#000000',
		},
	},
});

Object.assign(defaultTheme, {
	overrides: {
		MuiIconButton: {
			root: {
				color: 'aliceblue',
			},
		},
		MUIRichTextEditor: {
			root: {
				backgroundColor: 'rgb(52,58,64)',
				color: 'aliceblue',
				borderRadius: '10px',
			},
			container: {
				// display: "flex",
				// flexDirection: "column-reverse",
				// fontColor: "red"
			},
			editor: {
				backgroundColor: 'rgb(52,58,64)',
				padding: '20px',
				height: '200px',
				maxHeight: '200px',
				overflow: 'auto',
				borderRadius: '10px',
			},
			toolbar: {
				border: '0px solid gray',
				backgroundColor: 'rgb(52,58,64)',
				color: 'aliceblue',
				borderRadius: '10px',
			},
			placeHolder: {
				backgroundColor: 'rgb(52,58,64)',
				paddingLeft: 20,
				width: 'inherit',
				// position: "absolute",
				position: 'static',
				top: '20px',
			},
			anchorLink: {
				color: '#333333',
				textDecoration: 'underline',
			},
		},
	},
});

export const eventTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#000000',
		},
	},
});

Object.assign(eventTheme, {
	overrides: {
		MuiIconButton: {
			root: {
				color: 'aliceblue',
				borderRadius: '10px',
			},
		},
		MUIRichTextEditor: {
			root: {
				backgroundColor: 'rgb(39,162,67)',
				color: 'aliceblue',
				borderRadius: '10px',
			},
			container: {
				// display: "flex",
				// flexDirection: "column-reverse",
				// fontColor: "red"
			},
			editor: {
				backgroundColor: 'rgb(39,162,67)',
				padding: '20px',
				height: '200px',
				maxHeight: '200px',
				overflow: 'auto',
				borderRadius: '10px',
			},
			toolbar: {
				borderTop: '0px solid gray',
				backgroundColor: 'rgb(39,162,67)',
				color: 'aliceblue',
				borderRadius: '10px',
			},
			placeHolder: {
				backgroundColor: 'rgb(39,162,67)',
				paddingLeft: 20,
				width: 'inherit',
				// position: "absolute",
				position: 'static',
				top: '20px',
				borderRadius: '10px',
			},
			anchorLink: {
				color: '#333333',
				textDecoration: 'underline',
			},
		},
	},
});

export const profaneTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#000000',
		},
	},
});

Object.assign(profaneTheme, {
	overrides: {
		MuiIconButton: {
			root: {
				color: 'aliceblue',
			},
		},
		MUIRichTextEditor: {
			root: {
				backgroundColor: 'darkred',
				color: 'aliceblue',
				borderRadius: '10px',
			},
			container: {
				// display: "flex",
				// flexDirection: "column-reverse",
				// fontColor: "red"
			},
			editor: {
				backgroundColor: 'darkred',
				padding: '20px',
				height: '200px',
				maxHeight: '200px',
				overflow: 'auto',
				borderRadius: '10px',
			},
			toolbar: {
				borderTop: '0px solid gray',
				backgroundColor: 'darkred',
				color: 'aliceblue',
				borderRadius: '10px',
			},
			placeHolder: {
				backgroundColor: '#282c34',
				paddingLeft: 20,
				width: 'inherit',
				// position: "absolute",
				position: 'static',
				top: '20px',
			},
			anchorLink: {
				color: '#333333',
				textDecoration: 'underline',
			},
		},
	},
});

class PostDraft extends Component {
	state = {
		value: JSON.stringify(
			convertToRaw(EditorState.createEmpty().getCurrentContent())
		),
		text: '',
		postTitle: '',
		isChecked: false,
		isProfane: false,
	};

	onChange = (data) => {
		if (!data.getCurrentContent().hasText()) {
			this.setState({ isProfane: false });
			return;
		}

		const plaintext = data.getCurrentContent().getPlainText();
		if (filterBadWord.isProfane(plaintext)) {
			this.setState({ isProfane: true });
		} else {
			this.setState({ isProfane: false });
			this.setState({
				text: JSON.stringify(convertToRaw(data.getCurrentContent())),
			});
		}
	};

	toggleChange = () => {
		this.setState({
			isChecked: !this.state.isChecked,
		});
	};

	MyCallbackComponent = (props) => {
		return (
			<Chip
				id={props.id}
				avatar={
					this.state.isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
				}
				onClick={this.toggleChange}
				label='Event'
				disabled={props.disabled}
				style={{
					backgroundColor: this.state.isProfane
						? 'darkred'
						: !this.state.isChecked
						? 'rgb(52,58,64)'
						: 'rgb(39,162,67)',
					color: 'aliceblue',
				}}
			/>
		);
	};

	convertToDraft = (str) => {
		if (str.substring(0, 10) === '{"blocks":') {
			return str;
		}
		const contentHTML = convertFromHTML(str);
		const state = ContentState.createFromBlockArray(
			contentHTML.contentBlocks,
			contentHTML.entityMap
		);
		return JSON.stringify(convertToRaw(state));
	};

	save = (data) => {
		var post = {
			userId: this.props.userId,
			subClubId: this.props.subClubId,
			title: this.state.postTitle,
			text: this.state.text,
			isEvent: this.state.isChecked ? 1 : 0,
		};

		addPost(post).then((response) => {
			this.setState({
				value: JSON.stringify(
					convertToRaw(EditorState.createEmpty().getCurrentContent())
				),
			});
		});
	};

	render() {
		return (
			<div>
				<div className='form'>
					<div className='form-group'>
						<div className='input-group mb-2'>
							<input
								type='text'
								className='form-control bg-dark text-white'
								name='post-title'
								id='post-title'
								placeholder='Title'
								style={{ borderRadius: '10px', border: '0px' }}
								onChange={(e) => this.setState({ postTitle: e.target.value })}
								value={this.state.postTitle}
								required={true}
							/>
						</div>

						<MuiThemeProvider
							theme={
								this.state.isProfane
									? profaneTheme
									: !this.state.isChecked
									? defaultTheme
									: eventTheme
							}
						>
							<MUIRichTextEditor
								defaultValue={this.state.value}
								label='Type something here...'
								onSave={this.save}
								readOnly={false}
								toolbar={true}
								onChange={this.onChange}
								controls={[
									'title',
									'bold',
									'italic',
									'underline',
									'strikethrough',
									'highlight',
									'undo',
									'redo',
									'link',
									'media',
									'numberList',
									'bulletList',
									'quote',
									'code',
									'is-event',
								]}
								customControls={[
									{
										name: 'is-event',
										component: this.MyCallbackComponent,
										type: 'callback',
										onClick: (_editorState, name, _anchor) => {
										},
									},
								]}
							/>
						</MuiThemeProvider>
						<form
							onSubmit={() => this.save(this.state.value)}
							style={{ right: '0px' }}
						>
							<button
								className='btn btn-outline-success btn-sm'
								value='Post'
								disabled={this.state.isProfane}
								style={{
									marginRight: '0',
									marginLeft: 'auto',
									display: 'block',
									marginTop: '10px',
									borderRadius: '10px',
								}}
							>
								Share
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default PostDraft;
