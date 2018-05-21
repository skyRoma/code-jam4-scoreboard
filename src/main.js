import showChartLine from './chart-line';

const controlSection = document.querySelector('.control');
const chartButton =document.querySelector('button');
let switcher = 0; 
let resultsData = [];
let puzzlesName = [];

function showTable(users,sessions){
    if (event) {
    const target = event.target;
    if (target.tagName != 'LABEL' && target.tagName != 'INPUT') return;
    document.querySelector('.info').innerHTML='';
    resultsData=[];
    puzzlesName=[];
    const checkedButton = target;
    switcher = +checkedButton.id;
    }
    let table = document.createElement('table');
    let tableHeader = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = 'Display Name';
    tableHeader.appendChild(th);
    sessions[switcher].puzzles.forEach(element => {
        let th = document.createElement('th');
        puzzlesName.push(element.name);
        th.innerHTML = element.name;
        tableHeader.appendChild(th);
    });
    let compareTh = document.createElement('th');
    compareTh.innerHTML='Comparison';
    tableHeader.appendChild(compareTh);
    table.appendChild(tableHeader);
    for(let i = 0; i < users.length; i++){
        let tr = document.createElement('tr');
        let nameTd = document.createElement('td');
        let timeTd;
        let tooltip;
        nameTd.innerHTML = users[i].displayName;
        tr.appendChild(nameTd);
        let person = {};
        person.name = users[i].displayName;
        person.times = [];        
        for (let j = 0 ; j < sessions[switcher].rounds.length; j++) {
            timeTd = document.createElement('td');
            tooltip = document.createElement('span');
            if(sessions[switcher].rounds[j].solutions[users[i].uid] === undefined || sessions[switcher].rounds[j].solutions[users[i].uid].correct === 'Incorrect') {
                timeTd.innerHTML='150';
                person.times.push(150);
            }
            else {
                timeTd.innerHTML=sessions[switcher].rounds[j].solutions[users[i].uid].time.$numberLong;
                person.times.push(+sessions[switcher].rounds[j].solutions[users[i].uid].time.$numberLong);
                tooltip.innerHTML = sessions[switcher].rounds[j].solutions[users[i].uid].code; 
                timeTd.appendChild(tooltip);
            }
            tr.appendChild(timeTd);
        }
        let checkTd = document.createElement('td');
        let checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.id = i ;
        checkTd.appendChild(checkBox);
        tr.appendChild(checkTd);
        table.appendChild(tr);
        resultsData.push(person);
    }   
    chartButton.addEventListener('click', () => {showChartLine(resultsData, puzzlesName)});
    document.querySelector('.info').appendChild(table);
};

async function showResults(){
    const usersUrl="https://cors.io/?https://drive.google.com/uc?export=download&id=1QsO2d1BNYZ5m8YlY35qD_VUJIRnz5drO";
    const sessionsUrl="https://cors.io/?https://drive.google.com/uc?export=download&id=1Rnc8OIYlsSKo7-nOTzodi6LdX3bXdc-9";
    try{
        let sessionsResponse = await fetch(sessionsUrl);
        let usersResponse= await fetch(usersUrl);
        if(usersResponse.ok && sessionsResponse.ok){
            let users= await usersResponse.json();
            let sessions= await sessionsResponse.json();
            document.querySelector('.loader').style.display='none'; 
            document.querySelector('.control').style.display='flex'; 
            showTable(users,sessions);
            controlSection.addEventListener('click', ()=>{showTable(users,sessions)});
        }
    }
    catch(error){
      console.log(error);
    }
}
showResults();  
