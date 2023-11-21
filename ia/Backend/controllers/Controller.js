import Model from "../models/Model.js";


const obtener = async (req, res) => {
  try {
    const prediction = await Model.find();
    res.status(200).json(prediction);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export { obtener};
