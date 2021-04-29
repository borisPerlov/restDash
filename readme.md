
1.create a new project in azure devops cloud
2.open terminal of project and connect it to azure repos 
    git init    ------ Initialize the local directory as a Git repository
    git add .   ------ Add the files in your new local repository. This stages them for the first commit.
    git commit -m "First commit"  ----- Commit the files that you've staged in your local repository
    git remote add origin <remote azure repos url> ---- add the URL for the remote repository where your local repository will be pushed
    git remote -v --- Verifies the new remote URL
    git push origin master ---- Push the changes in your local repository to GitHub if there is a remote branch called master (or main if that's what you're using)

