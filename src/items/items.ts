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

  constructor({ id, articles, installationDate }: IOrder) {
    this.id = id
    this.articles = articles // TODO map these to related products
    this.installationDate = new Date(installationDate)
  }
}
