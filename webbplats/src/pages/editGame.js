import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
// page for editing a game that 
export default function Game(props) {
    // state variables to check the values twice, using the temporary value to control the buttons on the form
    const [editData, setEditData] = useState([{}])
    const [tempData, setTempData] = useState([{}])
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate();
    const id = useParams();
//fetch request to get the object that is being edited
    useEffect(() => {
        fetch("/games/" + id.id).then(
            response => response.json()
        ).then(
            data => {
                setEditData(data);
                setTempData(data);
            }
        )
        // checking to see if the two are equal, thus determining whether the value has been changed
        if (!editData) return
        if (!tempData) return
        let equal = true;
        if (editData.title !== tempData.title) equal = false;
        if (editData.release !== tempData.release) equal = false;
        if (editData.rating !== tempData.rating) equal = false;
        if (equal) setChanged(false);
    }, []);
//function that sends the patch request to edit the data
    function editGame(title, release, rating) {
        const data = { title: title, release: release, rating: rating }
        const url = ('/games/')
        fetch(url + id.id, {
            method: 'PATCH', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempData) //making the data into json
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Game could not be edited');
                }
                return response.json();
            }).then((data) => {
                setEditData(data);
                setChanged(false);
            }).catch((e) => {
                console.log(e);
            });
            navigate('/', { replace: true });
    }

    return (
        <div id="editdiv">
            <form
                onSubmit={editGame} //running the edit function on submit
                id="editform"
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
                            placeholder=""
                            type="text"
                            defaultValue={tempData.title} //placing the current value of the object in the field for editing
                            onChange={(e) => {
                                setChanged(true);
                                setTempData({ ...tempData, title: e.target.value }); //changing the tempData variable
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
                            placeholder=""
                            type="text"
                            defaultValue={tempData.release}
                            onChange={(e) => {
                                setChanged(true);
                                setTempData({ ...tempData, release: e.target.value });
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
                            placeholder=""
                            type="text"
                            defaultValue={tempData.rating}
                            onChange={(e) => {
                                setChanged(true);
                                setTempData({ ...tempData, rating: e.target.value });
                            }}
                        />
                    </div>
                </div>
                {/* buttons in combination with checking whether the data has been changed to determine if they should show up */}
                <div id="buttons">
                {changed ? <><Button id="closebtn" variant="secondary"
                className="me-1 mt-1 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            >
                Close
            </Button><Button id="editbtn" variant="secondary"
                className="me-1 mt-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                type="submit" form="editform"
            >
                    Edit
                </Button></> : null} 
                </div>
            </form>
        </div>
    )
}