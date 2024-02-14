import { HTML, Input, MultiSelect, SingleSelect } from "./handlers.js";
import { qs } from "./qs.js";

export class StrategyBuilder {
  constructor(eventManager) {
    this.eventManager = eventManager;
  }
  renderTitle(text) {
    return `${text ? '<div class="step__title">' + text + "</div>" : ""}`;
  }
  renderSubtitle(description) {
    return `${
      description
        ? '<div class="step__description">' + description + "</div>"
        : ""
    }`;
  }
}

export class SingleStrategy extends StrategyBuilder {
  constructor(eventManager) {
    super(eventManager);
    this.name = "single";
  }
  renderVariants(variantsToJson) {
    return variantsToJson
      .map((variant) => {
        return `
            <button
                class="button select single"
                id="variant-${variant.id}"
                data-id=${variant.id}
            >
            ${
              variant.image
                ? '<div class="button__wrapper"><img class="button__img" src=' +
                  variant.image +
                  "/></div>"
                : ""
            }
            <span>${variant.title}</span>
            </button>
            `;
      })
      .join("");
  }
  render(data) {
    const context = document.querySelector(".step");
    const { question_text, variants, description } = data;
    const variantsToJson = JSON.parse(variants);

    context.innerHTML = `
        ${this.renderTitle(question_text)}
        ${this.renderSubtitle(description)}
        <div class="actions actions--vertical">
            ${this.renderVariants(variantsToJson)}
        </div>
    `;

    this.eventManager.initListeners();
  }
}

export class MultiStrategy extends StrategyBuilder {
  constructor(eventManager) {
    super(eventManager);
    this.name = "multi";
  }
  renderVariants(variantsToJson) {
    return variantsToJson
      .map((variant) => {
        return `
          <button
              class="button select multi"
              id="variant-${variant.id}"
              data-id=${variant.id}
          >
          ${
            variant.image
              ? '<div class="button__wrapper"><img class="button__img" src=' +
                variant.image +
                "/></div>"
              : ""
          }
          <span>${variant.title}</span>
          </button>
          `;
      })
      .join("");
  }
  render(data) {
    const context = document.querySelector(".step");
    const { question_text, variants, description } = data;
    const variantsToJson = JSON.parse(variants);

    context.innerHTML = `
        ${this.renderTitle(question_text)}
        ${this.renderSubtitle(description)}
        <div class="actions actions--vertical">
            ${this.renderVariants(variantsToJson)}
        </div>
    `;

    this.eventManager.initListeners();
  }
}

export class HTMLStrategy {
  constructor(eventManager) {
    this.name = "html";
    this.eventManager = eventManager;
  }
  render(data, context) {
    const renderContext = document.querySelector(".step");
    const { variants } = data;
    console.log(variants);
    const contentToJson = decodeURIComponent(JSON.parse(variants).content);
    renderContext.innerHTML = `<div class="html">${contentToJson}</div>`;
    this.eventManager.initListeners(context);
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

export class InputStrategy extends StrategyBuilder {
  constructor(eventManager) {
    super(eventManager);
    this.name = "input";
  }
  render(data) {
    const context = document.querySelector(".step");
    const { question_text, description } = data;
    console.log(data);
    context.innerHTML = `
        ${this.renderTitle(question_text)} 
        ${this.renderSubtitle(description)}
        <div class="actions actions--vertical">
          <div class="input-wrapper">
          <input
          autocomplete="off"
          class="input-wrapper__input"
          required
          />
          <label>Your height</label>
            <div class="input-wrapper__note">cm</div>
          </div>
        </div>
    `;
    this.eventManager.initListeners();
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

export class GradeStrategy extends StrategyBuilder {
  constructor(eventManager) {
    super(eventManager);
    this.name = "grade";
  }
  renderVariants(variantsToJson) {
    return variantsToJson
      .map((variant) => {
        return `
          <button
              class="button select single vertical"
              id="variant-${variant.id}"
              data-id=${variant.id}
          >
          <span>${variant.title}</span>
          </button>
          `;
      })
      .join("");
  }
  render(data) {
    const context = document.querySelector(".step");
    const { description, question_text, variants } = data;
    const variantsToJson = JSON.parse(variants);
    context.innerHTML = `
        ${this.renderTitle(question_text)} 
        ${this.renderSubtitle(description)}
        <div class="actions actions--horizontal">
          ${this.renderVariants(variantsToJson)}
          <div class="step__details">
            <div>Not at all</div>
            <div>Totally</div>
          </div>
        </div>
    `;
    this.eventManager.initListeners();
  }
}

export class StrategyManager {
  constructor() {
    this.strategies = [
      new SingleStrategy(
        new SingleSelect({
          qs: qs,
        })
      ),
      new MultiStrategy(
        new MultiSelect({
          qs: qs,
        })
      ),
      new HTMLStrategy(
        new HTML({
          qs: qs,
        })
      ),
      new TitleStrategy(),
      new DescriptionStrategy(),
      new InputStrategy(
        new Input({
          qs: qs,
        })
      ),
      new QuoteStrategy(),
      new GradeStrategy(
        new SingleSelect({
          qs: qs,
        })
      ),
    ];
  }

  getStrategy(name) {
    return this.strategies.find((str) => str.name === name);
  }
}
