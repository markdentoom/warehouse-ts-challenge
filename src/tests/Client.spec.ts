import Client from "../Client"

// TODO ensure SERVER_URL is from a different settings file

describe(Client.name, () => {
  beforeEach(() => {
    // TODO mock fetch result
    // TODO mock getData?
  })
  afterEach(() => {})
  test("getData fetches correct url", () => {})
  test("getData returns response json", () => {})
  test("getData errors with bad response", () => {})
  test("getHeatPumps call getData", () => {})
  test("getHeatPumps maps JSON to HeatPump objects", () => {})
  test("getHeatPumps errors with wrong JSON types", () => {})
  // TODO think of more edge cases + order sorting tests
})
