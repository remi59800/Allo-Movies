import React from 'react';
import FormContact from '../../components/FormContact/FormContact';

const Contact = () => {
    return (
        <div className='contact-container'>
            <FormContact/>
            <div className='social-media'>
                <a href='https://twitter.com/dev_remz'>
                    <i className='uil uil-twitter'></i>
                </a>
                <a href='https://www.linkedin.com/in/r%C3%A9mi-m%C3%A9nart-4a4461125/'>
                    <i className='uil uil-linkedin'></i>
                </a>
                <a href='https://github.com/remi59800'>
                    <i className='uil uil-github'></i>
                </a>
            </div>
        </div>
    );
};

export default Contact;
