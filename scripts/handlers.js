export class SingleSelect {
  constructor({ qs }) {
    this.className = "single";
    this.qs = qs;
  }

  initListeners() {
    const active = this.qs.currentAnswers;
    const elements = [...document.getElementsByClassName(this.className)];
    elements.forEach((element) => {
      if (element.dataset.id === active) {
        element.classList.add("active");
      }
      element.addEventListener("click", () => {
        elements.forEach((el) => el.classList.remove("active"));
        element.classList.add("active");
        this.qs.setAnswer(element.dataset.id);
      });
    });
  }
}

export class MultiSelect {
  constructor({ qs }) {
    this.className = "multi";
    this.qs = qs;
  }

  initListeners() {
    const active = this.qs.currentAnswers;
    console.log(active);
    console.log(this.qs.current);
    const elements = [...document.getElementsByClassName(this.className)];
    elements.forEach((element) => {
      if (active && active.includes(element.dataset.id)) {
        element.classList.add("active");
      }
      element.addEventListener("click", () => {
        console.log("click");
        element.classList.toggle("active");
        const selected = [...document.getElementsByClassName("active")].map(
          (el) => el.dataset.id
        );
        this.qs.setAnswer(selected);
      });
    });
  }
}

export class Input {
  constructor({ qs }) {
    this.className = "input-wrapper__input";
    this.qs = qs;
  }

  initListeners() {
    const text = this.qs.currentAnswers;
    const element = document.querySelector(`.${this.className}`);
    element.value = text ?? "";
    element.addEventListener("input", (e) => {
      this.qs.setAnswer(e.target.value);
    });
  }
}

export class HTML {
  constructor({ qs }) {
    this.className = "";
    this.qs = qs;
  }

  initListeners(context) {
    const button = document.querySelector("footer a");
    context.hidePrev()
    context.hideNext()
    button.addEventListener("click", async (e) => {
      const current = await this.qs.next();
      await context.render(current)
      context.showNext(current)
    });
  }
}
