# LatexConverter

Converts copied plaintext latex into the latex typeset language

## Change conversion symbols

The plaintext to latex conversion table can be edited in website/symbols with the following format \<plain text
symbol\>:\<latex command\>

## To compile from source

Convert flask app to compiled application

```
cd website
pyinstaller -w --onefile --add-data "templates:templates" --add-data "replaceLatexSymbols.py:replaceLatexSymbols.py" --add-data "symbols:symbols" --distpath .. app.py
cd ..
```

Compile electron application for pacman format(arch only)
(can be changed to deb or appimage by changing the package.json build.linux.target.target to deb or AppImage
respectively)

```
npm run app:dist
```

Install application

```
cd dist
sudo pacman -U LatexConverter-[version].pacman
```

## To run

```
latexconverter
```