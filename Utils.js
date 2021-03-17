const path = require("path");
const fs = require("fs");

// Gets the directory path and runs all of its files
module.exports.folderRunner = async function (folderName, data, result) {
  const directoryPath = path.join(__dirname, folderName);
  await module.exports.notifier(`Running files inside ${folderName}`);
  let files = fs.readdirSync(directoryPath);
  await filesRunner(files, folderName, data, result);
};

// A helper class to create async logger
module.exports.notifier = async function (message) {
  console.log(message);
};

// A random function that copies data to result and return it.
module.exports.someFunctionToRun = async function (data, result) {
  await sleep(1000);
  result = data;
  return result;
};

/**
 * Auxilliary function to add time intervals
 *
 * @param {Number} ms
 * @returns {Promise}
 */
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Runs all the files inside the folder and logs the output
 *
 * @param {Array} files
 * @param {String} folderName
 * @param {Object} data
 * @param {Object} result
 */
const filesRunner = async (files, folderName, data, result) => {
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const my_fn = require("./" + folderName + "/" + file);
    await my_fn(data, result).then(async (res) => {
      console.log(`${folderName}/${file} result: ${JSON.stringify(res)}`);
    });
  }

  console.log("\n");
};
