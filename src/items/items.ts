import { IGenericItem, IGenericProduct, IOrder } from "./itemTypes"

abstract class GenericItem {
  id: string
  productCode: string
  name: string
  description?: string
  stock: number

  constructor({ id, productCode, name, description, stock }: IGenericItem) {
    this.id = id
    this.productCode = productCode
    this.name = name
    this.description = description
    this.stock = stock
  }
}

abstract class GenericProduct extends GenericItem {
  unitPrice: number

  constructor({
    id,
    productCode,
    name,
    description,
    stock,
    unitPrice,
  }: IGenericProduct) {
    super({ id, productCode, name, description, stock })
    this.unitPrice = unitPrice
  }
}

export class HeatPump extends GenericProduct {}

export class InstallationMaterial extends GenericProduct {}

export class Tool extends GenericItem {}

export class Order {
  id: string
  articles: string[]
  installationDate: Date
  isProcessed?: boolean

  constructor({ id, articles, installationDate }: IOrder) {
    this.id = id
    this.articles = articles // TODO map these to related products
    this.installationDate = new Date(installationDate)
    this.isProcessed = undefined
  }

  getInvoice() {
    // TODO create invoice with total price & list of articles, e.g.
    // Order: ${id}
    // Total price: €63456,45
    // quantity - category - product - price
    // 3x Heat pump - Midea 6 - €1.99
    // 1x Installation Material - €345
    // 3x Tool - Hammer, 5 lbs - €0
  }

  processOrder() {
    // TODO check if we have enough stock for the entire order
    // if so, we process the order by reducing the stock
    // in our warehouse and removing setting an "isProcessed" flag so
    // we don't accidentally do it twice
    // Return process report, e.g.
    // Order: ${id}
    // Processing: failed
    // quantity - category - product - status
    // 3 - Heat pump - Midea 6 - failed, 2 in stock
    // 1 - null - null - product not found
    // 2 - Tool - Hammer, 5 lbs - success
  }
}
