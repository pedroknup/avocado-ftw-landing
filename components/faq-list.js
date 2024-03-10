import { faqItems } from "./data";

class FaqList extends HTMLElement {
  constructor() {
    super();
    this.questions = faqItems;
  }

  connectedCallback() {
    this.render();
  }

  set data(data) {
    this.questions = data;
    this.render();
  }

  render() {
    this.innerHTML = ''; // Clear the existing content
    this.questions.forEach((item, index) => {
      const faqItem = document.createElement('faq-item');
      faqItem.setAttribute('question', item.question);
      faqItem.setAttribute('answer', item.answer);
      faqItem.setAttribute('id', index + 1);
      this.appendChild(faqItem);
    });
  }
}

if ('customElements' in window) {
  customElements.define('faq-list', FaqList);
}
