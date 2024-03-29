import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AddGame(props) {
    const [title, setTitle] = useState('');
    const [release, setRelease] = useState('');
    const [rating, setRating] = useState('');
    const [show, setShow] = useState(props.show);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <> 
        {/* Button that shows on the main page to open the Modal */}
            <Button id="addgame" variant="secondary" size="lg"
                onClick={props.toggleShow}
            >
                + Add Game
            </Button>

            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton onClick={props.toggleShow}>
                    <Modal.Title>Add Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form within the Modal to add data to the database */}
                    <form
                    // sending the added data on submit to the function for creating a new game
                        onSubmit={(e) => { 
                            e.preventDefault();
                            setTitle('');
                            setRelease('');
                            setRating('');
                            props.newGame(title, release, rating);
                        }}
                        id="editmodal"
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="title"
                                >
                                    Title
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="title"
                                    placeholder="Super Mario World"
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        // sets new values to the game properties based on the value of the form field being changed
                                        setTitle(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="release"
                                >
                                    Release
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="release"
                                    placeholder="1990"
                                    type="text"
                                    value={release}
                                    onChange={(e) => {
                                        setRelease(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="rating"
                                >
                                    Rating
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="rating"
                                    placeholder="5"
                                    type="text"
                                    value={rating}
                                    onChange={(e) => {
                                        setRating(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {/* close button that toggles the "toggleShow" so that the Modal closes */}
                    <Button variant="secondary" className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                        onClick={props.toggleShow}
                    >
                        Close
                    </Button>
                    {/* add button that triggers a submit, thus storing the values and triggering the function to add a new game */}
                    <Button type="submit" variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        form="editmodal"
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}