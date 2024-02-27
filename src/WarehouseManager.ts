import Client from "./Client"

const RESTOCK_THRESHOLD = 3 // TODO move this to settings file

export default class WarehouseManager {
  client = new Client()

  processOrders() {
    // TODO Process all orders we can and return a process
    // report with info on successfully processed orders and
    // failed orders
  }
  getInvoices() {
    // TODO return invoices of processed orders
  }
  getRestockReport() {
    // TODO go over all products and return a report of
    // products we should restock
  }
}
