# Contact Management System

This is a Contact Management System Web Application.

## Table of contents

- [General info](#general-info)
- [Setup](#setup)
- [Software details](#Software-details)
- [Status](#status)
- [Contact](#contact)

## General info

I developed this Contact Management System Full Stack Application in order to familiarize myself with CRUD RESTful APIs.

## Setup

In order to build and run this web application, I suggest using the following docker commands.

> docker build -t contact-management-system_front-end ./FrontEnd/
> 
> docker build -t contact-management-system_api ./API/
> 
> docker-compose -p contact-management-system up

You can then visit <http://localhost/> to view the web application.

_\* The two docker build commands only need to be ran once. After the images are created, you can simply run the docker-compose command._

## Software details

### Front-end

Library: React 17.0.2 <br/>
JRE: Node 10.0 <br/>

### API

Language: Java 11 <br/>
Project: Maven 3.8.2 <br/>
Spring Boot: 2.5.5 <br/>
Packaging: Jar <br/>
Database: PostgreSQL 9.6 <br/>

### Other

Container Management Framework: Docker <br/>
Hosting Platform: Personal Ubuntu Server <br/>

## Status

Version: 1.0.0 <br/>
Project is: _in progress_

## Contact

Created by [@cameronmathis](https://github.com/cameronmathis/) - feel free to contact me!
