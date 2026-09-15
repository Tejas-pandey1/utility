const tools = [
  {id:"currency", name:"Currency Converter", category:"Converters", icon:"$", desc:"Convert common currencies with built-in reference rates."},
  {id:"length", name:"Length Converter", category:"Converters", icon:"↔", desc:"Convert metres, kilometres, miles, feet, inches and more."},
  {id:"weight", name:"Weight Converter", category:"Converters", icon:"◈", desc:"Convert kilograms, grams, pounds, ounces and tonnes."},
  {id:"temperature", name:"Temperature Converter", category:"Converters", icon:"°", desc:"Convert Celsius, Fahrenheit and Kelvin instantly."},
  {id:"area", name:"Area Converter", category:"Converters", icon:"▧", desc:"Convert square metres, kilometres, feet, acres and more."},
  {id:"volume", name:"Volume Converter", category:"Converters", icon:"◇", desc:"Convert litres, millilitres, gallons, cups and cubic units."},
  {id:"speed", name:"Speed Converter", category:"Converters", icon:"➜", desc:"Convert km/h, mph, m/s and knots."},
  {id:"data", name:"Data Size Converter", category:"Converters", icon:"▤", desc:"Convert bytes, KB, MB, GB and TB."},
  {id:"timeconvert", name:"Time Converter", category:"Converters", icon:"◷", desc:"Convert seconds, minutes, hours and days."},

  {id:"percentage", name:"Percentage Calculator", category:"Calculators", icon:"%", desc:"Find percentages, increases, decreases and differences."},
  {id:"calculator", name:"Calculator", category:"Calculators", icon:"＋", desc:"A clean everyday calculator for quick calculations."},
  {id:"age", name:"Age Calculator", category:"Calculators", icon:"♙", desc:"Calculate an exact age from a date of birth."},

  {id:"datediff", name:"Date Difference", category:"Date & Time", icon:"▣", desc:"Find the exact number of days between two dates."},
  {id:"timezone", name:"Time Zone Converter", category:"Date & Time", icon:"◉", desc:"Compare common world time zones using UTC offsets."},

  {id:"text", name:"Text Counter", category:"Text", icon:"T", desc:"Count words, characters, lines and reading time."},
  {id:"case", name:"Case Converter", category:"Text", icon:"Aa", desc:"Convert text to upper, lower, title or sentence case."},

  {id:"json", name:"JSON Formatter", category:"Developer", icon:"{}", desc:"Format, validate and minify JSON in your browser."},
  {id:"color", name:"Color Converter", category:"Developer", icon:"●", desc:"Convert HEX, RGB and HSL color values."},
  {id:"numberbase", name:"Number Base Converter", category:"Developer", icon:"01", desc:"Convert decimal, binary, hexadecimal and octal values."},

  {id:"password", name:"Password Generator", category:"Generators", icon:"✦", desc:"Generate strong random passwords locally."}
];

const rates = {
  USD: 1,
  EUR: 0.854,
  GBP: 0.738,
  INR: 88.2,
  JPY: 157.2,
  CAD: 1.38,
  AUD: 1.50,
  CNY: 7.12,
  SGD: 1.28,
  AED: 3.6725
};

const unitSets = {

  length: {
    units: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.344,
      yd: 0.9144,
      ft: 0.3048,
      in: 0.0254
    },

    labels: {
      m: "Metres",
      km: "Kilometres",
      cm: "Centimetres",
      mm: "Millimetres",
      mi: "Miles",
      yd: "Yards",
      ft: "Feet",
      in: "Inches"
    }
  },

  weight: {
    units: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      t: 1000,
      lb: 0.45359237,
      oz: 0.0283495231
    },

    labels: {
      kg: "Kilograms",
      g: "Grams",
      mg: "Milligrams",
      t: "Tonnes",
      lb: "Pounds",
      oz: "Ounces"
    }
  },

  area: {
    units: {
      sqm: 1,
      sqkm: 1000000,
      sqcm: 0.0001,
      sqft: 0.09290304,
      sqyd: 0.83612736,
      acre: 4046.8564224,
      hectare: 10000
    },

    labels: {
      sqm: "Square metres",
      sqkm: "Square kilometres",
      sqcm: "Square centimetres",
      sqft: "Square feet",
      sqyd: "Square yards",
      acre: "Acres",
      hectare: "Hectares"
    }
  },

  volume: {
    units: {
      l: 1,
      ml: 0.001,
      m3: 1000,
      cm3: 0.001,
      gal: 3.785411784,
      cup: 0.2365882365,
      pt: 0.473176473
    },

    labels: {
      l: "Litres",
      ml: "Millilitres",
      m3: "Cubic metres",
      cm3: "Cubic centimetres",
      gal: "US gallons",
      cup: "US cups",
      pt: "US pints"
    }
  },

  speed: {
    units: {
      kmh: 1,
      mph: 1.609344,
      ms: 3.6,
      knot: 1.852
    },

    labels: {
      kmh: "Kilometres/hour",
      mph: "Miles/hour",
      ms: "Metres/second",
      knot: "Knots"
    }
  },

  data: {
    units: {
      B: 1,
      KB: 1024,
      MB: 1024 ** 2,
      GB: 1024 ** 3,
      TB: 1024 ** 4
    },

    labels: {
      B: "Bytes",
      KB: "Kilobytes",
      MB: "Megabytes",
      GB: "Gigabytes",
      TB: "Terabytes"
    }
  },

  timeconvert: {
    units: {
      s: 1,
      min: 60,
      h: 3600,
      d: 86400,
      w: 604800
    },

    labels: {
      s: "Seconds",
      min: "Minutes",
      h: "Hours",
      d: "Days",
      w: "Weeks"
    }
  }
};

