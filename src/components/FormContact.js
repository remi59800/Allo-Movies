import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const FormContact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_0h655nc',
        'template_14e2a9j',
        form.current,
        'N53LVAolY_xK4Q2nX'
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className='form-container'>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type='text' name='name' required autoComplete='off' />
        <label>Email</label>
        <input type='email' name='email' required autoComplete='off' />
        <label>Message</label>
        <textarea name='message' required />
        <input type='submit' value='Envoyer' />
      </form>
      <div className='form-message'></div>
    </div>
  );
};

export default FormContact;
