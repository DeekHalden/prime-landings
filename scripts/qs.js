export class Questionnaire {
  constructor(questions) {
    this.currentStep = 0;
    this.questions = questions;
    this.answers = {};
    this.button = document.getElementById("next");
  }

  setAnswer(answer) {
    this.answers[this.current.id] = answer;
    if (this.answers[this.current.id] && this.answers[this.current.id].length) {
      this.button.classList.remove("disabled");
    } else {
      this.button.classList.add("disabled");
    }
  }

  async next() {
    return new Promise((resolve, reject) => {
      if (this.currentStep >= this.questions.length) {
        reject();
        return;
      }
      this.currentStep++;
      resolve(this.currentStep);
    });
  }

  async prev() {
    return new Promise((resolve, reject) => {
      if (this.currentStep === 0) {
        reject();
        return;
      }
      this.currentStep--;
      resolve(this.currentStep);
    });
  }

  get current() {
    return this.questions[this.currentStep];
  }

  get currentAnswers() {
    return this.answers[this.current?.id];
  }
}

export const qs = new Questionnaire(data);