let favorites = JSON.parse(
  localStorage.getItem("utilityFavorites") || "[]"
);

let recent = JSON.parse(
  localStorage.getItem("utilityRecent") || "[]"
);

let currentTool = null;
let currentCategory = "all";
let currentView = "all";

const $ = selector => document.querySelector(selector);

const $$ = selector => [
  ...document.querySelectorAll(selector)
];

function saveState() {

  localStorage.setItem(
    "utilityFavorites",
    JSON.stringify(favorites)
  );

  localStorage.setItem(
    "utilityRecent",
    JSON.stringify(recent)
  );

  updateCounts();
}

function updateCounts() {

  $("#favoriteCount").textContent =
    favorites.length;

  $("#recentCount").textContent =
    recent.length;

  $("#allCount").textContent =
    tools.length;

  $("#toolCount").textContent =
    tools.length + "+";
}

function escapeHTML(value) {

  return String(value).replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[character])
  );
}

function showToast(message) {

  const toast = $("#toast");

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {

    toast.classList.remove("show");

  }, 1800);
}

async function copyText(text) {

  try {

    await navigator.clipboard.writeText(text);

    showToast("Copied to clipboard");

  } catch {

    showToast(
      "Copy is unavailable in this browser"
    );
  }
}

function toggleFavorite(id) {

  if (favorites.includes(id)) {

    favorites =
      favorites.filter(item => item !== id);

  } else {

    favorites.push(id);
  }

  saveState();

  renderTools();

  if (currentTool?.id === id) {

    $("#modalFavorite").textContent =
      favorites.includes(id) ? "★" : "☆";
  }
}

function openTool(id) {

  const tool = tools.find(
    item => item.id === id
  );

  if (!tool) return;

  currentTool = tool;

  recent = [
    id,
    ...recent.filter(item => item !== id)
  ].slice(0, 8);

  saveState();

  $("#modalCategory").textContent =
    tool.category.toUpperCase();

  $("#modalTitle").textContent =
    tool.name;

  $("#modalDescription").textContent =
    tool.desc;

  $("#modalFavorite").textContent =
    favorites.includes(id) ? "★" : "☆";

  $("#toolWorkspace").innerHTML =
    getToolHTML(id);

  bindTool(id);

  $("#toolModal").classList.remove("hidden");

  $("#toolModal").setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";
}

function closeModal() {

  $("#toolModal").classList.add("hidden");

  $("#toolModal").setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

  currentTool = null;
}

function renderTools() {

  const query =
    $("#searchInput").value
      .trim()
      .toLowerCase();

  const visible = tools.filter(tool => {

    const matchesQuery =
      !query ||
      `${tool.name} ${tool.desc} ${tool.category}`
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      currentCategory === "all" ||
      tool.category === currentCategory;

    const matchesView =
      currentView === "all" ||
      (
        currentView === "favorites" &&
        favorites.includes(tool.id)
      ) ||
      (
        currentView === "recent" &&
        recent.includes(tool.id)
      );

    return (
      matchesQuery &&
      matchesCategory &&
      matchesView
    );
  });

  const grid = $("#toolGrid");

  grid.innerHTML = visible.map(tool => `

    <article
      class="tool-card"
      data-id="${tool.id}"
    >

      <button
        class="favorite ${
          favorites.includes(tool.id)
            ? "active"
            : ""
        }"
        data-favorite="${tool.id}"
        aria-label="Favorite ${escapeHTML(tool.name)}"
      >
        ${
          favorites.includes(tool.id)
            ? "★"
            : "☆"
        }
      </button>

      <div class="tool-icon">
        ${tool.icon}
      </div>

      <h3>
        ${escapeHTML(tool.name)}
      </h3>

      <p>
        ${escapeHTML(tool.desc)}
      </p>

      <div class="open-arrow">
        Open utility →
      </div>

    </article>

  `).join("");

  $$(".tool-card").forEach(card => {

    card.addEventListener(
      "click",
      event => {

        if (
          event.target.closest(
            "[data-favorite]"
          )
        ) {
          return;
        }

        openTool(card.dataset.id);
      }
    );
  });

  $$("[data-favorite]").forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        toggleFavorite(
          button.dataset.favorite
        );
      }
    );
  });

  $("#resultCount").textContent =
    `${visible.length} ${
      visible.length === 1
        ? "tool"
        : "tools"
    }`;

  $("#emptyState").classList.toggle(
    "hidden",
    visible.length !== 0
  );

  grid.classList.toggle(
    "hidden",
    visible.length === 0
  );
}

function setCategory(category) {

  currentCategory = category;

  currentView = "all";

  $$(".category").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.category === category
    );
  });

  $$(".side-link[data-view]").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.view === "all"
    );
  });

  $("#sectionKicker").textContent =
    category === "all"
      ? "ALL UTILITIES"
      : category.toUpperCase();

  $("#sectionTitle").textContent =
    category === "all"
      ? "Choose a tool"
      : category;

  renderTools();
}

