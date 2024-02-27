import Client from "./client"

const printResults = async () => {  // TODO rename this func
    const client = new Client

    console.log(await client.getHeatPumps())
}

printResults()
