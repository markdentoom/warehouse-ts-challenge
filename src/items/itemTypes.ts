export interface IGenericItem {
  id: string
  productCode: string
  name: string
  description?: string
  stock: number
}

export interface IGenericProduct extends IGenericItem {
  unitPrice: number
}

export interface IOrder {
  id: string
  articles: string[]
  installationDate: string
}
