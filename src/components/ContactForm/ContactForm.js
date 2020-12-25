import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;
    const duplicateName = this.props.checkingContactName(name);

    if (duplicateName) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = { id: uuidv4(), name, number };
      this.props.onAddContact(newContact);
    }

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={s.contact__form} onSubmit={this.handleSubmit}>
        <label className={s.contact__label}>
          Name
          <input
            className={s.contact__input}
            placeholder="Enter name..."
            type="text"
            value={name}
            name="name"
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            required
          />
        </label>

        <button className={s.contact__btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
