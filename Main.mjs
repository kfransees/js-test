import { folderRunner, notifier } from "./Utils.js";

const data = { id: "12345" };
const result = {};

const foldersToRun = ["folder_name1", "folder_name2", "folder_name3"];

const run = async (folders) => {
  for (let index = 0; index < folders.length; index++) {
    const folder = folders[index];
    await folderRunner(folder, data, result);
  }
};

await run(foldersToRun).then(async () => {
  await notifier("Process done!");
});
