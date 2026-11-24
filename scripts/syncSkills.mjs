import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const USER_HOME = process.env.USERPROFILE || process.env.HOME || 'C:\\Users\\Pavan';

const TARGET_DIRECTORIES = [
  path.join(USER_HOME, '.agents', 'skills'),
  path.join(USER_HOME, '.gemini', 'skills'),
  path.join(USER_HOME, '.claude', 'skills'),
  path.join(USER_HOME, 'Documents', 'Projects', 'Figma plugin AI-Powered-Design-Impact-Planner', 'hive', 'agents', 'god', '.claude', 'skills')
];

function run(cmd, cwd = REPO_ROOT) {
  try {
    return execSync(cmd, { cwd, stdio: 'pipe', encoding: 'utf-8' }).trim();
  } catch (err) {
    console.error(`Error running command: ${cmd}`);
    if (err.stdout) console.error(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
    throw err;
  }
}

async function sync() {
  const args = process.argv.slice(2);
  const isPush = args.includes('--push');
  const messageIdx = args.indexOf('--push');
  const commitMessage = (messageIdx !== -1 && args[messageIdx + 1] && !args[messageIdx + 1].startsWith('--'))
    ? args[messageIdx + 1]
    : 'learn(agent): update skills [skip ci]';

  console.log(`[Pavan Agent Skills] Working Directory: ${REPO_ROOT}`);

  if (isPush) {
    console.log(`[Pavan Agent Skills] Committing and pushing local learnings...`);
    run('git add -A');
    const status = run('git status --porcelain');
    if (status) {
      run(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
      run('git push origin main');
      console.log(`[Pavan Agent Skills] Successfully pushed changes to origin main.`);
    } else {
      console.log(`[Pavan Agent Skills] No changes to commit.`);
    }
    return;
  }

  // Pull latest updates
  console.log(`[Pavan Agent Skills] Hydrating latest skills from remote (git pull --rebase origin main)...`);
  try {
    const pullOut = run('git pull --rebase origin main');
    console.log(`[Pavan Agent Skills] Git: ${pullOut}`);
  } catch (err) {
    console.warn(`[Pavan Agent Skills] Git pull failed (possibly offline or divergent). Continuing with local skills.`);
  }

  // Discover skills from manifest.json or subdirectories containing SKILL.md
  let skills = [];
  const manifestPath = path.join(REPO_ROOT, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      skills = manifest.skills ? manifest.skills.map(s => s.name) : [];
    } catch (_) {}
  }

  if (!skills.length) {
    const entries = fs.readdirSync(REPO_ROOT, { withFileTypes: true });
    skills = entries
      .filter(d => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'scripts')
      .filter(d => fs.existsSync(path.join(REPO_ROOT, d.name, 'SKILL.md')))
      .map(d => d.name);
  }

  console.log(`[Pavan Agent Skills] Found ${skills.length} active skills: ${skills.join(', ')}`);

  // Mount/link skills to target directories
  for (const targetDir of TARGET_DIRECTORIES) {
    if (!fs.existsSync(targetDir)) {
      try {
        fs.mkdirSync(targetDir, { recursive: true });
      } catch (_) {}
    }

    for (const skill of skills) {
      const srcSkillDir = path.join(REPO_ROOT, skill);
      const dstSkillDir = path.join(targetDir, skill);

      if (!fs.existsSync(dstSkillDir)) {
        try {
          if (process.platform === 'win32') {
            execSync(`cmd /c mklink /J "${dstSkillDir}" "${srcSkillDir}"`, { stdio: 'pipe' });
          } else {
            fs.symlinkSync(srcSkillDir, dstSkillDir, 'junction');
          }
          console.log(`  + Linked ${skill} -> ${dstSkillDir}`);
        } catch (e) {
          console.warn(`  ! Could not link ${skill} to ${dstSkillDir}: ${e.message}`);
        }
      }
    }
  }

  console.log(`[Pavan Agent Skills] Synchronization complete. All skills are current and active.`);
}

sync().catch(err => {
  console.error(err);
  process.exit(1);
});
