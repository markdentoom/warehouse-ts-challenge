const SERVER_URL = "http://localhost:3000"  // TODO move this to settings file


export default class Client {
    async getHeatPumps() {
        const url = SERVER_URL + "/heatPumps"
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to GET ${url}: ${response.statusText}`)
        }
        return response.json()
    }
}
