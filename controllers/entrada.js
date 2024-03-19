import helpersGeneral from "../helpers/generales.js";
import Entrada from "../models/entrada.js"

const httpEntrada = {
    getAll: async (req, res) => {
        try {
            const entrada = await Entrada.find();
            res.json(entrada);
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const entrada = await Entrada.findById(id);
            res.json(entrada);
        } catch (error) {
            res.status(400).json({ error });

        }
    },
    post: async (req, res) => {
        try {
            const { cantidad, idProducto, total } = req.body;
            const nuevaEntrada = new Entrada({ cantidad, idProducto, total });
            const entradaGuardada = await nuevaEntrada.save();
            res.json(entradaGuardada);

        } catch (error) {
            res.status(400).json({ error });

        }

    },
    putEditar: async (req, res) => {
        try {
            const { id } = req.params;
            const { cantidad, idProducto, total } = req.body;
            const entradaActualizada = await Entrada.findByIdAndUpdate(
                id,
                {
                    cantidad,
                    idProducto,
                    total
                },
                { new: true }
            );
            res.json(entradaActualizada);

        } catch (error) {
            res.status(400).json({ error })

        }
    },
    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const entrada = await Entrada.findByIdAndUpdate(
                id,
                { estado: 1 },
                { new: true }
            );
            res.json(entrada)
        } catch (error) {
            res.status(400).json({ error })

        }

    },
    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const entrada = await Entrada.findByIdAndUpdate(
                id,
                { estado: 0 },
                { new: true }
            );
            res.json(entrada)

        } catch (error) {
            res.status(400).json({ error })

        }
    }



};
export default httpEntrada;


