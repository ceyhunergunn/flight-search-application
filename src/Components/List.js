import React from "react";
import { AuthContext } from "../Contexts/AuthContext";

const List = () => {
  const { departureFlights, arrivalFlights, dates, date, from, to, oneway } =
    React.useContext(AuthContext);

  console.log(departureFlights);
  console.log(arrivalFlights);
  return (
    <div
      className="search-area p-3"
      style={{ height: (window.innerHeight * 80) / 100, overflow: "none auto" }}
    >
      {oneway === true ? (
        <div className="row p-3">
          <div className="col-lg-12 col-md-12 p-3 pb-0">
            <div className="flight-detail primary-text p-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>Gidiş</div>
                <div>{date.format()} </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-5">
                  <div>{from.value}</div>
                  <div>{from.label}</div>
                </div>
                <div className="col-lg-2 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-plane-departure"></i>
                </div>
                <div className="col-lg-5 text-end">
                  <div>{to.value}</div>
                  <div>{to.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-6 col-md-12 p-3 pb-0">
            <div className="flight-detail primary-text p-3">
              {" "}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>Gidiş</div>
                <div>{dates[0].format()} </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-5">
                  <div>{from.value}</div>
                  <div>{from.label}</div>
                </div>
                <div className="col-lg-2 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-plane-departure"></i>
                </div>
                <div className="col-lg-5 text-end">
                  <div>{to.value}</div>
                  <div>{to.label}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 p-3 pb-0">
            <div className=" flight-detail primary-text p-3">
              {" "}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>Dönüş</div>
                <div>{dates[1].format()} </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-5">
                  <div>{from.value}</div>
                  <div>{from.label}</div>
                </div>
                <div className="col-lg-2 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-plane-arrival"></i>
                </div>
                <div className="col-lg-5 text-end">
                  <div>{to.value}</div>
                  <div>{to.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {departureFlights.map((flight) => (
        <div className="list-item">asd</div>
      ))} */}
    </div>
  );
};

export default List;
