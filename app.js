// 🧠 Compare AI 2.0
// מנוע ההשוואה


// בדיקה שהמאגר נטען

if(typeof database === "undefined"){

console.error(
"❌ database.js לא נטען"
);

}



// שמירת היסטוריה

let history = 
JSON.parse(localStorage.getItem("compareHistory")) || [];




// פונקציית השוואה ראשית

function compare(){


let first =
document.getElementById("first").value.trim();


let second =
document.getElementById("second").value.trim();



let result =
document.getElementById("result");



if(!first || !second){

result.innerHTML = `

<div class="explanation">

❌ צריך לכתוב שני דברים להשוואה

</div>

`;

return;

}



// בדיקה אם קיימים במאגר

if(!database[first] || !database[second]){


result.innerHTML = `

<div class="explanation">

❌ אחד מהדברים לא נמצא במאגר.

<br><br>

נסה שמות שקיימים במאגר.

</div>

`;

return;

}




if(first === second){


result.innerHTML = `

<div class="explanation">

😄 אי אפשר להשוות משהו לעצמו

</div>

`;

return;

}



let firstData = database[first];

let secondData = database[second];



// כאן ייכנס מנוע הניקוד

let stats1 = firstData.stats;

let stats2 = secondData.stats;



let categories =
Object.keys(stats1);



let score1 = 0;

let score2 = 0;


let rows = "";

let explanation = "";



categories.forEach(category=>{


let value1 =
stats1[category] || 0;


let value2 =
stats2[category] || 0;



let winner = "";



if(value1 > value2){

winner = first;

score1++;

}

else if(value2 > value1){

winner = second;

score2++;

}

else{

winner = "שניהם";

}



rows += `

<tr>

<td>${category}</td>


<td>

${winner===first ? "✅" : ""}

<br>

${value1}/10

</td>


<td>

${winner===second ? "✅" : ""}

<br>

${value2}/10

</td>


</tr>

`;



if(winner !== "שניהם"){

explanation += `

• בקטגוריית <b>${category}</b>:

${winner} מוביל.

<br>

`;

}
// בחירת מנצח סופי

let finalWinner;


if(score1 > score2){

finalWinner = first;

}

else if(score2 > score1){

finalWinner = second;

}

else{

finalWinner = "תיקו";

}



// חישוב דירוג מתוך 100

let totalCategories = categories.length;

let totalPoints = score1 + score2;


let rating1 = 
Math.round((score1 / totalCategories) * 100);


let rating2 = 
Math.round((score2 / totalCategories) * 100);




// הצגת תוצאה

result.innerHTML = `


<h2>

${first} 🆚 ${second}

</h2>


<h3>

${firstData.type}

</h3>



<table>


<tr>

<th>קטגוריה</th>

<th>${first}</th>

<th>${second}</th>

</tr>


${rows}


</table>




<div class="winner">

🏆 המנצח: ${finalWinner}

</div>




<div class="explanation">


<h3>🤖 ניתוח Compare AI:</h3>


${explanation}


<br><br>


<h3>📊 דירוג כללי:</h3>


${first}: ${rating1}/100

<br>

${second}: ${rating2}/100


<br><br>


Compare AI בדק ${totalCategories} קטגוריות
והשווה לפי הנתונים במאגר.


</div>


`;




// שמירת השוואה בהיסטוריה


history.unshift({

first:first,

second:second,

winner:finalWinner,

date:new Date().toLocaleString("he-IL")

});



// שמירה רק של 50 אחרונות

if(history.length > 50){

history.pop();

}



localStorage.setItem(

"compareHistory",

JSON.stringify(history)

);



}
                   // 📜 הצגת היסטוריה

function showHistory(){


let box =
document.getElementById("history");



if(history.length === 0){


box.innerHTML = `

<div class="explanation">

אין עדיין השוואות

</div>

`;

return;

}




let html = `

<h2>📜 היסטוריית השוואות</h2>

`;



history.forEach(item=>{


html += `

<div class="history-item">


<b>${item.first}</b>

🆚

<b>${item.second}</b>


<br>


🏆 ${item.winner}


<br>


${item.date}


</div>


`;

});


box.innerHTML = html;


}




// 🗑 ניקוי היסטוריה

function clearHistory(){


history = [];


localStorage.removeItem("compareHistory");



document.getElementById("history").innerHTML = `

<div class="explanation">

🗑 ההיסטוריה נמחקה

</div>

`;

}




// 💎 פתיחת מסך Premium

function openPremium(){



let isPremium =

localStorage.getItem("premium") === "true";




if(isPremium){


document.getElementById("result").innerHTML = `

<div class="premium">


<h2>💎 אתה משתמש Premium</h2>


<p>

כל הפיצ'רים פתוחים 🚀

</p>


</div>

`;

return;

}





document.getElementById("result").innerHTML = `


<div class="premium">


<h2>💎 Compare AI Premium</h2>


<p>

קבל גישה לפיצ'רים מתקדמים:

</p>


<ul>


<li>🤖 הסברים חכמים יותר</li>

<li>📊 דירוגים מתקדמים</li>

<li>📚 מאגר מורחב</li>

<li>⚡ השוואות מיוחדות</li>

<li>🖼 תמונות ופרטים נוספים</li>


</ul>


<br>


<button onclick="activatePremium()">

הפעל Premium

</button>


</div>


`;

}



// הפעלת Premium (כרגע בדיקה)

function activatePremium(){



localStorage.setItem(

"premium",

"true"

);



alert(

"🎉 Premium הופעל בהצלחה!"

);



openPremium();


}

});
