async function pacman(method, endpoint, params) {
    const baseUrl = "https://api.rocksoftware.org/";
    let requestUrl = baseUrl + endpoint + (method == "GET" ? "?" + new URLSearchParams({ ...params }) : "");
    const requestOptions = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        body: !["GET", "HEAD"].includes(method) ? JSON.stringify({ ...params }) : null,
    };
    try {
        const response = await fetch(requestUrl, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        return { isOk: false, status: error.status, message: "Não foi possível concluir a operação solicitada." };
    } finally {
    }
}

export function get(ENDPOINT, PARAMS) {
    return pacman("GET", ENDPOINT, PARAMS);
}

export function head(ENDPOINT, PARAMS) {
    return pacman("HEAD", ENDPOINT, PARAMS);
}

export function put(ENDPOINT, PARAMS) {
    return pacman("PUT", ENDPOINT, PARAMS);
}

export function del(ENDPOINT, PARAMS) {
    return pacman("DELETE", ENDPOINT, PARAMS);
}

export function post(ENDPOINT, PARAMS) {
    return pacman("POST", ENDPOINT, PARAMS);
}

export function patch(ENDPOINT, PARAMS) {
    return pacman("PATCH", ENDPOINT, PARAMS);
}
