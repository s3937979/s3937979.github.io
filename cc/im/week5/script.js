// console.log("Hello");
// console.log("How are you buddy?");

// let myName = "Pepe";
// console.log("Hello", myName);

// let no = "s3937979";
// console.log("Hello", no);

// let myCity = prompt("Where do you live?");
// console.log("I live in", myCity);

// {
//     let a = 10;
//     console.log(a);
// }
// number variable
let a = 100;
let b = parseInt("20");
console.log(a, b);
let c = a + b;
console.log(c);
let grade = 72;
if (grade > 70) {
  console.log("Yey you got HD");
} else {
  console.log("Sorry you just passed the course");
}

// + - * /

let weather = "sunny";
if (weather === "sunny") {
  console.log("What a nice pleasant sunny weather");
} else {
  console.log("sorry no sun today");
}

// string variable
const myName = "Pepe";
console.log(myName);
// const myCity = "Melbourne";
// const msg = '
// <h1> I live in ${myCity} </h1>
// ';

// boolean variable true / false
let isThisSunday = false;
let isItAfternoon = true;

// objects { name:value, name:value}
const myStudentRecord = {
  name: "Pepe",
  id: 1234,
  course: "OART1013",
  isLocal: false,
};

console.log(myStudentRecord);
console.log(myStudentRecord.course);

// arrays
// let sName1 = "Pepe";
// let sName2 = "Soogang";
// let sName3 = "Dana";

let sNames = ["Pepe", "Soogang", "Dana"];
console.log(sNames[1]);

let numbers = [2, 4, 6, 8, 10];
console.log(numbers[3]);

let students = ["Pepe", "Soogang", "Dana"];
for (let i = 0; i < students.length; i++) {
  console.log("HELLO", students[i]);
}
