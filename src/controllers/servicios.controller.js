import * as repo from "../repositories/servicios.repo.js";
export async function list(req, res, next) {
  try {
    res.json(await repo.listServicios());
  } catch (e) {
    next(e);
  }
}
export async function get(req, res, next) {
  try {
    const item = await repo.getServicio(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "No encontrado" });
    res.json(item);
  } catch (e) {
    next(e);
  }
}
export async function create(req, res, next) {
  try {
    res.status(201).json(await repo.createServicio(req.body));
  } catch (e) {
    next(e);
  }
}
export async function update(req, res, next) {
  try {
    res.json(await repo.updateServicio(Number(req.params.id), req.body));
  } catch (e) {
    next(e);
  }
}
export async function remove(req, res, next) {
  try {
    await repo.softDeleteServicio(Number(req.params.id));
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}
