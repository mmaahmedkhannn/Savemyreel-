const url = "http://localhost:3000/api/download";
const payload = { url: "https://www.pinterest.com/pin/922401498611/" };

fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
})
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
        console.log(`STATUS: ${status}`);
        console.log("RESPONSE:", data);
    })
    .catch(err => console.error("FETCH ERROR:", err));
