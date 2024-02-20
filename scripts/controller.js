export class Controller {
  constructor({ qs, strategyManager }) {
    this.prevButton = document.getElementById("prev");
    this.nextButton = document.getElementById("next");
    this.footer = document.querySelector('.footer')
    this.qs = qs;
    this.strategyManager = strategyManager;
    this.initListeners();
    this.hidePrev();
    this.initProxy();
    this.render(this.qs.currentStep);
  }

  initProxy() {
    const target = {
      currentStep: this.qs.currentStep,
    };

    const handler = {
      set: (obj, prop, value) => {
        if (!this.qs.currentAnswers) {
          this.blockNext();
        } else {
          this.activateNext();
        }
        if (value >= this.qs.questions.length - 1) {
          this.hideNext();
        } else if (value <= 0) {
          this.hidePrev();
        } else {
          this.showNext();
          this.showPrev();
        }
        return Reflect.set(obj, prop, value);
      },
    };

    this.currentStepProxy = new Proxy(target, handler);
  }

  initListeners() {
    this.prevButton.addEventListener("click", async () => {
      try {
        const current = await this.qs.prev();
        await this.render(current);
      } catch (error) {}
    });

    this.nextButton.addEventListener("click", async () => {
      try {
        const current = await this.qs.next();
        await this.render(current);
      } catch (error) {}
    });
  }

  async render(current) {
    this.currentStepProxy.currentStep = current;
    const step = this.qs.current;
    const strategy = this.strategyManager.getStrategy(step.type);
    strategy.render(step, this);
  }

  hideFooter() {
    this.footer.classList.add('hidden')
  }

  hideNext() {
    this.nextButton.classList.add("hidden");
  }

  hidePrev() {
    this.prevButton.classList.add("hidden");
  }

  showNext() {
    this.nextButton.classList.remove("hidden");
  }

  showPrev() {
    this.prevButton.classList.remove("hidden");
  }

  blockNext() {
    this.nextButton.classList.add("disabled");
  }

  activateNext() {
    this.nextButton.classList.remove("disabled");
  }
}
