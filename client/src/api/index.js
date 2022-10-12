export async function login({ email, password }) {
  return await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getWeather({ name }) {
  return await fetch("/api/weather/"+name, {
    method: "Get",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
