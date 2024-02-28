import WarehouseManager from "./WarehouseManager"

// TODO find a way to test this without exporting it
export default async function processOrdersAndLogReports() {
  const warehouseManager = new WarehouseManager()
  await warehouseManager.fetchDataFromServer()

  const processReport = warehouseManager.processOrders()
  console.log(processReport)

  // TODO
  // process orders
  // log process report
  // log invoices of all successful orders
  // log restock report
}

processOrdersAndLogReports()
