import md5 from "crypto-js/md5";

const date = new Date().toISOString().split("T")[0].replaceAll("-", "");
const headers = {
  "Content-Type": "application/json",
  "X-Auth": md5(`Valantis_${date}`).toString(),
};

export const request = async (url, method = "GET", body) => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers,
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    throw new Error(e);
  }
};
