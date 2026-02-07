import { PodRepo } from "../../Repository/pods.repository.js";
import type { Request } from "express";

export const searchPodsService = async (req: Request) => {
  const q = String(req.query.q || "").toLowerCase();
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;

  const pods = await PodRepo.Get_Public_Pods(limit, offset);

  if (!q) return { pods };

  const filtered = pods.filter((p: any) => (p.title || "").toLowerCase().includes(q));
  return { pods: filtered };
};