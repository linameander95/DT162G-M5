import React, { useEffect, useState, useContext } from 'react'
import AddGame from '../components/AddGame';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { Routes, Route, useParams, useNavigate, BrowserRouter, Link } from 'react-router-dom';

export default function ViewGames() {

  const [backendData, setBackendData] = useState([{}])
  const [show, setShow] = useState(false);
  const [games, setGames] = useState();

  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    fetch("/games").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []);

  function deleteGame(id) {
    const url = ('/games/' + id)
    fetch(url, {
      method: 'DELETE', headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
        window.location.reload();
        return response.json()
      })
      .then((data) => { console.log(data) })
      .catch((e) => {
        console.log(e);
      });
  }

  function newGame(title, release, rating) {
    const data = { title: title, release: release, rating: rating }
    const url = ('/games/')
    fetch(url, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Game could not be added');
        }
        return response.json();
      }).then((data) => {
        toggleShow();
        window.location.reload();
      }).catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <table className="gametable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Release</th>
            <th>Rating 1-5</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(typeof backendData === 'undefined') ? (
            <p>Data could not be found, try again later.</p>
          ) : (
            backendData.map((title, i) => (
              <tr key={i}><td>{backendData[i].title}</td><td>{backendData[i].release}</td><td>{backendData[i].rating}</td>
                <td>
                  <Button variant="secondary" className="editdelete" size="sm" onClick={() => deleteGame(backendData[i]._id)}><FontAwesomeIcon icon={faTrash} /></Button>
                  <Link to={{ pathname: "edit/" + backendData[i]._id }} style={{ textDecoration: "none" }}> 
                  <Button variant="secondary" className="editdelete" size="sm"><FontAwesomeIcon icon={faPenToSquare} /></Button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <AddGame newGame={newGame}
        show={show}
        toggleShow={toggleShow}
      />
    </div>
  )
}
