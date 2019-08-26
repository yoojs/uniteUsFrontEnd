
# uniteUsFrontEnd
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Objective
Write a JavaScript application using your preferred framework (Angular 1.x/2, Backbone, or React). The should submit a new assistance request to a mock api and handle the server's response. The interface should look similar to this wireframe.

Your application should handle the successful cases (201 CREATED) and any failures gracefully. Service Types need to be loaded via the API (this end point will only return successful responses).

## Notes
Some notes on my implementation:

Used react-bootstrap, it uses Bootstrap 3 for styling.  

Used a form where every required field is validated and submit will not run without those fields being filled.

I used specific dependencies only to not have to import every dependency in my page.\
"import Form from 'react-bootstrap/Form';\
import Button from 'react-bootstrap/Button';\
import Modal from 'react-bootstrap/Modal';"\

Did not add any tests, would normally use Karma to create tests, but ran out of time.
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


