import { IOrder } from "./itemTypes"
import { HeatPump, InstallationMaterial, Tool } from "./items"
import convertToEuro from "./utils"

const ORDER_ITEM_SUCCESS = "Success"
const ORDER_ITEM_NOT_FOUND = "Product not found"
const ORDER_ITEM_OUT_OF_STOCK = "Not enough stock"

type ItemType = HeatPump | InstallationMaterial | Tool

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

  formatReportLine(count: number, item?: ItemType) {
    const productType = item ? item.constructor.name : "N/A"
    const productName = item ? item.name : "N/A"
    return `\n${count}x ${productType} - ${productName}`
  }

  formatProcessReportLine(
    count: number,
    isItemOrderable: boolean,
    item?: ItemType
  ) {
    let ProcessReportLine = this.formatReportLine(count, item)

    let productStatus = ORDER_ITEM_SUCCESS
    if (!item) {
      productStatus = ORDER_ITEM_NOT_FOUND
    } else if (!isItemOrderable) {
      productStatus = ORDER_ITEM_OUT_OF_STOCK
    }

    return `${ProcessReportLine} - ${productStatus}`
  }

  findItemObject(inventoryItems: ItemType[], itemId: string) {
    return inventoryItems.find((inventoryItem) => inventoryItem.id == itemId)
  }

  process(inventoryItems: ItemType[]) {
    // TODO this method checks if the order is possible, generates an order
    // report, and processes the order. Split it up if feasible

    let isOrderPossible = true
    let orderLines = ``

    for (const [article, count] of Object.entries(this.articleCounts)) {
      const item = this.findItemObject(inventoryItems, article)
      const isItemOrderable = Boolean(item && item!.stock >= count)
      if (!isItemOrderable) {
        isOrderPossible = false
      }

      orderLines += this.formatProcessReportLine(count, isItemOrderable, item)
    }

    if (isOrderPossible) {
      for (const [article, count] of Object.entries(this.articleCounts)) {
        // TODO make sure to prevent processing orders multiple times
        // TODO account for using tools on different days
        const item = this.findItemObject(inventoryItems, article)
        if (item) {
          item.decreaseStock(count)
        }
      }
    }

    // TODO working with strings isn't great, convert these to objects
    // and use console.table to display it
    return `Order: ${this.id}\nIs ordered: ${isOrderPossible}${orderLines}`
  }

  formattedInvoice(inventoryItems: ItemType[]) {
    // TODO should we be able to generate invoices for order
    // that we can't fullfill?
    let totalPrice: string | number = 0
    let invoiceLines = ``

    for (const [article, count] of Object.entries(this.articleCounts)) {
      const item = this.findItemObject(inventoryItems, article)
      let invoiceReportLine = this.formatReportLine(count, item)

      let price: string | number = "N/A"
      if (
        item &&
        (item instanceof HeatPump || item instanceof InstallationMaterial)
      ) {
        price = item.unitPrice * count
        totalPrice += price
        price = convertToEuro(price)
      }

      invoiceLines += `${invoiceReportLine} - ${price}`
    }

    totalPrice = convertToEuro(totalPrice)
    return `Order: ${this.id}\nTotal price: ${totalPrice}${invoiceLines}`
  }
}
