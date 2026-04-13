# Avery L6009 Label Editor

https://darvincode.github.io/IpsenLabell6009Generator/

A browser-based label editor for Avery L6009 sheets made for Ipsen - Wrexham, UK (4 columns × 12 rows, A4). Fill, preview, and export labels as a print-ready PDF or a Word document matched to the original template — no installation required.


---

## Features

- **Templates** — pre-built layouts for WFI Tubing, MAS Heads, EM Turntable, and Tray End Load
- **Content layers** — apply text to all labels, a column, a row, or individual labels
- **Selection tools** — click labels to override them individually; quick-select by column or row pattern
- **Text formatting** — font size, left/centre/right alignment, find & replace across all layers
- **Multi-page support** — add as many A4 sheets as needed; all export together
- **Export to PDF** — high-resolution print-ready output
- **Export to Word (.docx)** — preserves table structure, margins, spacing, and alignment from the original template
- **Save/load project** — JSON save files let you pick up exactly where you left off
- **Grid calibration** — fine-tune margins and label dimensions if your printer output doesn't align

---

## How to Use

### 1. Load a template or start from scratch

Click **Templates** in the sidebar to expand the list. Selecting a template fills every label with preset text, alignment, and font size. To start blank, leave the content layers empty.

### 2. Enter content using layers

The **Content Layers** card has four tabs:

| Tab | What it does |
|-----|-------------|
| **Cols** | Text applied to every label in a given column |
| **Rows** | Text applied to every label in a given row |
| **All** | Text that appears on every label (e.g. `DATE:` / `EXPIRY:`) |
| **Sel** | Custom override for individually selected labels |

Layers stack — All + Col + Row text are combined per label. Each line break becomes a new line on the label.

### 3. Select and override individual labels

Click any label on the sheet to select it (highlighted in blue). Hold **Ctrl / Cmd** or **Shift** to select multiple. The sidebar switches to the **Sel** tab where you can type a custom override. Use **↺ Reset to Base** to remove the override and restore the computed text.

The **Selection** dropdown (top-right of the preview) has quick patterns: all labels, individual columns, and odd/even rows.

### 4. Adjust font size and alignment

Open **Text Format** in the sidebar. The size input changes the font size across all labels. The alignment buttons — Left, Centre, Right — reposition label text and carry through to the exported Word document.

### 5. Find and replace text

Inside **Text Format**, use the Find / Replace fields to swap a word across every label, layer, and page in one step. Useful for updating a batch number or date.

### 6. Add multiple pages

Use the **+** and **−** buttons in the Content Layers card to add or remove pages. Each page has its own independent layer data. All pages export together into a single file.

### 7. Save and reload your project

Under **Project**, click **Save JSON** to download your current content, alignment, and font settings. Click **Load JSON** to restore a saved session. The filename field sets the name used for all exports.

### 8. Export

| Export | How |
|--------|-----|
| **PDF** | Blue **↓ Export PDF** button in the footer — image-based, ideal for printing directly |
| **Word (.docx)** | Navy **⬇ Export Word Doc** button in the Project card — preserves the original Avery L6009 table structure, cell spacing, and text alignment |

---

## Tips

- **Grid & Cut Lines** — toggle these in the footer to show or hide label boundaries in the preview. They do not appear in exports.
- **Zoom** — use the **−** / **+** controls in the preview header to zoom in and out. **↺** resets to 100%.
- **Grid Calibration** — PIN-protected panel to fine-tune top/left margins, label width/height, and column/row gaps if labels print slightly off-position.

---

## Template Reference

| Template | Content | Alignment |
|----------|---------|-----------|
| WFI Tubing | `WFI / CYCLE #: / DATE: / EXPIRY:` | Left |
| MAS Heads | `MAS HEADS / ITEM: / DATE: / EXPIRY:` | Left |
| EM Turntable | `EM Turntable / Batch No. / Cycle No. / Date:` | Left |
| Tray End Load | `Tray End / Batch No. / Cycle No. / Date:` | Left |

---

*Built by Darvin Magundayao · Avery L6009 · A4 · 4 × 12 · 48 labels per sheet*
