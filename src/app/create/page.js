"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { openRequest } from "@/services/Web3Services";

export default function Home() {

    const [request, setRequest] = useState({
        title: "",
        description: "",
        contact: "",
        goal: 0
    })

    function onInputChange(evt) {
        setRequest(prevState => ({...prevState, [evt.target.id]: evt.target.value}))
    }

    function btnSaveClick(){
        alert("Starting saving process...");
        openRequest(request)
            .then(result => {
                alert("Request saved successfully. Wait a minute to see it in the home page.");
                window.location.href = "/";
            })
            .catch(err => {
                console.error(err);
                alert(err.message);
            })
    }

  return (
    <>
      <Header />
      <div className="container">
        <div className="ps-5">
            <div className="row my-3">
                <p className="lead">Fill all the necessary information below:</p>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3">
                    <input type="text" id="title" className="form-control" maxLength={150} value={request.title} onChange={onInputChange} />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea id="description" className="form-control" style={{ height: 100 }} value={request.description} onChange={onInputChange} />
                    <label htmlFor="title">Details of what you need and where you are (if necessary for deliveries):</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" id="contact" className="form-control" maxLength={150} value={request.contact} onChange={onInputChange} />
                    <label htmlFor="contact">Contact (phone or e-mail):</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="number" id="goal" className="form-control" value={request.goal} onChange={onInputChange} />
                    <label htmlFor="goal">Goal in BNB:</label>
                </div>
            </div>
            <div className="row">
                <div className="col-1 mb-3">
                    <a href="/" className="btn btn-outline-dark col-12 p-3">Back</a>
                </div>
                <div className="col-5 mb-3 p-0">
                    <button type="button" className="btn btn-dark col-12 p-3" onClick={btnSaveClick}>Send Request</button>
                </div>
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
