---
title: Git Recipes
createdAt: 2019-01-02
description: Recipes for using command-line Git.
---

# {title}

> {description}

* [Axosoft - Learning Git](https://blog.axosoft.com/learning-git-repository/)
* [Oh shit, git!](http://ohshitgit.com/)
* [First Aid git](http://firstaidgit.io/#/)
* [Productive Git for Developers](https://egghead.io/courses/productive-git-for-developers)


## Check Status

Before doing anything else always run `git status`.

```bash
git status
```

## Initialize Repo

Create a repo in current folder

```bash
git init
```

## Branches

Create separate branches for any task/feature you begin. Then do your work and commits, pull and merge before merging the branch back into the master branch when all done.

```bash
git branch                 # Lists local branches. Current marked with asterisk
git branch branchname      # Create a new local branch
git branch -d branchname   # Delete branch
git branch -D branchname   # Delete branch forcefully
git checkout branchname    # Check out named branch
git checkout -b branchname # creates and checks out
```

Merge branches by first switching to the branch you want to merge **TO**. Then run git merge using the name of the **FROM** branch.

```bash
git checkout `master`
git merge `branchname`

```

## Stage files to be commited

```bash
git add file1 file2 file3...
git add .
git add -A | --all
git add '*.txt'
```

## Commit staged changes

Commit staged changes with a commit message

```bash
git commit -m "First commit"
```

## Undo

```
git checkout <filename> # Revert local changes back to latest commited ver
git reset <filename>    # remove change from staging area
git reset --hard head   # Clear uncommitted working dir changes
git reset head~         # Undo latest commit and put back in working dir
git reset --hard head~  # Undo latest commit completely
git reset head@{1}      # Undo last reset
```

## Remotes

```bash
git push -u origin master #Push master branch to origin and store params
git push
```
