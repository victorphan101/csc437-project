import{i as h,s as $,x as o,d as w,a as pe,V as E,O as V,e as ee,b as T,f as te,h as q,c as ue,g as he,_ as ge}from"./lit-element-19d16ef1.js";import{n as d}from"./property-4e000f11.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(i){return d({...i,state:!0,attribute:!1})}var me=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,W=(i,e,a,r)=>{for(var t=r>1?void 0:r?fe(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&me(e,a,t),t};class _ extends ${constructor(){super(...arguments),this.color="white"}render(){return o`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      >
        ${this.src?"":this.initial||""}
      </div>
    `}}_.styles=h`
    :host {
      display: contents;
      --avatar-backgroundColor: var(--color-accent);
      --avatar-size: 100px;
    }
    .avatar {
      grid-column: key;
      justify-self: end;
      position: relative;
      width: var(--avatar-size);
      aspect-ratio: 1;
      background-color: var(--avatar-backgroundColor);
      background-size: cover;
      border-radius: 50%;
      text-align: center;
      line-height: var(--avatar-size);
      font-size: calc(0.66 * var(--avatar-size));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
  `;W([d()],_.prototype,"color",2);W([d()],_.prototype,"src",2);W([d()],_.prototype,"initial",2);var ve=Object.defineProperty,be=Object.getOwnPropertyDescriptor,ae=(i,e,a,r)=>{for(var t=r>1?void 0:r?be(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&ve(e,a,t),t};class I extends E{constructor(){super("sport:model"),this.username="anonymous",this._authObserver=new V(this,"sport:auth")}get player(){return this.model.player}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.username!==this.username&&(this.username=e.username,this.dispatchMessage(["player/select",{userid:this.username}]))})}render(){const{avatar:e,name:a,nickname:r,userid:t,color:n}=this.player||{},s=(r||a||t||"?").slice(0,1),l=`/app/player/${t}/edit`;return o`
      <header>
        <h1><a href="/app">Sports</a></h1>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, ${this.username}</slot>
          </a>
          <ul>
            <li>
              <player-avatar
                color=${n}
                src=${e}
                initial="${s}"></player-avatar>
            </li>
            <li><h3>${a||r||t}</h3></li>
            <li>
              <label @change=${ye}>
                <input type="checkbox" autocomplete="off" />
                Dark mode
              </label>
            </li>
            <li>
              <a href=${l}>Edit Profile</a>
            </li>
            <li>
              <a href="#" @click=${$e}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
    `}}I.uses=w({"drop-down":pe.Element,"player-avatar":_});I.styles=h`
    :host {
      display: contents;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    header {
      grid-column: start / end;
      margin: 0 calc(-0.5 * var(--page-grid-gap));
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      /* flex-wrap: wrap;
        gap: var(--size-spacing-xlarge); */
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
    }
    a[href] {
      color: var(--color-link-inverted);
    }
    drop-down a[href]:not([slot="actuator"]) {
      color: var(--color-link);
    }
    h1 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-xxlarge);
      font-style: oblique;
      line-height: 1;
      font-weight: var(--font-weight-bold);
    }
    h1 a[href] {
      text-decoration: none;
      color: inherit;
    }
    h3 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      font-style: oblique;
      width: min-content;
    }
    ul {
      list-style: none;
      padding: var(--size-spacing-medium);
    }
  `;ae([d()],I.prototype,"username",2);ae([b()],I.prototype,"player",1);function ye(i){const a=i.target.checked;ee.relay(i,"dark-mode",{checked:a})}function $e(i){ee.relay(i,"auth:message",["auth/signout"])}const we={},De=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],O=i=>{const e=(typeof i=="string"?new Date(i):i)||new Date,a=De[e.getUTCMonth()];return`${e.getUTCDate()} ${a}`};function Y(i){const e=new Date(Date.parse(i)),a=e.getUTCDate(),r=e.getUTCMonth(),t=e.getUTCFullYear();return new Date(Date.UTC(t,r,a))}function A(i){const e=i;let a=i;return a.startDate=Y(e.startDate),a.endDate=e.endDate?Y(e.endDate):void 0,a}function xe(i,e,a){switch(i[0]){case"player/save":_e(i[1],a).then(t=>e(n=>({...n,player:t}))).then(()=>{const{onSuccess:t}=i[1];t&&t()}).catch(t=>{const{onFailure:n}=i[1];n&&n(t)});break;case"player/select":ze(i[1],a).then(t=>e(n=>({...n,player:t})));break;case"tour/index":Ce(a).then(t=>e(n=>({...n,tourIndex:t})));break;case"tour/select":Pe(i[1],a).then(t=>e(n=>({...n,tour:t})));break;case"tour/save-destination":Oe(i[1],a).then(t=>{const{index:n}=i[1];e(s=>{const l=s.tour;if(l&&t){let c=l.destinations.slice();return c.splice(n,1,t),{...s,tour:{...l,destinations:c}}}else return s})}).then(()=>{const{onSuccess:t}=i[1];t&&t()}).catch(t=>{const{onFailure:n}=i[1];n&&n(t)});break;default:const r=i[0];throw new Error(`Unhandled message "${r}"`)}}function _e(i,e){return fetch(`/api/players/${i.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...T.headers(e)},body:JSON.stringify(i.player)}).then(a=>{if(a.status===200)return a.json();throw new Error(`Failed to save profile for ${i.userid}`)}).then(a=>{if(a)return a})}function ze(i,e){return fetch(`/api/player/${i.userid}`,{headers:T.headers(e)}).then(a=>{if(a.status===200)return a.json()}).then(a=>{if(a)return console.log("Player:",a),a})}function Ce(i){return fetch("/api/tours",{headers:T.headers(i)}).then(e=>{if(e.status!==200)throw"Failed to load index of tours";return e.json()}).then(e=>{if(e){const{data:a}=e;return a.map(r=>A(r))}})}function Pe(i,e){return fetch(`/api/tours/${i.tourid}`,{headers:T.headers(e)}).then(a=>{if(a.status===200)return a.json()}).then(a=>{if(a){console.log("Tour:",a);let r=A(a);return r.destinations=r.destinations.map(A),r.transportation=r.transportation.map(A),r}})}function Oe(i,e){return fetch(`/api/tours/${i.tourid}/destinations/${i.index}`,{method:"PUT",headers:{"Content-Type":"application/json",...T.headers(e)},body:JSON.stringify(i.destination)}).then(a=>{if(a.status===200)return a.json();throw new Error(`Failed to save destination ${i.index}`)}).then(a=>{if(a)return A(a)})}var Ee=Object.defineProperty,Te=Object.getOwnPropertyDescriptor,Se=(i,e,a,r)=>{for(var t=r>1?void 0:r?Te(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Ee(e,a,t),t};const je={air:"icon-airplane",bike:"icon-bike",boat:"icon-train",bus:"icon-train",metro:"icon-train",train:"icon-train",walking:"icon-train",tour:"icon-train"};class G extends ${render(){const e=`/icons/transportation.svg#${je[this.type||"tour"]}`;return o`
      <div class="card">
        <svg class="icon">
          <use href=${e} />
        </svg>
        <h3><slot>Name of Excursion</slot></h3>
      </div>
    `}}G.styles=h`
    :host {
      display: block;
      container: card / inline-size;
      height: 100%;
    }
    .card {
      display: flex;
      flex-direction: column;
      border: var(--line-weight-fine) solid var(--color-accent);
      padding: var(--size-spacing-medium);
      height: 100%;
    }
    @container card (min-width: 15rem) {
      .card {
        flex-direction: row;
      }
    }
    h3 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      font-style: oblique;
      margin: 0;
    }
    svg.icon {
      display: inline;
      fill: currentColor;
      height: var(--size-icon-large);
      width: var(--size-icon-large);
      vertical-align: middle;
      flex-shrink: 0;
    }
  `;Se([d()],G.prototype,"type",2);const z=h`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    line-height: 1.5;
  }
  img {
    max-width: 100%;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;class X extends ${render(){return o`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a href="${this.username}/edit" class="edit">Edit</a>
        </nav>
        <dl>
          <dt>Username</dt>
          <dd><slot name="userid"></slot></dd>
          <dt>Team</dt>
          <dd><slot name="team"></slot></dd>
          <dt>Position</dt>
          <dd><slot name="position"></slot></dd>
        </dl>
      </section>
    `}}X.styles=[z,ne,h`
      * {
        margin: 0;
        box-sizing: border-box;
      }
      section {
        display: grid;
        grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
        gap: var(--size-spacing-medium)
          var(--size-spacing-xlarge);
        align-items: end;
      }
      h1 {
        grid-row: 4;
        grid-column: value;
      }
      dl {
        display: grid;
        grid-column: key / end;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-xlarge);
        align-items: baseline;
      }
      dt {
        grid-column: key;
        justify-self: end;
        color: var(--color-accent);
        font-family: var(--font-family-display);
      }
      dd {
        grid-column: value;
      }
      ::slotted(ul) {
        list-style: none;
        display: flex;
        gap: var(--size-spacing-medium);
      }
    `];C([d()],X.prototype,"username",2);class k extends ${render(){return o`
      <section>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a class="close" href="../${this.username}">Close</a>
          <button class="delete">Delete</button>
        </nav>
        <mu-form .init=${this.init}>
          <label>
            <span>Username</span>
            <input disabled name="userid" />
          </label>
          <label>
            <span>Avatar</span>
            <input
              name="avatar"
              type="file"
              @change=${this._handleAvatarSelected} />
          </label>
          <slot name="avatar"></slot>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Team</span>
            <input name="team" />
          </label>
          <label>
            <span>Position</span>
            <input name="position" />
          </label>
        </mu-form>
      </section>
    `}_handleAvatarSelected(e){const r=e.target.files[0];new Promise((n,s)=>{const l=new FileReader;l.onload=()=>n(l.result),l.onerror=c=>s(c),l.readAsDataURL(r)}).then(n=>{this.dispatchEvent(new CustomEvent("player:new-avatar",{bubbles:!0,composed:!0,detail:n}))})}}k.uses=w({"mu-form":te.Element,"input-array":ue.Element});k.styles=[z,ne,h`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
    `];C([d()],k.prototype,"username",2);C([d({attribute:!1})],k.prototype,"init",2);class P extends E{constructor(){super("sport:model"),this.edit=!1,this.userid="",this.addEventListener("player:new-avatar",e=>{this.newAvatar=e.detail})}get player(){return this.model.player}attributeChangedCallback(e,a,r){super.attributeChangedCallback(e,a,r),e==="user-id"&&a!==r&&r&&(console.log("Profiler Page:",r),this.dispatchMessage(["player/select",{userid:r}]))}render(){const{color:e,avatar:a,name:r,userid:t,team:s,position:l}=this.player||{},c=(r||n||t||"?").slice(0,1),v=l.map(p=>o`
          <li>${p}</li>
        `),g=o`
      <player-avatar
        slot="avatar"
        color=${e}
        src=${this.newAvatar||a}
        initial=${c}></player-avatar>
    `;return this.edit?o`
          <player-editor
            username=${t}
            .init=${this.player}
            @mu-form:submit=${p=>this._handleSubmit(p)}>
            ${g}
          </player-editor>
        `:o`
          <player-viewer username=${t}>
            ${g}
            <span slot="name">${r}</span>
            <span slot="userid">${t}</span>
            <span slot="position">${l}</span>
            <span slot="team">${s}</span>
          </player-viewer>
        `}_handleSubmit(e){console.log("Handling submit of mu-form");const a=this.newAvatar?{...e.detail,avatar:this.newAvatar}:e.detail;this.dispatchMessage(["player/save",{userid:this.userid,player:a,onSuccess:()=>q.dispatch(this,"history/navigate",{href:`/app/player/${this.userid}`}),onFailure:r=>console.log("ERROR:",r)}])}}P.uses=w({"player-viewer":X,"player-editor":k,"player-avatar":_});P.styles=[z];C([d({type:Boolean,reflect:!0})],P.prototype,"edit",2);C([d({attribute:"user-id",reflect:!0})],P.prototype,"userid",2);C([b()],P.prototype,"player",1);C([b()],P.prototype,"newAvatar",2);var Qe=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,se=(i,e,a,r)=>{for(var t=r>1?void 0:r?Xe(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Qe(e,a,t),t};class H extends ${constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(e){const a=new CustomEvent("calendar-widget:select",{bubbles:!0,composed:!0,detail:{date:e&&Y(e)}});this.dispatchEvent(a)}_handleClear(){var r;const e=(r=this.shadowRoot)==null?void 0:r.querySelector("input:checked");e&&(e.checked=!1);const a=new CustomEvent("calendar-widget:clear",{bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){const e=new Date(this.startDate),a=new Date(this.endDate),r=Ze(e,a),t=n=>{const s={d:n.getUTCDate(),m:n.getUTCMonth()+1,y:n.getUTCFullYear(),day:n.getUTCDay()},l=({y:c,m:v,d:g})=>[c,v,g].join("-");return o`
        <label style="grid-column: ${s.day+1}">
          <span>${s.d}</span>
          <input
            type="radio"
            name="cal"
            value="${l(s)}" />
        </label>
      `};return o`
      <section>
        <fieldset
          @change="${n=>{const s=n.target;this._handleChange(s.value)}}">
          <h6>Su</h6>
          <h6>Mo</h6>
          <h6>Tu</h6>
          <h6>We</h6>
          <h6>Th</h6>
          <h6>Fr</h6>
          <h6>Sa</h6>
          ${r.map(t)}
        </fieldset>
        <button
          id="clear"
          @click="${()=>this._handleClear()}">
          Clear Selection
        </button>
      </section>
    `}}H.styles=h`
    * {
      margin: 0;
      box-sizing: border-box;
    }

    fieldset {
      display: grid;
      grid-template-columns: repeat(7, 2rem);
      gap: var(--size-spacing-small);
      justify-content: center;
      justify-items: streth;
      border: 0;
      padding: 0;
    }

    fieldset + button {
      margin-top: var(--size-spacing-large);
    }

    h6 {
      text-align: center;
    }

    label {
      position: relative;
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      padding: var(--size-spacing-small);
      white-space: nowrap;
      text-align: center;
      background-color: var(--color-background-control);
      border: var(--line-weight-fine) solid var(--color-accent);
      color: var(--color-text-control);
      font-size: var(--size-type-small);
      z-index: 0;
    }

    input {
      appearance: none;
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
    }

    input:checked {
      background: var(--color-accent);
    }

    label:has(input:checked) {
      background-color: var(--color-accent);
      color: var(--color-text-control-inverted);
    }

    button {
      display: block;
      margin: 0 auto;
    }
  `;se([d({attribute:"start-date",type:Date})],H.prototype,"startDate",2);se([d({attribute:"end-date",type:Date})],H.prototype,"endDate",2);function Ze(i,e){const a=e?e.getTime():i.getTime();let r=[],t=new Date(i);for(;t.getTime()<=a;)r.push(new Date(t)),t.setUTCDate(t.getUTCDate()+1);return r}var Ve=Object.defineProperty,et=Object.getOwnPropertyDescriptor,R=(i,e,a,r)=>{for(var t=r>1?void 0:r?et(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Ve(e,a,t),t};class U extends ${constructor(){super(...arguments),this.startDate="1970-01-01"}render(){const e=this.renderItem();return o`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${O(this.startDate)}
        </time>
        ${this.endDate?o`
              <time datetime=${this.endDate}>
                ${O(this.endDate)}
              </time>
            `:null}
      </span>
      ${e}
    `}renderItem(){return o`
      <slot></slot>
    `}}U.styles=h`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    :host(*) {
      display: contents;
    }
    #dates {
      display: flex;
      grid-column: 1;
      place-self: stretch;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      font-size: var(--size-type-small);
      font-family: var(--font-family-display);
      border-bottom: var(--line-weight-superfine) solid
        var(--color-accent);
    }
    #dates time {
      white-space: nowrap;
    }
    #dates time:first-child {
      font-weight: var(--font-weight-bold);
    }
    #dates time + time {
      visibility: hidden;
    }
    .destination {
      grid-column: 2/-1;
      background: var(--color-background-card);
      border-radius: var(--size-corner-medium);
      aspect-ratio: 16/9;
      background-size: cover;
      background-position: left 25%;
    }
    .transportation {
      display: grid;
      grid-column: 2/-1;
      grid-template-columns: subgrid;
      place-items: center;
    }
    .transportation > h3 {
      display: contents;
      font-size: var(--size-type-mlarge);
      font-style: oblique;
    }
    .destination > h3 {
      padding: 0 var(--size-spacing-medium);
    }
    .destination[style] > h3 {
      color: var(--color-text-inverted);
      text-decoration: none;
      font-weight: var(--font-weight-bold;);
      text-shadow: var(--shadow-dropdown);
      text-align: right;
    }
    .transportation > h3 > :first-child {
      justify-self: end;
    }
    .transportation > h3 > :last-child {
      justify-self: start;
    }
    ::slotted([slot="via"]) {
      font-weight: var(--font-weight-light);
      font-style: normal;
      font-size: 75%;
    }
    ::slotted([slot="via"])::before {
      display: inline;
      content: "via ";
    }
    h3 {
      font-family: var(--font-family-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      color: var(--color-accent);
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    svg.icon {
      display: inline;
      fill: currentColor;
      height: var(--size-icon-large);
      width: var(--size-icon-large);
      vertical-align: middle;
    }
