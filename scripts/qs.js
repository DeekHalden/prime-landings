export class Questionnaire {
  constructor(questions) {
    this.currentStep = 0;
    this.questions = questions;
    this.answers = {};
  }

  setAnswer(answer) {
    this.answers[this.current.id] = answer;
    console.log(this.answers);
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
