import { Component } from 'react';
import './App.css';

import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  checkingContactName = verificationName => {
    const { contacts } = this.state;
    const normalizedName = verificationName.toLowerCase();
    return contacts.find(({ name }) => name.toLowerCase() === normalizedName);
  };

  render() {
    const { filter } = this.state;

    const filterContacts = this.getFilterContacts();

    return (
      <div className="App">
        <Container>
          <h1 className="main__title">Phonebook</h1>
          <ContactForm
            onAddContact={this.addContact}
            checkingContactName={this.checkingContactName}
          />

          <h2 className="section__title">Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={filterContacts}
            onDeleteContact={this.deleteContact}
          />
        </Container>
      </div>
    );
  }
}

export default App;
