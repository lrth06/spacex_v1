import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "./Loader";
import Zoom from "react-reveal/Zoom";

export function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  function getData() {
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }

  useEffect(() => {
    getData();
    setTimeout(function () {
      setLoading(false);
    }, 10000);
  }, []);
  if (loading) return <Loader />;
  if (error) return <div>ERROR...{JSON.stringify(error)}</div>;
  return (
    <div className="spacex">
      <ul>
        {data.map((data) => {
          return (
            <Zoom>
              <div className="results">
                <div key={data.id}>
                  <h2>{data.name}</h2>
                  <p>{data.date_local}</p>
                  <p>{data.details}</p>
                  <img className="patch" src={data.links.patch.large} alt="" />
                  <br />
                  <img src={data.links.flickr.original[0]} alt="" />
                  <img src={data.links.flickr.original[1]} alt="" />
                  <img src={data.links.flickr.original[2]} alt="" />
                  <img src={data.links.flickr.original[3]} alt="" />
                </div>
              </div>
            </Zoom>
          );
        })}
      </ul>
    </div>
  );
}
