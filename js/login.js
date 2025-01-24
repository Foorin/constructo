let loginButton = document.getElementById("login-button");
loginButton.onclick = function (event) {
    let login = document.getElementById("login").value;
    let cookieLive = 3600;
    if (login) {
        document.cookie = "login=" + encodeURIComponent(login) + ";max-age=" + cookieLive;
        location.href = "index.html";
    }
    //Отключаем стандартное перенаправление обработки формы
    return false;
}


function getCookie() {
    let cookieArray1 = document.cookie.split(";");
    let cookieObject = {};
    //для каждого элемента из массива
    for (const cookie of cookieArray1) {
        //уберем лишние пробелы по краям
        let element = cookie.trim();
        element = element.split("=");
        //первый элемент из этого массива - это имя ключа
        let key = element[0];
        //второй элемент из этого массива - это значение ключа
        let value = element[1];
        //формирует элемент массива куков с именем и значением ключа.
        cookieObject[key] = value;
    }
    return cookieObject;
   }
   
   //Получаем все куки
   let allCookies = getCookie();
   //Ищем область, куда будем добавлять html-теги, по ее идентификатору:
   let loginRegContainer = document.getElementById("login-reg-container");
   if (allCookies["login"]) {
    /*Если в куки сохранен логин, то в шапке отображаем логин и "выйти".
   Функция decodeURIComponent преобразует сохраненный логин в человеко-понятные символы*/
    let login = decodeURIComponent(allCookies["login"]);
    loginRegContainer.innerHTML = `
    <a href="#" class="login-name">${login}</a>
    <a href="#" class="button" id="logout">ВЫЙТИ</a>
    `;
   } else {
    //иначе кнопки входа и регистрации
    loginRegContainer.innerHTML = `
    <a href="#modal-window" class="button" id="show-modal-window">ВХОД</a>
    <a href="#" class="button">РЕГИСТРАЦИЯ</a>
    `;

    /* Добавим обработчики открытия и закрытия модального окна,
   которое появится после нажатия по кнопке "Вход"*/

    //получаем кнопку «Вход» по ее идентификатору:
    let showModalButton = document.getElementById("show-modal-window");
    //Добавим обработчик нажатия кнопки «Вход» в шапке сайта:
    showModalButton.onclick = function (event) {
        let modalWindow = document.getElementById("modal-window");
        //Добавляем к окну класс, который его отображает
        modalWindow.classList.add("show-modal-window");
        //Отключаем стандартное перенаправление тега ссылки:
        return false;
    }


    let hideModalButton = document.getElementById("hide-modal-window");
    hideModalButton.onclick = function (event) {
        let modalWindow = document.getElementById("modal-window");
        /*Убираем у окна класс, который его отображает. В результате окно скрывается*/
        modalWindow.classList.remove("show-modal-window");
        //Отключаем стандартное перенаправление тега ссылки:
        return false;
    }
   }
   

let logoutButton = document.getElementById("logout");
if (logoutButton) {
 logoutButton.onclick = function (event) {
 event.preventDefault();
 //Затираем сохраненный в куках логин:
 document.cookie = "login=";
 //Перезагружаем текущую страницу:
 location.reload();

}
}