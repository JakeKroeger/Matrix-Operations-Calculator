/* clear button */
function clearTable() {
  const inputTable = document.getElementById("input-matrix");
  const outputTable = document.getElementById("matrixResult");
  const variableResult = document.getElementById("variableResult");
  const clarificationResult = document.getElementById("clarificationResult");
  const cells = inputTable.getElementsByClassName("input-cell");
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.value = "";
  }
  outputTable.innerHTML = "";

  // Clear variable and clarification results
  variableResult.innerHTML = "";
  clarificationResult.innerHTML = "";
}
/* gauss elimination method*/
function GJE() {
  clearMatrixResult();
  clearVariableResult();
  clearClarificationResult();
  let a00 = parseFloat(document.getElementById("a00").value);
  let a01 = parseFloat(document.getElementById("a01").value);
  let a02 = parseFloat(document.getElementById("a02").value);
  let b03 = parseFloat(document.getElementById("b03").value);

  let a10 = parseFloat(document.getElementById("a10").value);
  let a11 = parseFloat(document.getElementById("a11").value);
  let a12 = parseFloat(document.getElementById("a12").value);
  let b13 = parseFloat(document.getElementById("b13").value);

  let a20 = parseFloat(document.getElementById("a20").value);
  let a21 = parseFloat(document.getElementById("a21").value);
  let a22 = parseFloat(document.getElementById("a22").value);
  let b23 = parseFloat(document.getElementById("b23").value);

  let a = [
    [a00, a01, a02, b03],
    [a10, a11, a12, b13],
    [a20, a21, a22, b23],
  ];

  displayMatrix(a, "Initial Matrix");
  let stepCounter = 1;

  let m21 = a[1][0] / a[0][0];
  displayClarification(stepCounter++, "Subtract m21 * R1 from R2");
  for (let j = 0; j < 4; j++) {
    let e2 = a[1][j];
    let e1 = m21 * a[0][j];
    a[1][j] = e2 - e1;
  }

  displayMatrix(a, "Matrix after Step 1 <br> R2 - " + m21 + "*R1");

  let m31 = a[2][0] / a[0][0];
  displayClarification(stepCounter++, "Subtract m31 * R1 from R3");
  for (let j = 0; j < 4; j++) {
    let e3 = a[2][j];
    let e1 = m31 * a[0][j];
    a[2][j] = e3 - e1;
  }
  displayMatrix(a, "Matrix after Step 2 <br> R3 - " + m31 + "*R1");

  let m32 = a[2][1] / a[1][1];
  displayClarification(stepCounter++, "Subtract m32 * R2 from R3");
  for (let j = 0; j < 4; j++) {
    let e3 = a[2][j];
    let e2 = m32 * a[1][j];
    a[2][j] = e3 - e2;
  }
  displayMatrix(a, "Final Matrix after Step 3 <br> R3 - " + m32 + "*R2");

  let x3 = a[2][3] / a[2][2];
  let x2 = (a[1][3] - a[1][2] * x3) / a[1][1];
  let x1 = (a[0][3] - (a[0][1] * x2 + a[0][2] * x3)) / a[0][0];

  if (isNaN(x1) || isNaN(x2) || isNaN(x3)) {
    alert("No solution found! Please try again.");
    clearTable();
    return;
  }

  let Result = document.getElementById("variableResult");
  Result.innerHTML += "x1 = " + x1;
  Result.innerHTML += "<br>x2 = " + x2;
  Result.innerHTML += "<br>x3 = " + x3;
}

