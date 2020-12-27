import { useState } from 'react';
import './App.css';

import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = contact => {
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  const checkingContactName = verificationName => {
    const normalizedName = verificationName.toLowerCase();
    return contacts.find(({ name }) => name.toLowerCase() === normalizedName);
  };

  const filterContacts = getFilterContacts();

  return (
    <div className="App">
      <Container>
        <h1 className="main__title">Phonebook</h1>
        <ContactForm
          onAddContact={addContact}
          checkingContactName={checkingContactName}
        />

        <h2 className="section__title">Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={deleteContact}
        />
      </Container>
    </div>
  );
}

export default App;
