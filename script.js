"use strict";

window.addEventListener("DOMContentLoaded", (e)=>{

function loader(){
   $(".load-content").classList.add("hide");
}

setTimeout(loader,2000)

const regions = [...provencie];

// ============== DYNAMIC OPTIONS ===========

function renderOptions() {
   regions.sort();
   regions.forEach((item) => {
      const option = createElement("option", "item-option", item);
      $("#region").appendChild(option);
   });
}
renderOptions();

// getData("toshkent");
// ============= SEND region name ============////

$("#region").addEventListener("change", (e) => {
   e.preventDefault();

   localStorage.setItem("region", e.target.value);
   const city = localStorage.getItem("region");



   switch (city.toLowerCase()) {
      case "farg'ona":
         getData("qo'qon");
         break;
      case "qashqadaryo":
         getData("qarshi");
         break;
      case "surxondaryo":
         getData("termiz");
         break;
      case "xorazm":
         getData("urganch");
         break;
      case "sirdaryo":
         getData("guliston");
         break;
      case "buxoro":
         getData("buxoro");
         break;
      case "andijon":
         getData("andijon");
         break;
      case "samarqand":
         getData("samarqand");
         break;
      case "jizzax":
         getData("jizzax");
         break;
         case "navoiy":
         getData("navoiy");
         break;
      case "toshkent":
         getData("toshkent");
         break; 

      default:
         getData('toshkent');
   }

});

// ============== REQUEST API =======================////

async function getData(select) {
   // BUGUN UCHUN
   const today = await fetch(
      `https://islomapi.uz/api/present/day?region=${select}`
   );
   const dayResult = await today.json();

   // Haftalik
   const week = await fetch(
      `https://islomapi.uz/api/present/week?region=${select}`
   );
   const weekResult= await week.json();


   localStorage.setItem("data", JSON.stringify(dayResult));
   localStorage.setItem('week', JSON.stringify(weekResult));



   renderData();

   console.log(dayResult);
   console.log(weekResult);
}

// ============== RENDER DATA =================///

function renderData() {
   $('#week').innerHTML="";
   const data = JSON.parse(localStorage.getItem("data"));
   const week=JSON.parse(localStorage.getItem('week'));
   // console.log(week);

  
   const {
      region,
      date,
      times: {
         asr,
         peshin,
         shom_iftor,
         tong_saharlik,
         quyosh,
         hufton
      },
   } = data;

   $("#city").innerHTML = region;
   $(".date").innerHTML = date;

   $a(".card-time")[0].innerHTML = tong_saharlik;
   $a(".card-time")[1].innerHTML = quyosh;
   $a(".card-time")[2].innerHTML = peshin;
   $a(".card-time")[3].innerHTML = asr;
   $a(".card-time")[4].innerHTML = shom_iftor;
   $a(".card-time")[5].innerHTML = hufton;


   // week render

   const time=new Date();
   const currentTime=time.getDay();
   // currentTime.setDay(3);

    console.log(time.getDay());  

   week.forEach((item,index) => { 
      const tr=createElement('tr', `${ (index+1===currentTime) ? "bg-active" : ""}`, `         
      
      <td>${item.region}</td> <td>${item.date.substring(0,10)}</td> <td>${item.weekday}</td> 
      <td>${item.times.tong_saharlik}</td>  <td>${item.times.quyosh}</td> <td>${item.times.peshin}</td> 
      <td>${item.times.asr}</td> <td>${item.times.shom_iftor}</td> <td>${item.times.hufton}</td>`);


      $('#week').appendChild(tr);

   })

}

renderData();

// ================= CLOCK ===============///

function clock() {
   setInterval(() => {
      const date = new Date();
      $(
         "#hour"
      ).innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
   }, 1000);
}

clock();


});