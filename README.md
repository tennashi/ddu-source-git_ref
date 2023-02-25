# ddu-source-git_ref
`git_ref` source for `ddu.vim`

This source collects git refs (branchs and tags).

# Required
* [vim-denops/denops.vim](https://github.com/vim-denops/denops.vim)
* [Shougo/ddu.vim](https://github.com/Shougo/ddu.vim)
* [git/git](https://github.com/git/git)

# Supported actions
## `git_branch` kind
* `switch`: `git switch <branch_name>`
* `create`: `git branch <branch_name>`
* `tag`: `git tag <tag_name> <branch_name>`
* `delete`: `git branch --delete <branch_name>`

## `git_tag` kind
* `switch`: `git switch --detach <tag_name>`
* `create`: `git tag <tag_name>`
* `delete`: `git tag --delete <tag_name>`

# Example
```vim
" Set default kind action.
call ddu#custom#patch_global({
\ 'kindOptions': {
\   'git_tag': {
\     'defaultAction': 'switch',
\   },
\   'git_branch': {
\     'defaultAction': 'switch',
\   },
\ },
\}

" Use git_ref source.
call ddu#start({'ui': 'ff', 'sources': [{'name': 'git_ref'}]})
```
