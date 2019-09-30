
# Kids Cooking Paradise
https://kidscookingrepo.herokuapp.com/home
https://github.com/kstan8668/kidscookingrepo

Kids Cooking Paradise (KCP) is a mobile responsive web database-driven online cookbook, targeting our children to utilize and apportion within their kids’ community. This online cookbook consisted a few benefits as to experience of engendering repasts which can avail to build their aplomb to cook their own repast as following:

# UX Design
Utilizer Experience
This Kids Cooking Paradise online cookbook platform is for the kids/children who want to hand on to engender and experience difference types of cooking as following:
Utilizer story
* As a kids, I optate to learn to cook
* As a Kids, I able to integrate incipient recipe and all detail to apportion to cook 
* As an admin, I optate it facile to control everything
* As an admin, I optate to have a one hub for kids to communicate and a place to learn incipient Adeptness
* As admin, a hub to utilize cooking to build kids confident and incipient languages 

The best way to avail kids to achieve the above:

There are a few ways to achieve to prosper as parent can organize a party to endeavour their incipient recipes. Utilize technologies like whatapp, FaceBook, Instagram and Wechat, to get their gregarious media friend to contribute. Update what is the best pabulum they culled and interest. The online products will keep overlap and update every 12 recipes. Database will store in the Backend MongoDB. This result the site will be lighter and facile to manage. Search function able to find any history on the back end. 

# Subsisting Features
* Feature 1 - sanctions kids to register, authenticate, by having them fill out authenticate form
* Feature 2 - sanctions kids to integrate incipient recipe, edit recipe and efface it
* Feature 3 - sanctions kids to have a hub of relishing sharing their own victuals recipe

# Features
* Authentication authenticate and out 
* Authentication is the process of determining whether someone or something is, in fact, who or what it declares itself to be. * Authentication technology provides access control for systems by checking to optically discern if a utilizer's credentials match the credentials in a database of sanctioned users or in a data 

## Integrate Recipe
A utilizer is able integrate incipient recipe to the database and ergo the site utilizing MongoDBs insert-one() function.The upvotes section is not visually perceived on the form, a JavaScript function is utilized to engender a number between 0-10000 and applied to the recipe. This is to show how the functionality would work with a live website.

## Edit Recipe
A utilizer is able to make edits to recipes found on the website. MongoDB allocates each ingression into an accumulation and utilizer has made the obligatory changes they submit the form and MongoDB's update() method to update the recipe.

## Find Recipe
Once a utilizer culls a recipe from the abode-page the MongoDB find() method utilizes the object ID to find the requested recipe. The utilizer is then taken through to the recipe's page where information from the database is presented in a readable format to the utilizer.

## Expunge Recipe
Each recipe has a 'Efface Recipe' button found at the bottom of the page. Once clicked it utilizes the abstract() mongoDB method.

## Manage Cuisines
Each recipe has a cuisine, and the utilizer is able to integrate, edit or efface cuisines found on the website. This is an entirely different amassment that has a relationship with the recipes accumulation.

## Filter Recipes
This functionality sanctions a utilizer to narrow down the recipes and tailor the filter to their personal predilections. The utilizer is able to filter by cuisine by Kids repast, Western and middle East arduousness or sort the recipes by upvotes. This feature queries the database for each different parameter and returns a list only including the requested parameter. The sort by number of upvotes utilizes the sort() method to sort by the upvotes field.

# Technologies Used
* BootStrap 4
* Google Fonts
* JavaScript
* CSS
* HTML
* MongoDB
 
# Features Left to Implement
* Implement a machine learning model to recommend incipient recipe for a concrete utilizer
* Implement recipe game to entire platform
* Implement video recipe online
* Implement “Live” cooking show on certain time

# Simple Navigation & Facilitate of Use
Welcome utilizer- When utilizer authenticate, the personalise name  incipient will be there to feel the ownership of his/her site
Integrate recipe – Integrate the best recipe they have cooked, experienced and optate to apportion
Logout – Amicable out upon culminated 

# Information Architecture
Simple to make it expeditious authenticate 

## Responsive Design
This is mobile responsive on PC, android and IOS

## Image Presentation
Expeditious and sharp images

## Colour scheme and typography
Orange yellow to make it sleek and alluring 

# Testing
##  Manually Testing on Desktop, Android & OS mobile and provide as much detail as is germane. A concretely utilizable form for describing your testing process is via scenarios, such as:

## Brower Icon 
Engendered a Brower icon for this to make it difference from others

## Authenticate Page
Go to the "Authenticate" page
To submit be a utilizer and sanction to integrate, edit, delate and apportion recipe

## Animation Logo
On the top left, engendered and animation logo to make the whole website alive and intriguing

# Testing 
## Homepage
Go to compose and endeavor to submit empty fields and ascertain WTForms InputRequired() is working
Ascertain that the arbitrary number JS function for upvotes is being engendered when integrating incipient recipe.

Ascertain the integrating of incipient ingredients and steps rows through JavaScript is working and that they are engendering the correct names within the documents in MongoDB.
Ascertaining that the cull fields are being populated with all of the correct culls
Ascertain that the abstraction of incipiently engendered rows for ingredients/preparation steps is possible and ascertain that all of the rows are unable to be expunged with feedback for utilizer if they endeavor.

## Testing Edit Recipe Form
Ascertain that the form is being populated with the correct data from the MongoDB document when editing recipe.
Ascertain that integrating/abstracting ingredient/preparation step rows is not causing an issue with clashing names when submitted
Ascertain a recipe is able to be updated more than once without any bugs occuring (such as fields going missing or name clashes causing issues)
Test that the cull fields are engendering the correct options.

## Other Tests
Ascertain the 'expunge recipe' functionality is abstracting the correct document.
Ascertain that incipiently integrated cuisines become available on the integrate recipe form.
Ascertain abstracting a cuisine that recipes have as their cuisine doesn't cause the website to crash.
Test responsiveness of each page on different screen sizes and ascertain all elements stay readable.

## User Testing on all pages
User Testing on all pages and proof of pages place in Proof of test slide for reference

# Deployment
GitHub Pages or Heroku process went through to deploy the project as a hosting platform provided all details of the distinctions between the deployed version and the development version, if any, including:
environment Different variables (Heroku Config Vars)

# Credits
Content
Content from realfood.tesco.com 
# Media
Photos by https://www.pexels.com/
Recipe images from : https://realfood.tesco.com

# Acknowledgements
My church kids inspired for this project to me
Recipe : https://realfood.tesco.com


