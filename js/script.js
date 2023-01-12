// ----- FUNZIONI ------
// Funzione per la creazione delle celle
const createCell = (index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell', 'flex', 'justify-center', 'align-center');
    cell.setAttribute('data-index', index);
    return cell;
}

// Funzione che genera un array di numeri casuali
const getUniqueRandomNumbers = (quantity, min, max) => {

    const randomNumbers = [];
    console.log(quantity, min, max);

    do{
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        console.log("number " + number);
        console.log("includes " + randomNumbers.includes(number));
        if (!randomNumbers.includes(number)){
            randomNumbers.push(number);
            console.log("array" + randomNumbers);
        }

    }while (randomNumbers.length < quantity);

    return randomNumbers;
}

// Funzione avvio partita
const play = () =>{
    // Reset della griglia
    targetGrid.innerText = '';

    // Aggiunta classe "d-none" al titolo
    targetTitle.classList.add('d-none');

    // Aggiunta classe flex alla griglia
    if (targetGrid.classList.contains('d-none')){
        targetGrid.classList.remove('d-none');
        targetGrid.classList.add('flex');
    }

    // Definisce il numero di celle da creare in base alla difficoltà selezionata
    const RequiredCellsForRow = parseInt(inputDifficulty.value);
    console.log(RequiredCellsForRow);
    const cellNumber =  RequiredCellsForRow * RequiredCellsForRow; 
    console.log(cellNumber);

    // Cambia il numero di celle per riga  in CSS in base alla difficoltà selezionata
    properties.style.setProperty('--cell-for-row', RequiredCellsForRow);

    //Genera l'array di bombe
    const bombCellsNumber = getUniqueRandomNumbers(16, 1, cellNumber);
    console.log(bombCellsNumber);

    // Definise il punteggio per vincere
    winningScore = cellNumber - bombCellsNumber.length;
    console.log("winning score:" + winningScore);

    // Inizializzazione variabile del punteggio
    let score = 0;

    // Resetta il punteggio
    targetScore.innerText = `Punteggio: ${score}`; 

    // Inizializzazione variabili messagegio (modale) e reset
    let message = '';
    targetMessage.innerText = message;

    // Aggiunge le celle nella griglia
    for (let i = 1; i <= cellNumber; i++){

        const cell = createCell(i);
        cell.addEventListener('click', () => {
            // Se la cella non è stata cliccata
            if (!cell.classList.contains('clicked')){
                cell.classList.add('clicked');
                // Se la cella contiene una bomba
                if(bombCellsNumber.includes(parseInt(cell.getAttribute('data-index')))){
                    const allCells = targetGrid.querySelectorAll('.cell');
                    for (let i = 0; i < allCells.length; i++){
                        allCells[i].classList.add('clicked');
                        console.log(allCells[i]);
                        console.log(bombCellsNumber.includes(i));
                        if (bombCellsNumber.includes(i+1)){
                            allCells[i].classList.add('bomb');
                            allCells[i].innerHTML = `<img src="img/bomb.png">`;
                            }
                    }
                    message = `GAME OVER!`;
                    targetMessage.innerHTML = `<span class="text-pink">${message}</span>`;
                    isStarted = false;
                }
                // Se la cella non contiene una bomba
                else{
                    score++;
                    console.log(score);
                    score === winningScore ? message = `Hai vinto!` : '';
                    targetMessage.innerText = message;
                    targetScore.innerText = `Punteggio: ${score}`;     
            }
            }
        })
        targetGrid.appendChild(cell);

    }
}
// ----- FINE FUNZIONI -----


// Elementi DOM
const inputDifficulty = document.getElementById('difficulty');
console.log(inputDifficulty);
const buttonPlay = document.getElementById('play');
console.log(buttonPlay);
const targetGrid = document.querySelector('.grid');
console.log(targetGrid);
const targetTitle = document.querySelector('main h1');
console.log(targetTitle);
const properties = document.querySelector(':root');
console.log(properties);
const targetMessage = document.getElementById('message');
const targetScore = document.getElementById('score');

// Elementi Modale
const modal = document.getElementById('modal');
const yesButton = document.getElementById('yes-btn');
const noButton = document.getElementById('no-btn');

//Inizializzazione stato partita (a: non iniziata)
isStarted = false;

// ----- MODALE -----
// Pulsante SI (inizia una nuova partita)
yesButton.addEventListener('click', () =>{
    modal.classList.remove('flex');
    modal.classList.add('d-none');
    play();
});

// Pulsante NO (ritorna a dove sei rimasto)
noButton.addEventListener('click', () =>{
    modal.classList.remove('flex');
    modal.classList.add('d-none');
})


// Al click sul bottone "GIOCA"
buttonPlay.addEventListener('click', () =>{

    console.log('press');
    targetScore.classList.remove('d-none');

    // Controllo se la partita è iniziata
    if (isStarted){
        modal.classList.add('flex');
        modal.classList.remove('d-none');
    } else{
        play();
        isStarted = true;
    }
});
