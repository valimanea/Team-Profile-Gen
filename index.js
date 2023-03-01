const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];
let menuOpt = "";

function validateName(name) {
  if (name.length <= 30 && name.length > 0) {
    return true;
  }
  return chalk.red("Please insert a name of 1 to 30 characters!");
}

function validateNumber(num) {
  if (/^[0-9]+$/.test(num)) {
    return true;
  }
  return chalk.red("Please enter a numeric value!");
}

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return chalk.red("Please enter a valid email address!");
}

function validateGithub(github) {
  if (/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(github)) {
    return true;
  }
  return chalk.red("Please enter a valid GitHub username!");
}

const addManagerData = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message:
          "Enter the team manager’s name: " + chalk.italic("(1-30 characters)"),
        validate: validateName,
      },
      {
        type: "input",
        name: "id",
        message:
          "Enter the team manager’s employee ID: " +
          chalk.italic("(numbers only)"),
        validate: validateNumber,
      },
      {
        type: "input",
        name: "email",
        message: "Enter the team manager’s email address: ",
        validate: validateEmail,
      },
      {
        type: "input",
        name: "officeNumber",
        message:
          "Enter the team manager’s office number:" +
          chalk.italic("(numbers only)"),
        validate: validateNumber,
      },
    ])
    .then((response) => {
      console.log(response);
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      team.push(manager);
      console.log(team);
      MenuInput();
    });
};

const addEngineerData = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message:
          "Enter the engineer’s name: " + chalk.italic("(1-30 characters)"),
        validate: validateName,
      },
      {
        type: "input",
        name: "id",
        message: "Enter the engineer’s ID: " + chalk.italic("(numbers only)"),
        validate: validateNumber,
      },
      {
        type: "input",
        name: "email",
        message: "Enter the engineer’s email address: ",
        validate: validateEmail,
      },
      {
        type: "input",
        name: "github",
        message: "Enter the enginner’s GitHub username: ",
        validate: validateGithub,
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      console.log(engineer);
      team.push(engineer);
      console.log(team);
      MenuInput();
    });
};

  const addInternData = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message:
            "Enter the intern’s name: " + chalk.italic("(1-30 characters)"),
          validate: validateName,
        },
        {
          type: "input",
          name: "id",
          message: "Enter the ntern’s ID: " + chalk.italic("(numbers only)"),
          validate: validateNumber,
        },
        {
          type: "input",
          name: "email",
          message: "Enter the intern’s email address: ",
          validate: validateEmail,
        },
        {
          type: "input",
          name: "school",
          message: "Enter the intern’s school: ",
          validate: validateName,
        },
      ])
      .then((response) => {
        const intern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        console.log(intern);
        team.push(intern);
        console.log(team);
        MenuInput();
      });
  };

function menuAction() {
  switch (menuOpt) {
    case "Add an engineer":
      addEngineerData();
      break;

    case "Add an intern":
      addInternData();
      break;

    case "Finish building the team":
      console.log("team complete");
  }
}

const MenuInput = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: chalk.blue(
          "\n==============\n     MENU     \n==============\nChoose an option:"
        ),
        choices: [
          {
            name: "Add an engineer",
          },
          {
            name: "Add an intern",
          },
          {
            name: "Finish building the team",
          },
        ],
      },
    ])
    .then((response) => {
      menuOpt = response.menu;
      console.log(menuOpt);
      menuAction();
    });
};

addManagerData();
