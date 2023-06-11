import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify';

export function FormContact () {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_0h655nc',
                'template_14e2a9j',
                form.current,
                process.env.REACT_APP_ID
            )
            .then(
                (result) => {
                    // console.log(result.text);
                    form.current.reset();
                    toast.success(`Votre message a bien été envoyé`, {
                        position: 'bottom-center',
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                },
                (error) => {
                    // console.log(error.text);
                    toast.error(`Le message n'a pas été envoyé, veuillez réessayer`, {
                        position: 'bottom-center',
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            );
    };

    return (
        <div className='form-contact-container'>
            <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type='text' name='name' required autoComplete='off'/>
                <label>Email</label>
                <input type='email' name='email' required autoComplete='off'/>
                <label>Message</label>
                <textarea name='message' required/>
                <input type='submit' value='Envoyer'/>
            </form>
            <div className='form-message'></div>
        </div>
    );
};
