"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getOpenRequests } from "@/services/Web3Services";
import { useState, useEffect } from "react";

export default function Home() {
  
  const [requests, setRequests] = useState([])

  useEffect(() => {
    loadRequests(0);
  }, [])

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
              ? requests.map(rq => <Request key={rq.id} data={rq}/>)
              : <>Connect with your Metamask wallet</>
            }
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
