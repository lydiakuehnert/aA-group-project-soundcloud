import React from 'react';
import './Footer.css';

function Footer({ isLoaded }) {


    return (
        <>
            {isLoaded && (
                <div id='footer-box'>

                    <div className='footer-person'>
                        <div className='footer-name-box'>
                            <h3>Helen Coates</h3>
                        </div>
                        <div className='personal-details'>
                            <a href="https://hcoates86.github.io/" target='_blank'>
                                <img alt='Helen' className="person-pic" src="../../profile-pic.png"></img>
                            </a>
                            <div className='footer-link-icons'>
                                <a className="link-icon" href="https://github.com/hcoates86" target='_blank'><i class="fa-brands fa-github"></i></a>
                                <a className="link-icon" href="http://www.linkedin.com/in/helen-coates-b93116292" target='_blank'><i class="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className='footer-person'>
                        <div className='footer-name-box'>
                            <h3>Shaun Fisher</h3>
                        </div>
                        <div className='personal-details'>
                            <a href="http://fishcake.fish/" target='_blank'>
                                <img alt='Shaun' className="person-pic" src="../../shaun-pic.jpg"></img>
                            </a>
                            <div className='footer-link-icons'>
                                <a className="link-icon" href="https://github.com/fishcakefish" target='_blank'><i class="fa-brands fa-github"></i></a>
                                <a className="link-icon" href="https://www.linkedin.com/in/shaun-fisher-139115271/" target='_blank'><i class="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className='footer-person'>
                        <div className='footer-name-box'>
                            <h3>David Gu</h3>
                        </div>
                        <div className='personal-details'>
                            <a href="https://github.com/Gdavidu" target='_blank'>
                                <img alt='David' className="person-pic" src="../../david-pic.jpeg"></img>
                            </a>
                            <div className='footer-link-icons'>
                                <a className="link-icon" href="https://github.com/Gdavidu" target='_blank'><i class="fa-brands fa-github"></i></a>
                                <a className="link-icon" href="http://www.linkedin.com/in/david-gu-79ab311b5" target='_blank'><i class="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className='footer-person'>
                        <div className='footer-name-box'>
                            <h3>Lydia Kuehnert</h3>
                        </div>
                        <div className='personal-details'>
                            <a href="https://lydiakuehnert.github.io/" target='_blank'>
                                <img alt='Lydia' className="person-pic" src="../../lydia-pic.jpg"></img>
                            </a>
                            <div className='footer-link-icons'>
                                <a className="link-icon" href="https://github.com/lydiakuehnert" target='_blank'><i class="fa-brands fa-github"></i></a>
                                <a className="link-icon" href="https://www.linkedin.com/in/lydia-kuehnert-619286203/" target='_blank'><i class="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default Footer;