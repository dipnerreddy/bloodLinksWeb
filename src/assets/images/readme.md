git checkout -b new-branch-name
git add .
git commit -m "Initial commit on new branch"
git push -u origin new-branch-name

# Make your changes...

git add .
git commit -m "Description of changes"

git checkout main
git pull origin main
git merge new-branch-name
git push origin main
