import awsconfig from '../../aws-exports';
import Amplify, {Auth, Hub} from 'aws-amplify';

Amplify.configure(awsconfig);
// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);

module.exports = {
    Auth,
    Amplify
}