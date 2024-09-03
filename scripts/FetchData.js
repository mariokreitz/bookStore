export async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function putData(url, data) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
