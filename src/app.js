const productsEl = document.querySelector("#products");
const searchForm = document.querySelector("#search-form");

const paginationEl = document.querySelector("#pagination");
const modeEl = document.querySelector("#mode");
const queryParams = new URLSearchParams(window.location.search);

const currentPage = queryParams.get("page");
const limit = 20;
async function getData() {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${
      limit * (currentPage - 1)
    }`
  );
  const data = await res.json();
  console.log(data);
  updateCards(data);
}

getData();

async function searchData(text) {
  const res = await fetch(`https://dummyjson.com/products/search?q=${text}`);
  const data = await res.json();
  updateCards(data);
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  const queryText = event.target[0].value;

  searchData(queryText);
});

function updateCards(data) {
  const pages = Math.ceil(data.total / data.limit);
  const paginations = Array.from(Array(pages).keys());
  let activePage = null;
  if (currentPage) {
    activePage = currentPage - 1;
  } else {
    activePage = 0;
  }
  paginationEl.innerHTML = null;
  paginations.forEach(page => {
    const div = document.createElement("div");
    div.className = `flex cursor-pointer justify-center ${
      activePage === page ? "active-page" : "bg-slate-200"
    } items-center w-8 h-8  rounded-full`;
    div.textContent = page + 1;

    div.addEventListener("click", () => {
      window.location.href = `index.html?page=${page + 1}`;
    });
    paginationEl.append(div);
  });
  productsEl.innerHTML = null;
  data.products.forEach(product => {
    const cardEl = document.createElement("div");
    cardEl.className =
      "p-5 bg-white rounded-md shadow-md dark:bg-slate-600 dark:text-slate-100";
    cardEl.innerHTML = `
       <div class='h-[192px] '>
        <img
        class='h-full object-cover'
          src='${product.thumbnail}'
          alt=""
        />
        </div>
        <h2 class="mb-5">
          ${product.title}
        </h2>
        <span class="text-slate-500 block mb-3"
          >${product.description}</span
        >
        <div class="flex justify-between">
          <span class="font-bold"> $${product.price} </span>
          <span class="font-light">${product.rating}</span>
        </div>
      `;
    productsEl.append(cardEl);
  });
}

let isDark = window.localStorage.getItem("mode") === "dark";

function setMode() {
  if (isDark) {
    window.localStorage.setItem("mode", "dark");
    modeEl.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"
      fill="rgba(249,167,122,1)"
    ></path>
  </svg>`;
    document.querySelector("html").classList.add("dark");
  } else {
    window.localStorage.setItem("mode", "light");
    modeEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M9.8216 2.23796C9.29417 3.38265 9 4.65697 9 6C9 10.9706 13.0294 15 18 15C19.343 15 20.6174 14.7058 21.762 14.1784C20.7678 18.6537 16.7747 22 12 22C6.47715 22 2 17.5228 2 12C2 7.22532 5.3463 3.23221 9.8216 2.23796ZM18.1642 2.29104L19 2.5V3.5L18.1642 3.70896C17.4476 3.8881 16.8881 4.4476 16.709 5.16417L16.5 6H15.5L15.291 5.16417C15.1119 4.4476 14.5524 3.8881 13.8358 3.70896L13 3.5V2.5L13.8358 2.29104C14.5524 2.1119 15.1119 1.5524 15.291 0.835829L15.5 0H16.5L16.709 0.835829C16.8881 1.5524 17.4476 2.1119 18.1642 2.29104ZM23.1642 7.29104L24 7.5V8.5L23.1642 8.70896C22.4476 8.8881 21.8881 9.4476 21.709 10.1642L21.5 11H20.5L20.291 10.1642C20.1119 9.4476 19.5524 8.8881 18.8358 8.70896L18 8.5V7.5L18.8358 7.29104C19.5524 7.1119 20.1119 6.5524 20.291 5.83583L20.5 5H21.5L21.709 5.83583C21.8881 6.5524 22.4476 7.1119 23.1642 7.29104Z"
      fill="rgba(249,167,122,1)"
    ></path>
  </svg>`;
    document.querySelector("html").classList.remove("dark");
  }
}
setMode();
modeEl.addEventListener("click", () => {
  isDark = !isDark;
  setMode();
});
