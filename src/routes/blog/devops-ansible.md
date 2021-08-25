---
title: Basics of Ansible
createdAt: 2019-04-11
description: An introduction to using Ansible
---

# {title}

> {description}


[Ansible](https://docs.ansible.com/) is an automation and orchestration engine.
* Simple automation language that can perfectly describe IT application infrastructure in Ansible Playbooks
* An automation engine that runs Ansible Playbooks
* Ansible Tower is an enterprise framework for controlling, securing and managing your Ansible automation wit a UI and a Restful API
* It's simple, powerful and agentless (OpenSSH & WinRM)
* There are over 450 [Ansible-provided modules](https://docs.ansible.com/ansible/latest/modules/modules_by_category.html) to automate your environment.

## Resources

* [Documentation](https://docs.ansible.com/)
* [Jira Module](https://docs.ansible.com/ansible/latest/modules/jira_module.html)

## Install

### Host install

```bash
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo apt-add-repository --yes --update ppa:ansible/ansible
$ sudo apt-get install ansible
```

### Target Machines

* Python and OpenSSH/Powershell
* apt-get install python-minimal -no-install-recommends
* Connect via SSH and accept the host key --accept-hostkey

### Config

* Unix-style. First ANSIBLE_CFG environment variable
* ansible.cfg in current dir
* User home dir ~./.ansible.cfg
* Default settings - /etc/ansible/ansible.cfg Have a look for available settings!

## Inventories

Ansible cannot do anything without the hosts inventory file. It contains a list of (grouped) of hosts that Ansible can work against. It uses ini-file syntax.

Default is in `/etc/ansible/hosts`

```
[allservers]
10.0.3.107
10.0.3.35

[web]
10.0.3.107
...
```
Add a similarly structured inventory file in your working folder

`ansible-playbook -i inventory`

## Using Ansible

* Run ad-hoc commands: `ansible <inventory> -m`
* Run playbooks: `ansible-playbook`
* Use Automation Framework: [Ansible Tower](https://www.ansible.com/products/tower)

### Commands

Use for running one-off tasks

```bash
ansible 127.0.0.1 -m ping -u root                       # ping a host
ansible web -m ping -u root -i hosts                    # ping all hosts grouped under web in inventory hosts 
ansible allmachines -a "free -m" -i hosts -u root       # Run raw command
ansible allmachines -a "dpkg -l | grep nginx" -i hosts -u root
ansible web -a "apt-get update" -i hosts -u root
ansible web -a "apt-get -y install nginx" -i hosts -u root # install nginx on all web hosts
ansible web -m service -a "name=nginx state=restarted" -i hosts -u root
```


### Playbooks

* A **Playbook** contains **plays**
* Plays contain **tasks**
* Tasks call **modules**
* Tasks run **sequentially**
* **Handlers** are triggered by **tasks**,
and are run once, at the end of plays
* An ansible playbook is a collection of tasks
* Plain-text YAML files describing desired state
* Human and machine readable
* Can build entire application environments

Altering the way it runs:

```
with_items, fail_when, changed_when, until, ignore_errors
```


## Variables

* Playbooks
* Files
* Inventories (group vars, host vars)
* Command line
* Discovered variables (facts)
* Ansible Tower

## Modules

[Ansible modules](https://docs.ansible.com/ansible/latest/modules/modules_by_category.html) implement different tasks you can use to automate.

`module: directive1=value directive2=value`

## Roles

An Ansible Role is a fully self-contained playbook. Galaxy is a community for these.


