# bin/bash
names=("anitavincent" "lucasaarcoverde" "marcelovicentegc" "matheusps")
emails=("anita.paes@vtex.com" "lucas.nascimento@vtex.com" "marcelo.cardoso@vtex.com" "matheus.procopio@vtex.com")

randomIndex=$(( RANDOM % ${#names[@]} ))
randomName=${names[randomIndex]}
randomEmail=${emails[randomIndex]}

if [ -n "$LOCAL_TEST" ]; then
    echo $randomName
    echo $randomEmail
    exit 0
fi

git config --global user.name $randomName
git config --global user.email $randomEmail
