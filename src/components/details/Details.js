import React, { useState, useEffect, useContext } from 'react';
import './Details.scss';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import { StateContext } from '../../utils/stateProvider';
import { axiosInstance } from '../../utils/axios';
import Main from '../main/Main';
import Footer from '../footer/Footer';

export default function Details() {
  const [error, setError] = useState('');
  const { contacts, setContacts } = useContext(StateContext);
  const sessionId = JSON.parse(sessionStorage.getItem('id'));

  useEffect(() => {
    const detail = axiosInstance
      .get(`contacts/${sessionId}.json`)
      .then((resp) => {
        console.log(resp.data);
        setContacts([resp.data]);
      })
      .catch((err) => setError(err));

    return detail;
  }, [setContacts, sessionId]);

  const deleteContact = () => {
    axiosInstance.delete(`contacts/${sessionId}.json`).then((resp) => {
      console.log(resp);
      setContacts([]);
    });
  };

  return (
    <div className="details__container">
      <Header>
        <Link to="/contacts" className="details__link home">
          contacts
        </Link>
        <Link to="/favorites" className="details__link favorites">
          favorites
        </Link>
        <Link to="/update" className="details__link update">
          update
        </Link>
      </Header>

      <Main>
        <button onClick={deleteContact}>Delete Contact</button>

        {error ? (
          <p>{error}</p>
        ) : !contacts[0] ? (
          <p>Your contact is deleted.</p>
        ) : (
          sessionId &&
          contacts.map((contact, i) => (
            <section key={i}>
              <table className="details__table">
                <tbody>
                  <tr>
                    <th>Contact Details</th>
                  </tr>
                  <tr>
                    <td>Name: {contact.name}</td>
                  </tr>
                  <tr>
                    <td>Surname: {contact.surname}</td>
                  </tr>
                  <tr>
                    <td>Email: {contact.email}</td>
                  </tr>
                  <tr>
                    <td>Mob: {contact.mobile}</td>
                  </tr>
                  <tr>
                    <td>Phone: {contact.phone}</td>
                  </tr>
                  <tr>
                    <td>Birthdate: {contact.birthDate}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          ))
        )}
      </Main>

      <Footer />
    </div>
  );
}
