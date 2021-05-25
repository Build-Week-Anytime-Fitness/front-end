import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

import { connect } from "react-redux";
import { classToEdit }  from "../../state/actions/index.js";


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
  let { indivClass, allClasses } = props;
  // Determines location from useLocation(), if "/instructors" is found, set isInstructor to true, trigger positive conditional render in card
  let { pathname } = useLocation();
  // console.log("pathname from Class: ", pathname); // gets the location, looking for "/instructors", A STRING
  let isInstructor = false;
  if (pathname === "/instructors") {
    isInstructor = true;
  }

  // material UI code
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  // --------------  Helper Functions ----------------
  const handleEditButtonClick = () => {
    console.log("handleEditButtonClick has been fired")
    props.myClassToEdit(props.indivClass);
  };
  const {max_class_size,number_of_students} = indivClass;

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
        
        <Button disabled={!(number_of_students < max_class_size)} size="small" style={{ color: '555555'}}>{number_of_students < max_class_size? "sign up":"full"}</Button>}

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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      myClassToEdit: (indivClass) => dispatch(classToEdit(indivClass)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Class);
