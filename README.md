<div align="center">

<img src="https://user-images.githubusercontent.com/11808903/38679946-537aa072-3e65-11e8-9a20-5b8a256295fd.png" width="125"/>

<h1>GUC Hub</h1>

<p>Elegantly manage your GUC academic life</p>

</div>

## Key technologies 
- **React Native Web**: for rendering on both web and native
- **Apollo**: for data fetching and state management
- **Styled Components**
- **Webpack**: for bundling web assets 

## Development on Web
```bash
$ yarn web:dev
```
## Development on Native(expo)
```bash
$ yarn native:dev
$ yarn native:run-ios 
$ yarn native:run-android 
```

## Known Issues
- Webpack doesn't generate correct source maps on web
- You will encounter some problems if you try to run the app on iOS or Android, the code is not (yet) optimised to run on there

## License

MIT License
