// Variables to link constructor files
const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');
const generateHtml = require('./util/generateHtml');
// Variables to link dependencies
const Inquirer = require('inquirer');
const fs = require('fs');
//Empty team array
const team = [];


// Function to begin application with manager info
const init = () => {
    Inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the team managers name',
            name: 'name'
        },{
            type: 'input',
            message: 'Enter the team managers employee id number',
            name: 'id'
        },{
            type: 'input',
            message: 'Enter the team managers email address',
            name: 'email'
        },{
            type: 'input',
            message: 'Enter the team managers office number',
            name: 'officeNumber'
        },
    ])
    .then((data) => {
        const newMang = new Manager(data.name, data.id, data.email, data.officeNumber);
        team.push(newMang);
        addMembers();
    })
}

// Function to add team members or complete your team
const addMembers = () => {
    Inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to add a team member?',
            choices: ['An Engineer', 'An Intern', 'No, my team is complete'],
            name: 'memberType'
        }
    ])
    .then((selection)=>{
        switch(selection.memberType){
            case 'An Engineer':
                // Calls function to add an engineer
                addEngineer();
                break;
            case 'An Intern':
                // Calls function to add an intern
                addIntern();
                break;
            case 'No, my team is complete':
                // Calls function to write html page
                buildPage();
                break;
            default: 
                console.log("Goodbye!");
                break;
        }
    })
}

// Function to add an engineer to your team
const addEngineer = () => {
    Inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the engineers name',
            name: 'name'
        },{
            type: 'input',
            message: 'Enter the engineers employee id number',
            name: 'id'
        },{
            type: 'input',
            message: 'Enter the engineers email address',
            name: 'email'
        },{
            type: 'input',
            message: 'Enter the engineers github username',
            name: 'github'
        },     
    ])
    .then((data) => {
        // Create a new engineer & push to team array
        const newEng = new Engineer(data.name, data.id, data.email, data.github);
        team.push(newEng);
        addMembers();
    })
}

// Function to add an intern to your team
const addIntern = () => {
    Inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the interns name',
            name: 'name'
        },{
            type: 'input',
            message: 'Enter the interns employee id number',
            name: 'id'
        },{
            type: 'input',
            message: 'Enter the interns email address',
            name: 'email'
        },{
            type: 'input',
            message: 'Enter the interns school',
            name: 'school'
        },     
    ])
    .then((data) => {
        // Create a new intern & push to team array
        const newInt = new Intern(data.name, data.id, data.email, data.school);
        team.push(newInt);
        addMembers();
    })
}

// Function to create html file & fill with team information
const buildPage = () => {
    fs.writeFile('./dist/index.html', generateHtml(team), (err) => {
        err ? console.log(err) : console.log("Team Complete! Check the 'dist' folder to view your completed index.html file.");
    })
}

// Call to run application
init();