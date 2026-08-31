##(Weather App link) [https://weather-app-by-react-js.vercel.app/]
# 🌤️ Weather App

A responsive weather application built with **React.js**, using the **OpenWeatherMap API** to fetch real-time weather data, with Arabic/English localization and RTL/LTR support.

## 🚀 Features

* 🌡️ Display current temperature.
* 🔺 Display maximum temperature.
* 🔻 Display minimum temperature.
* 🌤️ Display weather condition and weather icon.
* 📍 Display a translated city name instead of directly displaying the API response.
* 🕐 Live date and time display.
* 🌍 Arabic / English language switching.
* 🔄 Dynamic RTL / LTR direction based on the selected language.
* 📱 Responsive UI using Bootstrap.
* ❌ Cancel Axios requests when the component is unmounted.
* 🌐 Fetch weather data from OpenWeatherMap API.

---

## 🛠️ Technologies Used

### React.js

Used React functional components and hooks to build the application.

### `useState`

Used to manage component state such as:

* Date and time.
* Weather data.
* Selected language.

Example:

```jsx
const [dateAndTime, setDateAndTime] = useState("");
```

---

### `useEffect`

Used for side effects such as:

* Updating the clock.
* Fetching weather data from the API.
* Cleaning up intervals and Axios requests.

Example:

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setDateAndTime(
      moment().format("MMMM Do YYYY, h:mm:ss a")
    );
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

---

## 🌐 API Integration

### Axios

Used to make HTTP requests to the OpenWeatherMap API.

```js
axios.get(API_URL)
  .then((response) => {
    // Handle response
  })
  .catch((error) => {
    // Handle error
  });
```

The application extracts weather information from the API response, including:

* City name
* Temperature
* Maximum temperature
* Minimum temperature
* Weather description
* Weather icon

---

## 🌡️ Temperature Conversion

OpenWeatherMap returns temperature in Kelvin.

The application converts Kelvin to Celsius:

```js
(response.data.main.temp - 272.15).toFixed(1)
```

The same conversion is applied to maximum and minimum temperatures.

---

## 🌍 Internationalization (i18n)

Used:

* `i18next`
* `react-i18next`
* `i18next-http-backend`
* `i18next-browser-languagedetector`

The application supports:

* Arabic
* English

### Translation Structure

```text
public/
└── locales/
    ├── ar/
    │   └── translation.json
    └── en/
        └── translation.json
```

Example:

```json
{
  "abnub": "أبنوب",
  "max": "العظمى",
  "min": "الصغرى",
  "clear sky": "سماء صافية",
  "few clouds": "سحب قليلة",
  "scattered clouds": "سحب متفرقة",
  "broken clouds": "سحب متقطعة",
  "shower rain": "زخات مطر",
  "rain": "مطر",
  "thunderstorm": "عاصفة رعدية",
  "snow": "ثلوج",
  "mist": "ضباب"
}
```

### Dynamic Translation

Instead of displaying the city name returned by the API directly:

```jsx
{temp.name}
```

the application uses it as a translation key:

```jsx
{t("abnub")}
```

Weather descriptions are also translated dynamically:

```jsx
{t(temp.description)}
```

---

## 🔄 Language Switching

The application allows switching between Arabic and English using:

```js
i18n.changeLanguage("ar");
```

and:

```js
i18n.changeLanguage("en");
```

The selected language also changes the page direction.

---

## ↔️ RTL / LTR Support

The application dynamically changes the text direction according to the selected language:

```jsx
dir={i18n.language === "ar" ? "rtl" : "ltr"}
```

Therefore:

```text
Arabic  → RTL
English → LTR
```

---

## 🕐 Date & Time

Used **Moment.js** to display the current date and time.

Arabic locale is enabled using:

```js
import moment from "moment/min/moment-with-locales";

moment.locale("ar");
```

Date formatting:

```js
moment().format("MMMM Do YYYY, h:mm:ss a");
```

The clock is updated periodically using `setInterval`.

---

## ⏱️ Interval Cleanup

The application clears the interval when the component is unmounted:

```js
return () => clearInterval(interval);
```

This prevents unnecessary intervals from continuing to run.

---

## ❌ Axios Request Cancellation

Axios request cancellation was implemented using `CancelToken`.

The request is cancelled when the component is unmounted:

```js
return () => {
  cancelAxios();
};
```

This helps prevent unnecessary API requests and updates after the component is removed.

---

## 🎨 Styling

### Bootstrap

Used Bootstrap utility classes for:

* Flexbox
* Spacing
* Width
* Alignment
* Buttons
* Responsive layout
* Cards

Examples:

```jsx
d-flex
justify-content-center
align-items-center
mt-3
p-2
w-100
```

### Custom CSS

Custom styling was used for:

* Background
* Weather card
* Temperature display
* Typography
* Layout customization

Arabic typography uses:

```css
font-family: "IBM Plex Sans Arabic", sans-serif;
```

---

## 🧠 React Concepts Practiced

This project helped practice:

* Functional Components
* `useState`
* `useEffect`
* Component Re-rendering
* State Updates
* Side Effects
* Cleanup Functions
* `setInterval`
* API Requests
* Async Data Handling
* Conditional Rendering
* Dynamic Translation
* Language Switching
* RTL / LTR
* Axios
* Moment.js
* Bootstrap
* JSON Translation Files
* API Data Transformation

---

## 📂 Main Project Flow

```text
React Component
      ↓
useEffect
      ↓
Axios Request
      ↓
OpenWeatherMap API
      ↓
Weather Response
      ↓
setTemp()
      ↓
React Re-render
      ↓
Display Weather Data
```

For localization:

```text
API Response
      ↓
Weather Description / City Key
      ↓
i18next
      ↓
ar / en translation.json
      ↓
Translated UI
```

For language direction:

```text
i18n.language
      ↓
   ┌───────┐
   │       │
  ar      en
   │       │
  RTL     LTR
```

---

## 📌 What I Learned

Through this project, I practiced how to build a React application that communicates with an external API, manages asynchronous data, updates the UI through state, handles side effects and cleanup, and supports multiple languages with dynamic RTL/LTR layouts.
