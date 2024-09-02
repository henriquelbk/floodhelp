"use client";

import DonationRequest from "@/components/DonationRequest";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getOpenRequests } from "@/services/Web3Services";
import { useState, useEffect } from "react";

export default function Home() {
  
  const [requests, setRequests] = useState([]);
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    loadRequests(lastId);
  }, [lastId])

  async function loadRequests(lastId){
    try {
      const result = await getOpenRequests(lastId);
      if(lastId === 0)
        setRequests(result);
      else {
        requests.push(...result);
        setRequests(requests);
      }
    }
    catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
  
  function btnLoadMore(){
    setLastId(Number(requests[requests.length -1].id));
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row ps-5">
          <p className="lead m-4">Support flood and other climate disaster victims.</p>
        </div>
        <div className="p-4 mx-5">
          <div className="list-group">
            {
              requests && requests.length
              ? requests.map(rq => <DonationRequest key={rq.id} data={rq}/>)
              : <>Connect with your Metamask wallet</>
            }
          </div>
          {
            requests && requests.length && requests.length % 10 === 0
            ? (
              <div className="mt-3 text-center">
                <button type="button" onClick={btnLoadMore} className="btn btn-outline-dark btn-lg">More Requests</button>
              </div>
            ) : <></>
          }
        </div>
        <Footer />
      </div>
    </>
  );
}
