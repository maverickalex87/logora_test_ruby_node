import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect() {
    this.element.addEventListener('click', () => {
      this.element.textContent = "Hello World!"
    })
  }
}
