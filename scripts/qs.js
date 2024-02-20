export class Questionnaire {
  constructor(questions) {
    this.currentStep = 0;
    this.questions = questions;
    this.answers = {};
    this.button = document.getElementById("next");
    this.progressElement = document.getElementById("progress");
    this.initHandler();
    this.progressElement.style.setProperty(
      "--progress-fill-width",
      this.getWidth(0)
    );

    this.progressElements = [...this.progressElement.querySelectorAll("span")];
    this.progressElements.forEach((element, index) => {
      if (!index) {
        element.style.setProperty('--progress-color', 'var(--progress-color-fill)')
      }
    })
  }

  hideProgress() {
    this.progressElement.style.display = 'none'
  }
  getWidth(value) {
    const position = value + 1
    return `${((position) * 100) / this.questions.length}%`;
  }

  initHandler() {
    const handler = {
      set: (obj, prop, value) => {
        const width = this.getWidth(value);
        this.progressElement.style.setProperty(
          "--progress-fill-width",
          width
        );

        
        // const parentWidth = 0;
        this.progressElements.forEach((element, index) => {
          if (index <= value / 1.5) {
            element.style.setProperty('--progress-color', 'var(--progress-color-fill)')
          }  
        });

        return Reflect.set(obj, prop, value);
      },
    };
    this.currentStepProxy = new Proxy(
      {
        value: this.currentStep,
      },
      handler
    );
    console.log(this.currentStepProxy);
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
      if (this.currentStepProxy.value >= this.questions.length) {
        reject();
        return;
      }
      this.currentStepProxy.value++;
      resolve(this.currentStepProxy.value);
    });
  }

  async prev() {
    return new Promise((resolve, reject) => {
      if (this.currentStepProxy.value === 0) {
        reject();
        return;
      }
      this.currentStepProxy.value--;
      resolve(this.currentStepProxy.value);
    });
  }

  get current() {
    return this.questions[this.currentStepProxy.value];
  }

  get currentAnswers() {
    return this.answers[this.current?.id];
  }
}

export const qs = new Questionnaire(data);
