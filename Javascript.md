# Javascript [link](https://github.com/leonardomso/33-js-concepts#readme)

## Primitive dtaypes

undefined indicates the absence of a value, while null indicates the absence of an object
null is a keyword, but undefined is a normal identifier
NaN ("Not a Number") is a special kind of number value that's typically encountered when the result of an arithmetic operation cannot be expressed as a number.
It is also the only value in JavaScript that is not equal to itself.
A BigInt is created by appending n to the end of an integer or by calling the BigInt() function.
JavaScript strings are immutable.
A Symbol is a unique and immutable primitive value and may be used as the key of an Object property
Objects are only mutable values
parseInt("101", 2); // 5 this second one is redix parameter for numrical system

# value VS Reference

Javascript has 5 data types that are passed by value: Boolean, null, undefined, String, and Number.
Javascript has 3 data types that are passed by reference: Array, Function, and Object.
Variables that are assigned a non-primitive value are given a reference to that value. That reference points to the object’s location in memory. The variables don’t actually contain the value.

## Pure and Impure function

We refer to functions that don’t affect anything in the outside scope as pure functions. As long as a function only takes primitive values as parameters and doesn’t use any variables in its surrounding scope, it is automatically pure, as it can’t affect anything in the outside scope. All variables created inside are garbage-collected as soon as the function returns.

> var newPersonObj = JSON.parse(JSON.stringify(person)); //makes impure to pure

Remember that assignment through function parameters is essentially the same as assignment with =.

# Type Coercion

The first rule to know is there are only three types of conversion in JavaScript:
to string
to boolean
to number

Secondly, conversion logic for primitives and objects works differently, but both primitives and objects can only be converted in those three ways.

1. When applying == to null or undefined, numeric conversion does not happen. null equals only to null or undefined, and does not equal to anything else.
2. NaN does not equal to anything even itself:

## Type coercion for objects

any non-primitive value is always
coerced to true, no matter if an object or an array is empty or not.

# Function Scope, Block Scope and Lexical Scope

in function definition it is parameters, can be 255, and in function call it's arguments
Every function in JavaScript returns undefined unless otherwise specified.  
declarations are hoisted to the top of their current scope.  
When you execute your JavaScript code, the interpreter goes through the code twice.
lexical scope or compile-time scope i.e. the decision for what the scope is was actually made during compilation time.the lexical scope introduces the concept of variable shadowing in JavaScript. This means that a variable foo declared in the current function scope will shadow - or hide - a variable with the same name in the parent scope.  
Variables declared in a function scope cannot be accessed from the outside. i.e. private

**Block Scope**

