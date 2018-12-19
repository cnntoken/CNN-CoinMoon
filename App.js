import React from 'react';
import { Linking, Button, StyleSheet, Text, View } from 'react-native';
import awsconfig from './aws-exports';
import Amplify, {Auth, Hub} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsconfig);
// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.onHubCapsule = this.onHubCapsule.bind(this);
    // this.signOut = this.signOut.bind(this);
    // let the Hub module listen on Auth events
    // Hub.listen('auth', this);
    this.state = {
      authState: 'loading'
    }
  }

  componentDidMount() {
    console.log('on component mount');
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      console.log(user);
      this.setState({authState: 'signedIn'});
    }).catch(e => {
      console.log(e);
      this.setState({authState: 'signIn'});
    });
  }

  onHubCapsule(capsule) {
    // The Auth module will emit events when user signs in, signs out, etc
    const { channel, payload, source } = capsule;
    if (channel === 'auth') {
      switch (payload.event) {
        case 'signIn':
          console.log('signed in');
          this.setState({authState: 'signedIn'});
          break;
        case 'signIn_failure':
          console.log('not signed in');
          this.setState({authState: 'signIn'});
          break;
        default:
          break;
      }
    }
  }
  check = ()=>{
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      console.log(user);
      this.setState({authState: 'signedIn'});
    }).catch(e => {
      console.log(e);
      this.setState({authState: 'signIn'});
    });
  }
  signIn = ()=> {
    Auth.signIn({
      username:'tangliang2',
      password: '11111111'
      })
    .then(user => {
      console.log(user)
      this.setState({authState: 'signedIn'});
    })
    .catch(err => console.log(err));
  }
  signOut = ()=> {
    Auth.signOut().then(() => {
      this.setState({authState: 'signIn'});
    }).catch(e => {
      console.log(e);
    });
  }
  verify = ()=>{
   // After retrieveing the confirmation code from the user
    Auth.confirmSignUp('tangliang2', '567343', {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true    
    }).then(data => {


      console.log(data)
    })
    .catch(err => console.log(err));
  }
  signUp = ()=>{
    Auth.signUp({
      username:'tangliang2',
      password: '11111111',
      attributes: {
          email:'tlyspa@gmail.com'
      },
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
  render() {
    const { authState } = this.state;
    return (
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        {/* <Button onPress={this.verify} title="Verify"></Button>
        <Button onPress={this.check} title="Check"></Button>
        <Button onPress={this.signUp} title="Sign Up"></Button>
        <Button onPress={this.signIn} title="Sign In"></Button> */}
        <Button onPress={this.verify} title="Verify"/>
       <Text>loading...</Text>
        {authState === 'signedIn' && <Button onPress={this.signOut} title="Sign out"></Button>}
      </View>
    );
  }
}
export default withAuthenticator(App,includeGreetings = true);
// export default App
// export default ()=><Text>test</Text>
