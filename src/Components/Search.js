import React from "react";
import Select from "react-select";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { isMobile } from "react-device-detect";
import { AuthContext } from "../Contexts/AuthContext";

const Search = () => {
  const {
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
    getArrivalFlights,
    getDepartureFlights,
  } = React.useContext(AuthContext);
  const weekdays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const months = [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ];
  const changeDirection = (from, to) => {
    setFrom(to);
    setTo(from);
  };
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: "normal",
      color: "#5d91ca",
      backgroundColor: "bg-dark",
      fontSize: state.selectProps.myFontSize,
    }),
    input: (provided) => ({
      ...provided,
      color: "#f1f1f1",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#f1f1f1",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#f1f1f1",
      fontSize: "18px",
    }),
  };
  const cities = [
    { value: "Ağrı", label: "Ağrı Hvl.", cityCode: "AJI", cityPlate: "04" },
    { value: "Ankara", label: "Ankara Hvl.", cityCode: "ESB", cityPlate: "06" },
    {
      value: "Antalya",
      label: "Antalya Hvl.",
      cityCode: "AYT",
      cityPlate: "07",
    },
    { value: "Bursa", label: "Bursa Hvl.", cityCode: "YEI", cityPlate: "16" },
    {
      value: "Erzurum",
      label: "Erzurum Hvl.",
      cityCode: "ERZ",
      cityPlate: "25",
    },
    {
      value: "Gaziantep",
      label: "Gaziantep Hvl.",
      cityCode: "GZT",
      cityPlate: "27",
    },
    {
      value: "İstanbul",
      label: "İstanbul Hvl.",
      cityCode: "SAW",
      cityPlate: "34",
    },
    { value: "İzmir", label: "İzmir Hvl.", cityCode: "ADB", cityPlate: "35" },
    { value: "Samsun", label: "Samsun Hvl.", cityCode: "SZF", cityPlate: "55" },
    {
      value: "Trabzon",
      label: "Trabzon Hvl.",
      cityCode: "TZX",
      cityPlate: "61",
    },
  ];
  const optionsCities = [
    cities?.map((city) => {
      return {
        value: city?.value,
        label: `${city.cityPlate} ${city.label} (${city.cityCode})`,
      };
    }),
  ];
  document.documentElement.style.setProperty(
    "--left-position",
    document.getElementById("search-area")?.offsetWidth + "px"
  );
  return (
    <div className="search-area p-3" id="search-area">
      <div className="row p-3">
        <div className="col-lg-5 col-md-12">
          <div className="text-start primary-text">Nereden</div>
          <Select
            placeholder="Seçiniz"
            isClearable={true}
            isSearchable={true}
            name="color"
            value={from}
            onChange={setFrom}
            styles={styles}
            options={optionsCities[0]}
            noOptionsMessage={() => "Sonuç Bulunamadı"}
          />
        </div>
        <div className="col-lg-2 col-md-12 d-flex align-items-center justify-content-center">
          <i
            className="d-none d-lg-block fa-solid fa-arrow-right-arrow-left icon-font mt-4"
            onClick={() => changeDirection(from, to)}
          ></i>
          <i
            className="d-block d-lg-none fa-solid fa-arrow-right-arrow-left icon-font mt-4"
            style={{ transform: "rotate(90deg)" }}
            onClick={() => changeDirection(from, to)}
          ></i>
        </div>
        <div className="col-lg-5 col-md-12">
          <div className="text-start primary-text">Nereye</div>
          <Select
            placeholder="Seçiniz"
            isClearable={true}
            isSearchable={true}
            noOptionsMessage={() => "Sonuç Bulunamadı"}
            value={to}
            onChange={setTo}
            name="color"
            styles={styles}
            options={optionsCities[0]}
          />
        </div>
      </div>
      <div className="p-3">
        <div className="radio-inputs w-100">
          <label className="radio">
            <input
              type="radio"
              name="radio"
              checked={oneway === true ? true : false}
              onChange={() => setOneway(true)}
            />
            <span className="name primary-text">Tek Yön</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              checked={oneway === false ? true : false}
              onChange={() => setOneway(false)}
            />
            <span className="name primary-text">Gidiş - Dönüş</span>
          </label>
        </div>
      </div>
      <div className="p-3">
        <div className="col-lg-12 col-md-12">
          {oneway === false ? (
            <DatePicker
              minDate={new DateObject()}
              range
              dateSeparator=" - "
              format="DD.MM.YYYY"
              value={dates}
              onChange={setDates}
              numberOfMonths={isMobile ? 1 : 2}
              weekDays={weekdays}
              months={months}
              mapDays={({
                date,
                today,
                selectedDate,
                currentMonth,
                isSameDate,
              }) => {
                let props = {};

                props.style = {
                  borderRadius: "3px",
                  backgroundColor:
                    date.month.index === currentMonth.index ? "" : "",
                };

                if (isSameDate(date, today)) props.style.color = "white";
                if (isSameDate(date, selectedDate))
                  props.style = {
                    ...props.style,
                    color: "#5d91ca",
                  };

                return props;
              }}
            />
          ) : (
            <DatePicker
              value={date}
              minDate={new Date()}
              onChange={setDate}
              format="DD.MM.YYYY"
              numberOfMonths={isMobile ? 1 : 2}
              weekDays={weekdays}
              months={months}
              mapDays={({
                date,
                today,
                selectedDate,
                currentMonth,
                isSameDate,
              }) => {
                let props = {};

                props.style = {
                  borderRadius: "3px",
                  backgroundColor:
                    date.month.index === currentMonth.index ? "#5d91ca" : "",
                };

                if (isSameDate(date, today)) props.style.color = "#f1f1f1";
                if (isSameDate(date, selectedDate))
                  props.style = {
                    ...props.style,
                    color: "white",
                  };

                return props;
              }}
            />
          )}
        </div>
      </div>
      <div className="p-3">
        <div
          className="mx-auto btn-search d-flex align-items-center justify-content-center primary-text"
          onClick={() => {
            if (from === "" || to === "") {
              Toast.fire({
                icon: "error",
                title: "Kalkış ve varış şehirlerini seçiniz.",
              });
            } else if (from.value === to.value) {
              Toast.fire({
                icon: "error",
                title: "Kalkış ve varış şehirleri farklı olmalıdır.",
              });
            } else if (oneway) {
              getDepartureFlights(date.format());
            } else {
              getDepartureFlights(dates[0].format());
              getArrivalFlights(dates[1].format());
            }
          }}
        >
          Ara
        </div>
      </div>
    </div>
  );
};

export default Search;
