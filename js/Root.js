/*------------------------------------METHODS----------------------------------*/

//Bisection Method
function BisectionMethod() {
  //Retrieving the values
  var xl = document.getElementById("xl").value;
  var xu = document.getElementById("xu").value;
  var eps = document.getElementById("eps").value;
  var expression = document.getElementById("equation").value;

  //Root Message
  var message = document.getElementById("Display");

  //Creating the table
  var table = faketable();
  var tbody = document.getElementById("tbody");

  //Creating Variables
  var error = 0;
  var xr = 0;
  var xrOld = 0;
  var iter = 0;

  do {
    xrOld = xr;
    xr = (xl + xu) / 2;
    error = Math.abs((xr - xrOld) / xr) * 100;

    //Insterting a new row
    var row = tbody.insertRow(-1);

    //Adding attributes to the row
    var iterCell = row.insertCell(0);
    iterCell.innerHTML = iter;

    var xlCell = row.insertCell(1);
    xlCell.innerHTML = parseFloat(xl).toFixed(3);

    var fxlCell = row.insertCell(2);
    fxlCell.innerHTML = fun(xl, expression);

    var xuCell = row.insertCell(3);
    xuCell.innerHTML = parseFloat(xu).toFixed(3);

    var fxuCell = row.insertCell(4);
    fxuCell.innerHTML = fun(xu, expression);

    var xrCell = row.insertCell(5);
    xrCell.innerHTML = parseFloat(xr).toFixed(3);

    var fxrCell = row.insertCell(6);
    fxrCell.innerHTML = fun(xr, expression);

    var errorCell = row.insertCell(7);
    if (iter == 0) {
      errorCell.innerHTML = "NULL";
    } else errorCell.innerHTML = error.toFixed(3) + "%";

    if (fun(xl, expression) * fun(xr, expression) > 0) {
      xl = xr;
    } else {
      xu = xr;
    }
    iter++;
  } while (error > eps);

  message.innerHTML = "The Root = " + xr;
}

//False Position Method
function FalsePosition() {
  //retrieving the values
  var xl = parseFloat(document.getElementById("xl").value);
  var xu = parseFloat(document.getElementById("xu").value);
  var eps = document.getElementById("eps").value;
  var expression = document.getElementById("equation").value;

  //Root Message
  var message = document.getElementById("Display");

  //Creating Table
  var table = faketable();
  var tbody = document.getElementById("tbody");

  var error = 0;
  var xr = 0;
  var xrOld = 0;
  var iter = 0;

  do {
    //Evaluating value of Xr and ERROR
    xrOld = xr;
    xr =
      xu -
      (fun(xu, expression) * (xl - xu)) /
        (fun(xl, expression) - fun(xu, expression));
    error = Math.abs((xr - xrOld) / xr) * 100;
    xr = xr.toFixed(3);

    //Insterting a new row
    var row = tbody.insertRow(-1);

    //Adding attributes to the row
    var iterCell = row.insertCell(0);
    iterCell.innerHTML = iter;

    var xlCell = row.insertCell(1);
    xlCell.innerHTML = parseFloat(xl).toFixed(3);

    var fxlCell = row.insertCell(2);
    fxlCell.innerHTML = fun(xl, expression).toFixed(3);

    var xuCell = row.insertCell(3);
    xuCell.innerHTML = parseFloat(xu).toFixed(3);

    var fxuCell = row.insertCell(4);
    fxuCell.innerHTML = fun(xu, expression).toFixed(3);

    var xrCell = row.insertCell(5);
    xrCell.innerHTML = parseFloat(xr).toFixed(3);

    var fxrCell = row.insertCell(6);
    fxrCell.innerHTML = fun(xr, expression).toFixed(3);

    var errorCell = row.insertCell(7);
    if (iter == 0) {
      errorCell.innerHTML = "NULL";
    } else {
      errorCell.innerHTML = error.toFixed(3) + "%";
    }
    //Swapping values if necessary
    if (fun(xl, expression) * fun(xr, expression) > 0) {
      xl = xr;
    } else {
      xu = xr;
    }
    iter++;
  } while (error > eps);

  message.innerHTML = "The root = " + xr;
}

