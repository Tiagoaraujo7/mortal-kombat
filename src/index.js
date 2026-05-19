const players = [
  { nome: "Raiden", forca: 2, agilidade: 5, resistencia: 2, emoji: "⚡" },
  { nome: "Shao Kahn", forca: 5, agilidade: 2, resistencia: 5, emoji: "👑" },
  { nome: "Scorpion", forca: 4, agilidade: 4, resistencia: 3, emoji: "🔥" },
  { nome: "Sub-Zero", forca: 3, agilidade: 4, resistencia: 4, emoji: "❄️" },
  { nome: "Liu Kang", forca: 4, agilidade: 5, resistencia: 3, emoji: "🐉" },
  { nome: "Kitana", forca: 3, agilidade: 5, resistencia: 3, emoji: "🪭" }
];


// gera um numero aleatorio de 1 a 6
async function rollDice() {
    return Math.floor(Math.random() *6) +1;
    
}

// sorteia uma das tres arenas 
async function getRandomStages() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "The Street"
            break
        
        

        case random < 0.66:
            result = "The Pit"
            break;
        
        default:
            result = "Living Forest"   
            
    }
    return result;
    
}

/* arena + o dado ambos sorteados.
   o tipo de arena define qual atributo sera
   utilizado na batalha e soma com o numero aleatorio do dado.
*/
async function skillsRandom(){
    let stage = await getRandomStages();

    let dice1 = await rollDice();
    let dice2 = await rollDice();

    let p1Skill;
    let p2Skill;

    if (stage === "The Street") {
        p1Skill = player1.FORÇA + dice1;
        p2Skill = player2.FORÇA + dice2;
    }
    else if (stage === "The Pit"){
        p1Skill = player1.AGILIDADE + dice1;
        p2Skill = player2.AGILIDADE + dice2;
    }else {
    p1Skill = player1.RESISTENCIA + dice1;
    p2Skill = player2.RESISTENCIA + dice2;
    }

    return {stage, p1Skill, p2Skill};



}


// defini o vencedor da luta
async function winner() {
    let resultado = await skillsRandom();

    if (resultado.p1Skill > resultado.p2Skill){
        resultado.vencedor = player1.NOME;
    } else if (resultado.p2Skill > resultado.p1Skill){
        resultado.vencedor = player2.NOME;
    } else {
        resultado.vencedor = "Empate";
    }

    return resultado;
}



// mostrar os dados da luta
let resultado = await winner();

console.log("⚔️ ROUND 1 — FIGHT! 👊");

console.log(
  resultado.stage === "The Street" ? "Arena: 🏙️ The Street 🏙️" :
  resultado.stage === "The Pit" ? "Arena: 🕳️ The Pit 🕳️" :
  "Arena: 🌳 Living Forest 🌳"
);

console.log(`⚡ ${player1.NOME}: ${resultado.p1Skill}`);
console.log(`👑 ${player2.NOME}: ${resultado.p2Skill}`);

console.log(
  resultado.vencedor === player1.NOME
    ? "⚡ RAIDEN WINS! ⚡"
    : resultado.vencedor === player2.NOME
    ? "👑 SHAO KAHN WINS! 👑"
    : "🤝 DRAW GAME"
);
    






