const firebaseConfig = {
    apiKey: "AIzaSyBAZ3pnKBOf32KUxoGs5pqY2B2vdO94Km0",
    authDomain: "quizapp-380ab.firebaseapp.com",
    databaseURL: "https://quizapp-380ab-default-rtdb.firebaseio.com",
    projectId: "quizapp-380ab",
    storageBucket: "quizapp-380ab.appspot.com",
    messagingSenderId: "813922620455",
    appId: "1:813922620455:web:58979c3b2bc44142276a02"
};
const app = firebase.initializeApp(firebaseConfig);
var database = app.database();
var obj = [
    {
        num: 1,
        question: "What does html stands for",
        Option: {
            a: "Hyper text markup link",
            b: "Hyper turn markup language",
            c: "Hyper text mongo link",
            d: "Hyper text markup language",

        },
        answer: "Hyper text markup language"

    },
    {
        num: 2,
        question: "What is the class name of bootstrap we used in a button ",
        Option: {
            a: "btn button",
            b: "btn",
            c: "button btn",
            d: "button",

        },
        answer: "btn"

    },
    {
        num: 3,
        question: "The correct sequence of HTML tags for starting a webpage is",
        Option: {

            a: "Head, Title, HTML, body",
            b: "HTML, Body, Title, Head",
            c: "HTML, Head, Title, Body",
            d: "HTML, Head, Title, Body",

        },
        answer: "HTML, Head, Title, Body"

    },
    {
        num: 4,
        question: "Which of the following element is responsible for making the text bold in HTML?",
        Option: {
            a: "pre",
            b: "a",
            c: "b",
            d: "br",

        },
        answer: "b"

    },
    {
        num: 5,
        question: "Which of the following tag is used for inserting the largest heading in HTML?",
        Option: {
            a: "h5",
            b: "h0",
            c: "h1",
            d: "h6"

        },
        answer: "h1"

    },
    {
        num: 6,
        question: "Which of the following tag is used to insert a line-break in HTML?",
        Option: {
            a: "br",
            b: "a",
            c: "pr",
            d: "b"

        },
        answer: "br"

    }, {
        num: 7,
        question: "Which is the 2nd highest paid programming language in the world?",
        Option: {
            a: "Python",
            b: "C++",
            c: "Javascript",
            d: "C Sharp",

        },
        answer: "Javascript"
    }
];

var submit = document.getElementById("submit");
var form = document.getElementsByClassName("mainformdiv")[0];
var input1 = document.getElementById("input1").value;;
var name = document.getElementById("Namep");
var counter = 0;
var rightCounter = 0;
var wrongCounter = 0;
var li1 = document.getElementById("li1");
var li2 = document.getElementById("li2");
var li3 = document.getElementById("li3");
var li4 = document.getElementById("li4");
var p2 = document.getElementById("p2");
var btn = document.getElementById("button");
var doneQues = document.getElementById("doneques");
var totalQues = document.getElementById("totalques")
var resultTotalQues = document.getElementById("resulttotalques");
var rightAns = document.getElementById("rightans");
var wrongAns = document.getElementById("wrongans");
var totalBody = document.getElementById("totalbody");
var resultdiv = document.getElementById("resultmaindiv");

var min = 6;
var sec = 60;
var msec = 0
var uimin = document.getElementById("min");
var uisec = document.getElementById("sec");
function timer() {
    msec++;
    if (msec == 100) {
        msec = 0;
        sec--;
        uisec.innerHTML = sec;
    } else if (sec == 1) {
        sec = 60;
        uisec.innerHTML = sec;
        min--;
        uimin.innerHTML = min;

    }
    if (min < 0) {
        totalBody.style.display = "none";
        resultdiv.style.display = "flex";
    }
}

var interval;
function startQuiz() {

    name.innerHTML = input1;
    totalBody.removeAttribute("style");
    totalBody.style.display = "flex";
    var key = database.ref("/").push().key;
    database.ref("todos").child(key).set(obj);
    form.setAttribute("id", key);
    form.style.display = "none";
    interval = setInterval(timer, 10);

    /* totalQues.innerHTML = obj.length;
    p2.innerHTML = obj[counter].question;
    li1.innerHTML = obj[counter].Option.a;
    li2.innerHTML = obj[counter].Option.b;
    li3.innerHTML = obj[counter].Option.c;
    li4.innerHTML = obj[counter].Option.d;
    doneQues.innerHTML = 1 + counter;
    btn.style.display = "none";
    form.style.display = "none"
    interval = setInterval(timer, 10);  */
}
database.ref("todos").on("child_added", (data) => {
    totalQues.innerHTML = obj.length;
    p2.innerHTML = data.val()[counter].question;
    li1.innerHTML = data.val()[counter].Option.a;
    li2.innerHTML = data.val()[counter].Option.b;
    li3.innerHTML = data.val()[counter].Option.c;
    li4.innerHTML = data.val()[counter].Option.d;
    doneQues.innerHTML = 1 + counter;
    btn.style.display = "none";



})
function nextQues() {
    if (counter < obj.length - 1) {
        counter++;
        clearInterval(interval);
        database.ref("todos").remove()
        startQuiz();
        li1.style.backgroundColor = "transparent";
        li2.style.backgroundColor = "transparent";
        li3.style.backgroundColor = "transparent";
        li4.style.backgroundColor = "transparent";
        li1.style.pointerEvents = "visible";
        li2.style.pointerEvents = "visible";
        li3.style.pointerEvents = "visible";
        li4.style.pointerEvents = "visible";
    } else {
        totalBody.style.display = "none";
        resultdiv.style.display = "flex"
    }
}

function checkAns(li) {
    btn.style.display = "block";
    btn.removeAttribute("disabled");
    li1.style.pointerEvents = "none";
    li2.style.pointerEvents = "none";
    li3.style.pointerEvents = "none";
    li4.style.pointerEvents = "none";
    var answer;
    database.ref("todos").on("child_added", function (data) {
        answer = data.val()[counter].answer;
        return answer;
    })
   

    if (li.innerHTML === answer) {
        li.style.backgroundColor = "green";
        rightCounter++;
        rightAns.innerHTML = rightCounter;
    } else {
        li.style.backgroundColor = "red";
        wrongCounter++;;
        wrongAns.innerHTML = wrongCounter;
    }
}
resultTotalQues.innerHTML = obj.length;