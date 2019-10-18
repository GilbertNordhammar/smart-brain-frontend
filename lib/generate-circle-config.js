const path = require("path");
const fs = require("fs");

const yaml = require("write-yaml");

/*
  helpers
*/

function createJSON(fileArray, data) {
  for (const [index, value] of fileArray.entries()) {
    data.jobs[value] = {
      working_directory: "~/tmp",
      docker: [
        {
          image: "cypress/base:10",
          environment: {
            TERM: "xterm"
          }
        }
      ],
      steps: [
        {
          attach_workspace: {
            at: "~/"
          }
        },
        {
          run: "ls -la cypress"
        },
        {
          run: "ls -la cypress/integration"
        },
        {
          run: {
            name: `Running cypress test '${value}'`,
            command: `$(npm bin)/cypress run --spec cypress/integration/tests to run/${value}`
          }
        },
        {
          store_artifacts: {
            path: "cypress/videos"
          }
        },
        {
          store_artifacts: {
            path: "cypress/screenshots"
          }
        }
      ]
    };
    data.workflows.build_and_test.jobs.push({
      [value]: {
        requires: ["build"]
      }
    });
  }
  return data;
}

function writeFile(data) {
  yaml(path.join(__dirname, "..", ".circleci", "config.yml"), data, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully updated circleci config file!");
    }
  });
}

/*
  main
*/

// get spec files as an array
const files = fs
  .readdirSync(
    path.join(__dirname, "..", "cypress", "integration", "tests to run")
  )
  .filter(fn => fn.endsWith(".spec.js"));
// read circle.json
const circleConfigJSON = require(path.join(__dirname, "circle.json"));
// add cypress specs to object as test jobs
const data = createJSON(files, circleConfigJSON);
// write file to disc
writeFile(data);
