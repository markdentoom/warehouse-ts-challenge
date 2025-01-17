import { HeatPump, InstallationMaterial, Tool } from "./items/items"
import { Order } from "./items/orders"
import { IGenericItem, IGenericProduct, IOrder } from "./items/itemTypes"

const SERVER_URL = "http://localhost:3000" // TODO move this to settings file

export default class Client {
  async getData(endpoint: string) {
    const url = SERVER_URL + endpoint
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to GET ${url}: ${response.statusText}`)
    }
    return response.json()
  }

  async getHeatPumps() {
    /*
    BUG all of these GET methods don't throw errors when value types
    don't match that of the interfaces or that of the class parameters we
    map to.
    */
    const heatPumps = await this.getData("/heatPumps")
    return heatPumps.map((heatPump: IGenericProduct) => new HeatPump(heatPump))
  }

  async getInstallationMaterials() {
    const installationMaterials = await this.getData("/installationMaterials")
    return installationMaterials.map(
      (installationMaterial: IGenericProduct) =>
        new InstallationMaterial(installationMaterial)
    )
  }

  async getTools() {
    const tools = await this.getData("/tools")
    return tools.map((tool: IGenericItem) => new Tool(tool))
  }

  async getOrders() {
    const ordersJSON = await this.getData("/orders")
    const orders = ordersJSON.map((order: IOrder) => new Order(order))
    const sortedOrders = orders.sort((a: Order, b: Order) => {
      return a.installationDate.getTime() - b.installationDate.getTime()
    })

    return sortedOrders
  }
}
