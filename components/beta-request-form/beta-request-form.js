import './style.scss';
import successImage from '../../images/success.png';
import betaUserImage from '../../images/beta-user.png';

class BetaRequestForm extends HTMLElement {
  connectedCallback() {
    this.isSuccessfullySent = false;
    this.emailAddressSent = '';
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  request(formData) {
    const url = 'https://avocado-ftw-app.herokuapp.com/beta/';
    const params = new URLSearchParams(formData).toString();
    const requestUrl = `${url}?${params}`;

    fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.isSuccessfullySent = true;
          this.emailAddressSent = formData.email;
          this.render();
        } else {
          console.log('not ok', response);
          response.text().then((error) => {
            alert(`There was an error sending the request: ${error}`);
          });
        }
      })
      .catch((error) => {
        console.log('error', error)
        alert('There was an error sending the request');
      });
  }

  render() {
    // const { question, answer, id } = this.attributes;

    // if (!question || !answer || !id) {
    //   return;
    // }
    const html = `<div class="section-inner">
  <h3 class="mt-0 mb-16">Beta Program</h3>
  <p class="m-0">Be the first to get access to Avocado FTW and help us make it the best app it can be. Sign up
    for our beta
    program and we'll send you a login code when we're ready to launch.</p>
  <div class="beta-container">
  ${
    this.isSuccessfullySent === false
      ? `
    <div>
      <form class="beta">
        <div>
          <label class="input-group__label" for="name">First name*</label>
          <input type="text" id="name" class="input-group__input" placeholder="How you want to be called" required />
        </div>
        <div>
          <label class="input-group__label" for="email">E-mail*</label>
          <input type="text" id="email" class="input-group__input" placeholder="Enter your e-mail" required />
        </div>
        <div class="select">
          <label class="input-group__label" for="platform">Platform*</label>
          <select id="platform" class="select__input" required>
            <option value="iOS">iOS</option>
            <option value="Android">Android</option>
            <option value="web">Web</option>
          </select>
        </div>
        <input type="submit" class="button button-primary button-wide-mobile" value="Request access" />
      </form>
      <div class="container-sm">
        <div class="cta-inner section-inner">
          <div class="cta-header text-center">
            <div class="m-0 disclaimer">We value your privacy and commit to never sending spam. Your information
              will solely
              be utilized for communication
              related to our beta program and for the issuance of login codes.
            </div>
          </div>
        </div>
      </div>
    </div>
    `
      : `
    <div class="beta-request-success">
      <h3 class="mt-0 mb-16">Request received!</h3>
      <p class="m-0">Thank
        you for signing up for our beta program. We've received your request and will send you a login code when
        we're ready to launch.</p>
      <p class="m-0">We've sent a confirmation email to <strong>${this.emailAddressSent}</strong>.</p>
      <img src="${successImage}" alt="iPhone Beta Request illustration">
    </div>

  `
  }
    <img class="beta-request-bg" src="${betaUserImage}" alt="iPhone Beta Request illustration" style="margin-top: ${this.isSuccessfullySent ? '0' : '-120px'}">

  </div>
</div>`;
    this.innerHTML = html;
    const form = this.querySelector('form.beta');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission

      const formData = {};
      const inputs = form.querySelectorAll('input, select');
      inputs.forEach((input) => {
        input.id && (formData[input.id] = input.value);
      });

      this.request(formData); // Pass the form data to the request function
    });
  }
}

if ('customElements' in window) {
  customElements.define('beta-request-form', BetaRequestForm);
}