As of ES3, a catch clause in try / catch statements has a block scope, which means that it has its own scope. It's important to note that the try clause does not have a block scope, only the catch clause does.  
As of ES6, let and const variables are attached implicitly to the current block scope instead of the function scope.  
let and const variables allow us to use the principle of least disclosure, which means that a variable should only be accessible in the smallest scope possible.  
var variables are ‘function scope’.where as let and const rather than being scoped to the function they are scoped to the block.  
nice blog- [designingforscale](https://designingforscale.com/)

```
sayHello() // Error, sayHello is not defined
const sayHello = function () { console.log(aFunction)}
```

function with function expressions are not hoisted

# Statements vs Expression vs Expression statement

expressions can act like statements but statements cannot act like expressions.

## Expressions

Expressions are Javascript code snippets that result in a single value.
Expressions don’t necessarily change state

## Statements

In javascript, statements can never be used where a value is expected. So they cannot be used as function arguments, right-hand side of assignments, operators operand, return values…
These are all javascript statements:
if
if-else
while
do-while
for
switch
for-in
with (deprecated)
debugger
variable declaration

> if (true) {9+9} //Here, value is Returned but can not be used

A function declaration is a statement
A function expression and named function expression is an expression.
convert expressions to expression statement, just by adding a semi-colon to the end of the line
The comma operator allows you to chain multiple expression, returning only the last expression

# IIFE, Modules and Namespaces

```
!function() {
    alert("Hello from IIFE!");
}();
```

That’s a function that died immediately after it came to life.  
Basically any unary operator can be used to make that function into an expression instead of a function statement/definition where we dont want to return anything

```
// Variation 1
(function() {
    alert("I am an IIFE!");
}());

// Variation 2
(function() {
    alert("I am an IIFE, too!");
})();
```

**we need a function expression to form an IIFE**
Any variables declared inside the IIFE are not visible to the outside world.  
So whenever you are creating a bunch of variables and functions in global scope that no one uses outside your code, just wrap all of that in an IIFE  
now

```
(function test(num1,num2){
  let sum = num1+num2;
    console.log(sum)
  })(5,4)
```

IIFE was used to make Classical JavaScript module pattern

# setTimeout, setInterval and requestAnimationFrame

“scheduling a call”.

```
 function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

let timerId = setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
clearTimeout(timerId)
```

setTimeout expects a reference to a function not call  
 For setTimeInterval, all arguments have the same meaning. But unlike setTimeout it runs the function not only once, but regularly after the given interval of time.

nested setTimeout works same as Set interval

```
let timerId = setTimeout(function tick() {
 alert('tick');
 timerId = setTimeout(tick, 2000); // (*)
}, 2000);
```

Nested setTimeout allows to set the delay between the executions more precisely than setInterval.
The nested setTimeout guarantees the fixed delay (here 100ms).
`setTimeout(func, 0)` the function is scheduled to run “right after” the current script.

# Factories and Classes

JavaScript is a prototype-based language.Every object in JavaScript has an internal property called [[Prototype]].The double square brackets that enclose [[Prototype]] signify that it is an internal property, and cannot be accessed directly in code.

To get [[Prototype]] of obj

> Object.getPrototypeOf(obj);  
> obj.\_\_proto\_\_ //older way called Dunder Proto

At the end of the prototype chain is Object.prototype. All objects inherit the properties and methods of Object. Any attempt to search beyond the end of the chain results in null.

to check the prototype chain

```
Object.prototype.isPrototypeOf(Array); // true
y instanceof Array; // true
```

## Constructor Functions

functions that are used to construct new objects.

## **Construction Functions** and prototype inheritance

```
function Hero(name, level) {
 this.name = name;
 this.level = level;
 this.mission = function(missionName){
   console.log(this.name,"got a mission to",missionName)
 }
 Hero.prototype.greet = function () {
   console.log(this.name, "says hello.")
 }
 Hero.staticMethod = () => {
   console.log("All Heros come to Bhopal")
  }
}

Hulk = new Hero("Bruce Banner", 8)
const Ironman = new Hero("Tony Stark",10 )
console.log(Object.getPrototypeOf(Hulk))

//  Object.getPrototypeOf(Hulk).console;


function Wizard(name, level, spell) {
  Hero.call(this, name, level)
  this.spell = spell;
 }
 function Warrior(name, level, attack) {
   Hero.call(this, name, level)
   this.attack = attack
 }

 Warrior.prototype.attack = function () {
   console.log(this.name, "attacks with the", this.weapon);
 }

 Wizard.prototype.cast = function () {
   console.log(this.name + ' casts ' + this.spell)

}


 Hero.prototype.isGood = true
 const Snape = new Wizard("Severus Snape", 10, "SectumSempra")
 Snape.cast()
 Object.setPrototypeOf(Wizard.prototype, Hero.prototype)
 Snape.greet()
 Snape.mission('protect Harry')
 Hulk.mission("wreck Asgard")
 Snape.isGood = false
 console.log(Ironman.isGood)
 console.log(Hulk.isGood)
 Hero.staticMethod()
 Hulk.staticMethod() // error
```

when any one of the instances of a constructor function makes any change in any primitive property, it will only be reflected in that instance and not among all the instances:.  
Another thing is that **reference type properties** are always shared among all the instances, for example, a property of type array, if modified by one instance of the constructor function will be modified for all the instances.
one diference between functional prototyping and class based is constructor and methods are hidden inside the prototype in class based.
If you don’t add a constructor to a class, a default empty constructor will be added automatically.

### static Methods

static methods can not be called from the class instance.Static methods are declared using static keyword, and are mostly used to create utility functions. They are called without creating the instance of the class.

## **Class based inheritance**

```
// Initializing a class definition
class Hero {
	constructor(name, level) {
		this.name = name;
		this.level = level;

	}
  // Adding a method to the constructor
	greet() {
		console.log(this.name, " says hello.")
}
 static Assemble(){
  console.log("All Heros come to Bhopal")
 }
}

const Hulk = new Hero("Bruce Banner",8.7 )


// Creating a new class from the parent
class Wizard extends Hero {
	constructor(name, level, spell) {
		// Chain constructor with super
		super(name, level);
    //super instead of call without this

		// Add a new property
		this.spell = spell;
	}
}
const YouKnowWho = new Wizard("Tom Riddle", 10, "Avada-ka-davra")

YouKnowWho.greet();
Hero.Assemble();
```

## **Factory Function** another way of creating an object

object literals

```
const Animal = {
  name: "not_given_yet", //remove this if you like
  walk() {
    console.log(this.name + " walks");
  }
}
const poo = Object.assign({}, Animal, {name: "poo"})
poo.walk()
or
const tommy = Object.create(Animal) //this sets up prototype chain
tommy.name = "tommy"
tommy.walk()

```

factory function can make objects without the use of 'new' keyword and ‘this’ refers to the parent object,
it can contain private functions and variables also. factory patterns can make objects dynamically also.For example, if you wanted to add specific development methods to your object based on an environment variable you could easily pass the factory function a parameter and adjust the object accordingly.

```
function Hero(name, level){
// private variable and Function
var location = 'Denver';
var address = function(){
	console.log("hes lives in denver")
}

	return {
		name:name,
		level:level,
		this:this,
		attack:function(weapon='hands'){
			console.log(name,'attacks with',weapon )
			console.log(this)
		}
	}
}
const Hulk = Hero("Bruce Banner", 8)
console.log(Hulk.this)
Hulk.attack()
```

# this, call, apply and bind

All the three functions have one similarity, their first argument is always the ‘this’ value or context, that you want to pass to the function you call the method on.  
call() and apply() are invoked immediately, bind() returns a bound function, with the context, which will be invoked later.  
call() and apply() are similar the only difference being, arguments in apply() is passed as an array.  
![this](this%20context.png)

# new, Constructor, instanceof and Instances

```
function User() {
  alert(new.target);
}

// without "new":
User(); // undefined

// with "new":
new User(); // function User { ... }
```

```
function Book(name, year) {
  console.log(this);
  this.name = name;
  this.year = year;
}

var myBook = Book("js book", 2014);
console.log(myBook instanceof Book);
console.log(window.name, window.year);

var myBook = new Book("js book", 2014);
console.log(myBook instanceof Book);
console.log(myBook.name, myBook.year);
```

When we call the Book constructor without new, we are in fact calling a function without a return statement. As a result, this inside the constructor points to Window (instead of myBook), and two global variables are created. However, when we call the function with new, the context is switched from global (Window) to the instance. So, this correctly points to myBook. to avoid this we need make Scope-safe constructors

```
typeof checks if a value is an element of a primitive type:
if (typeof value === 'string') ···
instanceof checks if a value is an instance of a class or a constructor function:
if (value instanceof Map) ···
```

```
> typeof {}
'object'
> typeof function () {}
'function'
```

> Object.create(null) instanceof Object //false

# Inheritance and the prototype chain

## Inheriting properties

```
const o = {
 a: 1,
 b: 2,
 // __proto__ sets the [[Prototype]]. It's specified here as another object literal.
 __proto__: {
   b: 3,
   c: 4,
 },
};

// o.[[Prototype]] has properties b and c.
// o.[[Prototype]].[[Prototype]] is Object.prototype
// Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null.by definition, has no [[Prototype]].
// Thus, the full prototype chain looks like:
// { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> Object.prototype ---> null

console.log(o.a); // 1
// Is there an 'a' own property on o? Yes, and its value is 1.

console.log(o.b); // 2
// Is there a 'b' own property on o? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited.
// This is called Property Shadowing

console.log(o.c); // 4
// Is there a 'c' own property on o? No, check its prototype.
// Is there a 'c' own property on o.[[Prototype]]? Yes, its value is 4.

console.log(o.d); // undefined
// Is there a 'd' own property on o? No, check its prototype.
// Is there a 'd' own property on o.[[Prototype]]? No, check its prototype.
// o.[[Prototype]].[[Prototype]] is Object.prototype and
// there is no 'd' property by default, check its prototype.
// o.[[Prototype]].[[Prototype]].[[Prototype]] is null, stop searching,
// no property found, return undefined.
```

## Inheriting "methods"

```
const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

console.log(parent.method()); // 3
// When calling parent.method in this case, 'this' refers to parent

// child is an object that inherits from parent
const child = {
  __proto__: parent,
};
console.log(child.method()); // 3
// When child.method is called, 'this' refers to child.
// So when child inherits the method of parent,
// The property 'value' is sought on child. However, since child
// doesn't have an own property called 'value', the property is
// found on the [[Prototype]], which is parent.value.

child.value = 4; // assign the value 4 to the property 'value' on child.
// This shadows the 'value' property on parent.
// The child object now looks like:
// { value: 4, __proto__: { value: 2, method: [Function] } }
console.log(child.method()); // 5
// Since child now has the 'value' property, 'this.value' means
// child.value instead

```

## Building longer inheritance chains

```
function Constructor() {}

const obj = new Constructor();
// obj ---> Constructor.prototype ---> Object.prototype ---> null

function Base() {}
function Derived() {}
// Set the `[[Prototype]]` of `Derived.prototype`
// to `Base.prototype`
Object.setPrototypeOf(Derived.prototype, Base.prototype);

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null

> In class terms, this is equivalent to using the extends syntax.
class Base {}
class Derived extends Base {}

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```

**Never Do this**

```
function Base() {}
function Derived() {}
// Re-assigns `Derived.prototype` to a new object
// with `Base.prototype` as its `[[Prototype]]`
// DON'T DO THIS — use Object.setPrototypeOf to mutate it instead
Derived.prototype = Object.create(Base.prototype);
```

arrow function lack the functionality fo work as a constructor

```
function doSomething() {}
console.log(doSomething.prototype);
// It does not matter how you declare the function; a
// function in JavaScript will always have a default
// prototype property — with one exception: an arrow
// function doesn't have a default prototype property:
const doSomethingFromArrowFunction = () => {};
console.log(doSomethingFromArrowFunction.prototype);
```

```
function doSomething() {}
doSomething.prototype.foo = "bar";
const doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value";
console.log("doSomeInstancing.prop:     ", doSomeInstancing.prop);
console.log("doSomeInstancing.foo:      ", doSomeInstancing.foo);
console.log("doSomething.prop:          ", doSomething.prop);
console.log("doSomething.foo:           ", doSomething.foo);
console.log("doSomething.prototype.prop:", doSomething.prototype.prop);
console.log("doSomething.prototype.foo: ", doSomething.prototype.foo);

VM386:5 doSomeInstancing.prop:      some value
VM386:6 doSomeInstancing.foo:       bar
VM386:7 doSomething.prop:           undefined
VM386:8 doSomething.foo:            undefined
VM386:9 doSomething.prototype.prop: undefined
VM386:10 doSomething.prototype.foo:  bar
```

# Object.create and Object.assign

Object.create(prototype_object, propertiesObject)

prototypeObject: Newly created object’s prototype object. It has to be an object or null.  
propertiesObject: Properties of the new object.It acts as a descriptor for the new properties to be defined. This argument is optional
Data descriptors are

configurable
enumerable
value
writable  
Access descriptors are  
get
set

The Object.assign() static method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.  
Object.assign(target, ...sources)

# map, reduce, filter

Use map when you want to apply a transformation to all elements in an array.

> args callbackfn(element,index,array) , this argument

```
let Arr1 = [1,2,3,4,5,6]
let Arr2 = Arr1.map(x=>x*2)
console.log(Arr1)
console.log(Arr2)
```

Use filter() to remove unwanted elements based on a condition

> args callbackfn(element,index,array) , this argument

```
let duplicateNumbers = [12,12,13,14,33,14,45,15,16,45,16]
function filtercondition(element,index,arr){
  arr.indexOf(element)===index
  console.log(element)
}
let FilteredArray= duplicateNumbers.filter((element,index,arr)=>arr.indexOf(element)===index)
console.log(duplicateNumbers.indexOf(12))
```

Use reduce() to apply a function across an entire array and return a single value.Under the hood reduce() executes a callback function for each element that contains four arguments: accumulator, currentValue, currentIndex, and array.

# Pure Functions, Side Effects, State Mutation and Event Propagation

## Pure function

A pure function is a function which:
1.Given the same input, always returns the same output.
2.Produces no side effects.
Side effects are any changes or modifications that occur outside the scope of a function when the function is executed.  
Any sort of asynchronous operation or concurrency could cause similar race conditions. Race conditions happen if output is dependent on the sequence of uncontrollable events
non-determinism = parallel processing + mutable state  
to make api pure -- The fact that an operation is done only once causes every call to pureHttpCall to be guaranteed to return the same result. This means that the function is now pure.
[remaining state mutability](https://medium.com/dailyjs/the-state-of-immutability-169d2cd11310)

# Closures

```
function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc();

```

The reason is that functions in JavaScript form closures. A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created. In this case, myFunc is a reference to the instance of the function displayName that is created when makeFunc is run. The instance of displayName maintains a reference to its lexical environment, within which the variable name exists. For this reason, when myFunc is invoked, the variable name remains available for use, and "Mozilla" is passed to console.log.  
another example

```
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

In essence, makeAdder is a function factory. It creates functions that can add a specific value to their argument.
The Lexical Environment object consists of two parts:

1. Environment Record – an object that stores all local variables as its properties (and some other information like the value of this).
2. A reference to the outer lexical environment, the one associated with the outer code.
   > let outer = function() {  
   >  this can not be hoisted  
   > function outer (){  
   >  this will be  
   > because of the decalaration of let and function

The inner Lexical Environment has a reference to the outer one.

When the code wants to access a variable – the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.

## Closure

There is a general programming term “closure”, that developers generally should know.

A closure is a function that remembers its outer variables and can access them. In some languages, that’s not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in The "new Function" syntax).

That is: they automatically remember where they were created using a hidden [[Environment]] property, and then their code can access outer variables.

When on an interview, a frontend developer gets a question about “what’s a closure?”, a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the [[Environment]] property and how Lexical Environments work.

# Higher Order Function

Functions that take another function as an argument, or that define a function as the return value, are called higher-order functions  
 JavaScript functions are first-class citizens. This means functions in JavaScript are objects  
 Higher-Order Functions Can Take a Function as an Argument  
 A callback function is a function that executes at the end of an operation, once all other operations are complete.Callback functions in JavaScript allow for asynchronous behavior, so a script can continue executing other functions or operations while waiting for a result.  
 Returning Functions as Results with Higher-Order Functions  
 Building a Template Higher-Order Function

```
var attitude = function(original, replacement, source) {
return function(source) {
return source.replace(original, replacement);
};
};

var snakify = attitude(/millenials/ig, "Snake People");
var hippify = attitude(/baby boomers/ig, "Aging Hippies");

console.log(snakify("The Millenials are always up to something."));
// The Snake People are always up to something.
console.log(hippify("The Baby Boomers just look the other way."));
// The Aging Hippies just look the other way.
```

# Collections and Generators
```
const foo = function*() {
  yield 'a';
  yield 'b';
  yield 'c';
};
console.log(foo())
let str = '';
for (const val of foo()) {
  console.log(val)
  str = str + val;
}
console.log(str);
// Expected output: "abc"
```
## Collections
Well, many programs do use plain objects to store key-value pairs, and for programs where this works well, there is no particular reason to switch to Map or Set. Still, there are some well-known issues with using objects this way:

- Objects being used as lookup tables can’t also have methods, without some risk of collision.

- Therefore programs must either use Object.create(null) (rather than plain {}) or exercise care to avoid misinterpreting builtin methods (like Object.prototype.toString) as data.

- Property keys are always strings (or, in ES6, symbols). Objects can’t be keys.

- There’s no efficient way to ask how many properties an object has.

ES6 adds a new concern: plain objects are not iterable, so they will not cooperate with the for–of loop, the ... operator, and so on.

Again, there are plenty of programs where none of that really matters, and a plain object will continue to be the right choice. Map and Set are for the other cases.

Because they are designed to avoid collisions between user data and builtin methods, the ES6 collections do not expose their data as properties. This means that expressions like obj.key or obj[key] cannot be used to access hash table data. You’ll have to write map.get(key). Also, hash table entries, unlike properties, are not inherited via the prototype chain.

The upside is that, unlike plain Objects, Map and Set do have methods, and more methods can be added, either in the standard or in your own subclasses, without conflict.

A Set is a collection of values. It’s mutable, but will store unique values only
> setOfWords[15000]   // sets don't support indexing
    undefined   
Second, a Set keeps its data organized to make one particular operation fast: membership testing.  
> setOfWords.has("zythum")               // fast
    true  
the constructor new Set(iterable) stands out as a powerhouse, because it operates at the level of whole data structures. You can use it to convert an array to a set, eliminating duplicate values with a single line of code. Or, pass it a generator: it will run the generator to completion and collect the yielded values into a set. This constructor is also how you copy an existing Set.

```
let woo = foo() // foo is a generator function from above
let set1 = new Set(woo)
console.log(set1)
```
### Weak Collections, Memory, and Garbage Collections
Map and Set‘s references to objects are strongly held and will not allow for garbage collection. This can get expensive if maps/sets reference large objects that are no longer needed, such as DOM elements that have already been removed from the DOM.  
These ES6 collections are ‘weak’ because they allow for objects which are no longer needed to be cleared from memory.  
WeakMap can be used to keep an object’s private data private, and they can also be used to keep track of DOM nodes/objects.  
WeakSets are Set Collections whose elements can be garbage collected when objects they’re referencing are no longer needed. WeakSets don’t allow for iteration.

# Promises 
## [Best Article](https://www.digitalocean.com/community/tutorials/understanding-javascript-promises)

# async/await
# Datastructures
# Expensive Operation and Big O Notation