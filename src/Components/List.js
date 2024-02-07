import React, { useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Collapse } from "react-collapse";

const List = () => {
  const {
    setProcess,
    departureFlights,
    arrivalFlights,
    setDepartureFlights,
    setArrivalFlights,
    dates,
    date,
    from,
    to,
    oneway,
  } = React.useContext(AuthContext);
  const [collapseStatesDeparture, setCollapseStatesDeparture] = useState(
    departureFlights.map(() => false)
  );
  const [collapseStatesArrival, setCollapseStatesArrival] = useState(
    departureFlights.map(() => false)
  );
  const handleToggleCollapseDeparture = (index) => {
    setCollapseStatesDeparture((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const handleToggleCollapseArrival = (index) => {
    setCollapseStatesArrival((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const sortPriceDeparture = () => {
    departureFlights.sort((a, b) => {
      const priceA = parseInt(a.price);
      const priceB = parseInt(b.price);

      if (priceA < priceB) {
        return -1;
      }
      if (priceA > priceB) {
        return 1;
      }
      return 0;
    });
    setDepartureFlights(departureFlights.slice());
  };
  const sortPriceArrival = () => {
    arrivalFlights.sort((a, b) => {
      const priceA = parseInt(a.price);
      const priceB = parseInt(b.price);

      if (priceA < priceB) {
        return -1;
      }
      if (priceA > priceB) {
        return 1;
      }
      return 0;
    });
    setArrivalFlights(arrivalFlights.slice());
  };
  const sortTimeDeparture = () => {
    departureFlights.sort((a, b) => {
      const timeA = convertFlightTimeToMinutes(a.flightTime);
      const timeB = convertFlightTimeToMinutes(b.flightTime);

      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
      return 0;
    });
    setDepartureFlights(departureFlights.slice());
  };
  const sortTimeArrival = () => {
    departureFlights.sort((a, b) => {
      const timeA = convertFlightTimeToMinutes(a.flightTime);
      const timeB = convertFlightTimeToMinutes(b.flightTime);

      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
      return 0;
    });
    setArrivalFlights(arrivalFlights.slice());
  };

  function convertFlightTimeToMinutes(flightTime) {
    const [hours, minutes] = flightTime.split(" ");
    return parseInt(hours) * 60 + parseInt(minutes);
  }
  return (
    <div
      className="search-area p-3"
      style={{
        height: (window.innerHeight * 80) / 100,
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {oneway === true ? (
        <div className="row p-3 pt-0">
          <div
            style={{ width: "50px", height: "50px" }}
            className="d-flex align-items-center justify-content-start"
            onClick={() => setProcess("search")}
          >
            <i class="fa-solid fa-arrow-left icon-font"></i>
          </div>
          <div className="col-lg-12 col-md-12 p-3 pt-0 pb-0">
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
                  <i className="fa-solid fa-plane-departure my-3"></i>
                </div>
                <div className="col-lg-5 text-end">
                  <div>{to.value}</div>
                  <div>{to.label}</div>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-end">
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid white",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => sortPriceDeparture()}
                  className="d-flex align-items-center justify-content-center me-2"
                >
                  ₺
                </div>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid white",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => sortTimeDeparture()}
                  className="d-flex align-items-center justify-content-center"
                >
                  <i class="fa-regular fa-clock"></i>
                </div>
              </div>
            </div>
          </div>
          {departureFlights?.map((flight, index) => (
            <div className="col-lg-12 col-md-12 px-3 py-0">
              <div className="primary-text flight-details p-3">
                <div className="d-flex justify-content-between w-100">
                  <div className="">
                    <div>{flight.airline}</div>
                    <div className="d-flex">
                      <div className="me-2">
                        {flight.departureDate.slice(11, 16)}
                      </div>
                      <div className="d-flex align-items-center justify-content-center me-2">
                        <i
                          class="fa-solid fa-arrow-right icon-font"
                          style={{ fontSize: "18px" }}
                        ></i>
                      </div>
                      <div>{flight.arrivalDate.slice(11, 16)}</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      className="primary-text d-flex align-items-center me-3"
                      style={{ fontSize: "30px" }}
                    >
                      {flight.price}₺
                    </div>
                    <i
                      class="fa-solid fa-chevron-down icon-font"
                      onClick={() => handleToggleCollapseDeparture(index)}
                    ></i>
                  </div>
                </div>
                <Collapse isOpened={collapseStatesDeparture[index]}>
                  <div
                    className="d-flex justify-content-between my-2"
                    style={{ fontSize: "24px" }}
                  >
                    <div>
                      {flight.iataCode}
                      {flight.flightNumber}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="primary-text d-flex align-items-center me-3"
                        style={{ fontSize: "24px" }}
                      >
                        {flight.flightTime}
                      </div>
                      <i
                        class="fa-solid fa-chevron-down icon-font"
                        style={{ visibility: "hidden" }}
                      ></i>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          <div className="col-12 ">
            <div
              style={{ width: "50px", height: "50px" }}
              className="d-flex align-items-center justify-content-center"
              onClick={() => setProcess("search")}
            >
              <i class="fa-solid fa-arrow-left icon-font"></i>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 p-3 pt-0 pb-0">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="flight-detail primary-text p-3">
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
                      <i className="fa-solid fa-plane-departure my-3"></i>
                    </div>
                    <div className="col-lg-5 text-end">
                      <div>{to.value}</div>
                      <div>{to.label}</div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex align-items-center justify-content-end">
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid white",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => sortPriceDeparture()}
                      className="d-flex align-items-center justify-content-center me-2"
                    >
                      ₺
                    </div>
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid white",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => sortTimeDeparture()}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <i class="fa-regular fa-clock"></i>
                    </div>
                  </div>
                </div>
              </div>
              {departureFlights?.map((flight, index) => (
                <div className="col-lg-12 col-md-12">
                  <div className="primary-text flight-details p-3">
                    <div className="d-flex justify-content-between w-100">
                      <div className="">
                        <div>{flight.airline}</div>
                        <div className="d-flex">
                          <div className="me-2">
                            {flight.departureDate.slice(11, 16)}
                          </div>
                          <div className="d-flex align-items-center justify-content-center me-2">
                            <i
                              class="fa-solid fa-arrow-right icon-font"
                              style={{ fontSize: "18px" }}
                            ></i>
                          </div>
                          <div>{flight.arrivalDate.slice(11, 16)}</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="primary-text d-flex align-items-center me-3"
                          style={{ fontSize: "30px" }}
                        >
                          {flight.price}₺
                        </div>
                        <i
                          class="fa-solid fa-chevron-down icon-font"
                          onClick={() => handleToggleCollapseDeparture(index)}
                        ></i>
                      </div>
                    </div>
                    <Collapse isOpened={collapseStatesDeparture[index]}>
                      <div
                        className="d-flex justify-content-between my-2"
                        style={{ fontSize: "24px" }}
                      >
                        <div>
                          {flight.iataCode}
                          {flight.flightNumber}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className="primary-text d-flex align-items-center me-3"
                            style={{ fontSize: "24px" }}
                          >
                            {flight.flightTime}
                          </div>
                          <i
                            class="fa-solid fa-chevron-down icon-font"
                            style={{ visibility: "hidden" }}
                          ></i>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-12 p-3 pt-0 pb-0">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="flight-detail primary-text p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>Dönüş</div>
                    <div>{dates[1].format()} </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-lg-5">
                      <div>{to.value}</div>
                      <div>{to.label}</div>
                    </div>
                    <div className="col-lg-2 d-flex align-items-center justify-content-center">
                      <i className="fa-solid fa-plane-arrival my-3"></i>
                    </div>
                    <div className="col-lg-5 text-end">
                      <div>{from.value}</div>
                      <div>{from.label}</div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex align-items-center justify-content-end">
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid white",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => sortPriceArrival()}
                      className="d-flex align-items-center justify-content-center me-2"
                    >
                      ₺
                    </div>
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid white",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => sortTimeArrival()}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <i class="fa-regular fa-clock"></i>
                    </div>
                  </div>
                </div>
              </div>
              {arrivalFlights?.map((flight, index) => (
                <div className="col-lg-12 col-md-12">
                  {arrivalFlights === "Not found" ? (
                    <div className="primary-text flight-details p-3">
                      <div className="d-flex justify-content-center align-items-center w-100">
                        <div className="text-center my-3">Sonuç Bulunamadı</div>
                      </div>
                    </div>
                  ) : (
                    <div className="primary-text flight-details p-3">
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <div>{flight.airline}</div>
                          <div className="d-flex">
                            <div className="me-2">
                              {flight.departureDate.slice(11, 16)}
                            </div>
                            <div className="d-flex align-items-center justify-content-center me-2">
                              <i
                                class="fa-solid fa-arrow-right icon-font"
                                style={{ fontSize: "18px" }}
                              ></i>
                            </div>
                            <div>{flight.arrivalDate.slice(11, 16)}</div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className="primary-text d-flex align-items-center me-3"
                            style={{ fontSize: "30px" }}
                          >
                            {flight.price}₺
                          </div>
                          <i
                            class="fa-solid fa-chevron-down icon-font"
                            onClick={() => handleToggleCollapseArrival(index)}
                          ></i>
                        </div>
                      </div>
                      <Collapse isOpened={collapseStatesArrival[index]}>
                        <div
                          className="d-flex justify-content-between my-2"
                          style={{ fontSize: "24px" }}
                        >
                          <div>
                            {flight.iataCode}
                            {flight.flightNumber}
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div
                              className="primary-text d-flex align-items-center me-3"
                              style={{ fontSize: "24px" }}
                            >
                              {flight.flightTime}
                            </div>
                            <i
                              class="fa-solid fa-chevron-down icon-font"
                              style={{ visibility: "hidden" }}
                            ></i>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  )}
                </div>
              ))}
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
