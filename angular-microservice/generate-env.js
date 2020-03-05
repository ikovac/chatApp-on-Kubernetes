const fs = require("fs");

const targetPath = `./src/environments/environment.prod.ts`;
const envConfigFile = `
export const environment = {
  production: true,
  serverUrl: ${process.env.ANGULAR_NODEJS_HOST} || ''
};
`;

try {
  fs.writeFileSync(targetPath, envConfigFile);
  console.log(`Output generated at ${targetPath}`);
} catch(err) {
  console.error(err);
}
