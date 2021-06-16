import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<div>
				<section id='contact' className='contact bg-primary'>
					<div className='container'>
						<h2>
							<span>We&nbsp;</span>
							<i className='fa fa-heart'></i>
							<span>&nbsp;new friends!</span>
						</h2>
						<ul className='list-inline list-social'>
							<li className='list-inline-item social-twitter'>
								<a href='#'>
									<i className='fa fa-twitter'></i>
								</a>
							</li>
							<li className='list-inline-item social-facebook'>
								<a href='#'>
									<i className='fa fa-facebook'></i>
								</a>
							</li>
							<li className='list-inline-item social-google-plus'>
								<a href='#' style={{ background: 'rgb(0,0,0)' }}>
									<i className='fa fa-github'></i>
								</a>
							</li>
						</ul>
					</div>
				</section>
				<footer>
					<div className='container'>
						<p>©&nbsp;Broliz 2021. All Rights Reserved.</p>
						<ul className='list-inline'>
							<li className='list-inline-item'>
								<a href='#'>Privacy</a>
							</li>
							<li className='list-inline-item'>
								<a href='#'>Terms</a>
							</li>
							<li className='list-inline-item'>
								<a href='#'>FAQ</a>
							</li>
						</ul>
					</div>
				</footer>
			</div>
		);
	}
}
/*
 <section id="download" className="download text-center bg-primary">
        <div className="container">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <h2 className="section-heading">Discover what Socialize is about!</h2>
                    <p>You can start browsing clubs right now!</p>
                    <div className="badges"><a className="badge-link" href="#"></a><a className="badge-link" href="#"></a></div>
                </div>
            </div>
        </div>
    </section>
    <section id="features" className="features">
        <div className="container">
            <div className="section-heading text-center">
                <h2>Unlimited Clubs, Unlimited Fun</h2>
                <p className="text-muted">Check out what you can do with all the clubs!</p>
                <hr/>
            </div>
            <div className="row">
                <div className="col my-auto">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="feature-item"><i className="icon-screen-smartphone text-primary"></i>
                                    <h3>Device Mockups</h3>
                                    <p className="text-muted">Use flexible website on your mobile device</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="feature-item"><i className="icon-camera text-primary"></i>
                                    <h3>Flexible Use</h3>
                                    <p className="text-muted">Share your moments with club members</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="feature-item"><i className="icon-present text-primary"></i>
                                    <h3>Free to Use</h3>
                                    <p className="text-muted">You can socialize with your friends and new people for free!</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="feature-item"><i className="icon-lock-open text-primary"></i>
                                    <h3>Open Source</h3>
                                    <p className="text-muted">Since this app is MIT licensed, you are in safe hands</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="cta" style={{background: 'url(assets/img/bg-cta.jpg)'}}>
        <div className="cta-content">
            <div className="container">
                <h2>Stop waiting.Start socializing.</h2><a className="btn btn-outline-warning btn-xl js-scroll-trigger" role="button" href="#contact">SIGN UP</a></div>
        </div>
        <div className="overlay"></div>
    </section>*/
export default Footer;