//FixedPoint
function FixedPoint() {
  //Retrieving Variables
  let expression = document.getElementById("equation").value;
  let xi = document.getElementById("xi").value;
  let eps = document.getElementById("eps").value;

  //Root Message
  var message = document.getElementById("Display");

  //Creating Table
  var table = FixedTable();
  var tbody = document.getElementById("tbody");

  var error = 0;
  var iter = 0;
  var xiPlus1 = 0;

  const f = (x) => math.evaluate(expression, { x: x });
  const g = (x) => f(x);

  while (true) {
    xiPlus1 = g(xi);

    var row = tbody.insertRow(-1);

    var iterCell = row.insertCell(0);
    iterCell.innerHTML = iter;

    var xiCell = row.insertCell(1);
    xiCell.innerHTML = parseFloat(xi).toFixed(3);

    var xiPlus1Cell = row.insertCell(2);
    xiPlus1Cell.innerHTML = xiPlus1.toFixed(3);

    var errorCell = row.insertCell(3);
    if (iter == 0) {
      errorCell.innerHTML = "Null";
    } else errorCell.innerHTML = error.toFixed(3) + "%";

    if (error <= eps && iter > 0) {
      break; // Exit the loop
    }

    error = Math.abs((xiPlus1 - xi) / xiPlus1) * 100;
    xi = xiPlus1;
    iter++;
  }
  message.innerHTML = "The root = " + xi.toFixed(3);
}

//Newton's Method
function NewtonMethod() {
  //Retrieving Variables
  let expression = document.getElementById("equation").value;
  let xi = document.getElementById("xi").value;
  let eps = document.getElementById("eps").value;
  let equation = expression;

  //Root Message
  var message = document.getElementById("Display");

  //Creating Table
  var table = NewtonTable();
  var tbody = document.getElementById("tbody");

  //Variables :)
  var error = 0;
  var iter = 0;
  var xiPlus1 = 0;
  var xiMinus1 = 0;

  //Functions and the Derivative of the Function
  const h = (x) => math.evaluate(expression, { x: x });
  const g = (x) => h(x); //Normal Function

  //Replacing ^ with ** and * before every x So the Derivative function can read it
  equation = equation.replace("^", "**");
  equation = equation.replace(/(\d)x/g, "$1*x");

  //Derivative Function
  const f = new Function("x", `return ${equation};`);
  const derivative = (f, x) => {
    const h = 0.0001; // small value of h for numerical approximation
    return (f(x + h) - f(x)) / h; // calculate the derivative using the formula (f(x+h) - f(x)) / h
  };

  while (true) {
    xiPlus1 = xi - g(xi) / derivative(f, parseFloat(xi));
    var row = tbody.insertRow(-1);

    var iterCell = row.insertCell(0);
    iterCell.innerHTML = iter;

    var xiCell = row.insertCell(1);
    xiCell.innerHTML = parseFloat(xi).toFixed(3);

    var FxiCell = row.insertCell(2);
    FxiCell.innerHTML = g(xi).toFixed(3);

    var FxiDashCell = row.insertCell(3);
    FxiDashCell.innerHTML = derivative(f, parseFloat(xi)).toFixed(5);

    var errorCell = row.insertCell(4);
    if (iter == 0) {
      errorCell.innerHTML = "NULL";
    } else errorCell.innerHTML = error.toFixed(3);

    if (error <= eps && iter > 0) {
      break; // Exit the loop
    }

    error = Math.abs((xiPlus1 - xi) / xiPlus1) * 100;
    xi = xiPlus1;
    iter++;
  }

  message.innerHTML = "The root = " + parseFloat(xi).toFixed(3);
}

