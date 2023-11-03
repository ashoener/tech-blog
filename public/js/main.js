const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const logoutButton = document.querySelector('a[href="/logout"]');

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
    };
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      location.href = "/";
    } else {
      const error = await res.json();
      console.log(error);
      alert("todo");
    }
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
    };
    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      location.href = "/";
    } else {
      const error = await res.json();
      console.log(error);
      alert("todo");
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/logout", { method: "GET" });
    if (res.ok) {
      location.href = "/";
    } else console.log(await res.json());
  });
}
