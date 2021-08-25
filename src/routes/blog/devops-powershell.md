---
title: About Powershell
createdAt: 2019-04-25
description: An introduction to Powershell
---
# {title}

> {description}


#### Resources

* [Official Docs](https://docs.microsoft.com/en-us/powershell/)
* [Powershell Newbie](https://www.powershellnewbie.com/resources.html)

## Running Commands - Cmdlets

Four types:

* Windows native
* Aliases
* Script
* Cmdlets

## Dicoverability

Update the help system: `update-help -force`
Then, use the `get-help` command: `get-help *process*`

`get-verb` lists available verbs for cmdlets
`get-help about_*` list all about help files
`get-help get-process -detailed` detailed help
`get-help get-process -full` like detailed but with full info on params etc. Can be useful for debugging.

* `-Detailed` List command in detail
* `-showWindow` open in separate window
* `-online` open in browser


## Cmdlet Syntax

```
Get-Service -Param arg -param -param arg,arg
Get-Service [[-Name] <String[]>]
```

* Brackets around param means Name param is optional
* Brackets around param and args means arg is positional meaning you could give oly args.
* `<String[]>` - Type of param and brackets indicate comma-separated list like "bits, bfe"
* Use double quotes around params containing spaces
* Using aliases

```
get-service -name bits, bfe
get-service bits, bfe
get-service -displayName "Application Identity"
gsv bits, bfe

get-alias ps
```

When writing scripts always use param names and avoid using aliases for code readability and maintainability. `get-alias gsv`. To explore a command say `ps -c dc` you can start by issuing `get-alias ps` to find out what command it is, then get help for the command `get-help get-process -Detail`. Also it can figure out that `-c` is parameter `computer-name` because no other available param starts with a `c`.

## Extending Powershell

Usually when installing tools for Exchange or Sharepoint they typically also add powershell Cmndlets (Snap-ins or modules) that can be enabled and used.

Microsoft Management Control - mmc
File - Add/Remove Snap-in

* [Remote Server Administration Tools for Windows 10](https://www.microsoft.com/en-us/download/confirmation.aspx?id=45520)

```bash
get-help *snapin* Displays snap-in commands
Get-PSSnapin displays currently available  snapins
Get-PSSnapin -Registered displays installed snapins
Add-PSSnapin -Name *exch*
```

### Modules

* `get-help *module*`

```bash
Get-Module - list loaded modules
Get-Module -ListAvailable list available modules
Import-Module - Import module for using its cmdlets

```






