// Dependencies
const fs = require('fs');
const path = require('path');

const { getChangedFiles, fetchJson } = require('./get-changed-files');
const [currentCommitSha] = process.argv.slice(2);
async function go() {
  const buildInfo = await fetchJson(
    'https://dev.danestves.com/api/get-content-sha'
  );
  const compareCommitSha = buildInfo.commit.sha;
  let changedFiles = [];
  if (compareCommitSha) {
    changedFiles =
      (await getChangedFiles(currentCommitSha, compareCommitSha)) ?? [];
    console.error('Determining whether the changed files are content', {
      currentCommitSha,
      compareCommitSha,
      changedFiles,
    });
  } else {
    // get initial content list
    const filelist = [];
    function walk(dir) {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          walk(filePath);
        } else {
          filelist.push(filePath);
        }
      });
    }
    walk('./content');
    changedFiles = filelist.map((filename) => ({
      changeType: 'added',
      filename,
    }));
  }
  // get list of files that are content
  const contentFiles = changedFiles
    .filter(({ filename }) => filename.startsWith('content/'))
    .map(({ filename }) => {
      const parts = filename.split('/');

      if (parts.length < 3) return null;
      if (filename.endsWith('/_series.mdx')) return null;
      if (!filename.endsWith('.mdx') || filename.endsWith('/index.mdx')) {
        return parts.slice(0, parts.length - 1).join('/');
      }
      return filename;
    });
  console.log(Array.from(new Set(contentFiles)).filter(Boolean).join(' '));
}

go().catch((e) => {
  console.error(e);
  console.log('');
});
