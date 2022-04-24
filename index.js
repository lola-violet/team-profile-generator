const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');
const generateHtml = require('./util/generateHtml');
const Inquirer = require('inquirer');
const fs = require('fs');

const team = [];


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

init();

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
                console.log("engineer chosen");
                addEngineer();
                break;
            case 'An Intern':
                console.log("intern chosen");
                addIntern();
                break;
            case 'No, my team is complete':
                console.log("team complete");
                console.log(team);
                buildPage();
                break;
            default: 
                console.log("default");
                break;
        }
    })
}

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
        const newEng = new Engineer(data.name, data.id, data.email, data.github);
        team.push(newEng);
        addMembers();
    })
}

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
        const newInt = new Intern(data.name, data.id, data.email, data.school);
        team.push(newInt);
        addMembers();
    })
}

const buildPage = () => {
    console.log("Team Complete");
    fs.writeFile('./dist/index.html', generateHtml(team), (err) => {
        err ? console.log(err) : console.log("Success");
    })
}