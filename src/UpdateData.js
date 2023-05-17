import React from 'react';

const UpdateData = () => {
    return (
        <>
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
                                    <input type="text" name="title" className="form-control" id="exampletitle" aria-describedby="titlehelp" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampledescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="exampledescription" rows="5" name="description" ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-sm" data-bs-dismiss="modal">Submit</button>

                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UpdateData;