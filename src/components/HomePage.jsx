import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales";
// i18n
import { useTranslation } from 'react-i18next'; 
let cancelAxios = null;
export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    name: null,
    number: null,
    max: null,
    min: null,
    description: null,
    icon: null,
  });
  const [lang, setLang] = useState("ar")
  function handelLanguageClick() {
    if(lang == "en"){
      setLang("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }else{
      setLang("en");
      i18n.changeLanguage("en");
      moment.locale("en")
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }
  // show live clock
  useEffect(() => {
    moment.locale("ar");
    const interval = setInterval(() => {
      setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // Optionally the request above could also be done as
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=27.26&lon=31.15&appid=ab377f442ee4725bb18ca59d35aab71a`,
        {
          cancelToken: new axios.CancelToken((c) => {
            // An executor function receives a cancel function as a parameter
            cancelAxios = c;
          }),
        },
      )
      .then(function (response) {
        console.log(response.data);
        
        let name = response.data.name;
        let ResponseTemp = (response.data.main.temp - 272.15).toFixed(1);
        let ResponseMax = (response.data.main.temp_max - 272.15).toFixed(1);
        let ResponseMin = (response.data.main.temp_min - 272.15).toFixed(1);
        let description = response.data.weather[0].description;
        let responseIcon = response.data.weather[0].icon;

        setTemp({
          name: name,
          number: ResponseTemp,
          max: ResponseMax,
          min: ResponseMin,
          description: description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });

      })
      .catch(function (error) {
        console.error(error);
      });
    return () => {
      cancelAxios();
    };
  }, []);
  return (
    <>
      <div className="content d-flex justify-content-center align-items-center"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <div className="container w-100 w-md-50">
          <div className="card text-light p-2">
            <div className="card-header border-light">
              <p className="fs-1 m-0">
                {t("abnub")} <span className="fs-4"> {dateAndTime}</span>
                
              </p>
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column justify-content-center align-items-start">
                <div className="d-flex align-items-center gap-2">
                  <div>
                    <p className="degree m-0">{temp.number}</p>
                  </div>
                  <div>
                    <img width={"75px"} src={temp.icon} alt="weather icon" />
                  </div>
                </div>
                <div>
                  <p>{t(temp.description)}</p>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <h6 className="m-0">
                    {t("max")}: <span>{temp.max} </span> °C
                  </h6>
                  <h6 className="m-0">|</h6>
                  <h6 className="m-0">
                    {t("min")}: <span>{temp.min} </span> °C
                  </h6>
                </div>
              </div>
              <div>
                <i className="bi bi-cloud-fill"></i>
              </div>
            </div>
          </div>
          <button onClick={handelLanguageClick} className="btn btn-outline-light mt-3" type="button">
            {lang == "ar" ? "English" : "عربي"}
          </button>
        </div>
      </div>
    </>
  );
}