function setView(view) {

  currentView = view;

  currentCategory = "all";

  $$(".category").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.category === "all"
    );
  });

  $$(".side-link[data-view]").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.view === view
    );
  });

  $("#sectionKicker").textContent =
    view === "favorites"
      ? "YOUR FAVORITES"
      : view === "recent"
        ? "RECENTLY USED"
        : "ALL UTILITIES";

  $("#sectionTitle").textContent =
    view === "favorites"
      ? "Saved tools"
      : view === "recent"
        ? "Pick up where you left off"
        : "Choose a tool";

  renderTools();
}

function selectOptions(options) {

  return Object.entries(options)
    .map(
      ([value, label]) =>
        `<option value="${value}">
          ${label}
        </option>`
    )
    .join("");
}

function offsetOptions() {

  const options = [];

  for (let i = -12; i <= 14; i++) {

    const sign =
      i >= 0 ? "+" : "";

    options.push(`
      <option value="${i}">
        UTC${sign}${i}:00
      </option>
    `);
  }

  return options.join("");
}

function baseOptions() {

  return `
    <option value="10">
      Decimal (10)
    </option>

    <option value="2">
      Binary (2)
    </option>

    <option value="8">
      Octal (8)
    </option>

    <option value="16">
      Hexadecimal (16)
    </option>
  `;
}

function fmt(number) {

  if (!Number.isFinite(number)) {
    return "Invalid";
  }

  return Number(
    number.toFixed(10)
  ).toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 10
    }
  );
}

