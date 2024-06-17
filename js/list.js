import axios from 'axios';

const getUser = async () => { 
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

      if (localStorage.getItem("email") === "admin@gmail.com") {
          console.log('Email: yuuuuuuhuuuuuu');
      }

      getnawData();
  } catch (error) {
      console.error('Error fetching user:', error);
  }
};

const getnawData = async () => {
  const container = document.querySelector("#js-list-order");
  const getOrgersQuery =
    localStorage.getItem("email") === "admin@gmail.com"
      ? "https://solar-energy-serv.onrender.com/order"
      : "https://solar-energy-serv.onrender.com/userOrders/" + localStorage.getItem("email");

  try {
    const response = await axios.get(getOrgersQuery);
    console.log("Отримана відповідь від сервера:");
    console.log(response.data);

    const itemNew = response.data
      .map((itemOrder) => {
        const user = itemOrder.user || {}; // Використовуємо порожній об'єкт, якщо itemOrder.user не існує
        return `<li class="item-order">
          <div class="main-container">
              <div class="title-container">
                  <div class="title-grup">
                      <h3 class="title-order text-order" >Ім'я:</h3>
                      <p class="name-order text-order">${user.fullName || 'Невідомо'}</p>
                  </div>
                  <div class="title-grup">
                      <h3 class="title-order text-order">Електронна адреса:</h3>
                      <p class="email-order text-order">${user.email || 'Невідомо'}</p>
                  </div>
                  <div class="title-grup">
                      <h3 class="title-order text-order">Телефон:</h3>
                      <p class="email-order text-order">${user.tel || 'Невідомо'}</p>
                  </div>
              </div>
              <div class="title-grup">
                  <h3 class="title-order text-order">Назва тема питання:</h3>
                  <p class="communication-order text-order">${itemOrder.fullName || 'Невідомо'}</p>
              </div>
              <div class="title-grup">
                  <h3 class="title-order text-order">Формат відповіді:</h3>
                  <p class="communication-order text-order">${itemOrder.communication || 'Невідомо'}</p>
              </div>
              <div class="title-grup">
                  <h3 class="title-order text-order">Запитання:</h3>
                  <p class="description-order text-order">${itemOrder.description || 'Невідомо'}</p>
              </div>
          </div>
      </li>`;
      })
      .join("");

    console.log(itemNew);

    if (itemNew !== "") {
      container.innerHTML = itemNew;       
    } else {
      const listClear = `<li class="item-order">
        <div class="main-container">
            <div class="title-container">
                <div class="title-grуп">
                    <h3 class="title-order text-order">Ви не залишали питань!</h3>
                </div>            
            </div>         
        </div>
      </li>`;
      container.innerHTML = listClear;
    }
  } catch (error) {
    console.error("Сталася помилка під час виконання запиту:", error);
  }
};

// Викликаємо функцію для отримання даних користувача
getUser();
