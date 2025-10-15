import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET all products
app.get("/productos", async (req, res) => {
  const productos = await prisma.producto.findMany();
  res.json(productos);
});

// POST new product
app.post("/productos", async (req, res) => {
  const { titulo, precio, descripcion, imagen } = req.body;
  const nuevoProducto = await prisma.producto.create({
    data: { titulo, precio, descripcion, imagen },
  });
  res.json(nuevoProducto);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
