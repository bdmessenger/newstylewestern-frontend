const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'

export async function fetchFromAPI(endpoint, opts) {
    const { method, body } = { method: 'POST', body: null, ...opts }
    const res = await fetch(`${API}/${endpoint}`, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.status === 200) {
        return res.json()
    } else {
        throw new Error(res.statusText)
    }
}