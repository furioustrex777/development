<!-- # Development

### Link to Deployed Website
If you used the stencil code, this is `https://<your GitHub username>.github.io/<name of your repository>`

### Goal and Value of the Application

### Usability Principles Considered

### Organization of Components

### How Data is Passed Down Through Components

### How the User Triggers State Changes

 -->
 
***********************************************
                 Development                    
***********************************************

*********************************************************************************************************************************************

This application was inspired by The Cookie and Crumble Page. This application allows you look at different baked items
such as pastries, cake, and bread, and find their recipes. Additionally, important nutritional information is provided
such as calories and dietary restrictions. Having easy access to this information, as well as being able to favorite items
and find them all at once easily, adds great value to users, saving time and effort looking for this information on their own.

*********************************************************************************************************************************************


*********************************************************************************************************************************************
Here is the link to the deployed web application:
https://furioustrex777.github.io/development/


*********************************************************************************************************************************************

For this implementation, I only had one component, a BakeryItem component, that holds and displays the information of the bakery item. This includes
the image, name, description, price, calories, dietary-restrictions, and the type of the bakery item. 

The main props that were used consisted of the items themselves, in order to use the information stored in them. They were passed into the 
bakeryItem components. Those components were then props to be added to the aggregator. Additionally, I utilized string variables,
I called name, in order to determine the functionality of different buttons, as different buttons did different things to the displayed lists
through sorting and filtering of different categories. 

In this implementation, I had six states. I had an options states, that acted as the list of items that is being displayed the items 
depending on the sorting, filtering, and if applicable, favoriting. I then had filters and filtersDiet lists that held what filters were active. 
Because these had different fields in the JSON file, I had two states holding these list of strings, I then had a sorted 
state that held what sort method would be maintained throughout the manipulation of the options(or display) list, and what to default to if there
are no items in the combinations of filters. Finally, I have a favs list that holds all the favorited items, and a favorite boolean, allowing
me two determine if a different functionality is needed if you are looking at your favorites or not. The content of these states and values
determines which bakeryItem component would be displayed.


*********************************************************************************************************************************************

Since people often look at the screen from left to right, I placed the filtering and sorting options on the left, creating a better 
hierarchy for the overall web-app. I then ordered those options in order of most likely to be used, while allowing those options to all
to remain visible throughout the whole process. For the BakeryItem component, I also formatted this component from left to right. 
I then centralized the more important information such as price and calories, and these values would stay in the same location no matter what helping with
learnability in addition to better usability. This is accompanied by easy access to the favorite aggregate feature and with clear 
knowledge of if it is in the aggregator or not. Finally the BakeryItem were stacked into a scrollable list allowing multiple items to be seen 
along with the filtering and sorting options helping to improve usability