function SecanttMethod() {
  let expression = document.getElementById("equation").value;
  let xi = document.getElementById("xi").value;
  let xiMinus1 = document.getElementById("XiMinus1").value;
  let eps = document.getElementById("eps").value;

  //Displaying Root Message
  var message = document.getElementById("Display");

  //Creating Table
  var table = SecanttTable();
  var tbody = document.getElementById("tbody");

  var error = 0;
  var xiPlus1 = 0;
  var iter = 0;

  const f = (x) => math.evaluate(expression, { x: x });
  const g = (x) => f(x);

  do {
    xiPlus1 = xi - (g(xi) * (xi - xiMinus1)) / (g(xi) - g(xiMinus1));
    error = Math.abs((xi - xiMinus1) / xi) * 100;

    var row = tbody.insertRow(-1);

    var iterCell = row.insertCell(0);
    iterCell.innerHTML = iter;

    var xiMinus1Cell = row.insertCell(1);
    xiMinus1Cell.innerHTML = parseFloat(xiMinus1).toFixed(3);

    var FxiMinus1Cell = row.insertCell(2);
    FxiMinus1Cell.innerHTML = parseFloat(g(xiMinus1)).toFixed(3);

    var xiCell = row.insertCell(3);
    xiCell.innerHTML = parseFloat(xi).toFixed(3);

    var FxiCell = row.insertCell(4);
    FxiCell.innerHTML = parseFloat(g(xi)).toFixed(3);

    var ErrorCell = row.insertCell(5);
    if (iter == 0) {
      ErrorCell.innerHTML = "NULL";
    } else ErrorCell.innerHTML = error.toFixed(3);

    xiMinus1 = xi;
    xi = xiPlus1;
    iter++;
  } while (error > eps);

  message.innerHTML = "The root = " + parseFloat(xi).toFixed(3);
}
/*------------------------------------FUNCTIONS---------------------------------*/
//Function to solve the equation
function fun(x, equation) {
  equation = equation.replace(/([-+]?[0-9]*\.?[0-9]+)x/g, "$1*(" + x + ")");
  equation = equation.replace(/\^/g, "**");
  equation = equation.replace(/x/g, "(" + x + ")");

  var result = eval(equation);
  return result;
}
//Choosing the Method
function choice() {
  var table = document.getElementById("MyTable");
  if (table) {
    clearTable();
    console.log("Table exists");
  }

  var choice = document.getElementById("options");
  if (choice.value == "BisectionMethod") {
    BisectionMethod();
  } else if (choice.value == "FalsePosition") {
    FalsePosition();
  } else if (choice.value == "FixedPoint") {
    FixedPoint();
  } else if (choice.value == "NewtonMethod") {
    NewtonMethod();
  } else if (choice.value == "SecanttMethod") {
    SecanttMethod();
  }
}

/*----------------------------------TABLES------------------------------------*/

//Clearing the table
function clearTable() {
  var message = document.getElementById("Display");
  var tbl = document.getElementById("MyTable");

  //Deleting the Table
  tbl.parentNode.removeChild(tbl);

  //Deleting the Message
  message.outerHTML = "<p" + " id = 'Display'>";

  //Clearing TextBoxes
  document.getElementById("equation").value = "";
  document.getElementById("xl").value = "";
  document.getElementById("XiMinus1").value = "";
  document.getElementById("xu").value = "";
  document.getElementById("eps").value = "";
  document.getElementById("xi").value = "";
}

//Table Header for False Position And Bisection Method!!
function faketable() {
  let headers = [
    "Iteration",
    "Xl",
    "F(Xl)",
    "Xu",
    "F(Xu)",
    "Xr",
    "F(Xr)",
    "Error%",
  ];

  var div = document.getElementById("Table");

  //Creating table and adding attribute
  const table = document.createElement("table");
  table.setAttribute("border", 1);
  table.setAttribute("id", "MyTable");

  //Creating Header Row and Cell
  var thead = table.createTHead();
  var tbody = table.createTBody();
  tbody.setAttribute("id", "tbody");

  //Adding a Row to the Table
  var row = thead.insertRow(-1);

  for (var i = 0; i < 8; i++) {
    var x = row.insertCell(i);
    let header = headers[i];
    x.outerHTML = "<th>" + header;
  }

  div.appendChild(table);

  return table;
}

