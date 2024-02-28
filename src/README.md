# Notes

This assignment took longer than expected because it has been a while since I have used TypeScript. I spent roughly 4 hours on the assignment in total, but I did cut a fair few corners along the way to get it done in time.

The order processing, invoices, and restocking reports work, but I left TODOs for things I didn't get to. These mostly consist of tests, a few bugs, and refactoring.

Also note that my main goal was to make the code readable rather than optimizing for performance, so there is the occasional duplicated loop.

## How it works

- In index.ts we use the WarehouseManager and log the reports.
- The WarehouseManager is a class that we can use to process orders and generate order, invoice, and restock reports.
- We have a Client class for fetching data from the server.
- We have an Order class that contains the logic for processing orders and generating order and invoice reports
