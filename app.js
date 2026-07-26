// מנוע Compare AI


let history = JSON.parse(

localStorage.getItem("compareHistory")

) || [];





function compare(){


let first = document
.getElementById("first")
.value
.trim();



let second = document
.getElementById("second")
.value
.trim();





if(!window.database[first] || !window.database[second]){


document.getElementById("result").innerHTML = `

<div class="message">

❌ לא מצאתי אחד מהפריטים במאגר.

<br><br>

נסה שמות שקיימים במאגר.

</div>

`;


return;


}





if(first === second){


document.getElementById("result").innerHTML = `

<div class="message">

😄 אי אפשר להשוות משהו לעצמו

</div>

`;


return;


}





let firstData = window.database[first];

let secondData = window.database[second];



let stats1 = firstData.stats;

let stats2 = secondData.stats;



let categories = Object.keys(stats1);



let scoreFirst = 0;

let scoreSecond = 0;


let rows = "";

let explanation = "";
// בדיקת כל קטגוריה


categories.forEach(category=>{


let value1 = stats1[category] || 0;

let value2 = stats2[category] || 0;


let winner;



if(value1 > value2){


winner = first;

scoreFirst++;


}

else if(value2 > value1){


winner = second;

scoreSecond++;


}

else{


winner = "תיקו";


}




rows += `

<tr>

<td>

${category}

</td>



<td>

${winner === first ? "✅" : ""}

<br>

${value1}/10

</td>



<td>

${winner === second ? "✅" : ""}

<br>

${value2}/10

</td>


</tr>

`;




explanation += `

• בקטגוריית <b>${category}</b>:

${winner === "תיקו" ? "יש תיקו" : winner + " קיבל יתרון"}

<br>

`;



});






let finalWinner;



if(scoreFirst > scoreSecond){

finalWinner = first;

}

else if(scoreSecond > scoreFirst){

finalWinner = second;

}

else{

finalWinner = "תיקו";

}



let winnerText = finalWinner === "תיקו"

? "🤝 אין מנצח"

: "🏆 המנצח: " + finalWinner;
// הצגת תוצאה


let result = `


<h2>

${first} 🆚 ${second}

</h2>



<h3>

${firstData.type}

</h3>



<table>


<tr>

<th>

קטגוריה

</th>


<th>

${first}

</th>


<th>

${second}

</th>


</tr>



${rows}


</table>



<div class="winner">

${winnerText}

</div>




<div class="explanation">


<h3>

למה?

</h3>



${explanation}



<br>


בסיכום:

<br>


<b>${first}</b> ניצח ב־

${scoreFirst}

קטגוריות.


<br>


<b>${second}</b> ניצח ב־

${scoreSecond}

קטגוריות.



</div>


`;




document
.getElementById("result")
.innerHTML = result;






// שמירת היסטוריה


let save = {


first:first,


second:second,


winner:finalWinner,


date:new Date()
.toLocaleString("he-IL")


};



history.unshift(save);



if(history.length > 20){

history.pop();

}



localStorage.setItem(

"compareHistory",

JSON.stringify(history)

);

}
// הצגת היסטוריה


function showHistory(){


let box = document
.getElementById("history");



if(history.length === 0){


box.innerHTML = `

<div class="message">

📜 אין עדיין השוואות

</div>

`;


return;


}




let html = `

<h2>

📜 השוואות אחרונות

</h2>

`;




history.forEach(item=>{


html += `

<div class="history-item">


<b>

${item.first}

</b>


🆚


<b>

${item.second}

</b>


<br>


🏆 ${item.winner}


<br>


${item.date}



</div>

`;



});



box.innerHTML = html;


}






// ניקוי היסטוריה


function clearHistory(){


history = [];


localStorage.removeItem(

"compareHistory"

);



document
.getElementById("history")
.innerHTML = `

<div class="message">

🗑 ההיסטוריה נמחקה

</div>

`;



}
