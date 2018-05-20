
// const xhr = new XMLHttpRequest();
// const url = './olya.json';
// xhr.responseType = 'json';
// xhr.onreadystatechange = function() {
//   if (xhr.readyState === XMLHttpRequest.DONE) {
//     a= xhr.response;
//   }
// };

const controlSection = document.querySelector('.control');
// let switcher = 0; 

showTable = (users,sessions) => {
    const target = event.target;
    if (target.tagName != 'LABEL' && target.tagName != 'INPUT') return;
    document.querySelector('.info').innerHTML='';
    const checkedButton = target;
    switcher = +checkedButton.id;
    let table = document.createElement('table');
    let tableHeader = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = 'Display Name';
    tableHeader.appendChild(th);
    sessions[switcher].puzzles.forEach(element => {
        let th = document.createElement('th');
        th.innerHTML = element.name;
        tableHeader.appendChild(th);
    });
    table.appendChild(tableHeader);
    for(let i = 0; i < users.length; i++){
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2;
        td1.innerHTML=users[i].displayName;
        tr.appendChild(td1);
        for (let j = 0 ; j < sessions[switcher].rounds.length; j++) {
            td2 = document.createElement('td');
            if(sessions[switcher].rounds[j].solutions[users[i].uid] === undefined) {
                td2.innerHTML='150';
            }
            else {
                td2.innerHTML=sessions[switcher].rounds[j].solutions[users[i].uid].time.$numberLong;
            }
            tr.appendChild(td2);
        }                           
        table.appendChild(tr);
    }
    document.querySelector('.info').appendChild(table);
};


async function showResults(){
    const usersUrl="https://cors.io/?https://drive.google.com/uc?export=download&id=1QsO2d1BNYZ5m8YlY35qD_VUJIRnz5drO";
    const sessionsUrl="https://cors.io/?https://drive.google.com/uc?export=download&id=1Rnc8OIYlsSKo7-nOTzodi6LdX3bXdc-9";
    try{
        let sessionsResponse = await fetch(sessionsUrl);
        let usersResponse= await fetch(usersUrl);
        if(usersResponse.ok && sessionsResponse.ok){
            document.querySelector('.loader').style.display='none';  
            let users= await usersResponse.json();
            let sessions= await sessionsResponse.json();
            console.log(users);
            console.log(sessions);
        
            controlSection.addEventListener('click', ()=>{showTable(users,sessions)});
        }
    }
    catch(error){
      console.log(error);
    }
}
showResults();  

// xhr.open("GET", "https://cors.io/?https://drive.google.com/uc?export=download&id=1kphEq-khAK9mWcuekP37PakuW1dGY58i", true);
// xhr.open("GET", "https://cors.io/?https://drive.google.com/uc?export=download&id=11vHQu_qJIfvY4tJYC9mRobtbSj8sbhet", true);

// xhr.open("GET", "https://cors.io/?https://drive.google.com/uc?export=download&id=1QsO2d1BNYZ5m8YlY35qD_VUJIRnz5drO", true);
// xhr.send();