
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Main = () => {
    // ======================================== For Inline CSS  ==============================================
    const myStyle = {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
    };

    // ======================================== Read Function: Fetch data from database ==============================================
    const [infos, setInfos] = useState([]);

    useEffect(() => {
        async function getAllInformation() {
            try {
                // const response = await axios.get('http://127.0.0.1:8000/api/mymodels');
                const response = await axios.get('http://127.0.0.1:8000/list/');
                // console.log("Received data:", response.data);
                setInfos(response.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }
        // Call the async function getAllInformation
        getAllInformation();

    }, []);

    // ======================================== Create Function: Add New data in Database ==============================================

    // Create information
    const [user_data, setUserData] = useState({
        title: "",
        description: ""
    });


    // Take input form field
    function onTextFieldChange(e) {
        setUserData({
            ...user_data,
            [e.target.name]: e.target.value
        });
        console.log(user_data);
    };


    // Fetch all information to show in webpage after adding new data
    async function getAllInformation() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/list/');
            setInfos(response.data);
        } catch (error) {
            console.log("Something is wrong");
        }
    }

    // Add Student form handle method
    async function onFormSubmit_for_add(event) {
        event.preventDefault();
        console.log(event)
        try {
            await axios.post("http://127.0.0.1:8000/create/", user_data);
            setUserData({ title: "", description: "" }); // Clear the form inputs
            getAllInformation(); // Fetch updated data
        } catch (error) {
            console.log("Something is wrong");
        }
    };


    // ======================================== Delete Function ==============================================

    // const deleteData = async (event, id) => {
    //   event.preventDefault();
    //   try {
    //     await axios.delete(`http://127.0.0.1:8000/delete/${id}`);
    //     var newInformation = infos.filter((item) => {
    //       return item.id !== id;
    //     });
    //     setInfos(newInformation);
    //   } catch (error) {
    //     console.log("something is wrong");
    //   }
    // };

    async function deleteData(event) {
        event.preventDefault();
        try {
            // await axios.delete(`http://127.0.0.1:8000/api/mymodels/${id}`);
            await axios.delete(`http://127.0.0.1:8000/delete/${updateItemId}`);
            var newInformation = infos.filter((item) => {
                return item.id !== updateItemId;
            });
            setInfos(newInformation);
        } catch (error) {
            console.log("something is wrong");
        }
    };

    // ======================================== Update Function ==============================================
    // =======================================================================================================

    const [updateItemId, setUpdateItemId] = useState(null); // Add state variable for update ID

    // Create information for updated data
    const [user_updated_data, setUserUpdatedData] = useState({
        title: "",
        description: ""
    });

    // ===============================================================================================
    // Featching single data for particular id
    useEffect(() => {
        async function getSingleInformation() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/read/${updateItemId}`);
                console.log("Data come: ", response.data);
                setUserUpdatedData(response.data);
            } catch (error) {
                console.log("Something is wrong");
                console.log("From line number: 118: ", updateItemId);
            }
        }
        // Call the async function getSingleInformation
        getSingleInformation();

    }, [updateItemId]) // it means when this particular item will change then it will render

    // ===============================================================================================

    // Take input form field value for update function
    function onTextFieldChange_for_update(e) {
        setUserUpdatedData({
            ...user_updated_data,
            [e.target.name]: e.target.value
        });
        console.log(user_updated_data);
    };
    // Function for onFormSubmit Update data
    async function onFormSubmit_for_update(event, id) {
        event.preventDefault();
        // console.log(event);
        console.log("Id is: ", id)
        console.log("Type of: ", typeof id)
        try {
            await axios.put(`http://127.0.0.1:8000/update/${id}`, user_updated_data);
            setUserData({ title: "", description: "" }); // Clear the form inputs
            getAllInformation(); // Fetch updated data
        } catch (error) {
            console.log("Something is wrong");
        }
    };
    return (
        <main>

            <section className="py-5  container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <div className='text-center'>
                            <h1 className="font-weight-light">Todo Project</h1>
                            <p className="lead text-muted">The Todo Project is a powerful task management application designed to help individuals stay organized and efficiently manage their daily tasks, goals, and priorities. Whether you're a student, professional, or someone who wants to enhance productivity, the Todo Project provides a user-friendly interface and intuitive features to streamline your workflow and ensure nothing falls through the cracks.</p>

                            {/* ========================================== ADD TODO ======================================================= */}

                            <button type="button" className="btn btn-primary btn-sm text-center" data-bs-toggle="modal" data-bs-target="#todoModal">
                                Add Todo
                            </button>
                        </div>

                        <div className="modal fade" id="todoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Todo</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>


                                    <div className="modal-body">

                                        <form method="post">

                                            <div className="mb-3">
                                                <label htmlFor="exampletitle" className="form-label">Todo Title</label>
                                                <input type="text" value={user_data.title} onChange={e => onTextFieldChange(e)} name="title" className="form-control" id="exampletitle" aria-describedby="titlehelp" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampledescription" className="form-label">Description</label>
                                                <textarea className="form-control" id="exampledescription" rows="5" name="description" value={user_data.description} onChange={e => onTextFieldChange(e)}></textarea>
                                            </div>

                                            <button type="submit" className="btn btn-primary btn-sm" onClick={event => onFormSubmit_for_add(event)} data-bs-dismiss="modal">Submit</button>

                                        </form>


                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ========================================== ADD TODO End ======================================================= */}

                        {/* ========================================== For DELETE Conformation Start ======================================================= */}
                        <div className="modal fade" id="todoModal3" tabIndex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 lead" id="exampleModalLabel3">Delete Conformation Message!!</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>


                                    <div className="modal-body">
                                        <h3 className='' style={myStyle}>Are you sure you want to delete it?</h3><br />
                                        <button type="submit" onClick={(event) => deleteData(event)} className="btn btn-sm btn-outline-danger" data-bs-dismiss="modal">Yes</button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ========================================== For DELETE Conformation End ======================================================= */}

                        {/* ========================================== UPDATE TODO Start ======================================================= */}

                        <div className="modal fade" id="todoModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel2">Update Todo</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>


                                    <div className="modal-body">

                                        {/* ========================================== Update Form Start ======================================================= */}
                                        <form method="post">
                                            <div className="mb-3">
                                                <label htmlFor="exampletitle" className="form-label">Todo Title</label>
                                                <input type="text" value={user_updated_data.title} onChange={e => onTextFieldChange_for_update(e)} name="title" className="form-control" id="exampletitle" aria-describedby="titlehelp" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampledescription" className="form-label">Description</label>
                                                <textarea className="form-control" id="exampledescription" rows="5" name="description" value={user_updated_data.description} onChange={e => onTextFieldChange_for_update(e)}></textarea>
                                            </div>

                                            <button type="submit" className="btn btn-primary btn-sm" onClick={(event) => onFormSubmit_for_update(event, updateItemId)} data-bs-dismiss="modal">Submit</button>
                                        </form>
                                        {/* ========================================== Update Form End ======================================================= */}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ========================================== UPDATE TODO END ======================================================= */}

                    </div>
                </div>
            </section>

            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">



                        {
                            infos.map((info) => {
                                return (
                                    <div className="col" key={info.id}>
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <h5 className="card-title">{info.title}</h5>
                                                <p className="card-text">{info.description}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <button type="submit" onClick={() => setUpdateItemId(info.id)} className="btn btn-sm btn-outline-success mr-2" data-bs-toggle="modal" data-bs-target="#todoModal2">Update</button>


                                                        {/* <button type="submit" onClick={(event) => deleteData(event, info.id)} className="btn btn-sm btn-outline-danger" >Delete</button> */}

                                                        <button type="submit" onClick={() => setUpdateItemId(info.id)} className="btn btn-danger btn-sm text-center" data-bs-toggle="modal" data-bs-target="#todoModal3">
                                                            Delete
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Main;