//Table for the Fixed Position!!
function FixedTable() {
  let headers = ["Iteration", "Xi", "F(Xi)", "Error%"];

  var div = document.getElementById("Table");

  const table = document.createElement("table");
  table.setAttribute("border", 1);
  table.setAttribute("id", "MyTable");

  var thead = table.createTHead();
  var tbody = table.createTBody();
  tbody.setAttribute("id", "tbody");

  var row = thead.insertRow(-1);

  for (var i = 0; i < 4; i++) {
    var x = row.insertCell(i);
    let header = headers[i];
    x.outerHTML = "<th>" + header;
  }

  //Add the table to the Document
  div.appendChild(table);
  return table;
}

//Table for Newton's Method
function NewtonTable() {
  let headers = ["Iteration", "Xi", "F(Xi)", "F'(Xi)", "Error%"];

  var div = document.getElementById("Table");

  const table = document.createElement("table");
  table.setAttribute("border", 1);
  table.setAttribute("id", "MyTable");

  var thead = table.createTHead();
  var tbody = table.createTBody();
  tbody.setAttribute("id", "tbody");

  var row = thead.insertRow(-1);

  for (var i = 0; i < 5; i++) {
    var x = row.insertCell(i);
    let header = headers[i];
    x.outerHTML = "<th>" + header;
  }

  //Add the table to the Document
  div.appendChild(table);
  return table;
}

//Table for Secantt's Method
function SecanttTable() {
  let headers = ["Iteration", "Xi-1", "F(Xi-1)", "Xi", "F(Xi)", "Error%"];

  var div = document.getElementById("Table");

  const table = document.createElement("table");
  table.setAttribute("border", 1);
  table.setAttribute("id", "MyTable");

  var thead = table.createTHead();
  var tbody = table.createTBody();
  tbody.setAttribute("id", "tbody");

  var row = thead.insertRow(-1);

  for (var i = 0; i < 6; i++) {
    var x = row.insertCell(i);
    let header = headers[i];
    x.outerHTML = "<th>" + header;
  }

  //Add the table to the Document
  div.appendChild(table);
  return table;
}

/*--------------------------------CHOICE FUNCTIONS-----------------------------*/

function ChoiceManager() {
  const select = document.querySelector("select");
  const selectedOption = select.options[select.selectedIndex].value;

  //Getting Texts and Labels
  //Xl
  const XL = document.getElementById("xl");
  const XLText = document.getElementById("XlText");
  //XU
  const XU = document.getElementById("xu");
  const XuText = document.getElementById("XuText");
  //Xi
  const XI = document.getElementById("xi");
  const XiText = document.getElementById("XiText");
  //XiMinus1
  const xiMinus1 = document.getElementById("XiMinus1");
  const xiMinus1text = document.getElementById("xiMinus1Text");

  if (selectedOption === "FixedPoint" || selectedOption == "NewtonMethod") {
    //If Fixed is Chosen
    XL.style.display = "none";
    XLText.style.display = "none";

    XU.style.display = "none";
    XuText.style.display = "none";

    xiMinus1.style.display = "none";
    xiMinus1text.style.display = "none";

    XI.style.display = "inline";
    XiText.style.display = "inline";
  } else if (
    selectedOption == "FalsePosition" ||
    selectedOption == "BisectionMethod"
  ) {
    //If False or Bisection is selected
    XL.style.display = "inline";
    XLText.style.display = "inline";

    XU.style.display = "inline";
    XuText.style.display = "inline";

    xiMinus1.style.display = "none";
    xiMinus1text.style.display = "none";

    XI.style.display = "none";
    XiText.style.display = "none";
  } else if (selectedOption == "SecanttMethod") {
    XL.style.display = "none";
    XLText.style.display = "none";

    XU.style.display = "none";
    XuText.style.display = "none";

    XI.style.display = "inline";
    XiText.style.display = "inline";

    xiMinus1.style.display = "inline";
    xiMinus1text.style.display = "inline";
  }
}