/* LU Decomposition method*/
function LUDecomposition() {
  clearMatrixResult();
  clearVariableResult();
  clearClarificationResult();

  let a00 = parseFloat(document.getElementById("a00").value);
  let a01 = parseFloat(document.getElementById("a01").value);
  let a02 = parseFloat(document.getElementById("a02").value);
  let b03 = parseFloat(document.getElementById("b03").value);

  let a10 = parseFloat(document.getElementById("a10").value);
  let a11 = parseFloat(document.getElementById("a11").value);
  let a12 = parseFloat(document.getElementById("a12").value);
  let b13 = parseFloat(document.getElementById("b13").value);

  let a20 = parseFloat(document.getElementById("a20").value);
  let a21 = parseFloat(document.getElementById("a21").value);
  let a22 = parseFloat(document.getElementById("a22").value);
  let b23 = parseFloat(document.getElementById("b23").value);

  let a = [
    [a00, a01, a02],
    [a10, a11, a12],
    [a20, a21, a22],
  ];
  let b = [b03, b13, b23];

  let L = [];
  let U = [];

  for (let i = 0; i < a.length; i++) {
    L.push(new Array(a.length).fill(0));
    U.push(new Array(a.length).fill(0));
  }

  for (let i = 0; i < a.length; i++) {
    L[i][i] = 1;

    for (let j = 0; j < a.length; j++) {
      if (j >= i) {
        let sum = 0;
        for (let k = 0; k < i; k++) {
          sum += L[i][k] * U[k][j];
        }
        U[i][j] = a[i][j] - sum;
      } else {
        let sum = 0;
        for (let k = 0; k < j; k++) {
          sum += L[i][k] * U[k][j];
        }
        L[i][j] = (a[i][j] - sum) / U[j][j];
      }
    }
  }

  displayMatrix(L, "L Matrix");
  displayMatrix(U, "U Matrix");

  let y = [];
  y[0] = b[0] / L[0][0];
  y[1] = (b[1] - L[1][0] * y[0]) / L[1][1];
  y[2] = (b[2] - L[2][0] * y[0] - L[2][1] * y[1]) / L[2][2];

  let x = [];
  x[2] = y[2] / U[2][2];
  x[1] = (y[1] - U[1][2] * x[2]) / U[1][1];
  x[0] = (y[0] - U[0][1] * x[1] - U[0][2] * x[2]) / U[0][0];

  if (isNaN(x[0]) || isNaN(x[1]) || isNaN(x[2])) {
    alert("No solution found! Please try again.");
    clearTable();
    return;
  }

  let variableResult = document.getElementById("variableResult");
  let resultHTML = "<h2>Result:</h2>";
  resultHTML += "<p>x1 = " + x[0] + "</p>";
  resultHTML += "<p>x2 = " + x[1] + "</p>";
  resultHTML += "<p>x3 = " + x[2] + "</p>";
  variableResult.innerHTML = resultHTML;
}

/* Cramer's Rule method */
function CramersRule() {
  clearMatrixResult();
  clearVariableResult();
  clearClarificationResult();

  let a00 = parseFloat(document.getElementById("a00").value);
  let a01 = parseFloat(document.getElementById("a01").value);
  let a02 = parseFloat(document.getElementById("a02").value);
  let b03 = parseFloat(document.getElementById("b03").value);

  let a10 = parseFloat(document.getElementById("a10").value);
  let a11 = parseFloat(document.getElementById("a11").value);
  let a12 = parseFloat(document.getElementById("a12").value);
  let b13 = parseFloat(document.getElementById("b13").value);

  let a20 = parseFloat(document.getElementById("a20").value);
  let a21 = parseFloat(document.getElementById("a21").value);
  let a22 = parseFloat(document.getElementById("a22").value);
  let b23 = parseFloat(document.getElementById("b23").value);

  let determinantA =
    a00 * (a11 * a22 - a12 * a21) -
    a01 * (a10 * a22 - a12 * a20) +
    a02 * (a10 * a21 - a11 * a20);

  if (determinantA === 0) {
    displayErrorMessage(
      "The system of equations is either inconsistent or has infinitely many solutions."
    );
    return;
  }

  let determinantX1 =
    b03 * (a11 * a22 - a12 * a21) -
    a01 * (b13 * a22 - a12 * b23) +
    a02 * (b13 * a21 - a11 * b23);
  let determinantX2 =
    a00 * (b13 * a22 - a12 * b23) -
    b03 * (a10 * a22 - a12 * a20) +
    a02 * (a10 * b23 - b13 * a20);
  let determinantX3 =
    a00 * (a11 * b23 - b13 * a21) -
    a01 * (a10 * b23 - b13 * a20) +
    b03 * (a10 * a21 - a11 * a20);

  let x1 = determinantX1 / determinantA;
  let x2 = determinantX2 / determinantA;
  let x3 = determinantX3 / determinantA;

  if (isNaN(x1) || isNaN(x2) || isNaN(x3)) {
    alert("No solution found! Please try again.");
    clearTable();
    return;
  }
  let Result = document.getElementById("variableResult");
  Result.innerHTML +=
    "x1 = " + determinantX1 + "/" + determinantA + " =  " + x1;
  Result.innerHTML +=
    "<br>x2 = " + determinantX2 + "/" + determinantA + " = " + x2;
  Result.innerHTML +=
    "<br>x3 = " + determinantX3 + "/" + determinantA + " = " + x3;

  displayClarification(1, "Calculate the determinant of matrix A");
  displayClarification(2, "Calculate the determinant of matrix A1");
  displayClarification(3, "Calculate the determinant of matrix A2");
  displayClarification(4, "Calculate the determinant of matrix A3");
  displayClarification(5, "Calculate the value of x1");
  displayClarification(6, "Calculate the value of x2");
  displayClarification(7, "Calculate the value of x3");

  displayResultMatrix(
    [
      [a00, a01, a02],
      [a10, a11, a12],
      [a20, a21, a22],
    ],
    "Matrix A <br> DetA = " + determinantA
  );
  displayResultMatrix(
    [
      [b03, a01, a02],
      [b13, a11, a12],
      [b23, a21, a22],
    ],
    "Matrix A1 <br> DetA1 = " + determinantX1
  );
  displayResultMatrix(
    [
      [a00, b03, a02],
      [a10, b13, a12],
      [a20, b23, a22],
    ],
    "Matrix A2 <br> DetA2 = " + determinantX2
  );
  displayResultMatrix(
    [
      [a00, a01, b03],
      [a10, a11, b13],
      [a20, a21, b23],
    ],
    "Matrix A3 <br> DetA3 = " + determinantX3
  );

  displayResultMatrix([[x1], [x2], [x3]], "Variable Matrix");

  displayResultMatrix(
    [
      [a00, a01, a02, b03],
      [a10, a11, a12, b13],
      [a20, a21, a22, b23],
    ],
    "Augmented Matrix"
  );
}

