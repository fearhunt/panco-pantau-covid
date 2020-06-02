class CardData extends HTMLElement {
    connectedCallback() {
        this.id = this.getAttribute('display') || null;
        this.description = this.getAttribute('description') || null;
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="${this.id}" class="card single-card mx-1">
                <p>${this.description}</p>
                <h3 class="font-weight-bold desc">12927</h3>
            </div>
        `
    }
}

export default CardData;