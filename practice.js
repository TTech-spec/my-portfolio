class person {
    constructor(name,age){
        this.name = name;
        this.age=age;
    }
    greet(){
        console.log('hello ,name is ${this.name} + i am ${this.age}');
    }
}
const student = new person ('Ada', 21)
student.greet(); 

