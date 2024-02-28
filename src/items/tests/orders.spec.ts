import { Order } from "../orders"

describe(Order.name, () => {
  test("articleCount set in constructor", () => {})
  test("formatInvoice return formatted invoice", () => {})
  test("formatReportLine returns formatted report line success", () => {})
  test("formatReportLine returns formatted report line item not found", () => {})
  test("formatReportLine returns formatted report line out of stock", () => {})
  test("findItem returns item based on article_id report line", () => {})
  test("findItem returns undefined if itemId can't be found", () => {})
  // TODO test process method
})
