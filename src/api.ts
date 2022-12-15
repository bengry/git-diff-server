import { Application } from 'express';
import express from 'express';
import simpleGit from 'simple-git';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const app: Application = express();

app.post('/diff', async (req, res) => {
  const { old: oldContent, new: newContent } = req.body ?? {};

  if (!oldContent || !newContent) {
    return res.status(400).json({ error: 'invalid parameters' }).end();
  }

  const tempDir = await fs.mkdtemp(uuid());

  const oldPath = path.join(tempDir, 'old.txt');
  const newPath = path.join(tempDir, 'new.txt');

  await Promise.all([
    fs.writeFile(oldPath, oldContent),
    fs.writeFile(newPath, newContent)
  ]);

  const diff = await simpleGit().diff(['-U1', oldPath, newPath]);

  res.json({ data: diff }).end();

  await fs.rmdir(tempDir);
});

export { app as api };
