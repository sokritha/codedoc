import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  const fullPath = path.join(dir, filename);

  router
    .route("")
    .get(async (req, res) => {
      try {
        // Read the file
        const result = await fs.readFile(fullPath, { encoding: "utf-8" });
        res.status(200).json({
          status: "success",
          data: result,
        });
      } catch (err) {
        if (err instanceof Error && err.message.includes("ENOENT")) {
          // Add code to create a file and add default cells
          await fs.writeFile(fullPath, "[]", "utf-8");
          res.status(400).json({
            status: "error",
            data: [],
          });
        } else {
          throw err;
        }
      }
    })
    .post(async (req, res) => {
      // Take the list of cells from the request obj
      // serilize them
      const { cellsData }: { cellsData: Cell[] } = req.body;

      // Write the cells into the file
      try {
        await fs.writeFile(fullPath, JSON.stringify(cellsData), "utf-8");
        res.status(201).json({
          status: "success",
        });
      } catch (err) {
        res.status(400).json({
          status: "error",
          data: null,
        });
      }
      
    });

  return router;
};
