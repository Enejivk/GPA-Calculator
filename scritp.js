const addButton = document.querySelector('#submit');
const inputCourseTitle = document.querySelector('#course-title');
const inputScore = document.querySelector('#score');
const creditLoadDropdown = document.querySelector('#credit-load');
const gpaScaleDropdown = document.querySelector('#gpaScaleDropdown');
const courseList = document.querySelector('.course-list');
const inputGrade = document.querySelector('#grade');
const calculateButton = document.querySelector('#calculate');
const formSection = document.querySelector('form');
const displayGpa = document.querySelector('.display-gpa-canva');
const listOfCreditLoad = [];

function clearAllInput(){
    inputCourseTitle.value = '';
    inputGrade.value = '';
    inputScore.value = '';
    creditLoadDropdown.value = '1'


}
function getCourseDetails(e){
    e.preventDefault()
    HTMLStrings = `
    <p>
        <span>${inputCourseTitle.value}</span>
        <span>${inputGrade.value.toUpperCase()}</span>
        <span>${inputScore.value}</span>
    </p>
    `
    if(inputScore.value && inputGrade.value && inputScore.value && creditLoadDropdown.value && gpaScaleDropdown.value){
        
        courseList.insertAdjacentHTML("beforeend", HTMLStrings);
        listOfCreditLoad.push(creditLoadDropdown.value)
    } else {
        alert('COMPLETE YOUR FORM');
    }
    const courseNumber = courseList.querySelectorAll('.course-list p').length;
    if (courseNumber > 1){
        calculateButton.style.display = 'block'
    }

    // clearAllInput()
}
function CalculateTotalScore(listOfAllScores){
    let GPAhTMLString;
    let sumOfAllScores = 0;
    let sumOfCreditLoad = 0;
    for (let i = 0; i < listOfAllScores.length; ++i){
        sumOfAllScores += listOfAllScores[i];
        sumOfCreditLoad += Number(listOfCreditLoad[i])

    }
    const GPA = (sumOfAllScores / sumOfCreditLoad).toFixed(2);
    if(GPA){
        GPAhTMLString = `
        <div class="gpa-display-screen">
            <p>Your GPA: ${GPA}</p>
            <p>Total courses: ${listOfAllScores.length}</p>
            <p>Gpa Scale: ${gpaScaleDropdown.value}</p>
        </div>
          `
    }
    // formSection.insertAdjacentHTML('beforeend', GPAhTMLString);
    displayGpa.innerHTML = GPAhTMLString;
    console.log(formSection.lastChild);
    
}

function calculateGpa(){
    let A, B, C, D, E, F;
    const allGrades = courseList.querySelectorAll('.course-list P span:nth-child(2)');
    
    const listOfGrade = [];
    const listOfAllScores = [];
    for(const eachGrade of allGrades ){
        listOfGrade.push(eachGrade.textContent)
    }

    if (gpaScaleDropdown.value === '5'){
         A = 5; B = 4; C = 3; D = 2; E = 1; F = 0;
    } else {
         A = 4; B = 3; C = 2; D = 1; E = 0; F = 0;
    }

    for(let i = 0; i < listOfGrade.length; i++) {
        if (listOfGrade[i] == "A") {
            listOfAllScores.push(A*listOfCreditLoad[i])
        } else if (listOfGrade[i] == "B"){
            listOfAllScores.push(B * listOfCreditLoad[i])
        }
        else if (listOfGrade[i] === "C"){
            listOfAllScores.push(C * listOfCreditLoad[i])
        }
        else if (listOfGrade[i] == "D"){
            listOfAllScores.push(D * listOfCreditLoad[i])
        }
        else if (listOfGrade[i] == "E"){
            listOfAllScores.push(E * listOfCreditLoad[i])
        }
        else {
            listOfAllScores.push(F * listOfCreditLoad[i])
        }
}
    console.log(listOfAllScores);
    CalculateTotalScore(listOfAllScores)
}
calculateButton.addEventListener('click', calculateGpa);
addButton.addEventListener('click', getCourseDetails)