import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

import { connect, useDispatch } from "react-redux";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { classToEdit, classesToSignUp, undoSignUp, FETCHING_API_START,FETCHING_API_SUCCESS, FETCHING_API_FAILURE }  from "../../state/actions/index.js";


const useStyles = makeStyles({
  root: {
    minWidth: 310,
    opacity: .9,
    fontSize: 22,
    margin: '10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 12,
    fontSize: 22,
    color: 'dodgerblue'
  },
}); // material UI styles


const Class = (props) => {
  const dispatch = useDispatch();

  let { indivClass, allClasses } = props;
  // Determines location from useLocation(), if "/instructors" is found, set isInstructor to true, trigger positive conditional render in card
  let { pathname } = useLocation();
  // console.log("pathname from Class: ", pathname); // gets the location, looking for "/instructors", A STRING
  let isInstructor = false;
  if (pathname === "/instructors") {
    isInstructor = true;
  }

  const {max_class_size,number_of_students} = indivClass;

  // material UI code
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  // --------------  Helper Functions ----------------
  const handleEditButtonClick = () => {
    console.log("handleEditButtonClick has been fired")
    props.myClassToEdit(props.indivClass);
  };

  const toggleSignUp = () => {
    console.log("toggleSignUp has been fired")
    if (isSignedUpFor(props.indivClass)) {
      handleUndoSignUp();
    } else {
      handleSignUp();
    }
  }

  const handleSignUp = () => {
    console.log("handleSignUp has been fired: indiv class", props.indivClass)

    props.myClassesToSignUp(props.indivClass); // add class to dictionary of signed up classes

    const classId = {class_id: indivClass.id};

    dispatch({ type: FETCHING_API_START });

    axiosWithAuth()
      .post("/clientclasses", classId) 
      .then((res) => {
        console.log("SIGN_UP_FOR_CLASS response: ", res); 
        alert(res.data.message);
        dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.message });
      })
      .catch((error) => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error });
        console.log("ERR_1: This error is from SIGN_UP_FOR_CLASS", error);
      });

  };

  const handleUndoSignUp = () => {
    console.log("handleUndoSignUp has been fired: indiv class", props.indivClass)

    props.myUndoSignUp(props.indivClass); // assign class to false in dictionary of signed up classes

    dispatch({ type: FETCHING_API_START });

    axiosWithAuth()
      .delete(`/clientclasses/${indivClass.id}`) 
      .then((res) => {
        console.log("UNDO_SIGN_UP_FOR_CLASS response: ", res); 
        alert(res.data.message);
        dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.message });
      })
      .catch((error) => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error });
        console.log("ERR_1: This error is from UNDO_SIGN_UP_FOR_CLASS", error);
      });

  };

  const isSignedUpFor = (indivClass) => {
    // props.classToSignUp is the dictionary of classes signed up for
    // console.log("props.classesToSignUp: ", props.classesToSignUp)
    return props.classesToSignUp[indivClass.id] ? true : false;  // returns true or undef
  }





  return (
    <>

      <Card className={classes.root} variant="outlined" >
      <CardContent style={{textAlign: "center"}}>
      {/* // {isClassCard ? <button>Logout</button> : <button>Login</button>} */}
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {indivClass.class_type}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull} {indivClass.class_name} {bull}
        </Typography>
        <Typography className={classes.pos} color="textSecondary"><br/>
        {indivClass.class_date}
        </Typography>
        <Typography variant="body2" component="p">
          {displayTime(indivClass.duration)}<br/>
          starts at {indivClass.start_time}<br/>
          {indivClass.number_of_students}/{indivClass.max_class_size} students signed up<br/>
        </Typography>
      </CardContent>
      <CardActions>

        { isInstructor ? <Button onClick={handleEditButtonClick}><EditIcon style={{ margin: '10', color: '555555'}}/></Button>:  
        
        <Button onClick={toggleSignUp} disabled={!(number_of_students < max_class_size) || ( isSignedUpFor(props.indivClass))} size="small" style={{ color: '555555'}}>{number_of_students < max_class_size? "sign up":"full"}</Button>}

      </CardActions>
      
    </Card>

    </>
  )
};
const displayTime=(duration)=>{

  if(duration<1){
    return `${Math.round(duration*60)} mins`;
  }
  else{
    if(duration%1===0){
      return `${duration} hour`;
    }
    else{
      return `${Math.floor(duration)} hour ${Math.round(duration%1*60)} mins`;
    }
  }
};

const mapStateToProps = (state) => {
  return {
      classToEdit: state.classToEdit,
      currentUser: state.currentUser,
      classesToSignUp: state.classesToSignUp,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      myClassToEdit: (indivClass) => dispatch(classToEdit(indivClass)),
      myClassesToSignUp: (indivClass) => dispatch(classesToSignUp(indivClass)),
      myUndoSignUp: (indivClass) => dispatch(undoSignUp(indivClass)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Class);
