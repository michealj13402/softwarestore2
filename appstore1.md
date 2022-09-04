# Lesson 1 AppStore Client 1

## Setup

### `Install Tools`

Install [VS Code (IDE)](https://code.visualstudio.com/download), [Node.js (Choose LTS version)](https://nodejs.org/en/), Npm (package management, come with Node.js)

### `Create an empty project`

- Open terminal at a path that you want to create this project.

- Run `npx create-react-app <The Name Of your application> --use-npm`

- Run `cd <The Name Of your application>`

- Run `npm start`

Open your browser (if these commands doesn’t open it for you automatically), go to
http://localhost:3000/ you will see a default page.

### `Install UI component library`

Now you should be at your project's root folder

- Run `npm add antd`

- On the Top of /src/index.css file, add this line `@import '~antd/dist/antd.css';`

## Client - Server communication

Reference: [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### `Create a file to group all the util methods`

We will define all the “helper” functions here, to be more specific, all the code that makes http requests from our client to server will live here.

Create /src/utils.js

```Javascript
const domain = "YOUR BACKEND SERVER";  // example: http://localhost:8080

const handleResponseStatus = (response, errMsg) => {
  const { status, ok } = response;

  if (status === 401) {
    localStorage.removeItem("authToken");
    window.location.reload();
    return;
  }

  if (!ok) {
    throw Error(errMsg);
  }
};

export const login = (credential) => {
  const url = `${domain}/signin`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error("Fail to log in");
      }

      return response.text();
    })
    .then((token) => {
      localStorage.setItem("authToken", token);
    });
};

export const register = (credential) => {
  const url = `${domain}/signup`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    handleResponseStatus(response, "Fail to register");
  });
};

export const uploadApp = (data, file) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/upload`;

  const { title, description, price } = data;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("media_file", file);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  }).then((response) => {
    handleResponseStatus(response, "Fail to upload app");
  });
};

export const searchApps = (query) => {
  const title = query?.title ?? "";
  const description = query?.description ?? "";

  const authToken = localStorage.getItem("authToken");
  const url = new URL(`${domain}/search`);
  url.searchParams.append("title", title);
  url.searchParams.append("description", description);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    handleResponseStatus(response, "Fail to search apps");

    return response.json();
  });
};

export const checkout = (appId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/checkout?appID=${appId}`;

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      handleResponseStatus(response, "Fail to checkout");

      return response.text();
    })
    .then((redirectUrl) => {
      window.location = redirectUrl;
    });
};
```
