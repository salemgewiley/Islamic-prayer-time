fetchTimingsByCity("Al Qāhirah");
let cities = [
  "القاهرة",
  "الجيزة",
  "القليوبية",
  "الإسكندرية",
  "الدقهلية",
  "البحر الأحمر",
  "البحيرة",
  "الفيوم",
  "الغربية",
  "الإسماعيلية",
  "المنوفية",
  "المنيا",
  "الوادي الجديد",
  "السويس",
  "أسوان",
  "أسيوط",
  "بني سويف",
  "بورسعيد",
  "دمياط",
  "الشرقية",
  "جنوب سيناء",
  "كفر الشيخ",
  "مطروح",
  "الأقصر",
  "قنا",
  "شمال سيناء",
  "سوهاج",
];

// إضافة الخيارات إلى القائمة المنسدلة
let selectElement = document.getElementById("cities_select");
for (let i = 0; i < cities.length; i++) {
  let option = document.createElement("option");
  option.value = cities[i];
  option.textContent = cities[i];
  selectElement.appendChild(option);
}

// الاستماع إلى التغيير في القائمة المنسدلة
document.addEventListener("DOMContentLoaded", function () {
  const lastSelectedCity = localStorage.getItem("selectedCity");
  if (lastSelectedCity) {
    document.getElementById("cities_select").value = lastSelectedCity;
    fetchTimingsByCity(lastSelectedCity);
    document.getElementById("city-name").innerHTML = lastSelectedCity;
  }
});
document
  .getElementById("cities_select")
  .addEventListener("change", function () {
    let selectedCity = this.value;
    localStorage.setItem("selectedCity", selectedCity);
    if (selectedCity == "القاهرة") {
      fetchTimingsByCity("Al Qāhirah");
    } else if (selectedCity == "الجيزة") {
      fetchTimingsByCity("Al Jīzah");
    } else if (selectedCity == "الإسكندرية") {
      fetchTimingsByCity("Al Iskandarīyah");
    } else if (selectedCity == "الدقهلية") {
      fetchTimingsByCity("Ad Daqahlīyah");
    } else if (selectedCity == "البحر الأحمر") {
      fetchTimingsByCity("Al Baḩr al Aḩmar");
    } else if (selectedCity == "البحيرة") {
      fetchTimingsByCity("Al Buḩayrah");
    } else if (selectedCity == "الفيوم") {
      fetchTimingsByCity("Al Fayyūm");
    } else if (selectedCity == "الغربية") {
      fetchTimingsByCity("Al Gharbīyah");
    } else if (selectedCity == "الإسماعيلية") {
      fetchTimingsByCity("Al Ismā‘īlīyah");
    } else if (selectedCity == "المنوفية") {
      fetchTimingsByCity("Al Minūfīyah");
    } else if (selectedCity == "المنيا") {
      fetchTimingsByCity("Al Minyā");
    } else if (selectedCity == "القليوبية") {
      fetchTimingsByCity("Al Qalyūbīyah");
    } else if (selectedCity == "الوادي الجديد") {
      fetchTimingsByCity("Al Wādī al Jadīd");
    } else if (selectedCity == "السويس") {
      fetchTimingsByCity("As Suways");
    } else if (selectedCity == "أسوان") {
      fetchTimingsByCity("Aswān");
    } else if (selectedCity == "أسيوط") {
      fetchTimingsByCity("Asyūţ");
    } else if (selectedCity == "بني سويف") {
      fetchTimingsByCity("Banī Suwayf");
    } else if (selectedCity == "بورسعيد") {
      fetchTimingsByCity("Būr Sa‘īd");
    } else if (selectedCity == "دمياط") {
      fetchTimingsByCity("Dumyāţ");
    } else if (selectedCity == "الشرقية") {
      fetchTimingsByCity("Ash Sharqīyah");
    } else if (selectedCity == "جنوب سيناء") {
      fetchTimingsByCity("Janūb Sīnā'");
    } else if (selectedCity == "كفر الشيخ") {
      fetchTimingsByCity("Kafr ash Shaykh");
    } else if (selectedCity == "مطروح") {
      fetchTimingsByCity("Maţrūḩ");
    } else if (selectedCity == "الأقصر") {
      fetchTimingsByCity("Al Uqşur");
    } else if (selectedCity == "قنا") {
      fetchTimingsByCity("Qinā");
    } else if (selectedCity == "شمال سيناء") {
      fetchTimingsByCity("Shamāl Sīnā'");
    } else if (selectedCity == "سوهاج") {
      fetchTimingsByCity("Sūhāj");
    }
    document.getElementById("city-name").innerHTML = selectedCity;
  });

function fetchTimingsByCity(city) {
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
    city
  )}&country=EGY`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const timings = data.data.timings;
      const readable = data.data.date.gregorian.date;
      const weekDay = data.data.date.hijri.weekday.ar;
      const Date = weekDay + " " + readable;
      document.getElementById("fajr").innerHTML = convertTo12HourFormat(
        timings.Fajr
      );
      document.getElementById("sobh").innerHTML = convertTo12HourFormat(
        timings.Sunrise
      );
      document.getElementById("zuhr").innerHTML = convertTo12HourFormat(
        timings.Dhuhr
      );
      document.getElementById("asr").innerHTML = convertTo12HourFormat(
        timings.Asr
      );
      document.getElementById("maghrib").innerHTML = convertTo12HourFormat(
        timings.Maghrib
      );
      document.getElementById("isha").innerHTML = convertTo12HourFormat(
        timings.Isha
      );
      document.getElementById("date").innerHTML = Date;
      console.log(Date);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function convertTo12HourFormat(time) {
  const [hour, minute] = time.split(":");
  let period = "AM";
  let hour12 = parseInt(hour, 10);

  if (hour12 >= 12) {
    period = "PM";
    if (hour12 > 12) {
      hour12 -= 12;
    }
  } else if (hour12 === 0) {
    hour12 = 12;
  }

  return `${hour12}:${minute} ${period}`;
}
