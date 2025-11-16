import * as repo from "../repositories/salones.repo.js";

export async function list(req, res, next) {
  try {
    res.json(await repo.listSalones());
  } catch (e) {
    next(e);
  }
}
export async function get(req, res, next) {
  try {
    const item = await repo.getSalon(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "No encontrado" });
    res.json(item);
  } catch (e) {
    next(e);
  }
}
export async function create(req, res, next) {
  try {
    const created = await repo.createSalon(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
}
export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const updated = await repo.updateSalon(id, req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}
export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    await repo.softDeleteSalon(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}
