import { Events } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";

export class SportHeaderElement extends LitElement {
  render() {
    return html`
      <div class="header__container">
        <a href="#home" class="logo">NBA Odds</a>
        <nav class="nav">
          <button class="nav__toggle" aria-label="Toggle navigation">
            <span class="nav__toggle-icon"></span>
          </button>
          <ul class="nav__list">
            <li class="nav__item">
              <a href="#home" class="nav__link">Home</a>
            </li>
            <li class="nav__item">
              <a href="#projected__awards" class="nav__link"
                >Projected Awards</a
              >
            </li>
            <li class="nav__item">
              <a href="#top__players" class="nav__link">Top Players</a>
            </li>
            <li class="nav__item">
              <a href="#rising" class="nav__link">On The Rise</a>
            </li>
          </ul>
          <label @change=${toggleDarkMode}>
            <input type="checkbox" autocomplete="off" />
            Dark mode
          </label>
        </nav>
      </div>
    `;

    function toggleDarkMode(ev: InputEvent) {
      const target = ev.target as Checkbox;
      const checked = target.checked;

      Events.relay(ev, "dark-mode", { checked });
    }
  }

  static styles = css`
    /* TODO: Style the header here */
    .header {
      background-color: #fff;
      padding: 20px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header__container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }

    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      text-decoration: none;
    }

    .nav__toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
    }

    .nav__toggle-icon {
      display: block;
      width: 24px;
      height: 2px;
      background-color: #333;
      position: relative;
    }

    .nav__toggle-icon::before,
    .nav__toggle-icon::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: #333;
      position: absolute;
      left: 0;
    }

    .nav__toggle-icon::before {
      top: -6px;
    }

    .nav__toggle-icon::after {
      bottom: -6px;
    }

    .nav__list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav__item {
      margin-left: 20px;
    }

    .nav__link {
      font-size: 16px;
      color: #333;
      text-decoration: none;
      transition: color 0.3s;
    }

    .nav__link:hover {
      color: #007bff;
    }

    @media screen and (max-width: 768px) {
      .nav__toggle {
        display: block;
      }

      .nav__list {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #fff;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .nav__item {
        margin: 10px 0;
      }

      .nav__link {
        font-size: 18px;
      }

      .nav.active .nav__list {
        display: flex;
      }
    }
  `;
}