function getToolHTML(id) {

  if (unitSets[id]) {

    const set = unitSets[id];

    return `

      <div class="swap-row">

        <div class="form-group">

          <label>
            From
          </label>

          <select id="fromUnit">
            ${selectOptions(set.labels)}
          </select>

        </div>

        <button
          class="swap-btn"
          id="swapUnits"
          type="button"
          title="Swap units"
        >
          ⇄
        </button>

        <div class="form-group">

          <label>
            To
          </label>

          <select id="toUnit">
            ${selectOptions(set.labels)}
          </select>

        </div>

      </div>

      <div
        class="form-group"
        style="margin-top:14px"
      >

        <label>
          Value
        </label>

        <input
          id="unitValue"
          type="number"
          value="1"
          step="any"
        >

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="unitResult"
          >
            —
          </div>

          <div
            class="result-sub"
            id="unitSub"
          >
            Enter a value to convert.
          </div>

        </div>

        <button
          class="secondary-btn"
          id="copyResult"
          type="button"
        >
          Copy
        </button>

      </div>

      ${
        id === "data"
          ? `
            <div class="note">
              Data conversion uses binary units:
              1 KB = 1024 bytes.
            </div>
          `
          : ""
      }
    `;
  }

  const common = {

    currency: `

      <div class="form-grid">

        <div class="form-group">

          <label>
            From
          </label>

          <select id="fromCurrency">

            ${selectOptions(
              Object.fromEntries(
                Object.keys(rates)
                  .map(key => [key, key])
              )
            )}

          </select>

        </div>

        <div class="form-group">

          <label>
            To
          </label>

          <select id="toCurrency">

            ${selectOptions(
              Object.fromEntries(
                Object.keys(rates)
                  .map(key => [key, key])
              )
            )}

          </select>

        </div>

        <div class="form-group full">

          <label>
            Amount
          </label>

          <input
            id="currencyAmount"
            type="number"
            value="1"
            step="any"
          >

        </div>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="currencyResult"
          >
            —
          </div>

          <div
            class="result-sub"
            id="currencySub"
          >
            Reference rates, not live market rates.
          </div>

        </div>

        <button
          class="secondary-btn"
          id="copyCurrency"
          type="button"
        >
          Copy
        </button>

      </div>

      <div class="note">
        Rates are sample reference values stored locally
        in this demo. Connect an exchange-rate API if you
        want live rates in production.
      </div>
    `,

    temperature: `

      <div class="form-grid">

        <div class="form-group">

          <label>
            From
          </label>

          <select id="tempFrom">

            <option value="C">
              Celsius
            </option>

            <option value="F">
              Fahrenheit
            </option>

            <option value="K">
              Kelvin
            </option>

          </select>

        </div>

        <div class="form-group">

          <label>
            To
          </label>

          <select id="tempTo">

            <option value="F">
              Fahrenheit
            </option>

            <option value="C">
              Celsius
            </option>

            <option value="K">
              Kelvin
            </option>

          </select>

        </div>

        <div class="form-group full">

          <label>
            Temperature
          </label>

          <input
            id="tempValue"
            type="number"
            value="20"
            step="any"
          >

        </div>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="tempResult"
          >
            —
          </div>

          <div
            class="result-sub"
            id="tempSub"
          ></div>

        </div>

        <button
          class="secondary-btn"
          id="copyTemp"
          type="button"
        >
          Copy
        </button>

      </div>
    `,

    percentage: `

      <div class="form-grid">

        <div class="form-group">

          <label>
            Percentage
          </label>

          <input
            id="pctPercent"
            type="number"
            value="20"
            step="any"
          >

        </div>

        <div class="form-group">

          <label>
            Of
          </label>

          <input
            id="pctOf"
            type="number"
            value="250"
            step="any"
          >

        </div>

        <div class="form-group">

          <label>
            Original value
          </label>

          <input
            id="pctOriginal"
            type="number"
            value="200"
            step="any"
          >

        </div>

        <div class="form-group">

          <label>
            New value
          </label>

          <input
            id="pctNew"
            type="number"
            value="250"
            step="any"
          >

        </div>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="pctResult"
          >
            50
          </div>

          <div
            class="result-sub"
            id="pctSub"
          >
            20% of 250
          </div>

        </div>

        <button
          class="secondary-btn"
          id="copyPct"
          type="button"
        >
          Copy
        </button>

      </div>

      <div class="note">
        The first pair finds a percentage of a number.
        The second pair calculates percentage change.
      </div>
    `,

    calculator: `

      <div class="form-group">

        <label>
          Expression
        </label>

        <input
          id="calcInput"
          type="text"
          value="(25 * 4) + 10 / 2"
          placeholder="e.g. 25 * 4 + 10 / 2"
        >

      </div>

      <div class="tool-buttons">

        <button
          class="primary-btn"
          id="calculateBtn"
        >
          Calculate
        </button>

        <button
          class="secondary-btn"
          id="calcClear"
        >
          Clear
        </button>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="calcResult"
          >
            60
          </div>

          <div class="result-sub">
            Supports +, −, ×, ÷, %, parentheses and decimals.
          </div>

        </div>

        <button
          class="secondary-btn"
          id="copyCalc"
        >
          Copy
        </button>

      </div>
    `,

    age: `

      <div class="form-grid">

        <div class="form-group full">

          <label>
            Date of birth
          </label>

          <input
            id="birthDate"
            type="date"
          >

        </div>

      </div>

      <div class="tool-buttons">

        <button
          class="primary-btn"
          id="ageBtn"
        >
          Calculate age
        </button>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="ageResult"
          >
            —
          </div>

          <div
            class="result-sub"
            id="ageSub"
          >
            Your exact age will appear here.
          </div>

        </div>

        <button
          class="secondary-btn"
          id="copyAge"
        >
          Copy
        </button>

      </div>
    `,

    datediff: `

      <div class="form-grid">

        <div class="form-group">

          <label>
            Start date
          </label>

          <input
            id="dateStart"
            type="date"
          >

        </div>

        <div class="form-group">

          <label>
            End date
          </label>

          <input
            id="dateEnd"
            type="date"
          >

        </div>

      </div>

      <div class="tool-buttons">

        <button
          class="primary-btn"
          id="dateDiffBtn"
        >
          Calculate difference
        </button>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="dateDiffResult"
          >
            —
          </div>

          <div
            class="result-sub"
            id="dateDiffSub"
          ></div>

        </div>

        <button
          class="secondary-btn"
          id="copyDateDiff"
        >
          Copy
        </button>

      </div>
    `,

    timezone: `

      <div class="form-grid">

        <div class="form-group">

          <label>
            Time
          </label>

          <input
            id="zoneTime"
            type="time"
            value="12:00"
          >

        </div>

        <div class="form-group">

          <label>
            Base UTC offset
          </label>

          <select id="zoneBase">
            ${offsetOptions()}
          </select>

        </div>

        <div class="form-group">

          <label>
            Compare with
          </label>

          <select id="zoneTarget">
            ${offsetOptions()}
          </select>

        </div>

      </div>

      <div class="tool-buttons">

        <button
          class="primary-btn"
          id="zoneBtn"
        >
          Convert time
        </button>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="zoneResult"
          >
            12:00
          </div>

          <div
            class="result-sub"
            id="zoneSub"
          >
            UTC offsets are used for a simple comparison.
          </div>

        </div>

        <button
          class="secondary-btn"
          id="copyZone"
        >
          Copy
        </button>

      </div>
    `,

    text: `

      <div class="form-group">

        <label>
          Your text
        </label>

        <textarea
          id="textInput"
          placeholder="Start typing or paste your text here..."
        ></textarea>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="textResult"
          >
            0 words
          </div>

          <div
            class="result-sub"
            id="textSub"
          >
            0 characters • 0 lines • ~0 min read
          </div>

        </div>

        <button
          class="secondary-btn"
          id="copyText"
        >
          Copy
        </button>

      </div>
    `,

    case: `

      <div class="form-group">

        <label>
          Your text
        </label>

        <textarea
          id="caseInput"
          placeholder="Enter text to transform..."
        ></textarea>

      </div>

      <div class="tool-buttons">

        <button
          class="primary-btn caseBtn"
          data-case="upper"
        >
          UPPERCASE
        </button>

        <button
          class="secondary-btn caseBtn"
          data-case="lower"
        >
          lowercase
        </button>

        <button
          class="secondary-btn caseBtn"
          data-case="title"
        >
          Title Case
        </button>

        <button
          class="secondary-btn caseBtn"
          data-case="sentence"
        >
          Sentence case
        </button>

      </div>
    `,

    json: `

      <div class="form-group">

        <label>
          JSON input
        </label>

        <textarea
          id="jsonInput"
          spellcheck="false"
          placeholder='{"name":"Shadow","skills":["web","games"]}'
        ></textarea>

      </div>

      <div class="tool-buttons">

        <button
          class="primary-btn"
          id="jsonFormat"
        >
          Format
        </button>

        <button
          class="secondary-btn"
          id="jsonMinify"
        >
          Minify
        </button>

        <button
          class="secondary-btn"
          id="jsonClear"
        >
          Clear
        </button>

        <button
          class="secondary-btn"
          id="jsonCopy"
        >
          Copy output
        </button>

      </div>

      <pre
        class="code-output"
        id="jsonOutput"
      >Formatted JSON will appear here.</pre>
    `,

    color: `

      <div class="form-grid">

        <div class="form-group full">

          <label>
            HEX color
          </label>

          <input
            id="hexInput"
            type="text"
            value="#315EFB"
            placeholder="#315EFB"
          >

        </div>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="colorResult"
          >
            RGB(49, 94, 251)
          </div>

          <div
            class="result-sub"
            id="colorSub"
          >
            HSL(225, 96%, 59%)
          </div>

        </div>

        <button
          class="secondary-btn"
          id="copyColor"
        >
          Copy
        </button>

      </div>

      <div
        class="color-preview"
        id="colorPreview"
      ></div>
    `,

    password: `

      <div class="form-group">

        <label>
          Password length
          <strong id="passwordLengthLabel">
            16
          </strong>
        </label>

        <div class="range-row">

          <input
            id="passwordLength"
            type="range"
            min="6"
            max="48"
            value="16"
          >

          <span id="passwordLengthValue">
            16
          </span>

        </div>

      </div>

      <div
        class="form-grid"
        style="margin-top:15px"
      >

        <label>
          <input
            id="passUpper"
            type="checkbox"
            checked
          >
          Uppercase
        </label>

        <label>
          <input
            id="passLower"
            type="checkbox"
            checked
          >
          Lowercase
        </label>

        <label>
          <input
            id="passNumbers"
            type="checkbox"
            checked
          >
          Numbers
        </label>

        <label>
          <input
            id="passSymbols"
            type="checkbox"
            checked
          >
          Symbols
        </label>

      </div>

      <div class="tool-buttons">

        <button
          class="primary-btn"
          id="generatePassword"
        >
          Generate
        </button>

      </div>

      <div class="result-box">

        <div
          class="generated-password"
          id="passwordResult"
        >
          Click Generate
        </div>

        <button
          class="secondary-btn"
          id="copyPassword"
        >
          Copy
        </button>

      </div>
    `,

    numberbase: `

      <div class="form-grid">

        <div class="form-group">

          <label>
            Value
          </label>

          <input
            id="baseValue"
            type="text"
            value="255"
          >

        </div>

        <div class="form-group">

          <label>
            Input base
          </label>

          <select id="baseInput">
            ${baseOptions()}
          </select>

        </div>

      </div>

      <div class="result-box">

        <div>

          <div
            class="result-main"
            id="baseResult"
          >
            Binary: 11111111
          </div>

          <div
            class="result-sub"
            id="baseSub"
          >
            Hex: FF • Octal: 377 • Decimal: 255
          </div>

        </div>

        <button
          class="secondary-btn"
          id="copyBase"
        >
          Copy
        </button>

      </div>
    `
  };

  return (
    common[id] ||
    `<p>This utility could not be loaded.</p>`
  );
}

