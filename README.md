# LatexConverter

Converts copied plaintext latex into the latex typeset language

## Change conversion symbols

The plaintext to latex conversion table can be edited in website/symbols with the following format \<plain text
symbol\>:\<latex command\>

## To compile from source

Depedencies

```
sudo pacman -S python-flask
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