const registerUser = async () => {
  const name = document.querySelector("#userNameInput").value;
  const email = document.querySelector("#userEmailInput").value;
  const password = document.querySelector("#userPasswordInput").value;
  const userID = newUserID();
  const newUser = {
    id: userID,
    name: name,
    email: email,
    password: password,
    createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    updatedAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
  };
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  window.alert("Successfully Registered");
};

const updateUser = async () => {
  const name = document.querySelector("#userNameInput").value;
  const email = document.querySelector("#userEmailInput").value;
  const password = document.querySelector("#userPasswordInput").value;
  const updatedUser = { name: name, email: email, password: password };
  const response = await fetch("http://localhost:3000/users", {
    method: "PUT",
    body: JSON.stringify(updatedUser),
  });
  const data = await response.json();
  const usersContainer = document.getElementsByClassName("updaedUsers")[0];
  usersContainer.innerHTML = "";
  data.forEach((element) => {
    const userDiv = document.createElement("table");
    userDiv.classList.add("table");
    userDiv.innerHTML = `
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.password}</td>
        </tr>`;
    usersContainer.append(userDiv);
  });
  window.alert("Successfully Updated");
};

const deleteUser = async (id) => {
  const deleteUserid = id;
  console.log(deleteUserid);
  const deletedUserObj = { id: deleteUserid };
  console.log(deletedUserObj);
  const response = await fetch("http://localhost:3000/users", {
    method: "DELETE",
    body: JSON.stringify(deletedUserObj),
  });
  window.alert("Successfully Deleted");
  const data = await response.json();
  console.log(data);
  const usersContainer = document.getElementsByClassName("users")[0];
  const deletedUsersContainer =
    document.getElementsByClassName("deletedUsers")[0];
  usersContainer.innerHTML = "";
  data.forEach((element) => {
    const userDiv = document.createElement("table");
    userDiv.classList.add("table");
    userDiv.innerHTML = `
          <tr>
              <td>${element.name}</td>
              <td>${element.email}</td>
              <td>${element.password}</td>
              <td><a href="http://localhost:3000/updateUser.html">Edit</a></td>
              <td><button type="button" class="btn btn-primary delBtn">Delete</button></td>
          </tr>`;
    deletedUsersContainer.append(userDiv);
  });
};

const getUser = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  const usersContainer = document.getElementsByClassName("users")[0];
  data.forEach((element) => {
    const userDiv = document.createElement("table");
    userDiv.classList.add("table");
    userDiv.innerHTML = `
        <tr>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.password}</td>
            <td><a href="http://localhost:3000/updateUser.html">Edit</a></td>
            <td><button type="button" class="btn btn-primary delBtn" id='${element.id}'>Delete</button></td>
        </tr>`;
    usersContainer.append(userDiv);
  });
  const delBtnTag = document.querySelectorAll(".delBtn");
  delBtnTag.forEach((btn) => {
    console.log(btn);
    btn.addEventListener("click", () => {
      deleteUser(btn.id);
    });
  });
};

getUser();

const newUserID = async () => {
  const getResponse = await fetch("http://localhost:3000/users");
  const data = await response.json();
  const totalUser = JSON.parse(data);
  const lastId = totalUser[totalUser.length - 1].id;
  const newUserID = lastId + 1;
  return newUserID;
};

// const fileCreate = async () => {
//   const response = await fetch("http://localhost:3000/fileUpload", {
//     method: "POST",
//     body: JSON.stringify({ test: "Hello World!! I am Your File Content" }),
//   });
//   const data = await response.json();
//   console.log(data);
// };

// fileCreate();

const fileUpload = async () => {
  const inputTag = document.querySelector("#fileUpload");
  console.log(inputTag.files[0]);
  const response = await fetch("http://localhost:3000/fileUpload", {
    method: "POST",
    body: inputTag.files[0],
  });
  const data = await response.json();
  console.log(data);
};
