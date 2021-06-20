# Socialine # 
* Web application for clubs: https://socialine.herokuapp.com/
## Specifications: ##
* Create new clubs and subclubs.
* Post, event and comment for a subclub.
* Report, ban, request, chat, search and bad words filter systems.
* Verification and forgot password system with email.
* Security with JWT and Spring Security.
## Dependencies: ##
* Spring Boot 2.4.3
* MySQL or PostgreSQL
* Node
## Run: ##
* Clone the repository, run `mvn clean install`, then `java -tar target/Socialine-0.0.1-SNAPSHOT.jar`
* Clone the repository, run `mvn spring-boot:run` (or run from IntelliJ IDEA) and `cd client && npm i && npm start`
## Contributors: ##
* [yavuzerenozer](https://github.com/yavuzerenozer)
* [ssduman](https://github.com/ssduman)
* [b21727589](https://github.com/b21727589)
* [b21727283](https://github.com/b21727283)
* [bexheroes](https://github.com/bexheroes)
## Images: ##
<table>
    <tr>
        <td align="center">
            <img src="https://github.com/ssduman/socialine/blob/heroku/img/landing.jpg" alt="home-page" width="384" height="216">
            <br />
            <i> landing page </i>
        </td>
        <td align="center">
            <img src="https://github.com/ssduman/socialine/blob/heroku/img/home.jpg" alt="prediction" width="384" height="216">
            <br />
            <i> home page </i>
        </td>
    </tr>
    <tr>
        <td align="center">
            <img src="https://github.com/ssduman/socialine/blob/heroku/img/profile.jpg" alt="home-page" width="384" height="216">
            <br />
            <i> profile page </i>
        </td>
        <td align="center">
            <img src="https://github.com/ssduman/socialine/blob/heroku/img/subclubs.jpg" alt="prediction" width="384" height="216">
            <br />
            <i> subclub page </i>
        </td>
    </tr>
</table>

### Bugs and Limitations: ###
* Due to free version of Heroku, the site waking up like in 30 seconds if sleeping for the first time.
* Socket and chat are working on local but not working on Heroku.
