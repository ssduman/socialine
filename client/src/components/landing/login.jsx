import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import style from './mystyle.css';

const Login = (props) => {
	return (
		<Popup
			trigger={<button className='btn btn-primary'> Open Modal </button>}
			modal
			nested
		>
			{(close) => (
				<div className='modal' style={style.modal}>
					<button className='close' onClick={close} style={style.close}>
						&times;
					</button>
					<div className='header'> Modal Title </div>
					<div className='content' style={style.contentn}>
						{' '}
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
						nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
						quibusdam voluptates delectus doloremque, explicabo tempore dicta
						adipisci fugit amet dignissimos?
						<br />
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Consequatur sit commodi beatae optio voluptatum sed eius cumque,
						delectus saepe repudiandae explicabo nemo nam libero ad, doloribus,
						voluptas rem alias. Vitae?
					</div>
					<div className='actions'>
						<Popup
							trigger={<button className='button'> Trigger </button>}
							position='top center'
							nested
						>
							<span>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
								magni omnis delectus nemo, maxime molestiae dolorem numquam
								mollitia, voluptate ea, accusamus excepturi deleniti ratione
								sapiente! Laudantium, aperiam doloribus. Odit, aut.
							</span>
						</Popup>
						<button
							className='button'
							onClick={() => {
								console.log('modal closed ');
								close();
							}}
						>
							close modal
						</button>
					</div>
				</div>
			)}
		</Popup>
	);
};

export default Login;
