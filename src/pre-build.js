const fs = require("fs");
const path = require("path");

const environmentFilePath = path.join(
  __dirname,
  "src/environments/environment.prod.ts"
);
let environmentFileContent = fs.readFileSync(environmentFilePath, {
  encoding: "utf8",
});

environmentFileContent = environmentFileContent.replace(
  /apiBaseUrl: '.*'/,
  `apiBaseUrl: '${process.env.API_URL}'`
);

fs.writeFileSync(environmentFilePath, environmentFileContent);
