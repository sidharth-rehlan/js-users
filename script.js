let currentPage = config.defaultPage;
let currentLimit = config.defaultItemPerPage;
let pagination = new Pagination(currentPage);

const fillTableData = (data) => {
  const tableBody = document.querySelector(".table-users tbody");
  const fragment = document.createDocumentFragment();
  if (data.length > 0) {
    tableBody.innerHTML = "";
    data.forEach((dataItem) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let nameNode = document.createTextNode(dataItem.name);
      let emailNode = document.createTextNode(dataItem.email);
      let phoneNode = document.createTextNode(dataItem.phone);
      td1.appendChild(nameNode);
      td2.appendChild(emailNode);
      td3.appendChild(phoneNode);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      fragment.appendChild(tr);
    });
    tableBody.appendChild(fragment);
  }
};
const getUsers = async (page, limit) => {
  let response = await fetch(`${config.usersApi}?page=${page}&limit=${limit}`);
  let data = await response.json();
  fillTableData(data);
};

document.querySelector("#itemsPerPage").addEventListener("change", (e) => {
  currentLimit = e.target.value;
  getUsers(currentPage, currentLimit);
});

document.querySelector("#next").addEventListener("click", (e) => {
  pagination.nextPage();
  let currentPage = pagination.getCurrentPage();
  getUsers(currentPage, currentLimit);
});

document.querySelector("#previous").addEventListener("click", (e) => {
  pagination.previousPage();
  let currentPage = pagination.getCurrentPage();
  if (currentPage === 1) {
    e.target.classList.add("disabled");
  }
  getUsers(currentPage, currentLimit);
});

getUsers(config.defaultPage, config.defaultItemPerPage);
