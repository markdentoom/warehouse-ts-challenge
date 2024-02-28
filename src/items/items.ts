import { IGenericItem, IGenericProduct } from "./itemTypes"

// TODO find a way to test this without exporting it
export abstract class GenericItem {
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

  decreaseStock(delta: number) {
    // TODO what to do when delta is 0 🤔
    if (delta < 0) {
      throw new Error("Cannot decrease stock by a negative number")
    } else if (delta > this.stock) {
      throw new Error("Cannot substract more than available stock")
    }
    this.stock -= delta
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
