import * as service from "../services/projectService.js";

export async function createProject(req, res) {
  try {
    const project = await service.createProject(req.body);
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}

export async function getProjects(req, res) {
  try {
    const projects = await service.getProjects();
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}
