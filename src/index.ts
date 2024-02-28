import WarehouseManager from "./WarehouseManager"

// TODO find a way to test this without exporting it
export default async function processOrdersAndLogReports() {
  const warehouseManager = new WarehouseManager()
  await warehouseManager.fetchDataFromServer()

  const processReport = warehouseManager.processOrders()
  const invoicesReport = warehouseManager.getInvoicesReport()
  const restockReport = warehouseManager.getRestockReport()

  // TODO clean up inconsistent newlines
  console.log("PROCESS REPORT", processReport)
  console.log("\n\nINVOICE REPORT", invoicesReport)
  console.log("\n\nRESTOCK REPORT\n", restockReport)
}

processOrdersAndLogReports()