// DISPLAY RESULT MATRIX
function displayResultMatrix(matrix, title) {
  let matrixResult = document.getElementById("matrixResult");

  // Create a title element
  let titleElement = document.createElement("h3");
  titleElement.innerHTML = title;
  matrixResult.appendChild(titleElement);

  // Create the table for the matrix
  let table = document.createElement("table");
  for (let row of matrix) {
    let tableRow = document.createElement("tr");
    for (let element of row) {
      let tableData = document.createElement("td");
      tableData.textContent = element;
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }

  matrixResult.appendChild(table);
}

// DISPLAY CLARIFICATION
function displayClarification(step, clarification = "") {
  let clarificationResult = document.getElementById("clarificationResult");
  clarificationResult.innerHTML +=
    "Step " + step + ": " + clarification + "<br>";
}

// DISPLAY MATRIX
function displayMatrix(matrix, title) {
  let matrixResult = document.getElementById("matrixResult");

  // Create a title element
  let titleElement = document.createElement("h3");
  titleElement.innerHTML = title;
  matrixResult.appendChild(titleElement);

  // Create the table for the matrix
  let table = document.createElement("table");
  for (let row of matrix) {
    let tableRow = document.createElement("tr");
    for (let element of row) {
      let tableData = document.createElement("td");
      tableData.textContent = element;
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }

  matrixResult.appendChild(table);
}

// CLEAR Matrix RESULTS
function clearMatrixResult() {
  let matrixResult = document.getElementById("matrixResult");
  matrixResult.innerHTML = "";
}

// CLEAR VARIABLE RESULTS
function clearVariableResult() {
  let variableResult = document.getElementById("variableResult");
  variableResult.innerHTML = "";
}

// CLEAR CLARIFICATION RESULTS
function clearClarificationResult() {
  let clarificationResult = document.getElementById("clarificationResult");
  clarificationResult.innerHTML = "";
}

function GJEwithPivot() {
  clearMatrixResult();
  clearVariableResult();
  clearClarificationResult();
  let a00 = parseFloat(document.getElementById("a00").value);
  let a01 = parseFloat(document.getElementById("a01").value);
  let a02 = parseFloat(document.getElementById("a02").value);
  let b03 = parseFloat(document.getElementById("b03").value);

  let a10 = parseFloat(document.getElementById("a10").value);
  let a11 = parseFloat(document.getElementById("a11").value);
  let a12 = parseFloat(document.getElementById("a12").value);
  let b13 = parseFloat(document.getElementById("b13").value);

  let a20 = parseFloat(document.getElementById("a20").value);
  let a21 = parseFloat(document.getElementById("a21").value);
  let a22 = parseFloat(document.getElementById("a22").value);
  let b23 = parseFloat(document.getElementById("b23").value);

  let a = [
    [a00, a01, a02, b03],
    [a10, a11, a12, b13],
    [a20, a21, a22, b23],
  ];

  if (a10 > a00 && a10 > a20) {
    swapRows(a, 1, 0);
  } else if (a20 > a00 && a20 > a10) {
    swapRows(a, 2, 0);
  }

  displayMatrix(a, "Initial Matrix");
  let stepCounter = 1;

  let m21 = a[1][0] / a[0][0];
  displayClarification(stepCounter++, "Subtract m21 * R1 from R2");
  for (let j = 0; j < 4; j++) {
    let e2 = a[1][j];
    let e1 = m21 * a[0][j];
    a[1][j] = e2 - e1;
  }

  displayMatrix(a, "Matrix after Step 1 <br> R2 - " + m21 + "*R1");

  let m31 = a[2][0] / a[0][0];
  displayClarification(stepCounter++, "Subtract m31 * R1 from R3");
  for (let j = 0; j < 4; j++) {
    let e3 = a[2][j];
    let e1 = m31 * a[0][j];
    a[2][j] = e3 - e1;
  }
  displayMatrix(a, "Matrix after Step 2 <br> R3 - " + m31 + "*R1");

  if (a[2][1] > a[1][1]) {
    swapRows(a, 2, 1);
  }
  let m32 = a[2][1] / a[1][1];
  displayClarification(stepCounter++, "Subtract m32 * R2 from R3");
  for (let j = 0; j < 4; j++) {
    let e3 = a[2][j];
    let e2 = m32 * a[1][j];
    a[2][j] = e3 - e2;
  }
  displayMatrix(a, "Final Matrix after Step 3 <br> R3 - " + m32 + "*R2");

  let x3 = a[2][3] / a[2][2];
  let x2 = (a[1][3] - a[1][2] * x3) / a[1][1];
  let x1 = (a[0][3] - (a[0][1] * x2 + a[0][2] * x3)) / a[0][0];

  if (isNaN(x1) || isNaN(x2) || isNaN(x3)) {
    alert("No solution found! Please try again.");
    clearTable();
    return;
  }

  let Result = document.getElementById("variableResult");
  Result.innerHTML += "x1 = " + parseInt(x1);
  Result.innerHTML += "<br>x2 = " + parseInt(x2);
  Result.innerHTML += "<br>x3 = " + parseInt(x3);
}

function LUDecompositionWithPivot() {
  clearMatrixResult();
  clearVariableResult();
  clearClarificationResult();
  let a00 = parseFloat(document.getElementById("a00").value);
  let a01 = parseFloat(document.getElementById("a01").value);
  let a02 = parseFloat(document.getElementById("a02").value);
  let b03 = parseFloat(document.getElementById("b03").value);

  let a10 = parseFloat(document.getElementById("a10").value);
  let a11 = parseFloat(document.getElementById("a11").value);
  let a12 = parseFloat(document.getElementById("a12").value);
  let b13 = parseFloat(document.getElementById("b13").value);

  let a20 = parseFloat(document.getElementById("a20").value);
  let a21 = parseFloat(document.getElementById("a21").value);
  let a22 = parseFloat(document.getElementById("a22").value);
  let b23 = parseFloat(document.getElementById("b23").value);

  let a = [
    [a00, a01, a02, b03],
    [a10, a11, a12, b13],
    [a20, a21, a22, b23],
  ];

  displayMatrix(a, "Initial Matrix");
  let stepCounter = 1;

  for (let k = 0; k < 3; k++) {
    roundMatrixByReference(a, 2);
    let pivotIndex = k;
    let pivot = Math.abs(a[k][k]);

    for (let i = k + 1; i < 3; i++) {
      if (Math.abs(a[i][k]) > pivot) {
        pivot = Math.abs(a[i][k]);
        pivotIndex = i;
      }
    }

    if (pivotIndex !== k) {
      swapRows(a, pivotIndex, k);
      displayClarification(
        stepCounter++,
        "Swap R" + (pivotIndex + 1) + " with R" + (k + 1)
      );
      displayMatrix(
        a,
        "Matrix after Step " + (stepCounter - 1) + " (Partial Pivot)"
      );
    }

    roundMatrixByReference(a, 2);
    for (let i = k + 1; i < 3; i++) {
      let factor = a[i][k] / a[k][k];
      displayClarification(
        stepCounter++,
        "Subtract " + factor + " * R" + (k + 1) + " from R" + (i + 1)
      );
      for (let j = k; j < 4; j++) {
        a[i][j] -= factor * a[k][j];
      }
    }

    displayMatrix(a, "Matrix after Step " + (stepCounter - 1));
  }

  let L = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  let U = [
    [a[0][0], a[0][1], a[0][2]],
    [0, a[1][1], a[1][2]],
    [0, 0, a[2][2]],
  ];

  displayMatrix(L, "Lower Triangular Matrix (L)");
  displayMatrix(U, "Upper Triangular Matrix (U)");

  // Solving for x using back substitution
  let x3 = a[2][3] / U[2][2];
  let x2 = (a[1][3] - U[1][2] * x3) / U[1][1];
  let x1 = (a[0][3] - (U[0][1] * x2 + U[0][2] * x3)) / U[0][0];

  if (isNaN(x1) || isNaN(x2) || isNaN(x3)) {
    alert("No solution found! Please try again.");
    clearTable();
    return;
  }

  let Result = document.getElementById("variableResult");
  Result.innerHTML += "x1 = " + parseInt(x1);
  Result.innerHTML += "<br>x2 = " + parseInt(x2);
  Result.innerHTML += "<br>x3 = " + parseInt(x3);
}

function swapRows(matrix, row1, row2) {
  [matrix[row1], matrix[row2]] = [matrix[row2], matrix[row1]];
}

function roundMatrixByReference(matrix, decimalPlaces) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = Number(matrix[i][j].toFixed(decimalPlaces));
    }
  }
}