function bindTool(id) {

  if (unitSets[id]) {

    const set = unitSets[id];

    const value = $("#unitValue");
    const from = $("#fromUnit");
    const to = $("#toUnit");

    const convert = () => {

      const number = Number(value.value);

      if (!Number.isFinite(number)) {

        $("#unitResult").textContent =
          "Enter a valid number";

        return;
      }

      const result =
        number *
        set.units[from.value] /
        set.units[to.value];

      $("#unitResult").textContent =
        `${fmt(result)} ${to.value}`;

      $("#unitSub").textContent =
        `${fmt(number)} ${from.value} = ${fmt(result)} ${to.value}`;
    };

    [
      value,
      from,
      to
    ].forEach(element => {

      element.addEventListener(
        "input",
        convert
      );
    });

    $("#swapUnits").addEventListener(
      "click",
      () => {

        const temporary = from.value;

        from.value = to.value;
        to.value = temporary;

        convert();
      }
    );

    $("#copyResult").addEventListener(
      "click",
      () =>
        copyText(
          $("#unitResult").textContent
        )
    );

    convert();

    return;
  }

  if (id === "currency") {

    const convert = () => {

      const amount =
        Number(
          $("#currencyAmount").value
        );

      const from =
        $("#fromCurrency").value;

      const to =
        $("#toCurrency").value;

      const result =
        amount / rates[from] * rates[to];

      $("#currencyResult").textContent =
        `${fmt(result)} ${to}`;

      $("#currencySub").textContent =
        `${fmt(amount)} ${from} = ${fmt(result)} ${to}`;
    };

    [
      "currencyAmount",
      "fromCurrency",
      "toCurrency"
    ].forEach(id => {

      $("#" + id).addEventListener(
        "input",
        convert
      );
    });

    $("#copyCurrency").addEventListener(
      "click",
      () =>
        copyText(
          $("#currencyResult").textContent
        )
    );

    convert();
  }

  if (id === "temperature") {

    const convert = () => {

      const number =
        Number(
          $("#tempValue").value
        );

      const from =
        $("#tempFrom").value;

      const to =
        $("#tempTo").value;

      let celsius;

      if (from === "C") {

        celsius = number;

      } else if (from === "F") {

        celsius =
          (number - 32) * 5 / 9;

      } else {

        celsius =
          number - 273.15;
      }

      let result;

      if (to === "C") {

        result = celsius;

      } else if (to === "F") {

        result =
          celsius * 9 / 5 + 32;

      } else {

        result =
          celsius + 273.15;
      }

      $("#tempResult").textContent =
        `${fmt(result)} °${to}`;

      $("#tempSub").textContent =
        `${fmt(number)} °${from} converted to °${to}`;
    };

    [
      "tempValue",
      "tempFrom",
      "tempTo"
    ].forEach(id => {

      $("#" + id).addEventListener(
        "input",
        convert
      );
    });

    $("#copyTemp").addEventListener(
      "click",
      () =>
        copyText(
          $("#tempResult").textContent
        )
    );

    convert();
  }

  if (id === "percentage") {

    const calculate = () => {

      const percentage =
        Number($("#pctPercent").value);

      const of =
        Number($("#pctOf").value);

      const original =
        Number($("#pctOriginal").value);

      const current =
        Number($("#pctNew").value);

      const result =
        percentage * of / 100;

      const change =
        original === 0
          ? NaN
          : (
              (current - original) /
              Math.abs(original)
            ) * 100;

      $("#pctResult").textContent =
        fmt(result);

      $("#pctSub").textContent =
        `${fmt(percentage)}% of ${fmt(of)} = ${fmt(result)} • Change: ${fmt(change)}%`;
    };

    [
      "pctPercent",
      "pctOf",
      "pctOriginal",
      "pctNew"
    ].forEach(id => {

      $("#" + id).addEventListener(
        "input",
        calculate
      );
    });

    $("#copyPct").addEventListener(
      "click",
      () =>
        copyText(
          $("#pctSub").textContent
        )
    );

    calculate();
  }

  if (id === "calculator") {

    const calculate = () => {

      const raw =
        $("#calcInput").value
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(
            /[^0-9+\-*/().%\s]/g,
            ""
          );

      try {

        if (!raw.trim()) {
          throw new Error();
        }

        const normalized =
          raw.replace(
            /(\d+(?:\.\d+)?)\s*%/g,
            "($1/100)"
          );

        const result =
          Function(
            `"use strict"; return (${normalized})`
          )();

        if (!Number.isFinite(result)) {
          throw new Error();
        }

        $("#calcResult").textContent =
          fmt(result);

      } catch {

        $("#calcResult").textContent =
          "Invalid expression";
      }
    };

    $("#calculateBtn").addEventListener(
      "click",
      calculate
    );

    $("#calcInput").addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {
          calculate();
        }
      }
    );

    $("#calcClear").addEventListener(
      "click",
      () => {

        $("#calcInput").value = "";

        $("#calcResult").textContent =
          "—";
      }
    );

    $("#copyCalc").addEventListener(
      "click",
      () =>
        copyText(
          $("#calcResult").textContent
        )
    );

    calculate();
  }

  if (id === "age") {

    const today = new Date();

    $("#birthDate").value =
      `${today.getFullYear() - 18}-${
        String(today.getMonth() + 1)
          .padStart(2, "0")
      }-${
        String(today.getDate())
          .padStart(2, "0")
      }`;

    const calculate = () => {

      const date =
        new Date(
          $("#birthDate").value +
          "T00:00:00"
        );

      if (isNaN(date)) return;

      const now = new Date();

      let years =
        now.getFullYear() -
        date.getFullYear();

      let months =
        now.getMonth() -
        date.getMonth();

      let days =
        now.getDate() -
        date.getDate();

      if (days < 0) {

        months--;

        days +=
          new Date(
            now.getFullYear(),
            now.getMonth(),
            0
          ).getDate();
      }

      if (months < 0) {

        years--;

        months += 12;
      }

      $("#ageResult").textContent =
        `${years} years, ${months} months, ${days} days`;

      $("#ageSub").textContent =
        `Born ${date.toLocaleDateString()}`;
    };

    $("#ageBtn").addEventListener(
      "click",
      calculate
    );

    $("#birthDate").addEventListener(
      "change",
      calculate
    );

    $("#copyAge").addEventListener(
      "click",
      () =>
        copyText(
          $("#ageResult").textContent
        )
    );

    calculate();
  }

  if (id === "datediff") {

    const now = new Date();

    const toISO = date =>
      `${date.getFullYear()}-${
        String(date.getMonth() + 1)
          .padStart(2, "0")
      }-${
        String(date.getDate())
          .padStart(2, "0")
      }`;

    $("#dateStart").value =
      toISO(
        new Date(
          now.getFullYear(),
          now.getMonth(),
          1
        )
      );

    $("#dateEnd").value =
      toISO(now);

    const calculate = () => {

      const start =
        new Date(
          $("#dateStart").value +
          "T00:00:00"
        );

      const end =
        new Date(
          $("#dateEnd").value +
          "T00:00:00"
        );

      if (
        isNaN(start) ||
        isNaN(end)
      ) {
        return;
      }

      const days =
        Math.round(
          Math.abs(end - start) /
          86400000
        );

      $("#dateDiffResult").textContent =
        `${days.toLocaleString()} days`;

      $("#dateDiffSub").textContent =
        `Approximately ${(days / 7).toFixed(1)} weeks • ${(days / 30.4375).toFixed(1)} months`;
    };

    $("#dateDiffBtn").addEventListener(
      "click",
      calculate
    );

    $("#copyDateDiff").addEventListener(
      "click",
      () =>
        copyText(
          $("#dateDiffResult").textContent
        )
    );

    calculate();
  }

  if (id === "timezone") {

    const calculate = () => {

      const [
        hours,
        minutes
      ] =
        $("#zoneTime")
          .value
          .split(":")
          .map(Number);

      const base =
        Number(
          $("#zoneBase").value
        );

      const target =
        Number(
          $("#zoneTarget").value
        );

      let total =
        hours * 60 +
        minutes +
        (target - base) * 60;

      total =
        ((total % 1440) + 1440) %
        1440;

      const resultHours =
        String(
          Math.floor(total / 60)
        ).padStart(2, "0");

      const resultMinutes =
        String(total % 60)
          .padStart(2, "0");

      $("#zoneResult").textContent =
        `${resultHours}:${resultMinutes}`;

      $("#zoneSub").textContent =
        `Converted from UTC${
          base >= 0 ? "+" : ""
        }${base}:00 to UTC${
          target >= 0 ? "+" : ""
        }${target}:00`;
    };

    [
      "zoneTime",
      "zoneBase",
      "zoneTarget"
    ].forEach(id => {

      $("#" + id).addEventListener(
        "input",
        calculate
      );
    });

    $("#zoneBtn").addEventListener(
      "click",
      calculate
    );

    $("#copyZone").addEventListener(
      "click",
      () =>
        copyText(
          $("#zoneResult").textContent
        )
    );

    calculate();
  }

  if (id === "text") {

    const calculate = () => {

      const text =
        $("#textInput").value;

      const trimmed =
        text.trim();

      const words =
        trimmed
          ? trimmed.split(/\s+/).length
          : 0;

      const lines =
        text
          ? text.split(/\n/).length
          : 0;

      $("#textResult").textContent =
        `${words} ${
          words === 1
            ? "word"
            : "words"
        }`;

      $("#textSub").textContent =
        `${text.length} characters • ${
          lines
        } ${
          lines === 1
            ? "line"
            : "lines"
        } • ~${
          Math.ceil(words / 200)
        } min read`;
    };

    $("#textInput").addEventListener(
      "input",
      calculate
    );

    $("#copyText").addEventListener(
      "click",
      () =>
        copyText(
          $("#textInput").value
        )
    );

    calculate();
  }

  if (id === "case") {

    const input =
      $("#caseInput");

    $$(".caseBtn").forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const type =
            button.dataset.case;

          if (type === "upper") {

            input.value =
              input.value.toUpperCase();
          }

          if (type === "lower") {

            input.value =
              input.value.toLowerCase();
          }

          if (type === "title") {

            input.value =
              input.value
                .toLowerCase()
                .replace(
                  /\b\w/g,
                  character =>
                    character.toUpperCase()
                );
          }

          if (type === "sentence") {

            input.value =
              input.value
                .toLowerCase()
                .replace(
                  /(^\s*\w|[.!?]\s+\w)/g,
                  match =>
                    match.toUpperCase()
                );
          }
        }
      );
    });
  }

  if (id === "json") {

    const input =
      $("#jsonInput");

    const output =
      $("#jsonOutput");

    const parse = () => {

      try {

        return JSON.parse(
          input.value
        );

      } catch (error) {

        output.textContent =
          "Invalid JSON: " +
          error.message;

        return null;
      }
    };

    $("#jsonFormat").addEventListener(
      "click",
      () => {

        const object = parse();

        if (object !== null) {

          output.textContent =
            JSON.stringify(
              object,
              null,
              2
            );
        }
      }
    );

    $("#jsonMinify").addEventListener(
      "click",
      () => {

        const object = parse();

        if (object !== null) {

          output.textContent =
            JSON.stringify(object);
        }
      }
    );

    $("#jsonClear").addEventListener(
      "click",
      () => {

        input.value = "";

        output.textContent =
          "Formatted JSON will appear here.";
      }
    );

    $("#jsonCopy").addEventListener(
      "click",
      () =>
        copyText(
          output.textContent
        )
    );
  }

  if (id === "color") {

    const update = () => {

      let hex =
        $("#hexInput")
          .value
          .trim()
          .replace("#", "");

      if (
        !/^[0-9a-fA-F]{6}$/.test(hex)
      ) {

        $("#colorResult").textContent =
          "Enter a 6-digit HEX";

        $("#colorPreview").style.background =
          "transparent";

        return;
      }

      const r =
        parseInt(
          hex.slice(0, 2),
          16
        );

      const g =
        parseInt(
          hex.slice(2, 4),
          16
        );

      const b =
        parseInt(
          hex.slice(4, 6),
          16
        );

      const max =
        Math.max(r, g, b) / 255;

      const min =
        Math.min(r, g, b) / 255;

      const lightness =
        (max + min) / 2;

      let hue = 0;
      let saturation = 0;

      if (max !== min) {

        const difference =
          max - min;

        saturation =
          lightness > 0.5
            ? difference /
              (2 - max - min)
            : difference /
              (max + min);

        switch (max) {

          case r / 255:

            hue =
              (g / 255 - b / 255) /
                difference +
              (g < b ? 6 : 0);

            break;

          case g / 255:

            hue =
              (b / 255 - r / 255) /
                difference +
              2;

            break;

          default:

            hue =
              (r / 255 - g / 255) /
                difference +
              4;
        }

        hue *= 60;
      }

      $("#colorResult").textContent =
        `RGB(${r}, ${g}, ${b})`;

      $("#colorSub").textContent =
        `HSL(${Math.round(hue)}, ${Math.round(
          saturation * 100
        )}%, ${Math.round(
          lightness * 100
        )}%)`;

      $("#colorPreview").style.background =
        `#${hex}`;
    };

    $("#hexInput").addEventListener(
      "input",
      update
    );

    $("#copyColor").addEventListener(
      "click",
      () =>
        copyText(
          $("#colorResult").textContent +
          " • " +
          $("#colorSub").textContent
        )
    );

    update();
  }

  if (id === "password") {

    const length =
      $("#passwordLength");

    const lengthValue =
      $("#passwordLengthValue");

    const result =
      $("#passwordResult");

    length.addEventListener(
      "input",
      () => {

        lengthValue.textContent =
          length.value;

        $("#passwordLengthLabel")
          .textContent =
          length.value;
      }
    );

    const generate = () => {

      let characters = "";

      if ($("#passUpper").checked) {

        characters +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }

      if ($("#passLower").checked) {

        characters +=
          "abcdefghijklmnopqrstuvwxyz";
      }

      if ($("#passNumbers").checked) {

        characters +=
          "0123456789";
      }

      if ($("#passSymbols").checked) {

        characters +=
          "!@#$%^&*()-_=+[]{}";
      }

      if (!characters) {

        result.textContent =
          "Select at least one option";

        return;
      }

      const array =
        new Uint32Array(
          Number(length.value)
        );

      crypto.getRandomValues(array);

      result.textContent =
        Array.from(
          array,
          number =>
            characters[
              number % characters.length
            ]
        ).join("");
    };

    $("#generatePassword").addEventListener(
      "click",
      generate
    );

    $("#copyPassword").addEventListener(
      "click",
      () =>
        copyText(
          result.textContent
        )
    );

    generate();
  }

  if (id === "numberbase") {

    const calculate = () => {

      const base =
        Number(
          $("#baseInput").value
        );

      const raw =
        $("#baseValue")
          .value
          .trim();

      const number =
        parseInt(raw, base);

      if (!Number.isFinite(number)) {

        $("#baseResult").textContent =
          "Invalid number";

        $("#baseSub").textContent =
          "Check the value and input base.";

        return;
      }

      $("#baseResult").textContent =
        `Binary: ${number.toString(2)}`;

      $("#baseSub").textContent =
        `Hex: ${number
          .toString(16)
          .toUpperCase()} • Octal: ${
          number.toString(8)
        } • Decimal: ${number}`;
    };

    [
      "baseValue",
      "baseInput"
    ].forEach(id => {

      $("#" + id).addEventListener(
        "input",
        calculate
      );
    });

    $("#copyBase").addEventListener(
      "click",
      () =>
        copyText(
          $("#baseResult").textContent +
          " • " +
          $("#baseSub").textContent
        )
    );

    calculate();
  }
}

