import { IOrder } from "./itemTypes"
import { HeatPump, InstallationMaterial, Tool } from "./items"

const ORDER_ITEM_SUCCESS = "Success"
const ORDER_ITEM_NOT_FOUND = "Product not found"
const ORDER_ITEM_OUT_OF_STOCK = "Not enough stock"

export class Order {
  id: string
  articleCounts: { [key: string]: number }
  installationDate: Date

  constructor({ id, articles, installationDate }: IOrder) {
    this.id = id
    this.articleCounts = {}
    this.installationDate = new Date(installationDate)

    articles.forEach((article) => {
      if (this.articleCounts.hasOwnProperty(article)) {
        this.articleCounts[article]++
      } else {
        this.articleCounts[article] = 1
      }
    })
  }

  formatInvoice() {
    // TODO should we be able to generate invoices if we can't
    // fullfill the order?
    // TODO create invoice with total price & list of articles, e.g.
    // Order: ${id}
    // Total price: €63456,45
    // quantity - category - product - price
    // 3x Heat pump - Midea 6 - €1.99
    // 1x Installation Material - €345
    // 3x Tool - Hammer, 5 lbs - €0
  }

  formatReportLine(
    count: number,
    isItemOrderable: boolean,
    item?: HeatPump | InstallationMaterial | Tool
  ) {
    const productType = item ? item.constructor.name : "N/A"
    const productName = item ? item.name : "N/A"

    let productStatus = ORDER_ITEM_SUCCESS
    if (!item) {
      productStatus = ORDER_ITEM_NOT_FOUND
    } else if (!isItemOrderable) {
      productStatus = ORDER_ITEM_OUT_OF_STOCK
    }

    return `${count}x ${productType} - ${productName} - ${productStatus}`
  }

  findItem(
    inventoryItems: (HeatPump | InstallationMaterial | Tool)[],
    itemId: string
  ) {
    return inventoryItems.find((inventoryItem) => inventoryItem.id == itemId)
  }

  process(inventoryItems: (HeatPump | InstallationMaterial | Tool)[]) {
    // TODO this method checks if the order is possible, generates an order
    // report, and processes the order. Split it up if feasible

    let isOrderPossible = true
    let orderLines = ``

    for (const [article, count] of Object.entries(this.articleCounts)) {
      const item = this.findItem(inventoryItems, article)
      const isItemOrderable = Boolean(item && item!.stock >= count)
      if (!isItemOrderable) {
        isOrderPossible = false
      }

      orderLines += `\n${this.formatReportLine(count, isItemOrderable, item)}`
    }

    if (isOrderPossible) {
      for (const [article, count] of Object.entries(this.articleCounts)) {
        // TODO make sure to prevent processing orders multiple times
        // TODO account for using tools on different days
        const item = this.findItem(inventoryItems, article)
        item!.decreaseStock(count)
      }
    }

    const orderReport = `Order: ${this.id}\nIs processed: ${isOrderPossible}${orderLines}`
    return orderReport
  }
}
