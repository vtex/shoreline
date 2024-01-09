# bin/bash
names=($GIT_USERS)
emails=($GIT_EMAILS)

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
