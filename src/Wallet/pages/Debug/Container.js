
import View from './View';
import { connect } from 'react-redux';

const mapState2Props = state => {
    // console.log('mapState2Props: ',state)
    return { ...state };
};

export default connect(
    mapState2Props,
)(View);
