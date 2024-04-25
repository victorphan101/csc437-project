class TeamAssortmentComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      const template = document.getElementById('team-player-component-template');
      const content = template.content.cloneNode(true);
      this.shadowRoot.appendChild(content);
    }
  
    connectedCallback() {
      const teamName = this.getAttribute('team-name');
      const players = JSON.parse(this.getAttribute('players'));
  
      this.shadowRoot.querySelector('.team-name').textContent = teamName;
  
      const playerListContainer = this.shadowRoot.querySelector('.player-list');
      players.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = player;
        playerListContainer.appendChild(listItem);
      });
    }
  }
  
  customElements.define('team-assortment', TeamAssortmentComponent);
  