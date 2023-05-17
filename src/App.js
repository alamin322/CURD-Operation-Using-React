// import logo from './logo.svg';
// import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


function App() {

  const [infos, setInfos] = useState([]);

  // Fetching Data

  useEffect(() => {
    async function getAllInformation() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/list');
        // console.log("Received data:", response.data);
        setInfos(response.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getAllInformation();

  }, []);

  // ======================================================================================

  // Create information
  const [user_data, setUserData] = useState({
    title: "",
    description: ""
  });

  // const [status, setStatus] = useState();

  // Take input form field
  function onTextFieldChange(e) {
    setUserData({
      ...user_data,
      [e.target.name]: e.target.value
    });
    console.log(user_data);
  };


  // Fetch all information
  async function getAllInformation() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/list');
      setInfos(response.data);
    } catch (error) {
      console.log("Something is wrong");
    }
  }

  // Add Student form handle method
  async function onFormSubmit(event) {
    event.preventDefault();
    console.log(event)
    try {
      await axios.post("http://127.0.0.1:8000/create/", user_data);
      setUserData({ title: "", description: "" }); // Clear the form inputs
      getAllInformation(); // Fetch updated data
      // setStatus(true);

    } catch (error) {
      console.log("Something is wrong");
      console.log(user_data);
    }
  };


  // ======================================================================================

  // Delete data
  const deleteData = async id => {
    await axios.delete(`http://127.0.0.1:8000/delete/${id}`);
    var newInformation = infos.filter((item) => {
      return item.id !== id;
    });

    setInfos(newInformation);
  };



  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">

          <div className="col-md-8">
            <h2 className="alert alert-info text-center">Todo Plan</h2>


            <button type="button" className="btn btn-primary btn-sm text-center" data-bs-toggle="modal" data-bs-target="#todoModal">
              Add Todo
            </button>


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

                      <button type="submit" className="btn btn-primary btn-sm" onClick={event => onFormSubmit(event)} data-bs-dismiss="modal">Submit</button>

                    </form>


                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="col-md-8">
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Todo Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>

                {
                  infos.map((info) => {
                    return (
                      <tr key={info.id}>
                        <th scope="row">{info.id}</th>
                        <td>{info.title}</td>
                        <td>{info.description}</td>
                        <td><a href="/" onClick={() => deleteData(info.id)} className='btn btn-danger btn-sm'>Delete</a></td>
                        <td><a href="/" className='btn btn-success btn-sm'>Update</a></td>

                      </tr>

                    )
                  })
                }

              </tbody>


            </table>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
