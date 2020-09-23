const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
    return inquirer.prompt([{
        type: "input",
        name: "title",
        message: "What do you want the title of your README to be?"
    }, {
        type: "input",
        name: "description",
        message: "What do you want the description of your README to be?"
    }, {
        type: "input",
        name: "installation",
        message: "What are your instrucions for installation?"
    }, {
        type: "input",
        name: "usage",
        message: "What is the use of your app?"
    }, {
        type: "input",
        name: "contributing",
        message: "How to make contributions?"
    }, {
        type: "input",
        name: "tests",
        message: "Issues needed to be reported?"
    }, {
        type: "list",
        name: "license",
        choices: ["MIT","Apache","Mozilla Public License"],
        message: "What license will you be inputing?"
    },{
        type:"list",
        name: "color",
        message: "What color do you want your license to be?",
        choices: ["brightgreen", "critical", "orange", "success", "ff69b4"]
    }, {
        type: "input",
        name: "github",
        message: "What is your github username?"
    }, {
        type: "input",
        name: "email",
        message: "What is your email address?"
    }])
};

function generateREADME(answers) {

    
    return `# ${answers.title}
## Description: 
${answers.description}
##Table of contents:
${generateTableOfContents()}
## Installation: 
${answers.installation}
## Usage: 
${answers.usage}
## Contributing: 
${answers.contributing}
## Feedback: 
${answers.tests}
## License: 
![License](https://img.shields.io/static/v1?label=License&message=${answers.license}&color=${answers.color})

## Github username: 
${answers.github}
## For any questions send an email to: 
${answers.email}`;
    
        

};

function generateTableOfContents () {
return`### 1.[Installation](#installation)
### 2.[Usage](#usage)
### 3.[Contributing](#contributing)
### 4.[Feedback](#feedback)
### 5.[License](#license)
### 6.[Github Username](#githubusername)
### 7.[Email link](#emaillink)`
}

async function init() {
    console.log("Hello from init!");
    try {
        const answers = await promptUser();

        const README = generateREADME(answers);

        await writeFileAsync("README.md", README);

        console.log("Sucessfully wrote to README.md");
    } catch (err) {
        console.log(err);
    }
};



init();