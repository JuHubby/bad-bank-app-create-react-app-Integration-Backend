// Create a class for the element
class Data extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const lastName = this.getAttribute("lastName");
    const email = this.getAttribute("email");
    const password = this.getAttribute("password");
    const balance = this.getAttribute("balance");
    const idUser = this.getAttribute("idUser");
    this.innerHTML = `
        <div class="container">
            <table class="table table-striped">
                <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Balance</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <th scope="row">${idUser}</th>
                <td>${name}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${password}</td>
                <td>${balance}</td>
                </tr>
                </tbody>
            </table>
        </div>     
      `;
  }
}

// Define the new element
customElements.define("user-row", Data);
