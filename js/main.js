// Ensure code runs after DOM loads
document.addEventListener('DOMContentLoaded', () => {

const ROWS = 12;
const COLS = 4;
const TOTAL_LABELS = ROWS * COLS;

let baseMode = 'column';
let alignment = 'center';
let selectedIndices = new Set();
let lastFocusedInput = null;

let colData = new Array(COLS).fill('');
let rowData = new Array(ROWS).fill('');
let allData = '';
let overrides = new Array(TOTAL_LABELS).fill(null);

const PREMADE_TEMPLATES = {
  'WFI_LABELS': {
    docName: "Avery_L6009_Labels",
    baseMode: "column",
    alignment: "left",
    colData: ["WFI, CYCLE #:, DATE:, EXPIRY:", "WFI, CYCLE #:, DATE:, EXPIRY:", "WFI, CYCLE #:, DATE:, EXPIRY:", "WFI, CYCLE #:, DATE:, EXPIRY:"],
    rowData: new Array(12).fill("WFI, CYCLE #:, DATE:, EXPIRY:"),
    allData: "WFI, CYCLE #:, DATE:, EXPIRY:",
    overrides: new Array(TOTAL_LABELS).fill(null),
    textFormat: { size: 12 },
    labelLines: true,
    cutLines: false,
    calibration: { tMargin: 16.8, lMargin: 4.8, lWidth: 47, lHeight: 22.4, cGap: 4.4, rGap: 0.0 }
  }
};

// ----------------------
// DOM Elements
// ----------------------
const grid = document.getElementById('grid');
const dynamicInputs = document.getElementById('dynamic-inputs');
const btnPDF = document.getElementById('btn-pdf');
const resetBtn = document.getElementById('reset-btn');

// ----------------------
// Functions
// ----------------------

function renderInputs() {
  dynamicInputs.innerHTML = '';
  if (selectedIndices.size > 0) {
    const div = document.createElement('div');
    div.style = "background: #e3f2fd; padding: 10px; border-radius: 6px;";
    let arr = Array.from(selectedIndices);
    let firstVal = overrides[arr[0]];
    let allMatch = arr.every(idx => overrides[idx] === firstVal);

    div.innerHTML = `
      <textarea id="ind_input" class="data-input" rows="4" placeholder="${!allMatch ? '(Multiple values)' : ''}"></textarea>
    `;
    dynamicInputs.appendChild(div);

    const indInput = document.getElementById('ind_input');
    if (allMatch && firstVal !== null) indInput.value = firstVal;
    indInput.oninput = (e) => {
      selectedIndices.forEach(idx => overrides[idx] = e.target.value);
      generate();
    };
    if (selectedIndices.size === 1) { lastFocusedInput = indInput; indInput.focus(); }
  } else {
    // Render base inputs for column/row/all
    let inputCount = baseMode === 'column' ? COLS : baseMode === 'row' ? ROWS : 1;
    let dataArray = baseMode === 'column' ? colData : baseMode === 'row' ? rowData : [allData];
    for (let i = 0; i < inputCount; i++) {
      const input = document.createElement('input');
      input.className = 'data-input';
      input.value = dataArray[i];
      input.oninput = (e) => {
        if (baseMode === 'all') allData = e.target.value;
        else dataArray[i] = e.target.value;
        generate();
      };
      dynamicInputs.appendChild(input);
    }
  }
}

function generate() {
  grid.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const index = r * COLS + c;
      const div = document.createElement('div');
      div.className = 'label';
      if (selectedIndices.has(index)) div.classList.add('selected');
      if (overrides[index] !== null) div.classList.add('overridden');
      div.onclick = (e) => selectLabel(e, index);

      let baseVal = baseMode === 'column' ? colData[c] : baseMode === 'row' ? rowData[r] : allData;
      let val = overrides[index] !== null ? overrides[index] : baseVal;
      div.innerHTML = val.split(',').map(s => s.trim()).join('<br>');
      grid.appendChild(div);
    }
  }
}

function selectLabel(e, index) {
  if (e.shiftKey || e.ctrlKey || e.metaKey) {
    selectedIndices.has(index) ? selectedIndices.delete(index) : selectedIndices.add(index);
  } else {
    if (selectedIndices.size === 1 && selectedIndices.has(index)) selectedIndices.clear();
    else { selectedIndices.clear(); selectedIndices.add(index); }
  }
  renderInputs();
  generate();
}

function downloadPDF() {
  html2canvas(document.querySelector(".sheet"), { scale: 4 }).then(canvas => {
    const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
    pdf.save('Avery_L6009_Labels.pdf');
  });
}

function resetApp() {
  colData.fill(''); rowData.fill(''); allData=''; overrides.fill(null);
  selectedIndices.clear(); renderInputs(); generate();
}

// ----------------------
// Attach events
// ----------------------
btnPDF.addEventListener('click', downloadPDF);
resetBtn.addEventListener('click', resetApp);

// ----------------------
// Initialize
// ----------------------
renderInputs();
generate();

}); // DOMContentLoaded
