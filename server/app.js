require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const demoMode = process.env.DEMO_MODE === "true" || process.env.VERCEL === "1";

app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

if (demoMode) {
  const now = new Date().toISOString();
  let customers = [
    {
      customerId: 1, firstname: "Sofía", lastname: "Méndez",
      email: "sofia.mendez@example.test", phonenumber: "+1 809 555 0142", gender: false,
      createdAt: now, updatedAt: now,
      addresses: [{ addressId: 1, country: "República Dominicana", city: "Santo Domingo", street: "Calle del Sol", building: "18B", zip: 10101, customerId: 1, createdAt: now, updatedAt: now }]
    },
    {
      customerId: 2, firstname: "Mateo", lastname: "Rivas",
      email: "mateo.rivas@example.test", phonenumber: "+1 829 555 0188", gender: true,
      createdAt: now, updatedAt: now,
      addresses: [{ addressId: 2, country: "República Dominicana", city: "Santiago", street: "Av. Las Palmas", building: "204", zip: 51000, customerId: 2, createdAt: now, updatedAt: now }]
    },
    {
      customerId: 3, firstname: "Valentina", lastname: "Cruz",
      email: "valentina.cruz@example.test", phonenumber: "+1 849 555 0115", gender: false,
      createdAt: now, updatedAt: now, addresses: []
    }
  ];
  let nextCustomerId = 4;
  let nextAddressId = 3;

  const flattenAddresses = () => customers.flatMap(customer => customer.addresses);
  const findCustomer = id => customers.find(customer => customer.customerId === Number(id));

  app.get("/api/health", (_req, res) => res.json({ ok: true, mode: "portfolio-demo" }));
  app.get("/api/customers", (_req, res) => res.json(customers));
  app.get("/api/customers/:id", (req, res) => {
    const customer = findCustomer(req.params.id);
    return customer ? res.json(customer) : res.status(404).json({ message: "Customer not found" });
  });
  app.post("/api/customers", (req, res) => {
    const timestamp = new Date().toISOString();
    const customer = { ...req.body, customerId: nextCustomerId++, addresses: [], createdAt: timestamp, updatedAt: timestamp };
    customers.push(customer);
    return res.status(201).json(customer);
  });
  app.put("/api/customers/:id", (req, res) => {
    const customer = findCustomer(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    Object.assign(customer, req.body, { customerId: customer.customerId, addresses: customer.addresses, updatedAt: new Date().toISOString() });
    return res.json(customer);
  });
  app.delete("/api/customers/:id", (req, res) => {
    const index = customers.findIndex(customer => customer.customerId === Number(req.params.id));
    if (index < 0) return res.status(404).json({ message: "Customer not found" });
    return res.status(202).json(customers.splice(index, 1)[0]);
  });

  app.get("/api/addresses", (_req, res) => res.json(flattenAddresses()));
  app.get("/api/addresses/:id", (req, res) => {
    const address = flattenAddresses().find(item => item.addressId === Number(req.params.id));
    return address ? res.json(address) : res.status(404).json({ message: "Address not found" });
  });
  app.post("/api/addresses", (req, res) => {
    const customer = findCustomer(req.body.customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    const timestamp = new Date().toISOString();
    const address = { ...req.body, addressId: nextAddressId++, customerId: customer.customerId, createdAt: timestamp, updatedAt: timestamp };
    customer.addresses.push(address);
    return res.status(201).json(address);
  });
  app.put("/api/addresses/:id", (req, res) => {
    const address = flattenAddresses().find(item => item.addressId === Number(req.params.id));
    if (!address) return res.status(404).json({ message: "Address not found" });
    Object.assign(address, req.body, { addressId: address.addressId, updatedAt: new Date().toISOString() });
    return res.json(address);
  });
  app.delete("/api/addresses/:id", (req, res) => {
    for (const customer of customers) {
      const index = customer.addresses.findIndex(item => item.addressId === Number(req.params.id));
      if (index >= 0) return res.status(202).json(customer.addresses.splice(index, 1)[0]);
    }
    return res.status(404).json({ message: "Address not found" });
  });
} else {
  const db = require("./config/db.config");
  db.sequelize.sync().then(() => console.log("Database synced successfully")).catch(console.error);
  app.use("/api/customers", require("./routes/customers.route"));
  app.use("/api/addresses", require("./routes/addresses.route"));
}

app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

module.exports = app;
