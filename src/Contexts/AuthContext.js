import { createContext, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const url = new URL(
    "https://65be4a02dcfcce42a6f22b63.mockapi.io/api/flights"
  );
  const [dates, setDates] = useState([
    new DateObject(),
    new DateObject().add(1, "days"),
  ]);
  const [process, setProcess] = useState("search");
  const [date, setDate] = useState(new DateObject());
  const [from, setFrom] = useState("");
  const [oneway, setOneway] = useState(true);
  const [to, setTo] = useState("");
  const [departureFlights, setDepartureFlights] = useState([]);
  const [arrivalFlights, setArrivalFlights] = useState([]);
  const getDepartureFlights = async (date) => {
    setProcess("loader");
    url.searchParams.append("departureDate", date);
    url.searchParams.append("from", from.value);
    url.searchParams.append("to", to.value);
    await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse !== "Not found") {
          setDepartureFlights(jsonResponse);
          setTimeout(() => {
            setProcess("list");
          }, 3000);
        } else {
          setTimeout(() => {
            setProcess("search");
            Toast.fire({
              icon: "error",
              title: "Sonuç Bulunamadı",
            });
          }, 3000);
        }
      })
      .catch(() => {
        setDepartureFlights([]);
      });
  };
  const getArrivalFlights = async (date) => {
    setProcess("loader");
    url.searchParams.set("departureDate", date);
    url.searchParams.set("from", to.value);
    url.searchParams.set("to", from.value);
    await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse !== "Not found") {
          setArrivalFlights(jsonResponse);
        }
      })
      .catch(() => {
        setDepartureFlights([]);
      });
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    background: "#0d181d",
    color: "white",
    timerProgressBar: false,
    customClass: "alert-body",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  return (
    <AuthContext.Provider
      value={{
        url,
        dates,
        setDates,
        date,
        setDate,
        from,
        setFrom,
        oneway,
        setOneway,
        to,
        setTo,
        Toast,
        process,
        setProcess,
        departureFlights,
        setDepartureFlights,
        arrivalFlights,
        setArrivalFlights,
        getArrivalFlights,
        getDepartureFlights,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
