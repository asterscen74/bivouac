// api : default to 127.0.0.1:9010
var api_port = process.env.REACT_APP_API_FASTAPI_SERVER_PORT || "9010";
var api_host = process.env.REACT_APP_API_FASTAPI_SERVER_HOST || "localhost";
let api_url = "";
if (api_host === "localhost") {
    api_url = "http://" + api_host + ":" + api_port + "/";
} else {
    api_url = "http://" + api_host + "/api/";
}
console.log("api_url : " + api_url);

export default api_url;