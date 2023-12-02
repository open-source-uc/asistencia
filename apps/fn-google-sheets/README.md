# Funciones para Google Spreadsheets

- [Código de ejemplo](https://github.com/googleworkspace/apps-script-samples/tree/main/sheets/customFunctions)
- [Documentación](https://developers.google.com/apps-script/guides/sheets/functions)
- [Docs de clasp](https://github.com/google/clasp#readme)
- [Docs para desarrolladores de clasp](https://github.com/google/clasp/tree/master/docs)

## Uso

```bash
pnpm run dev
```

## Creación del proyecto

```bash
# Instalación del generador
npm install -g @google/clasp

# Iniciar sesión
clasp login

# Uso del generador
clasp create --type sheets
```

Eso deberá generar:
- Un proyecto de AppScript en la nube.
- Un archivo `.clasp.json` con los datos del proyecto.
- Una hoja de calculo en blanco de pruebas.
