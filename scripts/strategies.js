import { SingleSelect } from "./handlers.js";
import { qs } from "./qs.js";

export class SingleStrategy {
  constructor(manager) {
    this.name = "single";
    this.eventManager = manager;
  }
  render(data) {
    console.log(this.name);
    const context = document.querySelector(".step");
    const { question_text, variants, description } = data;
    const variantsToJson = JSON.parse(variants);
    const mappedVariants = variantsToJson
      .map((variant) => {
        return `
            <button
                class="button select single"
                id="variant-${variant.id}"
                data-id=${variant.id}
            >
            <span>${variant.title}</span>
            </button>
            `;
      })
      .join("");
    context.innerHTML = `
        <div class="step__title" >${question_text}</div>
        <div class="step__description">${description} </div>
        <div class="actions actions--vertical">
            ${mappedVariants}
        </div>
    `;

    this.eventManager.initListeners();
  }
}

export class MultiStrategy {
  constructor() {
    this.name = "multi";
  }
  render() {
    console.log(this.name);
  }
}

export class HTMLStrategy {
  constructor() {
    this.name = "html";
  }
  render() {
    console.log(this.name);
  }
}

export class TitleStrategy {
  constructor() {
    this.name = "title";
  }
  render() {
    console.log(this.name);
  }
}

export class DescriptionStrategy {
  constructor() {
    this.name = "description";
  }
  render() {
    console.log(this.name);
  }
}

export class InputStrategy {
  constructor() {
    this.name = "input";
  }
  render() {
    console.log(this.name);
  }
}

export class QuoteStrategy {
  constructor() {
    this.name = "quote";
  }
  render() {
    console.log(this.name);
  }
}

export class GradeStrategy {
  constructor() {
    this.name = "grade";
  }
  render() {
    console.log(this.name);
  }
}

export class StrategyManager {
  constructor() {
    this.strategies = [
      new SingleStrategy(
        new SingleSelect({
          context: document.querySelector(".actions--vertical"),
          qs: qs,
        })
      ),
      new MultiStrategy(),
      new HTMLStrategy(),
      new TitleStrategy(),
      new DescriptionStrategy(),
      new InputStrategy(),
      new QuoteStrategy(),
      new GradeStrategy(),
    ];
  }

  getStrategy(name) {
    console.log(name);
    return this.strategies.find((str) => str.name === name);
  }
}
