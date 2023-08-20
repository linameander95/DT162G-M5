import React, { useEffect, useState, useContext } from 'react'
import AddGame from '../components/AddGame';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Routes, Route, useParams, useNavigate, BrowserRouter, Link } from 'react-router-dom';

export default function ViewGames() {
// creating state variables
  const [backendData, setBackendData] = useState([{}])
  const [show, setShow] = useState(false);
//function to decide if the modal should be showing
  function toggleShow() {
    setShow(!show);
  }
//fetch request to fetch all the games from the database
  useEffect(() => {
    fetch("/games").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []);
//delete function to delete a game when the button is clicked in the table
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
//function for adding a new game, gets called from button click in the modal
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
//the table displaying all the games
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
            <p>Data could not be found, try again later.</p> //if there's no data, display this error
          ) : (
            backendData.map((title, i) => (
              // formatting of the fetched data from the database into the table
              <tr key={i}><td>{backendData[i].title}</td><td>{backendData[i].release}</td><td>{backendData[i].rating}</td>
                <td>
                  {/* // buttons for deleting the data, containing the id of the object from the database */}
                  <Button variant="secondary" className="editdelete" size="sm" onClick={() => deleteGame(backendData[i]._id)}><FontAwesomeIcon icon={faTrash} /></Button>
                  {/* link to edit the data, sends the user to the edit page which will contain the correct object based on the id from the database */}
                  <Link to={{ pathname: "edit/" + backendData[i]._id }} style={{ textDecoration: "none" }}> 
                  <Button variant="secondary" className="editdelete" size="sm"><FontAwesomeIcon icon={faPenToSquare} /></Button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* add game button with functionality tied to it which decides when the modal will be shown to the user */}
      <AddGame newGame={newGame}
        show={show}
        toggleShow={toggleShow}
      />
    </div>
  )
}
