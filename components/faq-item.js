import './faq-item.scss';

class FaqItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['question', 'answer', 'id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  toggleCollapse() {
    const faqItem = this.querySelector(`#faq-item-${this.attributes.id.value}`);
    faqItem.classList.toggle('collapsed');
  }

  render() {
    const { question, answer, id } = this.attributes;
    this.innerHTML = `
      <div class="faq-item collapsed" id="faq-item-${id.value}">
        <div class="faq-question" data-faq-item-index="${id.value}" onclick="this.parentElement.parentElement.toggleCollapse()">
          <span>${question.value}</span>
          <svg class="faq-chevron" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14.121l-6.364-6.364-1.414 1.414 8.485 8.485 8.485-8.485-1.414-1.414z" fill="#FFF" />
          </svg>
        </div>
        <p class="faq-answer" id="faq-answer-${id.value}">${answer.value}</p>
      </div>`;
  }
}

if ('customElements' in window) {
  customElements.define('faq-item', FaqItem);
}
