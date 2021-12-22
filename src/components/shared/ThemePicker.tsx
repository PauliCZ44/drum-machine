import React, { useState } from 'react';

export default function ThemePicker() {
  const [theme, settheme] = useState('forest');
  const themes = ['forest', 'dark', 'light', 'emerald', 'synthwave'];

  function changeTheme(theme: string) {
    settheme(theme);
    document.getElementsByTagName('html')[0].setAttribute('data-theme', theme);
  }

  console.log(theme);
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="m-1 btn btn-sm btn-outline">
        Theme
      </div>
      <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40">
        {themes.map((t) => (
          <li onClick={(e) => changeTheme(t)}>
            <a>{`${t[0].toUpperCase()}${t.slice(1).toLowerCase()}`}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
