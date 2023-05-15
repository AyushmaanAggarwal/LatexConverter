# LatexConverter
Converts copied plaintext latex into the latex typeset language

## To compile from source
Convert flask app to compiled application
```
cd website
pyinstaller -w --onefile --add-data "templates:templates" --add-data "replaceLatexSymbols.py:replaceLatexSymbols.py" --add-data "symbols:symbols" --distpath .. app.py
cd ..
```

Compile electron application for pacman format(arch only)
(can be changed to deb or appimage by changing the package.json build.linux.target.target to deb or AppImage respectively)
```
yarn app:dist
```

Install application
```
cd dist
sudo pacman -U LatexConverter-[version].pacman
```