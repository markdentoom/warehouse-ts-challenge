import Client from "./Client"
import { HeatPump, InstallationMaterial, Tool } from "./items/items"
import { Order } from "./items/orders"

const RESTOCK_THRESHOLD = 3 // TODO move this to settings file

export default class WarehouseManager {
  heatPumps: HeatPump[] = []
  installationMaterials: InstallationMaterial[] = []
  tools: Tool[] = []
  inventoryItems: (HeatPump | InstallationMaterial | Tool)[] = []
  orders: Order[] = []

  async fetchDataFromServer() {
    const client = new Client()

    this.heatPumps = await client.getHeatPumps()
    this.installationMaterials = await client.getInstallationMaterials()
    this.tools = await client.getTools()
    this.inventoryItems = [
      ...this.heatPumps,
      ...this.installationMaterials,
      ...this.tools,
    ]
    this.orders = await client.getOrders()
  }

  processOrders() {
    let processReport = ""
    this.orders.forEach((order) => {
      const orderReport = order.process(this.inventoryItems)
      processReport += `\n\n${orderReport}`
    })
    return processReport
  }
  getInvoicesReport() {
    let invoicesReport = ""
    this.orders.forEach((order) => {
      const orderReport = order.formattedInvoice(this.inventoryItems)
      invoicesReport += `\n\n${orderReport}`
    })
    return invoicesReport
  }
  getRestockReport() {
    // TODO go over all products and return a report of
    // products we should restock
  }
}
