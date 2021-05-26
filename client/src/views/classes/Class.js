import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";

import { connect, useDispatch, useSelector } from "react-redux";
import { classToEdit, setEditMode } from "../../state/actions/index.js";
import {
} from "../../state/actions/index";

const useStyles = makeStyles({
  root: {
    minWidth: 310,
    opacity: 0.9,
    fontSize: 22,
    margin: "10px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 12,
    fontSize: 22,
    color: "dodgerblue",
  },
}); // material UI styles

const Class = (props) => {
  const dispatch = useDispatch();
  const editing = useSelector((state) => state.editing);
  let { indivClass, allClasses } = props;
  const [editForm, setEditForm] = useState({
    id: props.indivClass.id,
    class_name: props.indivClass.class_name,
    class_type: props.indivClass.class_type,
    class_date: props.indivClass.class_date,
    start_time: props.indivClass.start_time,
    duration: props.indivClass.duration, // hours
    intensity: props.indivClass.intensity,
    location: props.indivClass.location,
    numberOfStudents: props.indivClass.number_of_students,
    max_class_size: props.indivClass.max_class_size,
  });

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
   dispatch(setEditMode(true))
    console.log(
      "handleEditButtonClick has been fired",
      props
    );
    dispatch(classToEdit(props.indivClass));
  };

  const handleSubmit = (e) => {
    dispatch(props.myClassToEdit(editForm));
  };



  return (
    <div> 
      
        <React.Fragment>
          <Card
            className={classes.root}
            variant="outlined"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              {/* // {isClassCard ? <button>Logout</button> : <button>Login</button>} */}
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {indivClass.class_type}
              </Typography>
              <Typography variant="h5" component="h2">
                {bull} {indivClass.class_name} {bull}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <br />
                {indivClass.class_date}
              </Typography>
              <Typography variant="body2" component="p">
                {displayTime(indivClass.duration)}
                <br />
                starts at {indivClass.start_time}
                <br />
                {indivClass.number_of_students}/{indivClass.max_class_size}{" "}
                students signed up
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              {isInstructor ? (
                <Button onClick={handleEditButtonClick}>
                  <EditIcon style={{ margin: "10", color: "555555" }} />
                </Button>
              ) : (
                <Button size="small" style={{ color: "555555" }}>
                  Sign Up
                </Button>
              )}
            </CardActions>
          </Card>
        </React.Fragment>
      )
    </div>
  );
};
const displayTime = (duration) => {
  if (duration < 1) {
    return `${Math.round(duration * 60)} mins`;
  } else {
    if (duration % 1 === 0) {
      return `${duration} hour`;
    } else {
      return `${duration} hour ${Math.round(duration * 60)} mins`;
    }
  }
};

const mapStateToProps = (state) => {
  return {
    classToEdit: state.classToEdit,
    isEditMode: state.isEditMode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    myClassToEdit: (indivClass) => dispatch(classToEdit(indivClass)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Class);
