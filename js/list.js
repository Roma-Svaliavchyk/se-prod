import axios from 'axios';

const getUser = async (userId) => { 
  try {
      
      const response = await axios.get(`https://solar-energy-serv.onrender.com/luser`);
      const user = response.data;
      console.log(response.data);

      // Запис даних користувача в змінні
      const userEmail = user.email;
      const userToken = user.token;

      localStorage.setItem("token", user.token);
      localStorage.setItem("email", user.email);

      console.log('Email:', userEmail);
      console.log('Token:', userToken);
  } catch (error) {
      console.error('Error fetching user:', error);
  }
};

console.log("axios conect");
console.log("ddddd");


console.log("def");
console.log(localStorage.getItem("token"));
console.log(localStorage.getItem("email"));

//const axios = require('axios');



const container = document.querySelector("#js-list-order");
const getOrgersQuery =
  localStorage.getItem("email") === "admin@gmail.com"
    ? "https://solar-energy-serv.onrender.com/order"
    : "https://solar-energy-serv.onrender.com/userOrders/" + localStorage.getItem("email");

const getnawData = axios
  .get(getOrgersQuery)
  .then((response) => {
    try {
      console.log("Отримана відповідь від сервера:");
      console.log(response.data); // Вивести отримані дані у консоль

      const itemNew = response.data
        .map((itemOrder) => {
          return `<li class="item-order">
      <div class="main-container">
          <div class="title-container">
              <div class="title-grup">
                  <h3 class="title-order text-order" >І'мя:</h3>
                  <p class="name-order text-order">${
                    itemOrder.user.fullName
                  }</p>
              </div>
              <div class="title-grup">
                  <h3 class="title-order text-order">Електронна адреса:</h3>
                  <p class="email-order text-order" ></p>${
                    itemOrder.user.email
                  }</p>
              </div>
              <div class="title-grup">
                  <h3 class="title-order text-order">Телефон:</h3>
                  <p class="email-order text-order" ></p>${
                    itemOrder.user.tel
                  }</p>
              </div>
          </div>
          <div class="title-grup">
              <h3 class="title-order text-order">Назва тема питання:</h3>
              <p class="communication-order text-order">${
                itemOrder.fullName
              }</p>
          </div>
          <div class="title-grup">
              <h3 class="title-order text-order">Формат відповіді:</h3>
              <p class="communication-order text-order">${
                itemOrder.communication
              }</p>
          </div>
          <div class="title-grup">
              <h3 class="title-order text-order">Запитання:</h3>
              <p class="description-order text-order">${
                itemOrder.description
              }</p>
          </div>
          
      </div>
  </li>`;
        })
        .join("");

      console.log(itemNew);

      if(itemNew != "")
      {
        container.innerHTML = itemNew;       
      }
      else{
        const listClear = `<li class="item-order">
        <div class="main-container">
            <div class="title-container">
                <div class="title-grup">
                    <h3 class="title-order text-order" >Ви не залишали питань!</h3>
                </div>            
            </div>         
        </div>
        </li>`;
        container.innerHTML = listClear;
      }
      

      
    } catch (err) {
      console.log(err);
    }
  })
  .catch((error) => {
    console.error("Сталася помилка під час виконання запиту:", error);
  });

  
getUser();
getnawData();