<h1 align="center">toast-munisma</h1>

<p align="center" width="300">
   <img align="center" width="200" src="https://i.ibb.co/V3tMCZn/municipio.png" />
</p>
<br/><br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" title="License: MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg">
  </a>
  <a href="https://img.shields.io/npm" title="npm">
    <img src="https://img.shields.io/npm/v/react.svg?style=flat)">
  </a>
  <a href="https://www.npmjs.com/package/typescript)" title="npm version">
    <img src="https://badge.fury.io/js/typescript.svg">
  </a>
</p>

<p align="center">
  Toaster 
</p>

###

Notificaciones personalizadas basadas en **react-hot-toast**

<br/>

---

<br/>

### Motivación

---

<p>La librería se encarga del manejo de notificaciones en respuesta al cliente.</p>
<p>Para que se muestren las notificaciones en la UI se debe renderear en el nivel 
más alto del arbol de la aplicación el componente Toaster.</p>
<p>El hook debe ser invocado en la respuesta de las peticiones a la API.</p>
<p>Tiene cuatro niveles de notificación:</p>
<ul>
    <li>loading</li>
    <li>success</li>
    <li>info</li>
    <li>error</li>
</ul>

<p>
    Para el manejo automatizado se espera recibir un objeto stateRequest 
    el cual debe contener dos propiedades: <b>status</b> y <b>message</b>.
</p>

<br/>
<p>
    Todas las propiedades son opcionales y deben ser seteadas a 
    la hora de invocar el hook, por defecto se encuentran desactivadas.
</p>

<ul>
    <li>timer: 3000</li>
    <li>loadingShow: false</li>
    <li>loadingMessage: 'Loading...'</li>
    <li>successShow: false</li>
    <li>infoShow: false</li>
    <li>errorShow: false</li>
</ul>

<br/>
<p>
    Todas las propiedades son opcionales y deben ser seteadas a 
    la hora de invocar el hook, por defecto se encuentran desactivadas.
</p>

<br/>
<p>
    Tambien soporta el manejo manual de notificaciones mediante las siguientes propiedades:
</p>
<ul>
    <li>loadingToastShow: render manual</li>
    <li>loadingToastDismiss: dismiss manual</li>
    <li>errorToastShow: render manual</li>
    <li>infoToastShow: render manual</li>
    <li>setToastState: setter manual</li>
    <li>toastState: estado del toast</li>
</ul>

<br/>

---

##### _Ejemplo de uso del hook_

Notificaciones automáticas.

```js
import { Footer, NavBar } from 'components';
import { NotifyToast } from 'toast-munisma';

export const BasicLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <NavBar />

      <NotifyToast />  <------ Componente del Toaster

      {children}
      <Footer />
    </>
  );
};
```

```js
import { useSysGetData } from 'usesysgetdata';
import { AuthorityResponse } from '../interfaces';

export const Authorities = () => {
  const { isLoading, dataIsReady, result, stateRequest } =
    useSysGetData <
    AuthorityResponse >
    {
      fn: 'institucional_Listar_Autoridades',
      auto: true,
    };
  useMessageToast({
    stateRequest,
    loadingMessage: 'Buscando datos...',
    loadingShow: true,
    infoShow: true,
    errorShow: true,
  });

  if (isLoading) return <p>Loading...</p>;

  if (!dataIsReady) return <p>No existen datos para mostrar.</p>;

  return <pre>{JSON.stringify(result)}</pre>;
};
```

<br/>

---

#### Desarroladores

- [Esteban Menendez](https://github.com/ejmenendez)
- [Martín Nicolás Paneblanco](https://github.com/pmNiko)