$("#searchInput").addEventListener(
  "input",
  renderTools
);

$$(".category").forEach(button => {

  button.addEventListener(
    "click",
    () =>
      setCategory(
        button.dataset.category
      )
  );
});

$$("[data-view]").forEach(button => {

  button.addEventListener(
    "click",
    () =>
      setView(
        button.dataset.view
      )
  );
});

$$("[data-category-link]").forEach(button => {

  button.addEventListener(
    "click",
    () =>
      setCategory(
        button.dataset.categoryLink
      )
  );
});

$("#favoritesTop").addEventListener(
  "click",
  () =>
    setView("favorites")
);

$("#clearSearch").addEventListener(
  "click",
  () => {

    $("#searchInput").value = "";

    renderTools();
  }
);

$("#modalFavorite").addEventListener(
  "click",
  () => {

    if (currentTool) {

      toggleFavorite(
        currentTool.id
      );
    }
  }
);

$$("[data-close-modal]").forEach(element => {

  element.addEventListener(
    "click",
    closeModal
  );
});

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      !$("#toolModal")
        .classList
        .contains("hidden")
    ) {

      closeModal();
    }

    if (
      event.key === "/" &&
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA"
    ) {

      event.preventDefault();

      $("#searchInput").focus();
    }
  }
);

$("#themeToggle").addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark"
    );

    localStorage.setItem(
      "utilityTheme",
      document.body.classList.contains("dark")
        ? "dark"
        : "light"
    );
  }
);

if (
  localStorage.getItem(
    "utilityTheme"
  ) === "dark"
) {

  document.body.classList.add("dark");
}

updateCounts();
renderTools();