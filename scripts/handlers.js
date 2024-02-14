export class SingleSelect {
  constructor({ context, qs }) {
    this.className = "single";
    this.qs = qs;
  }

  initListeners() {
    const active = this.qs.currentAnswers;
    this.elements = [...document.getElementsByClassName(this.className)];
    this.elements.forEach((element) => {
      if (element.dataset.id === active) {
        element.classList.add("active");
      }
      element.addEventListener("click", () => {
        this.elements.forEach((el) => el.classList.remove("active"));
        element.classList.add("active");
        this.qs.setAnswer(element.dataset.id);
      });
    });
  }
}
