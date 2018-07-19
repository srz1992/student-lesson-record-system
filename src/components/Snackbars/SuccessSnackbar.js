import React from 'react';
import {connect} from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { BOOKING_ACTIONS } from '../../redux/actions/bookingActions';

const mapStateToProps = state => ({
    user: state.user,
    student: state.person,
    booking: state.booking
  });

class SuccessSnackbar extends React.Component {
  state = {
    open: true,
  };
  
    messages = ()=>{
    switch(this.props.reducerName){
        case "booking":
            console.log('Booking successful!');  
            return 'Booking successful!'            
    
    }}

  handleClick = () => {
    this.setState({ open: true });
  };    

  handleClose = (event, reason) => {
    
    this.setState({ open: false });
    let action;
    switch(this.props.reducerName){
        case "booking":
            action = {type: BOOKING_ACTIONS.BOOKING_RESET};
            this.props.dispatch(action);
            break
        case "person":

        case "lesson":

        default:
            break
    }
    if (reason === 'clickaway') {
        return;
      }
    return
  };

  render() {
    return (
      <div>
        <Snackbar
        anchorOrigin={{
            vertical:'bottom',
            horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={4500}
        onClose={this.handleClose}
        >
            <SnackbarContent 
            onClose={this.handleClose}
            message={this.messages()}
            aria-describedby="client-snackbar"

            />
        </Snackbar>
        
      </div>
    );
  }
}


export default connect(mapStateToProps)(SuccessSnackbar);