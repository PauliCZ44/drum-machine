import React, { useState } from 'react';

export default function ThemePicker() {
  const [theme, settheme] = useState('forest');
  const themes = ['forest', 'dark', 'light', 'emerald', 'synthwave'];

  const themesIcons = new Map();
  themesIcons.set('forest', '🌲');
  themesIcons.set('dark', '🌚');
  themesIcons.set('light', '🌝');
  themesIcons.set('synthwave', '🌃');
  themesIcons.set('emerald', '✳️');

  function changeTheme(theme: string) {
    settheme(theme);
    document.getElementsByTagName('html')[0].setAttribute('data-theme', theme);
  }

  console.log(theme);
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="m-1 btn btn-sm btn-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-4 h-4 stroke-current md:mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          ></path>
        </svg>
        <span> Theme</span>
      </div>
      <ul
        tabIndex={0}
        className="p-2 shadow-lg border border-slate-300 menu dropdown-content bg-base-200 rounded-box w-40"
      >
        {themes.map((t) => (
          <li onClick={(e) => changeTheme(t)} key={t}>
            <a>
              <span className="pr-3">{themesIcons.get(t)}</span>
              {`${t[0].toUpperCase()}${t.slice(1).toLowerCase()}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

<ul class="p-4 menu compact">
  <li>
    <a tabindex="0" data-set-theme="light" data-act-class="active">
      🌝  light
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="dark" data-act-class="active">
      🌚  dark
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="cupcake" data-act-class="active">
      🧁  cupcake
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="bumblebee" data-act-class="active">
      🐝  bumblebee
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="emerald" data-act-class="active">
      ✳️  Emerald
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="corporate" data-act-class="active">
      🏢  Corporate
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="synthwave" data-act-class="active">
      🌃  synthwave
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="retro" data-act-class="active">
      👴  retro
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="cyberpunk" data-act-class="active">
      🤖  cyberpunk
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="valentine" data-act-class="active" class="active">
      🌸  valentine
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="halloween" data-act-class="active">
      🎃  halloween
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="garden" data-act-class="active">
      🌷  garden
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="forest" data-act-class="active" class="">
      🌲  forest
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="aqua" data-act-class="active">
      🐟  aqua
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="lofi" data-act-class="active">
      👓  lofi
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="pastel" data-act-class="active">
      🖍  pastel
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="fantasy" data-act-class="active">
      🧚‍♀️  fantasy
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="wireframe" data-act-class="active">
      📝  Wireframe
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="black" data-act-class="active">
      🏴  black
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="luxury" data-act-class="active">
      💎  luxury
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="dracula" data-act-class="active">
      🧛‍♂️  dracula
    </a>
  </li>
  <li>
    <a tabindex="0" data-set-theme="cmyk" data-act-class="active">
      🖨  CMYK
    </a>
  </li>
</ul>;
