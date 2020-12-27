import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

function ContactForm({ onAddContact, checkingContactName }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const duplicateName = checkingContactName(name);

    if (duplicateName) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = { id: uuidv4(), name, number };
      onAddContact(newContact);
    }

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.contact__form} onSubmit={handleSubmit}>
      <label className={s.contact__label}>
        Name
        <input
          className={s.contact__input}
          placeholder="Enter name..."
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
          required
        />
      </label>

      <label className={s.contact__label}>
        Number
        <input
          className={s.contact__input}
          placeholder="Enter number..."
          type="tel"
          value={number}
          name="number"
          onChange={handleChange}
          required
        />
      </label>

      <button className={s.contact__btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
