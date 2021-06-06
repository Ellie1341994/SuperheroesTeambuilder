# Superheroes Teambuilder

## General

### Description
This application allows logged in users to find DC/Marver characters
and add them to their teams, check their stats and other miscellaneous informationa about them

### Note regarding NETWORK requests made within this App
In order to properly make requests for superheroes
A file named exactly superheroApiToken.ts
HAS to be inside the react/src folder
where YOUR_SUPERHERO_API_TOKEN MUST be replaced by a personal
token obtained from he following page https://superheroapi.com/

Example code that MUST be inside the file
```
const superheroApiToken: string = "YOUR_SUPERHERO_API_TOKEN";
export default superheroApiToken;
```
In case this file is not edited, an input to add one will be shown after
logging in

## Other
This Application was a Challenge to apply for alkemy.org mentorship
